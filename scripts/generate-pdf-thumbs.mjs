// Generates optimized WebP thumbnails from the first page of every PDF item
// in src/data/pdfs.json that has a `thumbnail` field (handwritten items are
// skipped — they render as a plain list with no previews).
//
// Pipeline: pdf-to-img renders the first page as a high-res PNG buffer →
// sharp resizes to THUMB_WIDTH and encodes as WebP.  Generating at a higher
// internal resolution then downscaling gives cleaner anti-aliasing than
// rendering at the target size directly.
//
// Items store absolute public paths:
//   file:      /pdfs/single-surface/tech-routine-1.pdf
//   thumbnail: /pdfs/_thumbs/single-surface/tech-routine-1.webp
//
// Skips re-rendering when the existing thumbnail is newer than its source
// PDF, so re-runs after adding a single PDF are fast.
//
// Run with:  npm run pdfs:thumbs

import { pdf } from 'pdf-to-img';
import sharp from 'sharp';
import { readFile, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = resolve(__dirname, '..');
const MANIFEST  = join(ROOT, 'src', 'data', 'pdfs.json');

// pdf-to-img render scale — higher = sharper input for sharp to downsample.
// 1.5× gives ~920px wide for a letter page, plenty of detail at THUMB_WIDTH.
const SCALE      = 1.5;
// Final output width in pixels. 600px = 2× the ~300px grid card, so it
// looks sharp on high-DPI screens without wasting bytes.
const THUMB_WIDTH = 600;
// WebP quality (0–100). 85 balances visual fidelity and file size well for
// line-art / music notation content.
const WEBP_QUALITY = 85;

const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));

let rendered = 0;
let skipped = 0;
let failed = 0;

for (const cat of manifest.categories) {
  for (const item of cat.items) {
    if (!item.thumbnail) continue;

    // item.file and item.thumbnail are absolute public paths (/pdfs/…)
    const src = join(ROOT, 'public', item.file.slice(1));
    const dst = join(ROOT, 'public', item.thumbnail.slice(1));

    if (!existsSync(src)) {
      console.warn(`[miss] ${item.file} — listed in manifest but file not found`);
      failed++;
      continue;
    }

    if (existsSync(dst)) {
      const [s, d] = await Promise.all([stat(src), stat(dst)]);
      if (d.mtimeMs >= s.mtimeMs) {
        skipped++;
        continue;
      }
    }

    try {
      await mkdir(dirname(dst), { recursive: true });
      const doc = await pdf(src, { scale: SCALE });
      let wroteFirst = false;
      for await (const page of doc) {
        // page is a high-res PNG Buffer; pipe through sharp to resize + encode
        await sharp(page)
          .resize(THUMB_WIDTH, null, { withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY })
          .toFile(dst);
        wroteFirst = true;
        break;
      }
      if (wroteFirst) {
        const { size } = await stat(dst);
        console.log(`[ok]   ${item.file}  →  ${Math.round(size / 1024)} kB WebP`);
        rendered++;
      } else {
        console.warn(`[empty] ${item.file} — no pages?`);
        failed++;
      }
    } catch (err) {
      console.error(`[fail] ${item.file} — ${err.message}`);
      failed++;
    }
  }
}

console.log(`\n${rendered} rendered, ${skipped} up-to-date, ${failed} failed.`);
if (failed > 0) process.exit(1);
