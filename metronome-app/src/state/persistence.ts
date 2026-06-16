import AsyncStorage from '@react-native-async-storage/async-storage';

import { ensureSubPattern } from '../logic/subdivision';
import type { MetronomeEngine } from '../engine/MetronomeEngine';
import type { BeatState } from '../engine/types';

// Silent auto-save of EVERYTHING (including custom forms) to AsyncStorage,
// mirroring the web metronome's localStorage schema (same STORAGE_KEY so the
// data model stays recognizable). Saves are debounced; load runs once at boot.

const STORAGE_KEY = 'metronomeState_v1';
const BEAT_KEYS: BeatState[] = ['accent', 'normal', 'soft', 'mute'];

let saveTimer: ReturnType<typeof setTimeout> | null = null;

export function attachPersistence(engine: MetronomeEngine): void {
  engine.onPersist = () => {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => void save(engine), 250);
  };
}

async function save(engine: MetronomeEngine): Promise<void> {
  try {
    const { state, adv, soundMode } = engine;
    const data = {
      bpm: state.bpm,
      beatsPerMeasure: state.beatsPerMeasure,
      beatUnit: state.beatUnit,
      beats: state.beats,
      subdivision: state.subdivision,
      subCustom: state.subCustom,
      subPattern: state.subPattern,
      subFollowMute: state.subFollowMute,
      customCount: state.customCount,
      swingPct: state.swingPct,
      soundMode,
      adv: {
        gapEnabled: adv.gapEnabled,
        gapPlay: adv.gapPlay,
        gapSilent: adv.gapSilent,
        gapUnit: adv.gapUnit,
        randomMuteEnabled: adv.randomMuteEnabled,
        randomMutePct: adv.randomMutePct,
        randomMuteSubPct: adv.randomMuteSubPct,
        formEnabled: adv.formEnabled,
        form: adv.form,
      },
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Quota / unavailable storage — ignore, same as the web version.
  }
}

/** Hydrate engine state from storage. Returns true if anything was loaded. */
export async function loadPersistedState(engine: MetronomeEngine): Promise<boolean> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const d = JSON.parse(raw);
    const s = engine.state;

    if (d.bpm >= 1 && d.bpm <= 500) s.bpm = d.bpm;
    if (d.beatsPerMeasure >= 1 && d.beatsPerMeasure <= 32) s.beatsPerMeasure = d.beatsPerMeasure;
    if (d.beatUnit >= 1 && d.beatUnit <= 32) s.beatUnit = d.beatUnit;
    if (Array.isArray(d.beats) && d.beats.length > 0) {
      s.beats = d.beats.filter((b: BeatState) => BEAT_KEYS.includes(b));
    }
    if (d.subdivision >= 1 && d.subdivision <= 32) s.subdivision = d.subdivision;
    s.subCustom = !!d.subCustom;
    if (d.customCount >= 2 && d.customCount <= 32) s.customCount = d.customCount;
    if (Array.isArray(d.subPattern)) {
      s.subPattern = d.subPattern.map((x: unknown, i: number) => (i === 0 ? true : !!x));
    }
    if (s.subCustom) s.subPattern = ensureSubPattern(s.subPattern, s.subdivision);
    s.subFollowMute = !!d.subFollowMute;
    if (d.swingPct >= 50 && d.swingPct <= 75) s.swingPct = d.swingPct;
    if (d.soundMode === 'clave' || d.soundMode === 'electronic') engine.soundMode = d.soundMode;

    if (d.adv) {
      const a = engine.adv;
      a.gapEnabled = !!d.adv.gapEnabled;
      if (d.adv.gapPlay >= 1 && d.adv.gapPlay <= 16) a.gapPlay = d.adv.gapPlay;
      if (d.adv.gapSilent >= 1 && d.adv.gapSilent <= 16) a.gapSilent = d.adv.gapSilent;
      if (d.adv.gapUnit === 'beat' || d.adv.gapUnit === 'measure') a.gapUnit = d.adv.gapUnit;
      a.randomMuteEnabled = !!d.adv.randomMuteEnabled;
      if (d.adv.randomMutePct >= 0 && d.adv.randomMutePct <= 100) a.randomMutePct = d.adv.randomMutePct;
      if (d.adv.randomMuteSubPct >= 0 && d.adv.randomMuteSubPct <= 100) {
        a.randomMuteSubPct = d.adv.randomMuteSubPct;
      }
      a.formEnabled = !!d.adv.formEnabled;
      if (Array.isArray(d.adv.form) && d.adv.form.length > 0) a.form = d.adv.form;
    }
    return true;
  } catch {
    return false;
  }
}
