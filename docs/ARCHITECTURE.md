# Architecture

## Data flow

```
content/profile.js ─┐
content/projects.js ┼─► tools/build.mjs ─┬─► dist/  (website: index.html, p/<id>/index.html, kit.html,
content/media/<id>/ ┘        │           │            data/*.js, img/<id>/*.webp, og.png, sitemap, robots, _headers)
                             │           └─► kit/   (<id>/00-cover.png, NN-*.png, mostaql.txt, freelancer.txt,
                             │                       khamsat/<service>/NN-*.png + khamsat.txt)
content/capture/<id>.json ──► tools/shoot.mjs ──► content/media/<id>/*.png
```

## Why it is built this way

- **Data as plain `window.X = …` scripts, not JSON.** The site must open straight from disk (`file://`) to be
  shown offline to a client; `fetch()` of JSON fails there, `<script src>` does not. Node reads the same
  files through `vm` (`tools/lib/content.mjs`). Comments and trailing commas also make hand-editing easier.
- **One front-end file (`web/assets/js/app.js`) renders all three pages** (`data-page="home|project|kit"`),
  so labels, badges, icons and language logic exist once. `boot.js` runs in `<head>` to set theme, `lang`
  and `dir` before first paint (no flash of the wrong direction).
- **Project pages are real files** (`dist/p/<id>/index.html`) generated from `web/project.html` with
  per-project Open Graph tags, so a link pasted in WhatsApp/LinkedIn shows the project's own cover. The
  page content itself is rendered client-side (one rendering path).
- **Every kit image is rendered by the real browser** (`tools/lib/compose.mjs`: HTML layout → PNG at
  1600×920): cover art (browser frame / phone frames on the project accent colour), "fit" (screenshot on a
  calm background), "phones" (1–3 portrait screens side by side). `sharp` only resizes/encodes (WebP for the
  site). A content-hash cache (`kit/.cache.json`) re-renders only what changed.
- **1600×920** = 2× Khamsat's 800×460 minimum, ≈ Mostaql's 346×200 thumbnail ratio; so one image set
  serves all three platforms and the site cards.
- **Recipes are JSON with one-key steps** (`tools/lib/steps.mjs`) so the "Add Project" wizard can write
  them and a non-programmer can read them. Shots with the same preset share one browser session, so
  demo data built in `setup` carries across shots; `fresh: true` isolates a shot (with its own
  `localStorage` seed).
- **Ad/analytics blocking lives in `newContext()`**, not in recipes, so no capture can ever count as an
  ad impression on Omar's own AdSense or pollute analytics.
- **Extensions**: branded Chrome 137+ ignores `--load-extension`; `launchWithExtension()` uses Edge in a
  throwaway profile (headless), so Omar's real browsers are never touched.
- **Native windows** (`tools/wincap.ps1`): DPI-aware screen copy of the window rectangle (PrintWindow
  garbles Arabic shaping in WPF), UI Automation for named buttons/tabs, `clickat` for controls UIA can't see
  (tkinter). Always behind the alarm.
- **Platform mode** (`?via=…`) is stored in `sessionStorage` so it survives navigation inside the site.
- **Contact e-mail** is stored as two parts and joined in JS to keep simple scrapers away.

## Files

| File | Role |
|---|---|
| `web/index.html`, `project.html`, `kit.html` | page shells with `{{ROOT}}` / `{{HEAD}}` placeholders |
| `web/assets/css/styles.css` | all styles; tokens on `:root`, dark via `prefers-color-scheme` + `[data-theme]`; logical properties for RTL |
| `web/assets/js/boot.js` | pre-paint theme/lang/dir |
| `web/assets/js/app.js` | i18n strings, icons, header/footer, home, project page + gallery + lightbox, kit page |
| `tools/build.mjs` | validate → compose kit images → Khamsat bundles → kit texts → dist pages, sitemap, headers |
| `tools/lib/compose.mjs` | HTML templates for cover / fit / phones / OG image + Playwright renderer |
| `tools/lib/kit-text.mjs` | platform rules, titles/descriptions per platform, contact-leak check, .txt output |
| `tools/lib/browser.mjs` | browser discovery, presets, blocking, extension launcher, static server |
| `tools/lib/steps.mjs` | recipe step interpreter (shared by shoot + probe) |
| `tools/shoot.mjs` | runs recipes → `content/media/<id>/` (`{HOME}` placeholder support) |
| `tools/probe.mjs` | lists clickable elements + screenshot, for writing recipes |
| `tools/new-project.mjs` | wizard: asks questions, appends a block above the marker in projects.js, shoots a live link |
| `tools/deploy.mjs` | refuses TODO text, builds, deploys to Cloudflare Pages or Firebase |
| `tools/serve.mjs` | local preview server for dist/ |
| `tools/redact.mjs` | solid-colour redaction boxes (median ring colour) |
| `tools/wincap.ps1` | native window start/find/capture/invoke/setvalue/keys/clickat/elements/close |
| `tools/alarm.ps1` | bilingual top-most "free your PC" / "done" dialog with chime |
