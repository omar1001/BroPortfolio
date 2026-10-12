// =====================================================================================
//  EXPORT TARGET "mgo" — the portfolio section ("أعمالنا" / "Our work") of the MGO Computing
//  company website, mgocomputing.com (folder ../MGOComputing, a React + Vite site).
//
//    node tools/export.mjs mgo              build, then write the data + images into that site
//    node tools/export.mjs mgo --publish    ...then build the site, preview it, publish it (asks first)
//    "Update MGO Site.bat"                  the same as --publish, by double-click
//
//  The company site speaks as a company ("we"), so (Omar, 2026-10-12):
//    - no personal name, CV or "role" text, and no GitHub/PyPI links (they show the personal account);
//    - the few texts written in the first person get company-voice versions below;
//    - screenshots that show the personal account name are left out or painted over (solid boxes,
//      coordinates in the 1600x920 gallery image). The personal portfolio keeps the originals.
//  A NEW project in content/projects.js is picked up automatically: it is added after the ones listed
//  in "order" — add its id there to move it up. Use "exclude" to keep a project off the company site.
// =====================================================================================
window.BRO_EXPORT = {
  name: 'MGO Computing website',
  site: '../MGOComputing',                        // relative to the BroPortfolio folder
  dataFile: 'src/portfolio/projects.generated.ts', // typed data, shape = src/portfolio/types.ts there
  imagesDir: 'public/work',                        // WebP files; names carry a content hash
  imagesUrl: '/work',

  exclude: ['mgo-computing'],                      // the company site itself
  order: [
    'jotlite', 'iskandarani', 'pe-curriculum', 'bro-video-creator', 'brotimer', 'netusage-monitor',
    'boardo', 'bro-mic', 'ayahscreen', 'sublevel', 'broclips', 'media-toolkit', 'taste-engine', 'tongue',
    'brodashgraphify', 'halal-graphify', 'visual-reply', 'agent-toolkit'
  ],

  // BroPortfolio category -> the site's service ids (SERVICE_IDS in src/config/pricing.ts).
  serviceIds: ['websites', 'webapps', 'mobile', 'desktop', 'games', 'ai'],
  services: {
    web: 'websites', webapp: 'webapps', mobile: 'mobile', desktop: 'desktop', game: 'games',
    'ai-tools': 'ai', automation: 'ai', extension: 'webapps'
  },
  extraServices: {
    jotlite: ['websites'], boardo: ['websites'], iskandarani: ['websites'],
    'bro-video-creator': ['desktop'], broclips: ['desktop'], 'bro-mic': ['desktop'], brodashgraphify: ['desktop']
  },
  statuses: ['live', 'open-source', 'in-use', 'delivered', 'demo'],

  // omar1001.github.io: the TasteEngine demo's address itself shows the personal account name.
  links: { live: true, other: true, github: false, blockHosts: ['github.com', 'pypi.org', 'omar1001.github.io'] },

  // The build fails if any of these appear in the exported texts or links.
  forbid: [/omar1001/i, /abossrie/i, /أبوسريع/, /\bOmar\b/i, /(^|[^؀-ۿ])عمر([^؀-ۿ]|$)/],

  overrides: {
    'bro-video-creator': {
      captions: {
        'ai-image.png': {
          en: 'An image the app generated locally — no cloud service',
          ar: 'صورة ولّدها البرنامج محليًا على الجهاز، دون أي خدمة سحابية'
        }
      }
    },
    'halal-graphify': {
      description: {
        en: 'halal-graphify is our maintained fork of Graphify, an open-source tool that maps a codebase into a knowledge graph that AI coding assistants query instead of searching files. It uses the neutral graph term "hub node" throughout, and one command migrates existing graphs.\n\nWe added Godot/GDScript support, a "view" command that answers architecture questions straight from the graph with no AI calls, and an offline zoomable explorer page. It is published on PyPI and rebuilt automatically from each upstream release, guarded by the full test suite.',
        ar: 'halal-graphify نسخة نتولّى صيانتها من أداة Graphify مفتوحة المصدر، وهي أداة تحوّل المشروع البرمجي إلى خريطة معرفية يستعلم منها مساعد البرمجة الذكي بدل البحث في الملفات واحدًا واحدًا. تستخدم المصطلح المحايد «hub node»، مع أمر واحد يرحّل الخرائط القديمة.\n\nوأضفنا إليها دعم محرك الألعاب Godot ولغة GDScript، وأمر «view» الذي يجيب عن أسئلة بنية المشروع من الخريطة مباشرة دون أي استدعاء للذكاء الاصطناعي، وصفحة استكشاف تفاعلية تعمل دون إنترنت. الأداة منشورة على PyPI وتُبنى آليًا مع كل إصدار جديد من الأصل، محكومة بالاختبارات كاملة.'
      }
    },
    // The README screenshot shows the GitHub account in a "git clone" line.
    'agent-toolkit': { skipImages: ['kernel-readme.png'], coverImage: 'guide-top.png' },
    // This chat card lists the personal GitHub profile README.
    'visual-reply': { skipImages: ['chat-reply.png'] },
    // The git status line ends with the commit author's name: "(Omar, 11 hours ago)".
    brodashgraphify: { redact: { 'graph-viewer.png': ['866,339,134,24'] }, coverImage: 'graph-viewer.png' }
  },

  publish: {
    // May be uncommitted while publishing (besides the exported files): pricing.ts is uncommitted by
    // that project's own rule (Omar's price editor owns it) and it IS what is live; ads/, scripts/ and
    // docs/ never reach the published site. Anything else unsaved stops the publish.
    allowDirty: ['src/config/pricing.ts', 'ads/', 'scripts/', 'docs/'],
    lint: 'npm run lint',
    build: 'npm run build',
    preview: 'firebase hosting:channel:deploy work --project mgocomputing --expires 7d',
    production: 'firebase deploy --only hosting --project mgocomputing',
    url: 'https://mgocomputing.com/#work',
    commitMessage: 'work: sync the portfolio from BroPortfolio'
  }
};
