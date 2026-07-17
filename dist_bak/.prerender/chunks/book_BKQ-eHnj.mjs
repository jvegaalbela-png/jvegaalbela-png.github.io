import { c as createComponent, $ as $$Layout } from './Layout_By4Vyr6P.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_vkmOfVOm.mjs';
/* empty css                  */
import { $ as $$LessonForm } from './LessonForm_4ByaJhVT.mjs';

const $$Book = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Book Your Half-Price Lesson — Jacobo Vega-Albela", "description": "Book your half-price first drum lesson with Jacobo Vega-Albela in Rochester, NY. Tell me a few details and I'll be in touch ASAP.", "themeColor": "#091528", "noindex": true, "data-astro-cid-uk4drrvt": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-uk4drrvt> <section class="book-hero" data-astro-cid-uk4drrvt> <div class="book-wrap" data-astro-cid-uk4drrvt> <p class="hero-eyebrow" data-astro-cid-uk4drrvt>Half-Price First Lesson</p> <h1 data-astro-cid-uk4drrvt>Let's set up your <em data-astro-cid-uk4drrvt>first lesson</em>.</h1> <p class="hero-sub" data-astro-cid-uk4drrvt>Fill out a few details and I'll be in touch ASAP. Your first lesson is half off — just <strong data-astro-cid-uk4drrvt>$25</strong> for an hour or <strong data-astro-cid-uk4drrvt>$15</strong> for thirty minutes.</p> ${renderComponent($$result2, "LessonForm", $$LessonForm, { "formId": "xjglgjjj", "formIdSlug": "book-lesson-form", "showLessonType": true, "showLocation": true, "submitEvent": "lesson_inquiry_submit", "submitEventParams": { form_location: "book_page" }, "data-astro-cid-uk4drrvt": true })} <div class="book-aside" data-astro-cid-uk4drrvt> <a class="tel-link" href="tel:+15858024247" aria-label="Text or call 5 8 5, 8 0 2, 4 2 4 7" onclick="gtag('event', 'cta_call_click', { location: 'book_page' })" data-astro-cid-uk4drrvt>Text or call (585) 802-4247</a> <p class="trust-line" data-astro-cid-uk4drrvt>Google Business Screened &nbsp;·&nbsp; Background-checked &amp; verified</p> <p class="book-back" data-astro-cid-uk4drrvt><a href="/drum-lessons" data-astro-cid-uk4drrvt>&larr; Back to drum lessons</a></p> </div> </div> </section> </main> ` })}`;
}, "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/book.astro", void 0);

const $$file = "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/book.astro";
const $$url = "/book/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Book,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
