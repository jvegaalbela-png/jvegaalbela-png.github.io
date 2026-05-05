// Shared schema.org JSON-LD fragments. Pages compose these into
// per-page @graph payloads so structured data stays consistent
// across the site (one canonical Person, one canonical Organization,
// stable @id references for cross-linking).

import { getImage } from 'astro:assets';
import jacoboPortrait from '../assets/DSC04695.webp';

export const SITE_URL = 'https://jva-music.com';
export const SITE_NAME = 'JVA Music';

const personImage = await getImage({
  src: jacoboPortrait,
  format: 'webp',
  width: 1200,
});
const PERSON_IMAGE_URL = new URL(personImage.src, SITE_URL).toString();

export const PERSON_ID = `${SITE_URL}/#jacobo`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/drum-lessons#business`;
export const ALBUM_ID = `${SITE_URL}/#un-belonging`;

export const ROCHESTER_ADDRESS = {
  '@type': 'PostalAddress',
  addressLocality: 'Rochester',
  addressRegion: 'NY',
  addressCountry: 'US',
} as const;

export const ROCHESTER_AREA = {
  '@type': 'City',
  name: 'Rochester',
  containedInPlace: {
    '@type': 'State',
    name: 'New York',
  },
} as const;

export const PERSON = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Jacobo Vega-Albela',
  jobTitle: 'Jazz Drummer, Composer, and Music Educator',
  description:
    'Jazz drummer, composer, and bandleader based in Rochester, NY. Music educator and private drum teacher with a Master\'s from the Eastman School of Music.',
  url: SITE_URL,
  image: PERSON_IMAGE_URL,
  email: 'mailto:jacobovamusic@gmail.com',
  telephone: '+1-585-802-4247',
  address: {
    ...ROCHESTER_ADDRESS,
    addressLocality: 'Rochester (South Wedge)',
  },
  knowsAbout: [
    'Jazz drumming',
    'Jazz composition',
    'Drumset performance',
    'Classical percussion',
    'Music education',
    'Private drum instruction',
  ],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Eastman School of Music',
      sameAs: 'https://www.esm.rochester.edu/',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'New Mexico State University',
      sameAs: 'https://nmsu.edu/',
    },
  ],
  award: [
    'Steve Lyman Coaching Scholarship (2025)',
    'Raymond and Maxine Schirmer Prize in Jazz Performance, Eastman School of Music (2022)',
    "Betty Carter's Jazz Ahead Alumnus, Kennedy Center (2023)",
    'William Dempsey Clark Music Endowment Award, New Mexico State University (2015)',
  ],
  sameAs: [
    'https://www.instagram.com/jacobo.vegaalbela/',
    'https://577records.bandcamp.com/album/un-belonging',
    'https://music.apple.com/us/artist/jacobo-vega-albela/1503080956',
    'https://open.spotify.com/artist/6hX0MkgDOLuteSG1nsUqCV',
    'https://youtube.com/playlist?list=PLr4sdvgtCCMcfSZHuTscc1YX61tsUFaJt',
    'https://linktr.ee/jvegaalbela',
  ],
} as const;

export const ORGANIZATION = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.webp`,
  founder: { '@id': PERSON_ID },
  sameAs: PERSON.sameAs,
} as const;

export const WEBSITE = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': ORGANIZATION_ID },
  inLanguage: 'en-US',
} as const;
