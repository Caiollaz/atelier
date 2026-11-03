# Native motion (React Native and Expo)

Read this when you add, review or remove motion, gestures or haptics in a React Native or Expo app. The gate, easing tokens and vocabulary in `motion.md` still apply; this file covers what changes on a phone. Version-specific claims are as of Reanimated 4 and Gesture Handler 2, 2026.

## The gate on mobile

Two failure modes: motion that should not exist, and the right motion on the wrong thread (state per frame, `PanResponder`, animated `height`) that looks fine on your phone in dev and drops to 20fps on a three-year-old Android.

| Tier | Examples | Motion |
|---|---|---|
| 100+/day | Tab switches, keyboard open and close, scrolling, settings toggles | Platform default or none |
| Tens/day | Press feedback, list navigation, row selection | Under 150ms or none |
| Occasional | Sheets, modals, toasts, onboarding steps | Standard |
| Rare | Success, empty-state illustration, celebration | Delight budget |

- Name the purpose in one word (feedback, spatial consistency, state, preventing a jarring change, explanation, delight). No name, no motion.
- Tabs never slide (`animation: 'none'`). Tabs are peers; a slide implies depth that is not there and costs the user dozens of times a session.
- Functional data (balances, charts, lists of records) does not move for style.

## Tool ladder

Stop at the first rung that fits.

| Rung | Use for |
|---|---|
| Reanimated CSS transition (`transitionProperty`) | State-driven change, no finger involved (press scale, toggle) |
| Reanimated CSS animation (`animationName` keyframes) | Loops, multi-stage, play on mount |
| Layout animations (`entering`, `exiting`, `itemLayoutAnimation`) | Mount, unmount, reflow |
| `useSharedValue` + `Gesture` + `useAnimatedStyle` | Anything a finger drives, anything derived from scroll, anything interruptible |
| Native stack options (`animation`, `presentation`) | Screen to screen. Never hand-roll a screen transition in JS; the native one keeps the back gesture |
| `presentation: 'formSheet'` | A sheet that is its own destination, before building a draggable sheet |
| `NativeTabs` (`expo-router/unstable-native-tabs`, unstable as of 2026) | Native tab bar |
| `Link.Menu`, `Link.Preview`, `headerLargeTitleEnabled` | iOS-only native affordances (`headerLargeTitle` is deprecated) |
| `RefreshControl` | Pull to refresh, unless it is a signature interaction |
| `react-native-keyboard-controller` | Anything that follows the keyboard |
| Lottie | Illustration only, never UI state |
| `@shopify/react-native-skia` | When the view hierarchy itself is the bottleneck |

- Use Reanimated, not core `Animated`: core cannot follow a gesture without crossing the bridge.
- A shared value is for continuous or interruptible values. A worklet for a two-state toggle is the mobile version of installing a library for a fade.
- `ReanimatedSwipeable` covers swipe-to-reveal. Build your own only for swipe-to-commit with momentum.
- Install with `npx expo install <package>` so versions match the SDK.

## Properties and layout cost

| Rule | Why | Value or fix |
|---|---|---|
| Animate `transform` and `opacity` | Free on the UI thread | Default for everything |
| Avoid `width`, `height`, `margin`, `padding`, `flex`, `top`, `left`, `gap` | Each frame re-runs Yoga for the node and its siblings | Transform instead |
| Exception: an absolutely positioned, childless element may animate `width` | Out of flow, nothing re-lays-out, and the corner radius stays round where `scaleX` would smear it | Tab pill, progress fill |
| `transform` is an ordered array | `[{ translateY }, { scale }]` scales after moving; reversed, the translate is scaled | Keep translate first |
| Never `scale: 0` | Nothing appears from nothing | Start at 0.95 with opacity 0 |
| Android: never animate `elevation` | Shadow re-renders each frame | Fade a pre-shadowed layer |
| Never animate `BlurView` intensity | Android re-renders the blur each frame | Crossfade a static `BlurView` |
| Never animate a header's height to collapse it | Layout pass on everything below, every scroll frame | Fixed container, translate the content, `overflow: 'hidden'` |
| Text scales by default | Heights measured at 100% are wrong at 200% | Measure with `onLayout` or animate a transform |
| Translate by the element's own size | Correct for any content | Hide sheets and toasts at their own height |

