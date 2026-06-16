import type { AudioContext, AudioNode } from 'react-native-audio-api';

import type { ClickType, SoundMode } from './types';

// ─── Sound Library ───────────────────────────────────────────────────────────
//
// Ported verbatim from the web metronome. react-native-audio-api implements
// the same Web Audio node graph (createOscillator / createGain /
// createBiquadFilter, AudioParam ramps), so the synthesis is byte-for-byte the
// same as on the website — identical click timbres on device.

/** Electronic click: a band-pass-filtered sine burst, pitched by role. */
export function scheduleElectronic(
  ctx: AudioContext,
  time: number,
  type: ClickType,
  dest: AudioNode,
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(dest);
  filter.type = 'bandpass';
  if (type === 'accent') {
    osc.frequency.value = 1050;
    filter.frequency.value = 1050;
    filter.Q.value = 0.6;
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(1.0, time + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
  } else if (type === 'beat') {
    osc.frequency.value = 800;
    filter.frequency.value = 800;
    filter.Q.value = 0.5;
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.75, time + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);
  } else if (type === 'soft') {
    osc.frequency.value = 600;
    filter.frequency.value = 600;
    filter.Q.value = 0.5;
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.32, time + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.07);
  } else {
    // 'sub' and any unrecognised type → high-frequency sweep click.
    osc.frequency.value = 1600;
    filter.frequency.value = 1600;
    filter.Q.value = 1.2;
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.3, time + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
  }
  osc.start(time);
  osc.stop(time + 0.2);
}

/** Clave/wood-block click: a short pure-sine ping, pitched by role. */
export function scheduleClave(
  ctx: AudioContext,
  time: number,
  type: ClickType,
  dest: AudioNode,
): void {
  const freq =
    type === 'accent' ? 2700 : type === 'sub' ? 3300 : type === 'soft' ? 1900 : 2450;
  const vol =
    type === 'accent' ? 0.85 : type === 'beat' ? 0.55 : type === 'soft' ? 0.25 : 0.2;
  const decay =
    type === 'sub' ? 0.025 : type === 'accent' ? 0.08 : type === 'soft' ? 0.04 : 0.06;
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = freq;
  const og = ctx.createGain();
  og.gain.setValueAtTime(0.00001, time);
  og.gain.exponentialRampToValueAtTime(vol, time + 0.0005);
  og.gain.exponentialRampToValueAtTime(0.00001, time + decay);
  osc.connect(og);
  og.connect(dest);
  osc.start(time);
  osc.stop(time + decay + 0.01);
}

/** Dispatch a click to the active voice; 'mute' produces no sound. */
export function scheduleClick(
  ctx: AudioContext,
  time: number,
  type: ClickType,
  mode: SoundMode,
  dest: AudioNode,
): void {
  if (type === 'mute') return;
  if (mode === 'clave') {
    scheduleClave(ctx, time, type, dest);
    return;
  }
  scheduleElectronic(ctx, time, type, dest);
}
