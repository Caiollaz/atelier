#!/usr/bin/env node
// atelier scan: finds code-visible design tells (see references/tells.md).
// Usage: node scan.mjs <path> [--json] [--max N] [--rules file] [--only id,id]
// Heuristic by design: every hit is a lead to check, not a verdict. Zero dependencies.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative, dirname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const target = args.find((a, i) => !a.startsWith('--') && !['--max', '--rules', '--only'].includes(args[i - 1]));

if (!target) {
  console.error('usage: node scan.mjs <path> [--json] [--max N] [--rules file] [--only id,id]');
  process.exit(2);
}
if (!existsSync(target)) {
  console.error(`atelier scan: path not found: ${target}`);
  process.exit(2);
}

const MAX = Number(opt('max', 8));
const { rules } = JSON.parse(readFileSync(opt('rules', join(here, 'rules.json')), 'utf8'));
const only = opt('only', '') ? new Set(opt('only', '').split(',')) : null;
const active = rules.filter((r) => !only || only.has(r.id));
const byId = Object.fromEntries(active.map((r) => [r.id, r]));

// ---------- files ----------

const EXT = {
  style: new Set(['.css', '.scss', '.sass', '.less', '.pcss', '.styl']),
  markup: new Set(['.html', '.htm', '.vue', '.svelte', '.astro', '.mdx', '.jsx', '.tsx']),
  script: new Set(['.js', '.mjs', '.cjs', '.ts', '.mts', '.jsx', '.tsx', '.vue', '.svelte', '.astro']),
};
const ALL = new Set([...EXT.style, ...EXT.markup, ...EXT.script]);
const CODE = new Set([...EXT.markup, ...EXT.script]); // where user-facing strings live
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', 'out', '.next', '.nuxt', '.svelte-kit', '.output',
  'coverage', 'vendor', '.turbo', '.vercel', '.cache', 'storybook-static', '__snapshots__', '__tests__', '.atelier', 'atelier-shots']);
const SKIP_FILE = /\.(?:min|test|spec|stories|d)\.[a-z]+$|(?:^|[\\/])(?:package-lock|yarn\.lock|pnpm-lock)/i;

function walk(p, out = []) {
  const st = statSync(p);
  if (st.isFile()) {
    if (ALL.has(extname(p).toLowerCase()) && st.size <= 1_000_000 && !SKIP_FILE.test(p)) out.push(p);
    return out;
  }
  for (const name of readdirSync(p)) {
    if (SKIP_DIRS.has(name) || (name.startsWith('.') && name !== '.')) continue;
    walk(join(p, name), out);
  }
  return out;
}

const root = resolve(target);
const rootDir = statSync(root).isDirectory() ? root : dirname(root);
const files = walk(root);
const findings = [];
const project = { motion: 0, reducedMotion: 0, hoverUtilities: [], radii: [], fonts: [], tailwindMajor: null, hoverOnlyWhenSupported: false };

const rel = (f) => relative(rootDir, f) || basename(f);
const lineAt = (text, index) => {
  let n = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) n++;
  return n;
};
const snippetAt = (text, index) => {
  const s = text.lastIndexOf('\n', index) + 1;
  let e = text.indexOf('\n', index);
  if (e < 0) e = text.length;
  const line = text.slice(s, e).trim().replace(/\s+/g, ' ');
  return line.length > 90 ? line.slice(0, 87) + '...' : line;
};
const seen = new Set();
function add(id, file, text, index, note) {
  if (!byId[id]) return;
  const key = `${id}|${file}|${text == null ? note : lineAt(text, index)}`;
  if (seen.has(key)) return;
  seen.add(key);
  findings.push({ id, file: rel(file), line: text == null ? 0 : lineAt(text, index), snippet: note || (text == null ? '' : snippetAt(text, index)) });
}

