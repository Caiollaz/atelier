# Scroll animation with GSAP

Read this when CSS and IntersectionObserver cannot do the job: a pinned timeline that moves several elements, a scrubbed sequence, or horizontal travel inside vertical scroll. Tiers and the floor live in `showcase.md`; this file is the build.

## 1. Earn the library

Go down the tool ladder in `motion.md` first. Use the first row that fits.

| Need | Use |
|---|---|
| One element reveals or scales as it passes | CSS `animation-timeline: view()` under `@supports` |
| Steps of a pinned story, active item of an index | `position: sticky` plus IntersectionObserver |
| One timeline scrubbed across several elements | ScrollTrigger |
| Horizontal track driven by vertical scroll | ScrollTrigger |
| Smoothing the scroll itself | Lenis, Showcase tier only |

Do not add GSAP because a page "has animation". In Product and Marketing tiers it almost never pays for itself.

## 2. The trigger

```js
gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  gsap.timeline({
    scrollTrigger: { trigger: '.story', start: 'top top', end: '+=2400', pin: true, scrub: 0.6 },
  })
    .to('.story__a', { yPercent: -20, ease: 'none' })
    .to('.story__b', { autoAlpha: 1, ease: 'none' }, '<');
});
```

`gsap.matchMedia()` reverts everything inside when the query stops matching, so reduced motion and breakpoints need no manual cleanup. The page must already read correctly without this block (`showcase.md`, the floor).

| Option | Rule | Value |
|---|---|---|
| `start`, `end` | Format is `"trigger viewport"`. Use relative ends so length follows content | `"top top"`, `"bottom 80%"`, `"+=2400"` |
| `scrub` | `true` is direct; a number is seconds of catch-up | 0.4 to 1. Above 1 feels detached |
| `pin` | Animate children, never the pinned element itself | One pinned sequence per page; about 100vh of scroll per step |
| `pinSpacing` | Leave the default unless you lay out the space yourself | `true` |
| `toggleActions` | Discrete play and reverse. Never with `scrub` (scrub wins) | `"play none none reverse"` |
| `once` | Reveal that should not replay | `true` |
| `snap` | Only for real steps, never to fight the reader | `{ snapTo: 'labels', duration: 0.3 }` |
| `markers` | Development only | Remove before delivery |

Eases inside a scrubbed timeline are `none`: the reader's scroll is the easing. Elsewhere use the tokens in `tokens.md`.

## 3. Rules that prevent the usual breakage

| Rule | Why | Fix |
|---|---|---|
| ScrollTrigger goes on the timeline or a top-level tween, never on a child tween | The parent and the scroll fight over the playhead | `gsap.timeline({ scrollTrigger })` |
| Create triggers top to bottom | Refresh runs in creation order, and pin spacing shifts everything below | Or set `refreshPriority` so the first section on the page has the lowest number |
| Refresh after anything that changes height | Positions are cached; resize is automatic, images and fonts are not | `document.fonts.ready.then(() => ScrollTrigger.refresh())`, and after images or async content |
| Functions for values that depend on size | A number computed once is wrong after resize | `x: () => ...` with `invalidateOnRefresh: true` |
| Kill on teardown | Stale triggers keep measuring removed elements | React: `useGSAP(fn, { scope })` from `@gsap/react`. Elsewhere `ctx.revert()` on a `gsap.context()` |
| Batch repeated reveals | One trigger per card with its own callback is noisy | `ScrollTrigger.batch('.card', { start: 'top 85%', once: true, onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.06 }) })` |

## 4. Horizontal travel

Pin a wrapper, move the track inside it, and keep a linear ease so scroll maps one to one to distance.

```js
const track = document.querySelector('.track');
const distance = () => track.scrollWidth - innerWidth;

const travel = gsap.to(track, {
  x: () => -distance(),
  ease: 'none',
  scrollTrigger: {
    trigger: track.parentNode, pin: true, scrub: true,
    end: () => '+=' + distance(), invalidateOnRefresh: true,
  },
});

gsap.from('.track .caption', {
  autoAlpha: 0,
  scrollTrigger: { containerAnimation: travel, trigger: '.track .caption', start: 'left 70%' },
});
```

Nested triggers name the horizontal tween in `containerAnimation` and use `left` and `right` positions. Pinning and snapping are not available on those. Give phones a native swipe or a stacked list instead of pinning a track.

## 5. Lenis with ScrollTrigger

```js
const lenis = new Lenis({ lerp: 0.1, syncTouch: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

Start it only under `prefers-reduced-motion: no-preference`. Load both from a pinned CDN version.

## Checklist

- [ ] CSS or sticky plus an observer could not do this.
- [ ] Reads completely with JavaScript off and under reduced motion.
- [ ] One pinned sequence per page; Space, Page Down, anchors and focus still work inside it.
- [ ] No `markers` left, no ScrollTrigger on a child tween, no `scrub` next to `toggleActions`.
- [ ] Refreshed after fonts and images; survives a resize between sections and a reload at depth.
- [ ] Tested at 390, 1440 and 2560 with `check.mjs`.

*Adapts material from GSAP's official skills by GreenSock (MIT). See NOTICE.md.*
