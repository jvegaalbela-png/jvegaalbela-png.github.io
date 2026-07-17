import { c as createComponent, $ as $$Layout, a as $$Image } from './Layout_By4Vyr6P.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from './prerender_vkmOfVOm.mjs';
import { g as getCollection } from './_astro_content_BqV4Ef79.mjs';
/* empty css                 */
import { P as PERSON, O as ORGANIZATION, a as ORGANIZATION_ID, b as PERSON_ID, S as SITE_URL, $ as $$JsonLd } from './schema_BJh2aw_a.mjs';
import { r as resolveHeroImage } from './heroImages_Cb9GbC6x.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const dateFmt = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const blogUrl = `${SITE_URL}/blog`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      PERSON,
      ORGANIZATION,
      {
        "@type": "Blog",
        "@id": `${blogUrl}#blog`,
        url: blogUrl,
        name: "JVA Music — Blog",
        description: "Essays on drumming, practice, and music from Jacobo Vega-Albela, a working jazz drummer in Rochester, NY.",
        inLanguage: "en-US",
        author: { "@id": PERSON_ID },
        publisher: { "@id": ORGANIZATION_ID },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${SITE_URL}/blog/${post.id}#post`,
          headline: post.data.title,
          description: post.data.description,
          url: `${SITE_URL}/blog/${post.id}`,
          datePublished: post.data.pubDate.toISOString(),
          ...post.data.updatedDate && {
            dateModified: post.data.updatedDate.toISOString()
          },
          author: { "@id": PERSON_ID },
          keywords: post.data.tags.join(", ")
        }))
      },
      {
        "@type": "WebPage",
        "@id": `${blogUrl}#webpage`,
        url: blogUrl,
        name: "Blog — Jacobo Vega-Albela",
        isPartOf: { "@id": `${blogUrl}#blog` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Blog", item: blogUrl }
          ]
        }
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog — Jacobo Vega-Albela", "description": "Essays on drumming, practice, and music — from a working jazz drummer in Rochester, NY.", "themeColor": "#091528", "data-astro-cid-5tznm7mj": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<main class="blog-index" data-astro-cid-5tznm7mj> <!-- HERO --> <header class="blog-hero" data-astro-cid-5tznm7mj> <div class="blog-hero-inner" data-astro-cid-5tznm7mj> <p class="blog-hero-eyebrow" data-astro-cid-5tznm7mj>Writing</p> <h1 class="blog-hero-title" data-astro-cid-5tznm7mj>Blog</h1> <p class="blog-hero-sub" data-astro-cid-5tznm7mj>
Essays on drumming, practice, and music — from a working jazz drummer in Rochester, NY.
</p> </div> </header> <!-- POSTS --> <section class="blog-list-section" data-astro-cid-5tznm7mj> <div class="blog-wrap" data-astro-cid-5tznm7mj> ${posts.length === 0 ? renderTemplate`<p class="blog-empty" data-astro-cid-5tznm7mj>No posts yet — check back soon.</p>` : renderTemplate`<ul class="post-list" data-astro-cid-5tznm7mj> ${posts.map((post, idx) => {
    const heroAsset = resolveHeroImage(post.data.heroImage);
    const isLcp = idx === 0;
    return renderTemplate`<li class="post-card" data-astro-cid-5tznm7mj> <a class="post-card-link"${addAttribute(`/blog/${post.id}`, "href")} data-astro-cid-5tznm7mj> ${heroAsset && renderTemplate`<figure class="post-card-img" data-astro-cid-5tznm7mj> ${renderComponent($$result2, "Image", $$Image, { "src": heroAsset, "alt": "", "widths": [400, 800, 1200], "sizes": "(min-width: 760px) 360px, 100vw", "loading": isLcp ? "eager" : "lazy", "fetchpriority": isLcp ? "high" : void 0, "decoding": isLcp ? "auto" : "async", "quality": 55, "data-astro-cid-5tznm7mj": true })} </figure>`} <div class="post-card-body" data-astro-cid-5tznm7mj> <p class="post-card-meta" data-astro-cid-5tznm7mj> <time${addAttribute(post.data.pubDate.toISOString(), "datetime")} data-astro-cid-5tznm7mj> ${dateFmt.format(post.data.pubDate)} </time> </p> <h2 class="post-card-title" data-astro-cid-5tznm7mj>${post.data.title}</h2> <p class="post-card-desc" data-astro-cid-5tznm7mj>${post.data.description}</p> ${post.data.tags.length > 0 && renderTemplate`<ul class="post-card-tags" data-astro-cid-5tznm7mj> ${post.data.tags.map((tag) => renderTemplate`<li class="post-card-tag" data-astro-cid-5tznm7mj>${tag}</li>`)} </ul>`} </div> </a> </li>`;
  })} </ul>`} </div> </section> </main> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "JsonLd", $$JsonLd, { "slot": "head", "data": graph, "data-astro-cid-5tznm7mj": true })}` })}`;
}, "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/blog/index.astro", void 0);

const $$file = "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/blog/index.astro";
const $$url = "/blog/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
