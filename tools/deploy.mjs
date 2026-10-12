#!/usr/bin/env node
// Build, then publish dist/ for free.
//   node tools/deploy.mjs              uses "deployTarget" from bro.config.json
//   node tools/deploy.mjs cloudflare   Cloudflare Pages  (free: unlimited traffic)  -> <project>.pages.dev
//   node tools/deploy.mjs firebase     Firebase Hosting  (free Spark: 10 GB stored, 360 MB/day traffic) -> <project>.web.app
// You must be logged in once:  npx wrangler login   /   firebase login
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { P, loadContent, visibleProjects } from './lib/content.mjs';

const cfg = JSON.parse(fs.readFileSync(P('bro.config.json'), 'utf8'));
const target = process.argv[2] || cfg.deployTarget || 'cloudflare';
const run = (cmd, args, opts = {}) => spawnSync(cmd, args, { stdio: 'inherit', shell: true, cwd: P(), ...opts });

// The Firebase CLI is started as `node <firebase-tools>/lib/bin/firebase.js`: from some shells (seen from Git Bash
// on Windows, 2026-10-12) a `shell: true` spawn of firebase.cmd says "not recognized" even though it is on PATH.
function firebaseCli() {
  const roots = [];
  if (process.env.APPDATA) roots.push(path.join(process.env.APPDATA, 'npm', 'node_modules'));
  const g = spawnSync('npm root -g', { shell: true, encoding: 'utf8' });
  if (g.status === 0 && g.stdout.trim()) roots.push(g.stdout.trim());
  for (const root of roots) {
    const js = path.join(root, 'firebase-tools', 'lib', 'bin', 'firebase.js');
    if (fs.existsSync(js)) return (args) => spawnSync(process.execPath, [js, ...args], { stdio: 'inherit', cwd: P() });
  }
  return (args) => run('firebase', args); // not installed globally: let the shell try (and explain if it fails)
}

// Never publish placeholder text.
const todo = visibleProjects(loadContent().projects).filter((p) => JSON.stringify(p).includes('TODO'));
if (todo.length) {
  console.error(`These projects still have TODO text — finish them in content/projects.js (or set hidden: true):\n  ${todo.map((p) => p.id).join('\n  ')}`);
  process.exit(1);
}

const build = run('node', ['tools/build.mjs']);
if (build.status !== 0) { console.error('\nBuild failed — nothing was published.'); process.exit(1); }

if (target === 'cloudflare') {
  const name = cfg.cloudflareProject;
  const wrangler = ['--yes', `wrangler@${cfg.wranglerVersion || '4'}`];
  // Creating an existing project just prints an error; that is fine.
  run('npx', [...wrangler, 'pages', 'project', 'create', name, '--production-branch', 'main'], { stdio: 'ignore' });
  const r = run('npx', [...wrangler, 'pages', 'deploy', 'dist', '--project-name', name, '--branch', 'main', '--commit-dirty=true']);
  if (r.status !== 0) { console.error('\nPublishing failed. If it says you are not logged in, run:  npx wrangler login'); process.exit(1); }
  console.log(`\nPublished. Your site should be: https://${name}.pages.dev`);
  console.log('If Cloudflare printed a different address above (the name was taken), put that address in');
  console.log('content/profile.js -> siteUrl and publish again, so the upload-kit links point to the right place.');
} else if (target === 'firebase') {
  if (!cfg.firebaseProject) { console.error('Set "firebaseProject" in bro.config.json first.'); process.exit(1); }
  fs.writeFileSync(P('firebase.json'), JSON.stringify({
    hosting: {
      public: 'dist',
      ignore: ['_headers', '**/.*'],
      cleanUrls: false,
      headers: [
        { source: '/img/**', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }] },
        { source: '/kit.html', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] }
      ]
    }
  }, null, 2));
  const r = firebaseCli()(['deploy', '--only', 'hosting', '--project', cfg.firebaseProject]);
  if (r.status !== 0) {
    console.error('\nPublishing failed. If it says you are not logged in, run:  firebase login');
    console.error('(No Firebase CLI yet? Install it once:  npm install -g firebase-tools)');
    process.exit(1);
  }
  console.log(`\nPublished. Your site: https://${cfg.firebaseProject}.web.app`);
} else {
  console.error(`Unknown target "${target}" — use cloudflare or firebase.`);
  process.exit(1);
}
