import { c as createComponent, g as getImage, $ as $$Layout, a as $$Image } from './Layout_By4Vyr6P.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, F as Fragment, b as addAttribute, m as maybeRenderHead } from './prerender_vkmOfVOm.mjs';
import { g as getCollection, r as renderEntry } from './_astro_content_BqV4Ef79.mjs';
/* empty css                 */
import { S as SITE_URL, P as PERSON, O as ORGANIZATION, a as ORGANIZATION_ID, b as PERSON_ID, $ as $$JsonLd } from './schema_BJh2aw_a.mjs';
import { r as resolveHeroImage } from './heroImages_Cb9GbC6x.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$;
  const { post } = Astro2.props;
  const { Content } = await renderEntry(post);
  const dateFmt = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const postUrl = `${SITE_URL}/blog/${post.id}`;
  const heroAsset = resolveHeroImage(post.data.heroImage);
  let heroImage;
  if (heroAsset) {
    const optimized = await getImage({ src: heroAsset, width: 1200 });
    heroImage = {
      url: new URL(optimized.src, SITE_URL).toString(),
      width: optimized.attributes.width,
      height: optimized.attributes.height,
      type: "image/webp",
      alt: `Hero image for "${post.data.title}"`
    };
  }
  const wordCount = post.body ? post.body.replace(/```[\s\S]*?```/g, " ").replace(/`[^`]*`/g, " ").replace(/!\[[^\]]*\]\([^)]*\)/g, " ").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/<[^>]+>/g, " ").replace(/[*_~#>|]/g, " ").split(/\s+/).filter(Boolean).length : void 0;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      PERSON,
      ORGANIZATION,
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#post`,
        headline: post.data.title,
        description: post.data.description,
        url: postUrl,
        mainEntityOfPage: postUrl,
        datePublished: post.data.pubDate.toISOString(),
        dateModified: (post.data.updatedDate ?? post.data.pubDate).toISOString(),
        author: { "@id": PERSON_ID },
        publisher: { "@id": ORGANIZATION_ID },
        ...heroImage && {
          image: {
            "@type": "ImageObject",
            url: heroImage.url,
            width: heroImage.width,
            height: heroImage.height,
            caption: heroImage.alt
          }
        },
        keywords: post.data.tags.join(", "),
        ...wordCount && { wordCount },
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/blog#blog` }
      },
      {
        "@type": "WebPage",
        "@id": `${postUrl}#webpage`,
        url: postUrl,
        name: post.data.title,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
            { "@type": "ListItem", position: 3, name: post.data.title, item: postUrl }
          ]
        }
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${post.data.title} — JVA Music`, "description": post.data.description, "themeColor": "#091528", "image": heroImage, "og": { title: post.data.title, description: post.data.description, type: "article", image: heroImage } }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<main class="post"> <!-- HERO --> <header class="post-hero"> <div class="post-hero-inner"> <div class="post-hero-text"> <p class="post-hero-eyebrow"> <a href="/blog">Blog</a> <span class="sep" aria-hidden="true">·</span> <time', "> ", " </time> ", ' </p> <h1 class="post-hero-title">', '</h1> <p class="post-hero-desc">', "</p> ", " </div> ", ' </div> </header> <!-- ARTICLE --> <article class="post-article"> <div class="prose"> ', ` </div> <nav class="post-back"> <a href="/blog">← Back to all posts</a> </nav> </article> </main> <script>
    // Click-to-load facade for YouTube iframes embedded in MDX prose.
    // The rudiments post has 7 of them; even with loading="lazy" the
    // browser still kicks off requests to youtube.com, pulling in
    // ~500KB of JS per iframe. That was driving mobile FCP to 16s.
    // We replace each iframe with a CSS-only button placeholder and
    // restore the real iframe (with autoplay=1) on click.
    (function () {
      try {
        var iframes = document.querySelectorAll('.video-embed iframe');
        iframes.forEach(function (iframe) {
          if (!/youtube\\.com\\/embed/.test(iframe.src || '')) return;
          var src = iframe.src;
          var title = iframe.title || '';
          var allow = iframe.getAttribute('allow') || '';
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'yt-prose-facade';
          btn.setAttribute('aria-label', 'Play: ' + title);
          btn.innerHTML =
            '<span class="yt-prose-play" aria-hidden="true">' +
            '<svg viewBox="0 0 68 48" focusable="false">' +
            '<path class="yt-prose-bg" d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.63-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"/>' +
            '<path d="M 45,24 27,14 27,34" fill="#fff"/>' +
            '</svg></span>';
          btn.addEventListener('click', function () {
            var f = document.createElement('iframe');
            f.src = src + (src.indexOf('?') >= 0 ? '&' : '?') + 'autoplay=1';
            f.title = title;
            if (allow) f.setAttribute('allow', allow);
            f.allowFullscreen = true;
            f.frameBorder = '0';
            btn.replaceWith(f);
          }, { once: true });
          iframe.replaceWith(btn);
        });
      } catch (e) { /* leave iframes as-is on any error */ }
    })();
  <\/script> `], ["  ", '<main class="post"> <!-- HERO --> <header class="post-hero"> <div class="post-hero-inner"> <div class="post-hero-text"> <p class="post-hero-eyebrow"> <a href="/blog">Blog</a> <span class="sep" aria-hidden="true">·</span> <time', "> ", " </time> ", ' </p> <h1 class="post-hero-title">', '</h1> <p class="post-hero-desc">', "</p> ", " </div> ", ' </div> </header> <!-- ARTICLE --> <article class="post-article"> <div class="prose"> ', ` </div> <nav class="post-back"> <a href="/blog">← Back to all posts</a> </nav> </article> </main> <script>
    // Click-to-load facade for YouTube iframes embedded in MDX prose.
    // The rudiments post has 7 of them; even with loading="lazy" the
    // browser still kicks off requests to youtube.com, pulling in
    // ~500KB of JS per iframe. That was driving mobile FCP to 16s.
    // We replace each iframe with a CSS-only button placeholder and
    // restore the real iframe (with autoplay=1) on click.
    (function () {
      try {
        var iframes = document.querySelectorAll('.video-embed iframe');
        iframes.forEach(function (iframe) {
          if (!/youtube\\\\.com\\\\/embed/.test(iframe.src || '')) return;
          var src = iframe.src;
          var title = iframe.title || '';
          var allow = iframe.getAttribute('allow') || '';
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'yt-prose-facade';
          btn.setAttribute('aria-label', 'Play: ' + title);
          btn.innerHTML =
            '<span class="yt-prose-play" aria-hidden="true">' +
            '<svg viewBox="0 0 68 48" focusable="false">' +
            '<path class="yt-prose-bg" d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.63-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"/>' +
            '<path d="M 45,24 27,14 27,34" fill="#fff"/>' +
            '</svg></span>';
          btn.addEventListener('click', function () {
            var f = document.createElement('iframe');
            f.src = src + (src.indexOf('?') >= 0 ? '&' : '?') + 'autoplay=1';
            f.title = title;
            if (allow) f.setAttribute('allow', allow);
            f.allowFullscreen = true;
            f.frameBorder = '0';
            btn.replaceWith(f);
          }, { once: true });
          iframe.replaceWith(btn);
        });
      } catch (e) { /* leave iframes as-is on any error */ }
    })();
  <\/script> `])), maybeRenderHead(), addAttribute(post.data.pubDate.toISOString(), "datetime"), dateFmt.format(post.data.pubDate), post.data.updatedDate && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <span class="sep" aria-hidden="true">·</span> <span>Updated ${dateFmt.format(post.data.updatedDate)}</span> ` })}`, post.data.title, post.data.description, post.data.tags.length > 0 && renderTemplate`<ul class="post-hero-tags"> ${post.data.tags.map((tag) => renderTemplate`<li class="post-hero-tag">${tag}</li>`)} </ul>`, heroAsset && renderTemplate`<figure class="post-hero-img"> ${renderComponent($$result2, "Image", $$Image, { "src": heroAsset, "alt": "", "widths": [400, 600, 900, 1200], "sizes": "(min-width: 900px) 420px, 100vw", "loading": "eager", "fetchpriority": "high", "decoding": "auto", "quality": 55 })} </figure>`, renderComponent($$result2, "Content", Content, {})), "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "JsonLd", $$JsonLd, { "slot": "head", "data": graph })}` })}`;
}, "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/blog/[...slug].astro", void 0);

const $$file = "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
