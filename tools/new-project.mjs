#!/usr/bin/env node
// "Add Project" wizard: asks a few questions, creates the project entry in content/projects.js,
// and — if the project has a live link — takes desktop + phone screenshots automatically.
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { spawnSync } from 'node:child_process';
import { P, loadContent } from './lib/content.mjs';

const MARKER = '// ▲ NEW PROJECTS GO ABOVE THIS LINE';
const CATS = [
  ['web', 'Website / موقع'], ['webapp', 'Web app / تطبيق ويب'], ['desktop', 'Desktop app / برنامج سطح مكتب'],
  ['mobile', 'Mobile app / تطبيق جوال'], ['extension', 'Browser extension / إضافة متصفح'],
  ['ai-tools', 'AI or developer tool / أداة ذكاء اصطناعي أو للمطورين'], ['automation', 'Automation / أتمتة'], ['game', 'Game / لعبة']
];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = async (q, def = '') => {
  const a = (await rl.question(def ? `${q} [${def}]: ` : `${q}: `)).trim();
  return a || def;
};
const js = (s) => JSON.stringify(String(s));

console.log('\nBroPortfolio — add a project  /  إضافة مشروع جديد\n');
const { projects } = loadContent();
let id;
for (;;) {
  id = (await ask('Short id, letters/numbers/dashes (e.g. perfume-shop)')).toLowerCase();
  if (!/^[a-z0-9-]+$/.test(id)) { console.log('  Use only a-z, 0-9 and "-".'); continue; }
  if (projects.some((p) => p.id === id)) { console.log('  That id already exists.'); continue; }
  break;
}
const nameEn = await ask('Project name in English');
const nameAr = await ask('Project name in Arabic / اسم المشروع بالعربية', nameEn);
const subEn = await ask('What is it? One line in English (e.g. Online store for a perfume shop)');
const subAr = await ask('ما هو المشروع؟ سطر واحد بالعربية');
console.log(CATS.map(([, label], i) => `  ${i + 1}) ${label}`).join('\n'));
const catNum = Number(await ask('Type (number)', '1'));
const category = (CATS[catNum - 1] || CATS[0])[0];
const year = Number(await ask('Year', String(new Date().getFullYear())));
const live = await ask('Live link (Enter to skip)');
const github = await ask('GitHub link (Enter to skip)');
const client = /^y/i.test(await ask('Made for a client? (y/N)', 'N'));
rl.close();

const status = live ? 'live' : github ? 'open-source' : 'delivered';
const images = live
  ? `[\n      { file: 'home.png', caption: { en: 'Home page', ar: 'الصفحة الرئيسية' } },\n      { file: 'mobile.png', caption: { en: 'On a phone', ar: 'على الجوال' } }\n    ]`
  : `[\n      // Put screenshots in content/media/${id}/ and list them here, for example:\n      // { file: 'main.png', caption: { en: 'Main screen', ar: 'الشاشة الرئيسية' } },\n    ]`;
const cover = live ? `{ main: 'home.png', phone: 'mobile.png' }` : `{ /* main: 'main.png' */ }`;

const block = `  {
    id: ${js(id)},
    category: ${js(category)},
    year: ${year},
    status: ${js(status)},
    client: ${client},
    accent: '#14b8a6',
    title: { en: ${js(nameEn)}, ar: ${js(nameAr)} },
    subtitle: { en: ${js(subEn)}, ar: ${js(subAr)} },
    summary: { en: ${js(subEn)}, ar: ${js(subAr)} },
    description: {
      en: 'TODO: 3-5 short sentences: the problem, what it does, who it is for, the result.',
      ar: 'TODO: من 3 إلى 5 جمل قصيرة: المشكلة، ماذا يفعل المشروع، لمن، والنتيجة.'
    },
    features: { en: ['TODO'], ar: ['TODO'] },
    role: { en: 'Solo — design, development and launch', ar: 'تنفيذ كامل بمفردي — التصميم والتطوير والإطلاق' },
    tech: [],
    links: { live: ${js(live)}, github: ${js(github)} },
    skills: { mostaql: [], freelancer: [] },
    images: ${images},
    cover: ${cover}
  },
`;

const file = P('content', 'projects.js');
let src = fs.readFileSync(file, 'utf8');
if (src.includes(MARKER)) src = src.replace(MARKER, block + '  ' + MARKER);
else { const i = src.lastIndexOf('];'); src = src.slice(0, i) + block + src.slice(i); }
fs.writeFileSync(file, src);
fs.mkdirSync(P('content', 'media', id), { recursive: true });
console.log(`\nAdded "${id}" to content/projects.js`);

if (live) {
  const recipe = {
    id, url: live,
    shots: [
      { name: 'home', preset: 'desktop' },
      { name: 'mobile', preset: 'mobile' }
    ]
  };
  fs.writeFileSync(P('content', 'capture', `${id}.json`), JSON.stringify(recipe, null, 2) + '\n');
  console.log('Taking screenshots of the live site...');
  spawnSync('node', ['tools/shoot.mjs', id], { stdio: 'inherit', cwd: P(), shell: true });
}

console.log(`
Next steps / الخطوات التالية:
  1. Open content/projects.js and replace the TODO texts for "${id}" (English + Arabic).
  2. Put more screenshots in content/media/${id}/ and list them under "images".
  3. Double-click Preview.bat to check it, then Publish.bat to put it online.
`);
