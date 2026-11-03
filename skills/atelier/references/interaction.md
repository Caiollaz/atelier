# Interaction

Read this when you build or review how a UI responds to people: press, touch, forms, feedback, states and the accessibility floor. Easing curves and durations live in `motion.md`; this file points there instead of repeating them.

## Principles behind every rule

Four human needs sit under every rule here: safety and predictability, understanding, achievement, joy. When two rules collide, pick the one that serves the earlier need.

| Principle | What it means in practice |
|---|---|
| Purpose | Every feature costs time, attention and trust. Cut what does not earn that cost. |
| Agency | People drive. Confirm meaningful actions, expose ongoing status, never trap them in a flow. |
| Responsibility | Ask for permissions at the moment they are needed and only for what is needed. Anticipate misuse, especially with AI features: add previews, confirmations and disclaimers. Cut a feature whose risk outweighs its value. |
| Familiarity | Things that look the same behave the same and live in the same place. Use metaphors that are neither too literal nor too abstract (a trash can means delete) and honour their physics. Break a familiar pattern only when you can show it is better, and test it. |
| Flexibility | A phone means quick touch; a desktop means deep workflows with a precise pointer. Design for age, language, expertise and ability. Let people rearrange or hide controls when no single layout fits everyone. |
| Simplicity, not minimalism | Make the most important thing the most obvious through order, spacing and contrast. Show the common path first and put advanced options one level deeper. Adding context sometimes simplifies (a scrubber that shows time remaining). Burying everything in one menu looks minimal and is not simple. |
| Craft | Every spacing, timing and alignment value is a choice you can defend. Jittery scroll, misaligned icons and layouts that break on rotation read as carelessness. Colours adapt to light and dark. |
| Delight | Decide the emotion (calm, confident, excited) and reinforce it in every decision, not with a sprinkle of effects at the end. |

Good defaults matter more than options: most people never open settings, so ship it right out of the box. Handle edge cases invisibly (pause a toast timer while the tab is hidden, keep hover alive across the gap between stacked items, capture the pointer during a drag). Nobody notices these, which is the point.

## Direct manipulation and latency

| Rule | Why | Value or fix |
|---|---|---|
| Respond on pointer-down, not on release | Feedback on release reads as lag even at 0ms | Style `:active`; listen to `pointerdown` for the pressed state, not `click` |
| Audit every delay on the input path | Directness falls off a cliff the moment lag appears | Remove debounces on presses, artificial timers, waits for a transition to end, and the legacy 300ms tap delay |
| Track drags, sliders and drawers 1:1 | Feedback only at the end breaks the illusion of holding the thing | Update position every frame from pointer events |
| Respect the grab offset | Snapping the element's centre to the finger reads as a jump | Store `clientY - rect.top` on grab; call `setPointerCapture(e.pointerId)` |
| Never lock input during a transition | People act faster than your animation | Make it interruptible; animate from the current rendered value, never from the target |
| Tap: highlight on down, commit on up | Lets people cancel by sliding away | About 10px of hysteresis or hit padding; dragging out and back in re-arms the tap |
| Drag: commit to an axis late | Avoids misreading intent | Wait for about 10px of movement, then track 1:1 |
| Recognise gestures in parallel | Final-state recognisers like `swipeleft` throw away continuous tracking | Watch all plausible gestures from the first move, cancel the losers |
| Pay the double-tap delay only where double-tap exists | It delays every single tap on that element | Remove double-tap handlers you do not need |
| Decide commit vs revert by velocity sign at release | A flick should win over a slow drag past the midpoint | Dismiss when velocity is above about 0.11 px/ms regardless of distance |
| Soften boundaries | A hard stop reads as frozen | Rubber-band or add friction past the edge |
| Ignore extra touch points once a drag starts | Switching fingers makes the element jump | Track one `pointerId` |
| Feedback fires on the causal event, in harmony, at meaningful moments | Over-feedback trains people to ignore all of it | Visual, sound and haptic on the same frame; only when something actually happened |

Perceived speed counts as speed: a faster spinner makes the wait feel shorter, and a 180ms select feels faster than a 400ms one. Keep UI motion short (see `motion.md`) and never block input to finish an animation.

## Feedback

Every action responds within 1 second: a button state, a toast, an updated row. If real work takes longer, show progress right away and the result when it lands.

| Kind | When | Form |
|---|---|---|
| Status | Something is ongoing (sync, upload, processing) | Inline indicator near the thing, or a progress bar for known length |
| Completion | A meaningful action finished | Updated content first; a toast only when the result is off-screen. Keep the verb: "Publish" leads to "Published" |
| Warning | A problem is coming (quota near, unsaved changes) | Shown before the problem, next to what it concerns |
| Error | Something failed | Next to the cause, in plain words, with a way out (see States) |

