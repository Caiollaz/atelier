// Shared by shoot.mjs and check.mjs: find Playwright (or a local Chrome) and turn a path into a URL.
import { existsSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const IPHONE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
export const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  wide: { viewport: { width: 2560, height: 1440 }, deviceScaleFactor: 1 },
  phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, userAgent: IPHONE_UA },
};

export const toUrl = (input) =>
  /^[a-z]+:\/\//i.test(input) ? input : existsSync(input) && statSync(input).isFile() ? pathToFileURL(resolve(input)).href : `http://${input}`;

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

// Returns a launched Chromium, or exits with a setup hint.
export async function launch(tool) {
  const pw = await loadPlaywright();
  if (!pw) {
    console.error(`atelier ${tool}: Playwright is not installed.\n  npm i -D playwright && npx playwright install chromium\n(or run this from a project that already has it)`);
    process.exit(1);
  }
  try {
    return await pw.chromium.launch();
  } catch {
    const exe = findBrowser();
    if (!exe) {
      console.error(`atelier ${tool}: no browser found. Run \`npx playwright install chromium\`, or set CHROME_PATH to a Chrome, Chromium or Edge binary.`);
      process.exit(1);
    }
    return pw.chromium.launch({ executablePath: exe });
  }
}
