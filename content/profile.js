// =====================================================================================
//  YOUR PROFILE — edit the text here. Every text has an English (en) and Arabic (ar) version.
//  Facts below come from Omar's confirmed CV (Desktop\CV RESUME, checked 2026-08-20).
// =====================================================================================
window.BRO_PROFILE = {
  name: { en: 'Omar Abossrie', ar: 'عمر أبوسريع' },
  monogram: { en: 'OA', ar: 'ع' },
  role: { en: 'Full-stack developer & AI engineer', ar: 'مطوّر برمجيات متكامل ومهندس ذكاء اصطناعي' },
  siteTitle: { en: 'Omar Abossrie — Portfolio', ar: 'عمر أبوسريع — معرض الأعمال' },

  // The public address of the site. Set it after the first publish, then build again
  // (the upload kit uses it for the "link to the work" field).
  siteUrl: 'https://omar-abossrie.web.app',
  repoUrl: 'https://github.com/omar1001/BroPortfolio',

  eyebrow: { en: 'Alexandria, Egypt · Available for freelance projects', ar: 'الإسكندرية، مصر · متاح لمشاريع العمل الحر' },
  headline: {
    en: 'I build websites, apps and AI tools that people actually use.',
    ar: 'أبني مواقع وتطبيقات وأدوات ذكاء اصطناعي يستخدمها الناس فعلًا.'
  },
  headlineHighlight: { en: 'AI tools', ar: 'أدوات ذكاء اصطناعي' },
  lead: {
    en: 'Full-stack developer and AI engineer. Web apps, Windows software, Android apps and automation — from the first idea to launch.',
    ar: 'مطوّر برمجيات متكامل ومهندس ذكاء اصطناعي. تطبيقات ويب وبرامج ويندوز وتطبيقات أندرويد وأتمتة — من الفكرة الأولى حتى الإطلاق.'
  },

  // Two more numbers for the hero (the project count and live count are computed automatically).
  stats: [
    { value: '5+', label: { en: 'years building production backends', ar: 'سنوات في تطوير أنظمة تعمل في بيئات إنتاج' } },
    { value: '20K+', label: { en: 'Google Play installs (earlier Android apps)', ar: 'تنزيل على Google Play لتطبيقاتي السابقة' } }
  ],

  // The three covers shown fanned out in the hero (project ids). Leave empty to pick automatically.
  heroProjects: ['jotlite', 'boardo', 'mgo-computing'],

  services: [
    {
      icon: 'globe',
      title: { en: 'Websites & landing pages', ar: 'مواقع وصفحات هبوط' },
      text: {
        en: 'Fast, mobile-friendly sites in Arabic and English that bring you customers, with the SEO basics done right.',
        ar: 'مواقع سريعة ومتجاوبة مع الجوال باللغتين العربية والإنجليزية تجلب لك العملاء، مع تهيئة صحيحة لمحركات البحث.'
      },
      examples: ['mgo-computing', 'jotlite', 'boardo']
    },
    {
      icon: 'layers',
      title: { en: 'Web apps & admin dashboards', ar: 'تطبيقات ويب ولوحات تحكم' },
      text: {
        en: 'Systems for orders, stock, money and customers — with user roles, reports, and offline support when you need it.',
        ar: 'أنظمة لإدارة الطلبات والمخزون والحسابات والعملاء، مع صلاحيات للمستخدمين وتقارير ودعم للعمل بدون إنترنت عند الحاجة.'
      },
      examples: ['iskandarani', 'pe-curriculum', 'ayahscreen', 'investment-share']
    },
    {
      icon: 'monitor',
      title: { en: 'Windows desktop software', ar: 'برامج ويندوز (سطح المكتب)' },
      text: {
        en: 'Desktop apps that run offline and fit your work: Arabic right-to-left screens, local databases, printing and Excel export.',
        ar: 'برامج تعمل بدون إنترنت وتناسب طبيعة عملك: واجهة عربية، قاعدة بيانات محلية، طباعة وتصدير إلى Excel.'
      },
      examples: ['netusage-monitor', 'broclips', 'tongue', 'bro-video-creator']
    },
    {
      icon: 'phone',
      title: { en: 'Android apps', ar: 'تطبيقات أندرويد' },
      text: {
        en: 'Native Android apps in Kotlin with clean, modern screens — from the first idea to the app installed on your phone.',
        ar: 'تطبيقات أندرويد أصلية بلغة Kotlin بواجهات حديثة وواضحة — من الفكرة حتى التطبيق المثبت على جوالك.'
      },
      examples: ['brotimer', 'bro-mic']
    },
    {
      icon: 'sparkles',
      title: { en: 'AI features & private local AI', ar: 'ميزات الذكاء الاصطناعي والذكاء المحلي' },
      text: {
        en: 'Chat, voice, transcription and content generation — with cloud models, or fully private on your own computer.',
        ar: 'محادثة وصوت وتفريغ صوتي وتوليد محتوى — عبر نماذج سحابية، أو بخصوصية تامة على جهازك أنت.'
      },
      examples: ['bro-video-creator', 'taste-engine', 'tongue', 'broclips']
    },
    {
      icon: 'workflow',
      title: { en: 'Automation & developer tools', ar: 'أتمتة وأدوات للمطورين' },
      text: {
        en: 'Tools that remove repetitive work — from video pipelines and downloaders to code-analysis dashboards.',
        ar: 'أدوات تختصر العمل المتكرر — من خطوط إنتاج الفيديو وأدوات التحميل إلى لوحات تحليل الأكواد.'
      },
      examples: ['media-toolkit', 'halal-graphify', 'brodashgraphify', 'agent-toolkit', 'video-downloader']
    }
  ],

  about: {
    en: [
      "I'm Omar, a software developer from Alexandria, Egypt. I spent more than five years building production backends with Node.js and Java — three and a half of them fully remote with a Finland-based team — and I led a three-person team that delivered a complete ERP platform.",
      'Today I build complete products on my own: websites, web apps, Windows software, Android apps and practical AI tools. I work fast with AI-assisted development, and I review, test and harden everything before it ships.'
    ],
    ar: [
      'أنا عمر، مطوّر برمجيات من الإسكندرية في مصر. عملت أكثر من خمس سنوات في بناء أنظمة خلفية (Backend) تعمل في بيئات إنتاج حقيقية باستخدام Node.js وJava، منها ثلاث سنوات ونصف عن بُعد بالكامل مع فريق في فنلندا، كما قدتُ فريقًا من ثلاثة مطورين لتسليم نظام ERP متكامل.',
      'اليوم أبني منتجات كاملة بنفسي: مواقع وتطبيقات ويب وبرامج ويندوز وتطبيقات أندرويد وأدوات ذكاء اصطناعي عملية. أعمل بسرعة بالاستعانة بأدوات الذكاء الاصطناعي في التطوير، وأراجع كل شيء وأختبره جيدًا قبل التسليم.'
    ]
  },

  timeline: [
    { when: { en: '2026 — now', ar: '2026 — الآن' }, what: { en: 'Independent developer & AI engineer', ar: 'مطوّر مستقل ومهندس ذكاء اصطناعي' }, where: { en: 'Remote · client projects and my own products', ar: 'عن بُعد · مشاريع لعملاء ومنتجات خاصة' } },
    { when: { en: '2022 — 2025', ar: '2022 — 2025' }, what: { en: 'Backend developer', ar: 'مطوّر أنظمة خلفية (Backend)' }, where: { en: 'Cloudpoint.fi (Finland) · fully remote', ar: 'Cloudpoint.fi (فنلندا) · عن بُعد بالكامل' } },
    { when: { en: '2022', ar: '2022' }, what: { en: 'Computer science instructor (part-time)', ar: 'مدرّس علوم حاسب (دوام جزئي)' }, where: { en: 'iSchool · online', ar: 'iSchool · أونلاين' } },
    { when: { en: '2020 — 2022', ar: '2020 — 2022' }, what: { en: 'Software developer & team lead', ar: 'مطوّر برمجيات وقائد فريق' }, where: { en: 'Roots Solutions (Egypt) · full ERP platform', ar: 'Roots Solutions (مصر) · نظام ERP متكامل' } },
    { when: { en: '2020', ar: '2020' }, what: { en: 'B.Eng. Computer Engineering', ar: 'بكالوريوس هندسة الحاسب' }, where: { en: 'AASTMT · MCIT scholarship · 2× ACM ECPC contestant', ar: 'الأكاديمية العربية للعلوم والتكنولوجيا · منحة وزارة الاتصالات · مشارك مرتين في مسابقة ACM ECPC' } }
  ],

  stack: [
    { group: { en: 'Web', ar: 'الويب' }, items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'PWA', 'HTML / CSS'] },
    { group: { en: 'Backend', ar: 'الأنظمة الخلفية' }, items: ['Node.js', 'Java', 'Python', 'FastAPI', 'REST APIs', 'Redis', 'MySQL', 'MongoDB'] },
    { group: { en: 'Desktop & mobile', ar: 'سطح المكتب والجوال' }, items: ['C# / .NET 8', 'WPF', 'Kotlin', 'Jetpack Compose', 'Android'] },
    { group: { en: 'Cloud', ar: 'السحابة' }, items: ['Firebase', 'Cloudflare', 'Docker', 'GCP', 'Git', 'CI/CD'] },
    { group: { en: 'AI', ar: 'الذكاء الاصطناعي' }, items: ['Claude / OpenAI / Gemini APIs', 'Ollama', 'LM Studio', 'Whisper', 'Local TTS', 'MCP servers', 'AI agents'] }
  ],

  // Shown on the site, EXCEPT when it is opened from a platform link (?via=mostaql|khamsat|freelancer).
  // The e-mail is stored in two parts so simple spam bots do not pick it up.
  contact: {
    email: ['omarmhmd.om', 'gmail.com'],
    linkedin: 'https://www.linkedin.com/in/omar-abossrie/',
    github: 'https://github.com/omar1001'
  },

  // Your profile pages on the platforms. When a visitor comes from one of them, the site shows
  // a "Hire me on …" button pointing back here. Leave '' to hide the button.
  platforms: { mostaql: '', khamsat: '', freelancer: '' },

  // Khamsat has no separate portfolio: samples live inside each service you sell.
  // Each entry becomes kit/khamsat/<id>/ with 4–12 plain images taken from these projects.
  khamsat: [
    {
      id: 'web',
      title: { ar: 'برمجة موقع أو تطبيق ويب احترافي متجاوب مع الجوال' },
      text: { ar: 'أبني لك موقعًا أو تطبيق ويب سريعًا وسهل الاستخدام باللغتين العربية والإنجليزية، يعمل على الجوال والكمبيوتر، مع لوحة تحكم عند الحاجة. النماذج المرفقة من أعمالي الحقيقية: مواقع تعمل الآن وأنظمة إدارة كاملة.' },
      projects: ['jotlite', 'boardo', 'iskandarani', 'mgo-computing', 'pe-curriculum', 'ayahscreen', 'taste-engine', 'investment-share']
    },
    {
      id: 'desktop',
      title: { ar: 'برمجة برنامج ويندوز (سطح المكتب) حسب احتياجك' },
      text: { ar: 'برنامج ويندوز يعمل بدون إنترنت ويحل مشكلة عملك اليومية: واجهة عربية كاملة، قاعدة بيانات محلية، طباعة وتصدير إلى Excel. النماذج المرفقة من برامج نفذتها بنفسي.' },
      projects: ['bro-video-creator', 'broclips', 'tongue', 'netusage-monitor', 'brodashgraphify', 'bro-mic']
    },
    {
      id: 'android',
      title: { ar: 'برمجة تطبيق أندرويد بواجهة حديثة' },
      text: { ar: 'تطبيق أندرويد أصلي بلغة Kotlin بواجهة حديثة وواضحة، من الفكرة حتى ملف التثبيت. النماذج المرفقة من تطبيقات نفذتها بنفسي.' },
      projects: ['brotimer', 'bro-mic']
    },
    {
      id: 'ai',
      title: { ar: 'دمج الذكاء الاصطناعي في موقعك أو برنامجك' },
      text: { ar: 'أضيف لمشروعك ميزات ذكاء اصطناعي عملية: محادثة، تحويل الصوت إلى نص، قراءة النصوص بصوت طبيعي، أو توليد محتوى — عبر نماذج سحابية أو نماذج محلية تعمل على جهازك بخصوصية تامة.' },
      projects: ['bro-video-creator', 'tongue', 'taste-engine', 'broclips', 'visual-reply', 'halal-graphify']
    }
  ],

  ogKicker: { en: 'Portfolio' },
  ogLine: { en: 'Websites · Web apps · Windows · Android · AI' }
};
