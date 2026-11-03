# Layout

Read this when you compose a surface: an app shell, a dashboard, a landing page, a form or settings screen, a table, a deck or report, or the phone version of any of them. Name the surface first (`direction.md`); each section below assumes you have.

## Principles for every surface

- **One grid, few edges.** Text blocks share two or three left edges. Large things may run to the page edges; everything else aligns to the grid.
- **Equal outer margins.** No section huddled on one side with the other half empty by accident. Margins never under 16px at any width.
- **Section gap larger than any inner gap.** If two blocks are as close to each other as their own items are, the reader cannot tell where one ends.
- **No holes.** A blank stretch taller than about half a screen is a hole, not air. One deliberate rest per page at most.
- **Neighbours differ.** Two adjacent sections should not share the same composition. The most common failure is a distinctive hero followed by stock blocks.
- **Hierarchy you can squint at.** Two or three masses lead; the rest recede.
- **Let the browser lay out.** Flex, grid and intrinsic sizing over JavaScript measuring. `minmax(0, 1fr)` and `min-width: 0` so text can shrink.
- **Content defines the box.** A layout that only works with the demo copy is not done (`robustness.md`).

## App shell

```
+--------+-------------------------------------------+
| Logo   | Page title            [filters] [Primary] |
|        |-------------------------------------------|
| Nav    | Content: fluid, padded 24 to 32            |
| groups |                                           |
|        |                                           |
| Footer |                                           |
+--------+-------------------------------------------+
```

- Sidebar 224 to 280 (240 default), or an icon rail of 52 to 60 that expands. On light screens the sidebar stays light: a dark or saturated sidebar next to a light canvas is a template tell.
- Nav: wordmark or workspace switcher at the top, groups with sentence-case labels, rows 32 to 36 tall, icons 16 to 18 in the muted color. The active item is a neutral surface step (and maybe a hairline), not a colored pill with a left bar.
- Top area: page title at 20 to 28px, then filters and the one primary action. Not every page needs search, bell and avatar in a bar.
- Content fills the width with page padding; cap only very wide screens (about 1440 to 1600). Never shrink an app into a narrow centered column.
- Use `100dvh` for the shell height, not `100vh`.
- Phone: the sidebar becomes a 48 to 56px top bar with a menu sheet, or a bottom bar of four or five items. Never a sidebar taking a third of a phone.

## Dashboards (Monitor)

The questions first: what does this screen answer, and what is the one finding today? Everything named in the brief should be visible at 1440x900 without scrolling past a hero.

- **No hero, no greeting.** The title names the context or period ("October 2026", "Cash position").
- **KPIs are type, not tiles.** A label (12 to 14px), a figure (24 to 32px, tabular, weight 500), a change with its comparison ("+12% vs last month"). No icon in a tinted circle, no sparkline, no mini bars. The figure that answers the question may be larger and placed first.
- **Color goes on data, not chrome.** Most of the screen is neutral. The accent marks the one series or bar that matters; status colors mean good or bad, not up or down; zero change is grey.
- **One main chart**, clearly the largest (two thirds of the width, 200 to 360 tall). Supporting data is smaller and different in kind: a ranked list with thin bars, a short table. Never a grid of equal charts.
- **Surfaces stay flat.** Cards separated by a surface step or a hairline. No resting shadows.
- **Data is honest.** Totals computed from the rows shown; a fact shown twice is one variable; every relative figure names its baseline; zero prints as 0; missing data says "No data" (a muted dash is fine inside a table cell); an empty section keeps its frame.
- **Lists in overviews** show four to six rows and a "View all", not pagination under five rows.

### Charts

| Rule | Value |
|---|---|
| Type follows the question | Trend: line. Comparison: bars. Share of a whole: one stacked bar or a ranked list with bars. Single goal: progress bar. Distribution: histogram. Avoid pies beyond three slices; avoid donuts as decoration |
| Series | One is the norm, three the practical maximum. With several, one leads and the rest are quiet neutral steps |
| Grid | 3 to 5 faint horizontal lines (about 1.1:1 against the surface) or none. No vertical grid. No axis line on y |
| Ticks | 4 to 7 round steps, top tick above the max, zero baseline for bars. 11 to 13px labels, muted, tabular or mono. Never rotated x labels: thin them out |
| Marks | Lines 1.5 to 2px, no dots unless sparse, no smoothing that invents peaks. Bars square or with 2 to 4px top radius. Area fill under one line only, at low opacity |
| Legend | Only when two or more series; dots 6 to 8px with 12 to 14px labels, or label the lines directly |
| Annotate | Mark the event that explains a spike with a 1px rule and a short label |
| Comparison | Mirror the previous period in a neutral grey under or behind the current one |
| Access | Distinguishable without color (labels, patterns or direct labels); colorblind-safe hues |
| Motion | Charts do not redraw from zero on mount; only real value changes animate |

