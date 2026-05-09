// Contrast audit for the JVA Music palette. Computes WCAG 2.x relative
// luminance + contrast ratio for every text/background pair the site
// actually uses, in both light and dark modes. Run with:
//   node scripts/contrast-audit.mjs

const PALETTE = {
  navy:      '#091528',
  cobalt:    '#1a3a8a',
  blue:      '#2a5cc8',
  'blue-lt': '#5b8de8',
  orange:    '#e8650a',
  'orange-lt': '#f5882a',
  'orange-dk': '#b04600',
  lime:      '#8db820',
  'lime-dk': '#506e10',
  cream:     '#f5f3ee',
  ink:       '#0e0d0b',
  muted:     '#6b6560',
  rule:      '#d8d3cb',

  // Dark-mode remaps (declared inside @media (prefers-color-scheme: dark))
  'ink/dark':       '#ece7da',
  'muted/dark':     '#908a7e',
  'rule/dark':      '#1d2a48',
  'body-bg/dark':   '#060d1c',
  'card-bg/dark':   '#0d1830',
};

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

function linearize(c) {
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(linearize);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(fg, bg) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

function ratingFor(ratio, isLargeText = false) {
  if (isLargeText) {
    if (ratio >= 4.5) return 'AAA';
    if (ratio >= 3.0) return 'AA';
    return 'FAIL';
  }
  if (ratio >= 7.0) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3.0) return 'AA-Large';
  return 'FAIL';
}

// Pairs to audit. `large` = AA-Large bar (≥18.66px regular OR ≥14pt bold).
const LIGHT_PAIRS = [
  // Body text pairs
  ['ink', 'cream', 'body text on body bg', false],
  ['muted', 'cream', 'small uppercase metadata on body bg', false],
  ['cobalt', 'cream', 'inline link on body bg', false],
  ['blue', 'cream', 'inline link hover on body bg', false],
  ['orange-dk', 'cream', 'eyebrow / outline button text on body bg', false],
  ['lime-dk', 'cream', 'lime accent on body bg', false],
  // Large headings
  ['ink', 'cream', 'h1/h2 heading on body bg', true],
  // Hero (navy bg)
  ['cream', 'navy', 'cream text on hero', false],
  ['orange-lt', 'navy', 'eyebrow on hero', false],
  ['blue-lt', 'navy', 'italic accent in hero name', false],
  ['cream', 'cobalt', 'text on contact strip / footer hover', false],
  // Buttons
  ['cream', 'orange', 'primary CTA fill', false],
  ['cream', 'orange-lt', 'primary CTA hover', false],
  ['cream', 'cobalt', 'secondary CTA / pdf-detail-related-card--cta fill', false],
  // Card panels
  ['ink', 'cream', 'card body text', false],
  // Bio tags (navy chips on cream)
  ['cream', 'navy', 'text inside .bio-tag chip', false],
];

const DARK_PAIRS = [
  // Body text pairs (body bg #060d1c)
  ['ink/dark', 'body-bg/dark', 'body text on body bg', false],
  ['muted/dark', 'body-bg/dark', 'small uppercase metadata on body bg', false],
  // Cobalt remaps to blue-lt for links in dark mode
  ['blue-lt', 'body-bg/dark', 'inline link on body bg', false],
  // Eyebrows/lime-dk remap to brighter --orange / --lime in dark mode
  ['orange', 'body-bg/dark', 'eyebrow / outline btn text on body bg', false],
  ['lime', 'body-bg/dark', 'lime accent on body bg', false],
  // Card panels
  ['ink/dark', 'card-bg/dark', 'card body text on dark navy card', false],
  ['blue-lt', 'card-bg/dark', 'tag/eyebrow on dark navy card', false],
  // Hero (still navy)
  ['cream', 'navy', 'cream text on hero', false],
  ['orange-lt', 'navy', 'eyebrow on hero', false],
  ['blue-lt', 'navy', 'italic accent in hero name', false],
  // Buttons (unchanged in dark)
  ['cream', 'orange', 'primary CTA fill', false],
  ['cream', 'orange-lt', 'primary CTA hover', false],
  ['cream', 'cobalt', 'secondary CTA fill', false],
];

function pad(s, n) {
  return s + ' '.repeat(Math.max(0, n - s.length));
}

function audit(label, pairs) {
  console.log(`\n=== ${label} ===`);
  console.log(pad('Pair', 26) + pad('Ratio', 9) + pad('AA?', 7) + pad('Large?', 9) + 'Use');
  console.log('-'.repeat(95));
  for (const [fg, bg, use, isLarge] of pairs) {
    const fgHex = PALETTE[fg];
    const bgHex = PALETTE[bg];
    const r = contrast(fgHex, bgHex);
    const passNormal = r >= 4.5 ? 'PASS' : 'FAIL';
    const passLarge = r >= 3.0 ? 'PASS' : 'FAIL';
    const ratioStr = r.toFixed(2) + ':1';
    const pair = `${fg}→${bg}`;
    console.log(
      pad(pair, 26) +
      pad(ratioStr, 9) +
      pad(passNormal, 7) +
      pad(passLarge, 9) +
      use
    );
  }
}

audit('LIGHT MODE', LIGHT_PAIRS);
audit('DARK MODE', DARK_PAIRS);

// Summary of failures
console.log('\n=== FAILURES ===');
let anyFail = false;
for (const [label, pairs] of [['light', LIGHT_PAIRS], ['dark', DARK_PAIRS]]) {
  for (const [fg, bg, use, isLarge] of pairs) {
    const r = contrast(PALETTE[fg], PALETTE[bg]);
    const bar = isLarge ? 3.0 : 4.5;
    if (r < bar) {
      anyFail = true;
      console.log(`[${label}] ${fg}→${bg}: ${r.toFixed(2)}:1 (needs ≥${bar}) — ${use}`);
    }
  }
}
if (!anyFail) console.log('(all pairs pass their applicable WCAG AA threshold)');