## Timing and springs

Easing tokens match the web ones:

```js
export const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);      // enter, exit, default
export const EASE_IN_OUT = Easing.bezier(0.77, 0, 0.175, 1);  // moving on screen
export const EASE_SHEET = Easing.bezier(0.32, 0.72, 0, 1);    // sheets and drawers
```

| Element | Value |
|---|---|
| Press | 100 to 150ms, scale 0.97 (120ms is the ceiling at this frequency) |
| Toggle, chip, small state | 150 to 200ms `EASE_OUT` |
| Sheet, modal, drawer | Spring, about 300ms perceived |
| Screen transition | Platform default (iOS push is 350ms). Do not override it |
| Toast | Enter 300ms, exit 240ms, both `EASE_OUT` |

- If a finger was involved, use a spring; otherwise timing. Springs carry velocity; timing restarts.
- Write springs as `duration` + `dampingRatio` (ms), not mass, stiffness and damping.
- Never `Easing.in(...)` on UI.

| Spring use | Config |
|---|---|
| Default settle, no overshoot | `{ duration: 400, dampingRatio: 1 }` |
| Snap back or reposition after a drag | `{ duration: 400, dampingRatio: 0.8, velocity }` |
| Sheet or drawer after a drag | `{ duration: 300, dampingRatio: 0.8, velocity }` |
| Must not pass a hard edge | Add `overshootClamping: true` (a sheet dismissing past the bottom flashes a gap) |

Bounce (a `dampingRatio` under 1) only when the gesture carried momentum. Overshoot on a menu that faded in feels wrong; on a card you flicked it feels right.

## Thread rules

| Rule | Why | Fix |
|---|---|---|
| Never `setState` from a gesture or scroll handler | One React render per frame is the biggest single cause of RN jank | Shared value into `useAnimatedStyle` |
| Never call JS per frame from `onUpdate` or a scroll handler | 60 to 120 calls a second | Call from `onEnd`, or a `useAnimatedReaction` that fires on a threshold crossing |
| `scheduleOnRN(fn, ...args)` from `react-native-worklets`, not `runOnJS` | `runOnJS` is deprecated in Reanimated 4 | Same call shape |
| `.get()` and `.set()`, not `.value` | The React Compiler cannot see through `.value` | `sv.set((v) => v + 1)` for functional updates |
| Never read or write a shared value during render | A read is a stale snapshot; a write replays on re-renders you did not cause | Read inside worklets and animated styles |
| Functions called from a worklet start with `'worklet'` | Throws on device while working in the debugger | First line of the function |
| Build layout-animation builders at module scope or in `useMemo` | An inline chain rebuilds every render | `const ROW_CLOSE = LinearTransition.duration(200)` |
| Clamp scroll interpolations with `Extrapolation.CLAMP` | Past the range, opacity goes negative and a header reappears inverted | Always on scroll |

## Gestures

| Rule | Value |
|---|---|
| Capture the current value on start | `context.set(translateY.get())` in `onStart`, or grabbing mid-animation teleports |
| Hand the gesture velocity to the spring | `velocity: e.velocityY`; the detail that most separates fluid from fine |
| Declare an axis for a pan inside a scroll view | `activeOffsetY([-10, 10])` or `activeOffsetX([-10, 10])`, or it steals scrolls |
| Decide by projected landing, not distance alone | Momentum projection below; requiring 40% travel makes sheets feel heavy |
| Friction past an edge | Rubber-band below |
| Gesture Handler 2: wrap gestures in `useMemo` | Rebuilding can reattach the recognizer and drop a drag. Gesture Handler 3 hooks (`usePanGesture`, `onActivate`, `onDeactivate`) do not need it |
| Never `PanResponder` | Use `Gesture.Pan()` |

```js
export function project(velocity, rate = 0.998) {
  'worklet';
  return ((velocity / 1000) * rate) / (1 - rate);
}
export function rubberband(overshoot, dimension, c = 0.55) {
  'worklet';
  return (overshoot * dimension * c) / (dimension + c * Math.abs(overshoot));
}
```

## Press, not hover

