// =====================================================================================
//  YOUR PROJECTS — one block per project. To add one: run "Add Project.bat", or copy a block,
//  change the text, and put its screenshots in content/media/<id>/.
//
//  Fields (en = English, ar = Arabic):
//    id          short name used in links and folders (a-z, 0-9, -)
//    featured    true = shown first        hidden  true = not shown anywhere (kept for later)
//    category    web | webapp | desktop | mobile | extension | ai-tools | automation | game
//    status      live | open-source | in-use | delivered | demo        client  true = client work
//    accent      colour of the cover background
//    title       the name           subtitle  what it is (one line)    summary  one line for cards
//    description 3–5 short sentences          features  5–8 bullets    role  what you did
//    tech        technologies                 skills    tags for Mostaql (ar) and Freelancer (en)
//    links       live / github / other[] — hideOnPlatforms: ['live'] hides the live link on
//                Mostaql/Khamsat/Freelancer links (use it for sites that push WhatsApp contact)
//    images      screenshots in content/media/<id>/, in order. { files: [a, b, c] } puts phone
//                screens side by side. crop: true trims a 16:9 picture to the kit shape.
//                khamsat: false keeps an image out of the Khamsat bundles (contact buttons etc.)
//    cover       { main, phone } or { phones: [...] } — the picture on the card and thumbnail
//    date        completion date for Mostaql (YYYY-MM)
// =====================================================================================
window.BRO_PROJECTS = [
  {
    id: 'jotlite',
    featured: true,
    order: 1,
    category: 'webapp',
    year: 2026,
    date: '2026-03',
    status: 'live',
    client: false,
    accent: '#10b981',
    title: { en: 'JotLite', ar: 'JotLite' },
    subtitle: { en: 'Free online notepad with drawing — no sign-up', ar: 'مفكرة أونلاين مجانية مع الرسم — بدون تسجيل' },
    summary: {
      en: 'Type, draw and export notes right in the browser. No account needed.',
      ar: 'اكتب وارسم وصدّر ملاحظاتك من المتصفح مباشرة، دون إنشاء حساب.'
    },
    description: {
      en: 'Most note apps ask you to sign up before you can write a single line. JotLite opens straight into a ready note: you type, draw and add images, and everything saves automatically in the browser, even if the connection drops.\n\nIt is built for students, office workers and writers who want a quick place to think, and any note can be exported as a PDF or an image. Signing in with Google is optional and only adds sync across devices. The app is live and free at jotlite.online.',
      ar: 'أغلب تطبيقات الملاحظات تطلب إنشاء حساب قبل أن تكتب سطرًا واحدًا. يفتح JotLite مباشرة على ملاحظة جاهزة: تكتب وترسم وتضيف الصور، ويُحفظ كل شيء تلقائيًا داخل المتصفح حتى لو انقطع الاتصال.\n\nصُمّم للطلاب والموظفين والكتّاب الذين يحتاجون مساحة سريعة لتدوين أفكارهم، ويمكن تصدير أي ملاحظة كملف PDF أو صورة. تسجيل الدخول بحساب Google اختياري ويضيف المزامنة بين الأجهزة فقط، والتطبيق متاح مجانًا الآن على jotlite.online.'
    },
    features: {
      en: [
        'Start writing instantly — no account, no download',
        'Autosaves in the browser; keeps working if the connection drops',
        'Draw on notes with pen, shapes, arrows and eraser',
        'Insert images, then move, resize and rotate them',
        'Export any note as a PDF or an image',
        'Optional Google sign-in syncs notes across devices',
        'Right-to-left text boxes for writing in Arabic'
      ],
      ar: [
        'ابدأ الكتابة فورًا بدون حساب أو تحميل',
        'حفظ تلقائي في المتصفح، ويستمر في العمل إذا انقطع الإنترنت',
        'الرسم على الملاحظات بالقلم والأشكال والأسهم والممحاة',
        'إدراج الصور مع تحريكها وتغيير حجمها وتدويرها',
        'تصدير أي ملاحظة كملف PDF أو صورة',
        'مزامنة اختيارية بين الأجهزة عبر حساب Google',
        'صناديق نص تدعم الكتابة العربية من اليمين لليسار'
      ]
    },
    role: { en: 'Solo — product idea, UI design, development, SEO pages and deployment', ar: 'عمل فردي — الفكرة وتصميم الواجهة والبرمجة وصفحات تحسين الظهور في محركات البحث والنشر' },
    tech: ['JavaScript', 'React', 'Vite', 'IndexedDB', 'Firebase', 'jsPDF'],
    links: { live: 'https://jotlite.online', github: '', other: [{ label: { en: 'Open the app', ar: 'افتح التطبيق' }, url: 'https://jotlite.online/app' }] },
    skills: {
      mostaql: ['تطوير مواقع الويب', 'تطبيقات الويب', 'JavaScript', 'React', 'Firebase', 'HTML5', 'CSS3', 'تصميم واجهات المستخدم', 'تحسين محركات البحث SEO'],
      freelancer: ['JavaScript', 'React.js', 'Firebase', 'HTML5', 'CSS', 'Web Development', 'Website Design', 'SEO']
    },
    images: [
      { file: 'draw.png', caption: { en: 'Sketch right on top of a note — here a page wireframe', ar: 'ارسم مباشرة فوق الملاحظة — هنا مخطط لصفحة موقع' } },
      { file: 'editor.png', caption: { en: 'The editor with a formatted note', ar: 'المحرر مع ملاحظة منسقة' } },
      { file: 'notes.png', caption: { en: 'All notes in one list, with search', ar: 'كل الملاحظات في قائمة واحدة مع البحث' } },
      { file: 'arabic-note.png', caption: { en: 'Arabic notes, written right to left', ar: 'ملاحظات عربية من اليمين لليسار' } },
      { file: 'export-menu.png', caption: { en: 'Export a note as a PDF or an image', ar: 'تصدير الملاحظة كملف PDF أو صورة' } },
      { file: 'landing.png', caption: { en: 'The landing page', ar: 'الصفحة التعريفية للموقع' } }
    ],
    cover: { main: 'draw.png' }
  },
  {
    id: 'boardo',
    featured: true,
    order: 2,
    category: 'webapp',
    year: 2026,
    date: '2026-05',
    status: 'live',
    client: false,
    accent: '#6366f1',
    title: { en: 'Boardo', ar: 'Boardo' },
    subtitle: { en: 'Free kanban board with a calendar — no sign-up', ar: 'لوحة مهام كانبان مجانية مع تقويم — بدون تسجيل' },
    summary: {
      en: 'Kanban boards with your own columns, due dates, checklists and a calendar.',
      ar: 'لوحات كانبان بأعمدة تحددها بنفسك، مع مواعيد تسليم وقوائم مهام وتقويم.'
    },
    description: {
      en: 'Many task tools are heavy and ask for an account before you can add a single card. Boardo opens straight to your boards: add cards, drag them between columns you name yourself, and switch to a calendar to see what is due.\n\nWithout an account everything stays in the browser. Signing in with Google adds cloud sync, link sharing (view-only or editable), voice notes and image attachments. It is live at boardo.online and can be installed as an app.',
      ar: 'كثير من أدوات إدارة المهام ثقيلة وتطلب حسابًا قبل إضافة أول بطاقة. يفتح Boardo مباشرة على لوحاتك: أضف البطاقات، واسحبها بين أعمدة تسمّيها بنفسك، وانتقل إلى عرض التقويم لترى المواعيد القادمة.\n\nبدون حساب تبقى بياناتك في المتصفح، وعند تسجيل الدخول بحساب Google تحصل على مزامنة سحابية ومشاركة اللوحة برابط (للعرض أو للتعديل) وملاحظات صوتية وإرفاق صور. المشروع يعمل الآن على boardo.online ويمكن تثبيته كتطبيق على الجهاز.'
    },
    features: {
      en: [
        'No account needed — boards save in your browser',
        'Drag-and-drop cards between columns you create and rename',
        'Calendar view shows cards by due date',
        'Cards with descriptions, colours, checklists and progress bars',
        'Log the time spent on each card',
        'Share a board by link, view-only or editable',
        'Dark mode, quick search, and installable as an app'
      ],
      ar: [
        'بدون حساب — اللوحات تُحفظ في متصفحك',
        'سحب وإفلات البطاقات بين أعمدة تنشئها وتسمّيها بنفسك',
        'عرض تقويم يرتّب البطاقات حسب موعد التسليم',
        'بطاقات بوصف وألوان وقوائم مهام مع شريط إنجاز',
        'تسجيل الوقت المصروف على كل بطاقة',
        'مشاركة اللوحة برابط للعرض فقط أو للتعديل',
        'وضع داكن وبحث سريع، ويُثبَّت كتطبيق على الجهاز'
      ]
    },
    role: { en: 'Solo — product idea, UI design, development, Firebase setup, SEO and deployment', ar: 'عمل فردي — الفكرة وتصميم الواجهة والبرمجة وإعداد Firebase وتحسين الظهور في محركات البحث والنشر' },
    tech: ['React', 'Vite', 'Firebase Auth', 'Cloud Firestore', 'Firebase Storage', 'PWA'],
    links: { live: 'https://boardo.online', github: '' },
    skills: {
      mostaql: ['تطوير مواقع الويب', 'تطبيقات الويب', 'React', 'Firebase', 'JavaScript', 'تطبيقات الويب التقدمية PWA', 'تصميم واجهات المستخدم'],
      freelancer: ['React.js', 'JavaScript', 'Firebase', 'PWA', 'Web Development', 'Website Design']
    },
    images: [
      { file: 'board.png', caption: { en: 'A board with custom columns, colours, due dates and checklists', ar: 'لوحة بأعمدة مخصصة وألوان ومواعيد تسليم وقوائم مهام' } },
      { file: 'card.png', caption: { en: 'Card details: due date, colour, description and checklist', ar: 'تفاصيل البطاقة: موعد التسليم واللون والوصف وقائمة المهام' } },
      { file: 'calendar.png', caption: { en: 'Calendar view by due date', ar: 'عرض التقويم حسب مواعيد التسليم' } },
      { file: 'board-dark.png', caption: { en: 'Dark mode', ar: 'الوضع الداكن' } },
      { files: ['mobile.png'], name: 'mobile', caption: { en: 'On a phone', ar: 'على الجوال' } }
    ],
    cover: { main: 'board.png', phone: 'mobile.png' }
  },
  {
    id: 'mgo-computing',
    featured: true,
    order: 3,
    category: 'web',
    year: 2026,
    date: '2026-08',
    status: 'live',
    client: false,
    accent: '#7c3aed',
    title: { en: 'MGO Computing', ar: 'MGO Computing' },
    subtitle: { en: 'Arabic services website with a live price calculator', ar: 'موقع خدمات برمجية عربي مع حاسبة أسعار فورية' },
    summary: {
      en: 'Arabic-first business site with clear prices in four currencies and an instant quote tool.',
      ar: 'موقع أعمال بالعربية أولًا بأسعار واضحة بأربع عملات وأداة تسعير فورية.'
    },
    description: {
      en: 'Many clients in the Gulf want to see a price before they start a conversation. MGO Computing is the Arabic-first (right-to-left) website for my own software services, with a one-tap English version.\n\nVisitors see each service\'s price before and after the discount in SAR, AED, EGP or USD, build an estimate in a live calculator, then send it as a ready message or through a quote form. It has been live at mgocomputing.com since August 2026.',
      ar: 'كثير من العملاء في الخليج يريدون معرفة السعر قبل بدء أي محادثة. MGO Computing هو موقع خدماتي البرمجية، مصمم بالعربية أولًا (من اليمين لليسار) مع نسخة إنجليزية بضغطة زر.\n\nيرى الزائر سعر كل خدمة قبل الخصم وبعده بالريال أو الدرهم أو الجنيه أو الدولار، ويحسب تكلفة مشروعه في حاسبة فورية، ثم يرسل التقدير كرسالة جاهزة أو عبر نموذج طلب عرض سعر. الموقع يعمل منذ أغسطس 2026.'
    },
    features: {
      en: [
        'Arabic-first right-to-left design with a one-tap English switch',
        'Separate price lists in SAR, AED, EGP and USD',
        'Currency chosen automatically from the visitor\'s country',
        'Live price calculator: pick a service, tick features, see the total',
        'Quote request form with spam protection',
        'SEO setup: meta tags, share previews, sitemap, structured data',
        'No-code price editor for the owner'
      ],
      ar: [
        'تصميم عربي من اليمين لليسار مع زر للتبديل إلى الإنجليزية',
        'قوائم أسعار مستقلة بالريال والدرهم والجنيه والدولار',
        'اختيار العملة تلقائيًا حسب دولة الزائر',
        'حاسبة أسعار فورية: اختر الخدمة وحدد الميزات وشاهد الإجمالي',
        'نموذج طلب عرض سعر محمي من الرسائل المزعجة',
        'تهيئة SEO: وسوم الوصف ومعاينة المشاركة وخريطة الموقع والبيانات المنظمة',
        'محرر أسعار بدون برمجة لصاحب الموقع'
      ]
    },
    role: { en: 'Solo — Arabic and English content, UI design, development, SEO and deployment', ar: 'عمل فردي — المحتوى العربي والإنجليزي وتصميم الواجهة والبرمجة وتحسين الظهور في محركات البحث والنشر' },
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Firebase Hosting'],
    links: { live: 'https://mgocomputing.com', github: '', hideOnPlatforms: ['live'] },
    skills: {
      mostaql: ['تطوير مواقع الويب', 'تصميم مواقع', 'React', 'TypeScript', 'Tailwind CSS', 'تصميم واجهات المستخدم', 'صفحات الهبوط', 'تحسين محركات البحث SEO'],
      freelancer: ['React.js', 'TypeScript', 'Tailwind CSS', 'Website Design', 'Landing Pages', 'Web Development', 'SEO']
    },
    images: [
      { file: 'hero-ar.png', khamsat: false, caption: { en: 'Arabic home page', ar: 'الصفحة الرئيسية بالعربية' } },
      { file: 'pricing-ar.png', caption: { en: 'Price menu with before/after prices', ar: 'قائمة الأسعار قبل الخصم وبعده' } },
      { file: 'calculator-ar.png', khamsat: false, caption: { en: 'Live price calculator', ar: 'حاسبة الأسعار الفورية' } },
      { file: 'faq-ar.png', caption: { en: 'Frequently asked questions', ar: 'الأسئلة الشائعة' } },
      { file: 'hero-en.png', khamsat: false, caption: { en: 'The English version', ar: 'النسخة الإنجليزية' } },
      { files: ['mobile-ar.png'], name: 'mobile', khamsat: false, caption: { en: 'On a phone', ar: 'على الجوال' } }
    ],
    cover: { main: 'hero-ar.png', phone: 'mobile-ar.png' }
  },
  {
    id: 'bro-video-creator',
    featured: true,
    order: 5,
    category: 'ai-tools',
    year: 2026,
    date: '2026-10',
    status: 'in-use',
    client: false,
    accent: '#c026d3',
    title: { en: 'Bro Video Creator', ar: 'Bro Video Creator' },
    subtitle: { en: 'AI short-video studio that runs on your own PC', ar: 'استوديو فيديوهات قصيرة بالذكاء الاصطناعي يعمل على جهازك' },
    summary: {
      en: 'Turn a story idea into a short AI video with narration and sound — locally, on your graphics card.',
      ar: 'حوّل فكرة قصة إلى فيديو قصير بالذكاء الاصطناعي مع تعليق صوتي ومؤثرات — على كرت الشاشة في جهازك.'
    },
    description: {
      en: 'Bro Video Creator turns a written idea into a finished short video, using AI models that run on your own graphics card. A local language model splits the story into 2–5 second scenes and repeats each character\'s look so people stay consistent.\n\nEvery scene becomes an AI video clip, and every try is kept so you can pick the best one. Add AI images, a narrator in Egyptian Arabic or English, background music and automatic sound effects, then join everything with transitions and export an MP4 for TikTok, Reels, Shorts or YouTube.',
      ar: 'برنامج يحوّل فكرتك المكتوبة إلى فيديو قصير جاهز للنشر، باستخدام نماذج ذكاء اصطناعي تعمل على كرت الشاشة في جهازك. يقسّم نموذج لغوي محلي القصة إلى مشاهد مدة كل منها من 2 إلى 5 ثوانٍ، ويكرر وصف الشخصيات في كل مشهد لتبقى ملامحها ثابتة.\n\nيتحوّل كل مشهد إلى مقطع فيديو، وتُحفظ جميع المحاولات لتختار أفضلها. أضف صورًا مولّدة وتعليقًا صوتيًا باللهجة المصرية أو بالإنجليزية وموسيقى خلفية ومؤثرات صوتية تلقائية، ثم اجمع كل ذلك بانتقالات سلسة وصدّر ملف MP4 جاهزًا لتيك توك وريلز وشورتس ويوتيوب.'
    },
    features: {
      en: [
        'Turns your idea into a scene list with local AI',
        'Text-to-video and image-to-video clips, made on your PC',
        'Continues a scene from the last frame of the previous clip',
        'Keeps every try; click a thumbnail to choose',
        'AI images, with an optional 4K upscale',
        'AI narrator in Egyptian Arabic or English, or your own voice',
        'Background music and automatic sound effects per clip',
        '18 transitions; MP4 export for 9:16, 16:9 and 1:1'
      ],
      ar: [
        'تحويل الفكرة إلى قائمة مشاهد بكاتب ذكاء اصطناعي محلي',
        'توليد مقاطع فيديو من نص أو صورة على جهازك',
        'متابعة المشهد من آخر لقطة في المقطع السابق',
        'حفظ كل المحاولات واختيار الأفضل بضغطة',
        'توليد صور بالذكاء الاصطناعي مع خيار رفع الدقة إلى 4K',
        'معلّق صوتي آلي باللهجة المصرية أو بالإنجليزية، أو بصوتك أنت',
        'موسيقى خلفية ومؤثرات صوتية تلقائية لكل مشهد',
        '18 نوع انتقال وتصدير MP4 بمقاسات 9:16 و16:9 و1:1'
      ]
    },
    role: { en: 'Solo — idea, UX, development and AI-model integration, tested on my own PC', ar: 'عمل فردي — الفكرة وتجربة الاستخدام والتطوير وربط نماذج الذكاء الاصطناعي واختبارها على جهازي' },
    tech: ['Python', 'FastAPI', 'JavaScript', 'ComfyUI', 'Wan 2.2 video model', 'llama.cpp + Gemma', 'Qwen3-TTS', 'FFmpeg'],
    links: { live: '', github: '' },
    skills: {
      mostaql: ['برمجة بايثون', 'الذكاء الاصطناعي', 'الذكاء الاصطناعي التوليدي', 'تطوير تطبيقات سطح المكتب', 'إنتاج الفيديو', 'FastAPI', 'JavaScript', 'FFmpeg'],
      freelancer: ['Python', 'FastAPI', 'JavaScript', 'Generative AI', 'Artificial Intelligence', 'Video Processing', 'FFmpeg', 'Desktop Application']
    },
    images: [
      { file: 'parts.png', caption: { en: 'Each scene is an AI clip — every try is kept', ar: 'كل مشهد مقطع مولّد بالذكاء الاصطناعي — مع حفظ كل المحاولات' } },
      { file: 'final-video.png', caption: { en: 'Building the final video: order, transitions, sound', ar: 'تجميع الفيديو النهائي: الترتيب والانتقالات والصوت' } },
      { file: 'story.png', caption: { en: 'Write the idea — local AI splits it into scenes', ar: 'اكتب الفكرة ويقسمها الذكاء الاصطناعي المحلي إلى مشاهد' } },
      { file: 'images.png', caption: { en: 'AI images, ready to start a scene', ar: 'صور مولّدة جاهزة لبدء أي مشهد' } },
      { file: 'home.png', caption: { en: 'Start screen with stories and the job queue', ar: 'شاشة البداية مع القصص وطابور المهام' } },
      { file: 'ai-image.png', crop: true, caption: { en: 'An image generated by the app on my own PC', ar: 'صورة ولّدها البرنامج على جهازي' } }
    ],
    cover: { main: 'parts.png' }
  },
  {
    id: 'pe-curriculum',
    featured: true,
    order: 6,
    category: 'webapp',
    year: 2026,
    date: '2026-09',
    status: 'delivered',
    client: true,
    accent: '#15803d',
    title: { en: 'PE Curriculum Planner', ar: 'مخطط منهج التربية البدنية' },
    subtitle: { en: 'Full-year lesson planner for a PE teacher, in English and Arabic', ar: 'تطبيق لتخطيط دروس العام الدراسي لمعلمة تربية بدنية، بالعربية والإنجليزية' },
    summary: {
      en: 'A full year of ready PE lessons in one offline file, in English and Arabic.',
      ar: 'عام دراسي كامل من دروس التربية البدنية الجاهزة في ملف واحد يعمل دون إنترنت.'
    },
    description: {
      en: 'A lesson-planning tool built for a primary-school PE teacher, from kindergarten to Grade 3. It holds 279 ready lessons for five class groups across two terms; each lesson has a warm-up, a skill block, a game, a cool-down, safety notes and a short message for parents.\n\nThe teacher can edit any lesson, mark lessons as done, and open each class at its next lesson in one click. It prints lesson cards and a safety pack and exports the term plan to Word. It runs as a single file with no internet, and a website version syncs her work between phone and computer.',
      ar: 'أداة لتخطيط الدروس صُممت لمعلمة تربية بدنية في المرحلة الابتدائية، من الروضة حتى الصف الثالث. تضم 279 درسًا جاهزًا لخمس فئات دراسية على فصلين، ولكل درس إحماء ومهارة ولعبة وتهدئة وتعليمات سلامة ورسالة قصيرة لأولياء الأمور.\n\nتستطيع المعلمة تعديل أي درس وتحديد الدروس المنجزة وفتح كل فصل على درسه التالي بضغطة واحدة. وتطبع بطاقات الدروس وحقيبة السلامة وتصدّر خطة الفصل إلى ملف وورد. تعمل كملف واحد دون إنترنت، ولها نسخة على الويب تزامن العمل بين الجوال والحاسب.'
    },
    features: {
      en: [
        '279 ready lessons for five class groups, both terms',
        'Each lesson: warm-up, 15-minute skill block, game, cool-down',
        'One-click copy of lesson titles and parent messages, EN/AR',
        'Edit, move or swap lessons; edits survive content updates',
        'Each class opens at its next lesson not yet done',
        'Word export, printable lesson cards and a safety pack',
        'Works offline as one file; optional cloud-sync website'
      ],
      ar: [
        '279 درسًا جاهزًا لخمس فئات دراسية على الفصلين',
        'كل درس: إحماء ومهارة لمدة 15 دقيقة ولعبة وتهدئة',
        'نسخ عنوان الدرس ورسالة ولي الأمر بالعربية أو الإنجليزية بضغطة',
        'تعديل الدروس ونقلها وتبديلها، مع بقاء التعديلات بعد التحديثات',
        'كل فصل يفتح مباشرة على درسه التالي غير المنجز',
        'تصدير إلى وورد، وبطاقات دروس وحقيبة سلامة للطباعة',
        'يعمل دون إنترنت كملف واحد، مع موقع اختياري للمزامنة'
      ]
    },
    role: { en: 'Freelance — built the app and its content pipeline, and prepared the bilingual curriculum', ar: 'عمل حر — بناء التطبيق ومنظومة إعداد المحتوى، وإعداد المنهج بالعربية والإنجليزية' },
    tech: ['JavaScript', 'HTML5', 'CSS (RTL)', 'Node.js build', 'Word export', 'Firebase'],
    links: { live: '', github: '' },
    skills: {
      mostaql: ['JavaScript', 'HTML5', 'CSS3', 'برمجة تطبيقات الويب', 'تطبيقات تعليمية', 'Firebase', 'تصميم واجهات عربية RTL'],
      freelancer: ['JavaScript', 'HTML5', 'CSS', 'Web Application', 'Education & Tutoring', 'Firebase', 'Node.js']
    },
    images: [
      { file: 'lesson-ar.png', caption: { en: 'A lesson in Arabic, right to left', ar: 'درس باللغة العربية من اليمين لليسار' } },
      { file: 'home.png', caption: { en: 'Home: every class with its next lesson', ar: 'الرئيسية: كل فصل مع درسه التالي' } },
      { file: 'lesson.png', caption: { en: 'A full lesson plan with copy buttons', ar: 'خطة درس كاملة مع أزرار النسخ' } },
      { file: 'year-plan.png', caption: { en: 'The term plan, week by week', ar: 'خطة الفصل الدراسي أسبوعًا بأسبوع' } },
      { file: 'safety.png', caption: { en: 'The printable safety pack', ar: 'حقيبة السلامة القابلة للطباعة' } },
      { files: ['mobile-lesson.png'], name: 'mobile', caption: { en: 'On a phone, in the gym', ar: 'على الجوال داخل الصالة' } }
    ],
    cover: { main: 'lesson-ar.png', phone: 'mobile-lesson.png' }
  },
  {
    id: 'ayahscreen',
    featured: true,
    order: 7,
    category: 'webapp',
    year: 2026,
    date: '2026-08',
    status: 'demo',
    client: false,
    accent: '#a16207',
    title: { en: 'AyahScreen', ar: 'AyahScreen' },
    subtitle: { en: 'Quran recitation screen for TikTok LIVE, with a web dashboard', ar: 'شاشة بث تلاوات القرآن الكريم لتيك توك لايف مع لوحة تحكم' },
    summary: {
      en: 'Quran verses with word meanings while famous reciters take turns, live.',
      ar: 'آيات بالرسم العثماني مع معاني الكلمات، ويتناوب كبار القرّاء على التلاوة مباشرة.'
    },
    description: {
      en: 'A broadcast screen for Quran live streams on TikTok, shown in OBS as a vertical 1080×1920 page. It displays a chosen passage in Uthmani script with an English translation and optional word-meaning cards in Arabic and English.\n\nWell-known reciters take turns reciting the passage in an endless loop, and where timing data exists the word being recited is highlighted in time with the audio. A web dashboard builds each screen, previews it live and saves it for later streams.',
      ar: 'شاشة بث لتلاوات القرآن الكريم على تيك توك لايف، تُعرض في برنامج OBS كصفحة عمودية بمقاس 1080×1920. تعرض المقطع المختار بالرسم العثماني مع ترجمة إنجليزية وبطاقات اختيارية لمعاني الكلمات بالعربية والإنجليزية.\n\nيتناوب عدد من كبار القرّاء على تلاوة المقطع في حلقة متواصلة، مع تمييز الكلمة المتلوّة متزامنةً مع الصوت عند توفر بيانات التوقيت. ومن لوحة تحكم على الويب تُجهَّز كل شاشة وتُعايَن مباشرة وتُحفظ لبث لاحق.'
    },
    features: {
      en: [
        'Uthmani Quran text that auto-fits any passage length',
        'Word-by-word highlight synced to the recitation',
        'Reciters take turns in an endless loop, name shown on screen',
        'Word-meaning cards in Arabic and English — or none at all',
        'Seven visual themes, legible on 720p phone streams',
        'Dashboard with a live 9:16 preview and saved screens',
        'Keeps streaming offline from downloaded audio'
      ],
      ar: [
        'نص قرآني بالرسم العثماني يتكيّف تلقائيًا مع طول المقطع',
        'تمييز الكلمة المتلوّة متزامنًا مع التلاوة',
        'تناوب القرّاء في حلقة متواصلة مع عرض اسم القارئ',
        'بطاقات لمعاني الكلمات بالعربية والإنجليزية، أو بدونها',
        'سبعة تصاميم بصرية واضحة حتى في بث بدقة 720p',
        'لوحة تحكم بمعاينة مباشرة 9:16 وحفظ الشاشات',
        'يستمر البث دون إنترنت من الصوت المحفوظ'
      ]
    },
    role: { en: 'Solo — Node server, broadcast screen and themes, dashboard, audio and word-timing pipeline', ar: 'عمل فردي — الخادم وشاشة البث وتصاميمها ولوحة التحكم ومنظومة الصوت وتوقيت الكلمات' },
    tech: ['Node.js', 'Express', 'WebSocket', 'JavaScript', 'HTML/CSS', 'OBS'],
    links: { live: '', github: '' },
    skills: {
      mostaql: ['Node.js', 'JavaScript', 'Express.js', 'WebSocket', 'البث المباشر', 'OBS', 'برمجة تطبيقات الويب', 'تصميم واجهات عربية RTL'],
      freelancer: ['Node.js', 'JavaScript', 'Express JS', 'WebSockets', 'Live Streaming', 'HTML5', 'CSS']
    },
    images: [
      { files: ['overlay-layl-highlight.png', 'overlay-mihrab.png', 'overlay-kiswa-nocards.png'], name: 'screens', caption: { en: 'The broadcast screen in three themes', ar: 'شاشة البث بثلاثة تصاميم' } },
      { file: 'manager-screen.png', caption: { en: 'The dashboard with a live 9:16 preview', ar: 'لوحة التحكم مع معاينة مباشرة 9:16' } },
      { files: ['overlay-raqq.png', 'overlay-bahr.png', 'overlay-sajjada.png'], name: 'themes', caption: { en: 'More themes', ar: 'تصاميم أخرى' } },
      { file: 'manager-sheikhs.png', caption: { en: 'Reciters and their downloaded recitations', ar: 'القرّاء والتلاوات المحمّلة' } }
    ],
    cover: { main: 'manager-screen.png', phone: 'overlay-layl-highlight.png' }
  },
  {
    id: 'taste-engine',
    order: 8,
    category: 'ai-tools',
    year: 2026,
    date: '2026-07',
    status: 'open-source',
    client: false,
    accent: '#2563eb',
    title: { en: 'TasteEngine', ar: 'TasteEngine' },
    subtitle: { en: 'Embeddable AI tool that discovers what a user prefers', ar: 'أداة ذكاء اصطناعي تكتشف تفضيلات المستخدم وتُضاف لأي موقع' },
    summary: {
      en: 'Turns any topic into a preference profile through AI-made A-or-B choices.',
      ar: 'تحوّل أي موضوع إلى ملف تفضيلات من خلال اختيارات ثنائية يولّدها الذكاء الاصطناعي.'
    },
    description: {
      en: 'People struggle to describe what they like, but they can easily pick between two options. TasteEngine asks an AI model to create distinct options for any topic, then shows them two at a time until one is left.\n\nThe result is a structured profile (JSON, Markdown, YAML or a system prompt) that can feed a chatbot, a design brief or an onboarding flow. It is a single embeddable component with no dependencies, open source under MIT, with a live demo that runs on built-in sample data.',
      ar: 'يصعب على الناس وصف ما يفضّلونه، لكن من السهل عليهم الاختيار بين خيارين. يطلب TasteEngine من نموذج ذكاء اصطناعي إنشاء خيارات مختلفة لأي موضوع، ثم يعرضها خيارين في كل مرة حتى يبقى خيار واحد.\n\nالناتج ملف تفضيلات منظّم (JSON أو Markdown أو YAML أو موجّه نظام) يمكن استخدامه في روبوت محادثة أو في وصف تصميم أو في خطوات تعريف المستخدم الجديد بالمنتج. الأداة مكوّن واحد يُضاف لأي موقع بدون مكتبات إضافية، مفتوحة المصدر برخصة MIT، ولها نسخة تجريبية تعمل ببيانات نموذجية.'
    },
    features: {
      en: [
        'One script tag to embed; demos for plain HTML and React',
        'No runtime dependencies; Shadow DOM keeps its styles isolated',
        'Built to connect to local models (Ollama, LM Studio) or cloud APIs',
        'Choose, keep both, merge, re-roll or skip — one key each',
        'Exports JSON, Markdown, YAML or a system prompt',
        'Three built-in themes and a live theme editor',
        '121 automated tests cover the core logic'
      ],
      ar: [
        'تُضاف بسطر برمجي واحد، مع أمثلة جاهزة لـ HTML وReact',
        'بدون مكتبات خارجية، وتصميمها معزول فلا يتأثر بتنسيقات الموقع',
        'مهيأة للاتصال بنماذج محلية (Ollama وLM Studio) أو بخدمات سحابية',
        'اختر، أو احتفظ بالاثنين، أو ادمجهما، أو اطلب بديلًا — بزر واحد',
        'تصدير بصيغ JSON وMarkdown وYAML وموجّه نظام',
        'ثلاثة ثيمات جاهزة ومحرر مظهر مباشر',
        '121 اختبارًا آليًا تغطي المنطق الأساسي'
      ]
    },
    role: { en: 'Solo — architecture, development, automated tests, documentation and open-source release', ar: 'عمل فردي — تصميم البنية والبرمجة والاختبارات الآلية والتوثيق والنشر مفتوح المصدر' },
    tech: ['JavaScript', 'Web Components', 'Shadow DOM', 'LLM APIs', 'Ollama', 'esbuild'],
    links: { live: 'https://omar1001.github.io/taste-engine/demo/', github: 'https://github.com/omar1001/taste-engine' },
    skills: {
      mostaql: ['الذكاء الاصطناعي', 'JavaScript', 'تطوير مواقع الويب', 'برمجة واجهات API', 'هندسة الأوامر Prompt Engineering', 'HTML5', 'CSS3'],
      freelancer: ['JavaScript', 'Artificial Intelligence', 'API', 'Prompt Engineering', 'OpenAI', 'Web Development']
    },
    images: [
      { file: 'clash-dark.png', caption: { en: 'A comparison round in the Dark Arcade theme', ar: 'جولة مقارنة بثيم Dark Arcade' } },
      { file: 'clash.png', caption: { en: 'Two AI-made options, side by side', ar: 'خياران من توليد الذكاء الاصطناعي جنبًا إلى جنب' } },
      { file: 'results.png', caption: { en: 'The result: a structured preference profile', ar: 'النتيجة: ملف تفضيلات منظّم' } },
      { file: 'topic.png', caption: { en: 'Pick any topic to start', ar: 'اختر أي موضوع للبدء' } },
      { file: 'theme-editor.png', caption: { en: 'Live theme editor', ar: 'محرر المظهر المباشر' } }
    ],
    cover: { main: 'clash-dark.png' }
  },
  {
    id: 'broclips',
    order: 9,
    category: 'ai-tools',
    year: 2026,
    date: '2026-10',
    status: 'open-source',
    client: false,
    accent: '#e11d48',
    title: { en: 'BroClips', ar: 'BroClips' },
    subtitle: { en: 'Turns your recordings into Shorts, captions and thumbnails', ar: 'يحوّل تسجيلاتك إلى شورتس بنص متزامن وصور مصغّرة' },
    summary: {
      en: 'You record, it edits: Shorts with word-by-word captions, titles and thumbnails.',
      ar: 'أنت تسجّل وهو يحرّر: شورتس بنص يظهر كلمة بكلمة، وعناوين، وصور مصغّرة جاهزة.'
    },
    description: {
      en: 'BroClips is a free, open-source Windows app for creators who talk on camera, over gameplay or in tutorials. Add a recording, describe your videos in one sentence and press Make.\n\nIt transcribes every word, finds the best self-contained moments and cuts vertical Shorts with big word-by-word captions. It also makes a long version with the silences cut, YouTube chapters, titles, descriptions, hashtags and editable thumbnails — with free local AI or your own cloud key.',
      ar: 'BroClips برنامج مجاني ومفتوح المصدر لويندوز، موجّه لصنّاع المحتوى الذين يتحدثون أمام الكاميرا أو أثناء اللعب أو في الدروس. أضف تسجيلك، واكتب جملة واحدة تصف فيديوهاتك، ثم اضغط «Make».\n\nيحوّل البرنامج الكلام إلى نص مع توقيت كل كلمة، ويختار أفضل اللحظات المكتملة، ويقصّها كفيديوهات عمودية بنص كبير يظهر كلمة بكلمة. ويجهّز أيضًا نسخة طويلة بعد حذف فترات الصمت، مع فصول يوتيوب وعناوين ووصف وهاشتاقات وصور مصغّرة قابلة للتعديل — بذكاء اصطناعي محلي مجاني أو بمفتاحك السحابي.'
    },
    features: {
      en: [
        'Word-by-word captions; the spoken word lights up',
        'Finds the best moments; vertical 1080×1920 Shorts',
        'Long video with silences cut and YouTube chapters',
        'Titles, descriptions and hashtags per platform',
        'Thumbnail studio: fonts, colours, emoji, arrows, cut-outs',
        'Works in Arabic (right to left) and English',
        'Free local AI, or your own cloud API key'
      ],
      ar: [
        'نص كبير يظهر كلمة بكلمة مع إبراز الكلمة المنطوقة',
        'اختيار أفضل اللحظات تلقائيًا وقصّها بمقاس 1080×1920',
        'نسخة طويلة بدون فترات صمت مع فصول يوتيوب',
        'عناوين ووصف وهاشتاقات لكل منصة',
        'استوديو للصور المصغّرة: خطوط وألوان وإيموجي وأسهم وقص الخلفية',
        'يدعم العربية من اليمين لليسار والإنجليزية',
        'ذكاء اصطناعي محلي مجاني أو مفتاح API خاص بك'
      ]
    },
    role: { en: 'Solo — idea, specification, design and testing on real videos; open-source release', ar: 'عمل فردي — الفكرة والمواصفات والتصميم والاختبار على فيديوهات حقيقية، والنشر مفتوح المصدر' },
    tech: ['Python', 'JavaScript', 'FFmpeg', 'faster-whisper', 'Ollama', 'Gemini / OpenAI / Claude APIs', 'ONNX Runtime'],
    links: { live: '', github: 'https://github.com/omar1001/BroClips' },
    skills: {
      mostaql: ['برمجة بايثون', 'الذكاء الاصطناعي', 'تطوير تطبيقات سطح المكتب', 'مونتاج الفيديو', 'تحويل الكلام إلى نص', 'JavaScript', 'FFmpeg'],
      freelancer: ['Python', 'JavaScript', 'Artificial Intelligence', 'Video Editing', 'Speech Recognition', 'FFmpeg', 'Desktop Application']
    },
    images: [
      { file: 'working.png', caption: { en: 'Making the videos: live progress and the AI log', ar: 'أثناء التجهيز: التقدّم المباشر وسجل الذكاء الاصطناعي' } },
      { file: 'hero.png', caption: { en: 'From one recording to Shorts and a long video', ar: 'من تسجيل واحد إلى شورتس وفيديو طويل' } },
      { file: 'studio.jpg', caption: { en: 'The thumbnail studio', ar: 'استوديو الصور المصغّرة' } },
      { file: 'project.png', caption: { en: 'Describe your videos in one sentence', ar: 'صف فيديوهاتك في جملة واحدة' } },
      { file: 'start.png', caption: { en: 'The start screen', ar: 'شاشة البداية' } }
    ],
    cover: { main: 'working.png' }
  },
  {
    id: 'tongue',
    order: 10,
    category: 'ai-tools',
    year: 2026,
    date: '2026-08',
    status: 'demo',
    client: false,
    accent: '#db2777',
    title: { en: 'Tongue', ar: 'Tongue' },
    subtitle: { en: 'Private text-to-speech reader and dictation app', ar: 'قارئ نصوص صوتي وتطبيق إملاء خاص يعمل على جهازك' },
    summary: {
      en: 'Reads your text aloud with word-by-word highlighting, and types what you say — on your PC.',
      ar: 'يقرأ نصوصك بصوت طبيعي مع تظليل كل كلمة، ويكتب ما تقوله — على جهازك.'
    },
    description: {
      en: 'Tongue is a Windows app that reads any text aloud in a natural AI voice and highlights each word as it is spoken, like karaoke. Click a word to jump there, or change the speed without the voice sounding strange.\n\nIt can also type for you: dictate from your microphone or capture speech from your computer\'s own audio, with live words on screen and continuous autosave. All AI runs locally, so your text and voice stay on your PC.',
      ar: 'Tongue برنامج لويندوز يقرأ أي نص بصوت طبيعي مولّد بالذكاء الاصطناعي، ويظلّل كل كلمة لحظة نطقها. اضغط على أي كلمة للانتقال إليها، وغيّر سرعة القراءة دون أن يتغيّر طابع الصوت.\n\nويكتب عنك أيضًا: أملِ النص عبر الميكروفون، أو التقط الكلام من صوت الجهاز نفسه، مع ظهور الكلمات مباشرة وحفظ تلقائي مستمر. تتم المعالجة كلها على جهازك، فتبقى نصوصك وصوتك عندك.'
    },
    features: {
      en: [
        'Karaoke-style word highlighting while reading aloud',
        'Click any word to jump; speed changes keep a natural voice',
        'Several local voice engines, including Arabic voices',
        'Dictation from the microphone or the computer\'s own audio',
        'Live words, unlimited pauses, continuous autosave',
        'Library of saved texts and dictations',
        'Frees memory automatically: AI runs only while needed'
      ],
      ar: [
        'تظليل الكلمات أثناء القراءة بأسلوب الكاريوكي',
        'اضغط أي كلمة للانتقال إليها، وغيّر السرعة مع الحفاظ على طبيعة الصوت',
        'عدة محركات صوت محلية، منها أصوات عربية',
        'إملاء من الميكروفون أو من صوت الجهاز نفسه',
        'كلمات تظهر مباشرة، وتوقف بلا حدود، وحفظ تلقائي مستمر',
        'مكتبة للنصوص والإملاءات المحفوظة',
        'يحرّر الذاكرة تلقائيًا: الذكاء الاصطناعي يعمل فقط عند الحاجة'
      ]
    },
    role: { en: 'Solo — idea, architecture, development and testing', ar: 'عمل فردي — الفكرة والتصميم المعماري والتطوير والاختبار' },
    tech: ['Python', 'FastAPI', 'WebSockets', 'SQLite', 'JavaScript', 'Kokoro / Qwen3 TTS', 'faster-whisper'],
    links: { live: '', github: '' },
    skills: {
      mostaql: ['برمجة بايثون', 'الذكاء الاصطناعي', 'تحويل النص إلى كلام', 'تحويل الكلام إلى نص', 'تطوير تطبيقات سطح المكتب', 'FastAPI', 'JavaScript'],
      freelancer: ['Python', 'FastAPI', 'Text to Speech', 'Speech Recognition', 'JavaScript', 'SQLite', 'Desktop Application']
    },
    images: [
      { file: 'karaoke.png', caption: { en: 'Reading aloud — the current word is highlighted', ar: 'أثناء القراءة — الكلمة الحالية مظللة' } },
      { file: 'reader.png', caption: { en: 'Library, reader and voice controls', ar: 'المكتبة والقارئ وإعدادات الصوت' } }
    ],
    cover: { main: 'karaoke.png' }
  },
  {
    id: 'brotimer',
    order: 11,
    category: 'mobile',
    year: 2026,
    date: '2026-10',
    status: 'open-source',
    client: false,
    accent: '#f59e0b',
    title: { en: 'BroTimer', ar: 'BroTimer' },
    subtitle: { en: 'Android interval reminders that ring like a real alarm', ar: 'تطبيق أندرويد لتذكيرات متكررة ترنّ كمنبّه حقيقي' },
    summary: {
      en: 'Reminders every few minutes or hours that ring full-screen and play your sound N times.',
      ar: 'تذكيرات كل عدد من الدقائق أو الساعات ترنّ بملء الشاشة وتشغّل صوتك عددًا محددًا من المرات.'
    },
    description: {
      en: 'An Android app for reminders that repeat every few minutes or hours and ring like a real alarm clock. Each reminder shows its own text full-screen, even over a locked phone, and can play a chosen sound an exact number of times. If you miss it, it rings again a few minutes later.\n\nIt also includes labelled stopwatches and timers, and an "I will sleep now" button that pauses reminders overnight. It works fully offline: no account, no internet permission, no tracking.',
      ar: 'تطبيق أندرويد لتذكيرات تتكرر كل بضع دقائق أو ساعات وترنّ مثل منبّه حقيقي. يعرض كل تذكير نصّه بملء الشاشة حتى فوق شاشة القفل، ويمكنه تشغيل الصوت الذي تختاره عددًا محددًا من المرات ثم يتوقف، وإذا فاتك التنبيه يعود بعد بضع دقائق.\n\nويضم أيضًا ساعات إيقاف ومؤقتات بأسماء مخصّصة، وزر «سأنام الآن» لإيقاف التذكيرات مؤقتًا أثناء النوم. يعمل التطبيق بالكامل دون إنترنت: لا حساب، ولا صلاحية اتصال بالإنترنت، ولا تتبّع.'
    },
    features: {
      en: [
        'Interval alarms every X hours and minutes, on a fixed schedule',
        'Full-screen ring over the lock screen, with Snooze and Stop',
        'Plays your sound exactly N times, or until you stop it',
        'A missed alarm rings again after set minutes',
        'Use any audio file as the alarm sound',
        '"I will sleep now" pauses interval alarms for a set time',
        'Labelled stopwatches and countdown timers; light and dark themes'
      ],
      ar: [
        'تنبيهات متكررة كل عدد من الساعات والدقائق وفق جدول ثابت',
        'رنين بملء الشاشة فوق شاشة القفل مع زرّي الغفوة والإيقاف',
        'تشغيل الصوت عددًا محددًا من المرات أو حتى تضغط إيقاف',
        'إعادة التنبيه الفائت بعد دقائق محددة',
        'استخدم أي ملف صوتي كنغمة للتنبيه',
        'زر «سأنام الآن» يوقف التنبيهات المتكررة للمدة التي تحددها',
        'ساعات إيقاف ومؤقتات بأسماء مخصّصة، مع وضعين فاتح وداكن'
      ]
    },
    role: { en: 'Solo — idea, development, testing on a real Android 16 phone, GitHub releases', ar: 'عمل فردي — الفكرة والتطوير والاختبار على هاتف حقيقي بنظام أندرويد 16 والنشر عبر GitHub' },
    tech: ['Kotlin', 'Jetpack Compose', 'Material 3', 'AlarmManager', 'Foreground service', 'MediaPlayer'],
    links: { live: '', github: 'https://github.com/omar1001/bro-timer' },
    skills: {
      mostaql: ['Kotlin', 'تطوير تطبيقات أندرويد', 'Jetpack Compose', 'تطوير تطبيقات الجوال', 'تصميم واجهات المستخدم', 'Material Design'],
      freelancer: ['Android', 'Kotlin', 'Android App Development', 'Mobile App Development', 'Material Design', 'UI Design']
    },
    images: [
      { file: 'hero.png', caption: { en: 'BroTimer at a glance', ar: 'نظرة عامة على BroTimer' } },
      { files: ['ring-lockscreen.png', 'alarms.png', 'editor.png'], name: 'ring-list-editor', caption: { en: 'Ringing over the lock screen, the alarm list, and the editor', ar: 'الرنين فوق شاشة القفل، وقائمة التنبيهات، وشاشة التعديل' } },
      { files: ['sound-picker.png', 'sleep.png', 'timers.png'], name: 'sound-sleep-timers', caption: { en: 'Your own sounds, sleep mode, and timers', ar: 'أصواتك الخاصة، ووضع النوم، والمؤقتات' } },
      { files: ['alarms-dark.png', 'stopwatch.png', 'setup.png'], name: 'dark-stopwatch-setup', caption: { en: 'Dark theme, stopwatches and settings', ar: 'الوضع الداكن، وساعات الإيقاف، والإعدادات' } }
    ],
    cover: { phones: ['alarms.png', 'ring-lockscreen.png', 'editor.png'] }
  },
  {
    id: 'bro-mic',
    order: 12,
    category: 'mobile',
    year: 2026,
    date: '2026-08',
    status: 'in-use',
    client: false,
    accent: '#22c55e',
    title: { en: 'Bro Mic', ar: 'Bro Mic' },
    subtitle: { en: 'Turns an Android phone into a microphone for a Windows PC', ar: 'يحوّل هاتف أندرويد إلى ميكروفون لجهاز الكمبيوتر' },
    summary: {
      en: 'Use your phone\'s mic in Discord or OBS over Wi-Fi or USB — and hear your PC on it.',
      ar: 'استخدم ميكروفون هاتفك في ديسكورد وOBS عبر الواي فاي أو USB، واسمع صوت الكمبيوتر على هاتفك.'
    },
    description: {
      en: 'Bro Mic turns an Android phone into a microphone for a Windows PC. The phone streams clean 48 kHz audio over Wi-Fi or a USB cable, and the PC presents it as a normal microphone, so Discord, OBS and other apps can select it.\n\nThe PC can also stream its own sound back, so headphones plugged into the phone hear the computer. A custom protocol and jitter buffer keep latency low and smooth out network hiccups.',
      ar: 'يحوّل Bro Mic هاتف أندرويد إلى ميكروفون لجهاز كمبيوتر بنظام ويندوز. يرسل الهاتف صوتًا نقيًا بدقة 48 كيلوهرتز عبر الواي فاي أو كابل USB، ويظهر في الكمبيوتر كميكروفون عادي، فيمكن اختياره في ديسكورد وOBS وغيرهما.\n\nويستطيع الكمبيوتر أيضًا إرسال صوته إلى الهاتف، فتسمعه من السمّاعة الموصولة بالهاتف. ويعتمد على بروتوكول خاص ومخزن مؤقت ذكي لتقليل التأخير وتجاوز تقطّع الشبكة.'
    },
    features: {
      en: [
        'The phone mic shows up in Windows as a normal input',
        'Wi-Fi (UDP or TCP) or USB cable',
        'Two-way audio: hear the PC through the phone\'s headphones',
        'Jitter buffer with packet-loss concealment',
        'Finds the phone automatically on the local network',
        'Keeps streaming with the phone screen locked',
        'Matching phone and PC interfaces with level meters'
      ],
      ar: [
        'يظهر ميكروفون الهاتف في ويندوز كجهاز إدخال عادي',
        'اتصال عبر الواي فاي (UDP أو TCP) أو كابل USB',
        'صوت في الاتجاهين: اسمع الكمبيوتر من سمّاعة الهاتف',
        'مخزن مؤقت يعوّض فقد الحزم',
        'اكتشاف الهاتف تلقائيًا على الشبكة المحلية',
        'يستمر البث وشاشة الهاتف مقفلة',
        'واجهة موحّدة للهاتف والكمبيوتر مع مؤشرات لمستوى الصوت'
      ]
    },
    role: { en: 'Solo — protocol and audio-pipeline design, Android and Windows apps, real-device testing', ar: 'عمل فردي — تصميم البروتوكول ومسار الصوت وتطبيقا أندرويد وويندوز والاختبار على أجهزة حقيقية' },
    tech: ['Kotlin', 'Jetpack Compose', 'C# / .NET 8', 'WPF', 'NAudio', 'UDP/TCP sockets', 'ADB'],
    links: { live: '', github: '' },
    skills: {
      mostaql: ['Kotlin', 'تطوير تطبيقات أندرويد', 'C#', '.NET', 'WPF', 'معالجة الصوت', 'برمجة الشبكات'],
      freelancer: ['Android', 'Kotlin', 'C# Programming', 'WPF', 'Audio Processing', 'Network Programming']
    },
    images: [
      { file: 'pc.png', caption: { en: 'The Windows app: link, level meter, gain, monitor and PC audio to the phone', ar: 'برنامج ويندوز: الاتصال ومؤشر مستوى الصوت والتضخيم والمراقبة وإرسال صوت الكمبيوتر للهاتف' } },
      { files: ['phone.png'], name: 'phone', caption: { en: 'The Android app: broadcast, mute and live input level', ar: 'تطبيق أندرويد: البث وكتم الصوت ومستوى الإدخال المباشر' } }
    ],
    cover: { main: 'pc.png', phone: 'phone.png', frame: 'none' }
  },
  {
    id: 'netusage-monitor',
    order: 13,
    category: 'desktop',
    year: 2026,
    date: '2026-06',
    status: 'open-source',
    client: false,
    accent: '#0ea5e9',
    title: { en: 'NetUsage Monitor', ar: 'NetUsage Monitor' },
    subtitle: { en: 'See which apps use your internet — and block or cap any of them', ar: 'اعرف أي تطبيق يستهلك الإنترنت — واحظره أو حدّد له سقفًا' },
    summary: {
      en: 'Live and historical internet usage for every app on Windows, with one-click blocking.',
      ar: 'استهلاك الإنترنت لكل تطبيق على ويندوز لحظة بلحظة وعبر الوقت، مع حظر بنقرة واحدة.'
    },
    description: {
      en: 'A lightweight Windows app that shows how much internet each program uses: download and upload speed every second, plus usage history over time. All processes of one program are grouped into one row with its real name and icon.\n\nYou can cut any app\'s internet with one click, or set a daily, monthly or total data limit that blocks it automatically. It reads Windows\' built-in network counters, so it needs no extra driver, and it records amounts only — never content.',
      ar: 'برنامج خفيف لنظام ويندوز يعرض استهلاك كل تطبيق للإنترنت: سرعة التنزيل والرفع كل ثانية، مع سجلّ للاستهلاك عبر الوقت. ويجمع كل عمليات البرنامج الواحد في سطر واحد باسمه وأيقونته الحقيقية.\n\nيمكنك قطع الإنترنت عن أي تطبيق بنقرة واحدة، أو تحديد حدّ يومي أو شهري أو إجمالي يُحظر عنده التطبيق تلقائيًا. يعتمد على عدّادات الشبكة المدمجة في ويندوز فلا يحتاج إلى تعريفات إضافية، ويسجّل كمية البيانات فقط دون محتواها.'
    },
    features: {
      en: [
        'Live download and upload speed for every app',
        'Usage history with per-minute averages and a last-hour chart',
        'One-click internet block per app using Windows Firewall',
        'Daily, monthly or total data caps that auto-block',
        'Groups processes by program, with real names and icons',
        'Runs quietly in the tray; search, sort and CSV export'
      ],
      ar: [
        'سرعة التنزيل والرفع لكل تطبيق لحظة بلحظة',
        'سجلّ للاستهلاك مع متوسط كل دقيقة ورسم بياني لآخر ساعة',
        'حظر الإنترنت عن أي تطبيق بنقرة عبر جدار حماية ويندوز',
        'حدّ استهلاك يومي أو شهري أو إجمالي مع حظر تلقائي',
        'تجميع العمليات حسب البرنامج مع اسمه وأيقونته الحقيقية',
        'يعمل بهدوء من شريط المهام مع البحث والفرز وتصدير CSV'
      ]
    },
    role: { en: 'Solo — requirements, architecture, development, testing and open-source release', ar: 'عمل فردي — المتطلبات وتصميم البنية والتطوير والاختبار والنشر مفتوح المصدر' },
    tech: ['C#', '.NET 8', 'WPF', 'ETW', 'SQLite', 'Windows Firewall'],
    links: { live: '', github: 'https://github.com/omar1001/NetUsageMonitor' },
    skills: {
      mostaql: ['C#', '.NET', 'WPF', 'تطوير تطبيقات سطح المكتب', 'SQLite', 'Windows', 'الشبكات'],
      freelancer: ['C# Programming', '.NET', 'WPF', 'Windows Desktop', 'SQLite', 'Network Monitoring']
    },
    images: [
      { file: 'main.png', caption: { en: 'Every app with live speed, history, blocking and data limits', ar: 'كل تطبيق مع السرعة الحالية والسجل والحظر وحدود الاستهلاك' } }
    ],
    cover: { main: 'main.png', frame: 'none' }
  },
  {
    id: 'brodashgraphify',
    order: 14,
    category: 'ai-tools',
    year: 2026,
    date: '2026-08',
    status: 'open-source',
    client: false,
    accent: '#64748b',
    title: { en: 'BroDashGraphify', ar: 'BroDashGraphify' },
    subtitle: { en: 'Windows dashboard and MCP server for a code knowledge-graph tool', ar: 'لوحة تحكم لويندوز وخادم MCP لأداة الخرائط المعرفية للأكواد' },
    summary: {
      en: 'Build and explore code knowledge graphs from one window, with every AI cost approved first.',
      ar: 'أنشئ الخرائط المعرفية لمشاريعك البرمجية واستكشفها من نافذة واحدة، مع موافقة مسبقة على أي تكلفة.'
    },
    description: {
      en: 'A Windows desktop app that puts halal-graphify — a command-line tool that turns a codebase into a searchable knowledge graph — behind tabs, buttons and a job queue. Each project gets its own tab with live progress, an interactive graph and a free query console.\n\nAny run that could call a paid AI model must pass one approval gate, so costs stay visible, and API keys are encrypted with Windows DPAPI. A companion MCP server lets AI coding agents query the same graphs without spending money unless a person allows it.',
      ar: 'برنامج سطح مكتب لويندوز يضع أداة halal-graphify — وهي أداة سطر أوامر تحوّل الكود إلى خريطة معرفية قابلة للبحث — خلف واجهة من التبويبات والأزرار وطابور للمهام. لكل مشروع تبويب خاص يعرض التقدّم مباشرة، مع عارض تفاعلي للخريطة ولوحة استعلامات مجانية.\n\nوأي تشغيل قد يستدعي نموذج ذكاء اصطناعي مدفوعًا يمرّ عبر نقطة موافقة واحدة، فتبقى التكلفة ظاهرة دائمًا، مع تشفير مفاتيح API بتقنية DPAPI في ويندوز. ويرافقه خادم MCP يتيح لوكلاء البرمجة الذكيين الاستعلام من الخرائط نفسها دون أن يصرفوا شيئًا إلا بإذن بشري.'
    },
    features: {
      en: [
        'Project tabs with live logs and step-by-step progress',
        'Embedded interactive graph viewer and free query console',
        'One approval gate for every run that can cost money',
        'API keys encrypted with Windows DPAPI, never logged',
        'Local Ollama setup: install, pull and load models',
        'MCP server with tools for AI agents, almost all free',
        '204 automated tests on the core and MCP layers'
      ],
      ar: [
        'تبويب لكل مشروع مع سجلّ مباشر ومراحل التنفيذ خطوة بخطوة',
        'عارض تفاعلي مدمج للخريطة ولوحة استعلامات مجانية',
        'نقطة موافقة واحدة لكل تشغيل قد تترتب عليه تكلفة',
        'تشفير مفاتيح API عبر DPAPI دون تسجيلها في أي سجل',
        'إعداد Ollama محليًا: التثبيت وتنزيل النماذج وتحميلها',
        'خادم MCP بأدوات لوكلاء الذكاء الاصطناعي، معظمها مجاني',
        '204 اختبارات آلية للطبقات الأساسية وخادم MCP'
      ]
    },
    role: { en: 'Solo — product spec, cost-safety design, development, testing and open-source release', ar: 'عمل فردي — المتطلبات وتصميم آليات ضبط التكلفة والتطوير والاختبار والنشر مفتوح المصدر' },
    tech: ['C#', '.NET 8', 'WPF', 'WebView2', 'MCP', 'DPAPI', 'Ollama', 'xUnit'],
    links: { live: '', github: 'https://github.com/omar1001/BroDashGraphify' },
    skills: {
      mostaql: ['C#', '.NET', 'WPF', 'الذكاء الاصطناعي', 'تطوير تطبيقات سطح المكتب', 'Ollama', 'اختبار البرمجيات'],
      freelancer: ['C# Programming', '.NET', 'WPF', 'Windows Desktop', 'Artificial Intelligence', 'Software Testing']
    },
    images: [
      { file: 'graph-viewer.png', caption: { en: 'A finished free run with the interactive graph', ar: 'تشغيل مجاني مكتمل مع الخريطة التفاعلية' } }
    ],
    cover: { main: 'graph-viewer.png', frame: 'none' }
  },
  {
    id: 'halal-graphify',
    order: 15,
    category: 'ai-tools',
    year: 2026,
    date: '2026-08',
    status: 'open-source',
    client: false,
    accent: '#14b8a6',
    title: { en: 'halal-graphify', ar: 'halal-graphify' },
    subtitle: { en: 'Code knowledge-graph tool for AI coding assistants (maintained fork)', ar: 'أداة تحوّل الكود إلى خريطة معرفية لمساعدات البرمجة الذكية' },
    summary: {
      en: 'A maintained Graphify fork with neutral naming, Godot support and AI-free architecture views.',
      ar: 'نسخة مُطوَّرة من Graphify بتسمية محايدة ودعم Godot وعروض لبنية الكود دون ذكاء اصطناعي.'
    },
    description: {
      en: 'halal-graphify is my maintained fork of Graphify, an open-source tool that maps a codebase into a knowledge graph that AI coding assistants query instead of searching files. It uses the neutral graph term "hub node" throughout, and one command migrates existing graphs.\n\nI added Godot/GDScript support, a "view" command that answers architecture questions straight from the graph with no AI calls, and an offline zoomable explorer page. It is published on PyPI and rebuilt automatically from each upstream release, guarded by the full test suite.',
      ar: 'halal-graphify نسخة أتولّى صيانتها من أداة Graphify مفتوحة المصدر، وهي أداة تحوّل المشروع البرمجي إلى خريطة معرفية يستعلم منها مساعد البرمجة الذكي بدل البحث في الملفات واحدًا واحدًا. تستخدم المصطلح المحايد «hub node»، مع أمر واحد يرحّل الخرائط القديمة.\n\nوأضفتُ إليها دعم محرك الألعاب Godot ولغة GDScript، وأمر «view» الذي يجيب عن أسئلة بنية المشروع من الخريطة مباشرة دون أي استدعاء للذكاء الاصطناعي، وصفحة استكشاف تفاعلية تعمل دون إنترنت. الأداة منشورة على PyPI وتُبنى آليًا مع كل إصدار جديد من الأصل، محكومة بالاختبارات كاملة.'
    },
    features: {
      en: [
        'Neutral "hub node" naming across the CLI and reports',
        'One-command migration for graphs built with the original tool',
        'Godot support: GDScript code plus scene files',
        '"view" command: map, impact, trace and flaws — no AI calls',
        'Offline zoomable explorer: areas → files → symbols',
        'Automatic upstream rebuilds, published to PyPI'
      ],
      ar: [
        'تسمية «hub node» المحايدة في الأوامر والتقارير',
        'ترحيل الخرائط القديمة بأمر واحد',
        'دعم Godot: تحليل كود GDScript وملفات المشاهد',
        'أمر «view»: خريطة البنية وأثر التغيير والمسارات والعيوب دون ذكاء اصطناعي',
        'صفحة استكشاف قابلة للتكبير: مجلدات ← ملفات ← دوال',
        'بناء آلي مع كل إصدار من الأصل والنشر على PyPI'
      ]
    },
    role: { en: 'Sole maintainer — fork pipeline, view and explorer commands, Godot extractor, CI and PyPI publishing', ar: 'المطوّر والمشرف الوحيد — آلية بناء النسخة وأمرا view وexplorer ومستخرج Godot والتكامل المستمر والنشر على PyPI' },
    tech: ['Python', 'tree-sitter', 'D3.js', 'GitHub Actions', 'PyPI', 'pytest'],
    links: { live: '', github: 'https://github.com/omar1001/halal-graphify', other: [{ label: { en: 'PyPI package', ar: 'حزمة PyPI' }, url: 'https://pypi.org/project/halal-graphify/' }] },
    skills: {
      mostaql: ['Python', 'الذكاء الاصطناعي', 'أدوات المطورين', 'GitHub Actions', 'DevOps', 'مشاريع مفتوحة المصدر'],
      freelancer: ['Python', 'Software Architecture', 'Artificial Intelligence', 'DevOps', 'Git', 'Data Visualization']
    },
    images: [
      { file: 'force-graph.png', caption: { en: 'A whole app as a knowledge graph', ar: 'تطبيق كامل كخريطة معرفية' } },
      { file: 'explorer.png', caption: { en: 'The offline explorer: areas and their dependencies', ar: 'صفحة الاستكشاف: أجزاء المشروع والاعتماديات بينها' } },
      { file: 'pypi.png', caption: { en: 'Published on PyPI', ar: 'منشورة على PyPI' } }
    ],
    cover: { main: 'force-graph.png' }
  },
  {
    id: 'visual-reply',
    order: 16,
    category: 'ai-tools',
    year: 2026,
    date: '2026-08',
    status: 'open-source',
    client: false,
    accent: '#8b5cf6',
    title: { en: 'visual-reply', ar: 'visual-reply' },
    subtitle: { en: 'Claude Code plugin that answers in visual cards', ar: 'إضافة لـ Claude Code تقدّم الإجابات على شكل بطاقات مرئية' },
    summary: {
      en: 'AI coding answers as clear cards: plans, decisions, status, risks and flows.',
      ar: 'إجابات مساعد البرمجة الذكي في بطاقات واضحة: خطط وقرارات وحالة ومخاطر ومخططات.'
    },
    description: {
      en: 'visual-reply is a Claude Code plugin that makes the AI answer with small visual cards instead of long paragraphs. The model writes a short JSON spec, and one shared renderer draws it inside the Claude Desktop chat, in a side panel, in the browser, or as a text card in the terminal.\n\nEight card types cover everyday questions: what changed, what is the plan, which option, is it working, how does it flow, before vs after, what are the risks, and where does it live. Buttons on a card send the next request in one click.',
      ar: 'visual-reply إضافة لأداة Claude Code تجعل المساعد يجيب ببطاقات مرئية صغيرة بدل الفقرات الطويلة. يكتب النموذج وصفًا قصيرًا بصيغة JSON، فيرسمه محرّك عرض واحد داخل محادثة تطبيق Claude لسطح المكتب، أو في لوحة جانبية، أو في المتصفح، أو كبطاقة نصية في الطرفية.\n\nوتغطي ثمانية أنواع من البطاقات الأسئلة اليومية: ماذا تغيّر، وما الخطة، وأيّ الخيارات أفضل، وهل يعمل كل شيء، وكيف يسير التدفق، والمقارنة قبل وبعد، وما المخاطر، وأين يقع الملف. وتتيح أزرار البطاقة إرسال الطلب التالي بنقرة واحدة.'
    },
    features: {
      en: [
        'Eight card types: recap, steps, decision, status, flow, compare, flags, tree',
        'Draws inline in Claude Desktop, a side panel, a browser or a terminal',
        'Action buttons send the next request with one click',
        'Zero-dependency JavaScript renderer with light and dark themes',
        'Spec validator with precise error messages',
        'Code-graph pages and cards, with no AI calls'
      ],
      ar: [
        'ثمانية أنواع من البطاقات: ملخص وخطوات وقرار وحالة وتدفق ومقارنة ومخاطر وشجرة ملفات',
        'تُعرض داخل تطبيق Claude لسطح المكتب أو لوحة جانبية أو المتصفح أو الطرفية',
        'أزرار إجراءات ترسل الطلب التالي بنقرة واحدة',
        'محرّك عرض بلغة JavaScript دون مكتبات خارجية، بوضعين فاتح وداكن',
        'مدقّق للمواصفات برسائل خطأ دقيقة',
        'صفحات وبطاقات لخريطة الكود دون ذكاء اصطناعي'
      ]
    },
    role: { en: 'Sole author — card spec and validator, renderer, Claude Code skill and hook, docs', ar: 'المطوّر الوحيد — مواصفات البطاقات ومدقّقها ومحرّك العرض ومهارة Claude Code والتوثيق' },
    tech: ['JavaScript', 'Python', 'HTML/CSS', 'Mermaid', 'JSON Schema', 'Claude Code plugins'],
    links: { live: '', github: 'https://github.com/omar1001/visual-reply' },
    skills: {
      mostaql: ['JavaScript', 'Python', 'الذكاء الاصطناعي', 'تصميم واجهات المستخدم', 'HTML', 'CSS', 'تطوير الإضافات'],
      freelancer: ['JavaScript', 'Python', 'Artificial Intelligence', 'HTML', 'CSS', 'Data Visualization', 'Plugin']
    },
    images: [
      { file: 'recap.png', caption: { en: 'A recap card (example data)', ar: 'بطاقة ملخص (بيانات توضيحية)' } },
      { file: 'decision.png', caption: { en: 'A decision card with the recommended option', ar: 'بطاقة قرار مع الخيار الموصى به' } },
      { file: 'chat-reply.png', caption: { en: 'A card inside the real Claude Desktop chat', ar: 'بطاقة داخل محادثة تطبيق Claude الحقيقي' } },
      { file: 'status.png', caption: { en: 'A status card (example data)', ar: 'بطاقة حالة (بيانات توضيحية)' } },
      { file: 'graph-force.png', caption: { en: 'Graph mode: a whole app as a map', ar: 'وضع الخريطة: تطبيق كامل كخريطة' } },
      { file: 'recap-dark.png', caption: { en: 'Dark theme', ar: 'الوضع الداكن' } }
    ],
    cover: { main: 'recap.png' }
  },
  {
    id: 'agent-toolkit',
    order: 17,
    category: 'ai-tools',
    year: 2026,
    date: '2026-08',
    status: 'open-source',
    client: false,
    accent: '#334155',
    title: { en: 'AI Agent Engineering Toolkit', ar: 'أدوات هندسة وكلاء الذكاء الاصطناعي' },
    subtitle: { en: 'Falsifiability Kernel + Milestone Orchestrator', ar: 'Falsifiability Kernel وMilestone Orchestrator' },
    summary: {
      en: 'Executable checks that make AI-built work verifiable, plus an overnight milestone runner.',
      ar: 'فحوص تجعل عمل الذكاء الاصطناعي قابلًا للتحقق، ومنفّذ آلي لمراحل المشروع أثناء الليل.'
    },
    description: {
      en: 'Two tools for building software with AI agents reliably. The Falsifiability Kernel (open source) ends the endless "review it again" loop: every review finding must become a test or a measurement, a ledger records each verdict so settled issues never return, and a stop rule defines when work is done. In its bundled demo it catches 9 of 9 detectable planted bugs.\n\nThe Milestone Orchestrator is a Claude Code skill that runs a project plan unattended: one fully briefed sub-agent per milestone, each result checked against git, committed and pushed — with a morning report of what only a person may do.',
      ar: 'أداتان لبناء البرمجيات مع وكلاء الذكاء الاصطناعي بموثوقية. الأولى Falsifiability Kernel (مفتوحة المصدر) وتُنهي حلقة «راجِع مرة أخرى» التي لا تنتهي: كل ملاحظة مراجعة يجب أن تتحول إلى اختبار أو قياس، ويحفظ سجلٌّ الحكم على كل ملاحظة فلا تعود المسائل المحسومة، وتحدد قاعدة توقف واضحة متى ينتهي العمل. وفي العرض التوضيحي المرفق تكتشف 9 من 9 أخطاء مزروعة قابلة للاكتشاف.\n\nأما Milestone Orchestrator فمهارة لـ Claude Code تنفّذ خطة المشروع دون إشراف: وكيل فرعي بتعليمات كاملة لكل مرحلة، ثم تُطابَق نتيجته مع git وتُحفظ وتُرفع، مع تقرير صباحي بالخطوات التي لا ينفذها إلا إنسان.'
    },
    features: {
      en: [
        '13 deterministic checks for silent machine-learning bugs',
        'Fault-injection demo: 9 of 9 detectable planted bugs caught',
        'Findings ledger: confirmed, cleared or rejected — never re-argued',
        'Blind cross-model review with a reachable stop rule',
        'Orchestrator: one briefed sub-agent per milestone, verified against git',
        'Morning report: scoreboard plus human-only steps'
      ],
      ar: [
        '13 فحصًا حتميًا لأخطاء تعلّم الآلة الصامتة',
        'عرض بزرع الأخطاء: اكتشاف 9 من 9 أخطاء قابلة للاكتشاف',
        'سجلّ للملاحظات: مؤكَّدة أو مُبرَّأة أو مرفوضة، دون إعادة جدال',
        'مراجعة عمياء بنماذج مختلفة مع قاعدة توقف واضحة',
        'المنسّق: وكيل فرعي لكل مرحلة مع مطابقة النتيجة على git',
        'تقرير صباحي: لوحة نتائج وقائمة بالخطوات المخصّصة للإنسان'
      ]
    },
    role: { en: 'Designed and built both — methodology, checks, review harness, CI and the orchestrator skill', ar: 'صمّمت الأداتين وبنيتهما — المنهجية والفحوص وأداة المراجعة والتكامل المستمر ومهارة المنسّق' },
    tech: ['Python', 'scikit-learn', 'pytest', 'GitHub Actions', 'Claude Code skills', 'AI agents'],
    links: { live: '', github: 'https://github.com/omar1001/falsifiability-kernel' },
    skills: {
      mostaql: ['Python', 'الذكاء الاصطناعي', 'تعلم الآلة', 'اختبار البرمجيات', 'أتمتة', 'هندسة البرمجيات'],
      freelancer: ['Python', 'Machine Learning (ML)', 'Artificial Intelligence', 'Software Testing', 'Automation', 'Software Architecture']
    },
    images: [
      { file: 'kernel-readme.png', caption: { en: 'The demo: every planted bug caught by a named check', ar: 'العرض التوضيحي: كل خطأ مزروع يكتشفه فحص محدد' } },
      { file: 'guide-top.png', caption: { en: 'The orchestrator guide', ar: 'دليل المنسّق' } }
    ],
    cover: { main: 'kernel-readme.png' }
  },
  {
    id: 'video-downloader',
    order: 18,
    category: 'desktop',
    year: 2026,
    date: '2026-08',
    status: 'in-use',
    client: false,
    hidden: true,
    accent: '#ef4444',
    title: { en: 'Video Downloader', ar: 'Video Downloader' },
    subtitle: { en: 'Download, trim and convert clips for video editing', ar: 'تنزيل المقاطع وقصّها وتحويلها لبرامج المونتاج' },
    summary: {
      en: 'Paste a link, pick a quality, trim — and get an edit-ready file for DaVinci Resolve.',
      ar: 'الصق الرابط، اختر الجودة، قصّ الجزء المطلوب، واحصل على ملف جاهز للمونتاج.'
    },
    description: {
      en: 'A simple Windows tool for video editors who need web clips in a format their editor handles well. Paste a link, fetch the available qualities, and download the whole video or only the part you need.\n\nIt re-encodes to a constant-frame-rate H.264 MP4 or DNxHR MOV, which avoids the audio-drift and no-sound problems web videos often cause in DaVinci Resolve. A second tab handles many other sites and whole playlists, with resume support and a live log.',
      ar: 'أداة بسيطة لويندوز لمحرري الفيديو الذين يحتاجون مقاطع من الإنترنت بصيغة يتعامل معها برنامج المونتاج بسهولة. الصق الرابط، واعرض الجودات المتاحة، ثم نزّل الفيديو كاملًا أو الجزء الذي تحتاجه فقط.\n\nيعيد البرنامج ترميز الملف بمعدل إطارات ثابت إلى H.264 MP4 أو DNxHR MOV، فيتجنب مشكلات تأخر الصوت أو غيابه التي تسببها فيديوهات الإنترنت عادةً في DaVinci Resolve. ويدعم تبويب آخر مواقع كثيرة وقوائم تشغيل كاملة، مع إمكانية الاستكمال وسجل مباشر.'
    },
    features: {
      en: [
        'Fetch available qualities, then download video or MP3',
        'Trim: download only the part you need',
        'Constant-frame-rate MP4 or DNxHR for DaVinci Resolve',
        'Works with many sites and whole playlists, resumable',
        'Custom file name with duplicate-name check',
        'Open the file or folder right after download'
      ],
      ar: [
        'عرض الجودات المتاحة ثم تنزيل الفيديو أو الصوت بصيغة MP3',
        'قصّ: نزّل الجزء الذي تحتاجه فقط',
        'تحويل إلى MP4 بمعدل إطارات ثابت أو DNxHR لبرنامج DaVinci Resolve',
        'يعمل مع مواقع كثيرة وقوائم تشغيل كاملة مع الاستكمال',
        'اسم ملف مخصص مع تنبيه عند تكرار الاسم',
        'فتح الملف أو المجلد مباشرة بعد التنزيل'
      ]
    },
    role: { en: 'Solo — built for my own editing workflow and improved from daily use', ar: 'عمل فردي — صممته لسير عملي في المونتاج وطوّرته من الاستخدام اليومي' },
    tech: ['Python', 'Tkinter', 'yt-dlp', 'gallery-dl', 'FFmpeg', 'H.264 / DNxHR'],
    links: { live: '', github: '' },
    skills: {
      mostaql: ['برمجة بايثون', 'تطوير تطبيقات سطح المكتب', 'معالجة الفيديو', 'أتمتة المهام', 'Tkinter', 'FFmpeg'],
      freelancer: ['Python', 'Tkinter', 'Desktop Application', 'FFmpeg', 'Video Processing', 'Automation']
    },
    images: [],
    cover: {}
  },
  {
    id: 'sublevel',
    order: 19,
    category: 'game',
    year: 2026,
    date: '2026-08',
    status: 'demo',
    client: false,
    accent: '#b45309',
    title: { en: 'SUBLEVEL', ar: 'SUBLEVEL' },
    subtitle: { en: 'First-person suspense shooter demo, made in Godot 4', ar: 'نسخة تجريبية للعبة تصويب تشويقية من منظور الشخص الأول بمحرك Godot 4' },
    summary: {
      en: 'An endless facility where enemies only move when you look away. Windows demo.',
      ar: 'منشأة لا تنتهي، وأعداء لا يتحركون إلا حين تشيح بنظرك. نسخة تجريبية لويندوز.'
    },
    description: {
      en: 'SUBLEVEL is a first-person suspense shooter built in Godot 4.3: you descend through a research facility that rebuilds itself every run. Its core idea is that aiming is the tense part — enemies freeze while you watch them and move when you look away.\n\nEvery run is a seeded, procedurally generated facility, and a pacing system decides when tension rises. It has puzzles, a story told in fragments, a shop and run modifiers, plus comfort options such as scare intensity and flash reduction — with no gore by design. A headless test harness with 103 checks verifies generation, combat and UI after every change.',
      ar: 'SUBLEVEL لعبة تصويب تشويقية من منظور الشخص الأول بُنيت بمحرك Godot 4.3، تنزل فيها عبر منشأة أبحاث تعيد بناء نفسها في كل جولة. فكرتها الأساسية أن التصويب نفسه مصدر التوتر: الأعداء يتجمّدون ما دمت تنظر إليهم، ويتقدّمون حين تشيح بنظرك.\n\nكل جولة منشأة مولّدة إجرائيًا من رمز يمكن مشاركته، ويحدد نظام للإيقاع متى يتصاعد التوتر. وتضم اللعبة ألغازًا وقصة تُجمع أجزاؤها ومتجرًا ومعدّلات للجولة، مع خيارات راحة مثل التحكم بشدة المفاجآت وتقليل الوميض، وهي خالية من الدماء بالتصميم. ويتحقق نظام اختبار آلي من 103 فحوص من التوليد والقتال والواجهة بعد كل تعديل.'
    },
    features: {
      en: [
        'Enemies freeze while watched and advance when you look away',
        'Seeded procedural facility: share a run code, replay the same rooms',
        'A pacing director balances tension across 12 scare types',
        'Puzzles, a fragment-based story and run modifiers',
        'Comfort options: scare intensity, flash reduction, volume per channel',
        'Code-generated textures and synthesized sound',
        'Headless automated playtest: 103 checks'
      ],
      ar: [
        'الأعداء يتجمّدون حين تراقبهم ويتقدّمون حين تشيح بنظرك',
        'منشأة مولّدة إجرائيًا برمز جولة يمكن مشاركته لإعادة الغرف نفسها',
        'نظام إيقاع يضبط التوتر عبر 12 نوعًا من المفاجآت',
        'ألغاز وقصة تُجمع أجزاؤها ومعدّلات للجولة',
        'خيارات راحة: شدة المفاجآت وتقليل الوميض ومستوى كل قناة صوت',
        'خامات مولّدة بالكود ومؤثرات صوتية مركّبة برمجيًا',
        'اختبار لعب آلي دون واجهة: 103 فحوص'
      ]
    },
    role: { en: 'Solo — game design, every GDScript system, generated audio and textures, and the test harness', ar: 'عمل فردي — تصميم اللعبة وكل أنظمتها بلغة GDScript والصوت والخامات المولّدة برمجيًا ونظام الاختبار' },
    tech: ['Godot 4.3', 'GDScript', 'Procedural generation', 'Python test harness', 'Windows export'],
    links: { live: '', github: '' },
    platforms: { mostaql: true, freelancer: true },
    skills: {
      mostaql: ['تطوير الألعاب', 'Godot', 'GDScript', 'تصميم الألعاب', 'ألعاب ثلاثية الأبعاد', 'Python'],
      freelancer: ['Game Development', 'Game Design', 'Godot', 'GDScript', '3D Game Development', 'Python']
    },
    images: [
      { file: 'watched-figure.png', crop: true, caption: { en: 'Keep it in your light — it moves when you look away', ar: 'أبقِه في ضوئك — يتحرك حين تشيح بنظرك' } },
      { file: 'first-room.png', crop: true, caption: { en: 'The first room, with on-screen teaching', ar: 'الغرفة الأولى مع إرشادات على الشاشة' } },
      { file: 'enemy.png', crop: true, caption: { en: 'One of the enemy types', ar: 'أحد أنواع الأعداء' } },
      { file: 'menu.png', crop: true, caption: { en: 'Main menu of the demo build', ar: 'القائمة الرئيسية للنسخة التجريبية' } },
      { file: 'settings.png', crop: true, caption: { en: 'Comfort and safety settings', ar: 'إعدادات الراحة والأمان' } },
      { file: 'director-debug.png', crop: true, caption: { en: 'Developer view: the live tension readout', ar: 'عرض المطوّر: قراءة التوتر المباشرة' } },
      { file: 'run-card.png', crop: true, caption: { en: 'The shareable run card', ar: 'بطاقة الجولة القابلة للمشاركة' } }
    ],
    cover: { main: 'watched-figure.png', frame: 'none' }
  },
  {
    id: 'iskandarani',
    order: 20,
    category: 'webapp',
    year: 2026,
    date: '2026-08',
    status: 'demo',
    client: false,
    accent: '#ea580c',
    title: { en: 'Iskandarani', ar: 'إسكندراني' },
    subtitle: { en: 'Ordering website and admin panel for restaurants and shops', ar: 'موقع طلبات ولوحة تحكم للمطاعم والمحلات' },
    summary: {
      en: 'Online menu and ordering for customers, plus one admin panel to run the business.',
      ar: 'منيو وطلبات أونلاين للعملاء، ولوحة تحكم واحدة لإدارة النشاط بالكامل.'
    },
    description: {
      en: 'A ready-made platform for restaurants, cafes and small shops. Customers browse the menu, build their order and pay cash on delivery — or order from their table by scanning a QR code.\n\nThe owner runs everything from one admin panel: orders, delivery, a cashier (POS) screen, stock, staff and settings. Each business gets its own branded site on Firebase\'s free plan, and a new client site is set up with a single command.',
      ar: 'منصة جاهزة للمطاعم والمقاهي والمحلات الصغيرة. يتصفح العميل المنيو ويجهّز طلبه ويدفع عند الاستلام، أو يطلب من طاولته بمسح رمز QR.\n\nويدير صاحب النشاط كل شيء من لوحة تحكم واحدة: الطلبات والتوصيل وشاشة الكاشير (نقطة البيع) والمخزون والموظفين والإعدادات. لكل نشاط موقعه الخاص بهويته على الخطة المجانية من Firebase، ويُجهَّز موقع العميل الجديد بأمر واحد.'
    },
    features: {
      en: [
        'Menu with categories, sizes and add-ons',
        'Cash-on-delivery checkout and live order tracking',
        'Dine-in ordering from table QR codes',
        'Admin dashboard: today\'s orders, revenue and low-stock alerts',
        'Orders and delivery boards, plus a cashier (POS) screen',
        'Staff accounts with roles, permissions and an audit log'
      ],
      ar: [
        'منيو بأقسام وأحجام وإضافات',
        'طلب بالدفع عند الاستلام وتتبع حالة الطلب',
        'طلبات داخل المطعم عبر رموز QR لكل طاولة',
        'لوحة رئيسية: طلبات اليوم والإيرادات وتنبيهات نقص المخزون',
        'إدارة الطلبات ولوحة التوصيل وشاشة كاشير (نقطة بيع)',
        'حسابات للموظفين بأدوار وصلاحيات وسجل كامل للعمليات'
      ]
    },
    role: { en: 'Solo — product design, architecture, both web apps, security rules and client-setup automation', ar: 'عمل فردي — تصميم المنتج والبنية والتطبيقان وقواعد الحماية وأتمتة تجهيز العملاء' },
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Firebase', 'Cloudflare Workers'],
    links: { live: '', github: '' },
    skills: {
      mostaql: ['تطوير مواقع الويب', 'برمجة تطبيقات الويب', 'React.js', 'TypeScript', 'Firebase', 'Tailwind CSS', 'لوحات التحكم', 'أنظمة نقاط البيع'],
      freelancer: ['React.js', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Web Development', 'Website Design']
    },
    images: [
      { file: 'menu.png', caption: { en: 'The menu: categories with Arabic names, delivery fee, minimum order and tax', ar: 'المنيو: أقسام بأسماء عربية ورسوم توصيل وحد أدنى للطلب وضريبة' } },
      { file: 'customize.png', caption: { en: 'Choose a size and extras — the price updates live', ar: 'اختيار الحجم والإضافات مع تحديث السعر مباشرة' } },
      { files: ['mobile-cart.png'], name: 'cart-mobile', caption: { en: 'The cart on a phone', ar: 'سلة الطلب على الجوال' } },
      { file: 'home.png', caption: { en: 'Home page of the template, before a client’s branding', ar: 'الصفحة الرئيسية للقالب قبل تطبيق هوية العميل' } },
      { file: 'dishes.png', caption: { en: 'Popular dishes', ar: 'الأطباق الأكثر طلبًا' } }
    ],
    cover: { main: 'menu.png', phone: 'mobile-cart.png' }
  },
  {
    id: 'investment-share',
    order: 21,
    category: 'webapp',
    year: 2026,
    date: '2026-06',
    status: 'in-use',
    client: true,
    hidden: true,
    accent: '#0891b2',
    title: { en: 'Investment Share', ar: 'مشاركة الاستثمار' },
    subtitle: { en: 'Fund manager for a car-trading business', ar: 'نظام إدارة صندوق استثمار لتجارة السيارات' },
    summary: {
      en: 'Tracks investors, cars and profit splits to the cent — even offline.',
      ar: 'يتابع المستثمرين والسيارات وتوزيع الأرباح بدقة تامة، حتى بدون إنترنت.'
    },
    description: {
      en: 'A private web app for a car-trading business that buys and sells cars with investors\' money. The manager records deposits, withdrawals and car purchases; when a car sells, the app splits the profit or loss by each investor\'s current share, after the manager\'s cut.\n\nAll amounts are calculated exactly to the cent and every action is kept in a full history. It keeps working without internet and syncs when the connection returns, in Arabic and English, with PDF statements for each investor.',
      ar: 'تطبيق ويب خاص لنشاط تجارة سيارات يشتري ويبيع بأموال المستثمرين. يسجّل المدير الإيداعات والسحوبات وشراء السيارات، وعند بيع أي سيارة يوزّع التطبيق الربح أو الخسارة حسب حصة كل مستثمر الحالية بعد خصم نسبة المدير.\n\nتُحسب كل المبالغ بدقة تامة دون فروق تقريب، وتُحفظ كل عملية في سجل كامل. يستمر في العمل دون إنترنت ويزامن البيانات عند عودة الاتصال، بالعربية والإنجليزية، مع كشف حساب PDF لكل مستثمر.'
    },
    features: {
      en: [
        'Investors with deposits, withdrawals and live share percentages',
        'Car buying and selling with automatic profit and loss split',
        'Custom manager cut per investor',
        'Exact decimal math: every split adds up to the cent',
        'Works offline; syncs automatically when back online',
        'Arabic and English, light and dark mode, PDF statements'
      ],
      ar: [
        'إدارة المستثمرين بالإيداع والسحب ونسب الحصص المحدّثة لحظيًا',
        'شراء السيارات وبيعها مع توزيع تلقائي للأرباح والخسائر',
        'نسبة مخصصة للمدير لكل مستثمر',
        'حسابات عشرية دقيقة، والتوزيع يطابق الإجمالي تمامًا',
        'يعمل دون إنترنت ويزامن التغييرات تلقائيًا عند عودة الاتصال',
        'عربي وإنجليزي، وضع ليلي ونهاري، وكشوف حساب PDF'
      ]
    },
    role: { en: 'Freelance — requirements, money engine with tests, offline sync, bilingual UI and deployment', ar: 'عمل حر — تحليل المتطلبات ومحرك الحسابات المالية مع اختباراته والمزامنة دون إنترنت والواجهة ثنائية اللغة والنشر' },
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Firebase', 'PWA', 'decimal.js', 'i18next'],
    links: { live: '', github: '' },
    skills: {
      mostaql: ['برمجة تطبيقات الويب', 'React.js', 'TypeScript', 'Firebase', 'تطبيقات الويب التقدمية PWA', 'برمجة أنظمة مالية ومحاسبية', 'تصميم واجهات عربية RTL'],
      freelancer: ['React.js', 'TypeScript', 'Firebase', 'Progressive Web Apps', 'Tailwind CSS', 'Web Application', 'Accounting']
    },
    images: [],
    cover: {}
  },
  {
    id: 'media-toolkit',
    order: 22,
    category: 'extension',
    year: 2026,
    date: '2026-10',
    status: 'in-use',
    client: false,
    accent: '#f97316',
    title: { en: 'Media Toolkit', ar: 'Media Toolkit' },
    subtitle: { en: 'Chrome extension for full control of video and images', ar: 'إضافة لمتصفح Chrome للتحكم الكامل بالفيديو والصور' },
    summary: {
      en: 'Right-click any video or picture for speed, A→B loop, lip-sync fix, zoom and full-size saving.',
      ar: 'انقر بالزر الأيمن على أي فيديو أو صورة: سرعة وتكرار وإصلاح تأخر الصوت وتكبير وحفظ بالحجم الكامل.'
    },
    description: {
      en: 'Media Toolkit is a Chrome extension that adds one consistent right-click panel to every video and picture on the web. It gives any player a seek bar, any speed from 0.0625× to 16×, A→B looping and frame stepping, and it can hold the picture back in 10 ms steps to fix lip-sync when headphone audio lags.\n\nPictures can be zoomed and panned in place or opened in a full-screen viewer, and saved at their original full size. Its interface lives in an isolated layer that a site\'s styles cannot break.',
      ar: 'Media Toolkit إضافة لمتصفح Chrome تضيف لوحة موحّدة بالزر الأيمن لكل فيديو وصورة على الويب. تمنح أي مشغّل شريط تقديم، وأي سرعة من 0.0625× إلى 16×، وتكرارًا لمقطع بين نقطتين، وتنقّلًا إطارًا بإطار، ويمكنها تأخير الصورة بخطوات قدرها 10 ميلي ثانية لمعالجة عدم تزامن الصوت مع الشفاه.\n\nويمكن تكبير الصور وتحريكها في مكانها أو فتحها في عارض بملء الشاشة، وحفظها بحجمها الأصلي الكامل. وتعمل واجهتها في طبقة معزولة لا تتأثر بتنسيقات الموقع.'
    },
    features: {
      en: [
        'In-page right-click panel for any video or image',
        'Seek bar for players without one; skip and frame step',
        'Any speed 0.0625×–16×, plus A→B loop',
        'Lip-sync fix: delay the picture live with shortcuts',
        'Zoom and pan inside the player, or a full-screen viewer',
        'Saves the original full-size picture, not the thumbnail'
      ],
      ar: [
        'لوحة بالزر الأيمن داخل الصفحة لأي فيديو أو صورة',
        'شريط تقديم للمشغّلات التي تفتقده، مع التخطي والتنقّل إطارًا بإطار',
        'أي سرعة من 0.0625× إلى 16×، وتكرار مقطع A→B',
        'إصلاح تأخر الصوت: تأخير الصورة مباشرة باختصارات لوحة المفاتيح',
        'تكبير وتحريك داخل المشغّل، أو عارض بملء الشاشة',
        'حفظ الصورة الأصلية بحجمها الكامل لا النسخة المصغّرة'
      ]
    },
    role: { en: 'Solo — Manifest V3 architecture, content scripts, service worker, settings page and offline tests', ar: 'عمل فردي — بنية Manifest V3 وسكربتات المحتوى وعامل الخدمة وصفحة الإعدادات والاختبارات' },
    tech: ['JavaScript', 'Chrome Extensions (MV3)', 'Service Worker', 'Shadow DOM', 'Canvas'],
    links: { live: '', github: '' },
    skills: {
      mostaql: ['JavaScript', 'إضافات المتصفح', 'Google Chrome', 'HTML', 'CSS', 'تطوير الويب'],
      freelancer: ['JavaScript', 'Google Chrome', 'HTML5', 'CSS', 'Web Development', 'Plugin']
    },
    images: [
      { file: 'panel-video.png', caption: { en: 'One right-click panel for any video on any site', ar: 'لوحة واحدة بالزر الأيمن لأي فيديو في أي موقع' } },
      { file: 'lip-sync.png', caption: { en: 'Lip-sync fix: the picture held back to match late headphone audio', ar: 'إصلاح تأخر الصوت: تأخير الصورة لتطابق صوت السماعات المتأخر' } },
      { file: 'speed-page.png', caption: { en: 'Any speed, with natural-sounding voices', ar: 'أي سرعة مع الحفاظ على طبيعة الأصوات' } },
      { file: 'playback-bar.png', caption: { en: 'A full playback bar for players that have none', ar: 'شريط تشغيل كامل للمشغلات التي تفتقده' } },
      { file: 'image-panel.png', caption: { en: 'The same panel on a picture', ar: 'اللوحة نفسها على الصور' } },
      { file: 'zoom-image.png', caption: { en: 'Zoom into a picture in place', ar: 'تكبير الصورة في مكانها' } }
    ],
    cover: { main: 'panel-video.png' }
  },
  // ▲ NEW PROJECTS GO ABOVE THIS LINE
];
