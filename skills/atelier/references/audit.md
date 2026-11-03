# Audit

Read this when you judge an existing interface: a URL, a running app, a repo, a screenshot or a diff. It explains how to look, how to score, how to grade the slop and how to write a report people can act on. An audit changes nothing; fixing is a separate step the user chooses.

## 1. Scope

Agree on what is being judged before you look:

- **Screens.** Name them. For a whole product, take the three to five that people use most, plus the landing page if there is one. Frequency decides severity.
- **Viewports.** Desktop 1440 and phone 390 at least. Add 768 for layouts that change at tablet width.
- **Themes.** Light and dark if both exist.
- **States.** Default, empty, loading, error, and one with long or heavy data.
- **Depth.** `quick` (the main screen, top findings only), `standard` (default: the screens in scope, all families), `deep` (every route, plus motion, robustness and accessibility passes).

## 2. Look

1. Run recon from `SKILL.md`: stack, design authority, neighbours.
2. Capture: `node <skill>/scripts/shoot.mjs <url>` (add `--full` for long pages). Read every PNG.
3. Scan: `node <skill>/scripts/scan.mjs <src>`. Treat the result as leads, not verdicts.
4. Look in passes, one question at a time. Each is quick; doing them separately is what makes them work.

| Pass | Question |
|---|---|
| One second, then five | What is this, for whom, what do I do next? Can a stranger answer from the first screen? |
| Squint | Do two or three large masses lead, or is everything the same weight? |
| Swap the logo | Put a competitor's name on it. Does it still fit? |
| Edges | Count the distinct left edges of text blocks. Two or three is composed; six is placed one at a time |
| Space | Equal outer margins? Space inside groups smaller than between? Any hole taller than half a screen? |
| Type | How many sizes and weights? Headline to body jump? Lines longer than about 75 characters? Widows? |
| Color | Name the proportions. Where does the accent appear? If it is in ten places, it means nothing |
| Surfaces | Hero only where it belongs? Cards where a table belongs? Identical tiles? |
| Sameness | One word per section layout. The same word three times in a row is a template |
| Details | Radius math, icon consistency, focus, hover, disabled, tabular numbers, keycaps |
| Phone | Its own composition, or the desktop squeezed? Targets, input size, nothing hidden behind hover |
| Data | Plausible? Adds up? Long names, zero, empty, thousands? (`robustness.md` for the full stress pass) |
| Motion | Does it move where it should not, or fail to respond where it should? (`motion.md`) |
| Access | Contrast, focus, names, zoom, reduced motion (`interaction.md`) |

5. Walk `tells.md` family by family and write one line per hit: family, where (route, component, `file:line`), what you saw.

Say how each finding was seen: rendered, or from code only. Never present a code-only guess as a visual fact.

## 3. Score

Score each family from 0 (clean) to 3 (pervasive), then the overall slop score from 0 to 10.

| Score | Meaning per family |
|---|---|
| 0 | Nothing, or one deliberate and defensible use |
| 1 | A few isolated hits |
| 2 | Repeated, visible in most screens |
| 3 | It defines how the product looks |

Families: composition, color, type, icons, spacing, copy, components, landing, motion, mobile and robustness, accessibility, template look.

Overall slop score: the sum of family scores, scaled to 10 (divide by 3.6 and round). Then apply caps that override arithmetic:

- Wrong surface (a hero on a tool, a marketing layout on a dashboard): at least 6.
- Any hard tell from the author's list (accent rail, emoji markers, everything centered, giant hero on tools, purple to blue gradient, one radius on everything): at least 4.
- Text that fails 4.5:1 in body copy, or no visible focus: accessibility family is 3.

Give a craft score too, from the passes in section 2, so the report says what works and not only what is wrong:

| Criterion | Weight | Asks |
|---|---|---|
| Design | 0.4 | Hierarchy, composition, type, color, detail |
| Usability | 0.3 | Clarity of the first screen, paths, states, access |
| Identity | 0.2 | Could only be this product; idea and signature |
| Content | 0.1 | Real, specific, complete, honest |