- Validate inline, as people go, not only on submit.
- Prefer undo to confirmation. Use a confirmation dialog only for destructive, irreversible actions; overused confirms train people to click through.
- A loading toast that becomes success or error is one toast updated in place, not three stacked.
- Tooltips: delay the first one, then open neighbours instantly with no animation while the pointer moves across a toolbar.

## Wayfinding

Every screen answers four questions. If one has no answer, fix the screen before polishing it.

1. Where am I? Title or active nav item names the place.
2. Where can I go? Navigation and next actions are visible, not hidden behind hover.
3. What is here? Content, or an empty state that says what would be here.
4. How do I get out? Back, close or cancel is always reachable, in the same place as on sibling screens.

Name nav items for their contents ("Invoices", "Library"), not vague umbrellas ("Home") that could hold anything. Put a control near what it changes and arrange controls to mirror what they affect; if a control needs a label to explain its mapping, the mapping is weak. Keep the same name, icon and position for an action across sibling screens.

## Materials and translucency

Blur is earned, not decorative. Use it only when content really scrolls under floating chrome (nav bars, toolbars, sheets) and you have a depth system to put it in. Glass with no depth system behind it is a tell.

| Rule | Why | Value or fix |
|---|---|---|
| Translucent chrome over scrolling content | Structure without stealing focus | `background: rgb(255 255 255 / 0.6); backdrop-filter: blur(20px) saturate(180%)` |
| Bigger surfaces read thicker | Depth matches size | Stronger blur and deeper shadow on a sheet than on a chip; keep blur at 20px or under |
| Heavier material for structure, lighter for interactive | Hierarchy without extra chrome | Sidebars darker or denser than buttons |
| Never stack light glass on light glass | Legibility collapses | Put one of them on a solid or darker layer |
| Colour goes on a solid layer | Tinted glass shifts with what is behind it | Keep brand colour off the translucent foreground |
| Vibrancy text | Flat grey dies over a moving background | Higher contrast, one weight step heavier, a small tracking bump |
| Edge, not divider, under sticky headers | A 1px line is cruder than an edge effect | Small blur or gradient mask, only where content actually overlaps |
| Light catching the edge | Reads as material | `border-top: 1px solid rgb(255 255 255 / 0.4)` on light glass |
| Dim to focus | Separates interrupting from parallel work | Modal task: scrim and push the background back. Parallel panel: translucency and offset, no scrim |
| `prefers-reduced-transparency: reduce` | Some people cannot read through blur | Raise background opacity to near solid, `backdrop-filter: none` |
| `prefers-contrast: more` | Same | Near-solid backgrounds with a defined, contrasting border |

## Typography in interactive UI

Font choice and the type scale live in `tokens.md`. These details are about how text behaves on screen.

| Rule | Why | Value |
|---|---|---|
| Tracking depends on size | One fixed `letter-spacing` is wrong somewhere | Large display about `-0.02em`; body `0`; small text slightly positive |
| Leading runs inverse to size | Comfort at each size | Display about 1.05, body about 1.5; looser for tall scripts, tighter for dense data UI |
| Tabular numbers on anything that changes or lines up | Proportional digits jitter and misalign | `font-variant-numeric: tabular-nums` |
| Cap the measure | Long lines lose the eye on the return | `max-width: 65ch` on body text |
| Spacing in `rem`/`em` | Larger text settings must not break the layout | Respect the user's text size |
| Do not clip tall scripts | Vietnamese and Thai marks get cut | Avoid tight `line-height` with `overflow: hidden` on text |

## Touch and mobile web

Fix with CSS or a meta tag first. Almost every item is one declaration, and none needs a `useIsTouchDevice()` hook. Apply each fix only where its reason applies: `user-select: none` is correct on a button and a defect on body text.

