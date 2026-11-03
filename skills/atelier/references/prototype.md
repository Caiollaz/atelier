# Prototype

Read this when the user wants options: "show me variations", "explore a few directions", "I'm not sure how this should look". Exploring means building several real, working versions of one piece and switching between them at full size, not drawing thumbnails.

## Scope

- One piece at a time. Narrow "the dashboard" to its highest-leverage part (the overview header, the main chart, the invoice row). Restate the brief in one sentence before building.
- Recon first: stack, tokens, fonts, component library, the product's character, where the piece lives and its neighbours.
- Never touch production code while exploring. Build in an isolated route (`/prototypes/<slug>`), a story, or one self-contained HTML file, and delete it after the choice is promoted.

## Variants

- Three by default, five at most. More than five dilutes the comparison.
- Each variant diverges on a **named axis**. Two variants that differ only in accent color or copy are one variant.

| Axis | Positions |
|---|---|
| Layout | Split, stacked, full-bleed, sidebar, inline |
| Density | Compact, default, roomy |
| Hierarchy | Number first, chart first, list first |
| Personality | Quiet, editorial, playful, technical |
| Type | One sans, sans plus serif display, mono-led |
| Color posture | Neutral with one accent, tinted surfaces, field color per section |
| Surface treatment | Flat with hairlines, surface steps, one floating layer |
| Motion | None, feedback only, one orchestrated moment |
| Interaction model | Inline editing, modal task, side panel, command first |
| Copy structure | Claim plus proof, question plus answer, data first |

- Spread them: one **conservative** (closest to what exists or to the platform norm), one **strong fit** (your best reading of the direction), one **divergent** (a real risk worth seeing).
- Name variants by direction ("Ledger", "Editorial", "Command"), never "Option A" or "Variant 2".
- Every variant fully works: real interactions, realistic data with names and numbers that make sense, every state. No lorem ipsum, no dead buttons. A sloppy variant loses on execution, not on idea.
- Every variant meets the craft bar: tokens, contrast, focus, motion rules, tells absent.

## Presenting them

- One variant at a time, full size, in realistic context: a toast on a page, a card among its siblings, a button inside its form. Side-by-side thumbnails distort scale and spacing.
- Switching is instant, without animation; people flip a hundred times.
- A small picker, fixed at the bottom center (top if it would cover the piece):
  - one pill per variant, labelled by name; the active one marked with `aria-current="true"`;
  - keys `1` to `N` and the left and right arrows switch; `R` replays entrance motion when a variant animates;
  - keys are ignored while typing in inputs, textareas, selects or contenteditable, and when a modifier key is held;
  - the choice persists in the URL (`?v=2`) so reloads and shared links keep it;
  - switching remounts the variant so entrances run again;
  - the picker's own styling is neutral and does not borrow the variants' tokens.

```html
<nav class="picker" aria-label="Variants">
  <button aria-current="true" data-v="1">Ledger</button>
  <button data-v="2">Editorial</button>
  <button data-v="3">Command</button>
</nav>
<script>
  const views = [...document.querySelectorAll('[data-variant]')];
  const tabs = [...document.querySelectorAll('.picker [data-v]')];
  const show = (n) => {
    n = Math.min(Math.max(1, n), views.length);
    views.forEach((el, i) => { el.hidden = i !== n - 1; });
    tabs.forEach((b, i) => b.toggleAttribute('aria-current', i === n - 1));
    const url = new URL(location); url.searchParams.set('v', n); history.replaceState(null, '', url);
  };
  const current = () => tabs.findIndex((b) => b.hasAttribute('aria-current')) + 1;
  tabs.forEach((b) => b.addEventListener('click', () => show(+b.dataset.v)));
  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest('input,textarea,select,[contenteditable]')) return;
    if (/^[1-9]$/.test(e.key)) show(+e.key);
    if (e.key === 'ArrowRight') show(current() + 1);
    if (e.key === 'ArrowLeft') show(current() - 1);
  });
  show(+new URLSearchParams(location.search).get('v') || 1);
</script>
```

## Tweaks (optional)

For a piece whose answer depends on a dial (density, accent, type scale, motion on or off), add a small tweaks panel that changes CSS custom properties and persists to `localStorage`. The design must look finished with the panel hidden; the panel is a lab tool, never part of the result.

## Verify, then stop

1. Every variant renders without console errors at desktop and phone width.
2. Interactions respond; states are reachable.
3. Screenshot each one (`scripts/shoot.mjs <url>?v=1`, `?v=2`, ...).
4. Present a table and stop:

```
| # | Variant   | Axis                 | When it's right                         | Cost                          |
|---|-----------|----------------------|-----------------------------------------|-------------------------------|
| 1 | Ledger    | Density: compact     | Daily use by finance staff              | Less inviting for first use   |
| 2 | Editorial | Personality: serif   | Marketing pages and reports             | Weaker in dense tables        |
| 3 | Command   | Interaction: keyboard| Power users who live in shortcuts       | Needs onboarding for the rest |
```

Never pre-pick a favourite. If the user asks for your pick, justify it by the product's character and how often people will use the piece, not by taste alone.

## After the choice

- **Promote:** rebuild the chosen variant in the project's conventions (its components, tokens, file structure), then delete the prototype route and picker.
- **Riff:** run another round of three around the favoured variant, each moving one axis.
- **Keep the picker:** only if the user asks, for example to show stakeholders.

## Checklist

- [ ] One piece, brief restated, recon done, production untouched.
- [ ] Three to five variants on named axes, conservative to divergent, named by direction.
- [ ] Every variant works with realistic data and meets the craft bar.
- [ ] One at a time at full size, instant switching, URL persistence, keyboard safe in inputs.
- [ ] Verified and screenshotted; comparison table presented; no favourite pre-picked.
- [ ] Prototype deleted after promotion.

*Adapts material from Emil Kowalski's skills (MIT) and claude-design by BadTechBandit (MIT). See NOTICE.md.*