Score each 1 to 10, combine with the weights. Be a stranger, not the author: a first self-score of 9 is almost always wrong. Most shipped products land between 6 and 8.

## 4. Grade

| Grade | When | What happens next |
|---|---|---|
| **Heavy** | Slop score 6 or more, or tells across color, type, icons and copy | Full refine: direction, then every pass |
| **Light** | Slop score 2 to 5, mostly designed with a few tells | Polish mode: fix only the findings, keep palette, type, layout and visual; bigger ideas become suggestions |
| **None** | Slop score 0 or 1 | Say so. Offer two or three refinements with exact values; apply only on a yes |

## 5. Severity and order

| Severity | Means |
|---|---|
| **Broken** | Unusable, unreadable, unreachable, wrong data, inaccessible |
| **Off** | Clearly wrong; hurts trust or makes the product look generated |
| **Polish** | Craft; noticed by a designer, felt by everyone |

Order findings by leverage: impact divided by effort. A token change that fixes forty spacing hits beats a beautiful one-off. Group findings that share one fix into one row ("all stat cards", "every `:hover` rule").

## 6. Report

```
Looked at: /dashboard and /invoices, rendered at 1440 and 390, light and dark; source in src/.

Grade: heavy. Slop 7/10. Craft 5.4/10 (design 5, usability 6, identity 4, content 7).

| Family       | Score | Note                                         |
|--------------|-------|----------------------------------------------|
| Color        | 3     | violet to blue gradient on shell and buttons |
| Type         | 2     | 800 headings, tracked caps labels            |
| ...          |       |                                              |

| # | Severity | Family  | Where                        | Finding                                   | Fix                                         |
|---|----------|---------|------------------------------|-------------------------------------------|---------------------------------------------|
| 1 | Broken   | Access  | Sidebar labels               | #8a8aa0 on #1e1b2e is 3.9:1               | Muted to #8b8b91 on graphite ramp (5.4:1)   |
| 2 | Off      | Color   | app.css:12, Sidebar.tsx:40   | Hue gradient on shell and active nav      | Neutral graphite ramp, active = surface step|
| 3 | Off      | Compos. | /dashboard                   | Hero "Welcome back" above the data        | Page title "October 2026", data first       |
| ...

Works: the invoice table is dense and aligned; empty states explain the next step.
Needs a person or a device: brand color decision; swipe feel on a real phone.
Next: refine with a graphite ramp and the existing orange as the only accent.
```

For a diff or a single component, use `Before | After | Why`, one row per issue, then a one-line verdict: approve, or block with the reason.

Rules for the report:
- Name problems the way a designer would: "the supporting line starts 40px left of the headline's edge", not "could be more polished".
- Every finding has a location and a fix with a value.
- Keep what works on the record so the refine does not destroy it.
- List unverifiable claims on the page (`Trusted by 10,000 teams`) as questions for the user.
- Stop after the report. Offer the next step in one sentence.

## 7. Polish mode details

When the grade is light:
- The direction comes from the existing brand; write it down anyway so the fixes agree.
- Fix only what the audit found. Do not change palette, type, layout or visual.
- Put bigger ideas (a missing moment, a hero visual, a new signature) in the report as suggestions with one line of reasoning each.

## 8. Redesign proof

When a refine follows the audit, keep the before captures (`atelier-shots/before`), capture the after with the same command, and compare side by side. Report two or three measured changes (contrast ratios, number of sizes, number of distinct left edges, slop score) and click through every link, form and menu you touched.

## Checklist

- [ ] Scope agreed: screens, viewports, themes, states, depth.
- [ ] Captures read; scan run; each finding labelled rendered or code only.
- [ ] Every family scored; caps applied; craft score from a stranger's eyes.
- [ ] Grade chosen; findings ordered by leverage with severity, location and a valued fix.
- [ ] What works, what needs a human, and the next step written.
- [ ] Stopped after the report.

*Adapts material from unslop by Damir Sokolovsky (CC BY 4.0), claude-design by BadTechBandit (MIT), taste-skill by Leon Lin (MIT) and Emil Kowalski's skills (MIT). See NOTICE.md.*
