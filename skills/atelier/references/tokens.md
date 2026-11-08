# Tokens

Read this when you choose or repair the system: spacing, layout sizes, color, type, radius, depth, icons and buttons. These are starting values, not a house style. If the project already has a good system, keep it and fix only how it is used. Let the direction (`direction.md`) move the numbers; never let habit move them.

Write tokens as CSS custom properties (or the project's theme format) and reference them everywhere. A raw hex or a one-off pixel value inside a component is a finding.

## Hierarchy before color

Fix these first. Tokens cannot rescue a screen where everything competes.

| Rule | Why | Value or fix |
|---|---|---|
| Check it in grayscale | Color used as a crutch hides a weak hierarchy | Desaturate the render or build in neutrals first; add the accent last |
| Check it blurred | The eye sees mass before it reads | Blur the render by 8 to 12px: the primary thing must still be the first thing you find |
| De-emphasize before emphasizing | Making the rest quieter lifts the primary without adding noise | Soften the competing text or fill before enlarging the main element |
| Do not stack levers | Large and bold and dark at once is shouting | Pick size or weight or color; all three only for the single most important element |
| Values lead, labels support | The data is what people came for | Smaller or lighter label, stronger value |
| Three levels of action | Equal buttons force the reader to compare them | Filled primary, quiet secondary, text-only tertiary. A routine destructive action can stay quiet until its confirmation |
| Start with too much space | Tight first drafts rarely get opened up | Add generously, then remove until it looks right |

## Spacing

Scale (px): `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`. Everything sits on a 4px grid. Off-scale multiples of 4 (28, 56, 104) are fine when they solve a real case. A 2px step is allowed for nudges inside small controls; an odd value that optically centers something is allowed and should be rare.

| Use | Value |
|---|---|
| Inside a control (icon to label, padding of a chip) | 4 to 12 |
| Between related items (rows in a list, label and its field) | 2 to 8 |
| Between groups (a label and its list, two cards) | 12 to 24 |
| Between sections in an app | 32 to 64 |
| Between sections on a landing page | 80 to 128 desktop, 56 to 80 phone |
| Card padding | 16 compact, 20 to 24 default |
| Page edge padding | 16 to 20 phone, 24 to 32 desktop |
| Row height | 32 compact, 36 default, 40 to 44 touch |
| Nav to hero headline (stacked hero only) | 96 to 128 desktop, 48 to 64 phone |

Rules:
- Space inside a group is always smaller than space between groups. Proximity is how people read structure.
- Same thing, same size: every row in a list shares one height and one gap; every card in a row shares one padding.
- Icons in one column, labels on one baseline, numbers right-aligned in one column.
- Replace one-off values (`mt-[13px]`, `gap: 7px`) with scale steps. Measure the sidebar after the spacing pass; it breaks first.

```css
:root {
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px; --space-8: 32px; --space-10: 40px;
  --space-12: 48px; --space-16: 64px; --space-20: 80px; --space-24: 96px; --space-32: 128px;
}
```

## App layout

| Part | Value |
|---|---|
| Sidebar | 224 to 280 wide (240 is a good default); icon rail 52 to 60 |
| Top bar or page header | 48 to 64 tall |
| Content | Fluid, page padding 24 to 32, capped around 1440 to 1600 on very wide screens |
| Nav rows | 32 to 36 tall, 2 to 4 apart; group labels 24 above and 8 below |
| Page title | 20 to 28px in apps (24 is the common value). Never a landing-size headline |
| Stat cards | 3 or 4 per row on desktop, equal height, numbers only |
| Main chart | At least two thirds of the content width, 240 to 360 tall; next to it a narrower list or table, not a second chart |
| Settings | Label column about 1/3, controls 2/3, or a single column under 720px |

## Color

### Structure

- **One neutral ramp** for background, surfaces, borders and text, tinted very slightly toward the product's world (graphite, warm or ink, or your own). Tint so lightly that no surface reads as a color on its own.
- **Three text roles**: primary, secondary, muted. Not ten slightly different greys.
- **One accent** in the chrome, used rarely: the primary action, the selection, the one key figure. It covers a few percent of the screen.
- **Semantic colors** carry meaning only (positive, negative, warning, info), toned to the palette.
- **Moments** (a chart, a product render, an image) may hold richer color, as long as every color means something and stays in the world.

### Surfaces in apps and on landing pages

- Apps and dashboards keep surfaces neutral. People look at them for hours; the content carries the color. If the page background reads as orange, brown, blue or green, the tint went too far.
- Landing pages may tint surfaces further toward the world, or change the whole field color from one section to the next for rhythm. Nothing fades into anything.

### Starter ramps

Muted values below are adjusted so they reach 4.5:1 on page, card and raised surfaces. Check any edit with `scripts/contrast.mjs`.

**Dark**

| Role | Graphite | Warm | Ink |
|---|---|---|---|
| Deepest (sidebar) | `#0f0f10` | `#12110f` | `#07080d` |
| Page | `#141415` | `#161513` | `#0b0d14` |
| Card | `#19191b` | `#1c1a18` | `#11141c` |
| Raised (active row, input) | `#232325` | `#262421` | `#1a1e28` |
| Hairline | primary text at 8% | same | same |
| Primary text | `#ededed` | `#efe9de` | `#eef0f5` |
| Secondary text | `#a1a1a6` | `#aaa398` | `#a3a9b8` |
| Muted text and icons | `#8b8b91` | `#928c82` | `#80889b` |

**Light**

| Role | Graphite | Warm | Ink |
|---|---|---|---|
| Page | `#fafafa` | `#f7f4ee` | `#f5f7fa` |
| Card | `#ffffff` | `#fdfbf7` | `#ffffff` |
| Raised | `#f4f4f5` | `#efe9df` | `#eceff4` |
| Hairline | primary text at 8% | same | same |
| Primary text | `#171717` | `#1f1b16` | `#111827` |
| Secondary text | `#525252` | `#5e554a` | `#4b5565` |
| Muted text and icons | `#6e6e6e` | `#6f675c` | `#626b7d` |

Which ramp: apps use graphite or an equally quiet grey. Warm suits paper, wood, food, craft and anything human. Ink suits night, sky, water and anything technical. Build your own the same way: pick a hue from the world, keep saturation under about 6% on surfaces and under about 12% on text.

**Semantic**

| Role | Dark | Light |
|---|---|---|
| Positive | `#4cc38a` | `#15803d` |
| Negative | `#e5484d` | `#dc2626` |
| Warning | `#f5a524` | `#b45309` |

Color by meaning, not direction: a drop in errors is good news and is green. No change is grey. Status is never shown by color alone; pair it with a word or an icon.

### Accent

- Keep a real brand color and make it the accent. It leaves the surfaces.
- Without a brand color, take it from the world: warm worlds get amber, coral, ember orange; cool worlds get cobalt, teal, clear sky blue; natural worlds get moss or sage.
- Avoid the violet and indigo family unless the brand really is purple. Avoid framework defaults (Tailwind blue-500, indigo-500, emerald-500) as an unchosen accent.
- Text on the accent reaches 4.5:1; darken the accent or use dark text otherwise. The accent used as text on a light page needs a darker shade.
- Interactive states raise contrast: hover and active are slightly stronger than rest, never weaker.

### Dark themes

- Depth comes from surface steps and hairlines, not shadows.
- Set `color-scheme: dark` on the root so form controls and scrollbars follow.
- Soft light ink on a tinted deep ground; avoid pure `#fff` on pure `#000`.
- Light text on dark reads heavier: drop one weight step or add `0.01em` of tracking on small text.
- A primary button can be off-white from the ramp with dark text; the accent then moves to the selection or a key figure.
- Avoid navy and slate as the dark ground unless the world asks for it; tinted near-black reads as more deliberate.

### Contrast

| What | Minimum |
|---|---|
| Body and small text | 4.5:1 |
| Large text (24px, or 19px bold) and UI glyphs, icons, focus rings, input borders | 3:1 |
| Placeholder and disabled text | Readable, but never the only label |

If the project prefers APCA: about Lc 75 for body text, Lc 60 for other content text, Lc 45 for large headlines and icons, Lc 15 for dividers.

## Type

### Families

Choose by character, not by habit. One family for the interface, plus at most one partner with a clear job (a mono for figures and code, or a display face for large headlines).

| Character | Interface | Optional partner |
|---|---|---|
| Precise, technical, calm | Geist, Inter, IBM Plex Sans, Public Sans | Geist Mono, IBM Plex Mono, JetBrains Mono for figures and meta |
| Warm, friendly, human | Instrument Sans, DM Sans, Figtree, Onest | Newsreader or Fraunces for the hero headline only |
| Editorial, literary | Source Serif, Newsreader or a quiet sans for interface | A display serif (Fraunces, Instrument Serif, EB Garamond) for headlines |
| Playful, bold | Bricolage Grotesque, Space Grotesk, Familjen Grotesk | A mono for small labels |
| Institutional, trustworthy | Source Sans 3, IBM Plex Sans, Noto Sans | A serif for long reading |

All of these are free. They are examples of a register, not a whitelist; the most-used families (Inter, Space Grotesk, Instrument Serif) are themselves becoming tells when nobody chose them. A project font that is part of a real brand stays. Load only the weights you use, preload the one or two critical files and subset with `unicode-range` when you can.

### Scale

| Use | Size | Line height | Weight |
|---|---|---|---|
| Small labels, meta, counts | 12 | 16 | 400, mono welcome |
| Secondary text, captions | 13 to 14 | 20 | 400 |
| Body, nav items (apps) | 14 to 15 | 20 to 22 | 400 to 500 |
| Body (reading, marketing) | 16 to 18 | 1.5 to 1.6 | 400 |
| Card figures | 24 to 32 | 1 | 500, tabular |
| Page title (apps) | 20 to 28 | 1.2 | 500 to 600 |
| Section title (landing) | 32 to 48 | 1.1 | 400 to 600 |
| Hero headline | 56 to 80 desktop, 36 to 44 phone | 1.0 to 1.08 | 400 to 600 |

Use five sizes or fewer on one screen, far enough apart to read as different (a headline about four times the body on landing pages). For fluid type, interpolate between a phone scale and a desktop scale with `clamp()`:

```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body:  clamp(1rem, 0.96rem + 0.2vw, 1.125rem);
  --step-lead:  clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem);
  --step-head:  clamp(1.75rem, 1.3rem + 2vw, 3rem);
  --step-hero:  clamp(2.5rem, 1.4rem + 5vw, 5rem);
}
```

### Rules

- Hierarchy comes from size and color first, weight second. Body 400, emphasis 500 to 600. 700 and up only when the typeface is built for it or the brand uses it.
- Tracking by size: 0 under 16px (+0.01em is fine on small muted text); down to -0.02em from about 40px; down to -0.03em from about 56px. Never negative tracking on small text. Caps need +0.04 to +0.08em.
- Line height falls as size grows: 1.5 to 1.6 for body, 1.2 for titles, 1.0 to 1.08 for display.
- Reading measure 45 to 75 characters: `max-width: 65ch` on paragraphs.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- Numbers that update or align use `font-variant-numeric: tabular-nums`, one format and one precision per context (money with 0 or 2 decimals, never mixed).
- Look at tabular figures in the chosen family before using them widely. In some families (Schibsted Grotesk is one) `tnum` also widens commas, periods and colons, so `934,00` renders as `934 , 00` and `18:52` as `18 : 52`. Apply it to elements that hold digits alone (a counter, a table column), never to an address, an email or a sentence.
- Sentence case for headings, labels and buttons. All caps only for very short labels where the system uses it deliberately.
- No text under 12px in apps, nothing under 11px anywhere; nothing under 13px for anything people read on landing pages.
- Typographic details: curly quotes, the real ellipsis `…`, en dash for ranges, a non-breaking space between a number and its unit (`10&nbsp;MB`).

## Radius

| Element | Radius |
|---|---|
| Keycap, tag, small badge | 4 to 6 |
| Button, input, row | 6 to 10 |
| Card | 12 to 16 |
| Panel, dialog, window | 14 to 20 |
| Pill | Half the height, and only for small things or a button style chosen for the whole product |

Nested radius: inner = outer minus the padding between them, never below 4. A 16px card with 8px padding holds items with an 8px radius. Choose a radius posture once (tight or soft, square or round buttons) and keep it across the product. One big radius on everything is a tell.

## Depth

| Theme | How |
|---|---|
| Dark | Surface steps plus hairlines. A raised button or active row may carry `inset 0 1px 0 rgba(255,255,255,0.08)` as a soft top edge |
| Light, in flow | No shadow; separate by a surface step, a hairline or space |
| Light, floating (menu, popover, dialog, toast) | Neutral and layered: `0 1px 2px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.06)` for menus; `0 1px 2px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.12)` for dialogs |

- One light source for the whole product: every shadow has the same direction, blur grows with elevation.
- On a tinted background, tint shadows and borders toward the same hue instead of grey.
- A semi-transparent ring (`0 0 0 1px rgba(0,0,0,0.08)`) gives a crisper edge than a solid grey border on light surfaces.
- No colored shadows and no glows. Blur and translucency only on layers that really float over content.

## Icons

- One set: the project's own, otherwise a line set such as Lucide, Phosphor or Tabler.
- One size per context (16 in dense UI, 18 to 20 in roomier UI), one stroke (1.5), round joins if the type is soft.
- Icons take the color of their text role, usually secondary or muted. They never carry their own colors.
- Same icon box width in every row, 8 to 10px gap to the label.
- Icon-only buttons have an accessible name. Drop icons that add nothing; categories that need color get a small status dot.
- Next to bolder text, a thin icon may need a heavier stroke to look the same weight.

## Buttons

| Kind | Look |
|---|---|
| Primary (one per view) | Filled. Accent with readable text, or on dark themes an off-white from the ramp with dark text, or on light themes the primary text color as fill with white text |
| Secondary | Raised surface plus hairline plus primary text |
| Ghost or tertiary | Text color only, a surface step on hover |
| Destructive | Negative color, used only where the action destroys |

Sizes: 32 to 36 tall in app chrome and toolbars, 40 to 44 for forms, 44 to 48 for hero actions; side padding 12 to 20. Width comes from content (`min-width`, never a fixed width). Labels name the action in one to three words. Loading keeps the label and adds an indicator.

## Focus

```css
:focus-visible { outline: 2px solid var(--focus, var(--accent)); outline-offset: 2px; }
```

The ring must reach 3:1 against the surface behind it, follow the radius of the element and never be hidden by sticky headers.

## Motion tokens

The full rules are in `motion.md`. The tokens every project should have:

```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
  --dur-press: 140ms; --dur-hover: 160ms; --dur-ui: 200ms; --dur-panel: 320ms;
}
```

## Checklist

- [ ] Spacing, radius, color, type and motion exist as tokens; components reference them.
- [ ] One neutral ramp, three text roles, one accent, semantic colors for meaning.
- [ ] Every text and surface pair checked with `contrast.mjs`.
- [ ] Five sizes or fewer per screen; tracking and line height follow size.
- [ ] Radius by size with nested math; one posture across the product.
- [ ] Shadows only on floating layers; none colored.
- [ ] One icon set, one size and stroke per context.
- [ ] Hierarchy holds in grayscale and blurred.

*Adapts material from unslop by Damir Sokolovsky (CC BY 4.0), Emil Kowalski's skills (MIT), the design-md and popular-web-designs skills (MIT) and wondelai's refactoring-ui skill (MIT). See NOTICE.md.*
