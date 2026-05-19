// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// Pages that carry <meta name="robots" content="noindex"> shouldn't be in
// the sitemap — sending Google a list that includes URLs we then tell it
// not to index produces "Excluded by 'noindex' tag" entries in Search
// Console and wastes crawl budget.
const NOINDEX_PATHS = ['/book', '/join', '/pdfs/handwritten', '/palette'];

// Old Squarespace URLs that Google still has indexed. Astro's static-build
// redirects generate HTML files with a <meta http-equiv="refresh"> plus a
// <link rel="canonical"> pointing at the destination. Google treats those
// like 301s for ranking-signal consolidation.
const REDIRECTS = {
 // Old lessons / education landings
 '/lessons-landing': '/drum-lessons',
 '/lessons-landing-3': '/drum-lessons',
 '/lessons-landing-3-mobile-1': '/drum-lessons',
 '/lessons-landing-3-mobile-2': '/drum-lessons',
 '/lessons-landing-3-old': '/drum-lessons',
 '/lessons-landing-3-dark': '/drum-lessons',
 '/education-1': '/drum-lessons',
 // Old "listen" pages — collapse to the homepage where the album lives
 '/listen': '/',
 '/listen/unbelonging': '/',
 '/listen/jacobo-vegaalbela-quartet': '/',
 // Old commerce / form URLs
 '/book-now-form': '/',
 '/cart': '/',
 '/store/category-2': '/',
 // Old Squarespace contact-form variants
 '/contact-1': '/',
 '/contact-6': '/',
 // Old Squarespace events index (Cloudflare also handles subpaths
 // like /upcoming-events/{slug} via a subpath-matching bulk redirect)
 '/upcoming-events': '/',
};

// https://astro.build/config
export default defineConfig({
 site: 'https://jva-music.com',
 // Force every route to canonicalize on the trailing-slash form
 // (/drum-lessons/ rather than /drum-lessons). Astro normalizes
 // Astro.url.pathname to match, so the canonical link in Layout.astro
 // is consistent regardless of which URL the visitor came in on, and
 // Google / sitemap / internal links all agree.
 trailingSlash: 'always',
 redirects: REDIRECTS,
 integrations: [
  mdx(),
  sitemap({
   filter: (page) => {
    if (NOINDEX_PATHS.some(
     (p) =>
      page === `https://jva-music.com${p}/` ||
      page === `https://jva-music.com${p}`,
    )) return false;
    // Redirect source paths shouldn't be in the sitemap either.
    if (Object.keys(REDIRECTS).some(
     (p) =>
      page === `https://jva-music.com${p}/` ||
      page === `https://jva-music.com${p}`,
    )) return false;
    return true;
   },
  }),
 ],
 build: {
  inlineStylesheets: 'always',
 },
});