// Replace comments with spaces (keeping newlines) so line numbers stay right and
// documentation inside comments is not reported.
const HTML_COMMENT = new RegExp('<!--[\\s\\S]*?-->', 'g');
const BLOCK_COMMENT = new RegExp('/\\*[\\s\\S]*?\\*/', 'g');
const LINE_COMMENT = new RegExp('(^|[\\s;{}(,])//[^\\n]*', 'g');
function blankComments(text) {
  const blank = (m) => m.replace(/[^\n]/g, ' ');
  return text
    .replace(HTML_COMMENT, blank)
    .replace(BLOCK_COMMENT, blank)
    .replace(LINE_COMMENT, (m, pre) => pre + blank(m.slice(pre.length)));
}

// ---------- color helpers ----------

function parseColor(s) {
  s = s.trim().toLowerCase();
  let m;
  if ((m = s.match(/^#([0-9a-f]{3,8})$/))) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    const n = parseInt(h.slice(0, 6), 16);
    const a = h.length === 8 ? parseInt(h.slice(6), 16) / 255 : 1;
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a };
  }
  if ((m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+%?))?\s*\)$/))) {
    const a = m[4] == null ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return { r: +m[1], g: +m[2], b: +m[3], a };
  }
  if ((m = s.match(/^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%(?:[\s,/]+([\d.]+%?))?\s*\)$/))) {
    const a = m[4] == null ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return { ...hslToRgb(+m[1], +m[2] / 100, +m[3] / 100), a };
  }
  return null;
}
function hslToRgb(h, s, l) {
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
}
function hsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: h * 60, s, l };
}
const COLOR_TOKEN = /#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi;
const saturated = (c, minS = 0.35) => {
  const x = hsl(c);
  return x.s >= minS && x.l > 0.12 && x.l < 0.92;
};
const hueDiff = (a, b) => Math.min(Math.abs(a - b), 360 - Math.abs(a - b));

const TW_HUES = { red: 0, orange: 25, amber: 40, yellow: 55, lime: 85, green: 140, emerald: 155, teal: 175, cyan: 190,
  sky: 200, blue: 220, indigo: 240, violet: 260, purple: 275, fuchsia: 295, pink: 330, rose: 350 };

// ---------- css blocks ----------