| Rule | Why | Value or fix |
|---|---|---|
| Gate every `:hover` | On touch, hover sticks after a tap. `pointer: fine` excludes styluses and devices that falsely claim hover | `@media (hover: hover) and (pointer: fine) { ... }` |
| Tailwind: v4 `hover:` compiles to `(hover: hover)` only | Half the gate | Add `(pointer: fine)` yourself where it matters (custom variant). Tailwind v3: set `future.hoverOnlyWhenSupported: true` |
| Touch still gets press feedback | Hover is gone | `:active` on every pressable, scale 0.97, 100 to 160ms |
| Kill the tap flash once | The grey or blue box is the loudest "this is a website" signal | `html { -webkit-tap-highlight-color: transparent }`, then an `:active` on every tappable |
| Remove tap delay where it lingers | Some elements still wait 300ms on iOS Safari | `touch-action: manipulation` on buttons, links, `[role=button]` |
| Use the right viewport unit | `100vh` is the largest viewport and hides under the URL bar | `100dvh` for app shells, drawers and bottom-pinned UI; `100svh` for heroes; avoid `100vh` and `lvh` |
| Inputs at 16px or more | iOS zooms the page below 16px and does not zoom back | `font-size: 16px` on input, textarea, select (or only under `(pointer: coarse)`) |
| Ask for the right keyboard | The return key should say what it does | `inputmode="numeric"` for codes, `"decimal"` for amounts; `type="email"`/`"tel"`; `autocapitalize="none"` and `autocorrect="off"` on usernames and codes; `enterkeyhint="send"`, `"search"` or `"done"` |
| Name the axis the browser keeps | Otherwise the page jitters between gesture and scroll | `touch-action: pan-y` on a horizontal carousel, `pan-x` on a vertical sheet handle, `none` only on a surface that owns every axis |
| Stop pull-to-refresh and scroll chaining | Accidental reloads, background scroll | `overscroll-behavior: none` on `html, body`; `contain` on inner scrollers. Never a `touchmove` listener with `preventDefault()` |
| Paint edge to edge, pad content | Notches and home indicators cover controls | `viewport-fit=cover`, then `padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px))` on fixed bars, toasts and sheets. Without the meta, every `env()` is 0 |
| No text selection on controls | Long-press should not select a button label | `user-select: none; -webkit-user-select: none; -webkit-touch-callout: none` on controls only. Never on `body`: people copy addresses, errors and order numbers |
| One `theme-color` per scheme | A single value gives light mode a dark bar or dark mode a white one | Match the colour at the very top of the page (header background, not brand). If theme switches by class, update the tag from JS on toggle |
| PWA colours agree | Same decision in three places | `theme-color`, manifest `theme_color`/`background_color`, `apple-mobile-web-app-status-bar-style` |
| Native-scroll carousels | Browser physics beat a hand-rolled spring | `scroll-snap-type: x mandatory` on the track, `scroll-snap-align: start` on items |
| Keyboard resizes the layout on Android | Matches iOS behaviour | `interactive-widget=resizes-content` in the viewport meta |
| Capability queries, not sniffing | iPads have trackpads, laptops have touchscreens | `(hover)`, `(pointer)`, `(any-pointer)`; never user agent, `ontouchstart` or `max-width` as a touch test |
| Hover-only actions are unreachable on touch | A menu revealed only on hover never appears | Keep the action visible, or reachable by tap and keyboard |

Test on real hardware. Sticky hover, tap delay, rubber-banding, safe areas and the keyboard do not reproduce in desktop emulation.

1. Run the dev server on `0.0.0.0` and open it on the phone by LAN IP.
2. Inspect with Safari Develop menu (iOS) or `chrome://inspect` (Android).
3. Try an older phone, with the keyboard open, and once in landscape.
4. If the product installs as a PWA, test standalone mode: viewport, safe areas and status bar change there.