- There is no hover. Every web hover affordance moves to press, position or nothing; redesign it, do not port it.
- Feedback on press-in, commit on press-out. Waiting for the tap to finish feels dead.
- Touch targets at least 44x44pt (iOS) and 48dp (Android). If the visual is smaller, add `hitSlop` (12); do not grow the visual.
- `pressRetentionOffset` (16) so a few pixels of drift does not cancel a press.
- Android ripple only in a Material-styled app; otherwise the same scale on both platforms.

## Haptics

| Moment | Call |
|---|---|
| Step tick, selection | `Haptics.selectionAsync()` |
| Snap home, detent, commit | `Haptics.impactAsync(ImpactFeedbackStyle.Light)` |
| Heavy landing, destructive | `Haptics.impactAsync(ImpactFeedbackStyle.Medium)` |
| Result | `Haptics.notificationAsync(NotificationFeedbackType.Success)` or `.Error` |

- Fire on the same frame as the visual, at the causal moment (the detent catching), not when the animation ends.
- One per user action. Never on scroll, never per frame, never on an entrance the user did not cause.
- Never the only feedback: haptics are off for many users and silent on much Android hardware.
- From a worklet: `scheduleOnRN(Haptics.selectionAsync)`. A tab indicator fires on the press, not when the pill lands.

## Reduced motion and accessibility

- Check `useReducedMotion()`; drop translation, scale, parallax and overshoot; keep opacity. Screen transitions become `animation: 'fade'`.
- Springs and timings accept `reduceMotion: ReduceMotion.System`.
- Never animate to a hardcoded height; type can scale to 200%.

## Screen transitions

| Navigation | Option |
|---|---|
| Deeper in a hierarchy | `animation: 'default'` |
| A task the user can abandon | `presentation: 'modal'` |
| Short interruption (picker, filter, share) | `presentation: 'formSheet'` with detents |
| Between tabs | `animation: 'none'` |
| Reduced motion | `animation: 'fade'` |

- Set `animationMatchesGesture: true` whenever you set a custom `animation`, or the back swipe looks like another app.
- formSheet caveats: Android caps detents at three (longer arrays truncate silently); `sheetGrabberVisible` is iOS-only; Android form sheets cannot host native headers or nested stacks (use `modal`); `fitToContents` needs explicitly sized content (a `flex: 1` root fails).

```jsx
<Stack screenOptions={{ animation: reduced ? 'fade' : 'default' }}>
  <Stack.Screen name="settings" options={{ animation: 'slide_from_right', animationMatchesGesture: true }} />
  <Stack.Screen name="filter" options={{ presentation: 'formSheet', sheetAllowedDetents: 'fitToContents' }} />
</Stack>
```

## Setup traps

- Version mismatch: `npx expo install react-native-reanimated react-native-worklets`.
- `babel-preset-expo` adds the worklets plugin. A bare project adds it manually, last in the list; a missing plugin throws `Failed to create a worklet`.
- No `GestureHandlerRootView` at the root: gestures do nothing, with no error.
- Reanimated 4 requires the New Architecture.
- Judge feel on a release build on the slowest supported device. Not Expo Go, not the simulator, not a flagship in dev mode.

## 120fps

On ProMotion iPhones, third-party animation is capped at 60fps unless `CADisableMinimumFrameDurationOnPhone` is true in `ios.infoPlist`. Recent Expo SDKs set it by default (as of 2026; confirm in the built Info.plist). The frame budget is then 8ms, so design against it.

## Recipes

