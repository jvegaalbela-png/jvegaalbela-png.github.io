import { c as createComponent, $ as $$Layout, r as renderScript } from './Layout_By4Vyr6P.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_vkmOfVOm.mjs';
import { a as getEntry, r as renderEntry } from './_astro_content_BqV4Ef79.mjs';
/* empty css                 */
import { P as PERSON, O as ORGANIZATION, a as ORGANIZATION_ID, b as PERSON_ID, S as SITE_URL, $ as $$JsonLd } from './schema_BJh2aw_a.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Metronome = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Metronome;
  const guideEntry = await getEntry("metronome-guide", "practice-guide");
  const { Content: GuideContent } = await renderEntry(guideEntry);
  const pageUrl = `${SITE_URL}/metronome`;
  const toolId = `${pageUrl}#tool`;
  const howToSteps = [
    {
      name: "Start without the metronome",
      text: "Get the notes under your fingers, work through the passage according to your own sense of time, and build familiarity with the material. Find a slow speed at which you can execute the passage in a relaxed way, with high attention to detail. Before this step is solid, the metronome will not help you."
    },
    {
      name: "Find your tempo",
      text: "Use the tap tempo feature to figure out the BPM you worked the passage up to in step 1."
    },
    {
      name: "Let the click play, and just listen",
      text: "Internalize and memorize the tempo before joining in. The goal is to play proactively, according to your memory of the tempo, not reactively to each individual click. Natural human variance is fine; only react when your internal sense of time is leading you astray."
    },
    {
      name: "Join in and play the passage",
      text: "Direct as much of your attention to the metronome as you can."
    },
    {
      name: "Diagnose whether you are rushing or dragging",
      text: "Use the beat-1 accent as your reference. If beat 1 surprises you or feels early, you are dragging. If beat 1 feels late or like you are jumping into a gap, you are rushing. Beginners can start by just noticing when they get off, stopping, and figuring out which way they drifted. Over time you will identify your tendency and learn to counteract it."
    },
    {
      name: "Work the tempo up gradually",
      text: "Use small BPM increments — even 1 BPM is enough. Big jumps work early on, but gains shrink to 1 to 5 clicks at a time as you progress. Log your practice, track tempo PRs, and be patient with the law of diminishing returns."
    }
  ];
  const faqs = [
    {
      q: "Should beginners practice with a metronome?",
      a: "Absolutely, but work through the passage at your own pace first, with good attention to detail and note accuracy, before you bring the click in (see the step-by-step method above)."
    },
    {
      q: "How much of my practice should be with the metronome?",
      a: "Roughly half. You don't want to get metronome-dependent, but you also want to keep yourself honest about where your time really is."
    },
    {
      q: 'What is a "metronome with subdivision," and do I need one?',
      a: "A metronome with subdivision plays not just the main beat but the inner pulses within each beat — eighth notes, triplets, sixteenth notes, or any custom on/off pattern you design. Having those inner pulses audible gives you far more feedback about where your timing drifts, which is especially useful for technique work, rudimental studies, or learning any passage with fast inner notes. Use the Subdivisions card on the Pulse tab to choose duplets, triplets, quadruplets, sextuplets, or a custom count up to 32."
    },
    {
      q: "What does Adagio, Andante, Allegro, or Presto mean in BPM?",
      a: "These are Italian tempo markings, and each corresponds to a rough range: Adagio ~66–76, Andante ~76–108, Moderato ~108–120, Allegro ~120–168, Presto ~168–200 BPM. The ranges are approximate and give the performer interpretive flexibility."
    },
    {
      q: "Can I use this metronome on my phone?",
      a: "Yes, it works great on mobile."
    },
    {
      q: "Why does the metronome make me feel like a robot?",
      a: "You're probably just not used to playing with a click yet, and you're spending a lot of brainpower on the task. As you learn to play proactively and develop a stronger internal clock, you'll get to a point where you barely notice the metronome is there. The fact that it currently takes mental effort to lock in is actually a good sign — it means you're building the neural pathways that will make good time automatic."
    },
    {
      q: "How does this metronome handle compound meters like 6/8, 9/8, or 12/8?",
      a: "Picking 5/4, 5/8, 6/8, 7/4, 7/8, 9/8, or 12/8 from the time-signature presets pre-loads the common clave or compound-meter pulse for you: beat 1 is the strongest accent, the start of each grouping is a normal click, and the inner eighths are soft ghost notes. You hear the downbeat, the dotted-quarter (or clave) pulse, and the eighth-note feel layered together. Click any beat to override the default."
    },
    {
      q: "Why does the metronome tick faster in 6/8 than in 6/4 at the same BPM?",
      a: "BPM here means quarter notes per minute, matching how tempo markings work on a score (♩ = bpm). An x/8 meter has eighth-note beats, so at the same BPM it ticks twice as fast as an x/4 meter. So 6/8 at 120 BPM gives you 240 eighth-note ticks per minute, while 6/4 at 120 BPM gives you 120 quarter-note ticks per minute."
    }
  ];
  const metronomeOgImage = {
    url: "/metronome-og.png",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: "Free online metronome with subdivisions — gap click, odd meters, and custom forms on JVA Music"
  };
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      PERSON,
      ORGANIZATION,
      {
        "@type": "WebApplication",
        "@id": toolId,
        name: "JVA Music Free Online Metronome with Subdivisions",
        url: pageUrl,
        applicationCategory: "MusicApplication",
        applicationSubCategory: "Music practice tool",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript and the Web Audio API",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
        author: { "@id": PERSON_ID },
        creator: { "@id": PERSON_ID },
        publisher: { "@id": ORGANIZATION_ID },
        description: "Free online metronome with subdivisions up to 32 (including programmable custom on/off patterns), four-level beat dynamics (accent, normal, soft, mute), compound and odd-meter clave defaults, custom time signatures, gap click, random mute, and a custom form generator — built by working drummer Jacobo Vega-Albela.",
        featureList: [
          "Custom time signatures (any beats / any unit)",
          "Subdivisions: duplet, triplet, quadruplet, sextuplet, or a custom count up to 32",
          "Programmable custom subdivisions (each inner note on or off) with a follow-beat-mute option",
          "Four-level beat dynamics (accent, normal, soft, mute) with clave defaults for 5/8, 6/8, 7/8, 9/8, 12/8",
          "Gap click — silent measures for internal-clock practice",
          "Random mute — probabilistic beat dropouts",
          "Custom form generator — chain any number of measures with shifting time signatures",
          "Tap tempo",
          "Electronic and clave sound options"
        ],
        keywords: "metronome, online metronome, free metronome, drummer metronome, gap click, polyrhythm, odd meter, compound meter, 6/8 metronome, 9/8 metronome, 12/8 metronome, 5/8 metronome, 7/8 metronome, clave, ghost note, custom time signature, practice tool"
      },
      {
        "@type": "HowTo",
        "@id": `${pageUrl}#how-to-practice`,
        name: "How to Practice With a Metronome",
        description: "A step-by-step method for practicing music with a metronome, from learning a passage cleanly at slow tempo through gradually pushing the tempo up over time. Features gap click, random mute, custom forms, odd-meter presets, and programmable subdivisions for any practice level.",
        tool: { "@id": toolId },
        step: howToSteps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
          url: `${pageUrl}#how-to-practice`
        }))
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a }
        }))
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Free Online Metronome with Subdivisions, Gap Click & Custom Time Signatures",
        mainEntity: { "@id": toolId },
        about: { "@id": toolId },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Metronome", item: pageUrl }
          ]
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${pageUrl}?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Free Online Metronome with Subdivisions, Gap Click & Custom Forms — JVA Music", "description": "Free online metronome with subdivisions, gap click, and custom time signatures — a versatile practice tool for musicians. Adjust beat patterns, odd meters, and tempo with built-in practice guide.", "themeColor": "#0d0d1a", "bodyClass": "metronome-page", "image": metronomeOgImage }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(["        ", `<main class="metronome-shell"> <div class="app"> <div class="header"> <div class="beat-flash" id="beat-flash"></div> <h1>Free Online Metronome with Subdivisions</h1> <div class="beat-flash" id="beat-flash-2"></div> </div> <div class="metronome-carousel"> <nav class="carousel-tabs" role="tablist" aria-label="Metronome sections"> <button class="carousel-tab active" type="button" data-screen="0" role="tab" aria-selected="true" aria-controls="screen-pulse">Pulse</button> <button class="carousel-tab" type="button" data-screen="1" role="tab" aria-selected="false" aria-controls="screen-practice">Practice</button> <button class="carousel-tab" type="button" data-screen="2" role="tab" aria-selected="false" aria-controls="screen-forms">Forms</button> </nav> <div class="carousel-track" id="carousel-track"> <section class="carousel-screen" id="screen-pulse" role="tabpanel" aria-label="Pulse"> <div class="basic-grid"> <!-- BPM --> <div class="card card-tempo" id="tempo"> <div class="tempo-header"> <div class="section-label">Tempo</div> <div class="tempo-header-actions"> <button class="copy-link-btn" id="reset-defaults-btn" type="button" aria-label="Reset the metronome to its default settings"> <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M2.7 8a5.3 5.3 0 1 0 1.55-3.75 M2.7 2.9v3.4h3.4"></path></svg> </button> <button class="copy-link-btn" id="copy-link-btn" type="button" aria-label="Copy a link to this metronome setup"> <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M6.5 9.5 9.5 6.5 M6 4.5l1-1a3 3 0 0 1 4.243 4.243l-1 1 M10 11.5l-1 1a3 3 0 0 1-4.243-4.243l1-1"></path></svg> <span class="copy-link-toast" id="copy-link-toast" aria-live="polite">Link copied</span> </button> </div> </div> <div class="bpm-row"> <div class="bpm-step-group"> <button class="btn btn-step" id="bpm-minus1">−1</button> <button class="btn btn-step" id="bpm-minus5">−5</button> </div> <div class="bpm-center"> <div class="bpm-number" id="bpm-display" contenteditable="true" spellcheck="false" inputmode="decimal">120</div> <div class="bpm-unit">BPM</div> <div class="tempo-name" id="tempo-name">Allegro</div> </div> <div class="bpm-step-group"> <button class="btn btn-step" id="bpm-plus1">+1</button> <button class="btn btn-step" id="bpm-plus5">+5</button> </div> </div> <div class="slider-row"> <span class="slider-label">1</span> <input type="range" id="bpm-slider" min="1" max="500" value="120"> <span class="slider-label">500</span> </div> <div class="tap-row"> <button class="btn btn-tap" id="tap-tempo">Tap Tempo</button> </div> <div class="play-row"> <button class="btn btn-play" id="play-stop">▶ Start</button> <div class="spacebar-hint">Space</div> </div> </div> <!-- Time Signature --> <div class="card card-timesig" id="time-signature"> <div class="section-label">Time Signature</div> <div class="time-sig-presets" id="time-sig-presets"> <button class="btn btn-sig" data-beats="2" data-unit="4">2/4</button> <button class="btn btn-sig" data-beats="3" data-unit="4">3/4</button> <button class="btn btn-sig active" data-beats="4" data-unit="4">4/4</button> <button class="btn btn-sig" data-beats="5" data-unit="4">5/4</button> <button class="btn btn-sig" data-beats="6" data-unit="4">6/4</button> <button class="btn btn-sig" data-beats="7" data-unit="4">7/4</button> <button class="btn btn-sig" data-beats="5" data-unit="8">5/8</button> <button class="btn btn-sig" data-beats="6" data-unit="8">6/8</button> <button class="btn btn-sig" data-beats="7" data-unit="8">7/8</button> <button class="btn btn-sig" data-beats="9" data-unit="8">9/8</button> <button class="btn btn-sig" data-beats="12" data-unit="8">12/8</button> <button class="btn btn-sig" data-beats="3" data-unit="16">3/16</button> <button class="btn btn-sig" data-beats="5" data-unit="16">5/16</button> <button class="btn btn-sig" data-beats="7" data-unit="16">7/16</button> </div> <div class="custom-sig"> <button class="btn btn-sig" id="time-sig-custom-btn" type="button" aria-label="Use a custom time signature">Custom</button> <input type="number" id="beats-input" min="1" max="32" value="4" inputmode="numeric" aria-label="Custom beats per measure"> <span class="custom-sig-slash">/</span> <select id="unit-select" aria-label="Custom beat unit"></select> </div> </div> <!-- Subdivision --> <div class="card card-subdiv" id="subdivisions"> <div class="section-label">Subdivision</div> <div class="subdivision-grid"> <button class="btn btn-sub active" data-sub="1"> <span class="sub-icon">♩</span> <span class="sub-label">None</span> </button> <button class="btn btn-sub" data-sub="2"> <span class="sub-icon">♪♪</span> <span class="sub-label">Duplet</span> </button> <button class="btn btn-sub" data-sub="3"> <span class="sub-icon">♪♪♪</span> <span class="sub-label">Triplet</span> </button> <button class="btn btn-sub" data-sub="4"> <span class="sub-icon">♬♬</span> <span class="sub-label">Quadruplet</span> </button> <button class="btn btn-sub" data-sub="6"> <span class="sub-icon">♬♬♬</span> <span class="sub-label">Sextuplet</span> </button> <button class="btn btn-sub btn-sub-custom" data-sub="custom"> <span class="sub-icon">⋯</span> <span class="sub-label">Custom</span> </button> </div> <div class="sub-custom-panel" id="sub-custom-panel" hidden> <div class="adv-row sub-count-row"> <span class="adv-label">Count</span> <input type="range" id="sub-count-slider" min="2" max="32" value="4" aria-label="Custom subdivision count"> <span class="adv-value" id="sub-count-val" contenteditable="true" spellcheck="false" inputmode="numeric" role="textbox" aria-label="Custom subdivision count value">4</span> <span class="adv-unit" id="sub-count-name">Quadruplet</span> </div> <div class="sub-pattern-head">Pattern <span class="sub-pattern-hint">— tap each subdivision to toggle on/off</span></div> <div class="sub-pattern-grid" id="sub-pattern-grid"></div> </div> <div class="sub-followmute inactive" id="sub-followmute"> <div class="sub-followmute-text"> <span class="sub-followmute-label">Follow beat mute</span> <span class="sub-followmute-desc">Silence subdivisions during muted beats</span> </div> <label class="toggle-switch"> <input type="checkbox" id="sub-followmute-toggle" aria-label="Follow beat mute"> <span class="toggle-track"></span> </label> </div> <div class="swing-controls" id="swing-controls"> <div class="swing-presets-row"> <span class="swing-label">Swing</span> <div class="swing-presets" role="radiogroup" aria-label="Swing preset"> <button class="swing-preset active" data-swing="50" type="button">Straight</button> <button class="swing-preset" data-swing="57.142857" type="button" title="Septuplet 4:3">Septuplet</button> <button class="swing-preset" data-swing="60" type="button">Quintuplet</button> <button class="swing-preset" data-swing="66.67" type="button">Triplet</button> <button class="swing-preset" data-swing="75" type="button">Dotted</button> </div> </div> <div class="swing-slider-row"> <input type="range" id="swing-slider" min="50" max="75" step="any" value="50" aria-label="Swing percentage"> <span class="swing-val" id="swing-val" contenteditable="true" spellcheck="false" inputmode="decimal" role="textbox" aria-label="Swing percentage value">50</span> <span class="swing-unit">%</span> </div> <div class="swing-hint" id="swing-hint">Applies to duplet (♪♪) subdivision</div> </div> </div> <!-- Sound Library --> <div class="card card-sound" id="sound"> <div class="section-label">Sound</div> <div class="sound-grid"> <button class="btn btn-sound active" data-sound="electronic"> <span class="sound-icon">∿</span> <span class="sound-label">Electronic</span> </button> <button class="btn btn-sound" data-sound="clave"> <span class="sound-icon">▮</span> <span class="sound-label">Clave</span> </button> </div> </div> <!-- Beat Grid --> <div class="card card-beats" id="beats"> <div class="section-label">Beats</div> <div id="beat-grid"></div> <div class="sub-indicators" id="sub-indicators"></div> <div class="beat-grid-hint">Click a beat to cycle: Normal → Accent → Mute</div> </div> </div><!-- /.basic-grid --> </section> <section class="carousel-screen" id="screen-practice" role="tabpanel" aria-label="Practice"> <div class="adv-grid"> <!-- Gap Click --> <div class="card card-gap" id="gap-click"> <div class="adv-feature-header"> <div> <div class="section-label">Gap Click</div> <div class="adv-feature-desc">Play for N, then silence for M — trains your internal clock</div> </div> <label class="toggle-switch"> <input type="checkbox" id="gap-toggle"> <span class="toggle-track"></span> </label> </div> <div id="gap-controls" class="adv-controls disabled"> <div class="adv-row gap-unit-row"> <span class="adv-label">Count by</span> <div class="gap-unit-toggle" role="radiogroup" aria-label="Gap counting unit"> <button class="gap-unit-btn active" id="gap-unit-measure" type="button" aria-pressed="true">Measures</button> <button class="gap-unit-btn" id="gap-unit-beat" type="button" aria-pressed="false">Beats</button> </div> </div> <div class="adv-row"> <span class="adv-label">Play</span> <input type="range" id="gap-play-slider" min="1" max="16" value="2"> <span class="adv-value" id="gap-play-val" contenteditable="true" spellcheck="false" inputmode="numeric" role="textbox" aria-label="Gap click play count">2</span> <span class="adv-unit" id="gap-play-unit">measures</span> </div> <div class="adv-row"> <span class="adv-label">Silence</span> <input type="range" id="gap-silent-slider" min="1" max="16" value="2"> <span class="adv-value" id="gap-silent-val" contenteditable="true" spellcheck="false" inputmode="numeric" role="textbox" aria-label="Gap click silent count">2</span> <span class="adv-unit" id="gap-silent-unit">measures</span> </div> <div class="gap-phase-indicator"> <span class="phase-pill" id="gap-phase-pill">● Waiting</span> <span class="phase-progress" id="gap-phase-progress"></span> </div> </div> </div> <!-- Random Mute --> <div class="card card-random" id="random-mute"> <div class="adv-feature-header"> <div> <div class="section-label">Random Mute</div> <div class="adv-feature-desc">Each beat — and optionally each subdivision — has a chance of being silenced at random</div> </div> <label class="toggle-switch"> <input type="checkbox" id="random-mute-toggle"> <span class="toggle-track"></span> </label> </div> <div id="random-mute-controls" class="adv-controls disabled"> <div class="adv-row"> <span class="adv-label">Beats</span> <input type="range" id="random-mute-slider" min="0" max="100" value="30"> <span class="adv-value" id="random-mute-val" contenteditable="true" spellcheck="false" inputmode="numeric" role="textbox" aria-label="Random mute beats percentage">30</span> <span class="adv-unit">%</span> </div> <div class="adv-row"> <span class="adv-label">Subdivisions</span> <input type="range" id="random-mute-sub-slider" min="0" max="100" value="0"> <span class="adv-value" id="random-mute-sub-val" contenteditable="true" spellcheck="false" inputmode="numeric" role="textbox" aria-label="Random mute subdivisions percentage">0</span> <span class="adv-unit">%</span> </div> </div> </div> <!-- Device / Background Play --> <div class="card card-device" id="device-features"> <div class="device-card-head"> <div class="section-label">Device</div> </div> <!-- Informational only, shown on iOS (init unhides it). Background play
           is automatic there; other platforms keep playing natively. --> <div class="adv-feature-header device-feature-row" id="bg-play-row" style="display:none"> <div> <div class="device-feature-label">Background play</div> <div class="adv-feature-desc">Keeps playing with your screen off &mdash; automatic on this device. The click keeps going even when iOS pauses the page.</div> </div> </div> <div class="adv-feature-header device-feature-row" id="wake-lock-row"> <div> <div class="device-feature-label">Keep screen awake</div> <div class="adv-feature-desc">Prevents auto-lock while the metronome is running</div> </div> <label class="toggle-switch"> <input type="checkbox" id="wake-lock-toggle" checked aria-label="Keep screen awake"> <span class="toggle-track"></span> </label> </div> </div> </div><!-- /.adv-grid --> </section> <section class="carousel-screen" id="screen-forms" role="tabpanel" aria-label="Forms"> <!-- The "header" controls (label, description, form-mode toggle, mode
         switcher, undo/redo, Clear all, BPM) live in a regular card —
         same header pattern as Gap Click / Random Mute on the Practice
         tab. The bar grid, action buttons, and share/save panel sit
         below the card so they flow freely without any extra container. --> <div class="card card-form" id="custom-form"> <div class="adv-feature-header"> <div> <div class="section-label">Custom Form</div> <div class="adv-feature-desc">Chain measures with shifting time signatures</div> </div> <label class="toggle-switch" title="Play this form (instead of the basic Pulse settings)"> <input type="checkbox" id="form-toggle"> <span class="toggle-track"></span> </label> </div> <div class="form-editor-toolbar"> <div class="form-editor-mode-toggle" role="group" aria-label="Editor view mode"> <button class="form-editor-mode-btn active" id="form-editor-mode-beat" type="button" aria-pressed="true">Beat</button> <button class="form-editor-mode-btn" id="form-editor-mode-chart" type="button" aria-pressed="false">Chart</button> </div> <div class="form-editor-undoredo" role="group" aria-label="Undo and redo"> <button class="form-editor-ur-btn" id="form-editor-undo" type="button" aria-label="Undo (Ctrl+Z)" title="Undo — Ctrl+Z" disabled>↺</button> <button class="form-editor-ur-btn" id="form-editor-redo" type="button" aria-label="Redo (Ctrl+Y)" title="Redo — Ctrl+Y" disabled>↻</button> </div> <button class="form-editor-clear" id="form-editor-clear" type="button">Clear all</button> <div class="form-editor-bpm"> <button class="form-editor-bpm-step" id="form-editor-bpm-minus" type="button" aria-label="Decrease BPM by 1">−</button> <span class="form-editor-bpm-value" id="form-editor-bpm" contenteditable="true" spellcheck="false" inputmode="decimal">120</span> <button class="form-editor-bpm-step" id="form-editor-bpm-plus" type="button" aria-label="Increase BPM by 1">+</button> <span class="form-editor-bpm-label">BPM</span> </div> </div> </div><!-- /.card.card-form --> <div class="form-editor-shell" id="form-editor-shell"> <div class="card form-select-bar" id="form-select-bar" aria-hidden="true"> <span class="form-select-status" id="form-select-status">Tap the first bar of the range</span> <div class="form-select-actions"> <button class="form-select-action play" id="form-select-play-from" type="button" disabled>▶ Play from</button> <button class="form-select-action play" id="form-select-loop" type="button" disabled>↻ Loop</button> <button class="form-select-action" id="form-select-duplicate" type="button" disabled>Duplicate</button> <button class="form-select-action danger" id="form-select-delete" type="button" disabled>Delete</button> <button class="form-select-action" id="form-select-cancel" type="button">Cancel</button> </div> </div> <div class="form-editor-body"> <div class="form-editor-grid" id="form-editor-grid"></div> <div class="form-editor-body-actions"> <button class="form-editor-add-bar" id="form-editor-add-bar" type="button"> <span class="form-editor-add-bar-plus" aria-hidden="true">+</span> <span id="form-editor-add-bar-label">Add a 4/4 bar</span> </button> <button class="form-editor-select-btn" id="form-editor-select-btn" type="button">Select bars</button> </div> <div class="form-code-panel"> <div class="form-code-title">Save &amp; Share</div> <p class="form-code-help">Save forms to your device for later, share by link, or import a link someone sent you.</p> <div class="form-code-row"> <button class="form-code-btn" id="form-saved-save-btn" type="button"> <span>Save form</span> </button> <button class="form-code-btn" id="form-code-copy" type="button"> <span>Copy share link</span> <span class="form-code-copied" id="form-code-copied" aria-live="polite">Copied</span> </button> <button class="form-code-btn" id="form-saved-import-btn" type="button"> <span>Import link</span> </button> </div> <div class="form-saved-list" id="form-saved-list"> <div class="form-saved-empty" id="form-saved-empty">No saved forms yet</div> </div> </div> </div> <div class="form-editor-mobile-play" id="form-editor-mobile-play"> <button class="btn btn-play" id="form-editor-mobile-play-btn" type="button">▶ Start</button> </div> </div><!-- /.form-editor-shell --> <!-- Hidden DOM stubs so the existing JS handlers don't NPE on elements
         that lived on the old Custom Form card or in legacy form-list UI. --> <div style="display:none" aria-hidden="true"> <div id="form-controls" class="adv-controls"></div> <div class="form-counter" id="form-counter"></div> <button id="play-stop-form" type="button">play</button> <button id="form-editor-play" type="button">play</button> <div class="form-toolbar"> <button class="btn form-tool-btn" id="form-undo" disabled>↩ Undo</button> <button class="btn form-tool-btn" id="form-redo" disabled>↪ Redo</button> <button class="btn form-tool-btn" id="form-save">↓ Save</button> <label class="btn form-tool-btn" id="form-load-label">↑ Load
