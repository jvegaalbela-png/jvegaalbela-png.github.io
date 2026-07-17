const portraitImg = new Proxy({"src":"/_astro/at-drums-cheerful.D0swAl8n.webp","width":809,"height":809,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Jacobo/Documents/Code/astro-test/src/assets/at-drums-cheerful.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("C:/Users/Jacobo/Documents/Code/astro-test/src/assets/at-drums-cheerful.webp");
							return target[name];
						}
					});

export { portraitImg as p };
