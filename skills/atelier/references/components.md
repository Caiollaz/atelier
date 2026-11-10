# Components

Read this when you build or fix a component: buttons, inputs, menus, dialogs, toasts, sheets, tables, cards, navigation, badges, avatars, charts, command menus. Values come from `tokens.md`; motion from `motion.md`; touch and form behavior from `interaction.md`.

**Use what the project has first.** Find the existing button, modal, table and skeleton before writing a new one. A second button component is a design-system fork. When nothing exists, reach for an accessible primitive library before hand-rolling focus management.

## Buttons

- Hierarchy: one primary per view; secondary for the alternatives; ghost for tertiary and toolbar actions; destructive only for actions that destroy.
- Size from content: padding plus `min-width`, never a fixed `width` (translated labels overflow).
- Heights from the tokens (32 to 36 in toolbars, 40 to 44 in forms, 44 to 48 for hero actions); touch targets at least 44 even when the visual is smaller (pad the hit area).
- States, all inside the palette: rest, hover (gated to real pointers), active (`scale(0.97)` with a 100 to 160ms ease-out), focus-visible ring, disabled (lower contrast, `cursor: not-allowed`, still readable), loading (indicator plus the original label, width does not jump).
- Icons: optional, leading for actions, trailing only for direction or menus; the same size as the cap height or slightly larger.
- Never a gradient, glow or colored shadow. A soft top highlight on dark buttons is enough.
- Keep submit enabled until submission starts, then disable it during the request.

## Inputs and selects

- Real `<label>` tied to the control; clicking it focuses the field. Placeholder is an example, not the label.
- 40 to 44 tall, 16px text on phones, radius matching buttons, a border that reaches 3:1 against its surface (or a filled raised surface).
- Focus: a visible ring, not only a color change of the border.
- Error: border and message in the negative color, an icon, the message next to the field; focus the first error on submit.
- Correct `type`, `inputmode`, `autocomplete`, `enterkeyhint`; spellcheck off for codes, emails and usernames. Never block paste.
- Native `<select>` is fine and accessible; set explicit background and text colors so dark mode on Windows stays readable. Custom selects use an accessible primitive.
- Search fields: "Search" as the placeholder, a clear button when filled, results that update without losing focus, a keyboard shortcut shown as keycaps.

## Menus, popovers and tooltips

- Grow from the trigger: `transform-origin` at the trigger side (primitive libraries expose it, for example `var(--transform-origin)` in Base UI or `var(--radix-popover-content-transform-origin)` in Radix). Modals are the exception and stay centered.
- Enter with opacity and `scale(0.95)` to 1 over 150 to 200ms ease-out; exit faster.
- Tooltips: a short delay on the first one in a group, then adjacent tooltips open instantly with no animation. They add information; they never hold the only copy of important help. Not on touch-only targets.
- Menus: keyboard navigation (arrows, Home, End, type-ahead, Escape), the selected item marked, destructive items last and separated, shortcuts as right-aligned muted keycaps.
- Close on outside click and Escape; return focus to the trigger.

## Dialogs and confirmations

- Use a dialog for a task that must be finished or abandoned, or for a destructive, irreversible confirmation. For everything else prefer inline editing, a sheet or an undo.
- Title names the task; the body says the consequence; the buttons name the actions ("Delete invoice", "Keep it"). The destructive button is not the default focus.
- Trap focus, close on Escape, return focus to the trigger, lock background scroll with `overscroll-behavior: contain` on the dialog.
- Backdrop dims the page (and fades with the dialog). Size by content up to about 560px for confirmations, larger for tasks; full screen on phones when the task is long.

## Sheets and drawers

- From the edge they belong to: bottom on phones, side on desktop for detail panels.
- Enter with `translateY(100%)` (or X) to 0 using the drawer curve, 300 to 400ms; exit the same way, faster.
- Drag to dismiss with velocity, not only distance; rubber-band past the open position (`motion.md`).
- Respect safe areas: `padding-bottom: calc(16px + env(safe-area-inset-bottom))`.
- A sheet that is its own destination on mobile may be a route.
- CRUD forms work well as drawers on child routes (`/items/new`, `/items/:id/edit`) over the list, which renders the outlet. Close, cancel and save go back in history instead of pushing the list route, and the drawer does not close while saving.
- Content people read (notifications, activity) opens in a drawer, not a popover: room for title, detail, time and an unread dot. Clicking an item marks it read, closes the drawer and follows its link; "Mark all as read" shows only when something is unread; the trigger's accessible name carries the unread count.

## Toasts

