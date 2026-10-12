#!/usr/bin/env node
// Build: content/ + web/  ->  dist/ (the website, ready to publish)  +  kit/ (upload kit).
//   node tools/build.mjs            incremental (only re-renders images whose inputs changed)
//   node tools/build.mjs --force    re-render every image
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { P, loadContent, t, visibleProjects } from './lib/content.mjs';
import { Composer, coverHtml, fitHtml, phonesHtml, ogHtml, dataUrl, KIT_W, KIT_H } from './lib/compose.mjs';
import { buildKit, kitTxt } from './lib/kit-text.mjs';

const FORCE = process.argv.includes('--force');
const DIST = P('dist');
const KIT = P('kit');
const MEDIA = P('content', 'media');
const CACHE_FILE = P('kit', '.cache.json');
const warnings = [];
const warn = (m) => { warnings.push(m); console.warn('  ! ' + m); };

const rel = (abs) => path.relative(P(), abs).split(path.sep).join('/');
const slug = (s) => String(s).toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const pad = (n) => String(n).padStart(2, '0');

function readCache() { try { return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')); } catch { return {}; } }
function fileSig(f) { const s = fs.statSync(f); return `${path.basename(f)}:${s.size}:${Math.round(s.mtimeMs)}`; }
function keyOf(obj) { return crypto.createHash('sha1').update(JSON.stringify(obj)).digest('hex'); }

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

function escAttr(s) { return String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

function headTags({ title, description, url, image, siteName }) {
  const tags = [
    `<title>${escAttr(title)}</title>`,
    `<meta name="description" content="${escAttr(description)}">`,
    `<meta name="theme-color" content="#0d0f13">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${escAttr(siteName)}">`,
    `<meta property="og:title" content="${escAttr(title)}">`,
    `<meta property="og:description" content="${escAttr(description)}">`,
    `<meta name="twitter:card" content="summary_large_image">`
  ];
  if (url) tags.push(`<link rel="canonical" href="${escAttr(url)}">`, `<meta property="og:url" content="${escAttr(url)}">`);
  if (image) tags.push(`<meta property="og:image" content="${escAttr(image)}">`, `<meta name="twitter:image" content="${escAttr(image)}">`);
  return tags.join('\n');
}

async function main() {
  const started = Date.now();
  const { profile, projects } = loadContent();
  const vis = visibleProjects(projects);
  const siteUrl = String(profile.siteUrl || '').replace(/\/$/, '');
  console.log(`BroPortfolio build — ${vis.length} visible projects${siteUrl ? ' — ' + siteUrl : ''}`);

  // ---- 1. Validate ----
  const ids = new Set();
  for (const p of projects) {
    if (!p.id || !/^[a-z0-9-]+$/.test(p.id)) throw new Error(`Project id "${p.id}" must use only a-z, 0-9 and "-"`);
    if (ids.has(p.id)) throw new Error(`Duplicate project id "${p.id}"`);
    ids.add(p.id);
    for (const f of ['title', 'subtitle', 'summary', 'description']) {
      if (!t(p[f], 'en')) warn(`${p.id}: missing English ${f}`);
      if (p[f] && typeof p[f] === 'object' && !p[f].ar) warn(`${p.id}: missing Arabic ${f}`);
    }
  }

  // ---- 2. Compose kit images (cached) ----
  const cache = FORCE ? {} : readCache();
  const newCache = {};
  const composer = new Composer();
  let rendered = 0, reused = 0;

  async function produce(out, template, opts, inputs) {
    const key = keyOf({ template, opts, inputs: inputs.map(fileSig), v: 3 });
    newCache[rel(out)] = key;
    if (cache[rel(out)] === key && fs.existsSync(out)) { reused++; return; }
    const html = template === 'copy' ? null : template(opts.urls ? { ...opts, ...opts.urls(inputs) } : opts);
    if (template === 'copy') {
      await sharp(inputs[0]).resize(KIT_W, KIT_H, { fit: 'cover', position: opts.position || 'top' }).png({ compressionLevel: 9 }).toFile(out);
    } else {
      await composer.render(html, out);
    }
    rendered++;
  }

  const kitImages = {}; // id -> { cover, gallery[], khamsat[] } (paths relative to project root)
  const mediaManifest = {}; // id -> { cover, gallery } for the website

  for (const p of vis) {
    const dir = path.join(MEDIA, p.id);
    const outDir = path.join(KIT, p.id);
    fs.mkdirSync(outDir, { recursive: true });
    const accent = p.accent || '#14b8a6';
    const src = (f) => path.join(dir, f);
    const exists = (f) => { const ok = fs.existsSync(src(f)); if (!ok) warn(`${p.id}: image not found: content/media/${p.id}/${f}`); return ok; };

    const gallery = [];
    let n = 0;
    for (const img of p.images || []) {
      const files = (img.files || [img.file]).filter(Boolean).filter(exists);
      if (!files.length) continue;
      n++;
      const base = slug(img.name || files[0]);
      const out = path.join(outDir, `${pad(n)}-${base}.png`);
      const abs = files.map(src);
      if (files.length > 1) {
        await produce(out, phonesHtml, { accent, urls: (ins) => ({ srcs: ins.map(dataUrl) }) }, abs);
      } else {
        const meta = await sharp(abs[0]).metadata();
        const ratio = meta.width / meta.height;
        if (img.crop || (img.fit !== true && Math.abs(ratio - KIT_W / KIT_H) < 0.012 && meta.width >= 1200)) {
          await produce(out, 'copy', { position: img.crop === 'center' || img.crop === true ? 'centre' : 'top' }, abs);
        } else if (meta.height > meta.width) {
          await produce(out, phonesHtml, { accent, urls: (ins) => ({ srcs: ins.map(dataUrl) }) }, abs);
        } else {
          await produce(out, fitHtml, { accent, urls: (ins) => ({ src: dataUrl(ins[0]) }) }, abs);
        }
      }
      gallery.push({ out, caption: img.caption || null, khamsat: img.khamsat !== false });
    }

    // Cover (decorative) — falls back to the first gallery image.
    const c = p.cover || {};
    const coverInputs = [];
    const coverOpts = { accent, frame: c.frame || 'browser' };
    if (c.main && exists(c.main)) coverInputs.push(src(c.main));
    const phoneList = (c.phones || (c.phone ? [c.phone] : [])).filter(exists).map(src);
    let coverOut = null;
    if (coverInputs.length || phoneList.length || gallery.length) {
      coverOut = path.join(outDir, '00-cover.png');
      const mainAbs = coverInputs[0] || (!phoneList.length && gallery[0] ? gallery[0].out : null);
      const allIn = [mainAbs, ...phoneList].filter(Boolean);
      await produce(coverOut, coverHtml, {
        ...coverOpts,
        hasMain: !!mainAbs,
        phonesOnly: !mainAbs,
        urls: (ins) => {
          const urls = ins.map(dataUrl);
          return mainAbs ? (phoneList.length ? { main: urls[0], phone: urls[1] } : { main: urls[0] }) : { phones: urls };
        }
      }, allIn);
    } else warn(`${p.id}: no images yet — the site shows a placeholder`);

    kitImages[p.id] = {
      cover: coverOut ? rel(coverOut) : '',
      gallery: gallery.map((g) => rel(g.out)),
      khamsat: gallery.filter((g) => g.khamsat).map((g) => g.out)
    };

    // Website images (WebP) from the kit PNGs.
    const webDir = path.join(DIST, 'img', p.id);
    fs.mkdirSync(webDir, { recursive: true });
    async function webp(input, name, width) {
      const out = path.join(webDir, name);
      if (!FORCE && fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(input).mtimeMs) return out;
      await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: width > 1000 ? 84 : 80, effort: 5 }).toFile(out);
      return out;
    }
    const entry = { cover: null, gallery: [] };
    if (coverOut) {
      await webp(coverOut, 'cover.webp', 1600);
      await webp(coverOut, 'cover-t.webp', 800);
      entry.cover = { src: `img/${p.id}/cover.webp`, thumb: `img/${p.id}/cover-t.webp`, w: KIT_W, h: KIT_H };
    }
    for (const g of gallery) {
      const base = path.basename(g.out, '.png');
      await webp(g.out, `${base}.webp`, 1600);
      await webp(g.out, `${base}-t.webp`, 480);
      entry.gallery.push({ src: `img/${p.id}/${base}.webp`, thumb: `img/${p.id}/${base}-t.webp`, w: KIT_W, h: KIT_H, caption: g.caption });
    }
    mediaManifest[p.id] = entry;

    // Drop images left by an earlier build: a removed or renamed screenshot must not linger in the kit
    // folder (it would get uploaded to a platform) or on the website.
    const keepKit = new Set([coverOut, ...gallery.map((g) => g.out)].filter(Boolean).map((f) => path.basename(f)));
    for (const f of fs.readdirSync(outDir)) if (f.endsWith('.png') && !keepKit.has(f)) fs.rmSync(path.join(outDir, f));
    const keepWeb = new Set([entry.cover, ...entry.gallery].filter(Boolean).flatMap((e) => [e.src, e.thumb]).map((s) => path.basename(s)));
    for (const f of fs.readdirSync(webDir)) if (!keepWeb.has(f)) fs.rmSync(path.join(webDir, f));
  }

  // ---- 3. Khamsat service bundles (plain screenshots only, 4–12 per service) ----
  const khamsatImages = {};
  for (const s of profile.khamsat || []) {
    const dir = path.join(KIT, 'khamsat', s.id);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    const pools = (s.projects || []).map((id) => (kitImages[id] ? kitImages[id].khamsat.slice() : [])).filter((x) => x.length);
    const picked = [];
    while (picked.length < 12 && pools.some((x) => x.length)) for (const pool of pools) if (pool.length && picked.length < 12) picked.push(pool.shift());
    if (picked.length < 4) warn(`khamsat/${s.id}: only ${picked.length} images (Khamsat needs at least 4)`);
    khamsatImages[s.id] = picked.map((f, i) => {
      const out = path.join(dir, `${pad(i + 1)}-${path.basename(path.dirname(f))}-${path.basename(f).replace(/^\d+-/, '')}`);
      fs.copyFileSync(f, out);
      return rel(out);
    });
  }

  // ---- 4. Kit texts ----
  const { kit, problems } = buildKit(profile, projects, { siteUrl, kitImages, khamsatImages });
  for (const it of kit.mostaql) fs.writeFileSync(path.join(KIT, it.id, 'mostaql.txt'), kitTxt(it, 'mostaql'));
  for (const it of kit.freelancer) fs.writeFileSync(path.join(KIT, it.id, 'freelancer.txt'), kitTxt(it, 'freelancer'));
  for (const it of kit.khamsat) fs.writeFileSync(path.join(KIT, 'khamsat', it.id, 'khamsat.txt'), kitTxt(it, 'khamsat'));
  fs.writeFileSync(path.join(KIT, 'README.txt'), [
    'BroPortfolio upload kit — generated, do not edit by hand (run the build again instead).',
    '',
    'kit/<project>/00-cover.png      thumbnail (Mostaql "صورة مصغرة", Freelancer thumbnail)',
    'kit/<project>/01-...png ...     the images, in upload order (all 1600x920)',
    'kit/<project>/mostaql.txt       Arabic texts for Mostaql',
    'kit/<project>/freelancer.txt    English texts for Freelancer.com',
    'kit/khamsat/<service>/          4-12 plain images + khamsat.txt for one Khamsat service',
    '',
    'Easier: open dist/kit.html (or <your site>/kit.html) — it has a Copy button for every field.'
  ].join('\n'));

  // ---- 5. Website ----
  fs.rmSync(path.join(DIST, 'assets'), { recursive: true, force: true });
  copyDir(P('web', 'assets'), path.join(DIST, 'assets'));
  fs.mkdirSync(path.join(DIST, 'data'), { recursive: true });
  fs.copyFileSync(P('content', 'profile.js'), path.join(DIST, 'data', 'profile.js'));
  fs.copyFileSync(P('content', 'projects.js'), path.join(DIST, 'data', 'projects.js'));
  fs.writeFileSync(path.join(DIST, 'data', 'media.js'), `// generated by tools/build.mjs\nwindow.BRO_MEDIA = ${JSON.stringify(mediaManifest)};\n`);
  fs.writeFileSync(path.join(DIST, 'data', 'kit.js'), `// generated by tools/build.mjs\nwindow.BRO_KIT = ${JSON.stringify(kit)};\n`);

  // Link-preview image for the home page.
  const ogOut = path.join(DIST, 'og.png');
  const ogCovers = vis.map((p) => kitImages[p.id]?.cover).filter(Boolean).slice(0, 3).map((r) => P(r));
  if (ogCovers.length) {
    const ogKey = keyOf({ ogCovers: ogCovers.map(fileSig), name: profile.name, v: 2 });
    newCache['dist/og.png'] = ogKey;
    if (cache['dist/og.png'] !== ogKey || !fs.existsSync(ogOut)) {
      await composer.render(ogHtml({
        covers: ogCovers.map(dataUrl),
        kicker: t(profile.ogKicker, 'en') || 'Portfolio',
        name: t(profile.name, 'en'),
        nameAr: t(profile.name, 'ar'),
        line: t(profile.ogLine, 'en') || t(profile.lead, 'en')
      }), ogOut, { width: 1200, height: 630 });
      rendered++;
    }
  }
  await composer.close();

  const siteName = `${t(profile.name, 'en')} — Portfolio`;
  const tpl = (name) => fs.readFileSync(P('web', name), 'utf8');
  const homeTitle = `${t(profile.name, 'en')} | ${t(profile.name, 'ar')} — ${t(profile.role, 'en')}`;
  const homeDesc = `${t(profile.lead, 'ar')} — ${t(profile.lead, 'en')}`;
  fs.writeFileSync(path.join(DIST, 'index.html'), tpl('index.html')
    .replaceAll('{{ROOT}}', '')
    .replace('{{HEAD}}', headTags({ title: homeTitle, description: homeDesc, url: siteUrl ? siteUrl + '/' : '', image: siteUrl ? siteUrl + '/og.png' : '', siteName })));
  fs.writeFileSync(path.join(DIST, 'kit.html'), tpl('kit.html').replaceAll('{{ROOT}}', ''));

  fs.rmSync(path.join(DIST, 'p'), { recursive: true, force: true });
  for (const p of vis) {
    const dir = path.join(DIST, 'p', p.id);
    fs.mkdirSync(dir, { recursive: true });
    const title = `${t(p.title, 'en')} — ${t(p.subtitle, 'en')} | ${t(p.subtitle, 'ar')}`;
    const desc = `${t(p.summary, 'ar')} — ${t(p.summary, 'en')}`;
    fs.writeFileSync(path.join(dir, 'index.html'), tpl('project.html')
      .replaceAll('{{ROOT}}', '../../')
      .replaceAll('{{PROJECT_ID}}', p.id)
      .replace('{{HEAD}}', headTags({
        title, description: desc,
        url: siteUrl ? `${siteUrl}/p/${p.id}/` : '',
        image: siteUrl && mediaManifest[p.id]?.cover ? `${siteUrl}/${mediaManifest[p.id].cover.src}` : '',
        siteName
      })));
  }
  // Remove website images and kit folders of projects that no longer exist / are hidden.
  for (const d of fs.existsSync(path.join(DIST, 'img')) ? fs.readdirSync(path.join(DIST, 'img')) : []) {
    if (!vis.some((p) => p.id === d)) fs.rmSync(path.join(DIST, 'img', d), { recursive: true, force: true });
  }
  for (const e of fs.readdirSync(KIT, { withFileTypes: true })) {
    if (e.isDirectory() && e.name !== 'khamsat' && !vis.some((p) => p.id === e.name)) fs.rmSync(path.join(KIT, e.name), { recursive: true, force: true });
  }

  fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nDisallow: /kit.html\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`);
  if (siteUrl) {
    const urls = [`${siteUrl}/`, ...vis.map((p) => `${siteUrl}/p/${p.id}/`)];
    fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
  }
  // Cloudflare Pages / Firebase-compatible cache headers for the heavy, rarely-changing files.
  fs.writeFileSync(path.join(DIST, '_headers'), '/img/*\n  Cache-Control: public, max-age=604800\n/assets/*\n  Cache-Control: public, max-age=86400\n/kit.html\n  X-Robots-Tag: noindex\n');

  fs.writeFileSync(CACHE_FILE, JSON.stringify(newCache, null, 1));

  console.log(`  images: ${rendered} rendered, ${reused} reused`);
  console.log(`  site:   dist/index.html   (open it, or run Preview.bat)`);
  console.log(`  kit:    kit/  and  dist/kit.html`);
  if (warnings.length) console.log(`  ${warnings.length} warning(s) above`);
  if (problems.length) {
    console.error('\nCONTACT INFO FOUND IN PLATFORM TEXTS (Mostaql/Khamsat forbid it) — fix these:');
    problems.forEach((x) => console.error('  x ' + x));
    process.exitCode = 1;
  }
  console.log(`done in ${((Date.now() - started) / 1000).toFixed(1)}s`);
}

main().catch((e) => { console.error(e); process.exit(1); });