function cssBlocks(text) {
  // Flat view of `selector { declarations }` pairs; good enough for heuristics.
  const out = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(text))) out.push({ selector: m[1].trim(), body: m[2], index: m.index });
  return out;
}
function gatedRanges(text) {
  // Ranges of @media blocks that gate hover to real pointers.
  const ranges = [];
  const re = /@media[^{]*\(\s*hover\s*:\s*hover\s*\)[^{]*\{/gi;
  let m;
  while ((m = re.exec(text))) {
    let depth = 1, i = re.lastIndex;
    while (i < text.length && depth > 0) {
      if (text[i] === '{') depth++;
      else if (text[i] === '}') depth--;
      i++;
    }
    ranges.push([m.index, i]);
  }
  return ranges;
}
const px = (v) => {
  const m = String(v).match(/(-?\d*\.?\d+)\s*(px|rem|em)?/);
  if (!m) return null;
  const n = parseFloat(m[1]);
  return m[2] === 'rem' || m[2] === 'em' ? n * 16 : n;
};

// ---------- project facts ----------

function readProjectFacts() {
  const pkgPath = join(rootDir, 'package.json');
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      const tw = deps.tailwindcss;
      if (tw) project.tailwindMajor = Number((tw.match(/\d+/) || [])[0]) || null;
    } catch {}
  }
  for (const name of ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.cjs', 'tailwind.config.mjs']) {
    const p = join(rootDir, name);
    if (existsSync(p) && /hoverOnlyWhenSupported\s*:\s*true/.test(readFileSync(p, 'utf8'))) project.hoverOnlyWhenSupported = true;
  }
}
readProjectFacts();

// ---------- per file ----------

const regexRules = active.filter((r) => r.patterns && r.kind !== 'custom');
const compiled = regexRules.map((r) => ({ rule: r, res: r.patterns.map((p) => new RegExp(p.source, p.flags.includes('g') ? p.flags : p.flags + 'g')) }));
const appliesTo = (rule, ext) => rule.ext === 'any' || (rule.ext === 'code' ? CODE.has(ext) : EXT[rule.ext]?.has(ext));

const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}\u{2B55}\u{2B06}\u{2B07}\u{2934}\u{2935}]/gu;
const EMOJI_OK = new Set(['✓', '✔', '✕', '✖', '✗', '✘', '✨', '←', '→', '★', '☆', '☑', '☐', '☒', '✱', '✲']);
const DEFAULT_FONTS = /^\s*['"]?(inter|system-ui|-apple-system|blinkmacsystemfont|arial|helvetica|helvetica neue|roboto|sans-serif|segoe ui)['"]?\s*$/i;

for (const file of files) {
  let text;
  try { text = blankComments(readFileSync(file, 'utf8')); } catch { continue; }
  const ext = extname(file).toLowerCase();
  const isStyle = EXT.style.has(ext) || /<style[\s>]/i.test(text);

  for (const { rule, res } of compiled) {
    if (!appliesTo(rule, ext)) continue;
    for (const re of res) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(text))) {
        if (rule.id === 'exclaim' && /!=|!\w/.test(m[0].slice(-3))) continue;
        if (rule.id === 'accent-rail' && /0px|transparent/.test(snippetAt(text, m.index))) continue;
        add(rule.id, file, text, m.index);
        if (m[0].length === 0) re.lastIndex++;
      }
    }
  }

  // motion facts
  project.motion += (text.match(/\btransition\b|\banimation\b|@keyframes|\bmotion\.|animate=\{|\banimate-/g) || []).length;
  project.reducedMotion += (text.match(/prefers-reduced-motion|useReducedMotion|\bmotion-reduce:|\bmotion-safe:|reducedMotion/g) || []).length;

  // emoji (markup and strings, not CSS)
  if (byId.emoji && CODE.has(ext)) {
    EMOJI.lastIndex = 0;
    let m;
    while ((m = EMOJI.exec(text))) {
      if (EMOJI_OK.has(m[0])) continue;
      const lineStart = text.lastIndexOf('\n', m.index) + 1;
      const before = text.slice(lineStart, m.index);
      if (/^\s*(?:\/\/|\*|\/\*|<!--|#)/.test(before)) continue;
      if (/\b(?:console|logger|log)\.\w+\(/.test(snippetAt(text, m.index))) continue;
      add('emoji', file, text, m.index);
    }
  }

  // hue gradients
  if (byId['hue-gradient']) {
    const gre = /(?:linear|radial|conic)-gradient\(((?:[^()]|\([^()]*\))*)\)/gi;
    let m;
    while ((m = gre.exec(text))) {
      const colors = (m[1].match(COLOR_TOKEN) || []).map(parseColor).filter((c) => c && c.a > 0.2 && saturated(c, 0.3));
      const hues = colors.map((c) => hsl(c).h);
      if (hues.some((h, i) => hues.some((k, j) => j > i && hueDiff(h, k) > 40))) add('hue-gradient', file, text, m.index);
    }
    const cls = /(?:class|className)\s*=\s*(?:\{?\s*[`'"])([^`'"]*)/g;
    while ((m = cls.exec(text))) {
      const fams = [...m[1].matchAll(/\b(?:from|via|to)-([a-z]+)-\d{2,3}\b/g)].map((x) => x[1]).filter((f) => f in TW_HUES);
      const set = [...new Set(fams)];
      if (set.length >= 2 && set.some((a, i) => set.some((b, j) => j > i && hueDiff(TW_HUES[a], TW_HUES[b]) > 40))) add('hue-gradient', file, text, m.index);
    }
  }

  // colored glows
  if (byId['color-glow']) {
    const sre = /(?:box-shadow|text-shadow|filter)\s*:\s*([^;{}]+)/gi;
    let m;
    while ((m = sre.exec(text))) {
      if (/^filter/i.test(m[0]) && !/drop-shadow/i.test(m[1])) continue;
      const colors = (m[1].match(COLOR_TOKEN) || []).map(parseColor).filter(Boolean);
      if (colors.some((c) => c.a > 0.15 && saturated(c))) add('color-glow', file, text, m.index);
    }
    const tw = /\b(?:shadow|drop-shadow)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b|\b(?:shadow|drop-shadow)-\[[^\]]*(?:rgba?|hsla?|#)[^\]]*\]/g;
    while ((m = tw.exec(text))) {
      const colors = (m[0].match(COLOR_TOKEN) || []).map(parseColor).filter(Boolean);
      if (m[1] || colors.some((c) => c.a > 0.15 && saturated(c))) add('color-glow', file, text, m.index);
    }
  }

  // Tailwind class-string rules
  {
    const cls = /(?:class|className|:class)\s*=\s*(?:\{\s*)?(?:clsx\(|cn\()?\s*[`'"]([^`'"]*)/g;
    let m;
    while ((m = cls.exec(text))) {
      const c = m[1];
      if (byId['tracked-caps'] && /\buppercase\b/.test(c) && /\btracking-(?:wide|wider|widest|\[0?\.(?:0[5-9]|[1-9])\d*em\])\b/.test(c)) add('tracked-caps', file, text, m.index);
      if (byId['tight-small'] && /\btext-(?:xs|sm|\[1[0-5]px\])\b/.test(c) && /\btracking-(?:tight|tighter|\[-)/.test(c)) add('tight-small', file, text, m.index);
      if (byId['hover-scale'] && /\b(?:group-)?hover:(?:-?scale-(?:1(?:0[2-9]|1\d)|\[1\.)|-?translate-y-|shadow-(?:lg|xl|2xl))/.test(c)) add('hover-scale', file, text, m.index);
      if (byId['no-focus'] && /\b(?:focus:)?outline-none\b/.test(c) && !/\bfocus(?:-visible)?:(?:ring|outline|border|shadow)/.test(c)) add('no-focus', file, text, m.index);
      if (/\bhover:/.test(c)) project.hoverUtilities.push({ file, index: m.index, text });
      for (const r of c.matchAll(/\brounded(?:-(sm|md|lg|xl|2xl|3xl|full|\[[^\]]+\]))?(?=\s|$)/g)) {
        const map = { undefined: 4, sm: 2, md: 6, lg: 8, xl: 12, '2xl': 16, '3xl': 24, full: 9999 };
        project.radii.push({ value: map[r[1]] ?? px(r[1]) ?? 0, label: r[0], file, index: m.index, text });
      }
      if (byId['center-heavy']) project.centered = (project.centered || 0);
      // off-grid arbitrary spacing
      if (byId['off-grid']) {
        for (const a of c.matchAll(/\b-?(?:p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y|inset|inset-x|inset-y|top|left|right|bottom)-\[(-?\d+(?:\.\d+)?)px\]/g)) {
          const v = Math.abs(parseFloat(a[1]));
          if (v > 2 && (v % 2 !== 0 || (v % 4 !== 0 && v >= 18))) add('off-grid', file, text, m.index, `${a[0]}  (${v}px)`);
        }
      }
    }
    // inputs with small text
    if (byId['small-input']) {
      const tag = /<(?:input|textarea|select)\b[^>]*?\b(?:class|className)\s*=\s*\{?\s*[`'"][^`'"]*\btext-(?:xs|sm|\[1[0-5]px\])\b/g;
      while ((m = tag.exec(text))) add('small-input', file, text, m.index);
    }
    // centered text density
    if (byId['center-heavy']) {
      const n = (text.match(/text-align\s*:\s*center|\btext-center\b/g) || []).length;
      const l = (text.match(/text-align\s*:\s*(?:left|start)|\btext-(?:left|start)\b/g) || []).length;
      if (n >= 8 && n > l * 2) add('center-heavy', file, null, 0, `${n} centered text rules vs ${l} left-aligned`);
    }
    // default fonts
    const fre = /font-family\s*:\s*([^;{}]+)|--font-(?:sans|body|base|display|heading)\s*:\s*([^;{}]+)|next\/font\/google['"][^\n]*|import\s*\{\s*([A-Z][\w_]*)[^}]*\}\s*from\s*['"]next\/font\/google['"]/g;
    while ((m = fre.exec(text))) {
      const first = (m[1] || m[2] || m[3] || '').split(',')[0];
      if (first && DEFAULT_FONTS.test(first.replace(/_/g, ' '))) project.fonts.push({ file, index: m.index, text, name: first.trim() });
    }
  }

  // CSS blocks
  if (isStyle) {
    const gated = gatedRanges(text);
    const inGate = (i) => gated.some(([a, b]) => i >= a && i < b);
    for (const b of cssBlocks(text)) {
      const body = b.body;
      const get = (prop) => {
        const mm = body.match(new RegExp(`(?:^|[;\\s])${prop}\\s*:\\s*([^;]+)`, 'i'));
        return mm ? mm[1].trim() : null;
      };
      const selIdx = b.index + (text.slice(b.index).match(/^\s*/)?.[0].length || 0);
      const fs = px(get('font-size'));
      const ls = get('letter-spacing');
      if (byId['tracked-caps'] && /uppercase/i.test(get('text-transform') || '') && ls && (ls.endsWith('em') ? parseFloat(ls) >= 0.05 : px(ls) >= 1)) add('tracked-caps', file, text, selIdx);
      if (byId['tight-small'] && fs && fs < 16 && ls && parseFloat(ls) < 0) add('tight-small', file, text, selIdx);
      if (byId['small-input'] && /\b(?:input|textarea|select)\b/i.test(b.selector) && fs && fs < 16) add('small-input', file, text, selIdx);
      if (/:hover/.test(b.selector)) {
        const tf = get('transform') || get('scale') || get('translate') || '';
        if (byId['hover-scale'] && (/scale\(\s*1\.(?:0[2-9]|[1-9])|translate(?:Y|3d)?\(\s*[^,)]*-[2-9]/.test(tf) || /^1\.(?:0[2-9]|[1-9])/.test(get('scale') || ''))) add('hover-scale', file, text, selIdx);
        if (byId['ungated-hover'] && !inGate(b.index) && !/@media/.test(b.selector)) add('ungated-hover', file, text, selIdx);
      }
      if (byId['no-focus'] && /(?:^|[;\s])outline\s*:\s*(?:none|0)\b/i.test(body) && !/:focus-visible/.test(text)) add('no-focus', file, text, selIdx);
      const rad = get('border-radius');
      if (rad) project.radii.push({ value: px(rad) ?? 0, label: `border-radius: ${rad}`, file, index: selIdx, text });
      if (byId['off-grid']) {
        const sre = /(?:^|[;\s])((?:padding|margin|gap|row-gap|column-gap|inset|top|left|right|bottom)(?:-(?:top|right|bottom|left|inline|block|inline-start|inline-end|block-start|block-end))?)\s*:\s*([^;]+)/gi;
        let s;
        while ((s = sre.exec(body))) {
          for (const v of s[2].matchAll(/(-?\d*\.?\d+)px/g)) {
            const n = Math.abs(parseFloat(v[1]));
            if (n > 2 && (n % 2 !== 0 || (n % 4 !== 0 && n >= 18))) {
              add('off-grid', file, text, b.index + body.indexOf(s[0]) + b.selector.length, `${s[1]}: ${s[2].trim()}`);
              break;
            }
          }
        }
      }
    }
  }
}

// ---------- project-level rules ----------

if (byId['no-reduced-motion'] && project.motion >= 5 && project.reducedMotion === 0)
  add('no-reduced-motion', join(rootDir, '.'), null, 0, `${project.motion} motion declarations, no prefers-reduced-motion anywhere`);

if (byId['ungated-hover'] && project.tailwindMajor === 3 && !project.hoverOnlyWhenSupported && project.hoverUtilities.length) {
  const h = project.hoverUtilities[0];
  add('ungated-hover', h.file, h.text, h.index, `Tailwind v3: ${project.hoverUtilities.length} class strings use hover: without future.hoverOnlyWhenSupported`);
}

if (byId['radius-monotone'] && project.radii.length >= 12) {
  const counts = {};
  for (const r of project.radii) if (r.value > 0 && r.value < 999) counts[r.value] = (counts[r.value] || 0) + 1;
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const [top, n] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0] || [];
  if (top && +top >= 12 && n / total >= 0.7) {
    const first = project.radii.find((r) => r.value === +top);
    add('radius-monotone', first.file, first.text, first.index, `${n} of ${total} radius declarations are ${top}px`);
  }
}

if (byId['default-font'] && project.fonts.length) {
  const f = project.fonts[0];
  add('default-font', f.file, f.text, f.index, `${f.name} (${project.fonts.length} place${project.fonts.length > 1 ? 's' : ''})`);
}

// ---------- report ----------

const FAMILY_ORDER = ['Composition', 'Color', 'Type', 'Icons', 'Spacing', 'Copy', 'Components', 'Motion', 'Mobile', 'Accessibility'];
const SEV_ORDER = { broken: 0, off: 1, polish: 2 };
const grouped = {};
for (const f of findings) (grouped[f.id] ||= []).push(f);

if (flag('json')) {
  console.log(JSON.stringify({
    root: rootDir, files: files.length,
    rules: Object.entries(grouped).map(([id, hits]) => ({ id, family: byId[id].family, severity: byId[id].severity, title: byId[id].title, fix: byId[id].fix, count: hits.length, hits })),
  }, null, 2));
  process.exit(0);
}

const ids = Object.keys(grouped).sort((a, b) =>
  FAMILY_ORDER.indexOf(byId[a].family) - FAMILY_ORDER.indexOf(byId[b].family) || SEV_ORDER[byId[a].severity] - SEV_ORDER[byId[b].severity]);

console.log(`atelier scan  ${rootDir}  (${files.length} files)\n`);
if (!ids.length) {
  console.log('No code-visible tells found. Still look at the rendered screen: most tells are only visible there.');
  process.exit(0);
}
let family = '';
for (const id of ids) {
  const r = byId[id];
  if (r.family !== family) { family = r.family; console.log(`## ${family}`); }
  const hits = grouped[id];
  console.log(`  [${r.severity}] ${r.title}  (${id}, ${hits.length})`);
  console.log(`     fix: ${r.fix}`);
  for (const h of hits.slice(0, MAX)) console.log(`     ${h.file}${h.line ? ':' + h.line : ''}  ${h.snippet}`);
  if (hits.length > MAX) console.log(`     +${hits.length - MAX} more`);
}
const sev = { broken: 0, off: 0, polish: 0 };
const fam = {};
for (const f of findings) { sev[byId[f.id].severity]++; fam[byId[f.id].family] = (fam[byId[f.id].family] || 0) + 1; }
console.log(`\n${findings.length} hits: ${sev.broken} broken, ${sev.off} off, ${sev.polish} polish. By family: ${Object.entries(fam).map(([k, v]) => `${k} ${v}`).join(', ')}.`);
console.log('Heuristic: confirm each hit on the rendered screen; a deliberate, consistent brand choice is not a tell.');
