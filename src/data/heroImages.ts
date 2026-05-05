import type { ImageMetadata } from 'astro';

const heroModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/blog/*.{webp,avif,jpg,jpeg,png,gif}',
  { eager: true },
);

const heroByFilename = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(heroModules)) {
  const filename = path.split('/').pop();
  if (filename) heroByFilename.set(filename, mod.default);
}

export function resolveHeroImage(rawPath: string | undefined): ImageMetadata | undefined {
  if (!rawPath) return undefined;
  const filename = rawPath.split('/').pop();
  if (!filename) return undefined;
  const found = heroByFilename.get(filename);
  if (!found) {
    console.warn(
      `[heroImages] No matching file in src/assets/blog for "${rawPath}". ` +
        `Run \`npm run build\` after Sveltia uploads sync, or copy manually.`,
    );
  }
  return found;
}
