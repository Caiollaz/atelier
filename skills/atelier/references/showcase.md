# Showcase

Read this when the page has to stand next to Awwwards Sites of the Day and the best Behance work: portfolios, studios, brand and launch pages, premium services, events, editorial microsites, or whenever the user asks for "Awwwards", "Behance level", "immersive" or "award-winning". It is drawn from a study of fourteen recent Sites of the Day and twenty-four SaaS landing pages, captured at 1440 and 2560 while scrolling.

## 1. Pick the craft tier

| Tier | For | Motion | Type at 2560 | Rules |
|---|---|---|---|---|
| **Product** | Apps, dashboards, docs, settings, checkout | Feedback only | Stops near 1920 | The rest of this skill as written |
| **Marketing** | Most landing pages, SaaS, niche playbooks | One hero entrance; motion inside the product or the content (typing, swaps, video); native scroll | Fixed from 1440, or at most 1.25 times at 2560; a field or the art carries the width | `niches.md` and its playbook |
| **Showcase** | Portfolio, studio, brand, launch, campaign, premium service, event, editorial | Choreographed with scroll, section by section, smooth scroll underneath | Keeps growing with `vw` | This file, on top of the niche playbook |

The tiers differ on two axes, and they can be mixed only on the first one:

- **Scale and art direction** (display size, a brand world, treated imagery, visible structure): Marketing pages at their best borrow this from Showcase. The best SaaS pages set 86 to 160px display type over a brand world.
- **Scroll choreography** (smooth scroll, pinned sequences, reveals on every section, scrubbed effects): Showcase only. Of the eighteen top SaaS pages probed, none loaded a smooth scroll library.

Write the tier in the direction: "Tier: showcase. Niche: personal-brand service." A showcase page is never an app screen. The hard tells of `SKILL.md` hold in every tier: no accent rail, no emoji icons, no hue-to-hue gradient on chrome, nothing everything-centered, no single radius on everything.

## 2. What actually makes a Site of the Day

Not effects. Every one of the studied sites has, in this order:

1. **One idea that runs the whole page.** "The poster is the site" (a design festival). "Cards shaped like the format they describe" (a studio on formats). "Skin up close, nothing else" (a clinic). "The case studies play like a film" (a web studio). Write the idea in one sentence before any value (`direction.md`, the idea). If you cannot, the page will be a pile of effects.
2. **Typography as the image.** A display face set huge (6 to 10vw), tight (-2% to -6%), usually at weight 400 or 500, often mixed: a thin serif against a black grotesk, an italic phrase inside a sans headline, a mono for labels. The display is 8 to 15 times the body size.
3. **Visible structure.** Hairlines at 10 to 15% opacity, index numbers (01, A.1, 3 / 5), small mono or caps labels at 11 to 13px, crosshairs or ruler ticks, label-left content-right rows. The grid is shown, then broken once on purpose.
4. **A strict palette.** Two neutrals and one accent, or one ink on one paper. Rich color lives in photography and video, not in chrome.
5. **Treated imagery.** Full-bleed video or photography, often monochrome, duotone or grainy, in masks that are not rectangles (circle, polygon, the shape of the subject).
6. **Choreography tied to scroll.** Things reveal, pin, scale and swap as the reader moves, in the order of the story. Smooth scroll underneath.
7. **Craft in the margins.** A live clock, a counter, a nav that docks, a cursor-aware detail, a designed footer with the wordmark edge to edge.

A page that has 2 to 7 but not 1 looks like a template with effects. A page with 1 and only 2 and 4 can still win.

## 3. The toolkit

Everything below works in plain HTML, CSS and a little JavaScript. Only real 3D needs WebGL; none of the clinic, studio or SaaS pages studied needed it.

