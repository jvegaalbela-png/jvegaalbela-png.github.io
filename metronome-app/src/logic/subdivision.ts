// Subdivision helpers, ported from the web metronome.

const SUB_NAMES: Record<number, string> = {
  2: 'Duplet',
  3: 'Triplet',
  4: 'Quadruplet',
  5: 'Quintuplet',
  6: 'Sextuplet',
  7: 'Septuplet',
  8: 'Octuplet',
  9: 'Nonuplet',
};

export function subdivisionName(n: number): string {
  return SUB_NAMES[n] || `${n} per beat`;
}

/** Subdivision preset buttons. 1 = no subdivision (just the beat). */
export const SUB_PRESETS = [1, 2, 3, 4, 6];

/**
 * Return a subPattern array sized to n. Index 0 is the beat itself (always on —
 * its sound is governed by the Beats menu); existing inner steps are preserved,
 * new ones default to on.
 */
export function ensureSubPattern(prev: boolean[], n: number): boolean[] {
  const next: boolean[] = [];
  for (let i = 0; i < n; i++) {
    next[i] = i === 0 ? true : prev[i] === undefined ? true : !!prev[i];
  }
  return next;
}
