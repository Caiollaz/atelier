#!/usr/bin/env node
// atelier contrast: WCAG 2 contrast ratios for color pairs or for the custom properties in a CSS file.
// Usage:
//   node contrast.mjs <foreground> <background>
//   node contrast.mjs --css <file> [--pairs "--text:--bg,--muted:--card"] [--json]
// Colors: #rgb, #rgba, #rrggbb, #rrggbbaa, rgb()/rgba(), hsl()/hsla(), oklch(). Alpha is composited over the background.

import { readFileSync, existsSync } from 'node:fs';

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

function parse(input) {
  const s = String(input).trim().toLowerCase();
  let m;
  if ((m = s.match(/^#?([0-9a-f]{3,8})$/)) && [3, 4, 6, 8].includes(m[1].length)) {
    let h = m[1];
    if (h.length <= 4) h = [...h].map((c) => c + c).join('');
    const n = parseInt(h.slice(0, 6), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: h.length === 8 ? parseInt(h.slice(6), 16) / 255 : 1 };
  }
  const alpha = (v) => (v == null ? 1 : v.endsWith('%') ? parseFloat(v) / 100 : parseFloat(v));
  if ((m = s.match(/^rgba?\(\s*([\d.]+%?)[\s,]+([\d.]+%?)[\s,]+([\d.]+%?)(?:[\s,/]+([\d.]+%?))?\s*\)$/))) {
    const ch = (v) => (v.endsWith('%') ? (parseFloat(v) * 255) / 100 : parseFloat(v));
    return { r: ch(m[1]), g: ch(m[2]), b: ch(m[3]), a: alpha(m[4]) };
  }
  if ((m = s.match(/^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%(?:[\s,/]+([\d.]+%?))?\s*\)$/))) {
    const h = +m[1], sat = +m[2] / 100, l = +m[3] / 100;
    const k = (n) => (n + h / 30) % 12;
    const a = sat * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return { r: f(0) * 255, g: f(8) * 255, b: f(4) * 255, a: alpha(m[4]) };
  }
  if ((m = s.match(/^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:deg)?(?:\s*\/\s*([\d.]+%?))?\s*\)$/))) {
    const L = m[1].endsWith('%') ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
    const C = parseFloat(m[2]), H = (parseFloat(m[3]) * Math.PI) / 180;
    const A = C * Math.cos(H), B = C * Math.sin(H);
    const l_ = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
    const m_ = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
    const s_ = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
    const lin = [
      4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
      -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
      -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
    ];
    const enc = (c) => 255 * Math.min(1, Math.max(0, c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055));
    return { r: enc(lin[0]), g: enc(lin[1]), b: enc(lin[2]), a: alpha(m[4]) };
  }
  if (s === 'white') return { r: 255, g: 255, b: 255, a: 1 };
  if (s === 'black') return { r: 0, g: 0, b: 0, a: 1 };
  return null;
}

