import { c as createComponent } from './Layout_By4Vyr6P.mjs';
import 'piccolore';
import { a as renderTemplate, d as defineScriptVars, b as addAttribute, m as maybeRenderHead } from './prerender_vkmOfVOm.mjs';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$LessonForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LessonForm;
  const {
    formId,
    formIdSlug = "lesson-form",
    submitLabel = "Request My Half-Price Lesson",
    showLessonType = false,
    showLocation = false,
    showTimezone = false,
    showExperience = false,
    submitEvent,
    submitEventParams = {}
  } = Astro2.props;
  const id = (suffix) => `${formIdSlug}-${suffix}`;
  return renderTemplate(_a || (_a = __template(["", "<form", ' class="lesson-form" novalidate data-astro-cid-tcrg6abf> <div class="lesson-form-row" data-astro-cid-tcrg6abf> <div class="lesson-form-field" data-astro-cid-tcrg6abf> <label', ' data-astro-cid-tcrg6abf>Name</label> <input type="text"', ' name="name" required placeholder="Your name" autocomplete="name" data-fs-field data-astro-cid-tcrg6abf> <span class="lesson-form-error" data-fs-error="name" data-astro-cid-tcrg6abf></span> </div> <div class="lesson-form-field" data-astro-cid-tcrg6abf> <label', ' data-astro-cid-tcrg6abf>Email</label> <input type="email"', ' name="email" required placeholder="you@example.com" autocomplete="email" data-fs-field data-astro-cid-tcrg6abf> <span class="lesson-form-error" data-fs-error="email" data-astro-cid-tcrg6abf></span> </div> </div> ', " ", " ", " ", ' <div class="lesson-form-field" data-astro-cid-tcrg6abf> <label', ' data-astro-cid-tcrg6abf>Message <span class="optional" data-astro-cid-tcrg6abf>(optional)</span></label> <textarea', ` name="message" rows="2" placeholder="Anything you'd like me to know?" data-fs-field data-astro-cid-tcrg6abf></textarea> <span class="lesson-form-error" data-fs-error="message" data-astro-cid-tcrg6abf></span> </div> <div class="lesson-form-actions" data-astro-cid-tcrg6abf> <button type="submit" class="btn btn-primary" data-fs-submit-btn data-astro-cid-tcrg6abf>`, `</button> </div> <div class="lesson-form-success" data-fs-success data-astro-cid-tcrg6abf>Thank you! I'll be in touch ASAP.</div> <div class="lesson-form-error-summary" data-fs-error data-astro-cid-tcrg6abf></div> </form>  <script>(function(){`, `
  window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
  formspree('initForm', { formElement: '#' + formIdSlug, formId: formId, useDefaultStyles: false });

  (function () {
    const form = document.getElementById(formIdSlug);
    if (!form) return;
    const select = form.querySelector('[data-fs-experience-select]');
    const notice = form.querySelector('[data-fs-experience-notice]');
    if (!select || !notice) return;
    const update = () => {
      const v = select.value;
      notice.hidden = !(v === 'Intermediate' || v === 'Advanced');
    };
    select.addEventListener('change', update);
    update();
  })();

  // Fire GA4 event when Formspree marks the form as successfully submitted.
  // Formspree adds [data-fs-active] to the [data-fs-success] element on
  // success — that's the only state that distinguishes a real submission
  // from a network/validation failure.
  (function () {
    if (!submitEvent || typeof window === 'undefined') return;
    const form = document.getElementById(formIdSlug);
    if (!form) return;
    const successEl = form.querySelector('[data-fs-success]');
    if (!successEl) return;
    const observer = new MutationObserver(function () {
      if (successEl.hasAttribute('data-fs-active')) {
        if (typeof gtag === 'function') {
          gtag('event', submitEvent, submitEventParams || {});
        }
        observer.disconnect();
      }
    });
    observer.observe(successEl, { attributes: true, attributeFilter: ['data-fs-active'] });
  })();
})();<\/script> <script src="/formspree-ajax.min.js" defer><\/script>`])), maybeRenderHead(), addAttribute(formIdSlug, "id"), addAttribute(id("name"), "for"), addAttribute(id("name"), "id"), addAttribute(id("email"), "for"), addAttribute(id("email"), "id"), showLessonType && renderTemplate`<fieldset class="lesson-form-radios" data-astro-cid-tcrg6abf> <legend data-astro-cid-tcrg6abf>I want lessons for</legend> <div class="lesson-form-radios-row" data-astro-cid-tcrg6abf> <label class="radio-pill" data-astro-cid-tcrg6abf><input type="radio" name="lesson_for" value="An adult" data-astro-cid-tcrg6abf><span data-astro-cid-tcrg6abf>An adult</span></label> <label class="radio-pill" data-astro-cid-tcrg6abf><input type="radio" name="lesson_for" value="A college student" data-astro-cid-tcrg6abf><span data-astro-cid-tcrg6abf>A college student</span></label> <label class="radio-pill" data-astro-cid-tcrg6abf><input type="radio" name="lesson_for" value="A K-12 student" data-astro-cid-tcrg6abf><span data-astro-cid-tcrg6abf>A K&ndash;12 student</span></label> </div> </fieldset>`, showLocation && renderTemplate`<fieldset class="lesson-form-radios" data-astro-cid-tcrg6abf> <legend data-astro-cid-tcrg6abf>I want</legend> <div class="lesson-form-radios-row" data-astro-cid-tcrg6abf> <label class="radio-pill" data-astro-cid-tcrg6abf><input type="radio" name="lesson_location" value="Lessons at your home studio" data-astro-cid-tcrg6abf><span data-astro-cid-tcrg6abf>Lessons at your home studio</span></label> <label class="radio-pill" data-astro-cid-tcrg6abf><input type="radio" name="lesson_location" value="House calls" data-astro-cid-tcrg6abf><span data-astro-cid-tcrg6abf>House calls</span></label> <label class="radio-pill" data-astro-cid-tcrg6abf><input type="radio" name="lesson_location" value="Online lessons" data-astro-cid-tcrg6abf><span data-astro-cid-tcrg6abf>Online lessons</span></label> </div> </fieldset>`, (showTimezone || showExperience) && renderTemplate`<div class="lesson-form-row" data-astro-cid-tcrg6abf> ${showTimezone && renderTemplate`<div class="lesson-form-field" data-astro-cid-tcrg6abf> <label${addAttribute(id("timezone"), "for")} data-astro-cid-tcrg6abf>Time zone</label> <select${addAttribute(id("timezone"), "id")} name="timezone" required data-fs-field data-astro-cid-tcrg6abf> <option value="" disabled selected data-astro-cid-tcrg6abf>Choose one&hellip;</option> <option value="Eastern (ET)" data-astro-cid-tcrg6abf>Eastern (ET)</option> <option value="Central (CT)" data-astro-cid-tcrg6abf>Central (CT)</option> <option value="Mountain (MT)" data-astro-cid-tcrg6abf>Mountain (MT)</option> <option value="Pacific (PT)" data-astro-cid-tcrg6abf>Pacific (PT)</option> <option value="Outside the US" data-astro-cid-tcrg6abf>Outside the US</option> </select> <span class="lesson-form-error" data-fs-error="timezone" data-astro-cid-tcrg6abf></span> </div>`} ${showExperience && renderTemplate`<div class="lesson-form-field" data-astro-cid-tcrg6abf> <label${addAttribute(id("experience"), "for")} data-astro-cid-tcrg6abf>Drumming experience</label> <select${addAttribute(id("experience"), "id")} name="experience" required data-fs-field data-fs-experience-select data-astro-cid-tcrg6abf> <option value="" disabled selected data-astro-cid-tcrg6abf>Choose one&hellip;</option> <option value="No experience" data-astro-cid-tcrg6abf>No experience</option> <option value="Beginner" data-astro-cid-tcrg6abf>Beginner</option> <option value="Intermediate" data-astro-cid-tcrg6abf>Intermediate</option> <option value="Advanced" data-astro-cid-tcrg6abf>Advanced</option> </select> <span class="lesson-form-error" data-fs-error="experience" data-astro-cid-tcrg6abf></span> </div>`} </div>`, showExperience && renderTemplate`<div class="lesson-form-notice" data-fs-experience-notice hidden data-astro-cid-tcrg6abf>
Heads up &mdash; this class focuses on the basics of technique and reading rhythms. If you already have a solid foundation in those areas, private lessons might be a better fit.
</div>`, addAttribute(id("message"), "for"), addAttribute(id("message"), "id"), submitLabel, defineScriptVars({ formId, formIdSlug, submitEvent, submitEventParams }));
}, "C:/Users/Jacobo/Documents/Code/astro-test/src/components/LessonForm.astro", void 0);

export { $$LessonForm as $ };