## Baseline to ship before the first component

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content">
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0a">
```

```css
html {
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  overscroll-behavior: none;
}
input, textarea, select { font-size: 16px; }
button, a, [role="button"] { touch-action: manipulation; }
button, [role="button"] { user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; }
```

Replace the two `theme-color` values with the page's actual top colour in each scheme. Drop `overscroll-behavior: none` on document-style pages where pull-to-refresh is welcome. Every `:hover` rule written after this lives inside the capability query.

## Forms

| Rule | Why | Value or fix |
|---|---|---|
| Validate when the field loses focus | Errors while typing are noise; errors only on submit come too late | `blur` validation; re-validate on input once a field has shown an error, so it clears as soon as it is fixed |
| Error next to the field | People should not hunt for what failed | Message under the field, linked with `aria-describedby`, field marked `aria-invalid="true"` |
| Disable the submit while submitting | Prevents double submits | Button shows a spinner inside it and keeps its width |
| Enter submits | Expected on every form | Use a real `<form>` with a submit button; no click-only handlers |
| Every field has a visible label | Placeholders vanish on input | `<label for>` or wrapping label; placeholder only for an example value |
| The button says what happens | "Submit" says nothing | "Save changes", "Send invite" |
| Keep input on failure | Retyping is punishment | Never clear the form on a server error |
| Focus the first invalid field on submit | Keyboard and screen-reader users land on the problem | Move focus, scroll it into view |

## States

Every screen has at least five: loading, empty, error, partial and ready. Design all of them, not just ready.

| State | Rule | Value or fix |
|---|---|---|
| Loading | Skeleton matches the final layout, on the screen's own grid and columns | Same row heights and column widths, so nothing jumps when data lands. A spinner only inside a button |
| Empty | Say what happened and what to do next | "No invoices yet. Create one or import from CSV." plus the action. Not a bare "No results" |
| No results (filtered) | Different from empty | Name the filter that excluded everything and offer to clear it |
| Error | Plain words, never an apology, never vague, always a way out | "Couldn't save. Check your connection and try again." with Retry. Never a raw `TypeError` |
| Inline row warning | Density matters in tables | An icon with a tooltip in the row, not a paragraph |
| Partial | Rows with missing fields still align | Omit the missing line or reserve its height; no orphaned dash |
| No permission | Same layout as with permission | Disabled actions keep their slot, with the reason on hover or focus |
| Success | Feedback within 1s | Updated content, button state or a toast |

An empty screen is an invitation to act, and a failure is a moment for direction: say what went wrong and how to fix it, in the product's own voice.

## Accessibility floor

Build this in without announcing it. It is the floor, not a feature.

| Rule | Why | Value |
|---|---|---|
| Text contrast | Legibility | Body text at least 4.5:1. Large text and UI glyphs at least 3:1. Muted text is for meta and captions only and still reaches 4.5:1 on the surface it sits on |
| Visible focus ring | Keyboard users need to see where they are | `:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px }`; never `outline: none` without a replacement |
| Touch targets | Fingers are not cursors | At least 44 by 44px hit area; pad small icons out to it |
| Labels tied to fields | Screen readers announce the label | `<label for>` or `aria-labelledby` |
| Icon-only buttons have a name | An unnamed button reads as "button" | `aria-label="Close"`; decorative icons get `aria-hidden="true"` |
| Current location is announced | Wayfinding for screen readers | `aria-current="page"` on the active nav item |
| Zoom is never disabled | `user-scalable=no` and `maximum-scale=1` are accessibility failures | Fix the cause (16px inputs) instead |
| Survives 200% zoom | Text grows, fixed boxes do not | Test at 200% browser zoom or a raised root font size |
| Survives RTL | Icons, chevrons, padding and trailing actions flip | Test with `dir="rtl"` on a wrapper; use `dir="auto"` on user names; prefer logical properties (`margin-inline-start`) |
| Truncated text can be read | An ellipsis alone hides data | `title` or tooltip, and the full value in a detail view |
| Reduced motion | Motion sickness | Fewer and gentler, not zero: keep opacity and colour changes, remove movement, overshoot and parallax, replace slides with short cross-fades |
| Reduced transparency and more contrast | Three independent signals | Honour `prefers-reduced-transparency` and `prefers-contrast` as in Materials |
| Vestibular comfort | Large motion and flashes make people ill | No full-viewport moving backgrounds, no slow loops near one cycle per 5 seconds, no abrupt dark-to-light jumps; ease theme changes |
| Keyboard reaches everything | Not everyone has a pointer | Tab order follows reading order; menus and dialogs trap and restore focus |

## Checklist

- [ ] Pressables respond on pointer-down with `:active` scale 0.97; no debounce or timer on the input path.
- [ ] Drags track 1:1, keep the grab offset, decide by release velocity and are interruptible.
- [ ] Every action gives feedback within 1s; long work shows status at once.
- [ ] Confirmation only for destructive, irreversible actions; undo everywhere else.
- [ ] Each screen answers where am I, where can I go, what is here, how do I get out.
- [ ] Blur only over real scrolling content, at 20px or less, with reduced-transparency and more-contrast fallbacks.
- [ ] Tracking varies by size; numbers are tabular; body measure is capped at 65ch.
- [ ] All `:hover` inside `(hover: hover) and (pointer: fine)`; Tailwind version handled.
- [ ] Baseline shipped: viewport meta with `viewport-fit=cover`, two `theme-color` tags, tap highlight, text-size-adjust, overscroll, 16px inputs.
- [ ] `dvh`/`svh` instead of `100vh`; `inputmode` and `enterkeyhint` set; `touch-action` names the kept axis.
- [ ] Safe-area padding on fixed bars, toasts and sheets; `user-select: none` on controls only.
- [ ] Forms validate on blur, show errors beside the field, disable submit while sending, submit on Enter.
- [ ] Loading skeleton matches the layout; spinner only inside buttons; empty and error states say what to do next.
- [ ] Contrast 4.5:1 body and muted, 3:1 large text and glyphs; visible focus; 44px targets; named icon buttons.
- [ ] Zoom enabled; works at 200% zoom, in RTL, with reduced motion, transparency and contrast.
- [ ] Checked on a real phone, or the report says it was not.

*Adapts material from Emil Kowalski's skills (MIT) and frontend-design by Anthropic (Apache 2.0). See NOTICE.md.*
