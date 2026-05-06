// Generates first-page PNG thumbnails for every PDF item in
// src/data/pdfs.json that has a `thumbnail` field (handwritten items are
// skipped — they render as a plain list with no previews).
//
// Items store absolute public paths:
//   file:      /pdfs/single-surface/tech-routine-1.pdf
//   thumbnail: /pdfs/_thumbs/single-surface/tech-routine-1.png
//
// The script maps those paths to disk locations under public/ and outputs
// the PNG there.  Skips re-rendering when the existing thumbnail is newer
// than its source PDF, so re-runs after adding a single PDF are fast.
//
// Run with:  npm run pdfs:thumbs

import { pdf } from 'pdf-to-img';
import { readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = resolve(__dirname, '..');
const MANIFEST  = join(ROOT, 'src', 'data', 'pdfs.json');

// Higher scale = sharper thumbnails at the cost of larger PNGs.
// At scale 1.5 a letter-size PDF page renders to roughly 920×1190 px,
// which downscales cleanly to the ~300px-wide grid card.
const SCALE = 1.5;

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
        await writeFile(dst, page);
        wroteFirst = true;
        break;
      }
      if (wroteFirst) {
        console.log(`[ok]   ${item.file}`);
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
