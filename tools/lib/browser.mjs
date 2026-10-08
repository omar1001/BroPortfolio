// Shared headless-browser helpers. Uses the Chrome/Edge already installed on the
// machine through playwright-core, so no browser download is ever needed.
import fs from 'node:fs';
import { chromium, devices } from 'playwright-core';

const CANDIDATES = [
  process.env.BROPORTFOLIO_BROWSER,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  process.env.LOCALAPPDATA && `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

export function findBrowser() {
  for (const p of CANDIDATES) if (fs.existsSync(p)) return p;
  throw new Error('No Chrome or Edge found. Set BROPORTFOLIO_BROWSER to the browser .exe path.');
}

// Requests that must never leave a screenshot session: ads (an automated visit must not
// count as an ad impression on the owner's own AdSense), analytics, and trackers.
export const DEFAULT_BLOCK = [
  'googlesyndication.com',
  'doubleclick.net',
  'googleadservices.com',
  'adservice.google.',
  'google-analytics.com',
  'googletagmanager.com',
  'analytics.google.com',
  'firebase-analytics',
  'clarity.ms',
  'hotjar.com',
  'facebook.net',
  'connect.facebook.com',
  'plausible.io',
  'static.cloudflareinsights.com',
  'fundingchoicesmessages.google.com',
];

// Viewport presets. "desktop" renders a 1280px-wide layout at 1.25x, which yields exactly
// 1600x920 images: the size used everywhere in the upload kit (Khamsat's minimum is 800x460,
// same 1.739 ratio, so nothing gets cropped there).
export const PRESETS = {
  desktop: { viewport: { width: 1280, height: 736 }, deviceScaleFactor: 1.25 },
  wide: { viewport: { width: 1440, height: 828 }, deviceScaleFactor: 1600 / 1440 },
  xl: { viewport: { width: 1920, height: 1104 }, deviceScaleFactor: 1600 / 1920 },
  mobile: {
    ...devices['Pixel 7'],
    viewport: { width: 412, height: 870 },
    deviceScaleFactor: 2.625,
  },
};

export async function launch({ headless = true, args = [] } = {}) {
  return chromium.launch({
    executablePath: findBrowser(),
    headless,
    args: ['--hide-scrollbars', '--disable-features=Translate,MediaRouter', '--mute-audio', ...args],
  });
}

/**
 * New isolated context (fresh profile: no cookies, no logins, no history).
 * @param {import('playwright-core').Browser} browser
 * @param {{preset?: string, colorScheme?: 'light'|'dark', locale?: string, block?: string[], allowServiceWorkers?: boolean}} opts
 */
export async function newContext(browser, opts = {}) {
  const preset = opts.viewport
    ? { viewport: { width: opts.viewport.width, height: opts.viewport.height }, deviceScaleFactor: opts.viewport.dpr || 1 }
    : PRESETS[opts.preset || 'desktop'] || PRESETS.desktop;
  const ctx = await browser.newContext({
    ...preset,
    colorScheme: opts.colorScheme || 'light',
    locale: opts.locale || 'en-US',
    // Service workers would bypass request routing, so block them unless a recipe needs them.
    serviceWorkers: opts.allowServiceWorkers ? 'allow' : 'block',
    reducedMotion: 'reduce',
  });
  const blocked = [...DEFAULT_BLOCK, ...(opts.block || [])];
  await ctx.route('**/*', (route) => {
    const url = route.request().url();
    if (blocked.some((b) => url.includes(b))) return route.abort();
    return route.continue();
  });
  return ctx;
}

/**
 * A throwaway browser profile with an unpacked extension loaded (headless). Branded Chrome 137+
 * ignores --load-extension, so this prefers Microsoft Edge, which still accepts it.
 */
export async function launchWithExtension(extDir, opts = {}) {
  const os = await import('node:os');
  const path = await import('node:path');
  const edge = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find((p) => fs.existsSync(p));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'bro-ext-'));
  const preset = opts.viewport
    ? { viewport: { width: opts.viewport.width, height: opts.viewport.height }, deviceScaleFactor: opts.viewport.dpr || 1 }
    : PRESETS[opts.preset || 'desktop'] || PRESETS.desktop;
  const ctx = await chromium.launchPersistentContext(profile, {
    executablePath: process.env.BROPORTFOLIO_EXT_BROWSER || edge || findBrowser(),
    headless: true,
    ...preset,
    colorScheme: opts.colorScheme || 'dark',
    args: [`--disable-extensions-except=${extDir}`, `--load-extension=${extDir}`, '--headless=new', '--autoplay-policy=no-user-gesture-required', '--mute-audio', '--hide-scrollbars']
  });
  const close = ctx.close.bind(ctx);
  ctx.close = async () => { await close(); fs.rmSync(profile, { recursive: true, force: true }); };
  return ctx;
}

/** Tiny static file server (with HTTP range support for video) for local demo pages. */
export async function serveDir(dir, port) {
  const http = await import('node:http');
  const path = await import('node:path');
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.mp4': 'video/mp4', '.webm': 'video/webm', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
  const server = http.createServer((req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]);
    if (rel.endsWith('/')) rel += 'index.html';
    const f = path.join(dir, rel);
    if (!f.startsWith(path.resolve(dir)) || !fs.existsSync(f)) { res.writeHead(404).end(); return; }
    const size = fs.statSync(f).size;
    const type = types[path.extname(f).toLowerCase()] || 'application/octet-stream';
    const range = req.headers.range;
    if (range) {
      const [a, b] = range.replace('bytes=', '').split('-');
      const start = Number(a), end = b ? Number(b) : size - 1;
      res.writeHead(206, { 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1, 'Content-Type': type });
      fs.createReadStream(f, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' });
      fs.createReadStream(f).pipe(res);
    }
  });
  await new Promise((r) => server.listen(port, '127.0.0.1', r));
  return server;
}
