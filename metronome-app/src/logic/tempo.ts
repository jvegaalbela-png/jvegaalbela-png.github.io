// Tempo naming + BPM formatting, ported from the web metronome.

const TEMPO_MARKS: [number, string][] = [
  [24, 'Larghissimo'],
  [39, 'Grave'],
  [54, 'Largo'],
  [64, 'Larghetto'],
  [74, 'Adagio'],
  [79, 'Adagietto'],
  [93, 'Andante'],
  [107, 'Andantino'],
  [119, 'Moderato'],
  [129, 'Allegretto'],
  [167, 'Allegro'],
  [179, 'Vivace'],
  [199, 'Presto'],
  [500, 'Prestissimo'],
];

export function getTempoName(bpm: number): string {
  for (const [max, name] of TEMPO_MARKS) if (bpm <= max) return name;
  return 'Prestissimo';
}

/** "120" when integer, "120.5" when fractional — no useless trailing .0. */
export function formatBpm(bpm: number): string {
  return Number.isInteger(bpm) ? String(bpm) : bpm.toFixed(1);
}
