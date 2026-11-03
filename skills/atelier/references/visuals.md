# Visuals

Read this before the visuals pass and whenever a screen needs an image: a landing hero, an empty state, an onboarding moment, a deck slide, a product shot. It covers when a visual earns its place, how to write a scene, how to generate or capture it, where to put it, and the code treatments that make an image belong to the page.

Decorative filler (glossy blobs, orbs, nebulas, floating cubes, glowing grids, holographic brains, robots) says nothing about the product. Remove it first; then decide whether anything should take its place.

## 1. Does this screen need a visual?

| Screen | Visual |
|---|---|
| Landing hero, product page, campaign | Usually yes: one strong visual that shows something true |
| Empty state, onboarding, success after a rare milestone | Sometimes: a small image or object from the world |
| Dashboard, settings, admin, tables, forms | Almost never. Their moments come from the product: a chart drawn with care, figures set well, real photos or avatars, a status that feels alive |
| Deck or report | Real screenshots in device frames, or a chart; never stock |

A physical thing the product deals with (a payment card, a receipt, a ticket, a parcel) is usually better built in code with real materials: a soft tonal gradient inside one hue, a chip, an embossed number, a paper edge. It stays sharp, themable and honest.

## 2. The order of preference

1. **The product itself.** A coded preview of the one moment that proves the headline: a scheduler shows one week with a booked slot; a code review tool shows one diff with one comment; a habit app shows one streak card. Use the project's own components, or careful HTML in the new palette, with plausible data. Frame it as a window or a device only if that helps it read.
2. **Assets the client owns:** product photography, screenshots, team and place photos.
3. **A generated image** from the world (section 4), when a tool is available.
4. **Real pictures from open collections** (Openverse, Wikimedia Commons, museum open-access programs, Unsplash) with the license respected and the credit recorded. A found picture is never presented as the client's own.
5. **Type and color alone.** A confident typographic hero is better than a generic picture.

One visual where it helps, usually only in the hero. A visual on every section is a tell.

## 3. Write the scene as one sentence

Before generating or searching, write the scene from the direction's world and character. If you cannot say it in one sentence, it is not clear yet. Examples of the shape (write your own):

- A bike courier app: "a single delivery bag resting on wet cobblestones at dusk, one window lit above".
- A tax tool for freelancers: "a neat stack of receipts held by a brass clip on a pale wooden desk in morning light".
- A seed bank: "one paper envelope of seeds half open on a linen cloth, a few seeds spilled toward the light".

Then pick one style that fits the character and keep it for the whole page.

| Style | Fits |
|---|---|
| Painted background art: a calm sky or landscape with one subject, crisp clouds, soft light, open sky for text | Warm, hopeful, human products |
| Cinematic photo of one object in simple, dramatic light on a plain field | Calm, serious, trustworthy products |
| Soft stylized 3D: one small scene or object, matte materials, gentle light | Playful and friendly products |
| Product object render: a real-looking object from the product, studio lit, true materials | Anything that touches the physical world |
| Light and optics: one physical phenomenon on a dark field | Technical and data products |
| Engraving or print: one ink on a soft tinted paper | Heritage, craft, editorial voices, only when the whole brand (type, palette, logo) lives in it |
| Code treatment over an image (section 7) | When the image should be made of the product's own material |

Styles that fail:
- Prompted film grain or paper texture: models bake in a fine checker pattern. Add texture in code instead.
- A print or engraving filter on one image while the rest is a plain modern UI. It reads as a filter.
- Several subjects or a collage. The idea stops reading within a second.
- Purple and blue glossy abstractions of any kind; neon circuits; glowing brains; robots; rockets; crystal shapes; liquid chrome. Unless the product is literally about them.

## 4. Generating

Look for an image tool among the tools you have: an MCP server or CLI for fal, Replicate, OpenAI images, Google Imagen or a design tool.

**With a tool:**
1. Write the prompt with the recipe below. Show the user the prompt, the model and the size, and ask before running: generation costs money.
2. Start it right after the direction is confirmed and keep working on the early passes while it runs.
3. Run once. Judge the result against the one-sentence scene and the palette. If it misses, change the prompt; do not reroll the same one hoping for luck.
4. Save the file into the project's assets (not a temporary URL), at twice the display size, as WebP or AVIF.

