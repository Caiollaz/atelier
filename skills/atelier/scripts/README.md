# atelier scripts

Three small tools the skill uses to see and measure a product. They need Node 18 or newer. `scan.mjs` and `contrast.mjs` have no dependencies; `shoot.mjs` needs Playwright or a local Chrome.

## scan.mjs

Finds the design tells that are visible in code: hue gradients, gradient text, colored glows, emoji, off-grid spacing, `transition: all`, ungated hover, hype words, fake data and more. Each rule is listed in `rules.json` and explained in `references/tells.md`.

```bash
node scan.mjs src/                 # grouped report, 8 hits shown per rule
node scan.mjs src/ --max 20        # show more hits per rule
node scan.mjs src/ --only emoji,hue-gradient
node scan.mjs src/ --json > scan.json
```

It reads CSS, SCSS, Less, HTML, JSX, TSX, Vue, Svelte, Astro and MDX. It skips `node_modules`, build output, minified files, tests and stories, and ignores text inside comments.

It is heuristic on purpose. A hit is a lead to check on the rendered screen, not a verdict; a deliberate, consistent brand choice is not a tell. It always exits with code 0 (it is a report, not a linter), and 2 when the path does not exist.

## shoot.mjs

Captures a running product the way the skill judges it: desktop 1440x900 at 2x, wide 2560x1440 (a 2K monitor), phone 390x844 at 3x with an iPhone user agent, in light and dark. It waits for the network and fonts, dismisses common cookie and consent buttons, scrolls full-page captures once so lazy images load, and captures with reduced motion so entrances are settled.

```bash
node shoot.mjs http://localhost:3000
node shoot.mjs https://example.com --full --out shots
node shoot.mjs ./index.html --only phone --theme dark
```

Files are written as `<host>-<viewport>-<theme>.png` in `./atelier-shots` by default. If light and dark come out the same, it says the page probably has no dark theme.

In `scan.mjs`, a deliberate choice is marked in the source with a comment on the same line, the line above or the first line inside the CSS rule: `/* atelier-ok: tracked-caps, infinite-loop */`. Those rule ids are silenced at that spot only, and the summary says how many hits were marked.

Setup, once per machine or project:

```bash
npm i -D playwright
npx playwright install chromium
```

If Playwright is installed but its browser is not, the script falls back to a local Chrome, Chromium, Edge or Brave in the usual locations on macOS, Linux and Windows. Set `CHROME_PATH` to point at a specific binary.

The script looks for Playwright next to itself and in the current project, so running it from inside a project that already depends on Playwright needs no extra install.

## contrast.mjs

WCAG 2 contrast for a pair of colors, or for the custom properties in a CSS file.

```bash
node contrast.mjs "#6e6e6e" "#fafafa"
node contrast.mjs "rgba(255,255,255,.6)" "#141415"     # alpha is composited over the background
node contrast.mjs --css src/styles/tokens.css           # guesses text and surface pairs by name
node contrast.mjs --css tokens.css --pairs "--text-muted:--card,--on-primary:--primary"
```

It reads `:root`, `.dark`, `[data-theme=dark]` and `prefers-color-scheme: dark` blocks, resolves `var()` references, and accepts hex, `rgb()`, `hsl()` and `oklch()`. Body text needs 4.5:1; large text and UI glyphs need 3:1.
