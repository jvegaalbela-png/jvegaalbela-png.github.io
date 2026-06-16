import { AudioContext, AudioManager, type GainNode } from 'react-native-audio-api';

import { defaultBeatsForSig } from '../logic/timesig';
import { ensureSubPattern } from '../logic/subdivision';
import { scheduleClick } from './synth';
import type {
  AdvState,
  BeatState,
  ClickType,
  GapUnit,
  MetronomeState,
  SoundMode,
  VisualEvent,
  VisualTick,
} from './types';

const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_S = 0.1;

type ChangeListener = () => void;
type VisualListener = (tick: VisualTick) => void;

/**
 * The metronome engine. A single source of truth that owns all playback state
 * and the realtime scheduler. The scheduler loop is ported verbatim from the
 * web metronome; only the platform glue differs:
 *
 *   - audio          → react-native-audio-api (same Web Audio node graph)
 *   - DOM visuals    → subscribeVisual() callbacks
 *   - settings sync  → useSyncExternalStore via subscribe()/getVersion()
 *
 * The entire iOS background-WAV-handoff / wake-lock / silent-bypass machinery
 * from the web version is gone — the native audio session ('playback' category
 * + UIBackgroundModes audio) keeps the click alive through screen-lock and the
 * physical silent switch with no workarounds.
 */
export class MetronomeEngine {
  // ─── State ─────────────────────────────────────────────────────────────────
  state: MetronomeState = {
    bpm: 120,
    beatsPerMeasure: 4,
    beatUnit: 4,
    subdivision: 1,
    subCustom: false,
    subPattern: [],
    subFollowMute: false,
    customCount: 4,
    swingPct: 50,
    beats: ['accent', 'normal', 'normal', 'normal'],
    isPlaying: false,
    currentBeat: -1,
    currentSub: 0,
  };

  adv: AdvState = {
    enabled: false,
    gapEnabled: false,
    gapPlay: 2,
    gapSilent: 2,
    gapUnit: 'measure',
    randomMuteEnabled: false,
    randomMutePct: 30,
    randomMuteSubPct: 0,
    formEnabled: false,
    form: [],
  };

  soundMode: SoundMode = 'electronic';

  /** Set by persistence layer; called (debounced) whenever settings change. */
  onPersist: (() => void) | null = null;

  // ─── Subscriptions ───────────────────────────────────────────────────────
  private version = 0;
  private changeListeners = new Set<ChangeListener>();
  private visualListeners = new Set<VisualListener>();

  // ─── Audio ─────────────────────────────────────────────────────────────────
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sessionConfigured = false;
  private nextNoteTime = 0;
  private schedulerTimer: ReturnType<typeof setTimeout> | null = null;
  private schedulerBeat = 0;
  private schedulerSub = 0;
  private schedulerSubdivision = 1;
  private schedulerSubCustom = false;
  private schedulerSubPattern: boolean[] = [];
  private pendingVisuals: VisualEvent[] = [];
  private rafId: number | null = null;

  // Scheduler-side advanced state (runs SCHEDULE_AHEAD_S ahead of audio time)
  private advGapPhase: 'play' | 'silent' = 'play';
  private advGapCount = 0;
  advFormIdx = 0;
  /** When set, the scheduler loops only that bar range (loop-selection). */
  loopRange: { lo: number; hi: number } | null = null;

  // ─── Subscribe API (for React's useSyncExternalStore) ─────────────────────
  subscribe = (listener: ChangeListener): (() => void) => {
    this.changeListeners.add(listener);
    return () => this.changeListeners.delete(listener);
  };

  getVersion = (): number => this.version;

  /** Bump the version and notify settings subscribers (UI re-render). */
  emitChange(): void {
    this.version++;
    this.changeListeners.forEach((l) => l());
  }

  subscribeVisual(listener: VisualListener): () => void {
    this.visualListeners.add(listener);
    return () => this.visualListeners.delete(listener);
  }

  private persist(): void {
    this.onPersist?.();
  }

