# BroPortfolio — Omar's portfolio site + freelance-platform upload kit

**Criticality tier:** `normal` (declared by Omar 2026-10-08: "normal not sensitive but working and best UI design").

Static bilingual (AR/EN, RTL) portfolio built from `content/` by `tools/build.mjs` into `dist/` (the site)
and `kit/` (Mostaql / Khamsat / Freelancer upload kit). Screenshots come from JSON recipes
(`tools/shoot.mjs`). Planned to be a **public GitHub repo** (`omar1001/BroPortfolio`) — the engine is the product.

## Hard invariants (do not break, do not re-litigate)
1. **Platform links hide contact info.** `?via=mostaql|khamsat|freelancer` removes the contact section and
   any `links.hideOnPlatforms` link. Platform texts must never contain e-mail/phone/WhatsApp/Telegram —
   `buildKit()` fails the build on a leak. Do not weaken either.
2. **Khamsat images are plain screenshots only** — never `00-cover.png` art, text, frames, logos, QR or
   contact buttons. Images showing WhatsApp CTAs carry `khamsat: false`.
3. **Client privacy.** Report Cards (a government client's app) is **excluded entirely** — Omar, 2026-10-08:
   "ignore the saudi card program and don't include it"; never re-add it. PE Curriculum: never the teacher's
   name — shoot only the sanitized copy in `.work/` (its replacement script is local-only; it contains her
   name). VOX Motors / Investment Share: fake demo data only. Copy never names a client's sector (CV rule).
4. **Captures have no side effects:** ads/analytics always blocked (`DEFAULT_BLOCK`), no form submits /
   orders / sign-ins, backend writes blocked where needed. Never type passwords.
5. **Windows on Omar's screen only after the alarm** (`tools/alarm.ps1 -Mode start`, exit 0 = READY, 2 = Not now)
   and a `-Mode done` alarm after. Headless browsers and background servers don't need it.
6. Kit images are **1600×920** (Khamsat 800×460 shape). `dist/` and `kit/` are generated — never hand-edit.
7. **Recipes never contain the Windows user name** — use `{HOME}`.

## Decisions (who/when in docs/CHANGELOG.md 2026-10-08)
Excluded: Report Cards (Omar), Video Downloader (Omar skipped it), games except SUBLEVEL (Omar asked for
it), Alzheimer research (client + ADNI data), Voice Call
(roleplay presets in its public repo), CPU Tuner (admin + kernel driver for temps), science-shorts
(no episode yet), browait-jobs, Detector, Quran research. Boardo GitHub link withheld (repo leaks a Search
Console page). MGO live link hidden on platforms (WhatsApp funnel). **Hosting: Firebase Hosting, project `omar-abossrie` →
https://omar-abossrie.web.app** (live since 2026-10-12; Cloudflare's saved login kept expiring).

## Folder map
- `content/` — profile.js, projects.js (the data), `media/<id>/` raw screenshots, `capture/<id>.json` recipes
- `web/` — index.html, project.html, kit.html, assets/ (css, js, img) — templates use `{{ROOT}}`/`{{HEAD}}`
- `tools/` — build, shoot, probe, serve, deploy, new-project, redact; `lib/` (browser, compose, content, kit-text, steps); wincap.ps1, alarm.ps1
- `docs/` — ARCHITECTURE.md, CHANGELOG.md, GROUND-TRUTH.md, screenshots/
- `.work/` (gitignored) — sanitized client copies, demo test pages, seed scripts

## Commands
`Preview.bat` / `npm run preview` · `node tools/build.mjs [--force]` · `node tools/shoot.mjs <id> [--only a,b]` ·
`node tools/probe.mjs <url> '[steps]' out.png [--preset mobile] [--until load]` · `Publish.bat` / `node tools/deploy.mjs [firebase|cloudflare]` · `Add Project.bat`

## Open items
- investment-share (VOX Motors) needs a demo fund Omar creates (throwaway Firebase project or demo account) — hidden.
- iskandarani: admin/POS screens need the Cafe Nour demo seeded + Omar signing in.
- Bro Mic did not link during capture (PC "connected but no audio", phone "waiting for the PC") — standby shots used; re-shoot live later.
- Fill `profile.platforms` with his Mostaql/Khamsat/Freelancer profile URLs (adds "Hire me on …" buttons).

## Read on demand
| Question | Read | Cost |
|---|---|---|
| Why is a file shaped this way / data flow | `docs/ARCHITECTURE.md` | ~2k |
| What changed and why (before touching an area) | `docs/CHANGELOG.md` | ~2k |
| Platform rules, image limits, hosting limits, machine facts | `docs/GROUND-TRUTH.md` | ~1.5k |
| How a project was captured | `content/capture/<id>.json` (note field) | small |

## Change log (index — full entries in docs/CHANGELOG.md)
| Date | Headline | Read before touching |
|---|---|---|
| 2026-10-08 | v1: engine, 19 projects, kit, privacy rules; Report Cards excluded; GitHub published, Cloudflare pending login | everything (first entry) |
| 2026-10-12 | **Site LIVE on Firebase** — https://omar-abossrie.web.app (new project `omar-abossrie`); deploy runs the Firebase CLI through node | `tools/deploy.mjs`, `bro.config.json`, `content/profile.js` siteUrl |
