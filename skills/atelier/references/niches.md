# Niches

Read this in Create, and in Refine of any marketing page, right after the brief. It sets how rich the page must be for its market and which conventions of that market are expected rather than tells. A page that removes every tell but ignores its market comes out polite, sparse and unfinished, and the client rejects it.

## 1. Name the niche

Write one line before the direction: "Niche: personal-brand service. Richness: high. References: four Behance landings for psychologists."

| Niche | Examples | The visual is | Richness | Playbook |
|---|---|---|---|---|
| **SaaS and software** | Developer tools, APIs, infrastructure, vertical SaaS (clinic management, healthtech, legal, accounting, real estate), B2B and consumer apps | The product shown working, plus one brand world | High: quiet chrome, rich product, showcase-scale type in the hero | `niche-vertical-saas.md` |
| **Personal-brand service** | Psychologist, psychiatrist, nutritionist, doctor, dentist, lawyer, coach, trainer, photographer, architect | The person: portraits, at work, their space | High | `niche-personal-service.md` |
| **Local business** | Restaurant, bakery, salon, clinic, gym, shop, hotel | The place and what it makes | High | Section 4 |
| **Info product and launch** | Course, mentorship, ebook, event, community | The author and the transformation | High, long page | Section 4 |
| **Editorial and portfolio** | Writer, studio, magazine, case studies | The work | Medium, type-led | Section 4 |

When in doubt between two, the one where a person or a place is what the buyer chooses wins the richer playbook. Architects, designers and photographers can sit in either: a solo practice sold by the person's face is personal-brand; a studio with partners and an index of work is editorial and portfolio, where the work leads and the personal-service devices (arch frame, seal, floating booking button, pill buttons) do not belong. Then pick the craft tier (`showcase.md`): Marketing for most pages, Showcase when the page has to stand next to Awwwards Sites of the Day or the user asks for that level.

## 2. Calibrate with real references

The market sets the quality bar. Look at it before writing the direction.

1. Search the niche in the user's language on Behance and Dribbble, for example "landing page psicóloga", "site psicóloga", "landing page nutricionista", "saas clínica landing". Pick three or four recent, well-crafted projects. References the user sends replace the search and outrank the playbooks.
   When the user says to follow references strictly, ask which layer: the product UI (structure, components, rhythm) or the brand identity (logo, color, type). Copying a reference's brand makes a renamed template; mixing two references usually means one sets the UI and the other fills what it lacks.
2. Behance project pages load in a headless browser even when plain `curl` is refused. Scroll the page to trigger lazy images; the project images are `img` elements whose `src` contains `project_modules` (ask for the `1400_webp` size). Many are full-page mockups 5000 to 7500px tall: cut them into 1200px slices before reading, or the detail is lost.
   Plain `curl` works too: the first response is a JavaScript challenge that sets `js_challenge_value`; repeat the request with that cookie and the HTML lists every `project_modules` URL (slashes escaped as `\/`). Prefer the `max_3840`, `fs` or `1400` sizes. For an overview, paste two slices side by side on one sheet.
3. Count what repeats in three or more of them: that is the convention. Where they differ is a choice to make on purpose. Write both down in a few lines: photos, sections, devices, palette family, type, buttons, section order.
4. References show the bar, not the rules: some break their own council's ethics or carry slop. Each playbook lists what to keep out even when the market does it.
5. Match the bar. Differentiate through the direction (world, signature, idea), never by being emptier. Never copy a layout one to one, a logo, a person's photos or the copy.
6. Without browsing, use the playbook as the bar and say so in the report.

## 3. Conventions that are not tells

The soft tells in `tells.md` are defaults to avoid when nobody chose them. In the niches marked High or Medium-high, these conventions are chosen on purpose, and applied consistently they are correct. The hard tells stay hard in every niche: accent rail, emoji as icons or markers, hue-to-hue gradients, everything centered, a giant hero on a tool, one radius on every element.

| Convention | Soft tell it overrides | Right when | Still wrong when |
|---|---|---|---|
| One emphasized phrase in each headline: an italic serif or weight 600, in the accent or a second ink; or two tones by line | One word accented in a headline | Every headline on the page uses the same system | Gradient text; italic plus color plus underline; a different trick in each heading |
| A visual in most sections | A visual on every section | The visuals show the person, the place, the work or the real product, with one treatment | Decorative stock that says nothing; blobs, glows, abstract 3D |
| Tinted palettes: cream and caramel, wine and rose, navy and sand, blush and plum | Cream and terracotta used for everything | The family is chosen from the person or the brand, and differs from the last page made | A developer product; a family picked by habit |
| A mixed-case label above each section title ("Sobre mim") | Pill badge or eyebrow above the headline | Same treatment on every section, adds context the title does not | Emoji, "Introducing", a label that repeats the title |
| The role and registry line in small uppercase tracking ("PSICÓLOGA CLÍNICA · CRP 08/12345") | Uppercase tracked labels | One line, near the name | Every label on the page |
| Pill buttons, often with an arrow in a circle | One large radius on everything | Buttons and chips only; cards and images keep 12 to 24 | Cards, images and inputs all fully rounded |
| Brand devices: monogram, a giant faint monogram letter, a round seal, an arch frame, an offset outline, a tinted block behind a photo, shaped dividers | Decoration | Two or three, drawn from the brand, repeated | Five or more; anything that glows |
| A stacked, centered hero with the product view below | Everything centered; centered hero only when short | Vertical SaaS, where the product view anchors it; the rest of the page aligns left | Centered headers in every section |
| Chips orbiting a product view | Floating cards next to the text | Three to six, one style, feature names | Chips with fake numbers, or as decoration with no product |
| A floating WhatsApp or booking button | Extra buttons | Local services where that channel is how people book, especially in Brazil | It covers the primary action or a form; keep it 56 to 60px, 20px from the bottom right |

Note in the report which conventions you used. `scan.mjs` flags some of them (pills, seal rotation, caps, the sticky nav blur) as polish: mark each deliberate one in the source with `/* atelier-ok: <rule-id> */` on the line, the line above or the first line of the CSS rule, so the next scan shows only real findings. Never mark a hard tell.

## 4. Other niches in short

- **Local business.** The place and the product in photos from the first screen (the counter at 7am, the dish, the chair). Address, hours and map high on the page; one booking or ordering action; reviews only if real and attributed.
- **Info product and launch.** The author photo and the transformation in the hero; a long argument (problem, method, modules, who it is for, guarantee, FAQ); repeated buttons after each block; numbers only with sources.
- **Editorial and portfolio.** The work is the visual; type does the rest. Fewer devices, more white space, large images edge to edge.

## Checklist

- [ ] Niche named, richness stated, three or four references looked at (or the playbook used, and said).
- [ ] The niche playbook read; its choices made on purpose, different from the last page made.
- [ ] The page meets the richness floor of its niche; every section has a visual anchor.
- [ ] The conventions used are listed as deliberate; the hard tells are absent.
- [ ] Professional advertising rules followed and named.
- [ ] Contrast checked on every accent pair.

*Original to atelier, from a study of public Behance projects. See NOTICE.md.*
