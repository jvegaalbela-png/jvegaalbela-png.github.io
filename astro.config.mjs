// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// Pages that carry <meta name="robots" content="noindex"> shouldn't be in
// the sitemap — sending Google a list that includes URLs we then tell it
// not to index produces "Excluded by 'noindex' tag" entries in Search
// Console and wastes crawl budget.
const NOINDEX_PATHS = ['/book', '/join', '/pdfs/handwritten'];

// Old Squarespace URLs that Google still has indexed. Astro's static-build
// redirects generate HTML files with a <meta http-equiv="refresh"> plus a
// <link rel="canonical"> pointing at the destination. Google treats those
// like 301s for ranking-signal consolidation.
const REDIRECTS = {
 // Old lessons / education landings
 '/lessons-landing': '/drum-lessons',
 '/lessons-landing-3': '/drum-lessons',
 '/lessons-landing-3-mobile-1': '/drum-lessons',
 '/lessons-landing-3-old': '/drum-lessons',
 '/lessons-landing-3-dark': '/drum-lessons',
 '/education-1': '/drum-lessons',
 // Old "listen" pages — collapse to the homepage where the album lives
 '/listen/unbelonging': '/',
 '/listen/jacobo-vegaalbela-quartet': '/',
 // Old commerce / form URLs
 '/book-now-form': '/',
 '/cart': '/',
 '/store/category-2': '/',
};

// https://astro.build/config
export default defineConfig({
 site: 'https://jva-music.com',
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
