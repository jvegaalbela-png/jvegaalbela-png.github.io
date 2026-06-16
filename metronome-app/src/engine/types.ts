// Shared engine types. These mirror the data model of the original web
// metronome 1:1 so the scheduler logic can be ported verbatim.

/** Per-beat sound assignment in the beat grid. */
export type BeatState = 'accent' | 'normal' | 'soft' | 'mute';

/** What the synth is asked to play for a given step. */
export type ClickType = 'accent' | 'beat' | 'soft' | 'sub' | 'mute';

export type SoundMode = 'electronic' | 'clave';

export type GapUnit = 'measure' | 'beat';

/** One bar in the song/form builder: its meter and per-beat states. */
export interface FormEntry {
  beats: number;
  unit: number;
  states: BeatState[];
}

export interface MetronomeState {
  bpm: number;
  beatsPerMeasure: number;
  beatUnit: number;
  subdivision: number;
  subCustom: boolean;
  /** booleans, length = subdivision; index 0 is the beat (always on). */
  subPattern: boolean[];
  /** when true, subdivisions go silent on muted beats. */
  subFollowMute: boolean;
  /** remembered Custom count, so toggling presets <-> custom is stable. */
  customCount: number;
  swingPct: number;
  /** 'accent' | 'normal' | 'soft' | 'mute' per beat. */
  beats: BeatState[];
  isPlaying: boolean;
  currentBeat: number;
  currentSub: number;
}

export interface AdvState {
  enabled: boolean;
  gapEnabled: boolean;
  gapPlay: number;
  gapSilent: number;
  gapUnit: GapUnit;
  randomMuteEnabled: boolean;
  randomMutePct: number;
  randomMuteSubPct: number;
  formEnabled: boolean;
  form: FormEntry[];
}

/** Carried from the audio scheduler to the visual loop, one per scheduled step. */
export interface VisualEvent {
  beat: number;
  sub: number;
  time: number;
  clickType: ClickType;
  formIdx: number;
  gapPhase: 'play' | 'silent';
  gapCount: number;
  // Committed on the downbeat so the sub-dot indicator swaps in audio sync.
  subdivision?: number;
  subCustom?: boolean;
  subPattern?: boolean[];
}

/** What the visual loop hands the UI on every drained step. */
export interface VisualTick {
  beat: number;
  sub: number;
  clickType: ClickType;
  formIdx: number;
  gapPhase: 'play' | 'silent';
  gapCount: number;
  subdivision?: number;
  subCustom?: boolean;
  subPattern?: boolean[];
  /** true on a bar's first step (beat 0, sub 0) — drives gap/form visuals. */
  barStart: boolean;
}
