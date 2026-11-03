#!/usr/bin/env node
// atelier check: the floor a page must hold, measured in a real browser.
// Usage: node check.mjs <url|file.html> [--frames dir] [--skip wide,nojs,reduced,motion,keys]
// Checks: horizontal overflow at 390, 1440 and 2560; islands at 2560; reading with JavaScript off;
// prefers-reduced-motion; reveals that stay hidden with motion on; focus on the first Tab stops; an in-page anchor;
// console errors and failed requests. With --frames, also saves motion-on captures, one per screen, at 1440, 2560 and 390.
// It is a report: it always exits 0. Read the frames before judging; numbers point where to look.

import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { VIEWPORTS, launch, toUrl } from './browser.mjs';

const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };
const input = args.find((a, i) => !a.startsWith('--') && !['--frames', '--skip'].includes(args[i - 1]));
if (!input) {
  console.error('usage: node check.mjs <url|file.html> [--frames dir] [--skip wide,nojs,reduced,motion,keys]');
  process.exit(2);
}
const url = toUrl(input);
const framesDir = opt('frames') && resolve(opt('frames'));
const skip = new Set((opt('skip') || '').split(','));
if (framesDir) mkdirSync(framesDir, { recursive: true });

const browser = await launch('check');
const problems = [];
const lines = [];
const say = (s) => lines.push(s);

async function open(vp, extra = {}) {
  const context = await browser.newContext({ ...VIEWPORTS[vp], ...extra });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); });
  page.on('requestfailed', (r) => errors.push(`failed: ${r.url().slice(0, 140)}`));
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`${r.status()}: ${r.url().slice(0, 140)}`); });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
  await page.waitForTimeout(800);
  return { context, page, errors };
}

// Scroll screen by screen (smooth-scroll libraries follow window.scrollTo) and run fn on each stop.
async function eachScreen(page, fn) {
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  const h = await page.evaluate(() => innerHeight);
  let i = 0;
  for (let y = 0; y < H; y += Math.round(h * 0.85), i++) {
    await page.evaluate((y) => scrollTo(0, y), y);
    await page.waitForTimeout(900);
    await fn(i, y);
  }
  return i;
}

// In the page: what is hidden right now in the middle of the viewport (a reveal that never fired).
const hiddenInView = () => {
  const out = [];
  for (const el of document.querySelectorAll('body *')) {
    if (!el.textContent.trim() && !el.matches('img,svg,video,canvas,picture')) continue;
    const r = el.getBoundingClientRect();
    const mid = (r.top + r.bottom) / 2;
    if (r.width < 8 || r.height < 8 || mid < innerHeight * 0.15 || mid > innerHeight * 0.85) continue;
    const cs = getComputedStyle(el);
    const clipped = /inset\((?:[^)]*\s)?100%|inset\(100%/.test(cs.clipPath);
    if (Number(cs.opacity) < 0.05 || cs.visibility === 'hidden' || clipped) {
      if (el.closest('[aria-hidden="true"]')) continue;
      out.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} "${el.textContent.trim().slice(0, 30)}"`);
    }
  }
  return out;
};

// In the page: how much of the width this screen paints, and whether anything meets a viewport edge.
// Counts text, media and rules. A field counts only when it stands apart from the page (1.25:1 or more): a white band
// on an off-white page does not carry the width. Fixed layers and sticky bars (the nav, a floating button) do not count; a sticky stage does.
const measureWidth = () => {
  const W = innerWidth, H = innerHeight;
  const rgb = (c) => (c.match(/[\d.]+/g) || []).map(Number);
  const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const solid = (c) => { const v = rgb(c); return v.length >= 3 && v[3] !== 0; };
  const pageBg = [document.body, document.documentElement].map((e) => getComputedStyle(e).backgroundColor).find(solid) || 'rgb(255, 255, 255)';
  const pageL = lum(rgb(pageBg));
  const apart = (c) => { const v = rgb(c); if (v.length < 3 || v[3] === 0) return false; const l = lum(v); return (Math.max(l, pageL) + 0.05) / (Math.min(l, pageL) + 0.05) >= 1.25; };
  const seeThrough = (c) => c === 'rgba(0, 0, 0, 0)' || c === 'transparent';
  const floating = (el) => {
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      const p = getComputedStyle(n).position;
      if (p === 'fixed' || (p === 'sticky' && n.getBoundingClientRect().height < H * 0.2)) return true;
    }
    return false;
  };
  let left = W, right = 0, edge = false;
  const add = (r, edgy) => {
    const l = Math.max(0, r.left), rt = Math.min(W, r.right);
    if (rt - l < 2 || r.height < 2 || r.bottom < 0 || r.top > H) return;
    left = Math.min(left, l); right = Math.max(right, rt);
    if (edgy && (l <= 1 || rt >= W - 1)) edge = true;
  };
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || Number(cs.opacity) < 0.05 || cs.display === 'none') continue;
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > H || r.right <= 0 || r.left >= W || floating(el)) continue;
    const media = el.matches('img,svg,video,canvas,picture,iframe');
    const field = apart(cs.backgroundColor) || (cs.backgroundImage !== 'none' && r.width > W * 0.3);
    const rule = ['Top', 'Bottom'].some((s) => parseFloat(cs[`border${s}Width`]) > 0 && !seeThrough(cs[`border${s}Color`]));
    if (media || field) add(r, true);
    else if (rule) add(r, false);
    for (const n of el.childNodes) {
      if (n.nodeType !== 3 || !n.textContent.trim()) continue;
      const range = document.createRange(); range.selectNodeContents(n);
      for (const tr of range.getClientRects()) add(tr, false);
    }
  }
  const span = right > left ? (right - left) / W : 0;
  return { span: Math.round(span * 100), edge, left: Math.round(left), right: Math.round(right) };
};

// 1. Overflow, and frames with motion on
for (const vp of ['phone', 'desktop', 'wide']) {
  const { context, page, errors } = await open(vp);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (overflow > 0) problems.push(`${vp}: page scrolls sideways by ${overflow}px`);
  if (vp === 'desktop' && errors.length) problems.push(`console or network errors:\n    ${[...new Set(errors)].slice(0, 8).join('\n    ')}`);
  const islands = [];
  const stuck = new Set();
  const screens = await eachScreen(page, async (i) => {
    if (framesDir) await page.screenshot({ path: join(framesDir, `${vp}-${String(i).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 60 });
    if (vp === 'wide' && !skip.has('wide')) {
      const m = await page.evaluate(measureWidth);
      if (!m.edge && m.span < 65) islands.push(`screen ${i}: ${m.span}% of the width (${m.left}–${m.right}px), nothing meets an edge`);
    }
    if (vp === 'desktop' && !skip.has('motion')) for (const s of await page.evaluate(hiddenInView)) stuck.add(s);
  });
  say(`${vp}: ${screens} screens, sideways overflow ${overflow}px`);
  if (vp === 'wide' && !skip.has('wide')) {
    say(`wide: ${islands.length} of ${screens} screens read as an island${islands.length ? `\n  ${islands.join('\n  ')}` : ''}`);
    if (islands.length > 1 || islands.length / screens > 0.2) problems.push(`wide (2560): ${islands.length} of ${screens} screens are islands\n    ${islands.join('\n    ')}`);
  }
  if (stuck.size) problems.push(`motion on: still hidden in mid-screen after scrolling:\n    ${[...stuck].slice(0, 8).join('\n    ')}`);
  await context.close();
}

