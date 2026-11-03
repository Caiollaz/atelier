#!/usr/bin/env node
// atelier shoot: screenshots of a running product for design review.
// Usage: node shoot.mjs <url|file.html> [--out dir] [--full] [--only desktop,wide,phone] [--theme light,dark] [--wait ms]
// Desktop 1440x900 @2x; wide 2560x1440 @1x (a 2K monitor, where centered islands show); phone 390x844 @3x with an iPhone user agent (many sites serve the desktop layout otherwise).
// Needs Playwright (npm i -D playwright && npx playwright install chromium) or a local Chrome, Chromium or Edge.

import { mkdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { VIEWPORTS, launch, toUrl } from './browser.mjs';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
};
const valueFlags = new Set(['--out', '--only', '--theme', '--wait']);
const input = args.find((a, i) => !a.startsWith('--') && !valueFlags.has(args[i - 1]));
if (!input) {
  console.error('usage: node shoot.mjs <url|file.html> [--out dir] [--full] [--only desktop,wide,phone] [--theme light,dark] [--wait ms]');
  process.exit(2);
}

const url = toUrl(input);
const outDir = resolve(opt('out', 'atelier-shots'));
const full = args.includes('--full');
const only = opt('only', 'desktop,wide,phone').split(',');
const themes = opt('theme', 'light,dark').split(',');
const extraWait = Number(opt('wait', 800));

const CONSENT = /^(accept|accept all|agree|i agree|allow|allow all|ok|okay|got it|continue|aceitar|aceito|aceitar todos|concordo|entendi|ok, entendi|aceptar|acepto|accepter|tout accepter|akzeptieren|alle akzeptieren|zustimmen|accetta|accetto)$/i;

const browser = await launch('shoot');

mkdirSync(outDir, { recursive: true });
let host;
try { host = new URL(url).hostname.replace(/^www\./, '') || 'local'; } catch { host = 'page'; }
if (url.startsWith('file:')) host = url.split('/').pop().replace(/\.[^.]+$/, '') || 'file';
host = host.replace(/[^\w.-]+/g, '-');

const written = [];
const sizes = {};
for (const vp of only) {
  const device = VIEWPORTS[vp.trim()];
  if (!device) { console.error(`unknown viewport: ${vp}`); continue; }
  for (const theme of themes) {
    const context = await browser.newContext({ ...device, colorScheme: theme.trim() === 'dark' ? 'dark' : 'light', reducedMotion: 'reduce' });
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
      await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
      await page.waitForTimeout(extraWait);
      // Dismiss cookie and consent overlays so they do not hide the design.
      for (const button of await page.getByRole('button').all().catch(() => [])) {
        const name = ((await button.textContent().catch(() => '')) || '').trim();
        if (CONSENT.test(name) && (await button.isVisible().catch(() => false))) {
          await button.click({ timeout: 1500 }).catch(() => {});
          await page.waitForTimeout(500);
          break;
        }
      }
      // Full-page captures: scroll through once so lazy images load, then return to the top.
      if (full) {
        await page.evaluate(async () => {
          for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight / 2) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
          scrollTo(0, 0);
        }).catch(() => {});
        await page.waitForTimeout(600);
      }
      const file = join(outDir, `${host}-${vp}-${theme}.png`);
      await page.screenshot({ path: file, fullPage: full });
      written.push(file);
      sizes[`${vp}-${theme}`] = statSync(file).size;
    } finally {
      await context.close();
    }
  }
}
await browser.close();

console.log(written.join('\n'));
for (const vp of only) {
  const a = sizes[`${vp}-light`], b = sizes[`${vp}-dark`];
  if (a && b && Math.abs(a - b) / Math.max(a, b) < 0.002)
    console.log(`note: ${vp} light and dark are identical; the page probably has no dark theme (or ignores prefers-color-scheme).`);
}
console.log(`Captured with reduced motion so entrances are settled. Read each PNG before judging.`);
