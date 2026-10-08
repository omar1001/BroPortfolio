// Image composition with the real browser: every kit image is an HTML layout rendered to an
// exact 1600x920 PNG (same 1.739 ratio as Khamsat's 800x460 minimum and Mostaql's thumbnail).
import fs from 'node:fs';
import path from 'node:path';
import { launch } from './browser.mjs';

export const KIT_W = 1600;
export const KIT_H = 920;

function mime(file) {
  const ext = path.extname(file).slice(1).toLowerCase();
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'gif') return 'image/gif';
  return 'image/png';
}
export function dataUrl(file) {
  return `data:${mime(file)};base64,${fs.readFileSync(file).toString('base64')}`;
}

/** Mix two #rrggbb colours: amount 0 = a, 1 = b. */
export function mix(a, b, amount) {
  const pa = a.replace('#', '').match(/../g).map((x) => parseInt(x, 16));
  const pb = b.replace('#', '').match(/../g).map((x) => parseInt(x, 16));
  return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * amount).toString(16).padStart(2, '0')).join('');
}

const BASE = `*{margin:0;padding:0;box-sizing:border-box}html,body{width:${KIT_W}px;height:${KIT_H}px;overflow:hidden}
body{position:relative;font-family:'Readex Pro','Segoe UI',Tahoma,sans-serif}img{display:block}`;

/**
 * Decorative cover (site cards, Mostaql thumbnail, Freelancer thumbnail). No text on purpose:
 * Mostaql's own advice is to avoid text in thumbnails.
 * @param {{main?: string, phone?: string, phones?: string[], accent?: string, frame?: 'browser'|'none'}} o
 */
export function coverHtml(o) {
  const accent = o.accent || '#14b8a6';
  const deep = mix(accent, '#000000', 0.55);
  const bg = `background:
    radial-gradient(900px 520px at 88% -8%, ${accent}66, transparent 70%),
    radial-gradient(700px 480px at -5% 105%, ${mix(accent, '#38bdf8', 0.5)}40, transparent 70%),
    linear-gradient(140deg, ${deep} 0%, #0b0d12 78%);`;
  const dots = `<div style="position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.07) 1px,transparent 1.2px);background-size:24px 24px;mask-image:linear-gradient(180deg,#000,transparent 85%)"></div>`;
  let body = '';
  const phones = o.phones && o.phones.length ? o.phones : null;

  if (phones && !o.main) {
    // Phones-only project: fan of up to 3 phone screens.
    const list = phones.slice(0, 3);
    const n = list.length;
    body = list.map((src, i) => {
      const center = n === 1 || i === Math.floor(n / 2);
      const h = center ? 790 : 690;
      const offset = n === 1 ? 0 : (i - (n - 1) / 2) * 330;
      const rot = center ? 0 : (i < (n - 1) / 2 ? -7 : 7);
      return `<div style="position:absolute;left:50%;top:${center ? 70 : 125}px;height:${h}px;transform:translateX(calc(-50% + ${offset}px)) rotate(${rot}deg);z-index:${center ? 3 : 1};
        border-radius:40px;padding:9px;background:#0e1014;box-shadow:0 40px 80px -24px rgba(0,0,0,.75),0 0 0 1px rgba(255,255,255,.08)">
        <img src="${src}" style="height:100%;width:auto;border-radius:32px"></div>`;
    }).join('');
  } else {
    const hasPhone = !!(o.phone || (phones && phones[0]));
    const phoneSrc = o.phone || (phones && phones[0]);
    const winW = hasPhone ? 1150 : 1200;
    const left = hasPhone ? 110 : (KIT_W - winW) / 2;
    if (o.frame === 'none') {
      body = `<div style="position:absolute;left:${left}px;top:105px;width:${winW}px;height:710px;display:flex;align-items:center;justify-content:center">
        <img src="${o.main}" style="max-width:100%;max-height:100%;border-radius:12px;box-shadow:0 40px 90px -24px rgba(0,0,0,.75),0 0 0 1px rgba(255,255,255,.1)"></div>`;
    } else {
      body = `<div style="position:absolute;left:${left}px;top:110px;width:${winW}px;border-radius:16px;overflow:hidden;background:#161a21;
        box-shadow:0 44px 90px -24px rgba(0,0,0,.75),0 0 0 1px rgba(255,255,255,.09)">
        <div style="height:38px;display:flex;align-items:center;gap:8px;padding:0 16px;background:#1d222b">
          <i style="width:12px;height:12px;border-radius:50%;background:#ff5f57"></i><i style="width:12px;height:12px;border-radius:50%;background:#febc2e"></i><i style="width:12px;height:12px;border-radius:50%;background:#28c840"></i>
          <span style="margin-left:18px;height:22px;flex:1;max-width:420px;border-radius:7px;background:#2a303b"></span></div>
        <img src="${o.main}" style="width:100%;aspect-ratio:1600/920;object-fit:cover;object-position:top"></div>`;
    }
    if (hasPhone) {
      body += `<div style="position:absolute;right:96px;top:215px;height:640px;border-radius:38px;padding:8px;background:#0e1014;z-index:2;
        box-shadow:0 40px 80px -20px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.1)"><img src="${phoneSrc}" style="height:100%;width:auto;border-radius:31px"></div>`;
    }
  }
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE}</style></head><body style="${bg}">${dots}${body}</body></html>`;
}

/** Plain gallery image: the screenshot fitted on a calm neutral background (no text, no logos). */
export function fitHtml(o) {
  const bg = o.bg || mix(o.accent || '#14b8a6', '#eef0f3', 0.93);
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE}</style></head>
  <body style="background:${bg};display:flex;align-items:center;justify-content:center">
  <img src="${o.src}" style="max-width:${KIT_W - 90}px;max-height:${KIT_H - 80}px;border-radius:12px;box-shadow:0 24px 60px -24px rgba(15,20,30,.45),0 0 0 1px rgba(15,20,30,.08)">
  </body></html>`;
}

