# Direction

Read this before any refine or create. It covers the surface (what kind of screen this is), the five direction lines (what makes it this product's screen), the idea that carries a landing page, and the `DESIGN.md` file that keeps the decisions alive across sessions.

The order matters: surface, then direction, then tokens. Choosing colors before knowing the surface is how dashboards end up with marketing heroes.

## 1. Name the surface

Commit out loud to one surface before choosing a single value. If a screen spans two, name the primary one; do not average them.

| Surface | Examples | It needs | It must not have |
|---|---|---|---|
| **Monitor** | Dashboards, status pages, analytics, observability | Density, glanceable figures, one main chart, honest data states | A hero, marketing copy, decorative charts |
| **Operate** | Admin, consoles, queues, inboxes, CRMs, back offices | Action affordances, selection state, bulk actions, keyboard paths, fast tables | Big type, generous empty bands, animated lists |
| **Compare** | Pricing, plans, specs, search results, product grids | Aligned columns, parity of rows, one clear differentiator | Unequal card shapes that hide the comparison |
| **Configure** | Settings, forms, wizards, onboarding, checkout | Progressive disclosure, labels, validation and save states, low decoration | Hero, icons on every field, fancy layouts |
| **Decide and learn** | Landing pages, marketing, docs home, product pages, portfolios | One idea per section, a real argument, the one place a hero fits | Stock section order (hero, logos, three features, testimonial, pricing, CTA) by reflex |
| **Explore** | Galleries, catalogs, maps, feeds, listings | Filters, result grids, peek and zoom, fast scanning | Long intros, oversized cards |
| **Command and inspect** | Command bars, inspectors, property panels, editors | Speed, focus, keyboard first, dense precise controls | Animation on keyboard actions, roomy marketing spacing |
| **Present** | Decks, reports, one-pagers, case studies | One message per slide or block, a big honest number when the number is the message, real screenshots | Bullet walls, decorative stats, invented data |

Write it as one line: "Surface: Monitor. The finance lead checks cash position several times a day."

## 2. Write the five lines

Derive each line from what the product does and who it is for, never from what is trending. In a refine, read them off the existing product first; in polish mode, take them from the existing brand.

1. **Product.** What it does and for whom, in one plain sentence. "Invoicing for freelance designers that chases late payments."
2. **Character.** Two or three concrete words, such as `calm, exact, a little warm` or `fast, technical, playful`. Banned because they describe every template: clean, modern, sleek, minimal, premium, beautiful, elegant.
3. **World.** The place or material the product naturally belongs to. A notes app lives near paper and ink, a monitoring tool near instruments and night shifts, a travel app near maps and window light, a bakery near flour, enamel and morning. The world sets the tint of the neutrals, the accent, the type register and the visual.
4. **Moments.** One or two places that get rich color, material and detail, chosen from what the product shows: a chart whose colors each mean a series, a rendered card or device inside the preview, a product photo, an object from the world next to the content. Everything else stays quiet.
5. **Signature.** One small detail only this product would have, used consistently and only where it belongs: a live status dot for monitoring, keycaps for a dev tool, a hand-drawn underline for a teaching app, a route line for delivery, a receipt edge for a point-of-sale app. One detail, not five.

Then write what the five lines imply:

- **Neutral ramp** (graphite, warm, ink or a custom tint) and **accent** (`tokens.md`).
- **Type**: the interface family and the partner, if any, with the job of each.
- **Radius posture**: tight or soft; square or pill buttons.
- **Density**: compact, default or roomy, from the surface and frequency of use.
- **Motion posture**: almost none for tools used all day, a little more for occasional flows, one orchestrated moment for a landing page (`motion.md`).

### Brand

Keep a real brand: a logo file, a color or a typeface that is not slop. Build around it. A violet to blue gradient, sparkles and glow are slop even when they sit in the logo, and do not count as brand unless the user says so. Never rename the product. A slop logo (emoji, sparkle in a gradient tile, glossy orb) is redrawn flat: the name in the chosen family, or a simple glyph from the product's idea in one solid color.

When a new logo is needed: three directions as hand-written SVG, the wordmark converted to paths (opentype.js) so it needs no font. One direction comes from the product's world in a non-obvious way, one is typographic. Test each at 16 and 32px, at 24px next to 14px text in the app bar, black on light, white on dark and in the brand color, and say where each is weak. The user picks; then set the wordmark text exactly as they write the name, including case and accents.

### Examples of the shape (derive your own)

- Monitoring for small hosting companies. Character: alert, steady, unhurried. World: night shift, instrument panels, a lighthouse. Moments: the incident timeline, one uptime chart. Signature: a small live pulse dot used only where data is live.
- A recipe planner for families. Character: warm, practical, cheerful. World: kitchen tables, enamel, handwritten lists. Moments: food photography, the weekly plan as a printed list. Signature: a checkbox drawn like a pencil tick.

If an example happens to fit your product, write your own anyway.

### Set three dials

Numbers stop a brief from drifting to the same middle every time. Use them in the plan and let them drive layout, motion and density. Each is 1 to 10.

| Surface or brief | Variance | Motion | Density |
|---|---|---|---|
| Monitor, Operate | 1 to 2 | 1 to 2 | 7 to 9 |
| Configure, regulated, public sector | 1 to 2 | 1 | 4 to 6 |
| Learn, docs, editorial | 2 to 3 | 1 to 2 | 3 to 4 |
| Decide, software landing | 3 to 5 | 2 to 4 | 3 to 5 |
| Personal service, premium consumer | 5 to 6 | 3 to 5 | 2 to 4 |
| Showcase, studio, launch, event | 7 to 9 | 6 to 8 | 2 to 3 |
| Redesign that keeps the brand | Match it | Match it | Match it |

Variance runs from strict symmetry to asymmetric. Motion up to 4 means micro-interactions only; 5 to 6 adds one entrance or reveal system and one product demo; 7 and up belongs to the Showcase tier (`showcase.md`). Density above 7 drops card boxes for hairlines and tabular figures.

### Write one style sheet

A page assembled from blocks that each look fine still reads as assembled. Before code, write five to eight lines and save them in `DESIGN.md`: surfaces, edges (border and radius), depth (one kind only: flat, soft shadow or hard offset), type roles, the accent and where it goes, allowed effects, motion character.

- Build a small kit first (section header, card, button set, call-to-action band, form field) and assemble every page from it, including help, legal and changelog pages.
- A foreign element is a defect: a soft glow in a flat system, glass beside hard shadows, a 3D toy in a sober product.
- One background family for the whole site. One contrasting band only with a reason.
- If the product has a strong color of its own, the accent is that color or one chosen to sit with it.

When you study references (`niches.md`), name one as the lead and open the real site. Read its computed font family and sizes, line heights, container width and grid, section spacing, radius, button height and padding, and hover timing. Use those values to calibrate the quality bar, never to clone the identity.

## 3. The idea (landing pages and anything people read)

A landing page needs an idea, not only good manners. Removing tells without adding substance produces an empty page that is polite and forgettable.

1. **Inventory the subject.** List 8 to 12 things that belong to this product and no competitor: its name and what it means, the numbers in the brief, the place, the materials and colors of its world, the rituals and hours, the artefacts it produces, the constraint it lives with.
2. **Write the argument.** List the page as claims with proof, one line per section. Delete any section that has no claim. This replaces the stock order.
3. **Find the idea.** Fill in: "On this page, [something that belongs to the subject] becomes [the device that carries the page]." Look in its output, its object, its name, its place, its ritual, its artefact, its opposite.
4. **Competitor test.** Put the nearest real competitor into that sentence. If it still works, the idea belongs to the category, not to the product. Try again.
5. **One live thing** (optional, landing pages): one thing the visitor can do or see that comes from the idea, works with a thumb, has a plain fallback and never blocks reading.

Then write the words before the markup (`copy.md`).

## 4. Composition sketch

Before code, sketch the layout in ASCII with alignment stated. It is cheap and catches the centered stack early.

```
DESKTOP 1440                                   PHONE 390
+----------------------------------------+     +----------------+
| logo   Product Pricing Docs   [Start]  |     | logo      menu |
|                                        |     | Headline in    |
| Headline in two lines,     [  scene  ] |     | two lines      |
| left aligned               [  image  ] |     | Supporting     |
| Supporting sentence        [         ] |     | [Start] Demo   |
| [Start free]  Watch demo               |     | [ product   ]  |
|      [ product view rising from below ]|     | [ view      ]  |
+----------------------------------------+     +----------------+
Alignment: left. Text anchor at the first column. One primary, one secondary.
```

Then the de-default check: imagine someone else giving a similar prompt. If you would land on the same page, change that part and say what you changed and why.

## 5. DESIGN.md

Save the direction as `DESIGN.md` at the project root, so the next session (or another agent) inherits it. If the project already has one, read it first and extend it; never fork it. The format follows Google's open DESIGN.md spec: YAML front matter for the tokens that machines read, Markdown for the reasons people need.

```markdown
---
version: alpha
name: Ledgerly
description: Invoicing for freelance designers that chases late payments
colors:
  page: "#f7f4ee"
  card: "#fdfbf7"
  raised: "#efe9df"
  text: "#1f1b16"
  text-secondary: "#5e554a"
  text-muted: "#6f675c"
  primary: "#c2410c"
  on-primary: "#ffffff"
  positive: "#15803d"
  negative: "#dc2626"
typography:
  body: { fontFamily: "Instrument Sans", fontSize: 15px, fontWeight: 400, lineHeight: 1.5 }
  title: { fontFamily: "Instrument Sans", fontSize: 24px, fontWeight: 500, lineHeight: 1.2 }
  hero: { fontFamily: "Newsreader", fontSize: 72px, fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.03em" }
  figure: { fontFamily: "Geist Mono", fontSize: 28px, fontWeight: 500, lineHeight: 1 }
rounded: { sm: 6px, md: 10px, lg: 16px }
spacing: { xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 48px }
components:
  button-primary: { backgroundColor: "{colors.primary}", textColor: "{colors.on-primary}", rounded: "{rounded.md}", height: 40px }
  card: { backgroundColor: "{colors.card}", rounded: "{rounded.lg}", padding: 24px }
---

## Overview
Surface: Decide and learn (marketing) plus Operate (the app).
Product: invoicing for freelance designers that chases late payments.
Character: calm, exact, a little warm. World: paper, stamps, the post office.
Moments: the invoice itself rendered as paper in the hero; the cash-in chart.
Signature: a postmark stamp that appears when an invoice is paid.

## Colors
Warm ramp, neutral surfaces in the app. Ember orange is the only accent: primary action,
paid state, the one key figure. Positive and negative carry meaning only.

## Typography
Instrument Sans for the interface; Newsreader only for the hero headline; Geist Mono for
figures and invoice numbers, always tabular.

## Layout
4px grid. App: 240 sidebar, 24 page padding, 36 rows. Landing: left-aligned split hero.

## Elevation
No shadows in flow. Floating layers only, neutral and layered.

## Shapes
Tight posture: 6 to 10 on controls, 16 on cards. Buttons are not pills.

## Components
One primary button per view. Stat cards: label, figure, change with comparison.

## Do's and don'ts
- Do show real invoices with plausible amounts.
- Don't add sparklines to stat cards or a hero to the dashboard.
```

Rules for the file:
- Quote hex values and negative dimensions. Reference tokens with their dotted path (`{colors.primary}`), never by repeating the hex.
- Component variants are siblings (`button-primary-hover`), not nested.
- Sections in this order: Overview, Colors, Typography, Layout, Elevation, Shapes, Components, Do's and don'ts.
- With Node available, `npx -y @google/design.md lint DESIGN.md` checks broken references and WCAG contrast; `export --format css-tailwind` or `dtcg` produces theme files.
- If the project uses a different source of truth (a tokens package, a Tailwind theme), keep that as the source and let `DESIGN.md` hold the reasons and point to it.

## 6. Confirm

Show the surface line, the niche line, the five lines, the implied system and the sketch. In a refine, show the audit with it. For a landing page, also build the first screen with its photos (real or marked placeholders), screenshot it at desktop and phone width and show the images: a direction approved as text can still be rejected on sight, and the first screen is where it shows. Then stop and wait for a yes, because changing the direction later means redoing everything. Skip the wait only when the user said to just do it.

## Checklist

- [ ] Surface named in one line, with who uses it and how often.
- [ ] Five lines written from the product; no banned character words.
- [ ] Ramp, accent, type, radius, density and motion posture derived from them.
- [ ] For landing pages: inventory, argument, idea sentence, competitor test passed.
- [ ] Sketch with alignment stated; de-default check done.
- [ ] `DESIGN.md` written or extended.
- [ ] User confirmed, or said to proceed.

*Adapts material from unslop by Damir Sokolovsky (CC BY 4.0), claude-design by BadTechBandit (MIT), the design-md skill (MIT), frontend-design by Anthropic (Apache 2.0) and taste-skill by Leon Lin (MIT). See NOTICE.md.*
