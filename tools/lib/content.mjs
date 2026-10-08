// Loads content/profile.js and content/projects.js (plain browser scripts that assign
// globalThis.BRO_PROFILE / BRO_PROJECTS) into Node without executing them in our own scope.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

export const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const P = (...parts) => path.join(ROOT_DIR, ...parts);

function runScript(file) {
  const sandbox = { window: {} };
  sandbox.globalThis = sandbox.window;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
  return sandbox.window;
}

export function loadContent() {
  const profileFile = P('content', 'profile.js');
  const projectsFile = P('content', 'projects.js');
  const profile = runScript(profileFile).BRO_PROFILE;
  const projects = runScript(projectsFile).BRO_PROJECTS;
  if (!profile) throw new Error('content/profile.js must set window.BRO_PROFILE = { ... }');
  if (!Array.isArray(projects)) throw new Error('content/projects.js must set window.BRO_PROJECTS = [ ... ]');
  return { profile, projects, profileFile, projectsFile };
}

/** Bilingual value helper: t({en, ar}, 'ar') -> string (falls back to the other language). */
export function t(v, lang) {
  if (v == null) return '';
  if (typeof v === 'string' || typeof v === 'number') return String(v);
  if (Array.isArray(v)) return v;
  return v[lang] ?? v.en ?? v.ar ?? '';
}

export function visibleProjects(projects) {
  return projects
    .filter((p) => p && p.id && !p.hidden)
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (a.order ?? 999) - (b.order ?? 999) || (b.year ?? 0) - (a.year ?? 0));
}
