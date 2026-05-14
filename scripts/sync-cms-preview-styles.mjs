// Copy the site's global stylesheet into public/admin/ so the Sveltia CMS
// preview pane can load it. The CMS preview renders in an isolated iframe
// that doesn't inherit the site's CSS, so blog-post drafts show up
// unstyled unless we explicitly register a stylesheet (see the
// registerPreviewStyle call in public/admin/index.html).
//
// We can't point the CMS at Astro's built CSS — that's bundled into
// dist/_astro/*.css with content-hashed filenames that change every
// build. Instead we copy the source stylesheets verbatim into public/,
// where Astro serves them at a stable /admin/ URL. global.css starts
// with `@import './_tokens.css'`, so both files have to land side by
// side for that import to resolve.
//
// The copies are git-ignored and regenerated on every dev/build, so
// they never drift from src/styles/.

import { copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'src', 'styles');
const DST = join(root, 'public', 'admin');
const FILES = ['_tokens.css', 'global.css'];

for (const name of FILES) {
  const from = join(SRC, name);
  const to = join(DST, name);
  if (!existsSync(from)) {
    console.warn(`[sync-cms-preview-styles] Missing ${from} — skipped.`);
    continue;
  }
  await copyFile(from, to);
  console.log(`[sync-cms-preview-styles] ${name} → public/admin/`);
}
