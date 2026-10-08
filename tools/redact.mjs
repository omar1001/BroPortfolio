#!/usr/bin/env node
// Paints solid boxes over private details (names, paths, logos) in a screenshot.
// Never blur: blurred short text of a known format can be recovered. Solid fill only.
//   node tools/redact.mjs <in.png> <out.png> x,y,w,h[,#rrggbb] [x,y,w,h ...]
// Without a colour, each box is filled with the median colour of a 3 px ring just outside it,
// so it blends into the surrounding background.
import sharp from 'sharp';

const [input, output, ...boxes] = process.argv.slice(2);
if (!input || !output || !boxes.length) {
  console.error('usage: node tools/redact.mjs in.png out.png x,y,w,h[,#rrggbb] ...');
  process.exit(1);
}

const img = sharp(input);
const { width, height } = await img.metadata();
const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
const px = (x, y) => {
  const i = (Math.min(height - 1, Math.max(0, y)) * info.width + Math.min(width - 1, Math.max(0, x))) * info.channels;
  return [data[i], data[i + 1], data[i + 2]];
};
const median = (arr) => arr.sort((a, b) => a - b)[Math.floor(arr.length / 2)];
const hex = (rgb) => '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join('');

const rects = boxes.map((b) => {
  const [x, y, w, h, color] = b.split(',');
  const r = { x: +x, y: +y, w: +w, h: +h, color };
  if (!r.color) {
    const ring = [];
    for (let i = r.x - 3; i <= r.x + r.w + 3; i += 2) { ring.push(px(i, r.y - 3), px(i, r.y + r.h + 3)); }
    for (let j = r.y - 3; j <= r.y + r.h + 3; j += 2) { ring.push(px(r.x - 3, j), px(r.x + r.w + 3, j)); }
    r.color = hex([0, 1, 2].map((c) => median(ring.map((p) => p[c]))));
  }
  return r;
});
const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${rects
  .map((r) => `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${r.color}"/>`).join('')}</svg>`;
await sharp(input).composite([{ input: Buffer.from(svg), top: 0, left: 0 }]).png().toFile(output + '.tmp.png');
const fs = await import('node:fs');
fs.renameSync(output + '.tmp.png', output);
console.log(`redacted ${rects.length} box(es) -> ${output}`);
