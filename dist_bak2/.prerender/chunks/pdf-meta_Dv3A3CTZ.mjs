import { m as manifest } from './pdfs_BnUPHxhD.mjs';

const INDEXABLE_CATEGORIES = manifest.categories;
const CATEGORY_LEAD_IN = {
  "single-surface": "Snare-drum exercise",
  drumset: "Drumset exercise",
  transcriptions: "Drum transcription"
};
const CATEGORY_EDUCATIONAL_LEVEL = {
  "single-surface": "Beginner to advanced",
  drumset: "Beginner to intermediate",
  transcriptions: "Intermediate to advanced"
};
const ABOUT_BY_FILE = {
  "daahoud.pdf": {
    "@type": "MusicComposition",
    name: "Daahoud",
    composer: { "@type": "Person", name: "Clifford Brown" },
    recordedAs: {
      "@type": "MusicRecording",
      name: "Daahoud",
      byArtist: [
        { "@type": "Person", name: "Clifford Brown" },
        { "@type": "Person", name: "Max Roach" }
      ]
    }
  },
  "tony-williams-seven-steps-solos.pdf": {
    "@type": "MusicComposition",
    name: "Seven Steps to Heaven",
    composer: [
      { "@type": "Person", name: "Miles Davis" },
      { "@type": "Person", name: "Victor Feldman" }
    ],
    recordedAs: {
      "@type": "MusicRecording",
      name: "Seven Steps to Heaven",
      byArtist: [
        { "@type": "Person", name: "Miles Davis" },
        { "@type": "Person", name: "Tony Williams" }
      ]
    }
  },
  "marcus-gilmore-chorale-comping-sample.pdf": {
    "@type": "MusicRecording",
    name: "Chorale (comping sample)",
    composer: { "@type": "Person", name: "Vijay Iyer" },
    byArtist: { "@type": "Person", name: "Marcus Gilmore" }
  },
  "island-in-the-sun.pdf": {
    "@type": "MusicRecording",
    name: "Island in the Sun",
    byArtist: { "@type": "MusicGroup", name: "Weezer" }
  },
  "undone-the-sweater-song.pdf": {
    "@type": "MusicRecording",
    name: "Undone (The Sweater Song)",
    byArtist: { "@type": "MusicGroup", name: "Weezer" }
  }
};
function slugFromFile(file) {
  const base = file.split("/").pop() ?? "";
  return base.replace(/\.pdf$/i, "");
}
function landingPathFor(categoryId, file) {
  return `/pdfs/${categoryId}/${slugFromFile(file)}/`;
}

export { ABOUT_BY_FILE as A, CATEGORY_LEAD_IN as C, INDEXABLE_CATEGORIES as I, CATEGORY_EDUCATIONAL_LEVEL as a, landingPathFor as l, slugFromFile as s };