// 2. JavaScript off
if (!skip.has('nojs')) {
  const { context, page } = await open('desktop', { javaScriptEnabled: false });
  const hidden = new Set();
  await eachScreen(page, async () => { for (const s of await page.evaluate(hiddenInView)) hidden.add(s); });
  say(`no JavaScript: ${hidden.size} hidden elements`);
  if (hidden.size) problems.push(`no JavaScript: content stays hidden:\n    ${[...hidden].slice(0, 8).join('\n    ')}`);
  await context.close();
}

// 3. Reduced motion: nothing long or looping keeps running, no smooth-scroll class
if (!skip.has('reduced')) {
  const { context, page } = await open('desktop', { reducedMotion: 'reduce' });
  await eachScreen(page, async () => {});
  const r = await page.evaluate(() => ({
    smooth: /\b(lenis|locomotive|has-scroll-smooth)\b/.test(document.documentElement.className),
    moving: document.getAnimations().filter((a) => {
      const t = a.effect && a.effect.getComputedTiming();
      return a.playState === 'running' && t && (t.iterations === Infinity || t.duration > 200 || a.timeline !== document.timeline);
    }).map((a) => a.animationName || a.transitionProperty || 'animation'),
  }));
  say(`reduced motion: smooth scroll ${r.smooth ? 'on' : 'off'}, ${r.moving.length} long or scroll-driven animations running`);
  if (r.smooth) problems.push('reduced motion: a smooth-scroll library is still active');
  if (r.moving.length) problems.push(`reduced motion: still moving: ${[...new Set(r.moving)].join(', ')}`);
  await context.close();
}

// 4. Keyboard and anchors
if (!skip.has('keys')) {
  const { context, page } = await open('desktop');
  const noRing = [];
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab');
    const f = await page.evaluate(() => {
      const a = document.activeElement; if (!a || a === document.body) return null;
      const cs = getComputedStyle(a);
      return { name: (a.getAttribute('aria-label') || a.textContent || a.tagName).trim().slice(0, 30), ring: cs.outlineStyle !== 'none' || cs.boxShadow !== 'none' };
    });
    if (f && !f.ring) noRing.push(f.name);
  }
  if (noRing.length) problems.push(`keyboard: no visible focus on: ${[...new Set(noRing)].join(', ')}`);
  const anchor = await page.evaluate(() => {
    const ok = (a) => a.getAttribute('href').length > 1 && document.querySelector(a.getAttribute('href')) && document.querySelector(a.getAttribute('href')).getBoundingClientRect().top > innerHeight;
    const a = [...document.querySelectorAll('nav a[href^="#"]')].find(ok) || [...document.querySelectorAll('header a[href^="#"], a[href^="#"]')].find(ok);
    return a && a.getAttribute('href');
  });
  if (anchor) {
    await page.evaluate(() => scrollTo(0, 0));
    await page.click(`a[href="${anchor}"]`).catch(() => {});
    await page.waitForTimeout(2000);
    const top = await page.evaluate((s) => Math.round(document.querySelector(s).getBoundingClientRect().top), anchor);
    say(`anchor ${anchor}: lands ${top}px from the top`);
    if (top < -4 || top > 200) problems.push(`anchor ${anchor}: target ends ${top}px from the top of the viewport`);
  }
  const y0 = await page.evaluate(() => scrollY);
  await page.keyboard.press('PageDown');
  await page.waitForTimeout(1200);
  if ((await page.evaluate(() => scrollY)) <= y0) problems.push('keyboard: Page Down does not scroll the page');
  await context.close();
}

await browser.close();
console.log(`atelier check  ${url}\n`);
console.log(lines.join('\n'));
console.log(problems.length ? `\n${problems.length} to look at:\n- ${problems.join('\n- ')}` : '\nNothing to look at. Still read the frames.');
if (framesDir) console.log(`\nFrames (motion on): ${framesDir}`);
