# Tells

Read this in every audit and in the final review of every refine or create. It is the catalog of signs that a screen was generated rather than designed, grouped by family, each with how to spot it and what to do instead.

Rows marked `scan:<id>` are detected in code by `scripts/scan.mjs` (rules in `scripts/rules.json`). Everything else needs eyes on the rendered screen. A tell is a reason to look closer, not an automatic verdict: a brand that deliberately uses one of these, sparingly and with a reason, is making a choice. Note it and move on. Marketing pages follow their niche, and rich niches have their own conventions (photos or product views in most sections, one emphasized phrase per headline, tinted palettes, pill buttons, brand seals): `niches.md` section 3 lists them and when they stop being right. The hard tells in the checklist below hold in every niche.

## How to use this file

1. Run `scan.mjs` on the source and render the screen.
2. Walk the families below in order. Write one line per hit: family, where, what.
3. Hits feed the score in `audit.md`. The families map to the refine passes in `SKILL.md`.
4. After fixing, walk the list again. The last family, "template look", is the one to check after everything else is clean.

## 1. Composition and surface

| Tell | How to spot it | Fix |
|---|---|---|
| Wrong surface: a marketing hero on a dashboard, settings page, admin or tool | A big headline block and centered call to action above the actual work | Name the surface (`direction.md`); tools open on their content |
| Hero plus three feature cards as the default page | Headline, subhead, two buttons, then a row of three equal icon cards | Re-compose around the one moment that proves the headline; vary sizes |
| Everything centered | Most text blocks centered, columns stacked down the middle, `text-align: center` everywhere `scan:center-heavy` | Left-align long text; asymmetric split or text over a large product view |
| Giant hero with nothing in it | A viewport-tall hero whose only content is a headline and buttons | Shorter hero, or one real visual; let the product view start in the first screen. A type-only hero is fine when the type is the image (display at showcase scale, `showcase.md`) |
| Dead band under the hero | Hundreds of pixels of empty field between the hero and the next section, worst at 2560 | Let the product or the next section start inside the first screen |
| The visible display is not the `h1` | The big headline is a `div`; the `h1` is a small label or missing | The display headline is the `h1` |
| Equal cards side by side, each with the same chart or layout | Three or four identical cards in a row | One main element, smaller supporting ones of a different kind |
| Bento grid as a reflex | A mosaic of rounded tiles with mixed sizes and no reason for the mosaic | A layout that follows the content's order and importance |
| Feature tiles: icon, bold title, vague line, times three | Repeated blocks with the same structure and no real content | Fewer features, concrete copy, show the product doing the thing |
| Icon topper on every heading | A rounded square with an icon above each section title | Remove; use icons only where they help scanning |
| Monument stat | Huge numbers with tiny labels used as decoration in a hero | Numbers only where the number is the message, with a comparison |
| Narrow app | An app squeezed into a centered column with empty sides | App shell fills the viewport; content fluid with a sensible max width |
| Dashboard on every screen | A side panel of charts, team stats or tabs next to a list or CRUD table | List screens carry at most three to five figures as type in the header; charts live on the dashboard only |
| Sibling screens built differently | One list screen has a subtitle, another a boxed search, a third keeps its action inside the card | One header recipe for every list screen (`layout.md`, operate surfaces) |
| An action parked in its own pill beside the nav | A lone button in a gap of the top bar that belongs to nothing | Make it a nav item, or a page action on the screen it acts on |
| A visual on every section | Every band has an illustration, image or glow that says nothing about the product | One visual where it helps, usually only in the hero. Not a tell on personal-brand, local business, launch and vertical SaaS pages, where photos of the person, the place or the work, or views of the real product, carry each section (`niches.md`) |

## 2. Color and surfaces

