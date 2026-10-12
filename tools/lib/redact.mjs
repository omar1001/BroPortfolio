// Solid-box redaction, shared by tools/redact.mjs and tools/export.mjs.
// Never blur: blurred short text of a known format can be recovered. Solid fill only.
// A box without a colour takes the median colour of a 3 px ring just outside it, so it blends into
// the surrounding background.
import sharp from 'sharp';

/** "x,y,w,h" or "x,y,w,h,#rrggbb" -> { x, y, w, h, color } */
export function parseBox(text) {
  const [x, y, w, h, color] = String(text).split(',');
  return { x: +x, y: +y, w: +w, h: +h, color };
}

/** Returns a sharp pipeline of `input` (file path or Buffer) with every box painted over. */
export async function redact(input, boxes) {
  const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const px = (x, y) => {
    const i = (Math.min(height - 1, Math.max(0, y)) * width + Math.min(width - 1, Math.max(0, x))) * channels;
    return [data[i], data[i + 1], data[i + 2]];
  };
  const median = (arr) => arr.sort((a, b) => a - b)[Math.floor(arr.length / 2)];
  const hex = (rgb) => '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join('');

  const rects = boxes.map((b) => {
    const r = typeof b === 'string' ? parseBox(b) : { ...b };
    if (!r.color) {
      const ring = [];
      for (let i = r.x - 3; i <= r.x + r.w + 3; i += 2) ring.push(px(i, r.y - 3), px(i, r.y + r.h + 3));
      for (let j = r.y - 3; j <= r.y + r.h + 3; j += 2) ring.push(px(r.x - 3, j), px(r.x + r.w + 3, j));
      r.color = hex([0, 1, 2].map((c) => median(ring.map((p) => p[c]))));
    }
    return r;
  });
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${rects
    .map((r) => `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${r.color}"/>`).join('')}</svg>`;
  return sharp(input).composite([{ input: Buffer.from(svg), top: 0, left: 0 }]);
}
