#!/usr/bin/env node
// Export the portfolio into ANOTHER website (for example your company's site) as typed data + WebP images.
//   node tools/export.mjs                       lists the export targets (content/exports/*.js)
//   node tools/export.mjs <target>              build, then write the data + images into the target site
//   node tools/export.mjs <target> --publish    ...then lint + build the target site, put it on a private
//                                               preview link, and publish it after you answer "y"
//   add --yes to publish without the question (only for something you start on purpose)
// One file per target, content/exports/<target>.js, says which projects go there and in what order,
// which links, texts in the site's own voice, and which screenshots to leave out or paint over.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import sharp from 'sharp';
import { P, loadContent, visibleProjects } from './lib/content.mjs';
import { redact } from './lib/redact.mjs';
import { firebase } from './lib/firebase.mjs';

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith('--'));
const PUBLISH = args.includes('--publish');
const YES = args.includes('--yes');
const NO_BUILD = args.includes('--no-build');
const fail = (msg) => { console.error('\n' + msg); process.exit(1); };
const warns = [];
const warn = (m) => { warns.push(m); console.warn('  ! ' + m); };

const EXPORTS = P('content', 'exports');
if (!target) {
  const names = fs.existsSync(EXPORTS) ? fs.readdirSync(EXPORTS).filter((f) => f.endsWith('.js')).map((f) => f.slice(0, -3)) : [];
  console.log(names.length ? `Export targets: ${names.join(', ')}\nUsage: node tools/export.mjs <target> [--publish]` : 'No export targets yet — add content/exports/<name>.js');
  process.exit(0);
}

function runScript(file, global) {
  const sandbox = { window: {} };
  sandbox.globalThis = sandbox.window;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
  return sandbox.window[global];
}

const cfgFile = path.join(EXPORTS, `${target}.js`);
if (!fs.existsSync(cfgFile)) fail(`No export target "${target}" — expected ${path.relative(P(), cfgFile)}`);
const cfg = runScript(cfgFile, 'BRO_EXPORT');
if (!cfg) fail(`${path.relative(P(), cfgFile)} must set window.BRO_EXPORT = { ... }`);

const SITE = path.resolve(P(), cfg.site);
if (!fs.existsSync(SITE)) fail(`Target site folder not found: ${SITE}`);
const DATA_FILE = path.join(SITE, cfg.dataFile);
const IMG_DIR = path.join(SITE, cfg.imagesDir);
const IMG_URL = String(cfg.imagesUrl || '/work').replace(/\/$/, '');
const MARK = '.bro-export';

// Same rule as tools/build.mjs: a gallery image is written as "NN-<slug>.webp".
const slug = (s) => String(s).toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const shotKey = (src) => path.basename(src, '.webp').replace(/^\d+-/, '');
const bi = (v) => (v && typeof v === 'object' ? { ar: v.ar ?? v.en ?? '', en: v.en ?? v.ar ?? '' } : { ar: String(v ?? ''), en: String(v ?? '') });
const hostOf = (url) => { try { return new URL(url).hostname.toLowerCase(); } catch { return ''; } };

