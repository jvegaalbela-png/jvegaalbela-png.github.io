import { c as createComponent, $ as $$Layout } from './Layout_By4Vyr6P.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from './prerender_vkmOfVOm.mjs';

const $$Palette = createComponent(($$result, $$props, $$slots) => {
  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16) / 255,
      parseInt(h.slice(2, 4), 16) / 255,
      parseInt(h.slice(4, 6), 16) / 255
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
  function rating(r) {
    if (r >= 7) return "AAA";
    if (r >= 4.5) return "AA";
    if (r >= 3) return "AA L";
    return "fail";
  }
  const VARIANTS = [
    {
      id: "current",
      name: "Current — production today",
      description: "What's live on jva-music.com. Body-text contrast is on the high end of WCAG AAA (17.5:1 ink on cream), which reads as crisp but a touch clinical. Loud-orange primary CTA technically fails AA at 3.01:1 cream-on-orange — we chose loudness over WCAG conformance.",
      light: {
        navy: "#091528",
        cobalt: "#1a3a8a",
        blue: "#2a5cc8",
        blueLt: "#5b8de8",
        orange: "#e8650a",
        orangeLt: "#f5882a",
        orangeDk: "#b04600",
        lime: "#8db820",
        limeDk: "#506e10",
        cream: "#f5f3ee",
        ink: "#0e0d0b",
        muted: "#6b6560",
        rule: "#d8d3cb",
        bodyBg: "#f5f3ee",
        cardBg: "#ffffff",
        ctaBg: "#e8650a",
        ctaText: "#f5f3ee",
        ctaHoverBg: "#f5882a"
      },
      dark: {
        navy: "#091528",
        cobalt: "#1a3a8a",
        blue: "#2a5cc8",
        blueLt: "#5b8de8",
        orange: "#e8650a",
        orangeLt: "#f5882a",
        orangeDk: "#e8650a",
        lime: "#8db820",
        limeDk: "#8db820",
        cream: "#f5f3ee",
        ink: "#ece7da",
        muted: "#908a7e",
        rule: "#1d2a48",
        bodyBg: "#060d1c",
        cardBg: "#0d1830",
        ctaBg: "#e8650a",
        ctaText: "#f5f3ee",
        ctaHoverBg: "#f5882a"
      }
    },
    {
      id: "refined",
      name: "Refined — same hues, easier on the eyes",
      description: "Same palette, four targeted tweaks: (1) ink lifts from #0e0d0b → #1f1815 — still 13:1 on cream, easily AAA, but less crushing. (2) cream warms from #f5f3ee → #f7f1e3, more painterly less printerly. (3) dark-mode body bg lifts from #060d1c → #0e1830 (matches card bg) so the page is dark navy instead of near-black. (4) CTA text switches from cream to navy on the loud orange — same loud color, but contrast jumps from 3.01:1 fail to 4.97:1 AA pass.",
      light: {
        navy: "#091528",
        cobalt: "#1a3a8a",
        blue: "#2a5cc8",
        blueLt: "#5b8de8",
        orange: "#e8650a",
        orangeLt: "#f5882a",
        orangeDk: "#b04600",
        lime: "#8db820",
        limeDk: "#506e10",
        cream: "#f7f1e3",
        ink: "#1f1815",
        muted: "#6b6560",
        rule: "#d8d3cb",
        bodyBg: "#f7f1e3",
        cardBg: "#ffffff",
        ctaBg: "#e8650a",
        ctaText: "#091528",
        ctaHoverBg: "#f5882a"
      },
      dark: {
        navy: "#091528",
        cobalt: "#1a3a8a",
        blue: "#2a5cc8",
        blueLt: "#5b8de8",
        orange: "#e8650a",
        orangeLt: "#f5882a",
        orangeDk: "#e8650a",
        lime: "#8db820",
        limeDk: "#8db820",
        cream: "#f5f3ee",
        ink: "#ece7da",
        muted: "#a39d8f",
        rule: "#1d2a48",
        bodyBg: "#0e1830",
        cardBg: "#142544",
        ctaBg: "#e8650a",
        ctaText: "#091528",
        ctaHoverBg: "#f5882a"
      }
    },
    {
      id: "painterly",
      name: "Painterly — adds the missing painting accents",
      description: "Same primary scheme as Current. Adds two accents pulled directly from the album art that the existing palette doesn't capture: a crimson #b03a4c from the magenta brushstrokes scattered throughout the painting, and a gold #d4a017 from the central yellow shape. Used here in the highlight card and eyebrow examples; everything else is unchanged. Could replace the lime accent for a warmer overall feel, or stay alongside it.",
      light: {
        navy: "#091528",
        cobalt: "#1a3a8a",
        blue: "#2a5cc8",
        blueLt: "#5b8de8",
        orange: "#e8650a",
        orangeLt: "#f5882a",
        orangeDk: "#b04600",
        lime: "#8db820",
        limeDk: "#506e10",
        cream: "#f5f3ee",
        ink: "#0e0d0b",
        muted: "#6b6560",
        rule: "#d8d3cb",
        bodyBg: "#f5f3ee",
        cardBg: "#ffffff",
        ctaBg: "#e8650a",
        ctaText: "#f5f3ee",
        ctaHoverBg: "#f5882a",
        crimson: "#a8344a",
        gold: "#9a7a16"
      },
      dark: {
        navy: "#091528",
        cobalt: "#1a3a8a",
        blue: "#2a5cc8",
        blueLt: "#5b8de8",
        orange: "#e8650a",
        orangeLt: "#f5882a",
        orangeDk: "#e8650a",
        lime: "#8db820",
        limeDk: "#8db820",
        cream: "#f5f3ee",
        ink: "#ece7da",
        muted: "#908a7e",
        rule: "#1d2a48",
        bodyBg: "#060d1c",
        cardBg: "#0d1830",
        ctaBg: "#e8650a",
        ctaText: "#f5f3ee",
        ctaHoverBg: "#f5882a",
        crimson: "#d65a6e",
        gold: "#e8b542"
      }
    },
    {
      id: "painterly-refined",
      name: "Painterly Refined — combines the eye-comfort tuning with the painting accents",
      description: `The full package: Refined's ink/cream/dark-bg tuning + AA-passing CTA, plus Painterly's crimson and gold accents from the album art. This is the variant to ship if you want both "easier on the eyes for long reads" and "more chromatic range from the source painting" in the same palette.`,
      light: {
        navy: "#091528",
        cobalt: "#1a3a8a",
        blue: "#2a5cc8",
        blueLt: "#5b8de8",
        orange: "#e8650a",
        orangeLt: "#f5882a",
        orangeDk: "#b04600",
        lime: "#8db820",
        limeDk: "#506e10",
        cream: "#f7f1e3",
        ink: "#1f1815",
        muted: "#6b6560",
        rule: "#d8d3cb",
        bodyBg: "#f7f1e3",
        cardBg: "#ffffff",
        ctaBg: "#e8650a",
        ctaText: "#091528",
        ctaHoverBg: "#f5882a",
        crimson: "#a8344a",
        gold: "#9a7a16"
      },
      dark: {
        navy: "#091528",
        cobalt: "#1a3a8a",
        blue: "#2a5cc8",
        blueLt: "#5b8de8",
        orange: "#e8650a",
        orangeLt: "#f5882a",
        orangeDk: "#e8650a",
        lime: "#8db820",
        limeDk: "#8db820",
        cream: "#f5f3ee",
        ink: "#ece7da",
        muted: "#a39d8f",
        rule: "#1d2a48",
        bodyBg: "#0e1830",
        cardBg: "#142544",
        ctaBg: "#e8650a",
        ctaText: "#091528",
        ctaHoverBg: "#f5882a",
        crimson: "#d65a6e",
        gold: "#e8b542"
      }
    }
  ];
  function styleFor(t) {
    return Object.entries(t).map(([k, v]) => `--${k.replace(/([A-Z])/g, "-$1").toLowerCase()}:${v}`).join(";");
  }
  function swatchesFor(t) {
    const base = [
      { key: "navy", label: "navy" },
      { key: "cobalt", label: "cobalt" },
      { key: "blue", label: "blue" },
      { key: "blueLt", label: "blue-lt" },
      { key: "orange", label: "orange" },
      { key: "orangeLt", label: "orange-lt" },
      { key: "orangeDk", label: "orange-dk" },
      { key: "lime", label: "lime" },
      { key: "limeDk", label: "lime-dk" },
      { key: "cream", label: "cream" },
      { key: "ink", label: "ink" },
      { key: "muted", label: "muted" },
      { key: "rule", label: "rule" }
    ];
    if (t.crimson) base.push({ key: "crimson", label: "crimson" });
    if (t.gold) base.push({ key: "gold", label: "gold" });
    return base.map((s) => ({ ...s, value: t[s.key] }));
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Palette preview — JVA Music", "description": "Internal palette + contrast preview", "themeColor": "#091528", "noindex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="palette-page"> <header class="palette-hero"> <p class="palette-hero-eyebrow">Internal · noindex</p> <h1>Palette preview</h1> <p class="palette-hero-sub">
Each variant rendered in light + dark, with token swatches and
        sample elements (eyebrow, h1, h2, body, link, primary CTA,
        outline CTA, highlight card). Contrast ratios annotated next
        to each swatch — vs the panel's body background — so failing
        pairs jump out.
</p> </header> ${VARIANTS.map((v) => renderTemplate`<section class="variant"${addAttribute(v.id, "id")}> <header class="variant-header"> <h2>${v.name}</h2> <p>${v.description}</p> </header> <div class="modes"> ${["light", "dark"].map((mode) => {
    const tokens = v[mode];
    const bodyBg = tokens.bodyBg;
    return renderTemplate`<article${addAttribute(`mode mode-${mode}`, "class")}${addAttribute(styleFor(tokens), "style")}> <div class="mode-label"> <span class="mode-label-tag">${mode}</span> <span class="mode-label-bg">body bg ${bodyBg}</span> </div>  <div class="swatches"> ${swatchesFor(tokens).map((s) => {
      const r = contrast(s.value, bodyBg);
      const onSelf = s.value.toLowerCase() === bodyBg.toLowerCase();
      return renderTemplate`<div class="swatch"> <div class="swatch-chip"${addAttribute(`background:${s.value}`, "style")}></div> <div class="swatch-meta"> <div class="swatch-name">${s.label}</div> <div class="swatch-hex">${s.value}</div> <div class="swatch-contrast"> ${onSelf ? "— body bg —" : `${r.toFixed(2)}:1 ${rating(r)}`} </div> </div> </div>`;
    })} </div>  <div class="sample"> <p class="s-eyebrow">Section eyebrow</p> <h3 class="s-h1">Drum lessons in <em>Rochester, NY</em></h3> <h4 class="s-h2">A working drummer first, a teacher second.</h4> <p class="s-body">
Body copy in Inter. The quick brown fox jumps over the
                    lazy dog 1234567890. Some <a class="s-link" href="#">inline link</a>
text and a bit of <em>italic emphasis</em> for good measure. This is
                    where most reading happens — the goal is "can read for ten minutes
                    without straining."
</p> <p class="s-meta">SMALL UPPERCASE METADATA · 9.5PX 700 WEIGHT</p> <div class="s-buttons"> <a class="s-btn s-btn-primary" href="#">Primary CTA</a> <a class="s-btn s-btn-outline" href="#">Outline CTA</a> </div> <div class="s-cards"> <div class="s-card s-card-blue"> <div class="s-card-eyebrow">Highlight · Cobalt</div> <div class="s-card-title">Performed at the Kennedy Center</div> <div class="s-card-body">
Selected for the Jazz Ahead residency, studying under
                        Jason Moran, Clarence Penn, Benny Green.
</div> </div> <div class="s-card s-card-orange"> <div class="s-card-eyebrow">Highlight · Orange</div> <div class="s-card-title"><em>"Un-Belonging"</em></div> <div class="s-card-body">
Debut album on 577 Records — five publications and five
                        radio stations across U.S. and Canada.
</div> </div> <div class="s-card s-card-lime"> <div class="s-card-eyebrow">Highlight · Lime</div> <div class="s-card-title">Festival Circuit</div> <div class="s-card-body">
Rochester International Jazz Festival, Burlington Discover
                        Jazz Festival, Las Cruces Juneteenth.
</div> </div> ${tokens.crimson && renderTemplate`<div class="s-card s-card-crimson"> <div class="s-card-eyebrow">Highlight · Crimson</div> <div class="s-card-title">A new accent from the painting</div> <div class="s-card-body">
Pulled from the magenta brushstrokes scattered through the
                          album art. Adds warmth alongside the existing blues.
</div> </div>`} ${tokens.gold && renderTemplate`<div class="s-card s-card-gold"> <div class="s-card-eyebrow">Highlight · Gold</div> <div class="s-card-title">From the central yellow shape</div> <div class="s-card-body">
A mustard accent picked up from the bright yellow form at
                          the heart of the painting.
</div> </div>`} </div>  <div class="s-hero-strip"> <span class="s-hero-eyebrow">Hero eyebrow on navy</span> <div class="s-hero-name">
Jacobo <em>Vega-Albela</em> </div> <div class="s-hero-role">Jazz Drummer · Composer · Bandleader</div> </div> </div> </article>`;
  })} </div> </section>`)} </main> ` })}`;
}, "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/palette.astro", void 0);

const $$file = "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/palette.astro";
const $$url = "/palette/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Palette,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
