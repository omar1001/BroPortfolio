// Runs the Firebase CLI as `node <firebase-tools>/lib/bin/firebase.js`, with no shell in between:
// from some shells (seen from Git Bash on Windows, 2026-10-12) a `shell: true` spawn of firebase.cmd
// says "not recognized" even though it is on PATH. Shared by tools/deploy.mjs and tools/export.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

let cached;

function firebaseScript() {
  if (cached !== undefined) return cached;
  const roots = [];
  if (process.env.APPDATA) roots.push(path.join(process.env.APPDATA, 'npm', 'node_modules'));
  const g = spawnSync('npm root -g', { shell: true, encoding: 'utf8' });
  if (g.status === 0 && g.stdout.trim()) roots.push(g.stdout.trim());
  cached = roots.map((r) => path.join(r, 'firebase-tools', 'lib', 'bin', 'firebase.js')).find((f) => fs.existsSync(f)) || null;
  return cached;
}

/** firebase(['deploy', '--only', 'hosting'], { cwd, encoding }) -> spawnSync result. */
export function firebase(args, opts = {}) {
  const js = firebaseScript();
  if (js) return spawnSync(process.execPath, [js, ...args], { stdio: 'inherit', ...opts });
  // Not installed globally: let the shell try (it prints a clear error if the CLI is missing).
  return spawnSync(['firebase', ...args].join(' '), { stdio: 'inherit', shell: true, ...opts });
}
