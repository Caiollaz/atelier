# Motion principles

Read this when motion has to carry character: a brand moment, an illustration, a multi-element sequence, a Lottie. `motion.md` decides whether something animates and with which curve. This file decides what it should feel like. Durations and easings in `motion.md` and the motion tokens in `tokens.md` still win.

## 1. Before any keyframe

Answer in one line each. If an answer is empty, the motion has no reason yet.

| Question | Decides |
|---|---|
| What should the viewer feel? | Amplitude, path, how long it takes |
| What is the small story? | Setup, action, resolution. Something starts somewhere and ends somewhere for a reason |
| What is the hero element? | What moves first and furthest. Everything else supports it |
| What is the least that says this? | One property is direct, two are polished, three are usually too many |

## 2. Pick one character per product

Choose one and keep it across the product. Write it in `DESIGN.md`. It tunes distance and bounce inside the durations of `motion.md`; it does not replace them.

| Character | Distance | Bounce | Fits |
|---|---|---|---|
| Exact | Small, 4 to 8px | 0 | Tools, dashboards, finance, regulated |
| Calm | Small to medium, long arcs | 0 | Editorial, health, premium services |
| Energetic | Medium, straight paths | 0, ending sharply | Sports, launches, developer tools with attitude |
| Playful | Medium, arcs | Up to 0.2, only on gestures or illustrations | Consumer, kids, games |

Define three constants: one signature curve for most movement, three durations (quick, standard, slow), and one entrance pattern. A product with one entrance pattern reads as designed. Four patterns read as a demo.

## 3. Reading motion as meaning

| Intent | Path and energy | Property |
|---|---|---|
| Arrive or leave | Decelerate into place | Position with opacity |
| Draw attention once | One short pulse, then stop | Scale or color |
| Change state | Shortest possible | Opacity or color, with scale on press |
| Show direction or flow | Along the direction of the content | Position |
| Success | Short, resolved | Check drawn with `stroke-dashoffset`, then color |
| Error | Firm, no bounce | Two or three oscillations of 4 to 8px, 300 to 400ms, plus the message in text |
| Calm | Long curves, slow | Opacity, slow position |
| Urgency | Straight, fast | Position |

Curved paths read as friendly, angular ones as tense, horizontal as progress, vertical as weight. Heavy things move slower and settle with no overshoot; light things respond first. A modal should never feel lighter than a tooltip.

## 4. Choreography

| Rule | Value |
|---|---|
| Lead with the hero | It enters first or travels furthest |
| One direction | Elements in a group enter from the same side |
| Distance scales time | 200px takes about 1.3x the time of 100px, 400px about 1.6x, inside the ranges of `motion.md` |
| One third, in space | Nothing crosses more than a third of the screen without a change of pace or a pause |
| One third, in attention | With three or more elements, at most a third are moving at once |
| Stagger | 30 to 80ms per item, at most 6 items, total under 500ms |
| Follow through | A shadow, caption or inner content may land 50 to 100ms after its parent |
| Counter motion | In a Showcase scene, background layers may drift opposite the hero at 20 to 30% of its speed |

Treat "secondary" and "ambient" layers as options for brand moments and Showcase scenes. In product UI a missing ambient layer is correct.

## 5. Animation principles that survive in UI

The classic principles are for characters. Most need a limit on screens.

| Principle | Use | Limit |
|---|---|---|
| Anticipation | A small move before a big one: a card lifting before it flies, a press before a release | Illustrations and brand moments. Never delays a response to input |
| Squash and stretch | Elastic objects in illustrations and mascots | Never on text, buttons or cards |
| Follow through, overlap | Parts settle at different times | Keep it under 100ms in UI |
| Slow in, slow out | Always | Through the easing tokens |
| Arcs | Natural travel in illustration | Straight paths are fine in UI |
| Staging | Dim or still everything except the subject | One subject at a time |
| Exaggeration | Illustration, onboarding, an empty state, a celebration | Rare moments only, never in repeated actions |

## 6. Lottie and vector animation

| Rule | Why | Value or fix |
|---|---|---|
| Use it for illustration people watch, not for controls | A button that plays a file cannot respond mid-gesture | Empty states, onboarding, success, brand marks |
| Prefer `.lottie` (dotLottie) over raw JSON | Much smaller, and it bundles assets | Aim for under 100 KB per file |
| Avoid heavy effects when exporting | Mattes, blurs and masks are the expensive parts | Shape layers and transforms |
| Render at display size | Oversized canvases cost GPU for nothing | Set explicit width and height |
| Pause offscreen and in hidden tabs | Loops keep drawing otherwise | IntersectionObserver |
| Reduced motion | The file must still say the same thing | Show a chosen static frame, usually the last |
| Match the system | A generic stock animation is a tell | Recolor to the palette; one illustration style per product |

For simple icon transitions, skip Lottie: inline SVG with CSS transitions is lighter and interruptible.

## 7. Judge it properly

- Slow it down. Play at 4x slower (DevTools animation panel, or `document.getAnimations().forEach(a => a.playbackRate = 0.25)`). Colors crossing at the wrong moment and elements not moving together only show up slow.
- Step frame by frame through the first 100ms. Most of the feel is there.
- Try it on a real phone. Gestures and 60Hz screens feel different from a trackpad on a 120Hz laptop.
- Look at it again the next day. Motion that felt fine at the end of a session is often too long.

| Symptom | Likely cause | Fix |
|---|---|---|
| Robotic | Linear easing, or everything moving together | Ease tokens, a short stagger |
| Slow | Duration past the range, or a long delay | Back into the range; delay under 100ms |
| Cheap | Several small effects instead of one considered one | Remove all but the best one |
| Distracting | Too much moving at once | One third rule, shorter distance |
| No personality | Every element uses a different pattern | One signature curve and one entrance |

## 8. A living mascot

When a product has a character, people want it to notice them. What made one feel alive without costing the app:

- Behaviours: the eyes follow the pointer across the whole page (on phones, they go to the last touch, and with no input the character looks around now and then); blinks at random intervals, sometimes twice; slow breathing; a reaction to a tap (a hop with happy eyes, varied on repeated taps); sleepy after about 30 seconds without input, awake on the next one. No sound, no new copy.
- Animate little. Rasterize the heavy layers (filters, textures, blurs) to images from the same vector and keep only the eyes as live SVG on top, in the same viewBox. At rest it must match the static art; compare the two captures.
- One shared passive pointer listener and one `requestAnimationFrame` for every instance on the page. The loop stops when its springs settle; transforms are written through refs, never component state (zero renders while the pointer moves); everything pauses on `visibilitychange`.
- React on `click`, not `pointerdown`, so the start of a scroll over it is not a tap. The wrapper is `pointer-events: none` except for the body's hit area, decorative (`aria-hidden`), and never covers a control.
- Reduced motion: no breathing, hop or looking around; following the pointer may stay.
- Where it lives: inside the product (the home header, empty states), not on the screen people operate with one hand. Public pages keep the still image, and it appears once per screen.

## Checklist

- [ ] It passed the gate in `motion.md`, and the feeling and hero are named.
- [ ] One character, written in `DESIGN.md`.
- [ ] Durations, easing and bounce inside `motion.md`.
- [ ] Nothing important is conveyed only by motion; reduced motion shows the same content.
- [ ] Watched at quarter speed and on a phone, or marked as not checked.

*Adapts material from LottieFiles' motion-design skill (MIT) and Emil Kowalski's skills (MIT). See NOTICE.md.*
