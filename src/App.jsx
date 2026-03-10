import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, Sun, Moon, ArrowRight, ArrowUpRight,
  Layout, Smartphone, BarChart3, Binary, Mail,
  Linkedin, Facebook, CheckCircle2, ChevronRight,
  Target, Eye, Zap, Users, Trophy, Calculator,
  Sparkles, Phone, Briefcase, Lightbulb, Rocket, ChevronDown, Globe, CalendarCheck, CreditCard, Clock, Shield
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const CUSTOMERS = [
  "EL ASEEL Development","Omar Gharib","ETMAM","ALSAIF ANALYSIS",
  "ELBEDAYA","PE","RESPRESSO","COVER SPORE","SIMCO","MIRROR",
  "ALMUHANDIS INDUSTRIES","NOURGEOUS ACCESSORIES","NAQLA",
  "START MART","CREATIVO","ALPHA ACADEMY","VARM","ART FURNITURE"
];

const EVENTS = [
  { id:1, img:"https://raw.githubusercontent.com/mantiqservices/Mantiqwebsites-assets/15db4b093766f112b1ee610f485e0e645807f39c/1.png" },
  { id:2, img:"https://raw.githubusercontent.com/mantiqservices/Mantiqwebsites-assets/15db4b093766f112b1ee610f485e0e645807f39c/5.png" },
  { id:3, img:"https://raw.githubusercontent.com/mantiqservices/Mantiqwebsites-assets/15db4b093766f112b1ee610f485e0e645807f39c/9.png" },
  { id:4, img:"https://raw.githubusercontent.com/mantiqservices/Mantiqwebsites-assets/15db4b093766f112b1ee610f485e0e645807f39c/WhatsApp%20Image%202025-02-13%20at%2000.36.15_0317f987.jpg" },
  { id:5, img:"https://raw.githubusercontent.com/mantiqservices/Mantiqwebsites-assets/15db4b093766f112b1ee610f485e0e645807f39c/WhatsApp%20Image%202025-02-13%20at%2000.36.17_8ce044b6.jpg" },
  { id:6, img:"https://raw.githubusercontent.com/mantiqservices/Mantiqwebsites-assets/15db4b093766f112b1ee610f485e0e645807f39c/1%20(1).png" },
  { id:7, img:"https://raw.githubusercontent.com/mantiqservices/Mantiqwebsites-assets/15db4b093766f112b1ee610f485e0e645807f39c/6%20(2).png" },
  { id:8, img:"https://raw.githubusercontent.com/mantiqservices/Mantiqwebsites-assets/15db4b093766f112b1ee610f485e0e645807f39c/6%20(1).png" },
  { id:9, img:"https://raw.githubusercontent.com/mantiqservices/Mantiqwebsites-assets/15db4b093766f112b1ee610f485e0e645807f39c/2%20(1).png" },
];

const SERVICES = [
  {
    id:'business', index:'01',
    icon: <BarChart3 size={20}/>,
    title:{en:"Business Development",ar:"تطوير الأعمال"},
    sub:{en:"Strategy · Leads · Analytics",ar:"استراتيجية · عملاء · تحليلات"},
    features:{en:["Strategic Planning","B2B Leads","Data Analytics","Consultancy"],ar:["التخطيط الاستراتيجي","توليد العملاء","التحليلات","الاستشارات"]},
    desc:{en:"We identify untapped market opportunities and build strategic growth paths that accelerate revenue and position your business for sustainable scale.",ar:"نحدد فرص السوق غير المستغلة ونبني مسارات نمو استراتيجية تسرّع الإيرادات وتضع عملك في مسار التوسع المستدام."},
    img:"https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1400",
  },
  {
    id:'tracking', index:'02',
    icon: <Binary size={20}/>,
    title:{en:"Tracking Systems",ar:"أنظمة التتبع"},
    sub:{en:"CRM · Finance · HR · Automation",ar:"CRM · مالية · موارد بشرية · أتمتة"},
    features:{en:["CRM Systems","Finance Trackers","HR Systems","Flow Automation"],ar:["أنظمة CRM","تتبع المالية","الموارد البشرية","أتمتة العمليات"]},
    desc:{en:"Transform raw data into efficient, intelligent digital ecosystems. Custom CRM and financial dashboards built for how your business actually works.",ar:"حوّل بياناتك الخام إلى أنظمة رقمية ذكية وفعّالة. أنظمة CRM ومالية مخصصة مبنية لطريقة عمل شركتك فعلاً."},
    img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1400",
  },
  {
    id:'web', index:'03',
    icon: <Layout size={20}/>,
    title:{en:"Websites",ar:"المواقع الإلكترونية"},
    sub:{en:"Design · SEO · E-commerce",ar:"تصميم · SEO · تجارة إلكترونية"},
    features:{en:["E-commerce","Company Profile","Technical SEO","Usability Design"],ar:["التجارة الإلكترونية","تحسين محركات البحث","موقع لعرض شركتك","تصميم تجربة المستخدم"]},
    desc:{en:"Performance-driven websites designed to act as your best salesperson — built for search visibility, user experience, and conversion.",ar:"مواقع تعمل كأفضل مندوب مبيعات لديك — مصممة لظهور محركات البحث وتجربة المستخدم والتحويل."},
    img:"https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1400",
  },
  {
    id:'mobile', index:'04',
    icon: <Smartphone size={20}/>,
    title:{en:"Mobile Apps",ar:"تطبيقات الموبايل"},
    sub:{en:"iOS · Android · AI · Payments",ar:"iOS · Android · ذكاء اصطناعي · مدفوعات"},
    features:{en:["UI/UX Design","iOS & Android","AI Integrations","Payment Gateways"],ar:["تصميم واجهة المستخدم","تكاملات الذكاء الاصطناعي","دفع إلكتروني","أنظمة iOS و Android"]},
    desc:{en:"Native mobile experiences built for today's users — with embedded AI logic, seamless UX, and integrated payment infrastructure.",ar:"تجارب موبايل أصيلة مبنية لمستخدمي اليوم — مع ذكاء اصطناعي مدمج وتجربة مستخدم سلسة وبنية تحتية للدفع."},
    img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1400",
  }
];

