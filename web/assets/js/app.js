/* BroPortfolio front-end. Renders the home page, the project pages and the upload kit from
   window.BRO_PROFILE, window.BRO_PROJECTS, window.BRO_MEDIA (and window.BRO_KIT on the kit page).
   No framework and no fetch(), so it also works when opened straight from disk (file://). */
(function () {
  'use strict';

  var PROFILE = window.BRO_PROFILE || {};
  var MEDIA = window.BRO_MEDIA || {};
  var KIT = window.BRO_KIT || null;
  var ROOT = document.documentElement.getAttribute('data-root') || '';
  var PAGE = document.body.getAttribute('data-page');
  var IS_FILE = location.protocol === 'file:';
  var PROJECTS = (window.BRO_PROJECTS || [])
    .filter(function (p) { return p && p.id && !p.hidden; })
    .sort(function (a, b) {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (a.order || 999) - (b.order || 999) || (b.year || 0) - (a.year || 0);
    });

  /* ---------- Storage (never throws: private windows can block it) ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  /* ---------- Platform mode: ?via=mostaql|khamsat|freelancer hides all contact details ---------- */
  var PLATFORMS = {
    mostaql: { en: 'Mostaql', ar: 'مستقل' },
    khamsat: { en: 'Khamsat', ar: 'خمسات' },
    freelancer: { en: 'Freelancer.com', ar: 'فريلانسر' }
  };
  var params = new URLSearchParams(location.search);
  var via = params.get('via');
  if (via && PLATFORMS[via]) ssSet('bro.via', via);
  else via = ssGet('bro.via');
  if (!PLATFORMS[via]) via = null;

  var lang = document.documentElement.lang === 'en' ? 'en' : 'ar';

  /* ---------- UI strings ---------- */
  var UI = {
    en: {
      skip: 'Skip to projects', skipGallery: 'Skip to screenshots',
      navWork: 'Work', navServices: 'Services', navAbout: 'About', navContact: 'Contact',
      otherLang: 'العربية', themeLabel: 'Switch light / dark', langLabel: 'Switch language',
      seeWork: 'See my work', contactMe: 'Contact me', hireOn: 'Hire me on {p}',
      projectsStat: 'projects in this portfolio', liveStat: 'live websites & apps',
      servicesKicker: 'Services', servicesTitle: 'What I can build for you',
      servicesSub: 'From a landing page to a complete system — designed, built and launched by one person you can talk to directly.',
      workKicker: 'Portfolio', workTitle: 'Selected work',
      workSub: 'Real projects with real screenshots. Many are live or open source, so you can try them yourself.',
      all: 'All', clientWork: 'Client work', noResults: 'No projects in this category yet.',
      viewProject: 'View project',
      aboutKicker: 'About', aboutTitle: 'About me', expTitle: 'Experience', stackTitle: 'Tools I use',
      contactTitle: 'Have a project in mind?',
      contactSub: 'Tell me about your idea and I will suggest the simplest way to build it.',
      email: 'Email', linkedin: 'LinkedIn', github: 'GitHub',
      footerBuilt: 'Built with', footerOpen: 'open source',
      allProjects: 'All projects', liveSite: 'Open the live site', sourceCode: 'Source code', otherLink: 'More',
      aboutProject: 'About the project', features: 'Key features', tech: 'Tech stack', role: 'My role',
      year: 'Year', type: 'Type', status: 'Status', more: 'More projects', imageOf: 'Image {i} of {n}',
      close: 'Close', prev: 'Previous image', next: 'Next image', open: 'Open full size',
      viaBanner: 'You are viewing my portfolio from {p}. Message me there to start your project.',
      noImages: 'Screenshots coming soon.',
      kitTitle: 'Upload kit', kitSub: 'Everything ready to copy and paste into each platform. Images are in the kit folder of the project on your PC.',
      copy: 'Copy', copied: 'Copied', posted: 'Posted', titleF: 'Title', descF: 'Description', skillsF: 'Skills', linkF: 'Link to the work',
      dateF: 'Completion date', filesF: 'Images to upload (in this order)', thumbF: 'Thumbnail', folder: 'Folder',
      rulesTitle: 'Rules for this platform', kitMissing: 'Run the build first (Preview.bat or Publish.bat) to generate the kit.',
      serviceF: 'Service title', serviceDesc: 'Service description', khamsatNote: 'Khamsat shows samples inside each service you sell (4–12 images per service).'
    },
    ar: {
      skip: 'انتقل إلى الأعمال', skipGallery: 'انتقل إلى الصور',
      navWork: 'أعمالي', navServices: 'الخدمات', navAbout: 'نبذة عني', navContact: 'تواصل',
      otherLang: 'English', themeLabel: 'تبديل المظهر الفاتح / الداكن', langLabel: 'تغيير اللغة',
      seeWork: 'شاهد أعمالي', contactMe: 'تواصل معي', hireOn: 'وظّفني على {p}',
      projectsStat: 'مشروعًا في هذا المعرض', liveStat: 'مواقع وتطبيقات تعمل الآن',
      servicesKicker: 'الخدمات', servicesTitle: 'ماذا يمكنني أن أبني لك؟',
      servicesSub: 'من صفحة هبوط بسيطة إلى نظام متكامل — تصميم وتنفيذ وإطلاق مع شخص واحد تتواصل معه مباشرة.',
      workKicker: 'معرض الأعمال', workTitle: 'نماذج من أعمالي',
      workSub: 'مشاريع حقيقية بصور حقيقية. كثير منها يعمل الآن أو مفتوح المصدر لتجربه بنفسك.',
      all: 'الكل', clientWork: 'أعمال لعملاء', noResults: 'لا توجد مشاريع في هذا القسم بعد.',
      viewProject: 'عرض المشروع',
      aboutKicker: 'من أنا', aboutTitle: 'نبذة عني', expTitle: 'الخبرة', stackTitle: 'الأدوات التي أستخدمها',
      contactTitle: 'لديك فكرة مشروع؟',
      contactSub: 'أخبرني بفكرتك وسأقترح عليك أبسط طريقة لتنفيذها.',
      email: 'البريد الإلكتروني', linkedin: 'لينكدإن', github: 'جيت هب',
      footerBuilt: 'صُمم باستخدام', footerOpen: 'مفتوح المصدر',
      allProjects: 'كل الأعمال', liveSite: 'زيارة الموقع', sourceCode: 'الكود المصدري', otherLink: 'المزيد',
      aboutProject: 'عن المشروع', features: 'أهم المزايا', tech: 'التقنيات المستخدمة', role: 'دوري',
      year: 'السنة', type: 'النوع', status: 'الحالة', more: 'أعمال أخرى', imageOf: 'صورة {i} من {n}',
      close: 'إغلاق', prev: 'الصورة السابقة', next: 'الصورة التالية', open: 'عرض بالحجم الكامل',
      viaBanner: 'أنت تتصفح معرض أعمالي من {p}. راسلني هناك لنبدأ مشروعك.',
      noImages: 'الصور قريبًا.',
      kitTitle: 'حقيبة الرفع', kitSub: 'كل ما تحتاجه جاهز للنسخ واللصق في كل منصة. الصور موجودة في مجلد kit داخل المشروع على جهازك.',
      copy: 'نسخ', copied: 'تم النسخ', posted: 'تم النشر', titleF: 'العنوان', descF: 'الوصف', skillsF: 'المهارات', linkF: 'رابط العمل',
      dateF: 'تاريخ الإنجاز', filesF: 'الصور المطلوب رفعها (بهذا الترتيب)', thumbF: 'الصورة المصغرة', folder: 'المجلد',
      rulesTitle: 'قواعد هذه المنصة', kitMissing: 'شغّل البناء أولًا (Preview.bat أو Publish.bat) لإنشاء الحقيبة.',
      serviceF: 'عنوان الخدمة', serviceDesc: 'وصف الخدمة', khamsatNote: 'خمسات يعرض النماذج داخل كل خدمة تبيعها (من 4 إلى 12 صورة لكل خدمة).'
    }
  };

  var CATS = {
    web: { en: 'Websites', ar: 'مواقع', icon: 'globe' },
    webapp: { en: 'Web apps', ar: 'تطبيقات ويب', icon: 'layers' },
    desktop: { en: 'Desktop apps', ar: 'برامج سطح المكتب', icon: 'monitor' },
    mobile: { en: 'Mobile apps', ar: 'تطبيقات الجوال', icon: 'phone' },
    extension: { en: 'Browser extensions', ar: 'إضافات المتصفح', icon: 'puzzle' },
    'ai-tools': { en: 'AI & dev tools', ar: 'ذكاء اصطناعي وأدوات مطورين', icon: 'sparkles' },
    automation: { en: 'Automation', ar: 'أتمتة', icon: 'workflow' },
    game: { en: 'Games', ar: 'ألعاب', icon: 'gamepad' }
  };
  var STATUS = {
    live: { en: 'Live', ar: 'يعمل الآن', cls: 'badge-live' },
    'open-source': { en: 'Open source', ar: 'مفتوح المصدر', cls: 'badge-open' },
    'in-use': { en: 'In daily use', ar: 'قيد الاستخدام', cls: 'badge-plain' },
    delivered: { en: 'Delivered', ar: 'تم التسليم', cls: 'badge-plain' },
    demo: { en: 'Demo', ar: 'نسخة تجريبية', cls: 'badge-plain' }
  };

  /* ---------- Icons (24px stroke icons) ---------- */
  var ICONS = {
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    back: '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>',
    external: '<path d="M14 4h6v6"/><path d="m20 4-9 9"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    left: '<path d="m15 6-6 6 6 6"/>',
    right: '<path d="m9 6 6 6-6 6"/>',
    monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    phone: '<rect x="7" y="3" width="10" height="18" rx="2.5"/><path d="M11 17.5h2"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/>',
    puzzle: '<path d="M9 4h3a2 2 0 1 1 4 0h3v5a2 2 0 1 1 0 4v6h-5a2 2 0 1 0-4 0H5v-5a2 2 0 1 0 0-4V4h4z"/>',
    sparkles: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/>',
    workflow: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h4a3 3 0 0 1 3 3V14"/>',
    gamepad: '<path d="M6 8h12a4 4 0 0 1 4 4v1a4 4 0 0 1-7 2.6L14 15h-4l-1 .6A4 4 0 0 1 2 13v-1a4 4 0 0 1 4-4z"/><path d="M7 11v3M5.5 12.5h3"/><circle cx="16.5" cy="11.5" r=".6"/><circle cx="18" cy="13.5" r=".6"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    bot: '<rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9.5 16.5h5"/>',
    layout: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 20V9"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>'
  };
  var BRAND = {
    github: '<path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>',
    linkedin: '<path fill="currentColor" stroke="none" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3v-11zm6.5 0h3.8v1.6h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12v6.08h-4v-5.39c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85v5.49h-4v-11z"/>'
  };
  function icon(name, cls) {
    var body = ICONS[name] || BRAND[name] || '';
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  }

  /* ---------- Helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function t(v) {
    if (v == null) return '';
    if (typeof v === 'string' || typeof v === 'number') return String(v);
    if (Array.isArray(v)) return v;
    return v[lang] != null ? v[lang] : (v.en != null ? v.en : (v.ar != null ? v.ar : ''));
  }
  function ui(key, vars) {
    var s = (UI[lang] && UI[lang][key]) || UI.en[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  }
  function $(sel) { return document.querySelector(sel); }
  function set(sel, html) { var el = $(sel); if (el) el.innerHTML = html; return el; }
  function projectUrl(id) { return ROOT + 'p/' + encodeURIComponent(id) + '/' + (IS_FILE ? 'index.html' : ''); }
  function homeUrl(hash) { return ROOT + (IS_FILE ? 'index.html' : '') + (hash || ''); }
  function media(id) { return MEDIA[id] || { cover: null, gallery: [] }; }
  function fmtNum(n) { return lang === 'ar' ? String(n) : String(n); }
  function platformName(p) { return PLATFORMS[p] ? PLATFORMS[p][lang] : p; }
  function joinList(arr) { return arr.join(lang === 'ar' ? '، ' : ', '); }

  function coverImg(p, size, eager) {
    var m = media(p.id);
    var title = t(p.title);
    if (!m.cover) {
      var accent = p.accent || '#14b8a6';
      return '<div style="width:100%;height:100%;display:grid;place-items:center;background:linear-gradient(135deg,' + esc(accent) + ',#0d0f13);color:#fff;font-weight:600;font-size:22px;padding:20px;text-align:center">' + esc(title) + '</div>';
    }
    var src = size === 'thumb' && m.cover.thumb ? m.cover.thumb : m.cover.src;
    return '<img src="' + ROOT + esc(src) + '" alt="' + esc(title) + '" width="' + (m.cover.w || 1600) + '" height="' + (m.cover.h || 920) + '"' + (eager ? '' : ' loading="lazy" decoding="async"') + '>';
  }

  function statusBadges(p, withCat) {
    var out = [];
    if (p.client) out.push('<span class="badge badge-client">' + esc(ui('clientWork')) + '</span>');
    var s = STATUS[p.status];
    if (s) out.push('<span class="badge ' + s.cls + '">' + esc(s[lang]) + '</span>');
    if (withCat && CATS[p.category]) out.push('<span class="badge badge-plain">' + esc(CATS[p.category][lang]) + '</span>');
    return out.join('');
  }

  /* ---------- Toast ---------- */
  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.innerHTML = icon('check') + '<span>' + esc(msg) + '</span>';
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 1600);
  }
  function copyText(text) {
    function done() { toast(ui('copied')); }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else fallback();
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
    }
  }

  /* ---------- Header & footer ---------- */
  function renderHeader() {
    var name = t(PROFILE.name) || 'Portfolio';
    var isDark = (document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
    var nav = PAGE === 'kit' ? '' :
      '<nav class="nav" aria-label="Main">' +
      '<a href="' + homeUrl('#work') + '">' + esc(ui('navWork')) + '</a>' +
      '<a href="' + homeUrl('#services') + '">' + esc(ui('navServices')) + '</a>' +
      '<a href="' + homeUrl('#about') + '">' + esc(ui('navAbout')) + '</a>' +
      (via ? '' : '<a href="' + homeUrl('#contact') + '">' + esc(ui('navContact')) + '</a>') +
      '</nav>';
    set('#site-header',
      '<div class="wrap">' +
      '<a class="brand" href="' + homeUrl('') + '"><span class="brand-mark">' + esc(t(PROFILE.monogram) || name.charAt(0)) + '</span><span class="brand-name">' + esc(name) + '</span></a>' +
      nav +
      '<div class="tools">' +
      '<button class="icon-btn" id="lang-btn" type="button" aria-label="' + esc(ui('langLabel')) + '">' + icon('globe') + '<span>' + esc(ui('otherLang')) + '</span></button>' +
      '<button class="icon-btn" id="theme-btn" type="button" aria-label="' + esc(ui('themeLabel')) + '">' + icon(isDark ? 'sun' : 'moon') + '</button>' +
      '</div></div>');
    $('#lang-btn').onclick = function () {
      lang = lang === 'ar' ? 'en' : 'ar';
      lsSet('bro.lang', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      renderAll();
    };
    $('#theme-btn').onclick = function () {
      var cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      lsSet('bro.theme', next);
      renderHeader();
    };
    var banner = $('#via-banner');
    if (banner) {
      if (via && PAGE !== 'kit') { banner.textContent = ui('viaBanner', { p: platformName(via) }); banner.hidden = false; }
      else banner.hidden = true;
    }
  }

  function renderFooter() {
    var year = new Date().getFullYear();
    var repo = PROFILE.repoUrl || 'https://github.com/omar1001/BroPortfolio';
    set('#site-footer',
      '<div class="wrap"><span>© ' + year + ' ' + esc(t(PROFILE.name)) + '</span>' +
      '<span>' + esc(ui('footerBuilt')) + ' <a href="' + esc(repo) + '" target="_blank" rel="noopener">BroPortfolio</a> — ' + esc(ui('footerOpen')) + '</span></div>');
  }

  /* ---------- Cards ---------- */
  function card(p) {
    var cat = CATS[p.category];
    var tech = (p.tech || []).slice(0, 4).map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join('');
    return '<article class="card" data-cat="' + esc(p.category) + '" data-client="' + (p.client ? '1' : '0') + '">' +
      '<div class="card-media">' + coverImg(p, 'thumb') + '<div class="card-badges">' + statusBadges(p) + '</div></div>' +
      '<div class="card-body">' +
      '<div class="card-cat">' + (cat ? icon(cat.icon) .replace('<svg ', '<svg width="15" height="15" ') + '<span>' + esc(cat[lang]) + '</span>' : '') + (p.year ? '<span>·</span><span>' + esc(p.year) + '</span>' : '') + '</div>' +
      '<h3><a href="' + projectUrl(p.id) + '">' + esc(t(p.title)) + '</a></h3>' +
      '<p>' + esc(t(p.summary) || t(p.subtitle)) + '</p>' +
      '<div class="card-tech">' + tech + '</div>' +
      '</div></article>';
  }

  /* ---------- Home ---------- */
  var activeFilter = ssGet('bro.filter') || 'all';

  function renderHome() {
    var P = PROFILE;
    document.title = t(P.siteTitle) || t(P.name);

    set('#hero-eyebrow', '<span class="eyebrow"><span class="dot"></span>' + esc(t(P.eyebrow)) + '</span>');
    var headline = t(P.headline) || '';
    var hl = t(P.headlineHighlight);
    var h1 = esc(headline);
    if (hl && headline.indexOf(hl) >= 0) h1 = esc(headline).replace(esc(hl), '<span class="hl">' + esc(hl) + '</span>');
    set('#hero-title', h1);
    set('#hero-lead', esc(t(P.lead)));

    var cta = '<a class="btn btn-primary" href="#work">' + esc(ui('seeWork')) + icon('arrow', 'flip') + '</a>';
    if (via && P.platforms && P.platforms[via]) cta += '<a class="btn btn-accent" href="' + esc(P.platforms[via]) + '" target="_blank" rel="noopener">' + esc(ui('hireOn', { p: platformName(via) })) + '</a>';
    else if (!via) cta += '<a class="btn btn-ghost" href="#contact">' + esc(ui('contactMe')) + '</a>';
    set('#hero-cta', cta);

    var live = PROJECTS.filter(function (p) { return p.status === 'live'; }).length;
    var stats = [
      { value: fmtNum(PROJECTS.length), label: ui('projectsStat') },
      { value: fmtNum(live), label: ui('liveStat') }
    ].concat((P.stats || []).map(function (s) { return { value: t(s.value), label: t(s.label) }; })).slice(0, 4);
    set('#hero-stats', stats.map(function (s) { return '<div class="stat"><b><bdi dir="ltr">' + esc(s.value) + '</bdi></b><span>' + esc(s.label) + '</span></div>'; }).join(''));

    var withCover = PROJECTS.filter(function (p) { return media(p.id).cover; });
    var fan = (P.heroProjects || []).map(function (id) { return PROJECTS.find(function (p) { return p.id === id; }); }).filter(Boolean);
    if (fan.length < 3) fan = fan.concat(withCover.filter(function (p) { return fan.indexOf(p) < 0; })).slice(0, 3);
    set('#hero-fan', fan.slice(0, 3).map(function (p, i) { return '<a href="' + projectUrl(p.id) + '" tabindex="-1">' + coverImg(p, 'thumb', i < 3) + '</a>'; }).join(''));

    var strip = withCover.map(function (p) { return '<a href="' + projectUrl(p.id) + '" tabindex="-1" title="' + esc(t(p.title)) + '">' + coverImg(p, 'thumb') + '</a>'; }).join('');
    set('#strip-track', strip + strip);
    var stripEl = $('#strip'); if (stripEl) stripEl.hidden = withCover.length < 4;

    // Services
    set('#services-kicker', esc(ui('servicesKicker')));
    set('#services-title', esc(ui('servicesTitle')));
    set('#services-sub', esc(ui('servicesSub')));
    set('#services-list', (P.services || []).map(function (s) {
      var ex = (s.examples || []).map(function (id) { return PROJECTS.find(function (p) { return p.id === id; }); }).filter(Boolean)
        .map(function (p) { return '<a href="' + projectUrl(p.id) + '">' + esc(t(p.shortName) || t(p.title).split(' — ')[0]) + '</a>'; }).join('');
      return '<div class="service"><div class="ico">' + icon(s.icon || 'code') + '</div><h3>' + esc(t(s.title)) + '</h3><p>' + esc(t(s.text)) + '</p>' + (ex ? '<div class="examples">' + ex + '</div>' : '') + '</div>';
    }).join(''));

    // Work
    set('#work-kicker', esc(ui('workKicker')));
    set('#work-title', esc(ui('workTitle')));
    set('#work-sub', esc(ui('workSub')));
    renderFilters();
    renderGrid();

    // About
    set('#about-kicker', esc(ui('aboutKicker')));
    set('#about-title', esc(ui('aboutTitle')));
    set('#about-body', (t(P.about) || []).map(function (para) { return '<p>' + esc(para) + '</p>'; }).join(''));
    set('#stack', '<h3 style="font-size:18px">' + esc(ui('stackTitle')) + '</h3>' + (P.stack || []).map(function (g) {
      return '<div><h4>' + esc(t(g.group)) + '</h4><div>' + g.items.map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join('') + '</div></div>';
    }).join(''));
    set('#exp-title', esc(ui('expTitle')));
    set('#timeline', (P.timeline || []).map(function (e) {
      return '<li><div class="when">' + esc(t(e.when)) + '</div><div class="what">' + esc(t(e.what)) + '</div><div class="where">' + esc(t(e.where)) + '</div></li>';
    }).join(''));

    // Contact (removed entirely in platform mode)
    var contactSec = $('#contact');
    if (via) { if (contactSec) contactSec.hidden = true; }
    else if (contactSec) {
      contactSec.hidden = false;
      var c = P.contact || {};
      var links = '';
      if (c.email && c.email.length === 2) {
        var addr = c.email[0] + '@' + c.email[1];
        links += '<a href="mailto:' + esc(addr) + '">' + icon('mail') + '<span><small>' + esc(ui('email')) + '</small>' + esc(addr) + '</span></a>';
      }
      if (c.linkedin) links += '<a href="' + esc(c.linkedin) + '" target="_blank" rel="noopener">' + icon('linkedin') + '<span><small>' + esc(ui('linkedin')) + '</small>' + esc(c.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')) + '</span></a>';
      if (c.github) links += '<a href="' + esc(c.github) + '" target="_blank" rel="noopener">' + icon('github') + '<span><small>' + esc(ui('github')) + '</small>' + esc(c.github.replace(/^https?:\/\/(www\.)?/, '')) + '</span></a>';
      set('#contact-box', '<div style="position:relative;z-index:1"><h2 id="contact-title">' + esc(ui('contactTitle')) + '</h2><p>' + esc(ui('contactSub')) + '</p></div><div class="contact-links">' + links + '</div>');
    }
  }

  function renderFilters() {
    var counts = { all: PROJECTS.length, client: 0 };
    PROJECTS.forEach(function (p) { counts[p.category] = (counts[p.category] || 0) + 1; if (p.client) counts.client++; });
    var keys = ['all'].concat(Object.keys(CATS).filter(function (k) { return counts[k]; }));
    if (counts.client) keys.push('client');
    if (keys.indexOf(activeFilter) < 0) activeFilter = 'all';
    set('#filters', keys.map(function (k) {
      var label = k === 'all' ? ui('all') : k === 'client' ? ui('clientWork') : CATS[k][lang];
      return '<button class="filter" type="button" data-f="' + k + '" aria-pressed="' + (k === activeFilter) + '">' + esc(label) + '<span class="n">' + counts[k] + '</span></button>';
    }).join(''));
    Array.prototype.forEach.call(document.querySelectorAll('#filters .filter'), function (b) {
      b.onclick = function () { activeFilter = b.getAttribute('data-f'); ssSet('bro.filter', activeFilter); renderFilters(); renderGrid(); };
    });
  }

  function renderGrid() {
    var list = PROJECTS.filter(function (p) {
      return activeFilter === 'all' || (activeFilter === 'client' ? p.client : p.category === activeFilter);
    });
    set('#grid', list.length ? list.map(card).join('') : '<div class="empty">' + esc(ui('noResults')) + '</div>');
  }

  /* ---------- Project page ---------- */
  var gallery = [], gIndex = 0;

  function renderProject() {
    var id = document.documentElement.getAttribute('data-project') || params.get('id');
    var p = PROJECTS.find(function (x) { return x.id === id; }) || (window.BRO_PROJECTS || []).find(function (x) { return x.id === id; });
    if (!p) { set('#p-head', '<h1>404</h1><p class="sub"><a href="' + homeUrl('') + '">' + esc(ui('allProjects')) + '</a></p>'); return; }
    document.title = t(p.title) + ' — ' + t(PROFILE.name);

    set('#crumbs', '<a href="' + homeUrl('#work') + '" style="display:inline-flex;gap:6px;align-items:center">' + icon('back', 'flip') + esc(ui('allProjects')) + '</a>');

    var actions = '';
    var L = p.links || {};
    // Some live sites are contact funnels (WhatsApp buttons) — hide them on platform links.
    var hidden = via ? (L.hideOnPlatforms || []) : [];
    if (L.live && hidden.indexOf('live') < 0) actions +='<a class="btn btn-primary" href="' + esc(L.live) + '" target="_blank" rel="noopener">' + esc(ui('liveSite')) + icon('external') + '</a>';
    if (L.github) actions += '<a class="btn btn-ghost" href="' + esc(L.github) + '" target="_blank" rel="noopener">' + icon('github') + esc(ui('sourceCode')) + '</a>';
    (L.other || []).forEach(function (o) { actions += '<a class="btn btn-ghost" href="' + esc(o.url) + '" target="_blank" rel="noopener">' + esc(t(o.label) || ui('otherLink')) + icon('external') + '</a>'; });
    if (via && PROFILE.platforms && PROFILE.platforms[via]) actions += '<a class="btn btn-accent" href="' + esc(PROFILE.platforms[via]) + '" target="_blank" rel="noopener">' + esc(ui('hireOn', { p: platformName(via) })) + '</a>';

    set('#p-head',
      '<div class="p-meta">' + statusBadges(p, true) + (p.year ? '<span class="badge badge-plain">' + esc(p.year) + '</span>' : '') + '</div>' +
      '<h1>' + esc(t(p.title)) + '</h1>' +
      '<p class="sub">' + esc(t(p.subtitle)) + '</p>' +
      (actions ? '<div class="p-actions">' + actions + '</div>' : ''));

    gallery = (media(p.id).gallery || []);
    gIndex = 0;
    renderGallery(p);

    var desc = t(p.description);
    var paras = Array.isArray(desc) ? desc : String(desc || '').split(/\n\s*\n/);
    var feats = t(p.features) || [];
    var cat = CATS[p.category];
    var facts = '';
    if ((p.tech || []).length) facts += '<div class="row"><dt>' + esc(ui('tech')) + '</dt><dd>' + p.tech.map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join('') + '</dd></div>';
    if (t(p.role)) facts += '<div class="row"><dt>' + esc(ui('role')) + '</dt><dd>' + esc(t(p.role)) + '</dd></div>';
    if (cat) facts += '<div class="row"><dt>' + esc(ui('type')) + '</dt><dd>' + esc(cat[lang]) + '</dd></div>';
    if (p.year) facts += '<div class="row"><dt>' + esc(ui('year')) + '</dt><dd>' + esc(p.year) + '</dd></div>';

    set('#p-body',
      '<div class="p-desc"><h2>' + esc(ui('aboutProject')) + '</h2>' + paras.map(function (x) { return '<p style="margin-bottom:12px">' + esc(x) + '</p>'; }).join('') +
      (feats.length ? '<h2 style="margin-top:30px">' + esc(ui('features')) + '</h2><ul class="features">' + feats.map(function (f) { return '<li>' + icon('check') + '<span>' + esc(f) + '</span></li>'; }).join('') + '</ul>' : '') +
      '</div>' +
      '<aside><div class="facts"><dl>' + facts + '</dl></div></aside>');

    var others = PROJECTS.filter(function (x) { return x.id !== p.id; });
    others.sort(function (a, b) { return (b.category === p.category ? 1 : 0) - (a.category === p.category ? 1 : 0); });
    set('#more', others.length ? '<h2 id="more-title">' + esc(ui('more')) + '</h2><div class="grid">' + others.slice(0, 3).map(card).join('') + '</div>' : '');
  }

  function renderGallery(p) {
    if (!gallery.length) {
      set('#gallery', '<div class="g-main" style="cursor:default">' + coverImg(p, 'full', true) + '</div><p class="g-cap">' + esc(ui('noImages')) + '</p>');
      return;
    }
    var g = gallery[gIndex];
    var multi = gallery.length > 1;
    set('#gallery',
      '<div class="g-main" id="g-main" role="button" tabindex="0" aria-label="' + esc(ui('open')) + '">' +
      '<img src="' + ROOT + esc(g.src) + '" alt="' + esc(t(g.caption) || t(p.title)) + '" width="' + (g.w || 1600) + '" height="' + (g.h || 920) + '">' +
      (multi ? '<button class="g-nav g-prev" type="button" aria-label="' + esc(ui('prev')) + '">' + icon('left', 'flip') + '</button><button class="g-nav g-next" type="button" aria-label="' + esc(ui('next')) + '">' + icon('right', 'flip') + '</button>' : '') +
      '</div>' +
      '<p class="g-cap">' + esc(t(g.caption)) + (multi ? ' <span class="mono" style="opacity:.7">· ' + esc(ui('imageOf', { i: gIndex + 1, n: gallery.length })) + '</span>' : '') + '</p>' +
      (multi ? '<div class="g-thumbs">' + gallery.map(function (x, i) {
        return '<button type="button" data-i="' + i + '" aria-label="' + esc(ui('imageOf', { i: i + 1, n: gallery.length })) + '" aria-current="' + (i === gIndex) + '"><img src="' + ROOT + esc(x.thumb || x.src) + '" alt="" loading="lazy"></button>';
      }).join('') + '</div>' : ''));

    var main = $('#g-main');
    main.onclick = function (e) { if (e.target.closest('.g-nav')) return; openLightbox(gIndex); };
    main.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(gIndex); } };
    var prev = $('#gallery .g-prev'), next = $('#gallery .g-next');
    if (prev) prev.onclick = function () { stepGallery(-1, p); };
    if (next) next.onclick = function () { stepGallery(1, p); };
    Array.prototype.forEach.call(document.querySelectorAll('#gallery .g-thumbs button'), function (b) {
      b.onclick = function () { gIndex = +b.getAttribute('data-i'); renderGallery(p); };
    });
  }
  function stepGallery(d, p) { gIndex = (gIndex + d + gallery.length) % gallery.length; renderGallery(p); }

  /* ---------- Lightbox ---------- */
  var lb = null, lbIndex = 0, lbLastFocus = null;
  function openLightbox(i) {
    lbIndex = i; lbLastFocus = document.activeElement;
    if (!lb) {
      lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.setAttribute('role', 'dialog');
      lb.setAttribute('aria-modal', 'true');
      document.body.appendChild(lb);
      lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-stage')) closeLightbox(); });
      var sx = null;
      lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
      lb.addEventListener('touchend', function (e) {
        if (sx == null) return; var dx = e.changedTouches[0].clientX - sx; sx = null;
        if (Math.abs(dx) > 50) lbStep((dx < 0 ? 1 : -1) * (lang === 'ar' ? -1 : 1));
      });
    }
    lb.hidden = false;
    document.addEventListener('keydown', lbKeys);
    drawLightbox();
  }
  function drawLightbox() {
    var g = gallery[lbIndex];
    var multi = gallery.length > 1;
    lb.innerHTML =
      '<div class="lb-top"><span class="mono">' + esc(ui('imageOf', { i: lbIndex + 1, n: gallery.length })) + '</span>' +
      '<button class="icon-btn" type="button" id="lb-close" aria-label="' + esc(ui('close')) + '">' + icon('x') + '</button></div>' +
      '<div class="lb-stage"><img src="' + ROOT + esc(g.full || g.src) + '" alt="' + esc(t(g.caption)) + '">' +
      (multi ? '<button class="icon-btn lb-nav lb-prev" type="button" aria-label="' + esc(ui('prev')) + '">' + icon('left', 'flip') + '</button><button class="icon-btn lb-nav lb-next" type="button" aria-label="' + esc(ui('next')) + '">' + icon('right', 'flip') + '</button>' : '') +
      '</div><div class="lb-cap">' + esc(t(g.caption)) + '</div>';
    $('#lb-close').onclick = closeLightbox;
    var pv = lb.querySelector('.lb-prev'), nx = lb.querySelector('.lb-next');
    if (pv) pv.onclick = function (e) { e.stopPropagation(); lbStep(-1); };
    if (nx) nx.onclick = function (e) { e.stopPropagation(); lbStep(1); };
    $('#lb-close').focus();
  }
  function lbStep(d) { lbIndex = (lbIndex + d + gallery.length) % gallery.length; drawLightbox(); }
  function lbKeys(e) {
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') lbStep(lang === 'ar' ? -1 : 1);
    else if (e.key === 'ArrowLeft') lbStep(lang === 'ar' ? 1 : -1);
    else if (e.key === 'Tab') { e.preventDefault(); var btns = lb.querySelectorAll('button'); if (btns.length) btns[(Array.prototype.indexOf.call(btns, document.activeElement) + 1) % btns.length].focus(); }
  }
  function closeLightbox() {
    if (!lb) return;
    lb.hidden = true;
    document.removeEventListener('keydown', lbKeys);
    if (lbLastFocus && lbLastFocus.focus) lbLastFocus.focus();
  }

  /* ---------- Upload kit page ---------- */
  var kitTab = ssGet('bro.kitTab') || 'mostaql';
  function renderKit() {
    document.title = ui('kitTitle') + ' — BroPortfolio';
    set('#kit-head', '<h1>' + esc(ui('kitTitle')) + '</h1><p>' + esc(ui('kitSub')) + '</p>');
    if (!KIT) { set('#kit-panel', '<div class="empty">' + esc(ui('kitMissing')) + '</div>'); return; }
    var tabs = ['mostaql', 'khamsat', 'freelancer'];
    set('#kit-tabs', tabs.map(function (k) {
      var n = (KIT[k] || []).length;
      return '<button class="tab" role="tab" type="button" data-k="' + k + '" aria-selected="' + (k === kitTab) + '">' + esc(platformName(k)) + ' <span class="mono" style="opacity:.6">' + n + '</span></button>';
    }).join(''));
    Array.prototype.forEach.call(document.querySelectorAll('#kit-tabs .tab'), function (b) {
      b.onclick = function () { kitTab = b.getAttribute('data-k'); ssSet('bro.kitTab', kitTab); renderKit(); };
    });

    var rules = (KIT.rules && KIT.rules[kitTab]) || [];
    var html = rules.length ? '<div class="rules"><h3>' + esc(ui('rulesTitle')) + '</h3><ul>' + rules.map(function (r) { return '<li>' + esc(t(r)) + '</li>'; }).join('') + '</ul></div>' : '';
    var items = KIT[kitTab] || [];
    html += '<div class="kit-list">' + items.map(function (it, idx) {
      var key = 'bro.kit.' + kitTab + '.' + it.id;
      var done = lsGet(key) === '1';
      var p = PROJECTS.find(function (x) { return x.id === it.id; });
      var thumb = p ? coverImg(p, 'thumb') : (it.preview ? '<img src="' + ROOT + esc(it.preview) + '" alt="" loading="lazy">' : '');
      var fields = [];
      fields.push(field(kitTab === 'khamsat' ? ui('serviceF') : ui('titleF'), it.title, idx + 't'));
      fields.push(field(kitTab === 'khamsat' ? ui('serviceDesc') : ui('descF'), it.description, idx + 'd'));
      if (it.skills) fields.push(field(ui('skillsF'), it.skills, idx + 's'));
      if (it.link) fields.push(field(ui('linkF'), it.link, idx + 'l'));
      if (it.date) fields.push(field(ui('dateF'), it.date, idx + 'y'));
      var files = '<div class="kit-files"><b style="font-family:var(--font);font-weight:450">' + esc(ui('filesF')) + '</b><br>' +
        (it.thumbnail ? esc(ui('thumbF')) + ': <code>' + esc(it.thumbnail) + '</code><br>' : '') +
        (it.files || []).map(function (f, i) { return (i + 1) + '. <code>' + esc(f) + '</code>'; }).join('<br>') +
        (it.folder ? '<br>' + esc(ui('folder')) + ': <code>' + esc(it.folder) + '</code>' : '') + '</div>';
      return '<article class="kit-item' + (done ? ' done' : '') + '"><div class="thumb">' + thumb + '</div><div>' +
        '<h3>' + esc(it.heading || it.title) + '<label class="kit-check"><input type="checkbox" data-key="' + esc(key) + '"' + (done ? ' checked' : '') + '>' + esc(ui('posted')) + '</label></h3>' +
        '<div class="kit-fields">' + fields.join('') + files + '</div></div></article>';
    }).join('') + '</div>';
    set('#kit-panel', html);

    Array.prototype.forEach.call(document.querySelectorAll('#kit-panel [data-copy]'), function (b) {
      b.onclick = function () { copyText(kitValues[b.getAttribute('data-copy')]); };
    });
    Array.prototype.forEach.call(document.querySelectorAll('#kit-panel .kit-check input'), function (c) {
      c.onchange = function () { lsSet(c.getAttribute('data-key'), c.checked ? '1' : '0'); c.closest('.kit-item').classList.toggle('done', c.checked); };
    });
  }
  var kitValues = {};
  function field(label, value, key) {
    kitValues[key] = value;
    return '<div class="kit-field"><header><b>' + esc(label) + '</b><button class="btn btn-ghost btn-sm" type="button" data-copy="' + esc(key) + '">' + icon('copy') + esc(ui('copy')) + '</button></header><pre>' + esc(value) + '</pre></div>';
  }

  /* ---------- Boot ---------- */
  function renderAll() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = ui(el.getAttribute('data-i18n')); });
    renderHeader();
    if (PAGE === 'home') renderHome();
    else if (PAGE === 'project') renderProject();
    else if (PAGE === 'kit') renderKit();
    renderFooter();
  }
  renderAll();
  if (PAGE === 'home' && location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) setTimeout(function () { target.scrollIntoView(); }, 30);
  }
})();