  // ─── Audio setup ───────────────────────────────────────────────────────────
  private getAudioCtx(): AudioContext {
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Configure the iOS/Android audio session for music playback: ignore the
   * physical silent switch and keep playing in the background. Called once,
   * lazily, from the first play (a user gesture).
   */
  private ensureSession(): void {
    if (this.sessionConfigured) return;
    try {
      AudioManager.setAudioSessionOptions({
        iosCategory: 'playback',
        iosMode: 'default',
        iosOptions: ['mixWithOthers'],
      });
      AudioManager.setAudioSessionActivity(true);
      this.sessionConfigured = true;
    } catch {
      // Non-fatal: on a misconfigured build the click still plays in-app.
    }
  }

  private scheduleClickNow(time: number, type: ClickType): void {
    if (type === 'mute') return;
    const ctx = this.getAudioCtx();
    scheduleClick(ctx, time, type, this.soundMode, this.masterGain ?? ctx.destination);
  }

  private getAdvConfig(): { beatsPerMeasure: number; beats: BeatState[]; beatUnit: number } {
    if (this.adv.formEnabled && this.adv.form.length > 0) {
      if (this.advFormIdx < 0 || this.advFormIdx >= this.adv.form.length) this.advFormIdx = 0;
      const e = this.adv.form[this.advFormIdx];
      return { beatsPerMeasure: e.beats, beats: e.states, beatUnit: e.unit };
    }
    return {
      beatsPerMeasure: this.state.beatsPerMeasure,
      beats: this.state.beats,
      beatUnit: this.state.beatUnit,
    };
  }

  // ─── Scheduler (ported verbatim) ─────────────────────────────────────────
  private scheduler = (): void => {
    try {
      const ctx = this.getAudioCtx();
      const state = this.state;
      const adv = this.adv;

      while (this.nextNoteTime < ctx.currentTime + SCHEDULE_AHEAD_S) {
        const beat = this.schedulerBeat;
        const sub = this.schedulerSub;
        const time = this.nextNoteTime;
        const cfg = this.getAdvConfig();

        // Commit the live subdivision settings at each beat boundary.
        if (sub === 0) {
          this.schedulerSubdivision = state.subdivision;
          this.schedulerSubCustom = state.subCustom;
          this.schedulerSubPattern = state.subPattern.slice();
        }

        let clickType: ClickType;
        if (sub === 0) {
          const s = cfg.beats[beat] || 'normal';
          clickType =
            s === 'mute' ? 'mute' : s === 'accent' ? 'accent' : s === 'soft' ? 'soft' : 'beat';
        } else {
          clickType = 'sub';
          if (this.schedulerSubCustom && this.schedulerSubPattern[sub] === false) {
            clickType = 'mute';
          }
        }

        // Follow-beat-mute: a muted beat also silences its subdivisions.
        if (
          sub !== 0 &&
          state.subFollowMute &&
          (cfg.beats[beat] || 'normal') === 'mute'
        ) {
          clickType = 'mute';
        }

        if (adv.gapEnabled && this.advGapPhase === 'silent') clickType = 'mute';

        if (adv.randomMuteEnabled && clickType !== 'mute') {
          const p = sub === 0 ? adv.randomMutePct : adv.randomMuteSubPct;
          if (p > 0 && Math.random() < p / 100) clickType = 'mute';
        }

        this.scheduleClickNow(time, clickType);

        const vis: VisualEvent = {
          beat,
          sub,
          time,
          clickType,
          formIdx: this.advFormIdx,
          gapPhase: this.advGapPhase,
          gapCount: this.advGapCount,
        };
        if (sub === 0) {
          vis.subdivision = this.schedulerSubdivision;
          vis.subCustom = this.schedulerSubCustom;
          vis.subPattern = this.schedulerSubPattern;
        }
        this.pendingVisuals.push(vis);

        // BPM is quarter-notes-per-minute; tick rate scales by (4 / beatUnit).
        // Duplet + swing makes the two halves of the beat uneven.
        {
          const beatDur = (60.0 / state.bpm) * (4 / cfg.beatUnit);
          let stepDur: number;
          if (
            this.schedulerSubdivision === 2 &&
            !this.schedulerSubCustom &&
            state.swingPct !== 50
          ) {
            const s = state.swingPct / 100;
            stepDur = this.schedulerSub === 0 ? beatDur * s : beatDur * (1 - s);
          } else {
            stepDur = beatDur / this.schedulerSubdivision;
          }
          this.nextNoteTime += stepDur;
        }

        this.schedulerSub++;
        if (this.schedulerSub >= this.schedulerSubdivision) {
          this.schedulerSub = 0;
          this.schedulerBeat++;
          if (adv.gapEnabled && adv.gapUnit === 'beat') {
            this.advGapCount++;
            if (this.advGapPhase === 'play' && this.advGapCount >= adv.gapPlay) {
              this.advGapPhase = 'silent';
              this.advGapCount = 0;
            } else if (this.advGapPhase === 'silent' && this.advGapCount >= adv.gapSilent) {
              this.advGapPhase = 'play';
              this.advGapCount = 0;
            }
          }
          if (this.schedulerBeat >= cfg.beatsPerMeasure) {
            this.schedulerBeat = 0;
            if (adv.gapEnabled && adv.gapUnit !== 'beat') {
              this.advGapCount++;
              if (this.advGapPhase === 'play' && this.advGapCount >= adv.gapPlay) {
                this.advGapPhase = 'silent';
                this.advGapCount = 0;
              } else if (this.advGapPhase === 'silent' && this.advGapCount >= adv.gapSilent) {
                this.advGapPhase = 'play';
                this.advGapCount = 0;
              }
            }
            if (adv.formEnabled && adv.form.length > 0) {
              if (
                this.loopRange &&
                (this.loopRange.hi >= adv.form.length || this.loopRange.lo > this.loopRange.hi)
              ) {
                this.loopRange = null;
              }
              if (this.loopRange) {
                this.advFormIdx =
                  this.advFormIdx >= this.loopRange.hi
                    ? this.loopRange.lo
                    : this.advFormIdx + 1;
              } else {
                this.advFormIdx = (this.advFormIdx + 1) % adv.form.length;
              }
            }
          }
        }
      }
    } catch (e) {
      console.error('metronome scheduler error', e);
    }

    this.schedulerTimer = setTimeout(this.scheduler, LOOKAHEAD_MS);
  };

  // ─── Visual loop ───────────────────────────────────────────────────────────
  private visualLoop = (): void => {
    if (!this.state.isPlaying) return;
    const ctx = this.getAudioCtx();
    const now = ctx.currentTime;

    while (this.pendingVisuals.length && this.pendingVisuals[0].time <= now) {
      const v = this.pendingVisuals.shift()!;
      this.state.currentBeat = v.beat;
      this.state.currentSub = v.sub;
      const tick: VisualTick = {
        beat: v.beat,
        sub: v.sub,
        clickType: v.clickType,
        formIdx: v.formIdx,
        gapPhase: v.gapPhase,
        gapCount: v.gapCount,
        subdivision: v.subdivision,
        subCustom: v.subCustom,
        subPattern: v.subPattern,
        barStart: v.beat === 0 && v.sub === 0,
      };
      this.visualListeners.forEach((l) => l(tick));
    }

    this.rafId = requestAnimationFrame(this.visualLoop);
  };

  // ─── Lifecycle ───────────────────────────────────────────────────────────
  start(fromFormIdx?: number): void {
    this.ensureSession();
    const ctx = this.getAudioCtx();
    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(ctx.currentTime);
      this.masterGain.gain.setValueAtTime(1, ctx.currentTime);
    }
    this.state.isPlaying = true;
    this.schedulerBeat = 0;
    this.schedulerSub = 0;
    this.schedulerSubdivision = this.state.subdivision;
    this.schedulerSubCustom = this.state.subCustom;
    this.schedulerSubPattern = this.state.subPattern.slice();
    this.advGapPhase = 'play';
    this.advGapCount = 0;
    this.advFormIdx =
      typeof fromFormIdx === 'number' && fromFormIdx >= 0 ? fromFormIdx : 0;
    this.nextNoteTime = ctx.currentTime + 0.05;
    this.pendingVisuals.length = 0;
    this.scheduler();
    this.rafId = requestAnimationFrame(this.visualLoop);
    this.emitChange();
  }