const over = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
const lum = ({ r, g, b }) => {
  const f = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const hex = ({ r, g, b }) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

function ratio(fgIn, bgIn) {
  const bg = parse(bgIn), fg = parse(fgIn);
  if (!bg || !fg) return null;
  const solidBg = bg.a < 1 ? over(bg, { r: 255, g: 255, b: 255, a: 1 }) : bg;
  const solidFg = fg.a < 1 ? over(fg, solidBg) : fg;
  const [a, b] = [lum(solidFg), lum(solidBg)].sort((x, y) => y - x);
  const r = (a + 0.05) / (b + 0.05);
  return {
    fg: hex(solidFg), bg: hex(solidBg), ratio: Math.floor(r * 100) / 100,
    text: r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : 'fail',
    large: r >= 4.5 ? 'AAA' : r >= 3 ? 'AA' : 'fail',
    ui: r >= 3 ? 'pass' : 'fail',
  };
}

function line(name, res) {
  if (!res) return `${name.padEnd(28)} could not parse`;
  return `${name.padEnd(28)} ${String(res.ratio.toFixed(2) + ':1').padStart(8)}  text ${res.text.padEnd(4)}  large ${res.large.padEnd(4)}  ui ${res.ui}`;
}

// ---- CSS mode ----
function readVars(css) {
  const themes = { base: {}, dark: {} };
  const blocks = [
    ...css.matchAll(/(:root|html|\[data-theme=["']?dark["']?\]|\.dark|:root\.dark|html\.dark)\s*\{([^}]*)\}/g),
  ].map((m) => ({ sel: m[1], body: m[2], index: m.index }));
  const darkMedia = [...css.matchAll(/@media[^{]*prefers-color-scheme\s*:\s*dark[^{]*\{/g)].map((m) => m.index);
  for (const b of blocks) {
    const inDarkMedia = darkMedia.some((i) => b.index > i && b.index - i < 400);
    const theme = /dark/.test(b.sel) || inDarkMedia ? 'dark' : 'base';
    for (const d of b.body.matchAll(/(--[\w-]+)\s*:\s*([^;]+)/g)) themes[theme][d[1]] = d[2].trim();
  }
  return themes;
}
function resolveVar(vars, value, depth = 0) {
  if (depth > 10 || value == null) return value;
  return value.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)/g, (_, name, fallback) => resolveVar(vars, vars[name] ?? fallback, depth + 1));
}

const FG = /(?:^|-)(text|fg|foreground|ink|muted|secondary|subtle|body|heading|title|label|placeholder|link|primary-text|on-[\w-]+)(?:-|$)/;
const BG = /(?:^|-)(bg|background|surface|card|raised|page|canvas|base|panel|popover|sidebar|muted-bg|elevated)(?:-|$)/;

if (opt('css')) {
  const file = opt('css');
  if (!existsSync(file)) { console.error(`contrast: file not found: ${file}`); process.exit(2); }
  const themes = readVars(readFileSync(file, 'utf8'));
  const out = [];
  for (const [theme, own] of Object.entries(themes)) {
    if (!Object.keys(own).length) continue;
    const vars = theme === 'dark' ? { ...themes.base, ...own } : own;
    const colors = Object.fromEntries(Object.entries(vars).map(([k, v]) => [k, resolveVar(vars, v)]).filter(([, v]) => parse(v)));
    let pairs;
    if (opt('pairs')) pairs = opt('pairs').split(',').map((p) => p.split(':').map((s) => s.trim()));
    else {
      const names = Object.keys(colors);
      const onPairs = names.filter((n) => n.startsWith('--on-') && names.includes('--' + n.slice(5))).map((n) => [n, '--' + n.slice(5)]);
      const fgs = names.filter((n) => FG.test(n.slice(2)) && !BG.test(n.slice(2)) && !n.startsWith('--on-'));
      const bgs = names.filter((n) => BG.test(n.slice(2)));
      pairs = [...fgs.flatMap((f) => bgs.map((b) => [f, b])), ...onPairs];
    }
    for (const [f, b] of pairs) out.push({ theme, pair: `${f} on ${b}`, ...(ratio(colors[f] ?? f, colors[b] ?? b) || { error: 'unparsed' }) });
  }
  if (args.includes('--json')) console.log(JSON.stringify(out, null, 2));
  else if (!out.length) console.log('No color custom properties found in :root, .dark or a prefers-color-scheme block. Pass --pairs to name them.');
  else {
    let theme = '';
    for (const r of out) {
      if (r.theme !== theme) { theme = r.theme; console.log(`\n${theme === 'base' ? 'Default theme' : 'Dark theme'}`); }
      console.log(line(r.pair, r.error ? null : r));
    }
    const fails = out.filter((r) => r.text === 'fail');
    console.log(`\n${out.length} pairs, ${fails.length} below 4.5:1 (fine for large text and icons only if at least 3:1).`);
    if (!opt('pairs')) console.log('Pairs were guessed from names; pass --pairs "--fg:--bg,..." to check exactly the ones you use.');
  }
  process.exit(0);
}

// ---- pair mode ----
const [fg, bg] = args.filter((a) => !a.startsWith('--'));
if (!fg || !bg) {
  console.error('usage: node contrast.mjs <fg> <bg>  |  node contrast.mjs --css <file> [--pairs "--a:--b"] [--json]');
  process.exit(2);
}
const res = ratio(fg, bg);
if (!res) { console.error('contrast: could not parse one of the colors'); process.exit(2); }
if (args.includes('--json')) console.log(JSON.stringify(res));
else {
  console.log(line(`${fg} on ${bg}`, res));
  console.log('Body text needs 4.5:1; large text (24px, or 19px bold) and UI glyphs need 3:1.');
}