const T = {
  en:{
    logo:"Mantiq",
    tag:"Intelligence in Business",
    nav_about:"About", nav_services:"Services", nav_events:"Events",
    cta:"Get Started",
    hero_label:"MENA Region's Digital Partner",
    hero_line1:"The Path",
    hero_line2:"You Should",
    hero_line3:"Take.",
    hero_desc:"Strategic consultancy and modern digital infrastructure — helping ambitious businesses scale with intelligence across the MENA region.",
    scroll:"Scroll to explore",
    about_label:"About Mantiq",
    about_title1:"Where Strategy",
    about_title2:"Meets Technology.",
    about_body:"Mantiq bridges the gap between traditional business wisdom and modern digital excellence. We empower enterprises to lead with data, act with confidence, and grow without limits.",
    mission:"Mission", mission_body:"Transforming business operations through intelligent automation and data-driven strategy.",
    vision:"Vision", vision_body:"To be the standard of technological integrity in the MENA region.",
    stats_a:"Completed Services", stats_b:"Managed Projects", stats_c:"Launched Ventures", stats_d:"Expert Partners",
    services_label:"What We Do",
    services_title1:"Strategic",
    services_title2:"Solutions.",
    services_body:"Four core disciplines, one unified mission: to build the digital and strategic infrastructure your business needs to thrive.",
    learn_more:"Learn more",
    events_label:"On The Ground",
    events_title1:"Mantiq",
    events_title2:"In Action.",
    customers_label:"Trusted By",
    contact_label:"Start a Project",
    contact_title1:"Let's Build",
    contact_title2:"Something.",
    contact_body:"Tell us about your project. Our strategy team will respond within one business day.",
    name_p:"Full Name", company_p:"Organization", email_p:"Email Address", phone_p:"Phone Number", service_p:"Select Service",
    submit:"Submit Brief", sending:"Sending…",
    success_title:"Brief Received.", success_body:"A consultant will be in touch within one business day.",
    careers:"Careers", join_title:"Join the Team.",
    career_body:"We're building the future of business intelligence in the MENA region. Looking for exceptional people to build it with.",
    val_title:"What drives us", val_1:"Inherent Innovation", val_2:"Data Integrity", val_3:"Human-First Tech",
    apply:"Send Application", cv_link:"Portfolio / CV Link",
    rights:"All rights reserved.", pricing:"Pricing",
    footer_desc:"Strategic consultancy and digital infrastructure for the MENA region.",
    explore:"View Service",
  },
  ar:{
    logo:"منطق",
    tag:"الذكاء في الأعمال",
    nav_about:"من نحن", nav_services:"خدماتنا", nav_events:"الفعاليات",
    cta:"ابدأ الآن",
    hero_label:"الشريك الرقمي لمنطقة الشرق الأوسط",
    hero_line1:"المسار",
    hero_line2:"الذي يجب",
    hero_line3:"أن تسلكه.",
    hero_desc:"استشارات استراتيجية وبنية تحتية رقمية حديثة — لمساعدة الشركات الطموحة على التوسع بذكاء.",
    scroll:"اسحب للاستكشاف",
    about_label:"عن منطق",
    about_title1:"حيث تلتقي الاستراتيجية",
    about_title2:"بالتكنولوجيا.",
    about_body:"تعمل منطق كجسر بين حكمة الأعمال التقليدية والتميز الرقمي الحديث. نمكّن المؤسسات من القيادة بالبيانات والعمل بثقة والنمو دون حدود.",
    mission:"الرسالة", mission_body:"تحويل عمليات الأعمال من خلال الأتمتة الذكية والاستراتيجية المبنية على البيانات.",
    vision:"الرؤية", vision_body:"أن نكون معيار النزاهة التكنولوجية في منطقة الشرق الأوسط.",
    stats_a:"خدمة مكتملة", stats_b:"مشروع مدار", stats_c:"مشروع انطلق", stats_d:"خبير مشارك",
    services_label:"ما نقدمه",
    services_title1:"حلول",
    services_title2:"استراتيجية.",
    services_body:"أربعة تخصصات أساسية، ومهمة واحدة موحدة: بناء البنية التحتية الرقمية والاستراتيجية التي يحتاجها عملك للازدهار.",
    learn_more:"اعرف أكثر",
    events_label:"على أرض الواقع",
    events_title1:"منطق",
    events_title2:"في الميدان.",
    customers_label:"يثق بنا",
    contact_label:"ابدأ مشروعاً",
    contact_title1:"فلنبني",
    contact_title2:"شيئاً.",
    contact_body:"أخبرنا عن مشروعك. سيتواصل معك فريقنا الاستراتيجي خلال يوم عمل واحد.",
    name_p:"الاسم الكامل", company_p:"الشركة", email_p:"البريد الإلكتروني", phone_p:"رقم الهاتف", service_p:"اختر الخدمة",
    submit:"إرسال الموجز", sending:"جارٍ الإرسال…",
    success_title:"تم استلام الطلب.", success_body:"سيتواصل معك أحد مستشارينا خلال يوم عمل واحد.",
    careers:"فرص العمل", join_title:"انضم للفريق.",
    career_body:"نحن نبني مستقبل الذكاء التجاري في منطقة الشرق الأوسط. نبحث عن أشخاص استثنائيين لبنائه معنا.",
    val_title:"ما يحركنا", val_1:"الابتكار الأصيل", val_2:"نزاهة البيانات", val_3:"تكنولوجيا محورها الإنسان",
    apply:"إرسال الطلب", cv_link:"رابط السيرة الذاتية",
    rights:"جميع الحقوق محفوظة.", pricing:"التسعير",
    footer_desc:"استشارات استراتيجية وبنية تحتية رقمية لمنطقة الشرق الأوسط.",
    explore:"عرض الخدمة",
  }
};

// ─── HOOKS ───────────────────────────────────────────────────────────────────

const useReveal = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('rv'); io.unobserve(e.target); }
      }),
      { threshold: 0.07 }
    );
    setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => io.observe(el));
    }, 100);
    return () => io.disconnect();
  });
};

// Smooth scroll progress 0–1
const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(h > 0 ? window.scrollY / h : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return progress;
};

// Parallax value for an element — returns offset in px
const useParallax = (speed = 0.3) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        setOffset(center * speed);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [speed]);
  return [ref, offset];
};

