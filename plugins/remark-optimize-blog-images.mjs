import { dirname, relative, join } from 'node:path';
import { visit } from 'unist-util-visit';

// Sveltia stores inline image URLs as the deployed public path
// (/uploads/blog/<file>). On its own Astro treats those as external
// assets and serves them unoptimized. scripts/sync-blog-assets.mjs
// already mirrors every upload into src/assets/blog so the image
// pipeline *can* optimize them (that's what heroImages.ts relies on);
// this plugin is the missing link for inline body images. It rewrites
// the public path to the matching source asset so Astro emits
// responsive, hashed variants — while the markdown the CMS reads/writes
// keeps using the /uploads/blog path it understands.
const PUBLIC_PREFIX = '/uploads/blog/';

export default function remarkOptimizeBlogImages() {
  const assetsDir = join(process.cwd(), 'src', 'assets', 'blog');
  return (tree, file) => {
    const mdDir = file?.path ? dirname(file.path) : null;
    visit(tree, 'image', (node) => {
      if (typeof node.url !== 'string' || !node.url.startsWith(PUBLIC_PREFIX)) return;
      const name = node.url.slice(PUBLIC_PREFIX.length);
      if (!name || name.includes('..')) return;
      const target = join(assetsDir, name);
      let rel = mdDir ? relative(mdDir, target) : join('..', '..', 'assets', 'blog', name);
      rel = rel.split('\\').join('/');
      if (!rel.startsWith('.')) rel = `./${rel}`;
      node.url = rel;
    });
  };
}