  stop(): void {
    this.state.isPlaying = false;
    this.loopRange = null;
    if (this.schedulerTimer) {
      clearTimeout(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.pendingVisuals.length = 0;
    this.state.currentBeat = -1;
    this.state.currentSub = 0;
    // Tell the UI to clear the active indicator.
    const idleTick: VisualTick = {
      beat: -1,
      sub: 0,
      clickType: 'mute',
      formIdx: this.advFormIdx,
      gapPhase: 'play',
      gapCount: 0,
      barStart: false,
    };
    this.visualListeners.forEach((l) => l(idleTick));
    this.emitChange();
  }

  toggle(): void {
    if (this.state.isPlaying) this.stop();
    else this.start();
  }

  // ─── BPM ───────────────────────────────────────────────────────────────────
  setBPM(value: number): void {
    const snapped = Math.round(value * 10) / 10;
    this.state.bpm = Math.max(1, Math.min(500, snapped));
    this.emitChange();
    this.persist();
  }

  nudgeBPM(delta: number): void {
    // Match the web behavior: nudging from a fractional value snaps to the
    // nearest integer in the chosen direction.
    const base = delta > 0 ? Math.floor(this.state.bpm) : Math.ceil(this.state.bpm);
    this.setBPM(base + delta);
  }

  private tapTimes: number[] = [];
  registerTap(): void {
    const now = Date.now();
    this.tapTimes.push(now);
    this.tapTimes = this.tapTimes.filter((t) => now - t < 4000).slice(-8);
    if (this.tapTimes.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < this.tapTimes.length; i++) {
        intervals.push(this.tapTimes[i] - this.tapTimes[i - 1]);
      }
      const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      this.setBPM(Math.round(60000 / avg));
    }
  }

  // ─── Time signature ────────────────────────────────────────────────────────
  setTimeSig(beats: number, unit: number, applyDefault = false): void {
    beats = Math.max(1, Math.min(32, Math.round(beats)));
    const prev = this.state.beats;
    const sameSig = beats === this.state.beatsPerMeasure && unit === this.state.beatUnit;
    this.state.beatsPerMeasure = beats;
    this.state.beatUnit = unit;

    let newBeats: BeatState[];
    if (applyDefault && !sameSig) {
      const preset = defaultBeatsForSig(beats, unit);
      if (preset) {
        newBeats = preset.slice();
      } else {
        newBeats = Array(beats).fill('normal') as BeatState[];
        newBeats[0] = 'accent';
      }
    } else {
      newBeats = [];
      for (let i = 0; i < beats; i++) {
        newBeats.push(i < prev.length ? prev[i] : 'normal');
      }
      if (prev.length === 0) newBeats[0] = 'accent';
    }
    this.state.beats = newBeats;
    if (this.state.currentBeat >= beats) this.state.currentBeat = -1;
    this.emitChange();
    this.persist();
  }

  // ─── Subdivision ───────────────────────────────────────────────────────────
  setSubdivision(sub: number, custom: boolean): void {
    custom = !!custom;
    this.state.subCustom = custom;
    if (custom) {
      const n = Math.max(2, Math.min(32, this.state.customCount || 4));
      this.state.customCount = n;
      this.state.subdivision = n;
      this.state.subPattern = ensureSubPattern(this.state.subPattern, n);
    } else {
      this.state.subdivision = sub;
    }
    this.emitChange();
    this.persist();
  }

  setCustomCount(n: number): void {
    n = Math.max(2, Math.min(32, Math.round(n) || 4));
    this.state.customCount = n;
    this.state.subdivision = n;
    this.state.subPattern = ensureSubPattern(this.state.subPattern, n);
    this.emitChange();
    this.persist();
  }

  toggleSubStep(i: number): void {
    if (i <= 0) return; // index 0 is the beat, always on
    this.state.subPattern[i] = !this.state.subPattern[i];
    this.emitChange();
    this.persist();
  }

  setSubFollowMute(on: boolean): void {
    this.state.subFollowMute = on;
    this.emitChange();
    this.persist();
  }

  // ─── Swing ───────────────────────────────────────────────────────────────
  setSwingPct(v: number): void {
    this.state.swingPct = Math.max(50, Math.min(75, v || 50));
    this.emitChange();
    this.persist();
  }

  // ─── Beat grid ─────────────────────────────────────────────────────────────
  private static readonly STATE_CYCLE: Record<BeatState, BeatState> = {
    normal: 'accent',
    accent: 'soft',
    soft: 'mute',
    mute: 'normal',
  };

  cycleBeat(i: number): void {
    const cur = this.state.beats[i] || 'normal';
    this.state.beats[i] = MetronomeEngine.STATE_CYCLE[cur];
    this.emitChange();
    this.persist();
  }

  // ─── Sound mode ────────────────────────────────────────────────────────────
  setSoundMode(mode: SoundMode): void {
    this.soundMode = mode;
    this.emitChange();
    this.persist();
  }

  // ─── Advanced mode toggles ─────────────────────────────────────────────────
  setAdvancedEnabled(on: boolean): void {
    this.adv.enabled = on;
    this.emitChange();
    this.persist();
  }

  setGapEnabled(on: boolean): void {
    this.adv.gapEnabled = on;
    this.emitChange();
    this.persist();
  }

  setGap(play: number, silent: number, unit: GapUnit): void {
    this.adv.gapPlay = Math.max(1, Math.min(16, Math.round(play)));
    this.adv.gapSilent = Math.max(1, Math.min(16, Math.round(silent)));
    this.adv.gapUnit = unit;
    this.emitChange();
    this.persist();
  }

  setRandomMuteEnabled(on: boolean): void {
    this.adv.randomMuteEnabled = on;
    this.emitChange();
    this.persist();
  }

  setRandomMutePct(pct: number): void {
    this.adv.randomMutePct = Math.max(0, Math.min(100, Math.round(pct)));
    this.emitChange();
    this.persist();
  }

  setRandomMuteSubPct(pct: number): void {
    this.adv.randomMuteSubPct = Math.max(0, Math.min(100, Math.round(pct)));
    this.emitChange();
    this.persist();
  }

  setFormEnabled(on: boolean): void {
    this.adv.formEnabled = on;
    if (on && this.adv.form.length === 0) {
      this.adv.form = [
        { beats: 4, unit: 4, states: ['accent', 'normal', 'normal', 'normal'] },
      ];
    }
    this.advFormIdx = 0;
    this.emitChange();
    this.persist();
  }

  // ─── Form / song builder ───────────────────────────────────────────────────
  /** Collapse consecutive same-meter bars into display groups. */
  groupForm(): { beats: number; unit: number; start: number; end: number; count: number }[] {
    const groups: { beats: number; unit: number; start: number; end: number; count: number }[] = [];
    let i = 0;
    while (i < this.adv.form.length) {
      const start = i;
      const { beats, unit } = this.adv.form[i];
      while (
        i < this.adv.form.length &&
        this.adv.form[i].beats === beats &&
        this.adv.form[i].unit === unit
      ) {
        i++;
      }
      groups.push({ beats, unit, start, end: i - 1, count: i - start });
    }
    return groups;
  }

  private newStates(beats: number): BeatState[] {
    const states = Array(beats).fill('normal') as BeatState[];
    states[0] = 'accent';
    return states;
  }

  addFormMeasure(): void {
    const last = this.adv.form[this.adv.form.length - 1] || { beats: 4, unit: 4 };
    this.adv.form.push({ beats: last.beats, unit: last.unit, states: this.newStates(last.beats) });
    this.afterFormMutation();
  }

  bulkAddMeasures(count: number, beats: number, unit: number): void {
    count = Math.max(1, Math.round(count) || 1);
    beats = Math.max(1, Math.min(32, Math.round(beats) || 4));
    unit = Math.max(1, Math.min(32, Math.round(unit) || 4));
    for (let i = 0; i < count; i++) {
      this.adv.form.push({ beats, unit, states: this.newStates(beats) });
    }
    this.afterFormMutation();
  }

  deleteFormMeasure(idx: number): void {
    if (this.adv.form.length <= 1) return;
    this.adv.form.splice(idx, 1);
    this.afterFormMutation();
  }

  deleteFormGroup(start: number, count: number): void {
    this.adv.form.splice(start, count);
    if (this.adv.form.length === 0) {
      this.adv.form.push({ beats: 4, unit: 4, states: this.newStates(4) });
    }
    this.afterFormMutation();
  }

  setEntryBeats(idx: number, beats: number): void {
    const entry = this.adv.form[idx];
    if (!entry) return;
    const b = Math.max(1, Math.min(32, Math.round(beats) || 4));
    const prev = entry.states.slice();
    entry.beats = b;
    entry.states = Array(b)
      .fill('normal')
      .map((_, i) => (i < prev.length ? prev[i] : 'normal')) as BeatState[];
    if (prev.length === 0) entry.states[0] = 'accent';
    this.afterFormMutation();
  }

  setEntryUnit(idx: number, unit: number): void {
    const entry = this.adv.form[idx];
    if (!entry) return;
    entry.unit = Math.max(1, Math.min(32, Math.round(unit) || 4));
    this.afterFormMutation();
  }

  cycleEntryBeat(idx: number, beatIdx: number): void {
    const entry = this.adv.form[idx];
    if (!entry) return;
    const cur = entry.states[beatIdx] || 'normal';
    entry.states[beatIdx] = MetronomeEngine.STATE_CYCLE[cur];
    this.afterFormMutation();
  }

  loadForm(entries: { beats: number; unit: number; states?: BeatState[] }[]): void {
    if (!Array.isArray(entries) || entries.length === 0) return;
    this.adv.form = entries.map((entry) => {
      const b = Math.max(1, Math.min(32, Number(entry.beats) || 4));
      const u = Math.max(1, Math.min(32, Number(entry.unit) || 4));
      const s = Array.isArray(entry.states) ? entry.states.slice() : this.newStates(b);
      while (s.length < b) s.push('normal');
      return { beats: b, unit: u, states: s.slice(0, b) as BeatState[] };
    });
    this.advFormIdx = 0;
    this.afterFormMutation();
  }

  private afterFormMutation(): void {
    if (this.advFormIdx >= this.adv.form.length) this.advFormIdx = this.adv.form.length - 1;
    if (this.advFormIdx < 0) this.advFormIdx = 0;
    this.recordHistory();
    this.emitChange();
    this.persist();
  }

  // ─── Form undo / redo ──────────────────────────────────────────────────────
  private formHistory: string[] = [];
  private formHistoryIdx = -1;

  /** Seed the history stack with the current form (call after load/init). */
  seedFormHistory(): void {
    this.formHistory = [JSON.stringify(this.adv.form)];
    this.formHistoryIdx = 0;
  }

  private recordHistory(): void {
    const snap = JSON.stringify(this.adv.form);
    if (this.formHistory[this.formHistoryIdx] === snap) return;
    this.formHistory = this.formHistory.slice(0, this.formHistoryIdx + 1);
    this.formHistory.push(snap);
    if (this.formHistory.length > 80) this.formHistory.shift();
    this.formHistoryIdx = this.formHistory.length - 1;
  }

  canUndo(): boolean {
    return this.formHistoryIdx > 0;
  }

  canRedo(): boolean {
    return this.formHistoryIdx < this.formHistory.length - 1;
  }

  undoForm(): void {
    if (!this.canUndo()) return;
    this.formHistoryIdx--;
    this.adv.form = JSON.parse(this.formHistory[this.formHistoryIdx]);
    if (this.advFormIdx >= this.adv.form.length) this.advFormIdx = this.adv.form.length - 1;
    this.emitChange();
    this.persist();
  }

  redoForm(): void {
    if (!this.canRedo()) return;
    this.formHistoryIdx++;
    this.adv.form = JSON.parse(this.formHistory[this.formHistoryIdx]);
    if (this.advFormIdx >= this.adv.form.length) this.advFormIdx = this.adv.form.length - 1;
    this.emitChange();
    this.persist();
  }

  // ─── Play-from / loop selection ────────────────────────────────────────────
  playFromSelection(idx: number): void {
    this.adv.formEnabled = true;
    this.loopRange = null;
    this.stop();
    this.start(idx);
  }

  loopSelection(lo: number, hi: number): void {
    this.adv.formEnabled = true;
    this.loopRange = { lo, hi };
    this.stop();
    this.loopRange = { lo, hi };
    this.start(lo);
  }
}

/** Singleton — there is only ever one metronome. */
export const engine = new MetronomeEngine();