## Operate surfaces (admin, queues, CRMs)

- Tables over cards for anything people compare or act on in bulk.
- Selection, bulk actions and the primary action are always visible; row actions on hover must also be reachable by keyboard and touch.
- Filters as visible chips or a filter bar that reflects the URL; saved views when people repeat the same filter.
- Density: compact by default (rows 36 to 44), roomier only when rows carry two lines.
- Keyboard paths for the frequent jobs, shown as keycaps in menus and tooltips.

## Tables

| Rule | Value |
|---|---|
| Row height | 36 to 48 single line (44 default), 56 to 72 two lines |
| Header | 36 to 40 tall, 12 to 13px, secondary color, sentence case, no fill band, no uppercase tracking |
| Rules | 1px row rules a few percent darker than the surface; no zebra striping, no vertical lines |
| Numbers | Right-aligned, tabular, fixed decimals per column (money 2 or 0, percentages 1), thousands separators, a sign on every change |
| Identity column | The widest (a third to half), left-aligned, may wrap to two lines; IDs in mono, middle-truncated, with a copy button |
| Status | A small pill (pale tint with dark text of the same hue, text 12px) or a dot and a word |
| Avatars | 24 to 32px; fallback initials from first and last word |
| Empty | Keep the header and frame; say why it is empty and what to do |
| Many rows | Virtualize past about 1,000 or paginate; say which |
| Phone | Below about 640px, rows become two-line items (identity on top, key value right, meta under); never a sideways-scrolling table as the only option, unless the user really needs every column |

## Forms and settings (Configure)

- One column for forms. Labels above fields (14px, weight 500), 6 to 8px gap to the field, 16 to 24px between fields, 32 to 48px between groups with a group title.
- Inputs 40 to 44 tall, 16px text on phones, radius matching buttons. Help text under the field in the secondary color; errors replace or join it in the negative color with an icon.
- Settings: sections with a title and a one-line description on the left third and the controls on the right, or a single column under 720px. Save per section, or autosave with a visible saved state; warn on unsaved changes.
- Destructive settings at the end of the page in their own group, with a confirm or an undo.
- Wizards: show the steps and the current one, keep data across back and forward, never lose input on error.
- Details in `interaction.md` (validation timing, submit states, autocomplete, inputmode).

## Landing pages (Decide and learn)

Start from the argument and the idea (`direction.md`), not from a section template.

### First screen

- Answers what this is, for whom and what to do next, in large type, within five seconds.
- One `h1`. Headline in two lines or fewer at every width (about 32 characters is safe on phones). One supporting sentence (up to about 22 words). One primary action as a real button, at most one secondary.
- Navigation: wordmark, three to five plain links, one action. Log in is a quiet text link. It takes at most a tenth of the first screen. A plain bar beats a floating glass pill.
- Compose the first screen as a whole. The hero fills the viewport without a dead band; if the content is short, let the product view start low and run past the bottom edge so it invites the scroll.

### Hero compositions that work

| Composition | When |
|---|---|
| **Scene**: one image from the product's world fills the hero edge to edge, subject on one side, headline on the calm part, product view rising from the bottom edge | You can generate or own a strong image (`visuals.md`) |
| **Asymmetric split**: text on one side, one solid visual of at least half the width on the other | Most products; the visual is the product preview or an object |
| **Text over a large product view**: short headline above, the real interface large below | Tools whose product is the best argument |
| **Type only**: a large statement and the action, nothing else | Strong copy and a confident brand; short pages |
| **Stacked and centered** | Only for a very short hero with no visual. Long headlines never center |

In a split hero, center the text vertically against the visual; if the visual is much taller, shorten it. Prefer one solid visual over floating cards or tilted devices next to the text.

### After the hero

