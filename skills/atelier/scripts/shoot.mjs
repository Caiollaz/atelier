#!/usr/bin/env node
// atelier shoot: screenshots of a running product for design review.
// Usage: node shoot.mjs <url|file.html> [--out dir] [--full] [--only desktop,phone] [--theme light,dark] [--wait ms]
// Desktop 1440x900 @2x; phone 390x844 @3x with an iPhone user agent (many sites serve the desktop layout otherwise).
// Needs Playwright (npm i -D playwright && npx playwright install chromium) or a local Chrome, Chromium or Edge.

import { existsSync, mkdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
};
const valueFlags = new Set(['--out', '--only', '--theme', '--wait']);
const input = args.find((a, i) => !a.startsWith('--') && !valueFlags.has(args[i - 1]));
if (!input) {
  console.error('usage: node shoot.mjs <url|file.html> [--out dir] [--full] [--only desktop,phone] [--theme light,dark] [--wait ms]');
  process.exit(2);
}

const url = /^[a-z]+:\/\//i.test(input) ? input : existsSync(input) && statSync(input).isFile() ? pathToFileURL(resolve(input)).href : `http://${input}`;
const outDir = resolve(opt('out', 'atelier-shots'));
const full = args.includes('--full');
const only = opt('only', 'desktop,phone').split(',');
const themes = opt('theme', 'light,dark').split(',');
const extraWait = Number(opt('wait', 800));

const IPHONE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, userAgent: IPHONE_UA },
};
const CONSENT = /^(accept|accept all|agree|i agree|allow|allow all|ok|okay|got it|continue|aceitar|aceito|aceitar todos|concordo|entendi|ok, entendi|aceptar|acepto|accepter|tout accepter|akzeptieren|alle akzeptieren|zustimmen|accetta|accetto)$/i;

async function loadPlaywright() {
  for (const name of ['playwright', 'playwright-core']) {
    try { return await import(name); } catch {}
    try { return createRequire(join(process.cwd(), 'package.json'))(name); } catch {}
  }
  return null;
}

function findBrowser() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const pf = process.env.PROGRAMFILES || 'C:\\Program Files';
  const pf86 = process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)';
  const local = process.env.LOCALAPPDATA || '';
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser',
    '/usr/bin/microsoft-edge', '/usr/bin/brave-browser', '/snap/bin/chromium',
    join(pf, 'Google\\Chrome\\Application\\chrome.exe'), join(pf86, 'Google\\Chrome\\Application\\chrome.exe'),
    join(local, 'Google\\Chrome\\Application\\chrome.exe'), join(pf86, 'Microsoft\\Edge\\Application\\msedge.exe'),
    join(pf, 'Microsoft\\Edge\\Application\\msedge.exe'),
  ];
  return candidates.find((p) => p && existsSync(p)) || null;
}

const pw = await loadPlaywright();
if (!pw) {
  console.error('atelier shoot: Playwright is not installed.\n  npm i -D playwright && npx playwright install chromium\n(or run this from a project that already has it)');
  process.exit(1);
}
const { chromium } = pw;
let browser;
try {
  browser = await chromium.launch();
} catch {
  const exe = findBrowser();
  if (!exe) {
    console.error('atelier shoot: no browser found. Run `npx playwright install chromium`, or set CHROME_PATH to a Chrome, Chromium or Edge binary.');
    process.exit(1);
  }
  browser = await chromium.launch({ executablePath: exe });
}

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
