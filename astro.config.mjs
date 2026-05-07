// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// Pages that carry <meta name="robots" content="noindex"> shouldn't be in
// the sitemap — sending Google a list that includes URLs we then tell it
// not to index produces "Excluded by 'noindex' tag" entries in Search
// Console and wastes crawl budget.
const NOINDEX_PATHS = ['/book', '/join', '/pdfs/handwritten'];

// https://astro.build/config
export default defineConfig({
 site: 'https://jva-music.com',
 integrations: [
  mdx(),
  sitemap({
   filter: (page) =>
    !NOINDEX_PATHS.some(
     (p) =>
      page === `https://jva-music.com${p}/` ||
      page === `https://jva-music.com${p}`,
    ),
  }),
 ],
 build: {
  inlineStylesheets: 'always',
 },
});