- Each section makes one claim with proof. Delete sections with no claim.
- Vary compositions: a full-bleed image band, a split with text, a table or comparison, a single large quote, a product detail at full width. Not a card grid in every section.
- One visual per section at most. For product pages, usually far fewer: the product itself is the best picture. For personal-brand, local business and launch pages, every section has one visual anchor (a photo, numbered cards, image cards, a mosaic, a colored band); the richness floor is in `niches.md`.
- Alternate the fields: page color, a tinted field, one dark brand band. A page that stays on one background from top to bottom reads as a document.
- Proof is real: named customers with permission, numbers with sources, quotes with names. Otherwise leave it out or mark samples as samples.
- Pricing is a Compare surface inside the page: aligned rows, the differences visible, one recommended plan.
- The footer is a designed close (the name, the next step, the few links that matter), not a sitemap dump.
- Section gaps 80 to 128 desktop, 56 to 80 phone. Large type on landing pages: a headline about four times the body.

## Docs and long reading

- Reading column 60 to 75 characters, body 16 to 18px at 1.6, headings with `scroll-margin-top` for anchored links.
- Left navigation for structure, a right "on this page" list on wide screens.
- Code blocks with a copy button, mono at about 0.9em of the body, no line wrap by default, horizontal scroll inside the block only.
- Callouts separated by a surface step and a small label or icon, never a colored left stripe.

## Decks, reports and one-pagers (Present)

- One message per slide. The title is the message ("Search went from 4 filters to 1"), not the topic ("Search update").
- A results deck has four to seven slides: cover, one per result, one summary.
- One highlight per slide. Two big numbers means two slides. The big number is the message, so it is honest, sourced and has its comparison.
- Real screenshots in device frames (`visuals.md`, `assets/phone-frame.html`, `assets/browser-frame.html`), showing the exact state the slide claims. Never a drawn screen. If a capture is impossible, the slide goes without a mockup.
- Layouts that work on a 1920x1080 slide: phone on the left and text on the right from about x=940; text on the left from x=110 with a chart or table on the right; title top-left with a browser frame running off the bottom edge.
- Text at least 24px on a 1920x1080 slide; titles up to three lines; footnotes define any term the audience may not know, in one line.
- Lay-reader language: no table names, queues, deploys or ticket numbers. No bullet walls.
- For a file deliverable, render the HTML to PDF with headless Chrome (`--print-to-pdf`, `@page { size: 1920px 1080px; margin: 0 }`); for an editable deck, generate PPTX from the same pixel spec. Open every page of the output before handing it over.

## Responsive

| Width | Treatment |
|---|---|
| 320 to 430 (phone) | Single column, margins 16 to 20, body 16, targets 44, headline 32 to 44, sections 56 to 80 apart |
| 600 to 840 (tablet portrait) | Two columns where content allows; sidebar collapses to a rail or sheet |
| 840 to 1200 (tablet landscape, small laptop) | Full layout with tighter gaps |
| 1200 to 1600 (desktop) | The design target |
| 1600 and up | Cap content width; let backgrounds and images run to the edges |

- Phone is its own composition: re-author line breaks, re-crop images to portrait, simplify dense previews (fewer rows and columns) instead of zooming out, put the visual after the actions.
- Container queries for components that live in columns of different widths.
- Test 320, 390, 768, 1024, 1440 and 2560, and at 200% zoom. No horizontal scroll at any width.

## States are part of the layout

Every screen is designed in its states, not only its happy path:

| State | Layout rule |
|---|---|
| Loading | Skeleton with the same grid, columns and sizes as the final content; flat bars, no layout shift when data arrives. Show it only after about 150 to 300ms, and keep it at least 300ms once shown |
| Empty (first use) | What this place is for and the first action. An illustration only if it is from the world and earns its space |
| Empty (no results) | What was searched, why nothing matched, how to widen it |
| Sparse | One or two items still look intentional |
| Dense | 1,000 rows, long names, many tags still hold |
| Error | Inside the block that failed, with what happened, the last good time if relevant and Retry. The rest of the page still works |
| Offline or partial | Say what is stale |

## Checklist

- [ ] Surface named; layout matches it (no hero on tools, no card grid where a table belongs).
- [ ] Two or three left edges; equal margins; no holes; section gaps larger than inner gaps.
- [ ] Dashboards: KPIs as type, one main chart, color on data, honest numbers.
- [ ] Tables: right-aligned tabular numbers, quiet header, no zebra, phone treatment.
- [ ] Landing: first screen answers in five seconds; neighbours differ; proof is real.
- [ ] Every state designed; phone is its own composition; no horizontal scroll from 320 to 2560.

*Adapts material from unslop by Damir Sokolovsky (CC BY 4.0), taste-skill by Leon Lin (MIT), claude-design by BadTechBandit (MIT) and the Vercel Web Interface Guidelines. See NOTICE.md.*