// Scroll-linked opacity/transform for any element
const useScrollRevealValue = (threshold = 0.15) => {
  const ref = useRef(null);
  const [val, setVal] = useState(0); // 0 = hidden, 1 = fully visible
  useEffect(() => {
    let raf;
    const calc = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const start = window.innerHeight * (1 - threshold);
      const end   = window.innerHeight * 0.2;
      const raw   = (start - rect.top) / (start - end);
      setVal(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(calc); };
    window.addEventListener('scroll', onScroll, { passive: true });
    calc();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [threshold]);
  return [ref, val];
};

// ─── FLOATING FIELD ──────────────────────────────────────────────────────────

const Field = ({ label, name, type = 'text', required, as: AsTag, children, dark }) => {
  const Tag = AsTag || 'input';
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState('');
  const active = focused || val;
  const border = dark ? (active ? 'border-white' : 'border-white/20') : (active ? 'border-slate-900' : 'border-slate-200');
  const textColor = dark ? 'text-white' : 'text-slate-900';
  const labelActive = dark ? 'text-sky-400' : 'text-sky-600';
  const labelIdle = dark ? 'text-white/40' : 'text-slate-400';

  return (
    <div className="relative w-full pb-1">
      <label className={`absolute pointer-events-none transition-all duration-200 z-10 text-left
        ${active ? `-top-5 text-[9px] tracking-[0.2em] font-bold uppercase ${labelActive}` : `top-3 text-sm font-medium ${labelIdle}`}`}>
        {label}
      </label>
      {Tag === 'select' ? (
        <div className="relative">
          <select required={required} name={name} value={val}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            onChange={e => setVal(e.target.value)}
            className={`w-full bg-transparent border-b py-3 outline-none text-sm appearance-none cursor-pointer transition-colors duration-200 ${border} ${textColor}`}>
            <option value="" disabled hidden></option>
            {children}
          </select>
          <ChevronDown size={13} className={`absolute top-3.5 right-0 pointer-events-none transition-transform duration-200 ${focused ? 'rotate-180' : ''} ${dark ? 'text-white/30' : 'text-slate-400'}`}/>
        </div>
      ) : (
        <input required={required} name={name} type={type} autoComplete="off"
          value={val} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onChange={e => setVal(e.target.value)}
          className={`w-full bg-transparent border-b py-3 outline-none text-sm transition-colors duration-200 ${border} ${textColor}`}/>
      )}
    </div>
  );
};

// ─── LOGO Q (inline arrow-Q replaces the Q letter) ──────────────────────────

const LogoQ = ({ size = '1.3em' }) => (
  <svg
    viewBox="0 0 400 500"
    fill="none"
    stroke="#0ea5e9"
    strokeWidth="55"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', width: size, height: size, verticalAlign: 'middle', marginBottom: '0.08em' }}
  >
    <circle cx="200" cy="200" r="150"/>
    <path d="M320,430 C270,430 200,400 200,320 L200,140 M140,200 L200,140 L260,200"/>
  </svg>
);

// LogoText renders "MANTI" + Q-logo inline, matching surrounding font
const LogoText = ({ className = '', color }) => (
  <span className={className} style={{ color: color || 'currentColor', letterSpacing: 'inherit', fontWeight: 400 }}>
    MANTI<LogoQ size="1.3em"/>
  </span>
);

// ─── NAV ─────────────────────────────────────────────────────────────────────

const Nav = ({ lang, setLang, go, active }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = T[lang];
  const ar = lang === 'ar';

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { id:'about', label: t.nav_about },
    { id:'services', label: t.nav_services },
    { id:'events', label: t.nav_events },
  ];

  return (
    <>
      <nav dir={ar ? 'rtl' : 'ltr'}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500
        ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-slate-100 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => go('home')} className="flex items-center group">
            {lang === 'ar'
              ? <span className={`font-normal text-xl tracking-[0.18em] uppercase transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>{t.logo}</span>
              : <LogoText className={`font-normal text-xl tracking-[0.18em] uppercase transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`} color={scrolled ? '#0f172a' : '#ffffff'}/>
            }
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {links.map(l => (
              <button key={l.id} onClick={() => go(l.id)}
                className={`text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-200
                  ${active === l.id
                    ? 'text-sky-500'
                    : scrolled ? 'text-slate-500 hover:text-slate-900' : 'text-white/60 hover:text-white'}`}>
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5">
            <button onClick={() => setLang(ar ? 'en' : 'ar')}
              className={`text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 ${scrolled ? 'text-sky-500 hover:text-sky-600' : 'text-white/50 hover:text-white'}`}>
              <Globe size={13}/> {ar ? 'EN' : 'AR'}
            </button>
            <button onClick={() => go('contact')}
              className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] rounded-full transition-all duration-200 active:scale-95
                ${scrolled ? 'bg-slate-900 text-white hover:bg-sky-600' : 'bg-white text-slate-900 hover:bg-sky-500 hover:text-white'}`}>
              {t.cta}
            </button>
          </div>

          <button className={`lg:hidden p-1 transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`} onClick={() => setOpen(!open)}>
            {open ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[200] lg:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)}/>
        <div className={`absolute top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-500 flex flex-col
          ${ar ? 'right-0' : 'left-0'} ${open ? 'translate-x-0' : ar ? 'translate-x-full' : '-translate-x-full'}`}
          dir={ar ? 'rtl' : 'ltr'}>
          <div className="flex items-center p-6 border-b border-slate-100">
            {lang === 'ar' ? <span className="font-normal text-xl tracking-[0.18em] uppercase text-slate-900">{t.logo}</span> : <LogoText className="font-normal text-xl tracking-[0.18em] uppercase" color="#0f172a"/>}
          </div>
          <div className="flex flex-col p-6 gap-1 flex-1">
            {['home', ...links.map(l => l.id), 'contact'].map(id => {
              const label = id === 'home' ? t.logo : id === 'contact' ? t.cta : links.find(l => l.id === id)?.label;
              return (
                <button key={id} onClick={() => { go(id); setOpen(false); }}
                  className="text-left py-3.5 font-bold text-slate-800 hover:text-sky-500 border-b border-slate-50 transition-colors text-sm tracking-wide">
                  {label}
                </button>
              );
            })}
          </div>
          <div className="p-6 border-t border-slate-100">
            <button onClick={() => { setLang(ar ? 'en' : 'ar'); setOpen(false); }}
              className="w-full py-3 bg-slate-50 rounded-xl text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              <Globe size={13}/> {ar ? 'Switch to English' : 'تفعيل العربية'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── SERVICE ROW ─────────────────────────────────────────────────────────────

const ServiceRow = ({ s, lang, i, onBookConsult }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const [contentH, setContentH] = useState(0);
  const t = T[lang];
  const ar = lang === 'ar';

  useEffect(() => {
    if (contentRef.current) setContentH(contentRef.current.scrollHeight);
  }, [open, lang]);

  return (
    <div
      className={`reveal service-line border-b border-slate-100 group`}
      style={{ transitionDelay: `${i * 60}ms` }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-7 sm:py-9 gap-6 text-left px-2 -mx-2 rounded-xl transition-all duration-300 hover:px-4"
        dir={ar ? 'rtl' : 'ltr'}
      >
        <div className={`flex items-center gap-6 sm:gap-10 flex-1 min-w-0 ${ar ? 'flex-row-reverse' : ''}`}>
          <span className={`text-[11px] font-black tracking-[0.2em] w-8 flex-shrink-0 transition-colors duration-300 ${open ? 'text-sky-500' : 'text-slate-300'}`}>
            {s.index}
          </span>
          <div className={`flex-1 min-w-0 ${ar ? 'text-right' : ''}`}>
            <h3 className={`text-xl sm:text-3xl font-black tracking-tight leading-tight transition-colors duration-300 ${open ? 'text-sky-600' : 'text-slate-900 group-hover:text-sky-600'}`}>
              {s.title[lang]}
            </h3>
            <p className={`text-xs sm:text-sm font-medium mt-1 tracking-wide transition-colors duration-300 ${open ? 'text-sky-400' : 'text-slate-400'}`}>
              {s.sub[lang]}
            </p>
          </div>
        </div>

        {/* Animated button */}
        <div className={`relative w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-400 overflow-hidden
          ${open
            ? 'bg-sky-500 border-sky-500 text-white'
            : 'border-slate-200 text-sky-500 group-hover:border-sky-500 group-hover:bg-sky-50'}`}>
          <ArrowUpRight size={16} className={`transition-transform duration-400 ${open ? 'rotate-90 scale-110' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`}/>
        </div>
      </button>

      {/* Real-height accordion */}
      <div
        style={{
          maxHeight: open ? `${contentH + 40}px` : '0px',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease, transform 0.4s ease',
          overflow: 'hidden',
        }}
        dir={ar ? 'rtl' : 'ltr'}
      >
        <div ref={contentRef} className="grid md:grid-cols-2 gap-8 sm:gap-12 px-2 pb-8">
          <div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">{s.desc[lang]}</p>
            <div className="grid grid-cols-2 gap-2">
              {s.features[lang].map((f, j) => (
                <div
                  key={j}
                  className={`flex items-center gap-2 ${ar ? 'flex-row-reverse' : ''}`}
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateX(0)' : 'translateX(-10px)',
                    transition: `opacity 0.4s ease ${j * 60 + 200}ms, transform 0.4s ease ${j * 60 + 200}ms`,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0"/>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div
              className="h-48 sm:h-56 rounded-2xl overflow-hidden"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'scale(1)' : 'scale(0.96)',
                transition: 'opacity 0.5s ease 0.15s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s',
              }}
            >
              <img src={s.img} alt={s.title[lang]} className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"/>
            </div>
            {onBookConsult && (
              <button
                onClick={e => { e.stopPropagation(); onBookConsult(); }}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.4s ease 0.35s, transform 0.4s ease 0.35s',
                }}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 active:scale-[0.98] transition-all duration-200 group/btn shadow-lg shadow-sky-500/25"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <CalendarCheck size={16} className="text-white"/>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-black text-xs uppercase tracking-[0.15em]">
                      {lang === 'ar' ? 'احجز استشارة' : 'Book a Consultation'}
                    </p>
                    <p className="text-white/70 text-[10px] font-medium">
                      {lang === 'ar' ? 'جلسة استراتيجية — $20' : 'Strategy session — $20'}
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-white/80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200 flex-shrink-0"/>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── STAT CARD (animated counter) ────────────────────────────────────────────

const StatCard = ({ stat, delay }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}
      className="bg-white p-8 sm:p-10 flex flex-col items-center text-center gap-3 hover:bg-sky-50/40 transition-colors duration-300 group cursor-default">
      <div
        className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 group-hover:scale-110 transition-all duration-300">
        {stat.icon}
      </div>
      <span
        className="text-3xl sm:text-4xl font-black text-slate-900"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        }}>
        {stat.n}
      </span>
      <span
        className="text-[10px] font-bold uppercase tracking-wide text-slate-400"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity 0.5s ease ${delay + 100}ms`,
        }}>
        {stat.l}
      </span>
    </div>
  );
};

// ─── TILT CARD ────────────────────────────────────────────────────────────────

const TiltCard = ({ children }) => {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
    el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
  }, []);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.15s ease', willChange: 'transform' }}>
      {children}
    </div>
  );
};

// ─── SECTION LABEL (animated accent line) ────────────────────────────────────

const SectionLabel = ({ text, dark = false }) => {
  const [ref, val] = useScrollRevealValue(0.3);
  return (
    <div ref={ref} className="flex items-center gap-3 mb-12 overflow-hidden">
      <div style={{
        width: `${val * 20}px`,
        height: '2px',
        background: '#0ea5e9',
        transition: 'none',
        willChange: 'width',
        flexShrink: 0,
      }}/>
      <span style={{
        opacity: val,
        transform: `translateX(${(1 - val) * -12}px)`,
        transition: 'none',
        willChange: 'opacity, transform',
      }} className={`text-[10px] font-bold uppercase tracking-[0.4em] ${dark ? 'text-white/40' : 'text-slate-400'}`}>
        {text}
      </span>
    </div>
  );
};

// ─── SCROLL REVEAL TEXT (live scroll-linked) ─────────────────────────────────

const ScrollRevealText = ({ children, dark = false }) => {
  const [ref, val] = useScrollRevealValue(0.2);
  return (
    <div ref={ref} style={{
      opacity: val,
      transform: `translateY(${(1 - val) * 40}px)`,
      transition: 'none',
      willChange: 'opacity, transform',
    }}>
      {children}
    </div>
  );
};

// ─── PARALLAX SECTION (wraps a section with scroll offset) ───────────────────

const ParallaxBlock = ({ children, speed = 0.12, className = '' }) => {
  const [ref, offset] = useParallax(speed);
  return (
    <div ref={ref} style={{ transform: `translateY(${offset}px)`, willChange: 'transform' }} className={className}>
      {children}
    </div>
  );
};

// ─── MARQUEE ─────────────────────────────────────────────────────────────────

const Marquee = ({ lang }) => {
  const t = T[lang];
  const items = [...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS];
  return (
    <div className="py-12 sm:py-16 border-y border-slate-100">
      <p className="text-center text-[10px] uppercase tracking-[0.5em] text-slate-300 font-bold mb-8">{t.customers_label}</p>
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none" style={{ background:'linear-gradient(to right, white, transparent)' }}/>
        <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none" style={{ background:'linear-gradient(to left, white, transparent)' }}/>
        <div className="flex gap-4 w-max animate-marquee">
          {items.map((n, i) => (
            <span key={i} className="px-5 py-2 rounded-full border border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap hover:border-sky-200 hover:text-sky-500 transition-colors cursor-default">
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState('en');
  const [active, setActive] = useState('home');
  const [careers, setCareers] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [consultModal, setConsultModal] = useState(false);
  const [consultStatus, setConsultStatus] = useState(null);
  const scriptURL = "https://script.google.com/macros/s/AKfycbyqSvxZ8nzURA776SWa-ccrTtO0xmp4-X7z1B64Kzc6SljwfkDE-3W2J5yTngjcZIxpfw/exec";

  const t = T[lang];
  const ar = lang === 'ar';

  useReveal();
  const scrollProgress = useScrollProgress();

  // Hero parallax
  const [heroImgRef, heroImgOffset] = useParallax(0.25);
  const [heroTextRef, heroTextOffset] = useParallax(0.1);

  useEffect(() => {
    const ids = ['home','about','services','events','contact'];
    const h = () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 120 && r.bottom >= 120) { setActive(id); break; }
        }
      }
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const go = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
  };

  const handleForm = async (e, sheet) => {
    e.preventDefault();
    setFormStatus('sending');
    const fd = new FormData(e.target);
    try {
      await fetch(scriptURL, {
        method: 'POST', mode: 'no-cors',
        body: JSON.stringify({ sheetName: sheet, Name: fd.get('name'), Email: fd.get('email'), Phone: fd.get('phone'), Company: fd.get('company'), Service: fd.get('service'), CV_Link: fd.get('cv_link') || '' })
      });
      setFormStatus('success');
      e.target.reset();
      setTimeout(() => setFormStatus(null), 10000);
    } catch(e) { setFormStatus(null); }
  };

  const handleConsult = async (e) => {
    e.preventDefault();
    setConsultStatus('sending');
    const fd = new FormData(e.target);
    try {
      await fetch(scriptURL, {
        method: 'POST', mode: 'no-cors',
        body: JSON.stringify({
          sheetName: 'Consultations',
          Name: fd.get('c_name'),
          Email: fd.get('c_email'),
          Phone: fd.get('c_phone'),
          Company: fd.get('c_company'),
          Goal: fd.get('c_goal'),
          Service: 'Business Consultation - $20',
        })
      });
      setConsultStatus('success');
    } catch(e) { setConsultStatus(null); }
  };

  const stats = [
    { n:'210+', l: t.stats_a, icon:<Zap size={16}/> },
    { n:'18+',  l: t.stats_b, icon:<Binary size={16}/> },
    { n:'14',   l: t.stats_c, icon:<Trophy size={16}/> },
    { n:'25+',  l: t.stats_d, icon:<Users size={16}/> },
  ];

  return (
    <div dir={ar ? 'rtl' : 'ltr'} className="bg-white text-slate-900 min-h-screen font-sans selection:bg-sky-100 selection:text-sky-700 overflow-x-hidden">

      {/* ── Scroll progress bar ── */}
      <div className="fixed top-0 left-0 z-[200] h-[2px] bg-sky-500 transition-none pointer-events-none"
        style={{ width: `${scrollProgress * 100}%`, boxShadow: '0 0 8px rgba(14,165,233,0.6)' }}/>

      <Nav lang={lang} setLang={setLang} go={go} active={active} />

      {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-slate-900">
        {/* Hero image — parallax */}
        <div className="absolute inset-0 overflow-hidden" ref={heroImgRef}>
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            alt=""
            className="w-full h-full object-cover opacity-30"
            style={{ transform: `translateY(${heroImgOffset}px)`, willChange: 'transform' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.6) 60%, rgba(2,6,23,0.8) 100%)' }}/>
        </div>

        {/* Thin top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-sky-500 z-10 animate-accentPulse"/>

        <div ref={heroTextRef} className="relative z-10 flex-1 flex flex-col justify-end pb-16 sm:pb-24 px-6 sm:px-10 pt-32 max-w-7xl mx-auto w-full"
          style={{ transform: `translateY(${heroTextOffset}px)`, willChange: 'transform' }}>
          {/* Label */}
          <div className="flex items-center gap-3 mb-8 hero-label">
            <div className="w-5 h-[2px] bg-sky-500"/>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50">{t.hero_label}</span>
          </div>

          {/* Giant headline */}
          <h1>
            <span className="block text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.88] hero-word-1">
              {t.hero_line1}
            </span>
            <span className="block text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.88] hero-word-2"
              style={{ color:'transparent', WebkitTextStroke:'1px rgba(255,255,255,0.3)' }}>
              {t.hero_line2}
            </span>
            <span className="block text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-sky-400 leading-[0.88] italic hero-word-3">
              {t.hero_line3}
            </span>
          </h1>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <p className="max-w-md text-base sm:text-lg text-white/50 leading-relaxed font-medium hero-desc">
              {t.hero_desc}
            </p>
            <div className="flex gap-3 flex-shrink-0 hero-btns">
              <button onClick={() => go('services')}
                className="px-7 py-3.5 bg-sky-500 hover:bg-sky-400 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-200 active:scale-95 flex items-center gap-2 shadow-lg shadow-sky-500/30">
                {t.nav_services} <ArrowRight size={14} className={ar ? 'rotate-180' : ''}/>
              </button>
              <button onClick={() => go('about')}
                className="px-7 py-3.5 border border-white/20 hover:border-white/50 text-white/70 hover:text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-200">
                {t.nav_about}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 sm:right-12 z-10 hidden sm:flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity cursor-pointer" onClick={() => go('about')}>
          <div className="w-6 h-9 rounded-full border-2 border-white/40 flex items-start justify-center pt-1.5">
            <div className="w-0.5 h-2 bg-white rounded-full animate-scrollDot"/>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 sm:hidden opacity-30 cursor-pointer animate-chevronBounce" onClick={() => go('about')}>
          <ChevronDown size={22} className="text-white"/>
        </div>
      </section>

      {/* ═══ ABOUT ══════════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 sm:py-36 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Label */}
          <SectionLabel text={t.about_label}/>

          <div className="grid lg:grid-cols-2 gap-16 sm:gap-24 items-start">
            <ScrollRevealText>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-900">
                <span className="block">{t.about_title1}</span>
                <span className="block italic text-sky-500">{t.about_title2}</span>
              </h2>
            </ScrollRevealText>

            <div className="reveal space-y-8" style={{ transitionDelay:'100ms' }}>
              <ParallaxBlock speed={0.06}>
              <p className="text-lg sm:text-xl text-slate-500 leading-relaxed font-medium">{t.about_body}</p>
              </ParallaxBlock>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon:<Target size={18}/>, title: t.mission, body: t.mission_body },
                  { icon:<Eye size={18}/>, title: t.vision, body: t.vision_body },
                ].map((card, i) => (
                  <TiltCard key={i}>
                    <div className="flex gap-5 p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-sky-100 hover:bg-sky-50/30 transition-colors duration-300 group h-full">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500 flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:bg-sky-100 group-hover:border-sky-200 transition-all duration-300">
                        {card.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-slate-900 uppercase tracking-wide mb-1.5">{card.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{card.body}</p>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100 border border-slate-100 rounded-3xl overflow-hidden mt-20 reveal-scale reveal" style={{ transitionDelay:'150ms' }}>
            {stats.map((s, i) => (
              <StatCard key={i} stat={s} delay={i * 120}/>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══════════════════════════════════════════════════════ */}
      <section id="services" className="py-24 sm:py-36 px-6 sm:px-10 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          {/* Label */}
          <SectionLabel text={t.services_label}/>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-end mb-16">
            <ScrollRevealText>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-900">
                <span className="block">{t.services_title1}</span>
                <span className="block italic text-sky-500">{t.services_title2}</span>
              </h2>
            </ScrollRevealText>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium reveal" style={{ transitionDelay:'80ms' }}>
              {t.services_body}
            </p>
          </div>

          {/* Service rows */}
          <div className="border-t border-slate-100">
            {SERVICES.map((s, i) => (
              <ServiceRow key={s.id} s={s} lang={lang} i={i} isLast={i === SERVICES.length - 1} onBookConsult={s.id === 'business' ? () => setConsultModal(true) : null}/>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EVENTS ═════════════════════════════════════════════════════════ */}
      <section id="events" className="py-24 sm:py-36 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Label */}
          <SectionLabel text={t.events_label}/>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] reveal">
              <span className="block text-slate-900">{lang === 'ar' ? t.events_title1 : <LogoText color="#0f172a"/>}</span>
              <span className="block italic text-sky-500">{t.events_title2}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {EVENTS.map((ev, i) => (
              <div key={ev.id} className="reveal hover-lift group relative overflow-hidden rounded-3xl cursor-default" style={{ transitionDelay:`${i*60}ms` }}>
                <div className="aspect-square sm:aspect-auto sm:h-72">
                  <ParallaxBlock speed={0.06} className="absolute inset-0 w-full h-full">
                    <img src={ev.img} alt="" loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110"/>
                  </ParallaxBlock>
                  <div className="absolute inset-0 bg-sky-700/0 group-hover:bg-sky-700/10 transition-colors duration-700"/>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CUSTOMERS MARQUEE ══════════════════════════════════════════════ */}
      <div className="px-0 reveal">
        <Marquee lang={lang}/>
      </div>

      {/* ═══ CONTACT ════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 sm:py-36 px-6 sm:px-10 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Label */}
          <SectionLabel text={t.contact_label} dark/>

          <div className="grid lg:grid-cols-2 gap-16 sm:gap-24 items-start">
            {/* Left */}
            <div className="reveal">
              <ScrollRevealText dark>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white">
                  <span className="block">{t.contact_title1}</span>
                  <span className="block italic text-sky-400">{t.contact_title2}</span>
                </h2>
              </ScrollRevealText>
              <p className="mt-8 text-base sm:text-lg text-white/50 leading-relaxed max-w-sm font-medium">{t.contact_body}</p>

              <div className="mt-12 space-y-4">
                {[
                  { icon:<Mail size={16}/>, label:'Email', val:'hello@mantiq.services' },
                  { icon:<Phone size={16}/>, label:'Phone', val:'+20 100 1234 567' },
                ].map((c, i) => (
                  <div key={i}
                    className="flex items-center gap-4 group p-4 rounded-2xl border border-white/5 hover:border-sky-500/30 hover:bg-white/[0.04] transition-all duration-300 cursor-default"
                    style={{ transitionDelay: `${i * 60}ms` }}>
                    <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/40 group-hover:border-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-0.5">{c.label}</p>
                      <p className="text-sm font-bold text-white/80 group-hover:text-white transition-colors duration-300">{c.val}</p>
                    </div>
                    <ArrowUpRight size={14} className="ml-auto text-white/0 group-hover:text-sky-400 transition-all duration-300 translate-x-2 group-hover:translate-x-0"/>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="reveal" style={{ transitionDelay:'100ms' }}>
              {formStatus === 'success' ? (
                <div className="flex flex-col gap-5 py-8">
                  <div className="w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center shadow-2xl shadow-sky-500/30">
                    <CheckCircle2 size={24} className="text-white"/>
                  </div>
                  <h3 className="text-3xl font-black text-white tracking-tight">{t.success_title}</h3>
                  <p className="text-sm text-white/50 max-w-sm leading-relaxed">{t.success_body}</p>
                </div>
              ) : (
                <form className="space-y-9" onSubmit={e => handleForm(e, 'Leads')}>
                  <div className="grid sm:grid-cols-2 gap-9">
                    <Field label={t.name_p} name="name" required dark/>
                    <Field label={t.company_p} name="company" dark/>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-9">
                    <Field label={t.email_p} name="email" type="email" required dark/>
                    <Field label={t.phone_p} name="phone" type="tel" required dark/>
                  </div>
                  <Field label={t.service_p} name="service" required dark as="select">
                    {SERVICES.map(s => <option key={s.id} value={s.id} className="text-slate-900 bg-white">{s.title[lang]}</option>)}
                  </Field>
                  <button disabled={formStatus === 'sending'}
                    className="relative w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] text-white bg-sky-500 hover:bg-sky-400 active:bg-sky-600 transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-3 disabled:opacity-40 shadow-xl shadow-sky-500/20 mt-2 overflow-hidden group/btn">
                    <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left rounded-2xl"/>
                    {formStatus === 'sending'
                      ? <><Sparkles size={14} className="animate-spin"/>{t.sending}</>
                      : <span className="relative flex items-center gap-3">{t.submit}<ChevronRight size={14} className={`transition-transform duration-300 group-hover/btn:translate-x-1 ${ar ? 'rotate-180' : ''}`}/></span>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═════════════════════════════════════════════════════════ */}
      <footer className="py-12 sm:py-16 px-6 sm:px-10 border-t border-slate-100 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <div className="mb-3">
                {lang === 'ar' ? <span className="font-normal text-xl tracking-[0.18em] uppercase text-slate-900">{t.logo}</span> : <LogoText className="font-normal text-xl tracking-[0.18em] uppercase" color="#0f172a"/>}
              </div>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">{t.footer_desc}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              <a href="https://mantiq-pricing.vercel.app/" target="_blank" rel="noopener"
                className="text-sky-500 hover:text-sky-600 font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1.5">
                <Calculator size={11}/> {t.pricing}
              </a>
              <button onClick={() => setCareers(true)}
                className="text-slate-400 hover:text-slate-700 font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1.5">
                <Users size={11}/> {t.careers}
              </button>
              <div className="flex items-center gap-3">
                {[
                  { Icon: Facebook, url: 'https://www.facebook.com/share/1Dss3Eqybc' },
                  { Icon: Linkedin, url: 'https://www.linkedin.com/company/mantiq.services' },
                  { Icon: Mail,     url: 'mailto:hello@mantiq.services' },
                ].map(({ Icon, url }, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg border border-sky-100 bg-sky-50 flex items-center justify-center text-sky-500 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:-translate-y-1 transition-all duration-200"
                    style={{ transitionDelay: `${i * 40}ms` }}>
                    <Icon size={14}/>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
              © 2026 MANTIQ . {t.rights}
            </p>
            <button onClick={() => setLang(ar ? 'en' : 'ar')}
              className="text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-sky-500 transition-colors flex items-center gap-1.5">
              <Globe size={11}/> {ar ? 'English' : 'العربية'}
            </button>
          </div>
        </div>
      </footer>

      {/* ═══ CONSULTATION MODAL ═════════════════════════════════════════════ */}
      {consultModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-xl animate-fadeIn" onClick={() => { setConsultModal(false); setConsultStatus(null); }}/>
          <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-zoomIn" dir={ar ? 'rtl' : 'ltr'}>

            {/* Top gradient header */}
            <div className="relative bg-slate-900 px-8 pt-8 pb-6 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-sky-500/20 blur-2xl"/>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-indigo-500/15 blur-2xl"/>
              <button onClick={() => { setConsultModal(false); setConsultStatus(null); }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all">
                <X size={15}/>
              </button>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
                    <CalendarCheck size={18} className="text-white"/>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 mb-0.5">
                      {lang === 'ar' ? 'منطق للأعمال' : 'Mantiq Business'}
                    </p>
                    <h3 className="text-white font-black text-lg tracking-tight">
                      {lang === 'ar' ? 'استشارة استراتيجية' : 'Strategy Consultation'}
                    </h3>
                  </div>
                </div>

                {/* Session details pills */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon:<CreditCard size={11}/>, label: lang === 'ar' ? '$20 للجلسة' : '$20 per session' },
                    { icon:<Clock size={11}/>, label: lang === 'ar' ? '45 دقيقة' : '45 minutes' },
                    { icon:<Shield size={11}/>, label: lang === 'ar' ? 'مضمون أو استرداد' : 'Money-back guarantee' },
                  ].map((pill, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
                      <span className="text-sky-400">{pill.icon}</span>
                      <span className="text-[10px] font-bold text-white/70 uppercase tracking-wide">{pill.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form body */}
            <div className="px-8 py-7">
              {consultStatus === 'success' ? (
                <div className="flex flex-col items-center text-center gap-4 py-6 animate-fadeUp">
                  <div className="w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center shadow-xl shadow-sky-500/25">
                    <CheckCircle2 size={24} className="text-white"/>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight">
                    {lang === 'ar' ? 'تم الحجز!' : "You're booked!"}
                  </h4>
                  <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                    {lang === 'ar'
                      ? 'تلقينا طلبك. سيتواصل معك مستشارنا لتأكيد الموعد وتفاصيل الدفع.'
                      : "We've received your request. Our consultant will reach out to confirm your slot and payment details."}
                  </p>
                  <button onClick={() => { setConsultModal(false); setConsultStatus(null); }}
                    className="mt-2 px-6 py-2.5 bg-slate-900 hover:bg-sky-600 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-200">
                    {lang === 'ar' ? 'إغلاق' : 'Close'}
                  </button>
                </div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={e => handleConsult(e)}
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={lang === 'ar' ? 'الاسم الكامل' : 'Full Name'} name="c_name" required dark={false}/>
                    <Field label={lang === 'ar' ? 'الشركة' : 'Company'} name="c_company" dark={false}/>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} name="c_email" type="email" required dark={false}/>
                    <Field label={lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'} name="c_phone" type="tel" required dark={false}/>
                  </div>
                  <Field label={lang === 'ar' ? 'ما هدفك الرئيسي؟' : "What's your main goal?"} name="c_goal" dark={false}/>

                  {/* Price summary */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 mt-1">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-0.5">
                        {lang === 'ar' ? 'إجمالي الجلسة' : 'Session Total'}
                      </p>
                      <p className="text-2xl font-black text-slate-900">$20</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 leading-relaxed max-w-[140px]">
                        {lang === 'ar' ? 'يُدفع عند التأكيد' : 'Payment due on confirmation'}
                      </p>
                    </div>
                  </div>

                  <button disabled={consultStatus === 'sending'}
                    className="relative w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white bg-sky-500 hover:bg-sky-400 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-sky-500/20 overflow-hidden group/btn mt-1">
                    <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left rounded-2xl"/>
                    {consultStatus === 'sending'
                      ? <><Sparkles size={14} className="animate-spin"/> {lang === 'ar' ? 'جارٍ الإرسال…' : 'Sending…'}</>
                      : <span className="relative flex items-center gap-2">
                          <CalendarCheck size={14}/>
                          {lang === 'ar' ? 'تأكيد الحجز — $20' : 'Confirm Booking — $20'}
                        </span>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══ CAREERS MODAL ══════════════════════════════════════════════════ */}
      {careers && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xl" onClick={() => setCareers(false)}/>
          <div className="relative w-full max-w-4xl bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-zoomIn" dir={ar ? 'rtl' : 'ltr'}>
            {/* Left panel */}
            <div className="hidden md:flex md:w-5/12 flex-col justify-between p-12 bg-slate-900">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center mb-8">
                  <Briefcase size={18} className="text-white"/>
                </div>
                <h2 className="text-4xl font-black tracking-tighter text-white leading-tight mb-4">{t.join_title}</h2>
                <p className="text-sm text-white/50 leading-relaxed">{t.career_body}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/30 mb-5">{t.val_title}</p>
                <div className="space-y-4">
                  {[
                    { icon:<Lightbulb size={14}/>, label: t.val_1 },
                    { icon:<Target size={14}/>, label: t.val_2 },
                    { icon:<Rocket size={14}/>, label: t.val_3 },
                  ].map((v, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/60">
                      <div className="text-sky-400">{v.icon}</div>
                      <span className="text-xs font-bold uppercase tracking-wide">{v.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="flex-1 p-8 sm:p-12 relative">
              <button onClick={() => setCareers(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
                <X size={16}/>
              </button>
              {formStatus === 'success' ? (
                <div className="flex flex-col gap-5 py-6">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center">
                    <CheckCircle2 size={22} className="text-white"/>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{t.success_title}</h3>
                  <p className="text-sm text-slate-500">Our HR team will review your profile shortly.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">{t.join_title}</h3>
                  <form className="space-y-8" onSubmit={e => handleForm(e, 'Work')}>
                    <div className="grid sm:grid-cols-2 gap-8">
                      <Field label={t.name_p} name="name" required/>
                      <Field label={t.email_p} name="email" type="email" required/>
                    </div>
                    <Field label={t.cv_link} name="cv_link" type="url"/>
                    <button disabled={formStatus === 'sending'}
                      className="w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] text-white bg-slate-900 hover:bg-sky-600 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-40 mt-4">
                      {formStatus === 'sending'
                        ? <><Sparkles size={14} className="animate-spin"/>{t.sending}</>
                        : <>{t.apply}<ChevronRight size={14} className={ar ? 'rotate-180' : ''}/></>}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── GLOBAL STYLES ─────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/now');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700;900&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; overflow-x: hidden; }

        * { font-family: 'Now', 'DM Sans', sans-serif; }
        .font-sans { font-family: 'Now', sans-serif; }
        h1, h2, h3, .font-black { font-family: 'Now', sans-serif; }
        [dir="rtl"], [dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3 {
          font-family: 'Noto Sans Arabic', sans-serif;
        }
        .tracking-tighter { letter-spacing: -0.04em; }

        /* ── Marquee ── */
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee { animation: marquee 50s linear infinite; will-change: transform; }
        @media(max-width: 640px) { .animate-marquee { animation-duration: 25s; } }

        /* ── Hero staggered fade-up ── */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(36px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .animate-fadeUp {
          opacity: 0;
          animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        /* ── Scroll dot inside mouse ── */
        @keyframes scrollDot {
          0%   { transform: translateY(0); opacity: 1; }
          60%  { transform: translateY(12px); opacity: 0; }
          61%  { transform: translateY(0); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-scrollDot { animation: scrollDot 1.8s ease-in-out infinite; }

        /* ── Mobile chevron bounce ── */
        @keyframes chevronBounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }
        .animate-chevronBounce { animation: chevronBounce 1.6s ease-in-out infinite; }

        /* ── Scroll reveal: fade + slide up ── */
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                      transform 0.9s cubic-bezier(0.16,1,0.3,1);
          will-change: opacity, transform;
          pointer-events: none;
        }
        .rv {
          opacity: 1 !important;
          transform: translateY(0) !important;
          pointer-events: auto;
        }

        /* ── Reveal variants ── */
        .reveal-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                      transform 0.9s cubic-bezier(0.16,1,0.3,1);
          will-change: opacity, transform;
          pointer-events: none;
        }
        .reveal-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                      transform 0.9s cubic-bezier(0.16,1,0.3,1);
          will-change: opacity, transform;
          pointer-events: none;
        }
        .reveal-left.rv, .reveal-right.rv {
          opacity: 1 !important;
          transform: translateX(0) !important;
          pointer-events: auto;
        }

        /* ── Scale reveal for stats ── */
        .reveal-scale {
          opacity: 0;
          transform: scale(0.94);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                      transform 0.7s cubic-bezier(0.16,1,0.3,1);
          will-change: opacity, transform;
          pointer-events: none;
        }
        .reveal-scale.rv {
          opacity: 1 !important;
          transform: scale(1) !important;
          pointer-events: auto;
        }

        /* ── Number counter animation ── */
        @keyframes countUp {
          from { opacity:0; transform: translateY(20px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .animate-countUp { animation: countUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }

        /* ── Accent line grow ── */
        @keyframes lineGrow {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }
        .animate-lineGrow { animation: lineGrow 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }

        /* ── Hover lift ── */
        .hover-lift { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -12px rgba(0,0,0,0.12); }

        /* ── Service row line slide ── */
        .service-line {
          position: relative;
          overflow: hidden;
        }
        .service-line::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: #0ea5e9;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .service-line:hover::after { transform: scaleX(1); }

        /* ── Staggered hero words ── */
        .hero-word-1 { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0ms forwards; opacity:0; }
        .hero-word-2 { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 120ms forwards; opacity:0; }
        .hero-word-3 { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 240ms forwards; opacity:0; }
        .hero-label  { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0ms forwards; opacity:0; }
        .hero-desc   { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 360ms forwards; opacity:0; }
        .hero-btns   { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 480ms forwards; opacity:0; }

        /* ── Image reveal with clip ── */
        @keyframes clipReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        .animate-clipReveal { animation: clipReveal 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }

        /* ── Subtle pulse on accent dot ── */
        @keyframes accentPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        .animate-accentPulse { animation: accentPulse 2s ease-in-out infinite; }

        /* ── Fade in (for modal backdrop) ── */
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease forwards; }

        /* ── Modal zoom ── */
        @keyframes zoomIn {
          from { opacity:0; transform:scale(0.95) translateY(16px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        .animate-zoomIn { animation: zoomIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards; }

        /* ── Custom scrollbar ── */
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #0ea5e9; }

        /* ── Service row hover indent ── */
        .service-line button:hover { padding-left: 1rem !important; padding-right: 1rem !important; }

        /* ── Form field focus glow ── */
        input:focus, select:focus {
          caret-color: #0ea5e9;
        }

        /* ── Marquee pause on hover ── */
        .animate-marquee:hover { animation-play-state: paused; }



        /* ── Smooth page transitions ── */
        section { scroll-margin-top: 80px; }

        /* ── Button ripple ── */
        @keyframes ripple {
          from { transform: scale(0); opacity: 0.3; }
          to   { transform: scale(4); opacity: 0; }
        }

        /* ── Nav link underline slide ── */
        .nav-link { position: relative; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 1.5px;
          background: #0ea5e9;
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
          transform-origin: left;
        }
        .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }

        /* ── Event card text slide ── */
        .duration-400 { transition-duration: 400ms; }
      `}</style>
    </div>
  );
}


