// Generates first-page PNG thumbnails for every PDF referenced in
// src/data/pdfs.json (skipping the handwritten section, which renders
// as a plain list with no previews).
//
// Output: public/pdfs/_thumbs/<category>/<slug>.png
//
// Skips re-rendering when the existing thumbnail is newer than its
// source PDF, so re-runs after dropping in a single new PDF are fast.
//
// Run with:  npm run pdfs:thumbs

import { pdf } from 'pdf-to-img';
import { readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = resolve(__dirname, '..');
const PDF_ROOT  = join(ROOT, 'public', 'pdfs');
const THUMB_ROOT = join(PDF_ROOT, '_thumbs');
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
  const srcDir = join(PDF_ROOT, cat.id);
  const dstDir = join(THUMB_ROOT, cat.id);
  await mkdir(dstDir, { recursive: true });

  for (const item of cat.items) {
    const src = join(srcDir, item.file);
    const dst = join(dstDir, item.file.replace(/\.pdf$/i, '.png'));

    if (!existsSync(src)) {
      console.warn(`[miss] ${cat.id}/${item.file} — listed in manifest but file not found`);
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
      const doc = await pdf(src, { scale: SCALE });
      let wroteFirst = false;
      for await (const page of doc) {
        await writeFile(dst, page);
        wroteFirst = true;
        break;
      }
      if (wroteFirst) {
        console.log(`[ok]   ${cat.id}/${item.file}`);
        rendered++;
      } else {
        console.warn(`[empty] ${cat.id}/${item.file} — no pages?`);
        failed++;
      }
    } catch (err) {
      console.error(`[fail] ${cat.id}/${item.file} — ${err.message}`);
      failed++;
    }
  }
}

console.log(`\n${rendered} rendered, ${skipped} up-to-date, ${failed} failed.`);
if (failed > 0) process.exit(1);