```jsx
// Press: CSS transition, setState is fine (twice per press, not per frame)
const s = StyleSheet.create({
  box: { transform: [{ scale: 1 }], transitionProperty: 'transform',
    transitionDuration: '120ms', transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' },
  pressed: { transform: [{ scale: 0.97 }] },
});
<Pressable hitSlop={12} pressRetentionOffset={16}
  onPressIn={() => setP(true)} onPressOut={() => setP(false)}>
  <Animated.View style={[s.box, p && s.pressed]} />
</Pressable>

// Sheet drag
const pan = useMemo(() => Gesture.Pan().activeOffsetY([-10, 10])
  .onStart(() => { context.set(y.get()); })
  .onUpdate((e) => { const n = context.get() + e.translationY;
    y.set(n >= 0 ? n : rubberband(n, HEIGHT)); })
  .onEnd((e) => {
    if (y.get() + project(e.velocityY) > HEIGHT * 0.4) {
      y.set(withSpring(HEIGHT, { duration: 300, dampingRatio: 1, velocity: e.velocityY,
        overshootClamping: true }, (done) => { if (done) scheduleOnRN(onClose); }));
    } else {
      y.set(withSpring(0, { duration: 300, dampingRatio: 0.8, velocity: e.velocityY }));
      scheduleOnRN(Haptics.impactAsync, Haptics.ImpactFeedbackStyle.Light);
    }
  }), []);
// Backdrop from the same value
opacity: interpolate(y.get(), [0, HEIGHT], [1, 0], Extrapolation.CLAMP)

// Swipe to delete: horizontal axis, left only; exit withTiming 200ms EASE_OUT,
// snap back withSpring(0, { duration: 300, dampingRatio: 1, velocity: e.velocityX })
.activeOffsetX([-10, 10]).onUpdate((e) => { x.set(Math.min(0, context.get() + e.translationX)); })
const ROW_CLOSE = LinearTransition.duration(200); // module scope
<Animated.FlatList itemLayoutAnimation={ROW_CLOSE} />

// Collapsing header
const onScroll = useAnimatedScrollHandler((e) => { scrollY.set(e.contentOffset.y); });
opacity: interpolate(scrollY.get(), [0, 60], [1, 0], Extrapolation.CLAMP),
transform: [{ translateY: interpolate(scrollY.get(), [0, 60], [0, -12], Extrapolation.CLAMP) }]
// <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16}>

// List entrance: once, on content the user waited for; never on recycled rows
const entering = useMemo(() => FadeInDown.duration(250).delay(Math.min(index, 5) * 40), [index]);

// Keyboard: <KeyboardProvider> at the root
const { height } = useReanimatedKeyboardAnimation(); // 0 to -keyboardHeight
transform: [{ translateY: height.get() }]

// Tab pill: absolute, childless, so width may animate
x.set(withTiming(layout.x, { duration: 250, easing: EASE_IN_OUT }));
w.set(withTiming(layout.width, { duration: 250, easing: EASE_IN_OUT }));

// Toast: exit ~20% faster, above the home indicator, leaves the way it came
const TOAST_ENTER = FadeInDown.duration(300).easing(EASE_OUT);
const TOAST_EXIT = FadeOutDown.duration(240).easing(EASE_OUT);
// style: { position: 'absolute', bottom: insets.bottom + 16, left: 16, right: 16 }
```

Threshold haptic without per-frame JS:

```jsx
useAnimatedReaction(() => pull.get() > THRESHOLD, (armed, was) => {
  if (armed !== was) scheduleOnRN(Haptics.impactAsync, Haptics.ImpactFeedbackStyle.Light);
});
```

## Checklist

Never ship:

- [ ] Motion on tab switches, keyboard, scroll or other 100+/day interactions.
- [ ] `setState`, or `scheduleOnRN` per frame, in a gesture or scroll handler.
- [ ] `PanResponder`, core `Animated`, `runOnJS` or `.value` in new code.
- [ ] Animated `height`, `width` (outside absolute childless elements), `margin`, `padding`, `elevation` or `BlurView` intensity.
- [ ] `scale: 0`, or `Easing.in` on UI.
- [ ] A pan inside a scroll view without an axis offset.
- [ ] A gesture that does not capture its start value or hand velocity to the spring.
- [ ] Distance-only dismissal, or a hard stop where a rubber-band belongs.
- [ ] Bounce without momentum; a sheet without `overshootClamping` on dismiss.
- [ ] `entering` on rows of a virtualized list.
- [ ] Keyboard-following UI driven by `Keyboard.addListener` and timing.
- [ ] A screen transition rebuilt in JS, or a custom `animation` without `animationMatchesGesture`.
- [ ] Touch targets under 44pt or 48dp; a hover affordance ported from web.
- [ ] Haptics as the only feedback, per frame, or late.
- [ ] No reduced-motion path; scroll interpolation without `CLAMP`; a toast under the home indicator.
- [ ] Feel judged in Expo Go, the simulator or a dev build.

*Adapts material from Emil Kowalski's skills (MIT) and unslop by Damir Sokolovsky (CC BY 4.0). See NOTICE.md.*