| Tell | How to spot it | Fix |
|---|---|---|
| Purple to blue, violet to pink or any hue-to-hue gradient on backgrounds, cards, buttons or active nav | `linear-gradient` or `from-purple`, `via-`, `to-blue`, `to-indigo` utilities `scan:hue-gradient` | One neutral surface; the accent only where it means something |
| Gradient text | `background-clip: text`, `bg-clip-text`, `text-transparent` `scan:gradient-text` | Solid primary text color |
| Colored glows and colored shadows | `box-shadow` or `drop-shadow` with a saturated color, `shadow-purple-500/50`, `shadow-[0_0_20px_rgba(139,92,246,.5)]` `scan:color-glow` | Remove. Depth from surface steps and hairlines; neutral, soft shadows on light themes |
| Radial washes and blurred blobs behind content | Absolutely positioned divs with `radial-gradient` or `blur-3xl` and no content `scan:blob` | Remove. A plain background or one real visual |
| Neon or high-contrast colored borders | Saturated 1 to 2px borders around cards | Hairlines: the text color at 6 to 10% opacity |
| Default indigo or violet accent that nobody chose | Accent close to Tailwind indigo-500, violet-500 or #6366f1 family with no brand reason `scan:default-indigo` | Take the accent from the product's world (`direction.md`) |
| Five lavenders | Many near-identical tints of one hue for text and surfaces | Three text roles (primary, secondary, muted) from one neutral ramp |
| Everything highlighted, nothing leads | Accent on headings, icons, borders, badges and buttons at once | One accent, used once or twice per screen |
| Glass cards with a white inner highlight and a colored shadow | `backdrop-filter` on content cards with no layering reason `scan:glass` | Plain raised surface with a hairline. Blur only for real overlays (sheets, nav over content) |
| Cream background, high-contrast serif and terracotta accent, used for everything | Background near #F4F1EA, accent near #D97757, serif headlines | Fine when the world calls for paper and ink, and the expected family for therapy, wellness, beauty and craft (`niches.md`); a tell when it is the default for a software product |
| Near-black page with one acid green or vermilion accent, used for everything | Dark page, one neon accent on every interactive element | Choose the accent from the world; keep it rare |
| Broadsheet look as a costume | Hairline rules, zero radius, dense newspaper columns on a product that is not editorial | Use editorial structure only for editorial products |

## 3. Type

| Tell | How to spot it | Fix |
|---|---|---|
| Headings at weight 800 or 900 as a reflex | `font-weight: 800/900`, `font-extrabold`, `font-black` `scan:heavy-weight` | 400 to 600 and size for hierarchy, unless the typeface is a heavy display face chosen on purpose |
| Uppercase tracked labels everywhere (`NAVIGATION`, `PAID THIS MONTH`) | `text-transform: uppercase` with wide `letter-spacing`, `uppercase tracking-widest` `scan:tracked-caps` | Sentence case. Keep caps only where they carry information, sparingly |
| Eyebrow with a colored dot (`● HOW IT WORKS`) | A mono, uppercase label led by an accent dot above each section | Drop the dot; if a label stays, plain text in the secondary color |
| Eyebrow above every heading | A small label sitting over each section title saying what the title already says | Remove it; the heading is enough |
| One word accented in a headline | A span in a headline with italic, a gradient or the accent color, used once or differently in each heading | Treat the whole headline; or emphasize nothing. On marketing pages in rich niches, one emphasis system (an italic serif phrase, weight 600 in the accent, or two tones by line) applied to every headline is a convention, not a tell (`niches.md` section 3) |
| Light weights for reading text | `font-weight: 300` or `font-light` on body, leads or headings `scan:light-weight` | 400 for text, 500 to 600 for emphasis; light only on a display face at very large sizes, chosen on purpose |
| Too many sizes and weights | Six or more sizes and four weights on one screen | A few steps from the scale; weights 400 and 500, 600 for rare emphasis |
| Mixed number formats | `$48,210` next to `$124,860.40`, `07`, proportional digits jumping in tables | One format; `font-variant-numeric: tabular-nums` |
| Negative tracking on small text | `tracking-tight` or negative `letter-spacing` under 16px `scan:tight-small` | Zero or slightly positive below 16px; tighten only display sizes |
| Italic for emphasis | Italic used to make a word louder | Weight or color, or nothing |
| Inter or system-ui as an unchosen default | `font-family` is Inter or the system stack and nothing else was considered `scan:default-font` | Choose a family for the character (`tokens.md`); keep Inter when precise and technical is the point |
| Lines longer than about 75 characters | Body text running the full width of a wide screen | `max-width: 65ch` to `75ch` for reading text |
| Headline widows | One word alone on the last line of a heading | `text-wrap: balance` on headings, `pretty` on paragraphs |

