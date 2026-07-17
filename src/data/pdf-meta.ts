// Shared per-PDF metadata: schema.org `about` fragments for items where
// we know the underlying composition or recording, plus helpers for
// deriving slugs and resolving items by category/slug. The PDF library
// itself lives in pdfs.json; this module is the place where structured
// data and lookup logic about that library hang off.

import manifest from './pdfs.json';

export type IndexableCategoryId = 'single-surface' | 'drumset' | 'transcriptions';

export interface PdfItem {
  file: string;
  thumbnail: string;
  title: string;
  description: string;
  howToPractice?: string;
}

export interface PdfCategory {
  id: string;
  title: string;
  blurb: string;
  items: PdfItem[];
}

export const INDEXABLE_CATEGORIES = manifest.categories as PdfCategory[];

// Short lead-in line shown above each item title in the H1 of the
// per-PDF page — mirrors the "Drum Lessons in <br/><em>Rochester, NY</em>"
// rhythm on /drum-lessons (plain first line, em-italic second line).
export const CATEGORY_LEAD_IN: Record<string, string> = {
  'single-surface': 'Snare-drum exercise',
  drumset: 'Drumset exercise',
  transcriptions: 'Drum transcription',
};

// Educational level hint for LearningResource JSON-LD. These are intuitive
// rather than precise — every PDF can stretch above or below its bucket.
export const CATEGORY_EDUCATIONAL_LEVEL: Record<string, string> = {
  'single-surface': 'Beginner to advanced',
  drumset: 'Beginner to intermediate',
  transcriptions: 'Intermediate to advanced',
};

// `about` mappings for transcriptions — each transcription is a drum part
// captured from a specific recording or composition. Keys match the file
// stem in src/data/pdfs.json.
type AboutMap = Record<string, object>;
export const ABOUT_BY_FILE: AboutMap = {
  'daahoud.pdf': {
    '@type': 'MusicComposition',
    name: 'Daahoud',
    composer: { '@type': 'Person', name: 'Clifford Brown' },
    recordedAs: {
      '@type': 'MusicRecording',
      name: 'Daahoud',
      byArtist: [
        { '@type': 'Person', name: 'Clifford Brown' },
        { '@type': 'Person', name: 'Max Roach' },
      ],
    },
  },
  'tony-williams-seven-steps-solos.pdf': {
    '@type': 'MusicComposition',
    name: 'Seven Steps to Heaven',
    composer: [
      { '@type': 'Person', name: 'Miles Davis' },
      { '@type': 'Person', name: 'Victor Feldman' },
    ],
    recordedAs: {
      '@type': 'MusicRecording',
      name: 'Seven Steps to Heaven',
      byArtist: [
        { '@type': 'Person', name: 'Miles Davis' },
        { '@type': 'Person', name: 'Tony Williams' },
      ],
    },
  },
  'marcus-gilmore-chorale-comping-sample.pdf': {
    '@type': 'MusicRecording',
    name: 'Chorale (comping sample)',
    composer: { '@type': 'Person', name: 'Vijay Iyer' },
    byArtist: { '@type': 'Person', name: 'Marcus Gilmore' },
  },
  'island-in-the-sun.pdf': {
    '@type': 'MusicRecording',
    name: 'Island in the Sun',
    byArtist: { '@type': 'MusicGroup', name: 'Weezer' },
  },
  'undone-the-sweater-song.pdf': {
    '@type': 'MusicRecording',
    name: 'Undone (The Sweater Song)',
    byArtist: { '@type': 'MusicGroup', name: 'Weezer' },
  },
};

export function slugFromFile(file: string): string {
  const base = file.split('/').pop() ?? '';
  return base.replace(/\.pdf$/i, '');
}

export function landingPathFor(categoryId: string, file: string): string {
  return `/pdfs/${categoryId}/${slugFromFile(file)}/`;
}

export function intakeKeyFor(categoryId: string, slug: string): string {
  return `${categoryId}/${slug}`;
}
