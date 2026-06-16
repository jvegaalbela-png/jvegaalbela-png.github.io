import type { BeatState, ClickType } from '../engine/types';

// Palette pulled from the Un-Belonging album painting — the same tokens the
// website uses (src/styles/_tokens.css), so the app reads as part of the brand.
export const colors = {
  navy: '#091528',
  bg: '#0e1830',
  surface: '#142544',
  surfaceHi: '#1d3055',
  cobalt: '#1a3a8a',
  blue: '#2a5cc8',
  blueLt: '#5b8de8',
  orange: '#e8650a',
  orangeLt: '#f5882a',
  lime: '#8db820',
  crimson: '#d65a6e',
  gold: '#e8b542',
  cream: '#f7f1e3',
  ink: '#ece7da',
  muted: '#a39d8f',
  rule: '#1d2a48',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 18,
  pill: 999,
};

export const font = {
  // System fonts keep the bundle lean; the website's Cormorant/Inter are a
  // future polish if desired.
  sans: undefined as string | undefined,
};

/** Fill color for a beat-grid cell in a given state. */
export function beatColor(state: BeatState): string {
  switch (state) {
    case 'accent':
      return colors.orange;
    case 'normal':
      return colors.blueLt;
    case 'soft':
      return colors.cobalt;
    case 'mute':
      return colors.rule;
  }
}

/** Glyph shown on a beat-grid cell for a given state. */
export function beatIcon(state: BeatState): string {
  switch (state) {
    case 'accent':
      return '▲';
    case 'normal':
      return '●';
    case 'soft':
      return '○';
    case 'mute':
      return '✕';
  }
}

/** Flash color for the big pulse indicator on a click. */
export function flashColor(type: ClickType): string {
  if (type === 'accent') return colors.orange;
  if (type === 'soft') return colors.cobalt;
  if (type === 'sub') return colors.lime;
  return colors.blueLt;
}