**Without a tool:**
1. Say so before the visuals pass and offer to connect one.
2. If the user skips it, build what you can in code, and leave an **empty slot** for the rest: a plain surface step of the exact size, with the layout's radius and no text inside, so nothing unfinished can ship by accident.
3. Put the prompt in the report (not on the page), with the kind of service that can generate it and the file name to save it under.

### Prompt recipe

1. **Subject:** the one sentence, concrete and physical.
2. **Setting:** where it is, kept simple.
3. **Light and palette:** matched to the page. Name the page background color so the edges can blend, and the direction of the light.
4. **Style:** one clear direction from the table above.
5. **Composition:** where the subject sits so text has room ("subject on the right third, calm empty sky on the left half"). For a scene behind a whole hero, ask for 16:9 or wider and keep the lower fifth calm too, because the product view rises over it.
6. **Exclusions:** no text, no letters, no logos, no user interface, no watermark, no people unless the scene needs them.
7. **Format:** the aspect ratio of the slot, at twice the display size.

Example: "A neat stack of paper receipts held by a brass binder clip on a pale ash wood desk. Soft morning light from the upper left, warm off-white background #f7f4ee so the edges can fade into the page. Cinematic still-life photograph, shallow depth of field. Subject in the right third, calm empty desk surface on the left half. No text, no letters, no logos, no user interface, no watermark. 16:9, 2880x1620."

## 5. Objects for moments

Single objects placed into the interface make a coded preview feel real: a payment card, a phone, a parcel, a coffee cup, a notebook from the world.

- Prompt: "one object, studio lit, on a plain background in exactly the page color, soft contact shadow, nothing else in frame", plus the angle the layout needs ("tilted 15 degrees, seen slightly from above").
- Cut it out with the tool's background removal, or blend it into the page color with a mask.
- Background removal deletes dark areas close to the background (a switched-off black phone screen). Ask for the screen in a contrasting flat color, or rebuild the alpha from the outer edge.
- Place it overlapping the edge of a card or window, slightly rotated, with a soft shadow in the ramp's darkest color, so it sits in the same space as the UI.
- Real UI on a generated device: generate the device straight on, measure the screen rectangle, lay real HTML over it and rotate both together. The text stays sharp and true.
- One story per visual: if the list shows invoice 0142 for Studio Aurora, the phone shows the same client, number and amount.

## 6. Placement

- Export WebP or AVIF at twice the display size. Give every image a real `alt` that says what it shows (or `alt=""` when it is purely decorative).
- Match image edges to the page. Otherwise fade them: `mask-image: radial-gradient(closest-side, #000 70%, transparent)` or a linear gradient overlay in the page color. A hard rectangle of a different black on a dark page is a tell.
- Text over an image only on a calm area, with a neutral scrim (black or ink at 30 to 55%) if contrast needs it. Check the contrast on the actual pixels.
- The hero image loads with high priority and explicit dimensions (`width`, `height` or `aspect-ratio`) so nothing jumps. Everything below the fold is lazy.
- Static, or one slow, subtle motion that fits the subject (clouds drifting a few pixels, steam). No parallax. Respect reduced motion.
- Same crop ratios and the same treatment for pictures that sit together.
- Never bake text, buttons or a logo into an image. Real text lives in the page.

## 7. Real screenshots in device frames

For landing pages, decks and case studies, a real screenshot beats any illustration. Never draw a fake screen.

