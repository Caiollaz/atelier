# Niche: SaaS and software products

Read this when the page sells software: developer tools and APIs, vertical SaaS for a profession (clinic management, healthtech, legal, accounting, real estate), B2B and consumer apps. Drawn from a study of twenty-four SaaS landing pages featured on saaslandingpage.com and similar galleries (Linear, Attio, Resend, Clay, Mercury, Granola, Oscar, Dovetail, Lovable, Oxide, Tines, Fibery, Dia, Typesafe, Giga, Mobbin, Nucleo, Patensify, incident.io, Polar, AccessGrid, Raycast, Parloa, Operate) and healthtech projects on Behance, captured at 1440 and 2560 while scrolling.

## 1. What the best SaaS pages do

Quiet chrome, a rich product and one committed world. This holds for developer tools too: infrastructure and API products (Oxide, Typesafe, Giga, Resend) were among the richest pages studied.

| Layer | Treatment |
|---|---|
| Chrome (nav, buttons, labels) | Calm: neutrals, one accent, a mono voice for labels |
| The product | Shown working, in most sections, as real UI or recomposed fragments |
| The brand world | One art device that only this company would have, in the hero and repeated a few times |
| Type | Display at showcase scale in the hero and one statement section; the rest at product scale |
| Motion | Inside the product (typing, state changes, a scrubber, a canvas). Native scroll |

On the tiers of `showcase.md`: a SaaS page borrows the showcase scale of type and art direction but never its scroll choreography. Of the eighteen pages probed for scripts, none loaded a smooth scroll library and one loaded GSAP. No Lenis, no pinned scroll sections, no mask reveal on every section.

## 2. The brand world

The hero carries one image that belongs to the company, and the product appears in the first screen or right after it.

| World | Seen | Build without production assets |
|---|---|---|
| A rendered object (a metallic cube, a server rack labelled FIG. 1) | Resend, Oxide | An SVG or CSS object drawn from the product's subject, with grain; or a real photo of the hardware |
| A material world (clay landscape, paper collage, floral illustration) | Clay, Granola, Tines | A collage from the client's photos and paper textures in code (torn edges with `clip-path`, halftone with SVG) |
| Photography of the customer's life | Oscar, Mercury | The client's own photos; stock only as a marked placeholder |
| A generative field (ASCII, dot matrix, thermal stripes, dither) | Dovetail, Patensify, Giga | Canvas or SVG: characters or dots drawn from the product's data, at low contrast |
| An inline object in the headline (a dithered machine, app icons) | Dovetail, Mobbin | A small image or icon set between two words, the height of the cap line |
| Line figures with numbers (FIG 0.1, 0.2) | Linear, Oxide | SVG isometric line drawings with mono captions |
| Type as the image | Typesafe, Dia, Nucleo | The display face set huge, or a number as the hero ("193.6x") with its proof link |

Without client assets or an image generator, choose a world that can be built in code from this table, or from the client's own photos. Never a stock 3D render, never a gradient blob or a glow standing in for a world (`tells.md`).

## 3. The product, shown as a designed illustration

The best pages rarely show one plain screenshot. They recompose the interface:

1. Cut the UI into two or three fragments: a list or table, a floating action card, a status chip.
2. Overlap them by 40 to 80px; only the top fragment has a shadow.
3. Crop the container and fade the far edge: `mask-image: linear-gradient(90deg, #000 65%, transparent)`.
4. Zoom one detail 1.4 to 1.8 times so its text reads at 20 to 28px ("98% Delivered", "Uploading 1/3").
5. Set it on a photograph, a texture or a tinted panel, not always in a browser frame.
6. Give it one living state: text typing, "Thinking…" becoming "Done in 10 sec", a counter, a cycling view. Pause it under reduced motion.
7. Connect fragments with 1px connector lines and mono annotations ("FIG 0.1", "TICKETS").
8. Plausible data that matches the story: real-looking IDs ("ENG-2498"), amounts, dates in the current year, the same customer across fragments.

Ghost wireframes (grey blocks) only for abstract claims such as infrastructure.

## 4. Hero

| Variant | What it is |
|---|---|
| **Statement over the world** | A display headline over the brand world (photo, field, object), the action, and the product starting in the first screen |
| **Stacked, product below** | Audience label, two-line headline, one sentence, primary and secondary action, centered; a large product view rising from the bottom edge and running past it |
| **Split** | Text left, product or object right at half the width or more |
| **Live product** | The interactive piece is the hero: a prompt box, a typing terminal, a device to talk to. It works without signing up |

