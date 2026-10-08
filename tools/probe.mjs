#!/usr/bin/env node
// Helper for writing capture recipes: opens a page, runs optional steps, then prints every
// visible clickable/typable element (with its position) and saves a screenshot.
//   node tools/probe.mjs <url> [steps.json | '[{"click":"text=Draw"}]'] [out.png] [--preset mobile] [--dark] [--full] [--quiet] [--until load]
import fs from 'node:fs';
import { launch, newContext } from './lib/browser.mjs';
import { runStep } from './lib/steps.mjs';

const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args.splice(i, 2)[1] : null; };
const preset = flag('--preset') || 'desktop';
const until = flag('--until') || 'networkidle';
const dark = args.includes('--dark') ? (args.splice(args.indexOf('--dark'), 1), true) : false;
const full = args.includes('--full') ? (args.splice(args.indexOf('--full'), 1), true) : false;
const quiet = args.includes('--quiet') ? (args.splice(args.indexOf('--quiet'), 1), true) : false;
const [url, stepsArg, out = 'probe.png'] = args;
const steps = !stepsArg ? [] : stepsArg.trim().startsWith('[') ? JSON.parse(stepsArg) : JSON.parse(fs.readFileSync(stepsArg, 'utf8'));

const browser = await launch();
const ctx = await newContext(browser, { preset, colorScheme: dark ? 'dark' : 'light' });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: until, timeout: 60000 });
for (const s of steps) await runStep(page, s, { url, waitUntil: until });
await page.waitForTimeout(600);
const items = await page.evaluate(() => {
  const sel = 'a,button,[role=button],[role=tab],[role=menuitem],input,textarea,select,[contenteditable=true],canvas,[onclick]';
  return [...document.querySelectorAll(sel)].map((e) => {
    const r = e.getBoundingClientRect();
    if (r.width < 1 || r.height < 1 || r.bottom < 0 || r.top > innerHeight * 3) return null;
    const cls = typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
    const txt = (e.innerText || e.value || e.getAttribute('aria-label') || e.title || e.placeholder || '').trim().replace(/\s+/g, ' ').slice(0, 40);
    return `${e.tagName.toLowerCase()}${e.id ? '#' + e.id : ''}${cls}  "${txt}"  @${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`;
  }).filter(Boolean).slice(0, 90);
});
console.log(`${page.url()}  —  ${await page.title()}`);
if (!quiet) console.log(items.join('\n'));
await page.screenshot({ path: out, fullPage: full });
console.log(`screenshot: ${out}`);
await browser.close();