| Technique | Seen on | Values | Build |
|---|---|---|---|
| Smooth scroll | 13 of 13 award sites that loaded; 0 of 18 top SaaS | Lenis, `lerp: 0.1`, `syncTouch: false` | Showcase tier only. Lenis from a pinned CDN version; off under reduced motion |
| Display type scaled with the viewport | Most | `font-size: clamp(56px, 8vw, 220px)`, tracking -0.02 to -0.05em, line height 0.9 to 1.05 | CSS; a wordmark as SVG with the real `h1` kept as text |
| Line or word mask reveal | Most | Each line in an `overflow: clip` wrapper, translateY 100% to 0, 700 to 1000ms, `cubic-bezier(0.16, 1, 0.3, 1)`, 60 to 90ms between lines | CSS plus a small splitter; or GSAP SplitText |
| Clip reveal of images | Most | `clip-path: inset(100% 0 0 0)` to `inset(0)`, or a circle growing from the click or the center, 900 to 1200ms | CSS scroll-driven animation or IntersectionObserver |
| Pinned sequence with steps | Clinic, studio, finance, real estate | One per page, 3 to 6 steps, about 100vh of scroll per step, a counter ("3 : 4") and a progress hairline | `position: sticky` track plus IntersectionObserver for the active step |
| Index with one active item | Clinic, builder, architecture, most top SaaS | Inactive items at 12 to 30% opacity, the active one at 100%, a 2px progress line, a sticky image or panel that swaps with it | IntersectionObserver plus a class; in Marketing, auto-advance with a pause control instead of scroll |
| A brand world | Most top SaaS, many award sites | One art device only this company has: an object, a material, photography, a generative field, line figures, type as image | `niche-vertical-saas.md` section 2 lists how to build each without production assets |
| Docking nav | Clinic, agency | Name bar at mid-height on the hero, rides down, docks to the top as a solid bar | `position: sticky` inside the hero, then a fixed bar |
| Full-bleed video or photo field | Most | 100svh, muted loop, overlay 30 to 50% where text sits | `<video playsinline muted loop poster preload="metadata">` with a pause button |
| Grain | Most | Noise at 4 to 8% opacity, `mix-blend-mode: multiply` or `overlay` | One inline SVG `feTurbulence` as a fixed layer, `pointer-events: none` |
| Hanging-indent statement | Clinic, agency | 40 to 56px text serif or grotesk, `text-indent` about a quarter of the column | CSS |
| Hairline rows, label left | Clinic, builder, agency | 1px rule, 12 to 13px label, content on the right two thirds | CSS grid |
| Scale on scroll | Studio, agency | A media element from 0.8 to 1 (or a frame closing around it) over its passage | `animation-timeline: view()` |
| Marquee | Rare (2 of 14) | Only for a list that is truly endless (clients, press) | CSS animation, paused on hover and under reduced motion |

Recipes, all with progressive enhancement:

```css
/* Reveal only where the browser can drive it from scroll and JS has marked the page */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    html.js .revela {
      animation: revela linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 30%;
    }
  }
}
@keyframes revela {
  from { opacity: 0; clip-path: inset(0 0 100% 0); translate: 0 4vh; }
  to { opacity: 1; clip-path: inset(0); translate: 0 0; }
}
```

```js
// Lenis, only when motion is welcome; anchors and keyboard keep working
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ lerp: 0.1, syncTouch: false, anchors: true });
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}
document.documentElement.classList.add('js');
```

```css
/* Grain as one fixed layer */
.grao { position: fixed; inset: 0; pointer-events: none; z-index: 50; opacity: 0.06; mix-blend-mode: multiply;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
```

## 4. Composition at 1440 and 2560

- The first screen is a composition, not a header: the display type, one image or video field and the structure lines. It fills 100svh at 1440 and at 2560.
- In this tier the display keeps scaling with `vw` up to 2560 (a 120px headline at 1440 is about 200px at 2560). Body copy still stops near 18 to 20px; labels grow from 12 to 14px.
- Margins of 20 to 40px with full-width grids are normal here; the reading measure of `layout.md` (45 to 75 characters) applies to reading text only.
- Break the grid once per section at most: an image that crosses a column line, a word that runs past the margin, a counter in the gutter.
- Scale contrast is the drama: a 200px word next to a 13px label, a full-bleed video next to a 360px portrait.

## 5. Choreography

- One idea of motion for the page (masks, or wipes, or scale), used everywhere; not a different effect per section.
- Each section gets at most one reveal (its headline and one media element) or one scrubbed effect. Body text appears without movement.
- One pinned sequence per page at most. Never hijack the wheel into a horizontal track over text people read.
- Durations are longer than UI: 600 to 1200ms for reveals, `cubic-bezier(0.16, 1, 0.3, 1)` or `cubic-bezier(0.23, 1, 0.32, 1)`. Hover and press stay at UI speed.
- Nothing waits for a preloader. If an intro exists, it lasts under 1s and the headline is already in the HTML.

## 6. The floor

These hold even at this tier.

- The hard tells of `SKILL.md` still hold: no accent rail, no emoji as icons, no hue-to-hue gradient on chrome (multi-hue color only inside treated imagery: photo, video, dither, canvas), not everything centered, no single radius on everything.
- The page reads completely with JavaScript off and under reduced motion: start states only under `html.js` and `@supports`, never `opacity: 0` in plain CSS.
- Reduced motion: Lenis off, no pins, no scrub, no parallax, no autoplay; opacity changes of 200ms or less remain.
- The display headline is the real `h1`. Reading order matches visual order.
- Text over images and video reaches 4.5:1 (an overlay, not hope). Labels are at least 12px at 1440.
- Native scroll, anchors, Space, Page Down and focus all still work inside pinned sections.
- Video: `poster`, `preload="metadata"`, muted, a visible pause control, paused offscreen, at most two playing at once.
- Content revealed on hover also exists for touch and keyboard.
- No layout shift (CLS 0.1 or less). Fonts with `font-display: swap` and fallback metrics.
- Libraries from a pinned CDN version (Lenis, GSAP); no library for what CSS can do.
- `scan.mjs` will flag deliberate showcase choices (`infinite-loop` on a marquee or video, `hover-scale` on media, `tracked-caps` on a label system). Mark each with `/* atelier-ok: <rule-id> */`; never mark a hard tell.

