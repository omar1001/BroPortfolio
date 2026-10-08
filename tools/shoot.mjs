#!/usr/bin/env node
// Takes website/web-app screenshots from capture recipes: content/capture/<id>.json
//   node tools/shoot.mjs                  all recipes
//   node tools/shoot.mjs jotlite boardo   only these projects
//   node tools/shoot.mjs jotlite --only editor,mobile-home
//   node tools/shoot.mjs --show           visible browser window (debugging a recipe)
// Output: content/media/<id>/<shot name>.png  (desktop preset = exactly 1600x920)
//
// Recipe shape (all keys optional except url + shots):
// {
//   "url": "https://example.com/app/",
//   "preset": "desktop" | "wide" | "mobile",      default viewport for shots
//   "colorScheme": "light" | "dark",
//   "block": ["firestore.googleapis.com"],        extra hosts to block (ads/analytics are always blocked)
//   "css": "...",                                  CSS injected into every page (hide banners etc.)
//   "localStorage": { "key": "value" },            seeded before the first page load
//   "setup": [ steps ],                            run ONCE per browser session (e.g. create demo data)
//   "extension": "C:/path/to/unpacked-extension",   load a browser extension (uses Edge, headless)
//   "serve": { "dir": ".work/demo", "port": 8765 },  serve a local folder while shooting
//   "shots": [ { "name": "board", "preset": "wide", "path": "/x", "colorScheme": "dark",
//                "steps": [ steps ], "fullPage": false, "fresh": false } ]
// }
// Shots that share a preset run in ONE browser session, in order, so state built in "setup"
// or in earlier shots carries over. "fresh": true gives a shot its own clean session.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { P } from './lib/content.mjs';
import { launch, newContext, launchWithExtension, serveDir } from './lib/browser.mjs';
import { runStep, resolveUrl } from './lib/steps.mjs';

const argv = process.argv.slice(2);
const SHOW = argv.includes('--show');
const onlyIdx = argv.indexOf('--only');
const ONLY = onlyIdx >= 0 ? argv[onlyIdx + 1].split(',') : null;
const ids = argv.filter((a, i) => !a.startsWith('--') && (onlyIdx < 0 || i !== onlyIdx + 1));

const recipeDir = P('content', 'capture');
const files = fs.readdirSync(recipeDir).filter((f) => f.endsWith('.json'))
  .filter((f) => !ids.length || ids.includes(path.basename(f, '.json')));
if (!files.length) { console.log('No recipes found in content/capture/'); process.exit(0); }

async function openSession(browser, recipe, preset, viewport, shotSeed = {}, colorScheme = null, fresh = false) {
  const ctx = recipe.extension
    ? await launchWithExtension(path.resolve(P(), recipe.extension), { preset, viewport, colorScheme: colorScheme || recipe.colorScheme })
    : await newContext(browser, {
      preset,
      viewport,
      colorScheme: colorScheme || recipe.colorScheme || 'light',
      locale: recipe.locale || 'en-US',
      block: recipe.block || [],
      allowServiceWorkers: recipe.allowServiceWorkers
    });
  const seed = { ...(recipe.localStorage || {}), ...shotSeed };
  if (Object.keys(seed).length) {
    await ctx.addInitScript((s) => {
      if (window.top !== window || sessionStorage.getItem('__bro_seeded')) return;
      for (const [k, val] of Object.entries(s)) localStorage.setItem(k, typeof val === 'string' ? val : JSON.stringify(val));
      sessionStorage.setItem('__bro_seeded', '1');
    }, seed);
  }
  if (recipe.css) {
    await ctx.addInitScript((c) => {
      const add = () => { const s = document.createElement('style'); s.textContent = c; document.documentElement.appendChild(s); };
      if (document.documentElement) add(); else document.addEventListener('DOMContentLoaded', add);
    }, recipe.css);
  }
  const page = await ctx.newPage();
  await page.goto(resolveUrl(recipe.url, recipe.startPath), { waitUntil: recipe.waitUntil || 'networkidle', timeout: 60000 });
  // "setup" belongs to the recipe's main preset; other presets may define "setups": { "mobile": [...] }.
  const mainPreset = recipe.preset || 'desktop';
  const steps = fresh ? [] : preset === mainPreset ? recipe.setup || [] : (recipe.setups || {})[preset] || [];
  for (const step of steps) await runStep(page, step, recipe);
  return { ctx, page };
}

