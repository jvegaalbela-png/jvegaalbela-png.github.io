import { c as createComponent, $ as $$Layout } from './Layout_By4Vyr6P.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_vkmOfVOm.mjs';
/* empty css                 */

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page Not Found — Jacobo Vega-Albela", "description": "That page doesn't exist on jva-music.com. Try one of the links below.", "themeColor": "#091528", "noindex": true, "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="notfound" data-astro-cid-zetdm5md> <div class="nf-inner" data-astro-cid-zetdm5md> <p class="nf-eyebrow" data-astro-cid-zetdm5md>404</p> <h1 class="nf-title" data-astro-cid-zetdm5md>Page not found.</h1> <p class="nf-sub" data-astro-cid-zetdm5md>
The page you're looking for doesn't exist or has moved. Try one of these:
</p> <ul class="nf-links" data-astro-cid-zetdm5md> <li data-astro-cid-zetdm5md><a href="/" data-astro-cid-zetdm5md>Home</a></li> <li data-astro-cid-zetdm5md><a href="/drum-lessons" data-astro-cid-zetdm5md>Drum Lessons in Rochester, NY</a></li> <li data-astro-cid-zetdm5md><a href="/group-classes" data-astro-cid-zetdm5md>Online Group Drum Class (DJ1)</a></li> <li data-astro-cid-zetdm5md><a href="/blog" data-astro-cid-zetdm5md>Blog</a></li> <li data-astro-cid-zetdm5md><a href="/pdfs" data-astro-cid-zetdm5md>Free Teaching PDFs</a></li> <li data-astro-cid-zetdm5md><a href="/metronome" data-astro-cid-zetdm5md>Metronome</a></li> </ul> </div> </main> ` })}`;
}, "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/404.astro", void 0);

const $$file = "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/404.astro";
const $$url = "/404/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
