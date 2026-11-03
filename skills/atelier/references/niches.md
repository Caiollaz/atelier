# Niches

Read this in Create, and in Refine of any marketing page, right after the brief. It sets how rich the page must be for its market and which conventions of that market are expected rather than tells. A page that removes every tell but ignores its market comes out polite, sparse and unfinished, and the client rejects it.

## 1. Name the niche

Write one line before the direction: "Niche: personal-brand service. Richness: high. References: two Behance landings for psychologists."

| Niche | Examples | The visual is | Richness | Playbook |
|---|---|---|---|---|
| **Product** | SaaS, apps, developer tools, fintech | The product itself, as a coded preview or real screenshot | Restrained: one moment, quiet chrome | The rest of this skill as written |
| **Personal-brand service** | Psychologist, therapist, nutritionist, doctor, dentist, lawyer, coach, personal trainer, photographer, architect | The person: portrait, at work, their space | High | Section 4 |
| **Local business** | Restaurant, bakery, salon, clinic, gym, shop, hotel | The place and what it makes | High | Section 5 |
| **Info product and launch** | Course, mentorship, ebook, event, community | The author and the transformation | High, long page | Section 5 |
| **Editorial and portfolio** | Writer, studio, magazine, case studies | The work | Medium, type-led | Section 5 |

When in doubt between two, the one where a person or a place is what the buyer chooses wins the richer playbook.

## 2. Calibrate with real references

The market sets the quality bar. Look at it before writing the direction.

1. Search the niche in the user's language on Behance and Dribbble, for example "landing page psicóloga", "landing page nutricionista", "restaurant landing page". Pick two or three recent, well-crafted projects. If the user sent references, they replace the search.
2. Behance project pages load in a headless browser even when plain `curl` is refused. The project images are `img` elements whose `src` contains `project_modules`; download them and read them as images. Long images are full-page mockups: read them in full.
3. Write down, in a few lines: how many photos, how many sections, which brand devices (monogram, seal, frames), the palette family, the type pairing, the button style, the section order.
4. Match that bar. Differentiate through the direction (world, signature, idea), never by being emptier. Never copy a layout one to one, a logo, a person's photos or the copy.
5. Without browsing, use the playbook below as the bar and say so in the report.

## 3. Conventions that are not tells

The soft tells in `tells.md` are defaults to avoid when nobody chose them. In the niches marked High, these conventions are chosen on purpose, and applied consistently they are correct. The hard tells stay hard in every niche: accent rail, emoji as icons or markers, hue-to-hue gradients, everything centered, a giant hero on a tool, one radius on every element.

| Convention | Soft tell it overrides | Right when | Still wrong when |
|---|---|---|---|
| Emphasis inside headlines: one or two phrases in weight 600 and the accent color, the rest in a light weight | One word accented in a headline | Every headline on the page uses the same emphasis system | Gradient or italic plus color plus underline; a different trick in each heading |
| A photo in most sections | A visual on every section | The photos show the person, the place or the work, all with one treatment (same radius, same crop logic) | Decorative stock that says nothing; blobs, glows, abstract 3D |
| Warm cream, sand and caramel or terracotta, with a script or italic serif monogram | Cream and terracotta used for everything | Therapy, wellness, health, beauty, food, craft; tuned from the brand if there is one | A software product, or a brand whose colors say otherwise |
| A pill label above each section title ("Sobre mim", "Como funciona") | Pill badge or eyebrow above the headline | Plain sentence-case section names, same pill in every section, white or transparent | Emoji, "Introducing", uppercase tracked text, a label that repeats the title |
| Pill buttons with an arrow in a circle | One large radius on everything | Buttons and chips only; cards keep 12 to 20 and images 12 to 20 | Cards, images and inputs all fully rounded |
| Brand devices: monogram, a rotating text seal, a wax seal, an arch photo frame, an offset outline, a tinted block behind a photo | Decoration | Two or three devices, each drawn from the brand, repeated across the page | Five or more devices; anything that glows |
| A floating WhatsApp or booking button | Extra buttons | Local services where that channel is how people book, especially in Brazil | It covers the primary action or a form; keep it 56 to 60px, 20px from the bottom right |

