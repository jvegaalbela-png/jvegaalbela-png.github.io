import { c as createComponent, $ as $$Layout } from './Layout_By4Vyr6P.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, b as addAttribute, m as maybeRenderHead, u as unescapeHTML } from './prerender_vkmOfVOm.mjs';
import { statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
/* empty css                 */
import { S as SITE_URL, P as PERSON, O as ORGANIZATION, a as ORGANIZATION_ID, b as PERSON_ID, $ as $$JsonLd } from './schema_BJh2aw_a.mjs';
import { I as INDEXABLE_CATEGORIES, s as slugFromFile, A as ABOUT_BY_FILE, C as CATEGORY_LEAD_IN, a as CATEGORY_EDUCATIONAL_LEVEL } from './pdf-meta_Dv3A3CTZ.mjs';

const _README = "Per-PDF 'How to practice' / 'Context' copy for the landing pages at /pdfs/[category]/[slug]/. Keys are 'category-id/slug' where slug is the PDF filename without the .pdf extension. Values are markdown-ish strings (paragraphs split on blank lines). Empty strings render a 'Coming soon' placeholder on the page — that's fine; the page still ships and is indexable.";
const pdfContent = {
  _README,
  "single-surface/tech-routine-1": "I and many others believe that technique should be taught by guiding the student through the process of developing an understanding and a feel for a variety of different motions.\n\nThis packet I've designed will help the student to gain comfort and familiarity with the full stroke, down stroke, tap, up stroke, multiple bounce roll, and double stroke roll. Special care has been taken to make the rhythmic language of the exercises as simple as possible in order to make them approachable. This simplicity should allow the student to focus deeply on the kinesthetics of each exercise.\n\nOnce the feeling of each of these motions is in the hands the student should be ready to begin a more serious study of the rudiments. The explanations given for each exercise provide cues for what to pay attention to during practice, and variations that will allow the student to get more mileage out of each pattern.\n\nNothing about these exercises is particularly original - in fact I have taken many of these ideas from other sources. I owe acknowledgement particularly to my teacher Rich Thompson who taught me his exercise \"Thompson Triplets\" which is the basis for \"Trubbles,\" and to Murray Gusseck who authored many exercises used by Santa Clara Vanguard. The dynamic ideas in \"Chicken Roll\" are inspired by his approach to 8-8-16, and my roll builder \"Dut-Dzh\" is inspired both by \"Warm Rolls\" and \"Diddle McNuggets.\"",
  "single-surface/tech-routine-2": "This packet is a brief survey of a few of the essential rudiments. It touches on short rolls, and the paradiddle and flam families. The goal with these exercises is to begin to apply the motions and techniques the student has learned through studying Tech Routine 1. This is by no means a comprehensive study of the rudiments, instead it is a sort of sample platter meant to give the hands and the brain a preview of what is to come in a more serious and in-depth exploration of rudimental drumming.\n\nSpecial care has been taken to make the rhythmic language of the exercises as simple as possible in order to make them approachable. This simplicity should allow the student to focus deeply on the kinesthetics of each exercise. The explanations given for each exercise provide cues for what to pay attention to during practice, and variations that will allow the student to get more mileage out of each pattern.\n\nI urge anyone curious about the rudiments to view their study not as an obligation that must be fulfilled in the interest of becoming a \"good\" or a \"serious\" drummer, but rather to think of the rudiments as idioms and turns of phrase that allow one to begin speaking the language of a particular style of music called rudimental drumming.\n\nListen to Joseph Rudolph \"Philly Joe\" Jones' phenomenal solos on tracks like Wynton Kelly's \"Potluck,\" from the album 'Kelly At Midnight,' Sonny Clark's \"Royal Flush,\" from the album 'Cool Struttin' or Miles Davis' \"Salt Peanuts\" from the album 'Steamin' With The Miles Davis Quintet' for some examples of exceptionally brilliant rudimental improvisation. Check out a video of Santa Clara Vanguard, or The Blue Devils (or really any DCI line) for some examples of clever and challenging writing using these little idioms and turns of phrase.",
  "single-surface/rtsk": "This is an exercise my teacher Rich Thompson taught me. The title stands for \"Rich Thompson Stone Killer,\" which I assume is a nod to George Lawrence Stone's \"Stone Killer\" exercise. This exercise helps build speed, endurance, and control. It will also help the student begin to develop a feel for the way in which paradiddle rudiments turn the hands around. We can use these turnaround properties when we improvise to help us navigate the instrument.\n\nThere are a couple of variations. Firstly, we try to play the exercise with complete evenness of the hands. Secondly we allow the lead hand to speak a little bit louder than its counterpart. We can also practice cutting the length of each sticking in half. As written we play each sticking for 16 measures, but you can try 8, then 4, then 2, then 1, always preserving the turnaround and using it to switch to the next sticking.",
  "single-surface/eighth-note-rests": "This is an exercise designed to help the student begin feeling simple eighth-note syncopations. This rhythmic source material can be used to teach the reading of eighth-note rests, or as source material for coordination exercises in order to develop comping ideas and limb independence.\n\nStart each exercise slowly, and try to mentally subdivided the eighth notes even though you are not playing all of them. Work with a metronome to keep yourself honest. As with any rhythm exercise you should try to creatively orchestrate these rhythms around the drumset.",
  "drumset/three-basic-rock-beats": "This is a sampler of three common eighth note rock beats. All share an identical hand pattern, and only the bass drum varies. This is a good preliminary exercise for a brand new student who is just learning their first few beats.\n\nThe patterns are all written in two different ways, once with all notes stemmed together, and once with separated voices. This should help expose the student to two common engraving conventions.",
  "drumset/bass-drum-eighth-note-partials": "This exercise procedurally shifts the bass drum against a static hand pattern. The bass drum is put onto each of the possible eighth note partials.\n\nPractice this slowly, and think of this as an ear training exercise as much as anything else. Get used to how these different placements feel and sound.\n\nOnce you are comfortable, try adding some ghost notes. Practice playing the crash on one. Make phrases: you can try for 3 measures of a given pattern, and one measure of an improvised fill. Finally, try to keep the hand pattern static while you improvise melodically with the bass drum, using these patterns as inspiration.",
  "drumset/bass-drum-sixteenth-note-partials": "These exercises are designed to help the student gain more control and independence with the bass drum. The hand pattern is constant throughout. Once the exercises are comfortable as written, the student may try omitting the bass drum on beat two in order to create patterns with a more natural flow. Ghost notes may also be added to the student's taste.\n\nPractice playing the crash on one. Practice improvising phrases, for example three 4/4 measures of groove, and one measure of improvised fill. Work towards keeping a static hand pattern while improvising melodically with the bass drum.",
  "drumset/chorale-preliminary-exercises": "Each exercise is separated by a repeat sign. Play each exercise slowly for a long time until you are comfortable with it. **Always remember you can simplify!**\n\n● Exercise no. 1 puts the hands and feet in 5/8.\n\n● Exercise no. 2 puts the hands in 7/8 while the feet remain in 5/8. The bass drum emphasizes the downbeats of the first and fourth measure. **Remember you can simplify!** Take the bass drum out until you get comfortable with the hands and hi hat. Try the hi hat with no splashes at first.\n\n● Exercise no. 3 puts the hands and feet in 7/8.\n\n● Exercise no. 4 puts the hands in 5/8 while the feet remain in 7/8.\n\n● Exercise no. 5 is rhythmically similar to no. 2, however in this instance the ride cymbal plays a 7/8 clave (2+2+3) while the left hand fills in the missing eighth notes on the snare. The foot ostinato is identical to no. 2.\n\n● Exercise no. 6 has an identical foot ostinato to nos. 2 & 5. The right hand plays our 7/8 clave (2+2+3) and the left hand plays two backbeats that occur commonly in the song.\n\n● Exercise no. 7 is pure 7/8. Once again, the left hand plays two backbeats that occur commonly in the song.\n\nExercises 6 and 7 are meant to be used as frameworks for improvisation! This whole piece is made up of a poly-meter that can be heard as five measure phrases of 7/8, or seven measure phrases of 5/8 — a thirty-five beat cycle. The second backbeat in both examples falls at the same point in this cycle: the twenty-sixth eighth note! This allows you to use that as a pivot point when phrasing in 7/8. The backbeat in the fourth measure of exercise no. 7 marks ten eighth notes from the top of the next cycle, allowing you to imply or outright switch to 5/8 a measure-and-a-half before the cycle ends.\n\nUse my [free online metronome](/metronome/) to practice this. Set it to 5/8, accenting the first and third beats, or to 7/8 accenting the first, third, and fifth beats. This will get you used to playing these patterns while hearing the typical claves used to outline the meters. Once you've tried each exercise with the original meter, try them with the opposite one (i.e. the 5/8 exercises with a 7/8 met and vice versa).",
  "drumset/independence-exercise-pamphlet": "This pamphlet is made up of a series of exercises of increasing complexity derived from a number of fundamental patterns. These are concepts I have developed from my work and conversations with Louie Speaking Eagle, Andrew Anaya, Joe Seltzer and Robert Ojinaga, as well as studies from George Lawrence Stone's Stick Control, and John Riley's books The art of Bop Drumming, and Beyond Bop Drumming.\n\nOdd Meter Studies — Groups of Three and Paradiddle Variations. These patterns are meant to help you get comfortable with a variety of different cross-rhythms that flow over the bar in 5/4, 7/4, and 9/4.\n\nYou should play these with a metronome. First you can try simple quarter notes on the ride cymbal. Next, you can add the hi hat in the following ways:\n\n● All meters: play all quarter notes, play every other beat starting on beat one, and starting on beat two\n\n● 5/4: outline 3+2 (hi hat on beats two, three, and five)\n\n● 7/4: outline 4+3 (hi hat on beats two, four, six, seven)\n\n● 9/4: outline 4+5 (hi hat on beats two, four, six, seven, nine), outline 5+4 (hi hat on beats two, three, five, seven, nine), outline 6+3 (hi hat on beats two, four, six, eight, nine)\n\nAdd skip beats as you see fit!\n\nCymbal Beat Modulations — Based on the half note, dotted quarter, half-note triplet, quarter note triplet, and eighth note. These patterns are meant to be superimposed over top of any idea in 4/4 time.\n\nYou can use the melodies from jazz standards, or comping rhythms from any source like John Riley's \"Art of Bop Drumming\" or Ted Reed's \"Syncopation\". Take your time with these, and practice moving from one to the other!\n\n● Try to hear the comping rhythm you're hearing as the melody, keeping the original tempo in your head.\n\n● Try to hear the comping rhythm as a cross-rhythm in each of the new implied time signatures.\n\n● Try starting off by playing simple partials against each of these rhythms (for example: all quarter notes, all eighth note upbeats etc).",
  "transcriptions/daahoud": "Clifford Brown & Max Roach (1954) is one of my all time favorite records. An absolute masterclass in hard-bop arranging, and a collection of brilliant improvisations from all members. Roach takes many solos on this album, but \"Daahoud\" is one of my favorites to play and teach.\n\nFamiliarize yourself with the melody and form of the song, then note how Roach uses the form to develop his ideas: A flashy introduction to get your attention, A-section material full of brilliant eighth-note dominant bebop phrases, a ripping B-section featuring some of Roach's signature triplet language, and a last \"A\" that signals the end of the solo, and provides a clear roll-off for the band.\n\nAs you practice this, don't just focus on the content. Try to take in the way Roach phrases and develops his ideas. Pay attention to the types of figuration he uses throughout the solo. Go a level deeper than the notes and rhythms, and apply some of these schemes to your own improvisations.\n\nTony Williams said that \"Max Roach played more musically than anybody else. When Max took a solo, if the solo was a 32-bar tune, he could take the tune and make you know exactly where he was. Whether he was in the bridge or the last eight, you'd know it by what he was playing. At the time that's what made him the master, he took playing the drums to a really sophisticated level. He played with such command.\"\n\nAfter studying this solo on \"Daahoud\", you will find that you recognize similar developing schemes in other solos of Roach's! Look for similarities and differences. As a conceptual exercise, challenge yourself to try improvising in a way that conveys the form with total clarity. Tackle something else from \"Clifford Brown & Max Roach\" and try your hand at transcribing the material yourself.\n\nHappy practicing!",
  "transcriptions/tony-williams-seven-steps-solos": "Over a relatively short period of time, one can observe the way the musical language of Anthony Williams' solo improvisations evolved from the bebop style into something new and other — the avant-garde language of post-bop. These transcriptions document this evolution via three solos Williams played on different versions of the Victor Feldman piece \"Seven Steps To Heaven\", recorded during the period from April of 1963 through February of 1964.\n\nThe document begins with the solo he played on the version of \"Seven Steps\" found on the Miles Davis record \"Seven Steps to Heaven\" (1963). This solo fits neatly over the 32 bar form of the tune and is made up of typical bebop language reminiscent in many ways of the styles of Max Roach, Art Blakey, and Philly Joe Jones, primary influences cited by Williams in an interview with Downbeat magazine.\n\nThis April '63 solo presents us with a number of musical fragments, phrasing concepts, pathways of motion, orchestrations, and approaches that seem to evolve naturally and logically into the content found in the later solos.\n\nFor all the apparent similarities between these solos, there are also significant differences that mark a major stylistic shift in Williams' playing. Though the term \"post-bop\" is a rather vague one, it is nonetheless important to our discussion, and should be briefly examined for the sake of clarity.\n\nIn his book Miles Smiles, and the Invention of Post Bop, Jeremy Yudkin describes the \"adoption of a kind of elastic form that can stretch to accommodate creative improvisation..., employment of uncommon time signatures..., [a] rhythmically more varied approach to the creation of solo lines... [and] a multifaceted juxtaposition of momentum and stasis\" as key traits of the \"post-bop\" style that the Miles Davis Quintet of the mid 1960s was developing. Though these solos were recorded years earlier than the Miles Smiles recordings Yudkin is describing, we can see all of these elements in the later Williams solos (June '63 and February '64).\n\n### Elastic Form\n\nThough the April '63 solo fits neatly over the 32 bar form of Seven Steps To Heaven, the June '63 and February '64 solos do not. The June '63 solo is 63 bars long, and the February '64 solo seems to resist being confined by bar lines almost entirely, as the latter half of the solo is in free time. When transcribing the '64 solo I chose to use barlines only to indicate the beginnings and endings of musical ideas in the latter half. Williams' de-prioritization of strict adherence to the original form of the piece allows him a much greater degree of freedom of expression, and this freedom seems to yield much more fluid and directional phrasing.\n\n### Rhythmic Variation\n\nIn the '64 solo, Williams uses a number of odd rhythmic groupings including fives, nines, and tens. For example, in mm. 12-15 we see nine-note cross rhythms (indicated by the beaming and grouped 4+5), in mm. 23-24 we see a five-note cross rhythm made up of quarter note triplets, and in mm. 34 we see a repeated ten-note phrase made up of eighth notes. Additionally, in the June '63 solo we see the use of unusual tuplets (in this case quintuplets) in mm. 46-47, and changing meter as in the bar of 5/4, and the later bar of 2/4.\n\n### Momentum and Stasis\n\nLong repeated gestures, like the quarter note triplet figures in the introduction of the February '64 solo establish a kind of static feeling and give the listener something to latch on to, while the longer, less repetitive lines create momentum. The juxtaposition of highly repetitive and rapidly changing material, as well as Williams' use of devices like ritardandi, accelerandi, and rubato phrasing create a kind of drama and intrigue in this later improvisation that is absent from the April '63 solo.\n\nAnthony Williams was a true musical visionary, and unquestionably one of the most important figures in the history of the drumset. As a major pioneer not only in the field of post-bop, but also jazz-rock fusion, the effect his contributions to the art of drumming continue to have to this day is hard to overstate. I hope this study of Williams' development over a very short window of time might help to illuminate some of the ways in which Williams used the things he learned from the masters of bop drumming who came before him to create his own personal musical language, and to push the artform forward in new directions.\n\n### Some food for thought\n\nWhere does one draw the line between bebop and post-bop? Would the creation of such a delineation even provide any meaningful insight? And perhaps most importantly, how might today's musicians hope to learn not just from the specific content found in Williams' playing, but from the process that yielded the masterful synthesis of his many different influences into a conversational musical voice with which Williams could freely express himself?\n\n### A note to the practicing drummer\n\nIf you want to learn the '64 solo (recorded on \"Four & More\" by Miles Davis) you really must listen to the solo many times, and get it into your ear. The notation is not sufficient to convey the depth of what Tony was doing. Try to play along and work out your own interpretation.",
  "transcriptions/marcus-gilmore-chorale-comping-sample": "",
  "transcriptions/island-in-the-sun": "",
  "transcriptions/undone-the-sweater-song": "",
};

function getStaticPaths() {
  return INDEXABLE_CATEGORIES.flatMap(
    (cat) => cat.items.map((item) => ({
      params: { category: cat.id, slug: slugFromFile(item.file) },
      props: { categoryId: cat.id, file: item.file }
    }))
  );
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { categoryId, file } = Astro2.props;
  const category = INDEXABLE_CATEGORIES.find((c) => c.id === categoryId);
  const item = category.items.find((i) => i.file === file);
  const slug = slugFromFile(file);
  const pageUrl = `${SITE_URL}/pdfs/${categoryId}/${slug}/`;
  const pdfUrl = `${SITE_URL}${item.file}`;
  const thumbUrl = new URL(item.thumbnail, SITE_URL).toString();
  function publicPath(urlPath) {
    return join(process.cwd(), "public", urlPath.replace(/^\/+/, ""));
  }
  function pdfFileSize(filePath) {
    try {
      const bytes = statSync(publicPath(filePath)).size;
      return { size: `${Math.round(bytes / 1024)} kB`, bytes };
    } catch {
      return void 0;
    }
  }
  const fileSize = pdfFileSize(item.file);
  async function thumbDimensions(thumbPath) {
    try {
      const meta = await sharp(publicPath(thumbPath)).metadata();
      if (meta.width && meta.height) return { w: meta.width, h: meta.height };
    } catch {
    }
    return void 0;
  }
  const thumbDims = await thumbDimensions(item.thumbnail);
  const intakeKey = `${categoryId}/${slug}`;
  const intakeRaw = pdfContent[intakeKey] ?? "";
  const intakeParagraphs = intakeRaw.trim().split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const hasIntake = intakeParagraphs.length > 0;
  const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const renderInline = (s) => escapeHtml(s).replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>").replace(/\[([^\]]+)\]\((\/[^)\s]*|https?:\/\/[^)\s]+)\)/g, '<a href="$2">$1</a>');
  const aboutFragment = ABOUT_BY_FILE[file.split("/").pop()];
  const educationalLevel = CATEGORY_EDUCATIONAL_LEVEL[categoryId];
  const leadIn = CATEGORY_LEAD_IN[categoryId] ?? category.title;
  const siblingItems = (() => {
    const list = category.items;
    const idx = list.findIndex((i) => slugFromFile(i.file) === slug);
    if (idx < 0 || list.length < 2) return [];
    return [
      list[(idx + 1) % list.length],
      list[(idx + 2) % list.length]
    ].filter((x, i, arr) => slugFromFile(x.file) !== slug && arr.findIndex((y) => slugFromFile(y.file) === slugFromFile(x.file)) === i);
  })();
  const metaTitle = `${item.title} — ${category.title} PDF | Jacobo Vega-Albela`;
  const metaDescription = item.description ? item.description : `Free downloadable PDF: ${item.title}. ${category.title} from Jacobo Vega-Albela's drum teaching library.`;
  const digitalDocumentId = `${pageUrl}#document`;
  const learningResourceId = `${pageUrl}#resource`;
  const digitalDocument = {
    "@type": "DigitalDocument",
    "@id": digitalDocumentId,
    name: item.title,
    url: pdfUrl,
    encodingFormat: "application/pdf",
    inLanguage: "en-US",
    creator: { "@id": PERSON_ID },
    publisher: { "@id": ORGANIZATION_ID },
    isAccessibleForFree: true,
    thumbnailUrl: thumbUrl
  };
  if (item.description) digitalDocument.description = item.description;
  if (fileSize) digitalDocument.contentSize = fileSize.size;
  if (aboutFragment) digitalDocument.about = aboutFragment;
  const learningResource = {
    "@type": "LearningResource",
    "@id": learningResourceId,
    name: item.title,
    url: pageUrl,
    inLanguage: "en-US",
    learningResourceType: category.title,
    educationalUse: "Practice",
    isAccessibleForFree: true,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORGANIZATION_ID },
    thumbnailUrl: thumbUrl,
    mainEntity: { "@id": digitalDocumentId },
    about: { "@id": digitalDocumentId }
  };
  if (educationalLevel) learningResource.educationalLevel = educationalLevel;
  if (item.description) learningResource.description = item.description;
  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: metaTitle,
    description: metaDescription,
    inLanguage: "en-US",
    primaryImageOfPage: thumbUrl,
    mainEntity: { "@id": learningResourceId },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "PDFs", item: `${SITE_URL}/pdfs/` },
        { "@type": "ListItem", position: 3, name: category.title, item: `${SITE_URL}/pdfs/#${categoryId}` },
        { "@type": "ListItem", position: 4, name: item.title, item: pageUrl }
      ]
    }
  };
  const graph = {
    "@context": "https://schema.org",
    "@graph": [PERSON, ORGANIZATION, webPage, learningResource, digitalDocument]
  };
  if (aboutFragment && aboutFragment["@type"] === "MusicComposition") {
    graph["@graph"].push({
      ...aboutFragment,
      "@id": `${pageUrl}#composition`
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": metaTitle, "description": metaDescription, "themeColor": "#091528", "image": {
    url: thumbUrl,
    alt: `${item.title} — first page preview`,
    type: "image/webp"
  } }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<main class="pdf-detail"> <header class="pdf-detail-hero"> <div class="pdf-detail-hero-inner"> <nav class="pdf-detail-crumbs" aria-label="Breadcrumb"> <a href="/pdfs/">PDFs</a> <span class="sep" aria-hidden="true">·</span> <a${addAttribute(`/pdfs/#${categoryId}`, "href")}>${category.title}</a> </nav> <span class="pdf-detail-eyebrow">${category.title}</span> <h1 class="pdf-detail-title">${leadIn}<br><em>${item.title}</em></h1> ${item.description && renderTemplate`<p class="pdf-detail-lede">${item.description}</p>`} <div class="pdf-detail-cta-row"> <a class="pdf-detail-cta"${addAttribute(item.file, "href")} target="_blank" rel="noopener" data-pdf-download> <span class="pdf-detail-cta-label">Download PDF</span> <span class="pdf-detail-cta-arrow" aria-hidden="true">↗</span> </a> ${fileSize && renderTemplate`<span class="pdf-detail-meta">PDF · ${fileSize.size}</span>`} </div> </div> </header> <section class="pdf-detail-body" aria-labelledby="pdf-figure-title"> <figure class="pdf-detail-figure"> <a${addAttribute(item.file, "href")} target="_blank" rel="noopener"${addAttribute(`Open ${item.title} (PDF) in a new tab`, "aria-label")}>  <img${addAttribute(item.thumbnail, "src")}${addAttribute(`First-page preview of ${item.title}`, "alt")}${addAttribute(thumbDims?.w, "width")}${addAttribute(thumbDims?.h, "height")} loading="eager" fetchpriority="high"> </a> <figcaption id="pdf-figure-title"> <span class="pdf-detail-figure-caption">First page of <em>${item.title}</em>.</span> <a class="pdf-detail-figure-cta"${addAttribute(item.file, "href")} target="_blank" rel="noopener"> <span>Open the full PDF</span> <span class="pdf-detail-figure-cta-arrow" aria-hidden="true">↗</span> </a> </figcaption> </figure> <div class="pdf-detail-prose"> <h2>How to practice this</h2> ${hasIntake ? intakeParagraphs.map(
    (p) => p.startsWith("### ") ? renderTemplate`<h3>${unescapeHTML(renderInline(p.slice(4)))}</h3>` : renderTemplate`<p>${unescapeHTML(renderInline(p))}</p>`
  ) : renderTemplate`<p class="pdf-detail-placeholder"> <strong>Coming soon.</strong> Practice notes and context for this PDF are on the way. In the meantime, download the sheet and work through it slowly with a <a href="/metronome/">free online metronome with subdivisions</a> — that's almost always the right starting point.
</p>`} </div> </section> <aside class="pdf-detail-related" aria-labelledby="related-title"> <div class="pdf-detail-related-inner"> <div class="pdf-detail-related-head"> <span class="pdf-detail-related-tag">Keep going</span> <span class="pdf-detail-related-rule" aria-hidden="true"></span> </div> <ul class="pdf-detail-related-list"> <li> <a class="pdf-detail-related-card" href="/pdfs/"> <span class="pdf-detail-related-card-title">Browse all teaching PDFs<span class="pdf-detail-related-card-arrow" aria-hidden="true">→</span></span> <span class="pdf-detail-related-card-desc">Single-surface exercises, drumset studies, and transcriptions.</span> </a> </li> ${siblingItems.map((sib) => renderTemplate`<li> <a class="pdf-detail-related-card"${addAttribute(`/pdfs/${categoryId}/${slugFromFile(sib.file)}/`, "href")}> <span class="pdf-detail-related-card-title">${sib.title}<span class="pdf-detail-related-card-arrow" aria-hidden="true">→</span></span> <span class="pdf-detail-related-card-desc">${sib.description || `${leadIn} from the ${category.title.toLowerCase()} library.`}</span> </a> </li>`)} <li> <a class="pdf-detail-related-card" href="/metronome/"> <span class="pdf-detail-related-card-title">Use the practice metronome<span class="pdf-detail-related-card-arrow" aria-hidden="true">→</span></span> <span class="pdf-detail-related-card-desc">A free online metronome with subdivisions and odd-meter support &mdash; built for working through these sheets.</span> </a> </li> <li> <a class="pdf-detail-related-card pdf-detail-related-card--cta" href="/drum-lessons/"> <span class="pdf-detail-related-card-title">Take a drum lesson with me<span class="pdf-detail-related-card-arrow" aria-hidden="true">→</span></span> <span class="pdf-detail-related-card-desc">Private lessons in Rochester, NY or virtual over Zoom — first lesson half off.</span> </a> </li> </ul> </div> </aside> </main> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "JsonLd", $$JsonLd, { "slot": "head", "data": graph })}<link rel="preload" as="image"${addAttribute(item.thumbnail, "href")} fetchpriority="high">` })}`;
}, "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/pdfs/[category]/[slug].astro", void 0);

const $$file = "C:/Users/Jacobo/Documents/Code/astro-test/src/pages/pdfs/[category]/[slug].astro";
const $$url = "/pdfs/[category]/[slug]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
