# Writing style for atelier files

This file is for contributors (people and agents) who edit the skill. It is not loaded by the skill.

## Voice
- English. Imperative, second person, addressed to the agent doing the work ("Measure the sidebar", "Ask before generating").
- Plain words. Say what to do and why in one breath. No hype, no filler, no "it is important to note".
- Concrete beats abstract: give the value, the selector, the threshold, the example.
- No em dashes anywhere (use a period, a comma, a colon or parentheses). No emoji. Sentence case headings.
- Never mention a specific company the user works for, internal hostnames, or anything private. Real public products are fine as examples.

## Shape of a reference file
1. `# Title` then one or two lines: "Read this when ...". Nothing else above the first section.
2. Sections with `##` headings, in the order an agent would need them.
3. Rules as tables where they have a reason or a value: `Rule | Why | Value or fix`. Lists for procedures. Code blocks only for snippets worth copying (short).
4. Mark stack-specific rows in the rule text itself ("React:", "Tailwind:", "React Native:"). The default is stack-neutral (CSS and platform concepts).
5. End with a `## Checklist` when the file drives a pass, then a single footer line in italics crediting what it adapts, for example:
   `*Adapts material from Emil Kowalski's skills (MIT) and unslop by Damir Sokolovsky (CC BY 4.0). See NOTICE.md.*`
6. No inline source citations (no "EDE:44"). Sources live in NOTICE.md.
7. Size cap: about 20 KB per reference file. If it grows past that, split by topic.

## House rules (resolved conflicts; every file must agree with these)
- **Motion easing** is chosen by purpose and stored as tokens: enter and exit `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`; moving on screen `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`; sheets and drawers `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)`; hover and color `ease`; progress and marquees `linear`. Never `ease-in` on UI. "One curve per purpose", not one curve for everything.
- **Durations**: press 100 to 160ms; hover and color 120 to 180ms; tooltips 125 to 200ms; menus and popovers 150 to 250ms; modals and drawers 200 to 400ms; toasts 300 to 400ms with exit about 20% faster than enter. UI stays under 300ms unless it is a large surface (modal, drawer, sheet). Marketing explanations may run longer.
- **Springs** are for gestures, drags, interruptible and "alive" elements. Default bounce 0; up to 0.2 only when the gesture carried momentum or the brand is playful.
- **Motion character and classic principles**: `motion-principles.md` tunes distance and bounce inside the durations and easing here. Overshoot, squash and anticipation belong to illustration and brand moments, never to controls. Exits keep `--ease-out`; there is no `ease-in` exception for exits.
- **Scroll libraries**: GSAP is never the default. It is the last rung of the tool ladder in `motion.md`.
- **Entrances**: in the Product and Marketing tiers, at most one orchestrated entrance on load (main content fades and rises 6 to 12px, stagger 30 to 80ms, at most 6 items) and no scroll reveal on every section. In the Showcase tier (`references/showcase.md`), one reveal or one scrubbed effect per section and one pinned sequence per page, with the floor of that file. Nothing animates on keyboard actions or 100+/day interactions in any tier.
- **Hover**: cards never scale or lift on hover; a color or surface step instead. Small controls may get a subtle effect. Every `:hover` is gated by `@media (hover: hover) and (pointer: fine)`. Every pressable gets `:active` feedback (scale 0.97).
- **Spacing**: 4px grid. Off-scale nudges of 2px or an odd value that optically centers something inside a small control are allowed and should be rare.
- **Weight**: hierarchy comes first from size and color. Body 400, emphasis 500 to 600. 700 and up only when the chosen typeface is built for it or the brand uses it; never 800 to 900 as a reflex "make it bold".
- **Uppercase tracked labels and mono labels** are a tell only when they are the default treatment for every label or eyebrow and carry no information. A deliberate system (indexes, captions, data, the registry line) is fine and common on the best SaaS and showcase pages.
- **Inter and system-ui** are a tell only as an unchosen default. Chosen for a precise or technical character, they are fine.
- **Near-black and near-white**: prefer tinted neutrals from a ramp over pure #000 and #fff. This is not a tell.
- **Hero**: only on Decide and Learn surfaces (landing, docs, marketing). Dashboards, tools, settings and admin screens get no hero.
- **Niche conventions**: the soft tells are defaults to avoid when nobody chose them. On marketing pages, the niche conventions listed in `references/niches.md` section 3 (photos or product views in most sections, one headline emphasis system, tinted palettes, section labels, pill buttons, brand seals, a centered hero over a product view, a floating booking button) are correct when applied on purpose and consistently. The hard tells below never get an exception. Every file that mentions one of these soft tells points to `niches.md` for the exception.
- **Big number**: fine when the number is the message (a KPI, a results slide). A tell when it is decoration ("monument stat").
- **Hard tells from the author** (always flag): colored side stripe on cards or callouts (accent rail, `border-left` highlight), emoji as section markers or icons, everything centered, giant hero on non-marketing screens, purple to blue gradients, the same large radius on everything.
- **Contrast**: body text at least 4.5:1, large text and UI glyphs at least 3:1. Muted text is for meta and captions only and must still reach 4.5:1 on the surface it sits on.
- **Copying brands**: extract principles (density, restraint, type discipline), never clone a company's identity, screens or assets.
- **Honesty**: never invent screens, metrics, testimonials, logos or claims. Mark draft copy as draft. Report what was verified and what was not.
- **Renders**: look at the result. At most three render-and-check cycles per run unless the user asks for more.
