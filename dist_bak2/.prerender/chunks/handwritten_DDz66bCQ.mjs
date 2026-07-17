import { c as createComponent, $ as $$Layout } from './Layout_By4Vyr6P.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from './prerender_vkmOfVOm.mjs';
/* empty css                 */
import { m as manifest } from './pdfs_BnUPHxhD.mjs';

const $$Handwritten = createComponent(($$result, $$props, $$slots) => {
  const { handwritten } = manifest;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Handwritten Worksheets — Jacobo Vega-Albela", "description": "Older handwritten teaching worksheets — to be digitized eventually.", "themeColor": "#091528", "noindex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="hw-wrap"> <nav class="hw-back" aria-label="Breadcrumb"> <a href="/pdfs">← Back to all PDFs</a> </nav> <header class="hw-head"> <span class="hw-eyebrow">Archive</span> <h1 class="hw-title">Handwritten <em>Worksheets</em></h1> ${renderTemplate`<p class="hw-sub">${handwritten.blurb}</p>`} </header> <ul class="hw-list"> ${handwritten.items.map((item) => {
    const href = item.file;
    return renderTemplate`<li class="hw-item"> <a class="hw-link"${addAttribute(href, "href")} target="_blank" rel="noopener"> <span class="hw-link-title">${item.title}</span> <span class="hw-link-arrow" aria-hidden="true">↗</span> </a> ${item.description && renderTemplate`<p class="hw-desc">${item.description}</p>`} </li>`;
  })} </ul> </main> ` })}`;
}, "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/pdfs/handwritten.astro", void 0);

const $$file = "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/pdfs/handwritten.astro";
const $$url = "/pdfs/handwritten/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Handwritten,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
