// Copy-paste texts for each platform, generated from the same project data as the site.
// Arabic for Mostaql and Khamsat, English for Freelancer.com.
import { t, visibleProjects } from './content.mjs';

export const RULES = {
  mostaql: [
    { en: 'You need at least 3 works in your portfolio before you can bid on projects.', ar: 'تحتاج 3 أعمال على الأقل في معرضك لتتمكن من تقديم عروض على المشاريع.' },
    { en: 'Basic plan: 10 works. Premium: 20. Professional: 30. Post the items in the order shown here.', ar: 'الخطة الأساسية: 10 أعمال، المميزة: 20، الاحترافية: 30. انشر الأعمال بالترتيب الظاهر هنا.' },
    { en: 'Up to 20 images per work: jpg/jpeg/png, not animated, max 25 MB each. All kit images are 1600×920 PNG.', ar: 'حتى 20 صورة لكل عمل بصيغة jpg أو jpeg أو png غير متحركة، وبحد أقصى 25 ميجابايت للصورة. كل صور الحقيبة بمقاس 1600×920.' },
    { en: 'Use 00-cover.png as the thumbnail (صورة مصغرة), then upload the rest in order.', ar: 'استخدم ⁦00-cover.png⁩ كصورة مصغرة، ثم ارفع بقية الصور بالترتيب.' },
    { en: 'The "link to the work" field may point to your own portfolio site. The kit links hide all contact info (?via=mostaql).', ar: 'يمكن أن يشير حقل «رابط العمل» إلى موقع معرض أعمالك. روابط الحقيبة تخفي كل وسائل التواصل تلقائيًا (⁦?via=mostaql⁩).' }
  ],
  khamsat: [
    { en: 'Samples belong to each service you sell: at least 4 and at most 12 images per service.', ar: 'النماذج تكون داخل كل خدمة تبيعها: 4 صور على الأقل و12 صورة كحد أقصى لكل خدمة.' },
    { en: 'Minimum size 800×460 — kit images are 1600×920 (same shape, sharper).', ar: 'أقل مقاس 800×460 — صور الحقيبة 1600×920 (نفس النسبة وأوضح).' },
    { en: 'No contact details or QR codes, no service text inside images, no logos, frames or stars. Kit images for Khamsat follow these rules (plain screenshots, no cover art).', ar: 'ممنوع وضع وسائل تواصل أو كود QR، أو وصف الخدمة داخل الصورة، أو شعارات وإطارات ونجوم. صور خمسات في الحقيبة تلتزم بذلك (لقطات شاشة فقط بدون غلاف مزخرف).' },
    { en: 'Samples must be your own work — exclusive, not copied.', ar: 'يجب أن تكون النماذج من عملك وحصرية وغير منسوخة.' }
  ],
  freelancer: [
    { en: 'Portfolio images: JPG/PNG/GIF, up to 10 MB each. Freelancer suggests at least 6 portfolio items.', ar: 'صور المعرض: JPG أو PNG أو GIF حتى 10 ميجابايت للصورة. ينصح فريلانسر بـ 6 أعمال على الأقل.' },
    { en: 'Profile → Manage portfolio → Add Portfolio Item. Upload the images, fill the fields, then use the pencil icon to set 00-cover.png as the thumbnail.', ar: 'الملف الشخصي ← ⁦Manage portfolio⁩ ← ⁦Add Portfolio Item⁩. ارفع الصور واملأ الحقول، ثم اختر ⁦00-cover.png⁩ كصورة مصغرة من أيقونة القلم.' },
    { en: 'Texts here are in English. The links open the site in English with contact info hidden (?via=freelancer).', ar: 'النصوص هنا بالإنجليزية، والروابط تفتح الموقع بالإنجليزية مع إخفاء وسائل التواصل (⁦?via=freelancer⁩).' }
  ]
};

const BULLET = '• ';

export function platformTitle(p, lang) {
  const custom = t(p.platformTitle, lang);
  if (custom) return custom;
  const name = t(p.title, lang);
  const sub = t(p.subtitle, lang);
  const full = sub ? `${name} — ${sub}` : name;
  return full.length <= 95 ? full : name;
}

export function platformDescription(p, lang) {
  const desc = t(p.description, lang);
  const paras = Array.isArray(desc) ? desc : String(desc || '').split(/\n\s*\n/);
  const feats = t(p.features, lang) || [];
  const L = lang === 'ar'
    ? { features: 'أهم المزايا:', tech: 'التقنيات:', role: 'دوري:', sep: '، ' }
    : { features: 'Key features:', tech: 'Tech stack:', role: 'My role:', sep: ', ' };
  const parts = [paras.join('\n\n')];
  if (feats.length) parts.push(L.features + '\n' + feats.map((f) => BULLET + f).join('\n'));
  const tail = [];
  if ((p.tech || []).length) tail.push(`${L.tech} ${p.tech.join(L.sep)}`);
  if (t(p.role, lang)) tail.push(`${L.role} ${t(p.role, lang)}`);
  if (tail.length) parts.push(tail.join('\n'));
  return parts.join('\n\n').trim();
}