- One toast region at the root of the app, outside dialogs and portals, above overlays. Never one per page.
- Position consistently (bottom-right or bottom-center on desktop, top or bottom center on phones); 24 to 32px from the edge on desktop, 16px on narrow screens.
- Short past-tense message with the object, plus Undo or one action when useful. Loading then success or error updates the same toast by id, instead of stacking.
- Duration about 4 to 6 seconds, paused on hover and when the tab is hidden; errors that need action persist.
- Enter and exit through the same edge; exit about 20% faster than enter.
- Announced politely to screen readers (`aria-live="polite"`); the region has a label and a hotkey to focus it if your library supports it.
- Theme-aware: follow the app's resolved theme, not the library default.

## Tables and lists

See `layout.md` for dimensions. Component rules:
- Sortable headers show the sort state and direction; the whole header cell is the target.
- Selection with a checkbox column and a header checkbox (with an indeterminate state); bulk actions appear in a bar that does not shift the table.
- Row actions: visible on focus and hover, and always reachable in a menu for touch.
- Truncation per field: wrap identity text (two lines is fine), end-truncate secondary metadata with a way to read it, middle-truncate file names, emails and IDs, never truncate numbers, amounts or dates.
- Long lists virtualized or paginated; infinite scroll only where position does not matter.

## Cards

- A card groups things that belong together and are acted on together. If the content is a list of comparable items, use a table or a list instead.
- Separated by a surface step or a hairline; no resting shadow on cards in flow.
- No colored side stripe, ever. Emphasis comes from position, size, a surface step or a small label.
- No hover lift or scale. A clickable card gets a surface or border step on hover, a visible focus ring, and the whole card is one link (with nested actions placed outside or above it).
- Padding 16 to 24; nested radius is outer radius minus padding.
- Equal-height cards in a row; content aligns to shared baselines (titles on one line, actions at the bottom).

## Navigation

- Labels named for their contents ("Invoices", "Clients"), not umbrellas ("Home", "Hub", "Workspace").
- Active state as a neutral surface step and full-strength text; `aria-current="page"`.
- Wayfinding on every screen: where am I, where can I go, how do I get back.
- Tabs for peer views of the same object, with the active tab clearly marked and switching without animation or with a quick indicator move (the indicator may move; the content does not slide).
- Breadcrumbs only for real hierarchy deeper than two levels.
- Every navigation is a link that works with middle-click, Cmd-click and the back button; filters, tabs and pagination live in the URL.

## Badges, tags and status

- Badges carry state, not decoration: "Overdue", "Draft", "3". No "New ✨", "PRO", "Beta 🚀" unless true and useful, and then quiet.
- `white-space: nowrap` and `flex-shrink: 0` so they never wrap; decide what else gives way.
- Status: a pale tint background with dark same-hue text (text at least 12px), or a 6 to 8px dot plus a word. Never color alone.
- Tag rows show the first few and `+8` for the rest.
- Counts are quiet muted or mono numbers, right-aligned in nav, not glowing pills.

## Avatars

- Sizes 24, 32, 40 (48 in two-line rows). `flex-shrink: 0`, `object-fit: cover`.
- Fallback initials from the first and last word, built from grapheme clusters (`Intl.Segmenter`) so emoji and accents survive; a neutral background tinted from the ramp, or a deterministic hue per person at low saturation.
- Broken image: `onerror` falls back to initials with the same size.
- Groups overlap with a ring in the surface color and end with `+N`.

## Keycaps

Small, quiet and consistent: mono or the interface font at 11 to 12px, 18 to 20px tall, 4 to 6px radius, raised surface plus hairline, muted text, platform symbols (`⌘`, `⇧`, `⌥` on Mac; `Ctrl`, `Shift`, `Alt` elsewhere).

## Command menu

- Opens instantly with the shortcut, no animation, input focused, recent items first.
- Results grouped, keyboard first, the selected item a surface step, shortcuts on the right.
- Empty search shows suggestions; no results says so and offers a fallback action.

## Empty, loading and error components

- Skeletons share the final layout's grid and sizes, as flat bars. No shimmer on content that loads in under 300ms.
- Spinners only inside the element that is waiting (a button, a small panel).
- Empty states are part of the component: a short sentence and an action, an illustration only when it earns its space.
- Errors live in the component that failed, with Retry.

## Charts as components

Covered in `layout.md` (Charts). The component-level rules: tooltips follow the pointer and the keyboard, show the exact value with its unit and date; the legend toggles series; colors come from tokens; axes and grid from the neutral ramp.

## Picking libraries (React projects)

