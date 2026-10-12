# Change log

## 2026-10-08 — v1: BroPortfolio created

**What:** New project. A bilingual portfolio site + Mostaql/Khamsat/Freelancer upload kit, generated from
`content/`. 19 projects visible; Investment Share (VOX Motors) waiting for a demo fund.

**Where:**
- Site: `web/index.html`, `web/project.html`, `web/kit.html`, `web/assets/css/styles.css`, `web/assets/js/{boot,app}.js`
- Engine: `tools/build.mjs`, `tools/shoot.mjs`, `tools/probe.mjs`, `tools/new-project.mjs`, `tools/deploy.mjs`,
  `tools/serve.mjs`, `tools/redact.mjs`, `tools/lib/{browser,compose,content,kit-text,steps}.mjs`
- Windows helpers: `tools/wincap.ps1`, `tools/alarm.ps1` (both saved with a UTF-8 BOM so PowerShell 5.1 reads Arabic)
- Data: `content/profile.js` (facts only from Omar's confirmed CV, `Desktop\CV RESUME`), `content/projects.js`,
  `content/capture/*.json` (one recipe per captured project), `content/media/<id>/`
- Docs: `README.md` (public, EN + AR), `docs/ARCHITECTURE.md`, `docs/GROUND-TRUTH.md`

**Why / decisions a future session must not re-litigate:**
- Omar's requests (chat, 2026-10-08): portfolio of his past work for Mostaql, Khamsat and Freelancer.com, also
  shown directly to clients; free hosting (Firebase or Cloudflare); able to add projects later; screenshots;
  exclude gaming "like Farm Colony" — then he added "there is a game demo made as well" → SUBLEVEL included
  as the only game. Tier `normal`. Folder name **BroPortfolio**, to be published as a GitHub repo.
- Contact on the site: **e-mail + LinkedIn + GitHub** (Omar's choice; no phone). Platform links hide all of it.
- Client work Omar first approved to show: Report Cards (later withdrawn — see below), **VOX Motors / Investment
  Share** (fake data only), **PE Curriculum** (without the teacher's name). **Alzheimer research excluded.**
- Before opening any app window: alarm first, wait for READY, alarm "done" after (Omar's rule). The first alarm
  was answered "Not now"; the second READY started the native capture session.
- Hosting default **Cloudflare Pages** (no traffic cap; Firebase Spark = 360 MB/day).
- Excluded and why: Voice Call (its public repo ships roleplay "companion" model presets — wrong look for Gulf
  clients), CPU Tuner (temps need admin + loads a vulnerable kernel driver when HWiNFO is off), science-shorts
  ("made videos", no episode rendered yet), browait-jobs (in progress; scrapes Mostaql), Detector (unfinished),
  Quran research (personal/sensitive), all other games.
- Boardo's GitHub link is withheld: the public repo contains a saved Google Search Console page (Gmail address,
  other properties) and search CSV exports. MGO's live link is hidden on platform links (it funnels to WhatsApp).
- JotLite mobile shot dropped: note text boxes are wider than a 412 px phone screen (text cut off) — a real
  JotLite bug reported to Omar.
- Tongue: the app's CSS (`.overlay`, `.empty`) overrides the `hidden` attribute in Chromium, so the voices panel
  and empty state cover the reader. The recipe injects `[hidden]{display:none!important}` (intended behaviour);
  the bug was reported to Omar.
- Capture method per project is recorded in each recipe's `note` field. Existing, privacy-checked images were
  reused for BroClips (English-only set; LoL slang images skipped), BroTimer, visual-reply, SUBLEVEL,
  BroDashGraphify. halal-graphify's `docs/graph-hero.png` is upstream's image — not used.
- Iskandarani storefront was shot from the template on the seeded TEST project (localhost, view-only); brand
  shows the template placeholder ("Restaurant Name") and the caption says so.
- PE Curriculum is shot from a sanitized copy in `.work/` (gitignored). The script that makes it lives only in
  `.work/` because it contains the teacher's name.
- **Report Cards excluded by Omar during the capture session** ("ignore the saudi card program and don't include
  it") — supersedes the approval above. Cleanup done at once: the app closed, its `%APPDATA%\ReportCards\config.json`
  restored from the backup (points again to its old test folder), the demo folder `E:\PortfolioDemo` and the one raw
  screenshot deleted, the entry removed from `content/projects.js`, the profile's service examples and the Khamsat
  bundle. Never re-add it.
- Native capture session (after READY): NetUsage Monitor captured with real live data (needed Omar's UAC "Yes"; its
  records path in the status bar painted over — it contains the Windows user name; Omar asked to exit it from the
  tray because an elevated app can't be closed from here). Bro Mic: PC window + phone (adb screencap over USB,
  status bar cropped) — the link never went live (PC "connected but no audio", phone "waiting for the PC"), so the
  standby screens are used. Video Downloader skipped at Omar's request.

**Published (Omar's go-ahead, 2026-10-08):** public repo `omar1001/BroPortfolio` (history squashed to one clean
commit before the first push, so no earlier Report Cards entry or Windows user name is in it). Website: Cloudflare
Pages project `omar-abossrie`, `siteUrl` = https://omar-abossrie.pages.dev — NOT deployed yet: the saved wrangler
login had expired and the OAuth login timed out (nobody clicked Allow). Omar runs `npx wrangler login`, then Publish.bat.

**Open:** investment-share demo fund; Iskandarani admin screens; Bro Mic live re-shoot; `profile.platforms` URLs.

## 2026-10-12 — Published on Firebase Hosting

**What:** The site is live at **https://omar-abossrie.web.app** (Omar: "publish it to my firebase or cloudflare
whichever will be free"). Both are free; Cloudflare's saved wrangler login had expired again ("could not be
refreshed, the environment is non-interactive") and needs Omar's browser "Allow" click, while the Firebase CLI
was still logged in. So the default target is now Firebase.

**Where:**
- New Firebase project **`omar-abossrie`** ("Omar Abossrie Portfolio", Spark plan — no billing account, so it can
  never charge). Its own project on purpose: the free 360 MB/day traffic allowance is per project, and sharing
  `mgocomputing`'s would let portfolio visits eat the company site's allowance during ad campaigns.
- `bro.config.json` — `deployTarget: "firebase"`, `firebaseProject: "omar-abossrie"` (Cloudflare name kept).
- `content/profile.js:13` — `siteUrl` → `https://omar-abossrie.web.app` (OG tags, sitemap and every kit link use it).
- `tools/deploy.mjs` — `firebaseCli()` runs `node <global firebase-tools>/lib/bin/firebase.js` instead of
  `firebase` through `shell: true`: from Git Bash, cmd.exe said "'firebase' is not recognized" (even
  `firebase.cmd`) although `where firebase` found it. Falls back to the shell when firebase-tools isn't global.
- `README.md`, `docs/GROUND-TRUTH.md` — Firebase is the default, Cloudflare the alternative.

**Verified live:** `/`, `/p/jotlite/`, `/p/boardo/`, `/kit.html` (`X-Robots-Tag: noindex`), `/sitemap.xml`,
`/robots.txt`, `/og.png`, images → 200; unknown page → 404; headless screenshots of the Arabic home and of
`/p/boardo/?via=khamsat` (Khamsat banner shown, contact hidden).

## 2026-10-12 — Export to the company site (mgocomputing.com) + kit/screenshot fixes

**What:** Omar asked for the same portfolio on his company's site, mgocomputing.com ("the company be having
things made before"), "but not say Omar is the owner". His answers: all projects except the MGO site itself,
hide GitHub links, publish directly after the checks. Done the same day: the site's new section "أعمالنا"
is live (record in `Desktop/MGOComputing/docs/CHANGELOG.md`, 2026-10-12, commit `1cc5038` there).

**Where (this repo):**
- `tools/export.mjs` (new) — `node tools/export.mjs <target> [--publish] [--yes]`. Reads
  `content/exports/<target>.js`, rebuilds, takes the images from `dist/data/media.js` + `dist/img`, writes a
  typed data module and hashed WebP files into the other site. `--publish`: refuses unsaved work in the target
  outside the exported files (`allowDirty` exceptions; folder entries end in "/"), lint → build → preview
  channel → asks "y" → production → commits only the exported paths there (`git commit -- <paths>`).
- `content/exports/mgo.js` (new) — the company target: excludes `mgo-computing`, business-first `order`,
  category → the site's six service ids (+`extraServices`), links live/other only, blocks `github.com`,
  `pypi.org` and `omar1001.github.io` (the TasteEngine demo's address shows the account name — its link is
  dropped on the company site only), company-voice overrides (halal-graphify description "my/I" → "our/we",
  bro-video-creator "on my own PC" caption), screenshots: agent-toolkit `kernel-readme` skipped (git clone URL
  shows `omar1001`) with `guide-top` as its card, visual-reply `chat-reply` skipped (`omar1001/README.md`),
  brodashgraphify `graph-viewer` **redacted** at `866,339,134,24` ("(Omar, 11 hours ago)") and used as its card.
  `forbid` stops the export on omar1001 / Abossrie / أبوسريع / Omar / عمر.
- `tools/lib/redact.mjs` (new, shared), `tools/redact.mjs` (now a wrapper), `tools/lib/firebase.mjs` (new,
  shared; `deploy.mjs` uses it).
- `Update MGO Site.bat` (new, CRLF/ASCII), `package.json` (`npm run export`), README (*Exporting to another
  website* + Arabic step 6), `docs/ARCHITECTURE.md`.

**Fixes found on the way:**
- **halal-graphify's 3rd screenshot was a Fastly CAPTCHA page, not PyPI** (the capture hit bot protection) —
  it was live on omar-abossrie.web.app and in the kit. Entry removed from `content/projects.js`, file
  `content/media/halal-graphify/pypi.png` deleted. Never try to get past such a page; leave the shot out.
- `tools/build.mjs` — stale images: a removed/renamed screenshot stayed in `kit/<id>/` (and `dist/img/<id>/`),
  where it would be uploaded to a platform (found: jotlite `01-editor.png`, `02-landing.png`, and the CAPTCHA).
  Now each project's kit/web folder keeps only current files, and kit folders of hidden/removed projects
  are deleted (`kit/khamsat` excepted).

**Decisions not to re-litigate:**
- The company export speaks as "we": no `role` text (it says "Solo"), no GitHub/PyPI links, no screenshot that
  shows the account name. Redaction is applied to the exported copy only — the personal site keeps originals.
- A project added later is exported automatically (placed after the listed `order`); use `exclude` to keep
  one off the company site.
- Generated files in the company repo (`src/portfolio/projects.generated.ts`, `public/work/**`) are never
  edited there; the export is deterministic (a repeat run gives byte-identical files — checked).

**Verified:** export → 18 projects, 180 images (6.4 MB), no forbidden word; the redacted area checked by eye;
safety check tested on the company repo's real state (ads files allowed) and on a simulated `src/` edit
(blocked). Company site checks: see its changelog.

