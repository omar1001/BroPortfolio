#!/usr/bin/env node
// Paints solid boxes over private details (names, paths, logos) in a screenshot.
// Never blur: blurred short text of a known format can be recovered. Solid fill only.
//   node tools/redact.mjs <in.png> <out.png> x,y,w,h[,#rrggbb] [x,y,w,h ...]
// Without a colour, each box is filled with the median colour of a 3 px ring just outside it,
// so it blends into the surrounding background.
import fs from 'node:fs';
import { redact } from './lib/redact.mjs';

const [input, output, ...boxes] = process.argv.slice(2);
if (!input || !output || !boxes.length) {
  console.error('usage: node tools/redact.mjs in.png out.png x,y,w,h[,#rrggbb] ...');
  process.exit(1);
}

const image = await redact(input, boxes);
await image.png().toFile(output + '.tmp.png');
fs.renameSync(output + '.tmp.png', output);
console.log(`redacted ${boxes.length} box(es) -> ${output}`);