export function projectLink(siteUrl, id, platform, lang) {
  if (!siteUrl) return '';
  return `${siteUrl.replace(/\/$/, '')}/p/${encodeURIComponent(id)}/?via=${platform}&lang=${lang}`;
}

/** Anything that looks like contact info must never appear in platform texts. */
const LEAKS = [
  /[\w.+-]+@[\w-]+\.[\w.-]+/, // email
  /(?:\+|\b00)\d[\d\s-]{7,}\d|\b0\d{9,}\b/, // phone number (+20 …, 00966 …, 01xxxxxxxxx)
  /wa\.me|whatsapp|واتس|واتساب|telegram|تيليجرام|تلغرام|t\.me\//i
];
export function findLeaks(text) {
  return LEAKS.filter((re) => re.test(text)).map((re) => String(re));
}

/**
 * @param {object} profile
 * @param {object[]} projects
 * @param {{siteUrl: string, kitImages: Record<string, {cover: string, gallery: string[], khamsat: string[]}>}} ctx
 */
export function buildKit(profile, projects, ctx) {
  const vis = visibleProjects(projects);
  const date = (p) => p.date || (p.year ? String(p.year) : '');
  const mostaql = vis.filter((p) => (p.platforms || {}).mostaql !== false).map((p) => {
    const k = ctx.kitImages[p.id] || { cover: '', gallery: [] };
    return {
      id: p.id,
      heading: platformTitle(p, 'ar'),
      title: platformTitle(p, 'ar'),
      description: platformDescription(p, 'ar'),
      skills: ((p.skills || {}).mostaql || p.tech || []).join('، '),
      link: projectLink(ctx.siteUrl, p.id, 'mostaql', 'ar') || '(publish the site first / انشر الموقع أولًا)',
      date: date(p),
      thumbnail: k.cover,
      files: k.gallery.slice(0, 20),
      folder: `kit/${p.id}/`
    };
  });
  const freelancer = vis.filter((p) => (p.platforms || {}).freelancer !== false).map((p) => {
    const k = ctx.kitImages[p.id] || { cover: '', gallery: [] };
    return {
      id: p.id,
      heading: platformTitle(p, 'en'),
      title: platformTitle(p, 'en'),
      description: platformDescription(p, 'en'),
      skills: ((p.skills || {}).freelancer || p.tech || []).join(', '),
      link: projectLink(ctx.siteUrl, p.id, 'freelancer', 'en') || '(publish the site first)',
      date: date(p),
      thumbnail: k.cover,
      files: [k.cover, ...k.gallery].filter(Boolean),
      folder: `kit/${p.id}/`
    };
  });
  const khamsat = (profile.khamsat || []).map((s) => ({
    id: s.id,
    heading: t(s.title, 'ar'),
    title: t(s.title, 'ar'),
    description: t(s.text, 'ar'),
    files: (ctx.khamsatImages[s.id] || []),
    folder: `kit/khamsat/${s.id}/`,
    preview: ''
  }));

  // Safety net: platform texts must not carry contact details.
  const problems = [];
  for (const [platform, items] of Object.entries({ mostaql, freelancer, khamsat })) {
    for (const it of items) {
      for (const field of ['title', 'description', 'skills']) {
        const leaks = findLeaks(it[field] || '');
        if (leaks.length) problems.push(`${platform}/${it.id}/${field}: looks like contact info (${leaks.join(', ')})`);
      }
    }
  }
  return { kit: { siteUrl: ctx.siteUrl, generated: new Date().toISOString().slice(0, 10), rules: RULES, mostaql, khamsat, freelancer }, problems };
}

export function kitTxt(item, platform) {
  const ar = platform !== 'freelancer';
  const L = ar
    ? { title: 'العنوان', desc: 'الوصف', skills: 'المهارات', link: 'رابط العمل', date: 'تاريخ الإنجاز', thumb: 'الصورة المصغرة', files: 'الصور' }
    : { title: 'Title', desc: 'Description', skills: 'Skills', link: 'URL', date: 'Date', thumb: 'Thumbnail', files: 'Files' };
  const out = [
    `=== ${L.title} ===`, item.title, '',
    `=== ${L.desc} ===`, item.description, ''
  ];
  if (item.skills) out.push(`=== ${L.skills} ===`, item.skills, '');
  if (item.link) out.push(`=== ${L.link} ===`, item.link, '');
  if (item.date) out.push(`=== ${L.date} ===`, item.date, '');
  if (item.thumbnail) out.push(`=== ${L.thumb} ===`, item.thumbnail, '');
  if ((item.files || []).length) out.push(`=== ${L.files} ===`, ...item.files, '');
  return out.join('\n');
}
