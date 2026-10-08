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

**Published (Omar's go-ahead, 2026-10-08):** public repo `omar1001/BroPortfolio`; site on Cloudflare Pages project
`omar-abossrie` (`siteUrl` set to https://omar-abossrie.pages.dev).

**Open:** investment-share demo fund; Iskandarani admin screens; Bro Mic live re-shoot; `profile.platforms` URLs.
