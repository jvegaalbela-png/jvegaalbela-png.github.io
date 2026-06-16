import type { BeatState } from '../engine/types';

// Time-signature helpers, ported from the web metronome.

/** Denominators offered as "Common"; everything 1..32 else is "Advanced". */
export const COMMON_UNITS = [2, 4, 8, 16];

export function allUnits(): number[] {
  const units: number[] = [];
  for (let i = 1; i <= 32; i++) units.push(i);
  return units;
}

/** Common preset meters shown as quick buttons (beats, unit, label). */
export const SIG_PRESETS: { beats: number; unit: number; label: string }[] = [
  { beats: 4, unit: 4, label: '4/4' },
  { beats: 3, unit: 4, label: '3/4' },
  { beats: 2, unit: 4, label: '2/4' },
  { beats: 6, unit: 8, label: '6/8' },
  { beats: 5, unit: 4, label: '5/4' },
  { beats: 7, unit: 8, label: '7/8' },
  { beats: 9, unit: 8, label: '9/8' },
  { beats: 12, unit: 8, label: '12/8' },
];

// Compound and odd-meter defaults: the dotted-quarter pulse in 6/8, 9/8, and
// 12/8, and the common claves in 5/4 (3+2), 5/8 (3+2), 7/4 (4+3), 7/8 (2+2+3).
// Beat 1 is the strongest accent; group starts after that are normal; the rest
// are soft. Returns null for meters that should fall back to the simple
// "accent on 1, normal elsewhere" pattern.
export function defaultBeatsForSig(beats: number, unit: number): BeatState[] | null {
  if (unit === 4) {
    if (beats === 5) return ['accent', 'soft', 'soft', 'normal', 'soft'];
    if (beats === 7)
      return ['accent', 'soft', 'soft', 'soft', 'normal', 'soft', 'soft'];
  }
  if (unit === 8) {
    if (beats === 5) return ['accent', 'soft', 'soft', 'normal', 'soft'];
    if (beats === 6) return ['accent', 'soft', 'soft', 'normal', 'soft', 'soft'];
    if (beats === 7)
      return ['accent', 'soft', 'normal', 'soft', 'normal', 'soft', 'soft'];
    if (beats === 9)
      return ['accent', 'soft', 'soft', 'normal', 'soft', 'soft', 'normal', 'soft', 'soft'];
    if (beats === 12)
      return [
        'accent', 'soft', 'soft', 'normal', 'soft', 'soft',
        'normal', 'soft', 'soft', 'normal', 'soft', 'soft',
      ];
  }
  if (unit === 16) {
    // At 16th-note pulse, soft inner beats blur into a wash — mute them so
    // only the structural beats (accent + grouping pulse) are audible.
    if (beats === 3) return ['accent', 'mute', 'mute'];
    if (beats === 5) return ['accent', 'mute', 'mute', 'normal', 'mute'];
    if (beats === 7)
      return ['accent', 'mute', 'normal', 'mute', 'normal', 'mute', 'mute'];
  }
  return null;
}