## 4. Icons and emoji

| Tell | How to spot it | Fix |
|---|---|---|
| Emoji as nav icons, label decoration, status or section markers (🏠 📥 🚀 💰 ⚠️ 📈 🔥) | Emoji code points in markup or strings `scan:emoji` | One line-icon set (the project's, else one chosen for the type) or nothing |
| The icon set nobody chose | Lucide on every product, `lucide-react` added by reflex | Pick a set that matches the type: Iconoir, Phosphor, Tabler, Remix. Lucide only when the project already uses it |
| Sparkles for anything AI | ✨ in buttons, badges, headings `scan:sparkles` | Remove, or a plain icon only where it explains something |
| Icons in many sizes, strokes and colors | Mixed 14, 18, 22px icons, filled next to outline, each a different color | One size (16 or 18px), one stroke (1.5), the color of its text role |
| Icons off the column | Labels not aligned because icon boxes differ in width | Same icon box width in every row; fixed 8 or 10px gap |
| Emoji inside counts and pills (`18 👤`) | Visual | Plain number, muted, tabular |

## 5. Spacing and alignment

| Tell | How to spot it | Fix |
|---|---|---|
| Arbitrary values | `mt-[13px]`, `p-[7px]`, `gap: 13px`, `margin: 31px` and other values off the 4px grid `scan:off-grid` | Steps from the spacing scale (`tokens.md`) |
| Rows in one list with different heights or gaps | Measure them | One row height and one gap per list |
| Groups closer to their neighbours than to their own items | Label far from its list, near the previous one | Smaller gaps inside groups, larger between |
| Uneven padding in sibling cards | Measure them | One padding per card size |
| Big empty band above a section, cramped below | Visual | Balanced rhythm from the scale |
| Things nudged by hand | `translate` or odd margins used to align an icon or a label | Fix the container alignment instead |

## 6. Copy

| Tell | How to spot it | Fix |
|---|---|---|
| Greeting headline (`Welcome back, Sam! 👋`) | Headline that greets instead of naming the context `scan:greeting` | Name the page or the period (`October 2026`, `Invoices`) |
| Exclamation marks, `!!` | `scan:exclaim` | Plain statements |
| Hype words: supercharge, seamless, unlock, unleash, elevate, revolutionize, game-changing, effortless, magic, next-gen, cutting-edge, AI-powered everywhere | `scan:hype` | Say what the thing does, with the product's own nouns |
| A headline that fits any product (`Build faster with AI`) | Swap the product name; it still works | Say what it does for whom, with facts already on the page |
| Changes without a reference (`+12%!!`) | Visual | `+12% vs last month` |
| Wordy placeholders (`Search anything...`) | `scan:wordy-placeholder` | `Search` |
| Trailing periods on labels, buttons, captions, headings | Visual | None. Only multi-sentence paragraphs keep periods |
| Fake-looking data (`$123,456`, `[X]`, `Lorem ipsum`, `John Doe`, `jane@acme.com`) | `scan:fake-data` | Plausible values with real-looking variety |
| Unverifiable social proof (`Trusted by 10,000+ teams`, unsourced five stars, avatar rows) | Visual | Ask. Keep it quiet and specific if real, remove otherwise, list it in the report |
| `Submit`, `Click here`, `Learn more` as the only labels | Visual | Name the action (`Save changes`, `Send invoice`) and keep that verb through the flow |
| Apologetic or vague errors (`Oops! Something went wrong`) | `scan:oops` | What happened, why if useful, and the way out |
| Middle-dot meta strings and arrow-suffixed links everywhere (`A · B · C`, `Learn more →`) | Visual | Plain structure; an arrow only where it means "goes somewhere" |

## 7. Components and details

| Tell | How to spot it | Fix |
|---|---|---|
| Colored side stripe on cards, callouts or alerts (accent rail) | `border-left` (or `border-l-4`) in a color on a container, or a left inset shadow `scan:accent-rail` | Remove. Separate by background step, spacing and type |
| The same big radius on everything | One `border-radius` (often 16 to 24px or `rounded-2xl`) on buttons, inputs, cards and panels alike `scan:radius-monotone` | Radius by size: controls 6 to 10, cards 12 to 16, panels 14 to 20; nested radius = outer minus padding |
| Every element a pill | `rounded-full` on search fields, cards and containers | Pills for small tags or a deliberate button style, not everything |
| Glowing pills for counts, plans, shortcuts and status | Visual | Quiet mono or muted text; keyboard shortcuts as small keycaps |
| `PRO`, `New ✨`, `Beta 🚀` badges everywhere | `scan:badge-noise` | Remove, or one quiet text badge where it is true |
| Same soft shadow under every card | Identical `box-shadow` like `0 4px 6px rgba(0,0,0,.1)` on all cards | No shadow on cards in flow; shadows for floating layers only |
| Active nav item as a gradient pill with glow | Visual | A small surface step with a hairline, or a quiet indicator |
| Sparklines, tallies or mini bars on every stat card | Visual | Label, figure, change with comparison. Charts live in the chart |
| Rainbow bars in a single series; glowing or pill-shaped bars; uppercase day labels | Visual | One color for the series, the accent on the one bar that matters, muted grid, mono labels |
| Every chart in shades of the accent so nothing leads | Visual | Neutral steps with the accent only on the thing that matters |
| Logo as a gradient tile with a sparkle, or a glossy orb | Visual | The product name in the main family plus a flat mark in one color |
| Missing states | No hover, focus, active, disabled, loading, empty or error styles | Design every state inside the palette (`interaction.md`) |
| Spinner as the only loading state | A centered spinner over a blank page | Skeleton shaped like the final layout; spinner only inside a button |
| Empty state that says only "No results" | Visual | What happened and what to do next |
| Hover fill that ignores the separators | A rounded hover background with the row rules still drawn straight through it, or a square row hover under a rounded table header | Hide the rules touching the hovered row (`li:has(a:hover)` and `li:has(a:hover) + li`); in tables round the first and last cell of the hovered row to the header radius |
| The same action twice on one screen | "+ New" in the header and again inside the empty state | Once, in the header; the empty state says what to do |
| A small dropdown for content people read | Notifications or activity squeezed into a popover | A drawer: side panel on desktop, bottom sheet on phones (`components.md`) |
| Inline select and button to add to a list | A picker and an "Add" button sitting under a list inside a tab | A primary button in the tab header that opens a drawer with the form |
| Repeated identical rows | Sessions, devices or events that differ only by time | Group them with a count, the current or most relevant first; actions apply to the group |
| Confirmation dialog for reversible actions | `confirm(` or a modal before every delete | Undo for slips; confirm only destructive, irreversible actions |
| Hover into the color behind the card | A white card on a tinted board column hovers to the column's tint and disappears | Keep the fill; change the edge or the step (`components.md`, cards) |
| The same illustration twice on one screen | The mascot in the side panel and again in the empty or success message | One per screen; drop it from the decorative panel |
| A centered modal to pick one option on desktop | A select opens a dialog in the middle of the screen | A listbox anchored to the field on desktop, a bottom sheet on phones |
| Native controls leaking through custom fields | A blue cross in a styled search field, a grey scrollbar with arrows in a styled app | Draw the clear button; thin scrollbar on desktop (`components.md`) |
| Account and legal links loose in the app | "Sign out", "Terms" and "Privacy" at the foot of the home screen | One Menu screen, from the last nav item |
| Marketing nav on sign-in screens | The landing's top bar above the login form | No nav; the logo links home |
| Work screen squeezed on desktop | An editor in a 440px column inside a 1280px container, a recipe in 672px inside a wide panel | Use the container; split into areas (`layout.md`) |
| Actions out of order | Archive between the primary and Edit; a full-width primary on a desktop detail header | Primary, edit, then destructive last; buttons sized to their label |

## 8. Landing pages and heroes

| Tell | How to spot it | Fix |
|---|---|---|
| Pill badge above the headline (`✨ Introducing X 2.0`) | Visual | Remove, or a quiet text link if it is real news. A plain section name in a pill, the same on every section, is fine on niche pages (`niches.md`) |
| Gradient or shimmer on the headline | `scan:gradient-text` | Solid text |
| Three or more buttons, or chips and avatars stacked under the buttons | Count | One primary, at most one secondary |
| Floating blobs, orbs, grids or glowing lines behind the hero | Visual | Plain background, one real product visual or one scene from the world. A structural grid or a generative field drawn from the product (dot matrix, ASCII, line figures) is a brand world, not a blob (`niche-vertical-saas.md`) |
| A modal, email gate or consent box over the first screen | Visual | The first screen and the demo work at once; consent as a small bar |
| Stock robots, glowing brains, circuit lines, holograms for AI | Visual | Show what the AI actually produces |
| Text, fake buttons or a fake logo baked into an image | Visual | Real text in the page; images without text |
| Image with a hard edge or a different black than the page | Visual | Match the page color; mask the edges |
| Docs that depend on one machine | A versioned `DESIGN.md` or README that points to `docs/references/*.png`, screenshots or scripts kept out of git | Describe each reference in the file, with its public link and what was taken from it (`direction.md`) |
| Production notes on the page | "Example data", "provisional", photo credits over the hero, notes about what is a placeholder | Keep the page clean; license credits go in the footer or a credits page, and the report lists what must change before launch |
| Logo wall of companies that are not customers | Visual | Remove unless real and permitted |

## 9. Motion

| Tell | How to spot it | Fix |
|---|---|---|
| `transition: all` | `transition: all`, `transition-all` `scan:transition-all` | Name the properties |
| Entrance from nothing | `scale(0)`, `scale-0` as a start state `scan:scale-zero` | Start at scale 0.95 with opacity 0 |
| `ease-in` on UI | `ease-in` without `-out` `scan:ease-in` | `--ease-out` for enter and exit (`motion.md`) |
| Looping motion on things that are not live | `animate-pulse`, `animate-ping`, `animate-bounce`, `infinite` on decorative elements, breathing glows, shimmer on headings `scan:infinite-loop` | Static. Loop only real loaders and live indicators |
| Hover scale or lift on cards | `hover:scale-*`, `:hover { transform: scale` on cards `scan:hover-scale` | A color or surface step on hover; a press scale on buttons. A short lift is fine only where cards already stand on a step shadow; the scan still flags it, so confirm the shadow and move on |
| Ungated hover | `:hover` rules outside `@media (hover: hover) and (pointer: fine)` `scan:ungated-hover` | Gate them; Tailwind v4 `hover:` is gated by default |
| Scroll debug left on | `markers: true` in a ScrollTrigger `scan:scroll-markers` | Remove before delivery |
| Everything flies in on load or on scroll | Scroll-reveal on every section, cards entering from different sides | At most one short entrance of the main content, small stagger. Showcase tier: one motion idea, one reveal per section, never body text (`showcase.md`) |
| Animation on keyboard actions or the command palette | Motion on things opened by shortcuts | None |
| Durations over 300ms on small UI | `duration-500`, `500ms` on buttons, menus, tooltips `scan:slow-ui` | 150 to 250ms (`motion.md`) |
| Animating layout properties | `transition` on `width`, `height`, `top`, `left`, `margin`, `padding` `scan:layout-transition` | `transform` and `opacity` |
| Parallax and floating loops | Visual | Static layout. Showcase tier: parallax of at most 15% on images only, never on text, off under reduced motion |
| No reduced-motion handling | No `prefers-reduced-motion` anywhere while things move `scan:no-reduced-motion` | Gentler variant: keep opacity, drop movement |

## 10. Mobile and robustness

| Tell | How to spot it | Fix |
|---|---|---|
| `100vh` app shells and sheets | `100vh`, `h-screen` `scan:vh-unit` | `100dvh` for app shells and bottom UI, `100svh` for heroes |
| Inputs under 16px | `font-size` 12 to 15px or `text-sm` on inputs `scan:small-input` | 16px on inputs (iOS zooms otherwise) |
| Zoom disabled | `user-scalable=no`, `maximum-scale=1` `scan:no-zoom` | Allow zoom; fix the 16px input cause |
| Paste blocked | `onPaste` with `preventDefault` `scan:paste-blocked` | Let people paste; validate after |
| Tap flash | Grey or blue box on tap on mobile | `-webkit-tap-highlight-color: transparent` plus a real `:active` |
| Hover-only actions | Menus or buttons that appear only on hover | Visible or reachable by tap and keyboard |
| Kind demo data only (`Jane Doe`, 12 members) | `scan:fake-data` | Test with the worst case (`robustness.md`) |
| Squished avatars, overflowing names, `—` placeholders, `1 members`, raw `NaN` | Visual, with worst-case data | `flex-shrink: 0`, `min-width: 0`, omit missing fields, `Intl.PluralRules`, `Intl.NumberFormat` |
| Fixed-width buttons | `width` in px on buttons | `min-width` and padding |
| Ellipsis with no way to read the full value | `truncate` or `text-overflow: ellipsis` without a title or detail view | Tooltip or `title`, plus the full value elsewhere |
| Active bottom-nav item spilling out of the bar | The expanded label of the last item passes the bar's edge at 360 | Five items at most; the overflow goes behind a Menu item |
| The page scrolls behind an open sheet | Dragging inside a drawer moves the screen behind it | Lock the page while a dialog is open (`components.md`, sheets) |
| An empty strip down the right edge | `scrollbar-gutter: stable` on `html` at all times, on screens that do not scroll | Reserve the gutter only while a dialog is open |
| Bottom sheet under the status bar | The sheet's top passes behind the clock and the island | `max-height` that subtracts the top safe area |
| A board squeezed at 1024 | Four kanban columns of 166px with names broken letter by letter | Two columns below about 1280; a list by due date on phones |

## 11. Accessibility

| Tell | How to spot it | Fix |
|---|---|---|
| Low-contrast muted text, grey on grey | Run `contrast.mjs` on text and background tokens | 4.5:1 for text, 3:1 for large text and icons |
| No visible focus | `outline: none` or `outline-none` without a replacement `scan:no-focus` | A visible focus ring in the palette (`:focus-visible`) |
| Icon-only buttons without a name | `<button>` with only an icon and no `aria-label` | An accessible name |
| Tiny targets | Controls under 44px on touch | Pad the hit area, not the visual |
| Placeholder as the only label | Inputs with no `<label>` | A real label tied to the field |
| Color as the only signal | Status shown only by color | Add text or an icon |

## 12. Template look

These are not slop. They are what a cleaned-up screen falls back to when nobody made a decision. Check them last.

| Tell | Fix |
|---|---|
| Pure grey page, Inter, white text, the old brand color on one button, for a product whose world is warm or bright | A ramp tinted toward the world; the accent taken from it |
| Island at 2560: every section a 1200px column on one background, small type, a hero that fills half the screen height, a login card alone in a huge field | Wide stage for visuals, full-bleed fields, type that grows to 1920, hero composed for 1440 tall, split auth screens (`layout.md`, wide screens) |
| A headline that fits another product | The product's own nouns and promise |
| A hero visual that is an empty box or a generic picture | A coded preview of the real product, or one image from the world |
| Every product you touch gets the same layout, type and palette | Let the direction decide; vary on purpose |
| Clean but anonymous | Add the signature: one small detail only this product would have, used consistently (`direction.md`) |
| Polite and sparse: every tell removed, but the page is emptier than any page in its market (no photos, no brand devices, one field color) | Name the niche, look at its references and meet its richness floor (`niches.md`) |

## Checklist

- [ ] `scan.mjs` run and every hit either fixed or justified.
- [ ] Every family walked on the rendered screen, desktop and phone.
- [ ] The author's hard tells absent: accent rail, emoji markers, everything centered, giant hero on tools, purple to blue gradient, one radius on everything.
- [ ] The template look checked last: the screen could only belong to this product.

*Adapts material from unslop by Damir Sokolovsky (CC BY 4.0), Emil Kowalski's skills (MIT), claude-design by BadTechBandit (MIT) and frontend-design by Anthropic (Apache 2.0). See NOTICE.md.*
