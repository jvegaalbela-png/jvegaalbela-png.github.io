const heroImg = new Proxy({"src":"/_astro/how-long-hero.Cq-IwhTx.webp","width":1000,"height":1333,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Jacobo/Documents/Code/astro-test/src/assets/blog/how-long-hero.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("C:/Users/Jacobo/Documents/Code/astro-test/src/assets/blog/how-long-hero.webp");
							return target[name];
						}
					});

const __vite_glob_0_7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: heroImg
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_7 as _, heroImg as h };
