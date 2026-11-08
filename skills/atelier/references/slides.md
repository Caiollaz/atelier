# HTML slides

Read this when the deck will be shown or shared in a browser. What each slide says and how results decks are structured is in `layout.md` (Decks); this file is the build. For a PDF, render this same HTML. For a file people will edit in PowerPoint, generate PPTX from the same pixel spec. For more ready-made visual styles, if your environment has the `frontend-slides` skill (github.com/zarazhangrui/frontend-slides) read it.

## 1. Before building

| Decide | Options |
|---|---|
| Density | **Spoken:** one idea, large type, one to three short lines, more slides. **Reading:** self-contained slides with tables, annotated figures and four to eight short lines |
| Length | The content decides it. If a slide is too full, split it instead of shrinking the text |
| Direction | Write the direction (`direction.md`), then render three different title slides and let the person choose on pixels |

For mixed needs pick one: live persuasion is spoken, circulated decks are reading.

Slop in decks: gradient title slide, three feature cards on every slide, a bullet list on every slide, a stock icon by each bullet, a progress bar in a rainbow. Vary composition by what each slide says: a statement, a figure, a comparison, a section beat.

## 2. The fixed stage

Author every slide at 1920x1080 and scale the whole stage. Do not reflow slides for phones: a slide is a picture of a composition. Letterboxing is correct.

```html
<div class="deck"><main class="stage">
  <section class="slide active" aria-label="Title">...</section>
  <section class="slide" aria-label="Result">...</section>
</main></div>
```

```css
html, body { margin: 0; height: 100%; overflow: hidden; background: var(--stage, #111); }
.deck { position: fixed; inset: 0; }
.stage { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; overflow: hidden; transform-origin: 0 0; background: var(--paper); }
.slide { position: absolute; inset: 0; box-sizing: border-box; padding: 96px 110px; visibility: hidden; opacity: 0; pointer-events: none; transition: opacity 200ms ease, visibility 0s linear 200ms; }
.slide.active { visibility: visible; opacity: 1; pointer-events: auto; transition: opacity 200ms ease; }
@media (prefers-reduced-motion: reduce) { .slide, .slide.active { transition: none; } }
@page { size: 1920px 1080px; margin: 0; }
@media print {
  html, body { height: auto; overflow: visible; background: none; }
  .deck, .stage { position: static; transform: none !important; height: auto; }
  .slide { position: relative; inset: auto; width: 1920px; height: 1080px; visibility: visible; opacity: 1; break-after: page; }
}
```

```js
const stage = document.querySelector('.stage');
const slides = [...document.querySelectorAll('.slide')];
let at = Math.max(0, parseInt(location.hash.slice(1), 10) - 1 || 0);

function fit() {
  const s = Math.min(innerWidth / 1920, innerHeight / 1080);
  stage.style.transform = `translate(${(innerWidth - 1920 * s) / 2}px, ${(innerHeight - 1080 * s) / 2}px) scale(${s})`;
}
function show(i) {
  at = Math.min(slides.length - 1, Math.max(0, i));
  slides.forEach((el, n) => el.classList.toggle('active', n === at));
  history.replaceState(null, '', '#' + (at + 1));
}
addEventListener('resize', fit);
addEventListener('keydown', (e) => {
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); show(at + 1); }
  if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); show(at - 1); }
  if (e.key === 'Home') show(0);
  if (e.key === 'End') show(slides.length - 1);
});
fit(); show(at);
```

Add tap zones or swipe for phones. The hash keeps the place on reload and makes a slide linkable.

| Rule | Why | Value or fix |
|---|---|---|
| Switch slides with `visibility` and `opacity` | A later `display: flex` on a layout class overrides `display: none`, and every slide shows at once | The `.active` class above |
| Fixed pixels inside the stage | `vw` and `clamp()` reflow against the window, not the stage | `px`, or a type scale defined at 1920 |
| Minimum type | Rooms and shared screens are far away | 24px body on the stage; 18px only for sources |
| One highlight per slide | Two highlights are two slides | One accent moment |
| Single file | It gets emailed | Inline CSS and JS; images as files beside it or embedded |
| Motion | The content changes, so the transition should be quiet | A short fade between slides; a reveal only when order is the argument. No flying text |

## 3. Verify

- Render every slide at 1280x720 and one phone width. Look at the images: `scrollHeight` misses panels covering each other.
- Print to PDF and check there is one page per slide.
- Try arrow keys, Space, Home, End and reload on a middle slide.
- Only publish a deck to a public URL when the person asks. Say that the link is public.

## Checklist

- [ ] Density decided, and each slide has one message.
- [ ] Stage stays 16:9 in any window.
- [ ] Nothing overflows or overlaps on any slide, seen in renders.
- [ ] Text at least 24px; contrast measured.
- [ ] Keyboard navigation and PDF output work.
- [ ] Real screenshots and data, never drawn or invented.

*Adapts material from frontend-slides by Zara Zhang (MIT). See NOTICE.md.*