Check `package.json` first. If the project already has a library for the job, use it, even if another would be your first choice; flag a problem, don't churn the dependency. Recommend one library in one sentence, not a menu. Outside this list, say you are leaving it.

| Need | Library | Avoid |
|---|---|---|
| Accessible primitives (dialog, popover, menu, select, tabs) | Base UI or Radix (shadcn/ui builds on these) | A `<div>` dropdown with hand-written focus handling |
| Command menu | cmdk | A custom modal with a filtered list |
| Icons | Iconoir, Phosphor or Tabler, matched to the type | Lucide by reflex |
| Date picker | react-day-picker in a popover, locale set, value as `YYYY-MM-DD` | A hand-built calendar |
| Toasts | Sonner | A hand-rolled toast stack or a modal library |
| One-time codes | input-otp | Six separate inputs with manual focus jumps |
| Animation with springs, layout or exit | Motion (formerly Framer Motion) | Using it for a hover or a fade that CSS can do |
| Animated numbers | NumberFlow | Re-rendering text every frame |
| Long lists and tables | TanStack Virtual or Virtuoso | Rendering 1,000+ rows |
| Tables with sorting and filtering logic | TanStack Table | Hand-written sort and filter state per table |
| Drag and drop | dnd kit | HTML5 drag events for complex sorting |
| Charts | Recharts or visx for dashboards; Observable Plot for analysis | A chart library's default rainbow theme |
| Code highlighting | Shiki | Client-side highlighters on static content |
| Shared state | Zustand | A web of props and contexts |
| Class names | clsx, plus cva for variant APIs | Nested template-literal ternaries |
| Theme switching without flash | next-themes (Next.js) | A theme toggle that flashes on load |
| URL state | nuqs (Next.js) | Filters that reset on refresh |
| Forms | React Hook Form with a schema validator | Uncontrolled chaos or a re-render per keystroke |
| Dynamic OG images | Satori | Screenshots of a page |

For Vue, Svelte, Solid or Angular, use the equivalent primitives (Reka UI or Radix Vue, Bits UI or Melt UI, Kobalte, Angular CDK) and the same rule: accessible primitives first, project choices before yours.

## Details that are easy to miss

| Rule | Why | Value or fix |
|---|---|---|
| Submit stays enabled until the request starts | A disabled button cannot explain what is missing | Validate on submit, focus the first error; spinner and busy state only during the request |
| Optimistic updates when success is likely | The interface feels instant | Update now, reconcile on response, roll back with a visible error or undo |
| Skip link to main content | Keyboard users otherwise tab through the whole nav | First focusable element, visible on focus |
| `translate="no"` on brand names and code tokens | Browser translation garbles them | Product names, commands, identifiers |
| `fetchpriority="high"` on the main image | It is usually the largest paint | Only one per page; `loading="lazy"` below the fold |
| Preconnect and preload what the first paint needs | Fonts and CDNs otherwise queue late | `<link rel="preconnect">` for the asset host, `rel="preload" as="font"` for the one or two critical fonts |
| Tooltips: skip the delay on the next one | Once one is open the person is exploring | Keep the delay for the first; adjacent tooltips open immediately with no animation |
| SVG transforms | `transform-origin` otherwise uses the whole canvas | Transform a `<g>` with `transform-box: fill-box; transform-origin: center` |
| Autoplay over 5 seconds beside other content | Required for attention and for WCAG | A visible pause or stop control |
| Comparison slider | Two images need one honest divider | Clip the top image with `clip-path: inset(0 calc(100% - var(--x)) 0 0)`, drag with pointer capture, arrow keys move it |
| Scrollbars | The default bar is the loudest chrome on a quiet UI | Thin, transparent track, pill thumb in the strong line color that darkens on hover; `scrollbar-width: thin` and `scrollbar-color` outside WebKit |
| Drag: ignore extra fingers | A second touch makes the element jump | Track the first `pointerId`, ignore the rest until it ends |

## Checklist

- [ ] Existing components reused; no parallel button, modal or table.
- [ ] Every interactive component has rest, hover, active, focus-visible, disabled and loading states in the palette.
- [ ] Popovers grow from the trigger; tooltips are instant after the first; command menu does not animate.
- [ ] Dialogs only for tasks and destructive confirmations; undo elsewhere.
- [ ] One toast region at the root; toasts update by id; errors that need action persist.
- [ ] No side stripes, hover lifts or resting shadows on cards.
- [ ] Badges never wrap; status never by color alone; avatars have initials fallback.

*Adapts material from Emil Kowalski's skills (MIT), unslop by Damir Sokolovsky (CC BY 4.0) and the Vercel Web Interface Guidelines. See NOTICE.md.*