Note in the report which conventions you used. `scan.mjs` flags some of them (pills, seal rotation, the seal's caps) as polish: list them as deliberate.

## 4. Personal-brand service

### The person is the product

People choose a therapist, a doctor or a lawyer by trusting a person. The face, the voice in first person and the space are the argument. A page without the person in the first screen fails, however clean.

### Richness floor

- Eight to ten sections. Every section has one visual anchor: a photo, numbered cards, an icon list, image cards, a photo mosaic or a colored band.
- Fields alternate: page color, white cards on it, a sand field, one dark brand band (usually "how it works"), a dark footer.
- At least four photos: the hero portrait, a mosaic of two or three in About, and images in the sections where a place or a format is described.
- Two or three brand devices from section 3, repeated.
- A designed close: the monogram, a short headline with emphasis, the button.

### Hero

| Part | Value |
|---|---|
| Layout | Asymmetric split. Text left (about 55%), portrait right (about 45%), vertically centered |
| Portrait | 4:5, in a shaped frame: an arch (top radius half the width) or a 16 to 20px rectangle, with an offset outline 20px up and right, or a tinted block behind it |
| Name chip | Overlapping the lower left of the portrait: a 40px round avatar crop, the name, the registry (CRP, CRM, OAB) |
| Seal | Top right of the portrait, 90 to 112px: the monogram in the script face, ringed by text on a circular path ("Psicóloga · Adolescentes · Curitiba"), rotating in about 24s, still under reduced motion |
| Copy | A pill label with the role, a headline of up to three lines with one emphasized phrase, one supporting sentence with the audience and the place, the pill button, a short row of facts with icons (place, online) |
| Phone | Text first, then the portrait at about 88% width, devices scaled down |

### Section recipe

| Section | Claim | Composition |
|---|---|---|
| Hero | Who she helps, with what, where | As above |
| Signs or pain | "This is what it looks like at home" | Text and a photo on one side, four numbered cards on the other |
| How it works | The path from the first message to the sessions | Dark brand band, three or four step cards with large script numerals, a light button |
| Formats or services | In person and online, or the service list | Two or three image cards, each with an icon tag, a title and a checklist |
| Ethics or approach | Confidentiality, method | Sand field, a headline with a highlighter mark, two icon cards |
| Booking helper | Optional live thing from the idea (`direction.md`) | A card that prepares the first message or picks a slot |
| About | First person, training, approach, years | Text left, a mosaic right (one tall portrait, two squares) with a wax seal on the seam |
| FAQ | Price, insurance, duration, first session | White boxes on the page color, a square accent icon that turns into a cross when open |
| Close | One more invitation | Centered, short: the monogram, a two-line headline, one sentence, the button |
| Footer | Name, registry, address, emergency line | Dark brand color |

### Palette and type

| Field | Page | Cards and fields | Accent (button) | Accent (large text) | Dark band |
|---|---|---|---|---|---|
| Therapy, psychology | `#faf6f1` | `#ffffff`, `#f1e6da` | `#9a5c34` | `#a8693f` | `#4a3124` |
| Nutrition, wellness | `#f7f5ef` | `#ffffff`, `#e9ecdf` | `#5b6b3a` | `#6f7f45` | `#2f3a24` |
| Dentistry, medicine | `#f6f8f8` | `#ffffff`, `#e3eeee` | `#1f6f6b` | `#2a8580` | `#173b3a` |
| Law, finance | `#f8f6f1` | `#ffffff`, `#ebe6da` | `#6b2f2f` | `#8a5a2b` | `#1f2533` |

Starting points, not a palette to paste: tune toward the brand and check every pair with `scripts/contrast.mjs`. The light accent usually passes only for large text; buttons and small links use the darker one.

Type: a sans with a real light weight for headlines (300) and 600 for the emphasis (Figtree, Manrope, Plus Jakarta Sans, Outfit), the same family for body; a script or high-contrast italic serif only for the monogram and numerals (Cormorant Garamond italic, Playfair Display italic, Pinyon Script).

### Copy

- The headline speaks to whoever decides and pays (the parent, the patient, the client), in one promise, with one emphasized phrase.
- About is in first person: years of practice, approach, who she works with, one sentence of why.
- One button name everywhere ("Agendar pelo WhatsApp"); the WhatsApp links carry a prefilled message in the user's language.

### Professional rules (Brazil)

Health and legal professions have advertising rules. Follow the council of the profession and say which one you followed.

| Profession | Must show | Must not |
|---|---|---|
| Psychology (CFP Code of Ethics, art. 20) | Name, title, CRP number | Price as advertising, patient testimonials, promises of results, sensationalism |
| Medicine (CFM Resolution 2.336/2023) | Name, CRM, RQE when a specialty is named | Promises of results; check the resolution for photos and testimonials |
| Law (OAB Provimento 205/2021) | Name, OAB number | Price, promises of results, mercantile tone |

Mental health pages end with the emergency lines (in Brazil, CVV 188 and SAMU 192), stated plainly.

## 5. Other niches in short

- **Local business.** The place and the product in photos from the first screen (the counter at 7am, the dish, the chair). Address, hours and map high on the page; one booking or ordering action; reviews only if real and attributed.
- **Info product and launch.** The author photo and the transformation in the hero; a long argument (problem, method, modules, who it is for, guarantee, FAQ); repeated buttons after each block; numbers only with sources.
- **Editorial and portfolio.** The work is the visual; type does the rest. Fewer devices, more white space, large images edge to edge.

## Checklist

- [ ] Niche named, richness stated, two or three references looked at (or the playbook used, and said).
- [ ] The page meets the richness floor of its niche; every section has a visual anchor.
- [ ] The conventions used are listed as deliberate; the hard tells are absent.
- [ ] Professional advertising rules followed and named.
- [ ] Contrast checked on every accent pair.

*Original to atelier. See NOTICE.md.*
