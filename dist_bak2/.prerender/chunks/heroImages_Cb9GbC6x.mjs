import { _ as __vite_glob_0_5, a as __vite_glob_0_4, b as __vite_glob_0_3, c as __vite_glob_0_2, d as __vite_glob_0_1, e as __vite_glob_0_0 } from './06_combination_study_D1ea8FFo.mjs';
import { _ as __vite_glob_0_7 } from './how-long-hero_BUAMzllD.mjs';

const easySongsHero = new Proxy({"src":"/_astro/easy-songs-hero.gkV3EP3-.webp","width":1000,"height":1333,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Jacobo/Documents/Code/astro-test/src/assets/blog/easy-songs-hero.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("C:/Users/Jacobo/Documents/Code/astro-test/src/assets/blog/easy-songs-hero.webp");
							return target[name];
						}
					});

const __vite_glob_0_6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: easySongsHero
}, Symbol.toStringTag, { value: 'Module' }));

const jazzCompingHero = new Proxy({"src":"/_astro/jazz-comping-hero.C9R9eWiy.webp","width":1200,"height":1600,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Jacobo/Documents/Code/astro-test/src/assets/blog/jazz-comping-hero.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("C:/Users/Jacobo/Documents/Code/astro-test/src/assets/blog/jazz-comping-hero.webp");
							return target[name];
						}
					});

const __vite_glob_0_8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: jazzCompingHero
}, Symbol.toStringTag, { value: 'Module' }));

const rudimentsHero = new Proxy({"src":"/_astro/rudiments-hero.DIboKTL5.webp","width":1600,"height":2400,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Jacobo/Documents/Code/astro-test/src/assets/blog/rudiments-hero.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("C:/Users/Jacobo/Documents/Code/astro-test/src/assets/blog/rudiments-hero.webp");
							return target[name];
						}
					});

const __vite_glob_0_9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: rudimentsHero
}, Symbol.toStringTag, { value: 'Module' }));

const heroModules = /* #__PURE__ */ Object.assign({"/src/assets/blog/01_standard_jazz_ride.jpg": __vite_glob_0_0,"/src/assets/blog/02_quarters_only.jpg": __vite_glob_0_1,"/src/assets/blog/03_ride_cymbal_phrase.jpg": __vite_glob_0_2,"/src/assets/blog/04_same_phrase_with_snare.jpg": __vite_glob_0_3,"/src/assets/blog/05_new_phrase_bass_drum.jpg": __vite_glob_0_4,"/src/assets/blog/06_combination_study.jpg": __vite_glob_0_5,"/src/assets/blog/easy-songs-hero.webp": __vite_glob_0_6,"/src/assets/blog/how-long-hero.webp": __vite_glob_0_7,"/src/assets/blog/jazz-comping-hero.webp": __vite_glob_0_8,"/src/assets/blog/rudiments-hero.webp": __vite_glob_0_9


});
const heroByFilename = /* @__PURE__ */ new Map();
for (const [path, mod] of Object.entries(heroModules)) {
  const filename = path.split("/").pop();
  if (filename) heroByFilename.set(filename, mod.default);
}
function resolveHeroImage(rawPath) {
  if (!rawPath) return void 0;
  const filename = rawPath.split("/").pop();
  if (!filename) return void 0;
  const found = heroByFilename.get(filename);
  if (!found) {
    console.warn(
      `[heroImages] No matching file in src/assets/blog for "${rawPath}". Run \`npm run build\` after Sveltia uploads sync, or copy manually.`
    );
  }
  return found;
}

export { resolveHeroImage as r };