async function main() {
  console.log(`Export → ${cfg.name || target}  (${SITE})`);

  // 1. A fresh portfolio build gives the WebP images and dist/data/media.js (the image list per project).
  if (!NO_BUILD) {
    const r = spawnSync('node tools/build.mjs', { stdio: 'inherit', shell: true, cwd: P() });
    if (r.status !== 0) fail('BroPortfolio build failed — nothing was exported.');
  }
  const media = runScript(P('dist', 'data', 'media.js'), 'BRO_MEDIA');
  if (!media) fail('dist/data/media.js is missing — run the build first.');

  // 2. Which projects, in which order.
  const { projects } = loadContent();
  const exclude = new Set(cfg.exclude || []);
  const vis = visibleProjects(projects).filter((p) => !exclude.has(p.id));
  const rank = new Map((cfg.order || []).map((id, i) => [id, i]));
  for (const id of rank.keys()) if (!vis.some((p) => p.id === id)) warn(`"order" lists "${id}", which is hidden, excluded or unknown`);
  const selected = vis.slice().sort((a, b) => (rank.get(a.id) ?? 1000 + vis.indexOf(a)) - (rank.get(b.id) ?? 1000 + vis.indexOf(b)));
  const added = selected.filter((p) => !rank.has(p.id)).map((p) => p.id);
  if (added.length) console.log(`  new (not in "order", placed last): ${added.join(', ')}`);
  for (const id of Object.keys(cfg.overrides || {})) if (!selected.some((p) => p.id === id)) warn(`override for "${id}", which is not exported`);

  // 3. Images go to a temporary folder first, then replace the old set in one move.
  if (fs.existsSync(IMG_DIR) && fs.readdirSync(IMG_DIR).length && !fs.existsSync(path.join(IMG_DIR, MARK))) {
    fail(`${IMG_DIR} holds files this tool did not write — refusing to replace them. Point "imagesDir" at a new folder.`);
  }
  const TMP = IMG_DIR + '.tmp';
  fs.rmSync(TMP, { recursive: true, force: true });
  fs.mkdirSync(TMP, { recursive: true });
  fs.writeFileSync(path.join(TMP, MARK), `Written by BroPortfolio tools/export.mjs (${target}) — do not edit; export again instead.\n`);

  async function emit(id, buf, base) {
    const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
    const file = `${base}.${hash}.webp`;
    fs.mkdirSync(path.join(TMP, id), { recursive: true });
    fs.writeFileSync(path.join(TMP, id, file), buf);
    return `${IMG_URL}/${id}/${file}`;
  }
  const distFile = (src) => P('dist', ...src.split('/'));
  const thumbOf = (buf, width) => sharp(buf).resize({ width, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toBuffer();

  const out = [];
  for (const p of selected) {
    const o = (cfg.overrides || {})[p.id] || {};
    const m = media[p.id];
    if (!m || !m.gallery?.length) { warn(`${p.id}: no screenshots — skipped`); continue; }

    const services = [...new Set([cfg.services?.[p.category], ...((cfg.extraServices || {})[p.id] || [])].filter(Boolean))];
    if (!services.length) fail(`${p.id}: category "${p.category}" has no entry in "services" of ${path.basename(cfgFile)}`);
    for (const s of services) if (cfg.serviceIds && !cfg.serviceIds.includes(s)) fail(`${p.id}: "${s}" is not one of serviceIds`);
    if (cfg.statuses && !cfg.statuses.includes(p.status)) fail(`${p.id}: status "${p.status}" is not one of statuses`);

    // Screenshots: skip / caption / redact by source file name.
    const skip = new Set((o.skipImages || []).map(slug));
    const caps = Object.fromEntries(Object.entries(o.captions || {}).map(([k, v]) => [slug(k), v]));
    const boxes = Object.fromEntries(Object.entries(o.redact || {}).map(([k, v]) => [slug(k), v]));
    const used = new Set();
    const images = [];
    for (const g of m.gallery) {
      const key = shotKey(g.src);
      if (skip.has(key)) { used.add(key); continue; }
      let full = fs.readFileSync(distFile(g.src));
      let thumb = fs.readFileSync(distFile(g.thumb));
      if (boxes[key]) {
        used.add(key);
        full = await (await redact(full, boxes[key])).webp({ quality: 84, effort: 5 }).toBuffer();
        thumb = await thumbOf(full, 480);
      }
      if (caps[key]) used.add(key);
      const base = path.basename(g.src, '.webp');
      images.push({
        key, full,
        src: await emit(p.id, full, base),
        thumb: await emit(p.id, thumb, `${base}-t`),
        w: g.w, h: g.h,
        caption: caps[key] ? bi(caps[key]) : g.caption ? bi(g.caption) : null
      });
    }
    for (const k of [...skip, ...Object.keys(caps), ...Object.keys(boxes)]) if (!used.has(k)) warn(`${p.id}: no screenshot "${k}" to skip/caption/redact`);
    if (!images.length) { warn(`${p.id}: every screenshot was skipped — project left out`); continue; }

    // Cover: the composed card picture, or one of the (possibly redacted) screenshots.
    let cover;
    if (o.coverImage) {
      const img = images.find((x) => x.key === slug(o.coverImage));
      if (!img) fail(`${p.id}: coverImage "${o.coverImage}" is not among the exported screenshots`);
      cover = { src: img.src, srcW: img.w, thumb: await emit(p.id, await thumbOf(img.full, 800), 'cover-t'), thumbW: 800, w: img.w, h: img.h };
    } else if (m.cover) {
      cover = {
        src: await emit(p.id, fs.readFileSync(distFile(m.cover.src)), 'cover'), srcW: m.cover.w,
        thumb: await emit(p.id, fs.readFileSync(distFile(m.cover.thumb)), 'cover-t'), thumbW: 800,
        w: m.cover.w, h: m.cover.h
      };
    } else {
      const img = images[0];
      cover = { src: img.src, srcW: img.w, thumb: img.thumb, thumbW: 480, w: img.w, h: img.h };
    }

    // Links: only the kinds and hosts the target allows.
    const L = cfg.links || {};
    const blocked = (url) => (L.blockHosts || []).some((h) => hostOf(url) === h || hostOf(url).endsWith('.' + h));
    const links = [];
    const l = p.links || {};
    if (L.live && l.live && !blocked(l.live)) links.push({ kind: 'live', url: l.live, label: null });
    if (L.other) for (const x of l.other || []) if (x?.url && !blocked(x.url)) links.push({ kind: 'other', url: x.url, label: x.label ? bi(x.label) : null });
    if (L.github && l.github && !blocked(l.github)) links.push({ kind: 'code', url: l.github, label: null });

    const pick = (f) => o[f] ?? p[f];
    const feats = pick('features') || {};
    out.push({
      id: p.id,
      services,
      status: p.status,
      client: !!p.client,
      accent: p.accent || '#6366f1',
      title: bi(pick('title')),
      subtitle: bi(pick('subtitle')),
      summary: bi(pick('summary')),
      description: bi(pick('description')),
      features: { ar: feats.ar || feats.en || [], en: feats.en || feats.ar || [] },
      tech: pick('tech') || [],
      links,
      cover,
      images: images.map(({ src, thumb, w, h, caption }) => ({ src, thumb, w, h, caption }))
    });
  }

  // 4. Guard: the target's forbidden words never leave this machine.
  const text = JSON.stringify(out);
  const hits = (cfg.forbid || []).filter((re) => re.test(text));
  if (hits.length) {
    fs.rmSync(TMP, { recursive: true, force: true });
    for (const p of out) {
      const s = JSON.stringify(p);
      for (const re of hits) if (re.test(s)) console.error(`  x ${p.id}: matches ${re}`);
    }
    fail(`Forbidden words found (see "forbid" in ${path.basename(cfgFile)}) — nothing was written.`);
  }

  // 5. Write: images (one move), then the data module.
  fs.rmSync(IMG_DIR, { recursive: true, force: true });
  fs.renameSync(TMP, IMG_DIR);
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  const typesImport = './' + path.basename(cfg.typesFile || 'types', '.ts');
  fs.writeFileSync(DATA_FILE, [
    `// GENERATED by BroPortfolio — \`node tools/export.mjs ${target}\`. Do not edit by hand: change the project in`,
    `// BroPortfolio's content/ (or content/exports/${target}.js) and export again. Shape: ${typesImport}.ts`,
    `import type { WorkProject } from '${typesImport}';`,
    '',
    `export const workProjects: WorkProject[] = ${JSON.stringify(out, null, 2)};`,
    ''
  ].join('\n'));

  const files = fs.readdirSync(IMG_DIR, { recursive: true }).filter((f) => String(f).endsWith('.webp'));
  const bytes = files.reduce((n, f) => n + fs.statSync(path.join(IMG_DIR, String(f))).size, 0);
  console.log(`  ${out.length} projects → ${path.relative(SITE, DATA_FILE)}`);
  console.log(`  ${files.length} images (${(bytes / 1048576).toFixed(1)} MB) → ${path.relative(SITE, IMG_DIR)}`);
  if (warns.length) console.log(`  ${warns.length} warning(s) above`);

  if (PUBLISH) await publish();
}

// ---- --publish: lint + build the target, preview link, then production after a "y" ----
function sh(cmd) {
  // "firebase …" runs through node directly (see lib/firebase.mjs); everything else through the shell.
  if (/^firebase\s/.test(cmd)) return firebase(cmd.split(/\s+/).slice(1), { cwd: SITE });
  return spawnSync(cmd, { stdio: 'inherit', shell: true, cwd: SITE });
}
function git(gitArgs) { return spawnSync('git', gitArgs, { cwd: SITE, encoding: 'utf8' }); }

async function publish() {
  const pub = cfg.publish || {};
  const own = [cfg.dataFile, cfg.imagesDir].map((f) => f.replace(/\\/g, '/').replace(/\/$/, ''));
  // allowDirty: exact files, or folders ending in "/" (things that never reach the published site).
  const allowed = (pub.allowDirty || []).map((f) => f.replace(/\\/g, '/'));
  const isAllowed = (f) => allowed.some((a) => (a.endsWith('/') ? f.startsWith(a) : f === a));

  // Never put someone's half-finished work online: only our own files (and the allowed ones) may differ.
  const st = git(['status', '--porcelain', '--untracked-files=all']);
  if (st.status === 0) {
    const dirty = st.stdout.split('\n').filter(Boolean).map((line) => line.slice(3).replace(/^"|"$/g, ''))
      .filter((f) => !own.some((o) => f === o || f.startsWith(o + '/')) && !isAllowed(f));
    if (dirty.length) fail(`The site has other unsaved (uncommitted) changes — not publishing, so unfinished work is not put online:\n  ${dirty.join('\n  ')}\nCommit or undo them, then run this again.`);
  }
  for (const [label, cmd] of [['lint', pub.lint], ['build', pub.build]]) {
    if (!cmd) continue;
    console.log(`\n— ${label}: ${cmd}`);
    if (sh(cmd).status !== 0) fail(`${label} failed — nothing was published.`);
  }
  if (pub.preview) {
    console.log(`\n— private preview: ${pub.preview}`);
    if (sh(pub.preview).status !== 0) fail('Preview deploy failed — nothing was published.');
    console.log('Open the preview link printed above and check it.');
  }
  if (!pub.production) return;
  if (!YES) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const answer = (await rl.question(`\nPublish to ${pub.url || 'the live site'} now? Type y and press Enter (anything else stops): `)).trim().toLowerCase();
    rl.close();
    if (answer !== 'y' && answer !== 'yes') { console.log('Not published. The export is saved; run this again when ready.'); return; }
  }
  console.log(`\n— publish: ${pub.production}`);
  if (sh(pub.production).status !== 0) fail('Publishing failed — the live site was not changed.');
  console.log(`\nPublished: ${pub.url || ''}`);

  if (pub.commitMessage && st.status === 0) {
    git(['add', '--', ...own]);
    const changed = git(['diff', '--cached', '--quiet', '--', ...own]).status === 1;
    if (changed) {
      const c = git(['commit', '-m', pub.commitMessage, '--', ...own]);
      console.log(c.status === 0 ? `Saved in the site's git history: "${pub.commitMessage}"` : `(git commit skipped: ${c.stderr.trim()})`);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
