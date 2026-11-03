# Niche: personal-brand service

Read this when the page sells a person: psychologist, psychiatrist, therapist, nutritionist, doctor, dentist, lawyer, coach, personal trainer, photographer, architect. It is the playbook behind `niches.md`, drawn from a study of six well-crafted Brazilian landing pages for psychologists and psychiatrists. Choose on every axis below; never take the first row by habit.

## 1. The person is the product

People choose a therapist, a doctor or a lawyer by trusting a person. The face, the voice in first person and the space are the argument. A page without the person in the first screen fails, however clean. Prefer three or more photos of the same person to any stock picture; a page with four portraits and no stock reads more trustworthy than one with a dozen stock scenes.

Start from what the professional already publishes. Their Instagram is usually the richest source: real portraits, the office, the brand they already use (colors, type, stickers, graphic devices), the registry number and the audience in the bio, where they work. Read it first (`visuals.md`, assets the client owns), download what you will use, and let the page look like the same person the patient follows.

## 2. Choose the hero

All five work. Pick by the photos you have, the character and the tier (`showcase.md`).

| Variant | What it is | Needs |
|---|---|---|
| **Cutout on the page color** | Text left; the person cut out, no frame, bleeding off the bottom edge on the right; a huge faint letter of the monogram (5 to 8% opacity) behind | A portrait with the background removed (a background removal tool, or the client's PNG) |
| **Shaped frame** | Portrait in an arch (top radius half the width) or a 16 to 20px rectangle, with an offset outline 20px away or a tinted block behind | Any portrait |
| **Photo card with caption** | Portrait in a rounded card; a white strip under it with the name and the registry | Any portrait |
| **Dark photo hero** | Full-bleed photo of the office with a gradient overlay in the dark brand color, the cutout person on the right, light text left | A cutout and a room photo; the strongest, and the hardest to make legible |
| **Quiet full-bleed field** (seen on an award-winning clinic site) | A full-bleed photograph or a slow muted video of the room, the hands, window light; a name bar ("Name · Psicóloga · CRP") at mid-height that rides down and docks to the top as a solid bar; one statement in a text serif below | Good photography of the space or a short calm clip; a pause control on video. Suits the Showcase tier |

Optional devices on the hero, two at most: a name chip overlapping the photo (round avatar, name, registry), a small round seal with the monogram (static, or rotating in about 24s and still under reduced motion), the giant monogram letter behind.

Copy in the first screen: a small line with the role and the registry ("Psicóloga clínica · CRP 08/12345", the one place where uppercase tracking is fine), a headline of up to three lines with one emphasized phrase, one sentence with the audience, the approach and the format, one button, at most one secondary.

## 3. Choose the type

| Option | Headline | Emphasis | Body |
|---|---|---|---|
| **Serif, light** (most common) | A light display serif at 300 to 400 (Gilda Display, Cormorant, Newsreader, Fraunces at low weight) | The phrase in italic, in the accent or a second ink | A quiet sans (Figtree, Archivo, Manrope) |
| **Serif, bookish** | A text serif at 500 to 600 (Source Serif, Newsreader, Fraunces) | Italic in the accent | A quiet sans |
| **Sans, light** | A sans with a real 300 (Figtree, Manrope, Plus Jakarta Sans) | The phrase at 600 in the accent | The same sans |
| **Text serif, regular** (calm, editorial) | A text serif at 400 for statements of 40 to 56px with a hanging indent of about a quarter of the column (Newsreader, Source Serif) | None, or one italic phrase | A grotesk at 15 to 16px, uppercase labels at 12 to 13px as a system |

One emphasis system for every headline on the page. Two families at most, plus a script only for the monogram. The repo example (`examples/landing-personal-service.html`) uses the sans option; the serif options are more common in the market.

## 4. Choose the palette

| Family | Page | Fields | Ink | Accent (button) | Second accent | Fits |
|---|---|---|---|---|---|---|
| Caramel | `#faf6f1` | `#f1e6da` | `#2f2119` | `#9a5c34` | `#a8693f` (large text) | Warm, maternal, earthy |
| Wine and rose | `#f8ece2` | `#ffffff` | `#3b1f2b` | `#4e2438` | `#c4847e` | Psychiatry, adult women, depth |
| Blue-grey and sage | `#f8f7f4` | `#dfe5ea` | `#2f3f57` | `#4f6378` | `#7a8060` | Calm, couples, families |
| Navy and sand | `#f7f5f0` | `#e6e4df` | `#2e4a66` | `#2e4a66` | `#9c8350` | Clear, adult, eating and anxiety |
| Blush and plum | `#fdf7f4` | `#f5e4ea` | `#3a2733` | `#5c3a50` | `#7a4d68` | Women, maternity, warmth |
| Olive and linen | `#f7f5ef` | `#e9ecdf` | `#2f3a24` | `#5b6b3a` | `#6f7f45` | Nutrition, wellness |
| White and teal | `#f6f8f8` | `#e3eeee` | `#173b3a` | `#1f6f6b` | `#2a8580` | Dentistry, medicine |

Starting points: tune toward the person (their clothes, their office, their logo) and check every pair with `scripts/contrast.mjs`. Light accents pass only for large text. Vary between projects: if the last page you made used one family, choose another unless the brand decides.

## 5. Section recipe

Pick eight to eleven in the Marketing tier; six to eight larger ones are enough in the Showcase tier, where each section carries more (a pinned process, a full-bleed photo band). Every section has one visual anchor: a portrait, icon cards, image cards, a mosaic, tiles or a field change. In the Showcase tier, the process can be one pinned sequence with a "n : 4" counter and a progress hairline, and the formats a two-up duotone split (`showcase.md`).

| Section | Claim | Composition |
|---|---|---|
| Hero | Who she helps, with what, where | Section 2 |
| Identification | "Você se sente assim?" The reader recognizes themself | Four to six icon cards or rows with a line each, often on a tinted field; or text split by hairlines next to a portrait |
| Themes | What she treats | Six cards (anxiety, depression, self-esteem, relationships, grief, burnout), each one line; no "Saiba mais" on every card |
| Approach | How she works | TCC, ACT, psychoanalysis... one line each, in plain words |
| Session facts | What to expect | Three or four tiles: duration (50 min), frequency (weekly), format (online, in person), approach |
| Process | From the first message to the sessions | Four numbered steps on a tinted or dark band, or on a dashed line |
| Formats and place | Online and in person; where | Image cards, or a block with address, hours and the online note. A map only if real |
| Ethics | Confidentiality and limits | Icon cards; especially for teenagers, couples and families |
| About | First person: training, years, who she works with, why | Text and a mosaic of two or three portraits, credentials as chips or a short list, the registry in the text |
| Content | Optional: Instagram or blog | A link card or a three-post strip, only if real |
| FAQ | Online, duration, frequency, first session, price, insurance | Accordion; price answered without advertising a value |
| Close | One more invitation | Short headline with the emphasis, one sentence, the button |
| Footer | Name, registry, hours, contact, address | Light by default, dark when the page has a dark band; mental health pages add the emergency lines |

Shaped dividers between fields (a shallow notch, a soft wave) are a common convention: one shape, used at most twice.

## 6. Professional rules (Brazil)

Follow the council of the profession and name it in the report.

| Profession | Must show | Must not |
|---|---|---|
| Psychology (CFP Code of Ethics, art. 20) | Name, title, CRP number | Price as advertising, patient testimonials, review widgets, star ratings or "5.0 on Google", promises of results, sensationalism |
| Medicine (CFM Resolution 2.336/2023) | Name, CRM, RQE when a specialty is named | Promises of results; check the resolution before showing testimonials or before and after |
| Law (OAB Provimento 205/2021) | Name, OAB number | Price, promises of results, mercantile tone |

Mental health pages end with the emergency lines (in Brazil, CVV 188 and SAMU 192), stated plainly. Even the strong references in this market skip this; keep it.

## 7. Slop that appears in this market and stays out

| Seen in the market | Instead |
|---|---|
| Stock photos of people with their head in their hands, crying at a window | Portraits of the professional and of the space; objects from the room |
| AI-looking lifestyle photos presented as real | Real or clearly marked placeholder photos |
| Gradient or glossy shine on buttons | A solid button with a darker hover |
| Contact cards with a colored left border | Cards separated by surface and spacing |
| An orbit diagram with the portrait in the middle | A plain list of themes or approaches |
| "Saiba mais" on every card | Cards that say enough, or one link per section |
| An empty map placeholder | Address and hours as text; a real map or nothing |
| A button in the color of Instagram or WhatsApp that breaks the palette | The brand accent with the channel's icon |
| Three type families | Two, plus the monogram script |
| Every section header centered | Left aligned; center only the close |
| Review stars, avatar stacks, "+500 pacientes" | Credentials, approach and years of practice |

## Checklist

- [ ] The person leads the first screen; three or more photos of the same person, little or no stock.
- [ ] Hero variant, type option and palette family chosen on purpose, and different from the last page made.
- [ ] Eight to eleven sections from the recipe, each with a visual anchor.
- [ ] Registry visible near the name; council rules followed and named; no testimonials or ratings for psychologists.
- [ ] Emergency lines on mental health pages.
- [ ] None of the market slop in section 7.

*Original to atelier, from a study of public Behance projects. See NOTICE.md.*
