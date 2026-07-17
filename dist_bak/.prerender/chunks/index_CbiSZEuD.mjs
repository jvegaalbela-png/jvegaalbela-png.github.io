import { c as createComponent, $ as $$Layout } from './Layout_By4Vyr6P.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, b as addAttribute, m as maybeRenderHead } from './prerender_vkmOfVOm.mjs';
import { statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
/* empty css                 */
import { S as SITE_URL, P as PERSON, b as PERSON_ID, $ as $$JsonLd } from './schema_BJh2aw_a.mjs';
import { m as manifest } from './pdfs_BnUPHxhD.mjs';
import { A as ABOUT_BY_FILE, l as landingPathFor } from './pdf-meta_Dv3A3CTZ.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const pageUrl = `${SITE_URL}/pdfs`;
  function publicPath(urlPath) {
    return join(process.cwd(), "public", urlPath.replace(/^\/+/, ""));
  }
  function pdfFileSize(filePath) {
    try {
      const bytes = statSync(publicPath(filePath)).size;
      return `${Math.round(bytes / 1024)} kB`;
    } catch {
      return void 0;
    }
  }
  async function thumbDimensions(thumbPath) {
    if (!thumbPath) return void 0;
    try {
      const meta = await sharp(publicPath(thumbPath)).metadata();
      if (meta.width && meta.height) return { w: meta.width, h: meta.height };
    } catch {
    }
    return void 0;
  }
  const allItems = manifest.categories.flatMap(
    (cat) => cat.items.map((item) => ({
      title: item.title,
      description: item.description,
      file: item.file,
      url: `${SITE_URL}${item.file}`,
      landingPath: landingPathFor(cat.id, item.file),
      landingUrl: `${SITE_URL}${landingPathFor(cat.id, item.file)}`,
      category: cat.title,
      categoryId: cat.id,
      fileSize: pdfFileSize(item.file),
      about: ABOUT_BY_FILE[item.file.split("/").pop()]
    }))
  );
  const thumbDims = /* @__PURE__ */ new Map();
  for (const cat of manifest.categories) {
    for (const item of cat.items) {
      if (item.thumbnail) {
        thumbDims.set(item.thumbnail, await thumbDimensions(item.thumbnail));
      }
    }
  }
  const firstThumb = manifest.categories[0]?.items[0]?.thumbnail;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      PERSON,
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name: "Teaching PDFs — Jacobo Vega-Albela",
        description: "A free library of teaching PDFs by Jacobo Vega-Albela: single-surface exercises, drumset studies, and transcriptions for drum students at every level.",
        author: { "@id": PERSON_ID },
        inLanguage: "en-US",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "PDFs", item: pageUrl }
          ]
        },
        mainEntity: {
          "@type": "ItemList",
          name: "Teaching PDFs",
          numberOfItems: allItems.length,
          itemListElement: allItems.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: item.landingUrl,
            item: {
              "@type": "LearningResource",
              name: item.title,
              ...item.description && { description: item.description },
              url: item.landingUrl,
              inLanguage: "en-US",
              author: { "@id": PERSON_ID },
              isAccessibleForFree: true,
              learningResourceType: item.category,
              mainEntity: {
                "@type": "DigitalDocument",
                name: item.title,
                url: item.url,
                encodingFormat: "application/pdf",
                ...item.fileSize && { contentSize: item.fileSize },
                ...item.about && { about: item.about }
              }
            }
          }))
        }
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Teaching PDFs — Jacobo Vega-Albela", "description": "Free teaching PDFs from Jacobo Vega-Albela — single-surface exercises, drumset exercises, and transcriptions for students at every level.", "themeColor": "#091528" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<main> <header class="pdfs-hero"> <div class="pdfs-hero-inner"> <span class="pdfs-eyebrow">Teaching Resources</span> <h1 class="pdfs-title">PDFs <em>&amp; Worksheets</em></h1> <p class="pdfs-sub">A growing library of exercises, etudes, and transcriptions I share with my students. Free to download — print them, mark them up, take them to the practice room.</p> </div> </header> <div class="pdfs-wrap"> ', ` <section class="pdf-handwritten-link" aria-label="Handwritten worksheets"> <p>
Looking for the older <a href="/pdfs/handwritten">handwritten worksheets</a>? They're tucked away on a separate page — to be digitized eventually.
</p> </section> </div> </main>  <script>
  // Mobile collapsibles for the PDF category sections.
  // Each .pdf-section-toggle is a disclosure button on viewports
  // <= 760px and a no-op heading on desktop. We toggle aria-expanded
  // on click; CSS handles the height animation. On resize we sync
  // aria state — added on mobile (default collapsed), removed on
  // desktop so the role of the heading is correctly announced.
  (function () {
    const toggles = document.querySelectorAll(".pdf-section-toggle");
    if (!toggles.length) return;

    const mq = window.matchMedia("(max-width: 760px)");

    function syncForViewport() {
      const isMobile = mq.matches;
      toggles.forEach(function (t, i) {
        if (isMobile) {
          // Open the first section by default so the page doesn't read
          // as empty on first load. Subsequent toggles persist via the
          // !hasAttribute guard until the viewport flips back.
          if (!t.hasAttribute("aria-expanded")) {
            t.setAttribute("aria-expanded", i === 0 ? "true" : "false");
          }
        } else {
          t.removeAttribute("aria-expanded");
        }
      });
    }

    toggles.forEach(function (t) {
      t.addEventListener("click", function () {
        // Click is a no-op on desktop where there is no aria-expanded.
        if (!t.hasAttribute("aria-expanded")) return;
        const expanded = t.getAttribute("aria-expanded") === "true";
        t.setAttribute("aria-expanded", expanded ? "false" : "true");
      });
    });

    syncForViewport();
    if (mq.addEventListener) {
      mq.addEventListener("change", syncForViewport);
    } else if (mq.addListener) {
      mq.addListener(syncForViewport);
    }
  })();