<input type="file" id="form-load-input" accept=".json"> </label> </div> <div class="form-bulk-row"> <input type="number" class="form-beats-input" id="bulk-count" min="1" max="64" value="4"> <input type="number" class="form-beats-input" id="bulk-beats" min="1" max="32" value="4"> <select class="form-unit-select" id="bulk-unit"></select> <button class="btn form-tool-btn" id="bulk-add-btn">+ Add</button> </div> <div class="form-list" id="form-list"></div> <button class="btn btn-add-measure" id="add-measure-btn">+ Add Single Measure</button> </div> </section> </div><!-- /.carousel-track --> </div><!-- /.metronome-carousel --> </div> <!-- Reset-to-defaults confirmation. Fixed overlay, opened from the ↺
     button in the Tempo card header. --> <div class="reset-confirm-overlay" id="reset-confirm" hidden> <div class="reset-confirm-card" role="alertdialog" aria-modal="true" aria-labelledby="reset-confirm-title" aria-describedby="reset-confirm-desc"> <div class="reset-confirm-title" id="reset-confirm-title">Reset to defaults?</div> <p class="reset-confirm-desc" id="reset-confirm-desc">This clears your current setup &mdash; tempo, time signature, subdivisions, practice modes, and the current custom form. Forms saved to your library are kept.</p> <div class="reset-confirm-actions"> <button class="btn" id="reset-cancel-btn" type="button">Cancel</button> <button class="btn reset-confirm-go" id="reset-confirm-btn" type="button">Reset</button> </div> </div> </div> </main>  <article class="metronome-prose" aria-labelledby="guide-intro"> <div class="metronome-prose-inner"> <p class="prose-eyebrow" id="guide-intro">Practice guide</p> `, ' </div> </article>  <button class="metronome-play-pill is-hidden" id="play-pill" type="button" aria-label="Start metronome"> <span class="metronome-play-pill-icon" aria-hidden="true">▶</span> <span class="metronome-play-pill-label">Start</span> </button>  <div class="bg-render-toast" id="bg-render-status-bar" hidden aria-live="polite"> <span class="bg-render-toast-dot"></span> <span class="bg-render-toast-text">Preparing background audio&hellip;</span> </div> ', " <script>\n  // Register the metronome service worker. Scoped to /metronome/ because\n  // the SW lives at /metronome/sw.js — the rest of the site is not\n  // intercepted. Skipped on localhost so dev builds aren't cached.\n  if ('serviceWorker' in navigator && location.hostname !== 'localhost' && location.protocol === 'https:') {\n    window.addEventListener('load', () => {\n      navigator.serviceWorker.register('/metronome/sw.js').catch((err) => {\n        console.warn('SW registration failed:', err);\n      });\n    });\n  }\n<\/script> "])), maybeRenderHead(), renderComponent($$result2, "GuideContent", GuideContent, {}), renderScript($$result2, "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/metronome.astro?astro&type=script&index=0&lang.ts")), "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "JsonLd", $$JsonLd, { "slot": "head", "data": graph })}<link rel="stylesheet" href="/metronome.css"><link rel="manifest" href="/metronome/site.webmanifest"><link rel="apple-touch-icon" href="/icons/icon-180.png"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title" content="Metronome">` })}`;
}, "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/metronome.astro", void 0);

const $$file = "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/metronome.astro";
const $$url = "/metronome/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Metronome,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