const browser = await launch({ headless: !SHOW });
let ok = 0, failed = 0;
for (const f of files) {
  // "{HOME}" in a recipe is replaced by the user's home folder (URL-encoded inside file:/// URLs),
  // so recipes never carry a Windows user name.
  const home = os.homedir().split(path.sep).join('/');
  const raw = fs.readFileSync(path.join(recipeDir, f), 'utf8')
    .replace(/file:\/\/\/\{HOME\}([^"]*)/g, (_, rest) => 'file:///' + encodeURI(home + decodeURI(rest)))
    .replaceAll('{HOME}', home);
  const recipe = JSON.parse(raw);
  const id = recipe.id || path.basename(f, '.json');
  const outDir = P('content', 'media', id);
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`\n${id}  (${recipe.url})`);
  // "serve": { "dir": ".work/demo", "port": 8765 } serves a local demo folder while shooting.
  const server = recipe.serve ? await serveDir(path.resolve(P(), recipe.serve.dir), recipe.serve.port || 8765) : null;

  // Group shots into sessions (same preset = same session, unless "fresh").
  const groups = new Map();
  (recipe.shots || []).forEach((shot, i) => {
    if (ONLY && !ONLY.includes(shot.name)) return;
    const preset = shot.preset || recipe.preset || 'desktop';
    const viewport = shot.viewport || (shot.preset ? null : recipe.viewport) || null;
    const base = viewport ? `vp-${viewport.width}x${viewport.height}@${viewport.dpr || 1}` : preset;
    const key = shot.fresh ? `fresh-${i}` : base;
    if (!groups.has(key)) groups.set(key, { preset, viewport, shots: [], seed: shot.fresh ? shot.localStorage || {} : {}, scheme: shot.fresh ? shot.colorScheme : null, fresh: !!shot.fresh });
    groups.get(key).shots.push(shot);
  });

  for (const { preset, viewport, shots, seed, scheme, fresh } of groups.values()) {
    let session;
    try {
      session = await openSession(browser, recipe, preset, viewport, seed, scheme, fresh);
    } catch (e) {
      console.log(`  FAIL session (${preset}): ${e.message.split('\n')[0]}`);
      failed += shots.length;
      continue;
    }
    const { ctx, page } = session;
    for (const shot of shots) {
      const out = path.join(outDir, `${shot.name}.png`);
      try {
        if (shot.colorScheme) await page.emulateMedia({ colorScheme: shot.colorScheme });
        if (shot.path) await page.goto(resolveUrl(recipe.url, shot.path), { waitUntil: recipe.waitUntil || 'networkidle', timeout: 60000 });
        for (const step of shot.steps || []) await runStep(page, step, recipe);
        await page.waitForTimeout(shot.settle ?? 700);
        await page.screenshot({ path: out, fullPage: !!shot.fullPage, animations: 'disabled', caret: 'hide' });
        console.log(`  ok   ${shot.name}.png`);
        ok++;
      } catch (e) {
        console.log(`  FAIL ${shot.name}: ${e.message.split('\n')[0]}`);
        await page.screenshot({ path: path.join(outDir, `_failed-${shot.name}.png`) }).catch(() => {});
        failed++;
      }
    }
    await ctx.close();
  }
  if (server) server.close();
}
await browser.close();
console.log(`\n${ok} screenshot(s) saved, ${failed} failed`);
process.exitCode = failed ? 1 : 0;