**Capture**
- Phone: 390x844 viewport at device scale factor 3, with `isMobile`, `hasTouch` and an iPhone Safari user agent. Many sites serve the desktop layout to a narrow window without that user agent.
- Desktop: 1440x900 at device scale factor 2.
- A fresh browser context per capture. Load, wait for network idle, wait for fonts, wait about a second more.
- Dismiss cookie banners and notification prompts by clicking the button whose accessible name matches ("Accept", "Got it", "Not now", in the site's language), then wait half a second. Re-run after every navigation.
- Drive the exact state the slide or section claims: the filter applied, the panel open, the list scrolled to the right section. A screenshot that shows the home page under a claim about filters is wrong evidence.
- `scripts/shoot.mjs` does the viewport, user agent, theme and banner dismissal for you.

**Frame**
- `assets/phone-frame.html?img=shot.png&sb=ffffff&fg=111111` puts a phone screenshot into a generic modern phone. Sample `sb` from the top pixels of the screenshot so the status bar matches the page; use `fg=ffffff` on dark pages.
- `assets/browser-frame.html?img=shot.png&url=example.com&theme=light` puts a desktop screenshot into a neutral browser window.
- Render either to a transparent PNG with headless Chrome; the exact commands are in the comment at the top of each file.
- Both crop from the top (`object-fit: cover`), so any capture height works.
- In a layout, let a frame run off an edge (a phone cropped at the bottom of a slide, a browser rising from the bottom of a hero) rather than floating small in the middle.

## 8. Code effects

Optional, only on the main visual, only when they fit the character. Never as decoration on other elements.

| Effect | What it is | Fits |
|---|---|---|
| **Glyphs** | The image redrawn as a grid of characters; brightness picks the character. Best when the characters come from the product's material: money `. : 1 7 4 0 8 $ %`; code `. : / { } < > = #`; music note names; data `. · : | + ▪`; writing: letters of a word from the product | Technical, financial, literary products |
| **Halftone** | Circles of radius `brightness * cell / 2` in one ink on the page color | Editorial, print, crafted |
| **Dither** | Ordered or error-diffusion dithering into two or three ramp colors, done once on load | Retro, technical, playful |
| **Duotone** | Brightness mapped onto two colors (the darkest surface and the accent or text color). The simplest way to make any picture belong to the palette. CSS: a greyscale image under a `mix-blend-mode: color` layer, or an SVG `feColorMatrix` filter | Any, used once |

Performance rules: read pixels once on load (never `getImageData` in a loop); prepare glyph atlases ahead; redraw at 8 to 12 steps per second, changing only a small share of cells per step; pause when off screen; size the canvas for `devicePixelRatio` capped at 2; under reduced motion, draw once and stop.

```js
// Draws `img` into `canvas` as glyphs. Returns a stop() function.
export function glyphs(canvas, img, { cell = 8, chars = ' .:17408$%', font = 'ui-monospace, monospace', ink = null, fps = 10, share = 0.03 } = {}) {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const W = canvas.clientWidth, H = canvas.clientHeight;
  canvas.width = W * dpr; canvas.height = H * dpr;
  const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);
  const cols = Math.floor(W / cell), rows = Math.floor(H / cell);

  // Sample the image once.
  const probe = new OffscreenCanvas(cols, rows).getContext('2d', { willReadFrequently: true });
  probe.drawImage(img, 0, 0, cols, rows);
  const px = probe.getImageData(0, 0, cols, rows).data;
  const cells = [];
  for (let i = 0; i < cols * rows; i++) {
    const r = px[i * 4], g = px[i * 4 + 1], b = px[i * 4 + 2];
    const light = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    cells.push({ x: (i % cols) * cell, y: Math.floor(i / cols) * cell, light, color: ink || `rgb(${r},${g},${b})`, jitter: 0 });
  }

  ctx.font = `500 ${cell + 1}px ${font}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const draw = (c) => {
    ctx.clearRect(c.x, c.y, cell, cell);
    if (c.light < 0.06) return;
    const i = Math.min(chars.length - 1, Math.floor(c.light * chars.length) + c.jitter);
    ctx.fillStyle = c.color; ctx.fillText(chars[i], c.x + cell / 2, c.y + cell / 2);
  };
  cells.forEach(draw);

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  let visible = true, last = 0, raf = 0;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  io.observe(canvas);
  const tick = (t) => {
    raf = requestAnimationFrame(tick);
    if (!visible || t - last < 1000 / fps) return;
    last = t;
    for (let n = 0; n < cells.length * share; n++) {
      const c = cells[(Math.random() * cells.length) | 0];
      c.jitter = c.jitter ? 0 : 1; draw(c);
    }
  };
  raf = requestAnimationFrame(tick);
  return () => { cancelAnimationFrame(raf); io.disconnect(); };
}
```

For very large canvases, pre-render each tinted glyph once into an atlas canvas and copy with `drawImage` instead of `fillText`.

## Checklist

- [ ] Filler removed; every remaining visual says something true about the product.
- [ ] Apps and dashboards use the product itself, not generated art.
- [ ] Scene written as one sentence; one style for the whole page.
- [ ] Generation confirmed with the user, run once, saved to assets; or an empty slot plus a prompt in the report.
- [ ] Edges blended into the page; alt text written; dimensions fixed; no parallax.
- [ ] Screenshots are real, in the right state, framed with the asset files.
- [ ] Effects only on the main visual, with the performance rules.

*Adapts material from unslop by Damir Sokolovsky (CC BY 4.0) and taste-skill by Leon Lin (MIT). See NOTICE.md.*