Headline: 60 to 90px for most, up to 160px when the statement is the idea. Grotesk at 400 to 600 with -0.02 to -0.04em tracking and line height 0.88 to 1.0; or a serif display at 400 (Resend, Granola, Oscar) for calm, premium or regulated categories.

## 5. Section recipe

| Section | Composition |
|---|---|
| Hero | Section 4 |
| Proof strip | Real customer logos in one color, six or seven per row at one optical size, with a mono caption or on a hairline grid; or a bento mixing logos, named quotes and sourced metrics. Skip it without permission |
| Statement | One sentence in two tones: a short claim in ink, the continuation in grey at about 55%, same size, 32 to 48px |
| Sticky index | Three to six capabilities as a list on one side; the active one at 100%, the others at about 30%, a 2px progress line under the active one (auto-advance with a pause control, or tied to scroll); the panel on the other side swaps product fragments |
| Features | Fragments from section 3, one per capability; alternating splits only when there are two |
| Signature piece | One section where the brand world returns at full width (the object, the field, the map) |
| Proof | Named people (name, role, company) with portrait or video, with permission; metrics with sources |
| Pricing | Aligned rows, one recommended plan, real prices or none |
| FAQ | Accordion |
| Close | Repeat the hero action (the prompt, the download, the demo), then a designed footer: the wordmark edge to edge, a closing statement or a seal |

One strong field change in the page: a dark band, or an inset dark panel with a large radius, 8 to 16px from the viewport edges.

## 6. Type, palette and 2560

- Two voices, sometimes three: a grotesk or serif display; a mono for labels, indexes, captions and data; optionally a serif as a third voice for a subhead or captions.
- Labels in mono or small caps at 11 to 13px with a hairline, used as a system; not on every button.
- Palette families seen: ink on white with one accent (Linear, Attio); warm paper `#faf7f2` with purple ink (Tines); cream `#f9ead6` with brown ink and a rust serif (Fibery); ink-dark `#0e1116` with one green (Oxide); near-black with metallic greys (Resend); full-color photography with a cream serif (Oscar). Multi-hue color appears only in treated imagery (photo, dither, canvas), never as a CSS gradient on chrome.
- At 2560: a page grid of 1680 to 1760 with the nav on it, reading text at its measure on the grid's left line, the product stage as wide as the grid, display grown about 1.25 times. Galleries show top SaaS pages at 1230 to 1450 with a strong field carrying the rest (a dark band, photography, brand art to the edge); copied without the field, those numbers read as islands on a 2K monitor (`layout.md`, wide screens). Run `scripts/check.mjs`. Never leave a dead band of empty field under the hero.

## 7. Slop that appears in this market and stays out

| Seen in the market | Instead |
|---|---|
| Announcement bar, "New" pill and chat bubble stacked above the headline | At most one, quiet, and only for real news |
| A modal, consent box or email gate covering the hero or the demo | The demo works on the page; consent as a small bottom bar |
| Glow on the primary button, colored underglow on icon tiles, gradient words | A solid button; tiles separated by surface |
| Multi-hue gradient fields and bottom blooms | One wash inside one hue, or treated imagery |
| "Partner" logos of big tech, unverifiable | Real customers with permission, or no strip |
| Star rating rows, unsourced numbers ("60 million") | Named quotes and sourced metrics |
| The visible display is not the `h1` (the `h1` is a 15px label) | The display headline is the `h1` |
| Uppercase tracked pills and mono on every button | Mono for labels and data only |
| Three equal cards, then a four-column icon row | The sticky index or recomposed fragments |
| Awards badges pinned over content | In the footer, if anywhere |
| Generated-looking hero scenes presented as real | A world built in code, or the client's real images |

## Checklist

- [ ] One brand world, built from real assets or in code; no blob, no glow.
- [ ] The product in the first screen or right after it, shown working; fragments recomposed with one living state.
- [ ] Display at showcase scale in the hero; native scroll; motion inside the product.
- [ ] A two-tone statement, a sticky index, one field change, a designed footer close.
- [ ] Every logo, number and quote is real and sourced.
- [ ] At 2560 the width is carried by a field or the art, not by stretched type.
- [ ] None of the market slop in section 7.

*Original to atelier, from a study of public SaaS landing pages and Behance projects. See NOTICE.md.*
