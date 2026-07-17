import { c as createComponent, g as getImage } from './Layout_By4Vyr6P.mjs';
import 'piccolore';
import { a as renderTemplate, u as unescapeHTML } from './prerender_vkmOfVOm.mjs';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$JsonLd = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$JsonLd;
  const { data } = Astro2.props;
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(json));
}, "C:/Users/Jacobo/Documents/Code/astro-test/src/components/JsonLd.astro", void 0);

const press04695 = new Proxy({"src":"/_astro/DSC04695.CYt1Mx3C.webp","width":1600,"height":2400,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Jacobo/Documents/Code/astro-test/src/assets/DSC04695.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("C:/Users/Jacobo/Documents/Code/astro-test/src/assets/DSC04695.webp");
							return target[name];
						}
					});

const SITE_URL = "https://jva-music.com";
const SITE_NAME = "JVA Music";
const personImage = await getImage({
  src: press04695,
  format: "webp",
  width: 1200
});
const PERSON_IMAGE_URL = new URL(personImage.src, SITE_URL).toString();
const PERSON_ID = `${SITE_URL}/#jacobo`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const LOCAL_BUSINESS_ID = `${SITE_URL}/drum-lessons#business`;
const ALBUM_ID = `${SITE_URL}/#un-belonging`;
const ROCHESTER_ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Rochester",
  addressRegion: "NY",
  addressCountry: "US"
};
const ROCHESTER_AREA = {
  "@type": "City",
  name: "Rochester",
  containedInPlace: {
    "@type": "State",
    name: "New York"
  }
};
const PERSON = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Jacobo Vega-Albela",
  jobTitle: "Jazz Drummer, Composer, and Music Educator",
  description: "Jazz drummer, composer, and bandleader based in Rochester, NY. Music educator and private drum teacher with a Master's from the Eastman School of Music.",
  url: SITE_URL,
  image: PERSON_IMAGE_URL,
  email: "mailto:jacobovamusic@gmail.com",
  telephone: "+1-585-802-4247",
  address: {
    ...ROCHESTER_ADDRESS,
    addressLocality: "Rochester (South Wedge)"
  },
  knowsAbout: [
    "Jazz drumming",
    "Jazz composition",
    "Drumset performance",
    "Classical percussion",
    "Music education",
    "Private drum instruction"
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Eastman School of Music",
      sameAs: "https://www.esm.rochester.edu/"
    },
    {
      "@type": "CollegeOrUniversity",
      name: "New Mexico State University",
      sameAs: "https://nmsu.edu/"
    }
  ],
  award: [
    "Steve Lyman Coaching Scholarship (2025)",
    "Raymond and Maxine Schirmer Prize in Jazz Performance, Eastman School of Music (2022)",
    "Betty Carter's Jazz Ahead Alumnus, Kennedy Center (2023)",
    "William Dempsey Clark Music Endowment Award, New Mexico State University (2015)"
  ],
  sameAs: [
    "https://www.instagram.com/jacobo.vegaalbela/",
    "https://577records.bandcamp.com/album/un-belonging",
    "https://music.apple.com/us/artist/jacobo-vega-albela/1503080956",
    "https://open.spotify.com/artist/6hX0MkgDOLuteSG1nsUqCV",
    "https://youtube.com/playlist?list=PLr4sdvgtCCMcfSZHuTscc1YX61tsUFaJt",
    "https://linktr.ee/jvegaalbela"
  ]
};
const ORGANIZATION = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.webp`,
  founder: { "@id": PERSON_ID },
  sameAs: PERSON.sameAs
};
const WEBSITE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en-US"
};

export { $$JsonLd as $, ALBUM_ID as A, LOCAL_BUSINESS_ID as L, ORGANIZATION as O, PERSON as P, ROCHESTER_AREA as R, SITE_URL as S, WEBSITE as W, ORGANIZATION_ID as a, PERSON_ID as b, press04695 as p };
