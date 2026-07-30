// Generates optimized WebP thumbnails from the first page of every PDF item
// in src/data/pdfs.json.
//
// Pipeline: pdf-to-img renders the first page as a high-res PNG buffer →
// sharp resizes to THUMB_WIDTH and encodes as WebP.  Generating at a higher
// internal resolution then downscaling gives cleaner anti-aliasing than
// rendering at the target size directly.
//
// AUTO-THUMBNAIL PATHS: Items without a `thumbnail` field (or with an empty
// one) get a path auto-derived from their `file` field:
//   /pdfs/single-surface/tech-routine-1.pdf
//     → /pdfs/_thumbs/single-surface/tech-routine-1.webp
//   /pdfs/Eighth Notes Explained.pdf
//     → /pdfs/_thumbs/eighth-notes-explained.webp
// After generation, the item's `thumbnail` field is written back to pdfs.json
// so subsequent runs skip it.
//
// Skips re-rendering when the existing thumbnail is newer than its source
// PDF, so re-runs after adding a single PDF are fast.
//
// Run with:  npm run pdfs:thumbs

import { pdf } from 'pdf-to-img';
import sharp from 'sharp';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
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

// Slugifies a filename: lowercase, collapses runs of non-alphanumeric chars
// to a single hyphen, strips leading/trailing hyphens.
function slugify(name) {
  return name
    .replace(/\.[^.]+$/, '')              // strip extension
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Auto-derives a thumbnail path from a PDF file path.
//   /pdfs/single-surface/foo.pdf  →  /pdfs/_thumbs/single-surface/foo.webp
//   /pdfs/My Cool File.pdf        →  /pdfs/_thumbs/my-cool-file.webp
function deriveThumbnailPath(filePath) {
  const relative = filePath.replace(/^\/pdfs\//, '');
  const parts    = relative.split('/');
  const filename = slugify(parts.pop());
  const dir      = parts.join('/');
  return `/pdfs/_thumbs${dir ? '/' + dir : ''}/${filename}.webp`;
}

const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));

let rendered = 0;
let skipped  = 0;
let failed   = 0;
let updated  = false;  // flag to write pdfs.json if any thumbnail field was set

for (const cat of manifest.categories) {
  for (const item of cat.items) {
    // Auto-derive thumbnail path if not set
    if (!item.thumbnail) {
      item.thumbnail = deriveThumbnailPath(item.file);
      updated = true;
    }

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

// Write updated pdfs.json back so auto-derived thumbnail paths persist
if (updated) {
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`\n[meta] Updated ${MANIFEST} with ${rendered > 0 ? rendered : 'auto-derived'} thumbnail path(s).`);
}

console.log(`\n${rendered} rendered, ${skipped} up-to-date, ${failed} failed.`);
if (failed > 0) process.exit(1);
