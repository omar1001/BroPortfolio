# Ground truth — verified external facts

Facts this project depends on that come from outside the code. Each one carries its source and
the date it was checked. Re-check anything older than ~6 months before relying on it.

## Mostaql (mostaql.com) — portfolio ("معرض الأعمال")

Source: official help page <https://support.mostaql.com/add-a-portfolio> — read 2026-10-08.

| Fact | Value |
|---|---|
| Works needed before you can bid | **3** |
| Works allowed per plan | Basic **10**, Premium **20**, Professional **30** |
| Form fields, in order | 1 title (عنوان العمل) · 2 thumbnail (صورة مصغرة) · 3 description (وصف العمل, "about five lines") · 4 images/files (صور وملفات العمل) · 5 link (رابط العمل) · 6 completion date (تاريخ الإنجاز) · 7 skills (المهارات) |
| Images per work | up to **20** images/files |
| Image formats | **jpg, jpeg, png — not animated** |
| Max size per image | **25 MB** |
| Link field | explicitly allows "a link to your website or blog where you show your works" |
| Personal (non-client) samples | explicitly encouraged ("build samples for your portfolio") |

Not official (community, Hsoub Academy, 2020): thumbnail shows at 346×200 desktop / 246×200
mobile → use ≥692×400; in-page images shown 718 px wide → ≥1436 px wide. The kit's 1600×920
(ratio 1.739 ≈ 346/200 = 1.73) satisfies both.

## Khamsat (khamsat.com) — service samples ("معرض الأعمال" inside a service)

Source: official help page <https://support.khamsat.com/adding-portfolio> — read 2026-10-08.

| Fact | Value |
|---|---|
| Where samples live | **Inside each service** you sell (no separate profile portfolio) |
| Count | at least **4**, at most **12** images per service (or 3 YouTube videos for video services) |
| Size | **800 wide × 460 high minimum** |
| Must | be your own, exclusive work; match the service |
| Must not | contain a description of the service inside the image; frames, badges/stars or any logos (incl. Khamsat/Hsoub); **external contact methods or QR codes** |
| Programming services | screenshots of pages of a site/store you built, or images of code you wrote |
| YouTube thumbnail size | 1280×720 |

Consequence in this repo: Khamsat bundles (`kit/khamsat/<service>/`) use **only plain gallery
images** (screenshots on a neutral background), never the decorated `00-cover.png`.

## Freelancer.com — portfolio

Source: <https://www.freelancer.com/support/Profile/how-to-add-a-portfolio> via search summary
2026-10-08 (the page itself would not render for the fetch tool).

| Fact | Value |
|---|---|
| Image formats / max size | JPG, PNG, GIF, JPEG — **10 MB** |
| Other types | article/code 20 MB, video 100 MB (FLV/MP4/AVI), audio 20 MB (MP3) |
| Suggested minimum | at least **6** portfolio items |
| Flow | Profile → Manage portfolio → Add or edit items → + Add Portfolio Item → upload → pencil icon changes the thumbnail → fill fields → Next |

## Free hosting

| Host | Free limits (as commonly documented; re-check on the provider's pricing page) | URL shape |
|---|---|---|
| Cloudflare Pages | unlimited static requests and bandwidth; 500 builds/month; 20,000 files per site; 25 MiB per file | `<project>.pages.dev` |
| Firebase Hosting (Spark) | 10 GB storage; **360 MB/day** transfer | `<project>.web.app` |

First choice was **Cloudflare Pages** (no traffic cap), but its saved login expires and needs a browser
"Allow" click each time; the Firebase CLI login stays valid. **Since 2026-10-12 the default is Firebase
Hosting** (project `omar-abossrie` → `https://omar-abossrie.web.app`). 360 MB/day is roughly 150 full
visits a day — plenty for a portfolio. Cloudflare stays available via `node tools/deploy.mjs cloudflare`.

## Local machine (Omar's PC) — checked 2026-10-08

- Node 24.16.0, npm 11.13.0, Python 3.12.10, git 2.54, gh 2.96, Firebase CLI 15.22.0 (logged in).
- Wrangler not installed globally; `npx wrangler@4` is used; an OAuth config exists at
  `%APPDATA%\xdg.config\.wrangler\config\default.toml` (from 2026-08-16).
- Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`; Edge also present.
- playwright-core 1.64.0 drives the installed Chrome (no browser download); sharp 0.35.5.
- Display 2560×1440 at 150% (AppliedDPI 144) → native windows are captured at 1920×1104 physical
  and scaled to 1600×920.
