// Generate PWA icons from the home-page hero painting
// (src/assets/album-art.jpg) into public/icons/. Run via:
//
//   node scripts/generate-pwa-icons.mjs
//
// Produces:
//   icon-192.png            — standard PWA icon
//   icon-512.png            — standard PWA icon + splash
//   icon-180.png            — apple-touch-icon
//   icon-192-maskable.png   — Android adaptive icon (78% safe zone)
//   icon-512-maskable.png   — Android adaptive icon (78% safe zone)
//
// The maskable variants pad the painting inside the page's navy bg so
// the painting still reads cleanly no matter how the OS masks it
// (circle, squircle, rounded square).

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, '..', 'src', 'assets', 'album-art.jpg');
const OUT = path.join(__dirname, '..', 'public', 'icons');
const BG  = { r: 13, g: 13, b: 26, alpha: 1 };  // matches Layout themeColor #0d0d1a

await mkdir(OUT, { recursive: true });

async function fullBleed(size, filename) {
  await sharp(SRC)
    .resize(size, size, { fit: 'cover' })
    .png({ quality: 92, compressionLevel: 9 })
    .toFile(path.join(OUT, filename));
  console.log(`  ${filename}  (${size}×${size})`);
}

async function maskable(size, filename) {
  const inner = Math.round(size * 0.78);
  const offset = Math.round((size - inner) / 2);
  const innerBuf = await sharp(SRC).resize(inner, inner, { fit: 'cover' }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: innerBuf, top: offset, left: offset }])
    .png({ quality: 92, compressionLevel: 9 })
    .toFile(path.join(OUT, filename));
  console.log(`  ${filename}  (${size}×${size}, maskable / 78% safe-zone)`);
}

console.log('Generating PWA icons from', path.relative(process.cwd(), SRC));
await fullBleed(180, 'icon-180.png');
await fullBleed(192, 'icon-192.png');
await fullBleed(512, 'icon-512.png');
await maskable(192,  'icon-192-maskable.png');
await maskable(512,  'icon-512-maskable.png');
console.log('Done.');