/** 1–3 phone screens side by side on a calm background. */
export function phonesHtml(o) {
  const bg = o.bg || mix(o.accent || '#14b8a6', '#eef0f3', 0.9);
  const imgs = o.srcs.slice(0, 3).map((s) => `<img src="${s}" style="height:820px;width:auto;border-radius:34px;box-shadow:0 24px 60px -22px rgba(15,20,30,.5),0 0 0 1px rgba(15,20,30,.08)">`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE}</style></head>
  <body style="background:${bg};display:flex;align-items:center;justify-content:center;gap:56px">${imgs}</body></html>`;
}

/** Link-preview image for the home page (1200x630; text is fine here, it is not a platform upload). */
export function ogHtml(o) {
  const covers = o.covers.slice(0, 3).map((src, i) => {
    const rot = [-7, 3, -2][i];
    const pos = [[540, 70], [650, 200], [760, 330]][i];
    return `<img src="${src}" style="position:absolute;left:${pos[0]}px;top:${pos[1]}px;width:470px;border-radius:12px;transform:rotate(${rot}deg);box-shadow:0 30px 60px -20px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.1)">`;
  }).join('');
  return `<!doctype html><html><head><meta charset="utf-8">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;600&display=swap">
  <style>*{margin:0;box-sizing:border-box}html,body{width:1200px;height:630px;overflow:hidden}
  body{position:relative;font-family:'Readex Pro','Segoe UI',sans-serif;color:#edeae3;
  background:radial-gradient(700px 420px at 90% 0%,#2dd4bf55,transparent 70%),linear-gradient(140deg,#0f2a2b,#0b0d12 75%)}</style></head>
  <body>${covers}
  <div style="position:absolute;left:64px;top:96px;width:520px">
    <div style="font-size:22px;color:#2dd4bf;margin-bottom:16px">${o.kicker}</div>
    <div style="font-size:56px;font-weight:600;line-height:1.08;letter-spacing:-.02em">${o.name}</div>
    <div style="font-size:30px;margin-top:10px;color:#c9c6bf" dir="rtl">${o.nameAr}</div>
    <div style="font-size:23px;margin-top:34px;line-height:1.45;color:#c9c6bf">${o.line}</div>
  </div></body></html>`;
}

export class Composer {
  async open() {
    this.browser = await launch();
    const ctx = await this.browser.newContext({ viewport: { width: KIT_W, height: KIT_H }, deviceScaleFactor: 1 });
    this.page = await ctx.newPage();
  }
  async render(html, out, size = { width: KIT_W, height: KIT_H }) {
    if (!this.page) await this.open();
    await this.page.setViewportSize(size);
    await this.page.setContent(html, { waitUntil: 'load', timeout: 60000 });
    await this.page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((i) => (i.decode ? i.decode().catch(() => {}) : null)));
    });
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await this.page.screenshot({ path: out, type: 'png', clip: { x: 0, y: 0, ...size } });
  }
  async close() {
    if (this.browser) await this.browser.close();
    this.browser = null;
    this.page = null;
  }
}