<\/script> `])), maybeRenderHead(), manifest.categories.map((cat) => renderTemplate`<section class="pdf-section"${addAttribute(cat.id, "id")}> <button class="pdf-section-toggle" type="button"${addAttribute(`${cat.id}-body`, "aria-controls")}> <span class="section-tag">${cat.title}</span> <span class="section-rule" aria-hidden="true"></span> <svg class="pdf-section-chevron" aria-hidden="true" viewBox="0 0 12 8" fill="none"> <path d="M1 1.5l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </button> <div class="pdf-section-body"${addAttribute(`${cat.id}-body`, "id")}> <div class="pdf-section-body-inner"> ${cat.blurb && renderTemplate`<p class="pdf-section-blurb">${cat.blurb}</p>`} <div class="pdf-grid"> ${cat.items.map((item) => {
    const landing = landingPathFor(cat.id, item.file);
    const thumb = item.thumbnail ?? "";
    const dims = thumbDims.get(thumb);
    const isLcp = thumb && thumb === firstThumb;
    return renderTemplate`<div class="pdf-card-wrap"> <a class="pdf-card"${addAttribute(landing, "href")}${addAttribute(`View details for ${item.title}`, "aria-label")}> <div class="pdf-thumb">  <img${addAttribute(thumb, "src")} alt=""${addAttribute(dims?.w, "width")}${addAttribute(dims?.h, "height")}${addAttribute(isLcp ? "eager" : "lazy", "loading")}${addAttribute(isLcp ? "high" : void 0, "fetchpriority")}${addAttribute(isLcp ? void 0 : "async", "decoding")}> </div> <div class="pdf-meta"> <div class="pdf-card-title">${item.title}</div> ${item.description && renderTemplate`<div class="pdf-card-desc">${item.description}</div>`} <div class="pdf-card-cta"> <span class="pdf-card-cta-label">View &amp; download</span> <span class="pdf-card-cta-arrow" aria-hidden="true">→</span> </div> </div> </a> <a class="pdf-card-pdf-link"${addAttribute(item.file, "href")} target="_blank" rel="noopener"${addAttribute(`Download ${item.title} PDF directly`, "aria-label")}>
PDF ↗
</a> </div>`;
  })} </div> </div> </div> </section>`)), "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "JsonLd", $$JsonLd, { "slot": "head", "data": graph })}${firstThumb && renderTemplate`<link rel="preload" as="image"${addAttribute(firstThumb, "href")} fetchpriority="high">`}` })}`;
}, "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/pdfs/index.astro", void 0);

const $$file = "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/pdfs/index.astro";
const $$url = "/pdfs/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
