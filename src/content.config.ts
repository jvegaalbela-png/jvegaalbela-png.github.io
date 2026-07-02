import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Sveltia CMS serializes "no value" for optional fields as an empty
// string in frontmatter (e.g. `updatedDate: ''`) instead of omitting
// the key. Treat '' as "not provided" via a union — the field can be
// missing entirely (.optional() at the end), present as '' (literal
// match → transform to undefined), or present as a real value.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z
      .union([z.literal('').transform(() => undefined), z.coerce.date()])
      .optional(),
    heroImage: z
      .union([z.literal('').transform(() => undefined), z.string()])
      .optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const metronomeGuide = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/metronome-guide' }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = { blog, 'metronome-guide': metronomeGuide };
