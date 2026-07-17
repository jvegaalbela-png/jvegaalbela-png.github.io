import { c as createComponent, $ as $$Layout } from './Layout_By4Vyr6P.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_vkmOfVOm.mjs';
/* empty css                      */
import { $ as $$LessonForm } from './LessonForm_4ByaJhVT.mjs';

const $$Join = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Join the DJ1 Waitlist — Jacobo Vega-Albela", "description": "Join the waitlist for DJ1, a 10-week online group drum class for complete beginners. Tell me a few details and I'll be in touch as soon as dates are set.", "themeColor": "#091528", "noindex": true, "data-astro-cid-jtzn4zcc": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-jtzn4zcc> <section class="join-hero" data-astro-cid-jtzn4zcc> <div class="join-wrap" data-astro-cid-jtzn4zcc> <p class="hero-eyebrow" data-astro-cid-jtzn4zcc>DJ1 Pilot Cohort Waitlist</p> <h1 data-astro-cid-jtzn4zcc>Get on the <em data-astro-cid-jtzn4zcc>waitlist</em>.</h1> <p class="hero-sub" data-astro-cid-jtzn4zcc>The pilot cohort is capped at <strong data-astro-cid-jtzn4zcc>10</strong>. Fill out a few details and I'll be in touch as soon as dates and a start week are set.</p> ${renderComponent($$result2, "LessonForm", $$LessonForm, { "formId": "xkoyjkzk", "formIdSlug": "join-waitlist-form", "submitLabel": "Request a Waitlist Spot", "showTimezone": true, "showExperience": true, "submitEvent": "dj1_waitlist_submit", "submitEventParams": { form_location: "join_page" }, "data-astro-cid-jtzn4zcc": true })} <div class="join-aside" data-astro-cid-jtzn4zcc> <a class="tel-link" href="tel:+15858024247" aria-label="Text or call 5 8 5, 8 0 2, 4 2 4 7" onclick="gtag('event', 'cta_call_click', { location: 'join_page' })" data-astro-cid-jtzn4zcc>Text or call (585) 802-4247</a> <p class="trust-line" data-astro-cid-jtzn4zcc>Google Business Screened &nbsp;·&nbsp; Background-checked &amp; verified</p> <p class="join-back" data-astro-cid-jtzn4zcc><a href="/group-classes" data-astro-cid-jtzn4zcc>&larr; Back to group classes</a></p> </div> </div> </section> </main> ` })}`;
}, "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/join.astro", void 0);

const $$file = "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/join.astro";
const $$url = "/join/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Join,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