## 7. Slop that wins awards anyway

Seen on Sites of the Day and still forbidden here:

| Seen | Instead |
|---|---|
| Preloader counter ("46%") before anything appears | The first screen renders at once; an intro under 1s at most |
| Wheel hijacked into a horizontal carousel | Vertical scroll; a horizontal track only for images, with native scroll and buttons |
| Content hidden until an intro ends; empty rows until hover | Visible content that the animation decorates |
| 8 to 11px labels, tiny at 2560 | 12px at 1440, growing to 14px |
| Display type colliding with text or nav | Layers that clear each other at every width |
| Blur on body text while it is read | Blur only on display type or media, under 300ms |
| Body copy that is scattered word by word across columns | Reading text in a column |
| Cookie walls covering a quarter of the screen | A small bar at the bottom |
| Sparkles, bloom on every section, washes drifting between hues | One accent, one wash inside one hue |
| The visible display is not the `h1`; the `h1` is a 12px label or missing | The display headline is the `h1` |
| A modal, email gate or cookie box over the first screen or the demo | The first screen and the demo work at once; consent as a small bar |
| A stock 3D render or a gradient blob as the brand world | A world built in code or from the client's own images (`niche-vertical-saas.md`, section 2) |

## 8. Review against the bar

1. Find three current Sites of the Day close to the subject. Category pages list them (`awwwards.com/websites/architecture/?award=sites_of_the_day`, and the same path for other categories); each site page has the real URL behind "Visit". Add two or three Behance projects of the niche.
2. Capture each at 1440 and 2560 and while scrolling (frames every 0.8 to 1 screen). Capture your page the same way with `node scripts/check.mjs <page> --frames <dir>`: motion on, one frame per screen. A full-page capture leaves scroll-driven sections at their start state, so it cannot judge them.
3. Put them side by side on one contact sheet. Ask, section by section: is there an idea; is the type doing the work; is the structure visible; is the image treated; does the scroll tell the story in order. Fix the weakest section first.
4. Check the floor (section 6): `check.mjs` reports JS off, reduced motion, reveals left hidden, focus, anchors, Page Down, sideways overflow and islands at 2560. Measure text over images on the pixels: hide the text, screenshot its box, and take the contrast of the lightest pixel against the text color.

## 9. Patterns that held up

From a studio page built at this tier and approved at 1440, 2560 and 390 (`examples/showcase-studio.html`):

| Pattern | Build |
|---|---|
| The idea taken from the trade's own notation | A studio's section drawing: each section labelled with a level mark and its height, counting down from the city's altitude; a bakery's proofing times; a clinic's appointment card. The notation becomes the section labels and one live readout |
| Index with a sticky stage | List of large names on the left (inactive at about 36% opacity), a sticky image on the right that crossfades. Active item from an IntersectionObserver band (`rootMargin: '-45% 0px -45% 0px'`), plus pointer and focus. Without JS and on phones, each item carries its own inline image; the stage exists only under `html.js` from 1024 |
| Pinned sequence without a scroll track | A sticky media column with the counter (`01 : 04`) and a progress hairline beside steps of about 72svh each. Native scroll, anchors and Page Down keep working; nothing to hijack |
| Hero frame that opens | The photo starts inset by the page margin and opens to full bleed: `clip-path: inset(0 var(--margin))` to `inset(0)` on `animation-timeline: view()` |
| Statement with an image inside the line | A small photo about 2.6em by 0.82em set in the text of a hanging-indent statement, `aria-hidden` |
| Margin readout | The current section or level set vertically in the gutter (`writing-mode: vertical-rl`, `mix-blend-mode: difference`), so it never covers content and reads on light and dark bands; `aria-hidden` |
| Wordmark edge to edge | `font-size: calc((100vw - 2 * var(--margin)) / N)` with `white-space: nowrap`, N measured once for the name and the faces (7.1 for a 17-letter name in a grotesk plus an italic serif) |
| A title block as the footer | The drawing's title block (studio, place, coordinates, sheet, scale, date) as a hairline grid under the wordmark |

## Checklist

- [ ] Tier written in the direction; showcase only where it belongs.
- [ ] The idea of the page in one sentence, and every section serving it.
- [ ] Display type huge, tight and scaling to 2560; one type pairing with a clear job for each face.
- [ ] Visible structure: hairlines, indexes, labels; the grid broken once on purpose.
- [ ] Imagery treated in one way across the page.
- [ ] One motion idea; one reveal or one scrub per section; one pinned sequence at most.
- [ ] The floor holds: no JS, reduced motion, keyboard, contrast over media, no preloader gate, no hijack (`scripts/check.mjs` clean).
- [ ] Compared side by side with three Sites of the Day at 1440 and 2560.

*Original to atelier, from a study of public Awwwards Sites of the Day and SaaS landing pages. See NOTICE.md.*
