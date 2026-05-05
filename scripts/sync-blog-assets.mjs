// Mirror new images uploaded by Sveltia (public/uploads/blog) into src/assets/blog
// so Astro's content-collection image pipeline can optimize them.
//
// Sveltia stores frontmatter as `/uploads/blog/<file>` (a deployed URL the CMS can preview).
// Astro renders heroes by importing the same filename out of src/assets/blog via
// import.meta.glob (see src/data/heroImages.ts).
//
// Files in public/uploads/blog stay there so CMS thumbnails keep working post-deploy;
// they're served alongside the optimized variants but are not referenced by the site itself.

import { mkdir, readdir, copyFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'public', 'uploads', 'blog');
const DST = join(root, 'src', 'assets', 'blog');

const IMAGE_EXT = /\.(webp|avif|jpe?g|png|gif)$/i;

if (!existsSync(SRC)) {
  console.log(`[sync-blog-assets] No ${SRC} — nothing to sync.`);
  process.exit(0);
}

await mkdir(DST, { recursive: true });

const files = (await readdir(SRC)).filter((name) => IMAGE_EXT.test(name));
let copied = 0;
let skipped = 0;

for (const name of files) {
  const from = join(SRC, name);
  const to = join(DST, name);
  const fromStat = await stat(from);
  let needsCopy = true;
  if (existsSync(to)) {
    const toStat = await stat(to);
    needsCopy = fromStat.size !== toStat.size || fromStat.mtimeMs > toStat.mtimeMs;
  }
  if (needsCopy) {
    await copyFile(from, to);
    copied++;
  } else {
    skipped++;
  }
}

console.log(`[sync-blog-assets] Copied ${copied}, skipped ${skipped} (of ${files.length}) into src/assets/blog.`);
