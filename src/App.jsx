import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, Sun, Moon, ArrowRight, Globe,
  Layout, Smartphone, BarChart3, Binary, Mail,
  Linkedin, Facebook, CheckCircle2, ChevronRight,
  Target, Eye, Zap, Shield, Users, Trophy, Calculator,
  Sparkles, Phone, Briefcase, Lightbulb, Rocket, ChevronDown, Plus
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const CUSTOMERS = [
  "EL ASEEL Development","Omar Gharib","ETMAM","ALSAIF ANALYSIS",
  "ELBEDAYA","PE","RESPRESSO","COVER SPORE","SIMCO","MIRROR",
  "ALMUHANDIS INDUSTRIES","NOURGEOUS ACCESSORIES","NAQLA",
  "START MART","CREATIVO","ALPHA ACADEMY","VARM","ART FURNITURE"
];

const EVENTS = [
  { id:1, title:{en:"Enactus Event",ar:"حدث إيناكتس"}, date:"2024",
    img:"https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800" },
  { id:2, title:{en:"AIESEC Event",ar:"حدث آيزيك"}, date:"2024",
    img:"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800" },
  { id:3, title:{en:"Pe Launching Event",ar:"حدث انطلاق Pe"}, date:"2024",
    img:"https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800" },
];

const SERVICES = [
  {
    id:'business', index:'01',
    icon: <BarChart3 size={22}/>,
    accent:'#0ea5e9',
    title:{en:"Business Development",ar:"تطوير الأعمال"},
    features:{en:["Strategic Planning","B2B Leads","Data Analytics","Consultancy"],ar:["التخطيط الاستراتيجي","توليد العملاء","التحليلات","الاستشارات"]},
    desc:{en:"Strategic growth paths by identifying untapped market opportunities and accelerating revenue.",ar:"نحن نصمم مسارات نمو استراتيجية من خلال تحديد فرص السوق غير المستغلة."},
    img:"https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
    span:'col-span-1 md:col-span-2 lg:col-span-3'
  },
  {
    id:'tracking', index:'02',
    icon: <Binary size={22}/>,
    accent:'#6366f1',
    title:{en:"Tracking Systems",ar:"أنظمة التتبع"},
    features:{en:["CRM Systems","Finance Trackers","HR Systems","Flow Automation"],ar:["أنظمة CRM","تتبع المالية","الموارد البشرية","أتمتة العمليات"]},
    desc:{en:"Transform raw data into efficient digital ecosystems with custom CRM and financial dashboards.",ar:"حول بياناتك الخام إلى أنظمة CRM وتتبع مالي مخصصة."},
    img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    span:'col-span-1 md:col-span-2 lg:col-span-2'
  },
  {
    id:'web', index:'03',
    icon: <Layout size={22}/>,
    accent:'#10b981',
    title:{en:"Websites",ar:"المواقع الإلكترونية"},
    features:{en:["E-commerce","Company Profile","Technical SEO","Usability Design"],ar:["التجارة الإلكترونية","تحسين محركات البحث","موقع لعرض شركتك","تصميم تجربة المستخدم"]},
    desc:{en:"Performance-driven websites that act as your best salesperson — built for SEO and conversion.",ar:"نبني واجهات رقمية تعمل كأفضل بائع لديك، مصممة للأداء وقوة محركات البحث."},
    img:"https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200",
    span:'col-span-1 md:col-span-2 lg:col-span-3'
  },
  {
    id:'mobile', index:'04',
    icon: <Smartphone size={22}/>,
    accent:'#f97316',
    title:{en:"Mobile Apps",ar:"تطبيقات الموبايل"},
    features:{en:["UI/UX Design","iOS & Android","AI Integrations","Payment Gateways"],ar:["تصميم واجهة المستخدم","تكاملات الذكاء الاصطناعي","دفع إلكتروني","أنظمة iOS و Android"]},
    desc:{en:"Native mobile experiences for today's users with embedded AI logic and seamless payments.",ar:"تجارب أصلية لمستخدمي الموبايل تدمج منطق الذكاء الاصطناعي."},
    img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200",
    span:'col-span-1 md:col-span-2 lg:col-span-2'
  }
];

const T = {
  en:{
    logo:"Mantiq", tag:"Intelligence in Business",
    hero1:"The Path", hero2:"You Should Take",
    heroDesc:"Modern digital infrastructure and strategic consultancy — helping businesses scale with intelligence.",
    cta:"Get Started", aboutNav:"About",
    servicesNav:"Services", eventsNav:"Events",
    aboutTitle:"About Us",
    aboutBody:"Mantiq bridges the gap between traditional business wisdom and modern digital excellence, empowering enterprises to lead with data and act with confidence.",
    mission:"Our Mission", missionBody:"Transforming business operations through intelligent automation and data-driven strategy.",
    vision:"Our Vision", visionBody:"To be the standard of technological integrity in the MENA region.",
    statsA:"Completed Services", statsB:"Managed Projects", statsC:"Launched Ventures", statsD:"Expert Partners",
    servicesTitle:"Strategic", servicesTitle2:"Solutions",
    eventsLabel:"Involved In", eventsTitle:"Mantiq On Land",
    customers:"Some of our customers",
    letsB:"Let's Build.", contactDesc:"Ready to transform your vision into reality? Our strategy team will reach out within one business day.",
    nameP:"Full Name", companyP:"Organization", emailP:"Email Address", phoneP:"Phone Number", serviceP:"Select Service",
    submit:"Initiate Project", sending:"Syncing…", successTitle:"Project Logged",
    successBody:"We've received your brief. A consultant will be in touch shortly.",
    careers:"Careers", joinTeam:"Join Our Team",
    careerMsg:"We're looking for architects of the future. Help us redefine intelligence in business.",
    valTitle:"Our DNA", val1:"Inherent Innovation", val2:"Data Integrity", val3:"Human-First Tech",
    applyBtn:"Send Application", cvLink:"Portfolio / Resume Link",
    rights:"All rights reserved.", pricing:"Pricing Calculator",
    explore:"Explore"
  },
  ar:{
    logo:"منطق", tag:"الذكاء في الأعمال",
    hero1:"المسار", hero2:"الذي يجب سلوكه",
    heroDesc:"بنية تحتية رقمية حديثة واستشارات استراتيجية لمساعدة الشركات على التوسع بذكاء.",
    cta:"ابدأ الآن", aboutNav:"من نحن",
    servicesNav:"خدماتنا", eventsNav:"الفعاليات",
    aboutTitle:"من نحن",
    aboutBody:"تعمل منطق كجسر يربط بين حكمة الأعمال التقليدية والتميز الرقمي الحديث.",
    mission:"رسالتنا", missionBody:"تحويل عمليات الأعمال من خلال الأتمتة الذكية.",
    vision:"رؤيتنا", visionBody:"أن نكون المعيار للنزاهة التكنولوجية في منطقة الشرق الأوسط.",
    statsA:"خدمة مكتملة", statsB:"مشروع مدار", statsC:"مشروع انطلق", statsD:"خبير مشارك",
    servicesTitle:"خدماتنا", servicesTitle2:"الاستراتيجية",
    eventsLabel:"شاركنا في", eventsTitle:"منطق على أرض الواقع",
    customers:"بعض من عملائنا",
    letsB:"فلنبنِ معاً.", contactDesc:"جاهز لتحويل رؤيتك إلى حقيقة؟",
    nameP:"الاسم الكامل", companyP:"الشركة", emailP:"البريد الإلكتروني", phoneP:"رقم الهاتف", serviceP:"اختر الخدمة",
    submit:"بدء المشروع", sending:"جارٍ الإرسال…", successTitle:"تم تسجيل المشروع",
    successBody:"تلقينا طلبك. سيتواصل معك أحد مستشارينا قريباً.",
    careers:"فرص العمل", joinTeam:"انضم لفريقنا",
    careerMsg:"نبحث عن مهندسي المستقبل.",
    valTitle:"قيمنا", val1:"الابتكار الأصيل", val2:"نزاهة البيانات", val3:"تكنولوجيا محورها الإنسان",
    applyBtn:"إرسال الطلب", cvLink:"رابط السيرة الذاتية",
    rights:"جميع الحقوق محفوظة.", pricing:"حاسبة التسعير",
    explore:"استكشف"
  }
};

// ─── HOOKS ───────────────────────────────────────────────────────────────────

const useReveal = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('rv'); io.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  });
};

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

const FloatingField = ({ label, name, type='text', required, isAr, as:'Tag'='input', children }) => {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState('');
  const active = focused || val;
  return (
    <div className="relative w-full">
      <label className={`absolute pointer-events-none transition-all duration-200 z-10
        ${active ? '-top-5 text-[9px] tracking-[0.2em] text-sky-400 font-bold uppercase' : 'top-3 text-sm text-slate-400'}
        ${isAr ? 'right-0' : 'left-0'}`}>
        {label}
      </label>
      {Tag === 'select' ? (
        <div className="relative">
          <select required={required} name={name} value={val}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            onChange={e => setVal(e.target.value)}
            className={`w-full bg-transparent border-b py-3 outline-none text-sm appearance-none cursor-pointer transition-colors duration-200
              ${active ? 'border-sky-400' : 'border-white/10'} text-white`}>
            <option value="" disabled hidden></option>
            {children}
          </select>
          <ChevronDown size={13} className={`absolute top-3.5 pointer-events-none text-slate-500 ${focused ? 'rotate-180 text-sky-400' : ''} transition-transform duration-200 ${isAr ? 'left-0' : 'right-0'}`}/>
        </div>
      ) : (
        <input required={required} name={name} type={type} autoComplete="off"
          value={val} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onChange={e => setVal(e.target.value)}
          className={`w-full bg-transparent border-b py-3 outline-none text-sm text-white transition-colors duration-200 ${active ? 'border-sky-400' : 'border-white/10'}`}/>
      )}
    </div>
  );
};

// ─── NAV ─────────────────────────────────────────────────────────────────────

const Nav = ({ lang, setLang, dark, setDark, go, active }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = T[lang];
  const ar = lang === 'ar';

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive:true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { id:'about', label: t.aboutNav },
    { id:'services', label: t.servicesNav },
    { id:'events', label: t.eventsNav },
  ];

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500
        ${scrolled ? 'bg-[#060b14]/90 backdrop-blur-xl border-b border-white/[0.06] py-3' : 'bg-transparent py-5'}`}
        dir={ar ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => go('home')} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center
              group-hover:bg-sky-500/20 group-hover:border-sky-500/40 transition-all duration-300">
              <svg className="w-4 h-4 text-sky-400" viewBox="0 0 400 500" fill="none" stroke="currentColor" strokeWidth="50" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="200" cy="200" r="150"/>
                <path d="M320,430 C270,430 200,400 200,320 L200,140 M140,200 L200,140 L260,200"/>
              </svg>
            </div>
            <span className="text-white font-black text-sm tracking-[0.15em] uppercase">{t.logo}</span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <button key={l.id} onClick={() => go(l.id)}
                className={`text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-200
                  ${active === l.id ? 'text-sky-400' : 'text-white/50 hover:text-white/90'}`}>
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button onClick={() => setLang(ar ? 'en' : 'ar')}
              className="text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
              {ar ? 'EN' : 'AR'}
            </button>
            <button onClick={() => setDark(!dark)}
              className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors">
              {dark ? <Sun size={16}/> : <Moon size={16}/>}
            </button>
            <button onClick={() => go('contact')}
              className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-200 shadow-lg shadow-sky-500/25 active:scale-95">
              {t.cta}
            </button>
          </div>

          <button className="lg:hidden text-white/70 hover:text-white p-1" onClick={() => setOpen(!open)}>
            {open ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[200] lg:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}/>
        <div className={`absolute top-0 h-full w-72 bg-[#080f1c] border-r border-white/10 transition-transform duration-500
          ${ar ? 'right-0 border-l border-r-0' : 'left-0'} ${open ? 'translate-x-0' : ar ? 'translate-x-full' : '-translate-x-full'}`}
          dir={ar ? 'rtl' : 'ltr'}>
          <div className="flex flex-col h-full p-7 pt-20 gap-6">
            {['home', ...links.map(l => l.id), 'contact'].map(id => {
              const label = id === 'home' ? t.logo : id === 'contact' ? t.cta : links.find(l => l.id === id)?.label || id;
              return (
                <button key={id} onClick={() => { go(id); setOpen(false); }}
                  className="text-left text-white/80 hover:text-white font-bold text-lg py-2 border-b border-white/5 transition-colors">
                  {label}
                </button>
              );
            })}
            <div className="mt-auto flex gap-3">
              <button onClick={() => { setLang(ar ? 'en' : 'ar'); setOpen(false); }}
                className="flex-1 py-2.5 bg-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/60 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <Globe size={12}/> {ar ? 'EN' : 'AR'}
              </button>
              <button onClick={() => { setDark(!dark); setOpen(false); }}
                className="flex-1 py-2.5 bg-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/60 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                {dark ? <Sun size={12}/> : <Moon size={12}/>} {dark ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────

const ServiceCard = ({ s, lang, i }) => {
  const [hov, setHov] = useState(false);
  const t = T[lang];
  return (
    <div className={`reveal group relative overflow-hidden rounded-3xl cursor-default ${s.span}
      min-h-[260px] sm:min-h-[320px]`}
      style={{ transitionDelay: `${i * 80}ms` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {/* BG image */}
      <div className="absolute inset-0 z-0">
        <img src={s.img} alt="" className={`w-full h-full object-cover transition-transform duration-[2.5s] ease-out ${hov ? 'scale-110' : 'scale-100'}`}/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b14] via-[#060b14]/60 to-[#060b14]/20"/>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 80% 20%, ${s.accent}18 0%, transparent 60%)` }}/>
      </div>

      {/* Index watermark */}
      <span className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} text-[5rem] sm:text-[8rem] font-black leading-none select-none pointer-events-none z-10
        transition-all duration-700 ${hov ? 'opacity-[0.12]' : 'opacity-[0.05]'}`}
        style={{ color: s.accent, fontStyle: 'italic' }}>
        {s.index}
      </span>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-between h-full p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md transition-all duration-300 ${hov ? 'scale-110' : 'scale-100'}`}
            style={{ background: `${s.accent}20`, color: s.accent }}>
            {s.icon}
          </div>
          <div className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 backdrop-blur-md
            transition-all duration-300 ${hov ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            {t.explore}
          </div>
        </div>

        <div>
          <h3 className={`text-xl sm:text-2xl font-black text-white tracking-tight mb-3 transition-colors duration-300 ${hov ? '' : ''}`}
            style={{ color: hov ? s.accent : 'white' }}>
            {s.title[lang]}
          </h3>
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${hov ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-sm text-white/60 leading-relaxed mb-4">{s.desc[lang]}</p>
            <div className="grid grid-cols-2 gap-1.5">
              {s.features[lang].map((f, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: s.accent }}/>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MARQUEE ──────────────────────────────────────────────────────────────────

const Marquee = ({ lang }) => {
  const t = T[lang];
  const items = [...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS];
  return (
    <div className="py-10">
      <p className="text-center text-[10px] uppercase tracking-[0.4em] text-white/25 font-bold mb-8">{t.customers}</p>
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #060b14, transparent)' }}/>
        <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #060b14, transparent)' }}/>
        <div className="flex gap-4 w-max animate-marquee">
          {items.map((n, i) => (
            <span key={i} className="px-5 py-2.5 rounded-full border border-white/8 bg-white/[0.03] text-[11px] font-bold uppercase tracking-wider text-white/40 whitespace-nowrap hover:border-sky-500/30 hover:text-white/60 transition-colors cursor-default">
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState('en');
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState('home');
  const [careers, setCareers] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const scriptURL = "https://script.google.com/macros/s/AKfycbyqSvxZ8nzURA776SWa-ccrTtO0xmp4-X7z1B64Kzc6SljwfkDE-3W2J5yTngjcZIxpfw/exec";

  const t = T[lang];
  const ar = lang === 'ar';

  useReveal();

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
    window.addEventListener('scroll', h, { passive:true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const go = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior:'smooth' });
    setActive(id);
  };

  const handleForm = async (e, sheet) => {
    e.preventDefault();
    setFormStatus('sending');
    const fd = new FormData(e.target);
    try {
      await fetch(scriptURL, {
        method:'POST', mode:'no-cors',
        body: JSON.stringify({ sheetName: sheet, Name: fd.get('name'), Email: fd.get('email'), Phone: fd.get('phone'), Company: fd.get('company'), Service: fd.get('service'), CV_Link: fd.get('cv_link')||'' })
      });
      setFormStatus('success');
      e.target.reset();
      setTimeout(() => setFormStatus(null), 10000);
    } catch { setFormStatus(null); }
  };

  const stats = [
    { n:'210+', l:t.statsA, icon:<Zap size={18}/> },
    { n:'18+',  l:t.statsB, icon:<Binary size={18}/> },
    { n:'14',   l:t.statsC, icon:<Trophy size={18}/> },
    { n:'25+',  l:t.statsD, icon:<Users size={18}/> },
  ];

  // Force dark bg regardless of toggle for this design
  const bg = dark ? '#060b14' : '#f0f4fa';
  const text = dark ? 'text-white' : 'text-slate-900';

  return (
    <div dir={ar ? 'rtl' : 'ltr'} style={{ backgroundColor: bg, color: dark ? 'white' : '#0f172a' }}
      className={`min-h-screen font-sans selection:bg-sky-500 selection:text-white overflow-x-hidden transition-colors duration-500`}>

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-1/4 left-1/4 w-[800px] h-[800px] rounded-full opacity-[0.035] blur-[120px]"
          style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }}/>
        <div className="absolute top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.025] blur-[100px]"
          style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }}/>
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-[0.02] blur-[80px]"
          style={{ background: 'radial-gradient(circle, #34d399 0%, transparent 70%)' }}/>
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}/>
      </div>

      <Nav lang={lang} setLang={setLang} dark={dark} setDark={setDark} go={go} active={active}/>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-8 z-10 pt-20">
        {/* Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-8 animate-fadeUp">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]"/>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">{t.tag}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.92] mb-8 animate-fadeUp" style={{ animationDelay:'100ms' }}>
          <span className="block text-white/90">{t.hero1}</span>
          <span className="block italic" style={{ WebkitTextStroke: dark ? '1px rgba(56,189,248,0.6)' : undefined, color: 'transparent', backgroundImage: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #34d399 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
            {t.hero2}
          </span>
        </h1>

        <p className="max-w-lg text-base sm:text-lg text-white/40 leading-relaxed mb-10 animate-fadeUp font-medium" style={{ animationDelay:'200ms' }}>
          {t.heroDesc}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 animate-fadeUp" style={{ animationDelay:'320ms' }}>
          <button onClick={() => go('services')}
            className="w-full sm:w-auto px-8 py-3.5 bg-sky-500 hover:bg-sky-400 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-200 shadow-2xl shadow-sky-500/30 active:scale-95 flex items-center justify-center gap-2">
            {t.servicesNav} <ArrowRight size={14} className={ar ? 'rotate-180' : ''}/>
          </button>
          <button onClick={() => go('about')}
            className="w-full sm:w-auto px-8 py-3.5 border border-white/10 hover:border-white/25 hover:bg-white/[0.04] text-white/60 hover:text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-200">
            {t.aboutNav}
          </button>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-30">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white/60"/>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative z-10 py-24 sm:py-36 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal space-y-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-sky-400 mb-4">{t.tag}</p>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">{t.aboutTitle}</h2>
                <div className="mt-5 h-px w-20 bg-gradient-to-r from-sky-500 to-transparent"/>
              </div>
              <p className="text-lg text-white/50 leading-relaxed font-medium">{t.aboutBody}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon:<Target size={20}/>, title:t.mission, body:t.missionBody, c:'#0ea5e9' },
                  { icon:<Eye size={20}/>, title:t.vision, body:t.visionBody, c:'#818cf8' }
                ].map((card, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] transition-colors group">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                      style={{ background: `${card.c}15`, color: card.c }}>
                      {card.icon}
                    </div>
                    <h4 className="font-black text-sm text-white mb-2">{card.title}</h4>
                    <p className="text-xs text-white/40 leading-relaxed">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 reveal" style={{ transitionDelay:'150ms' }}>
              {stats.map((s, i) => (
                <div key={i} className="p-6 sm:p-8 rounded-3xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
                  style={{ transitionDelay: `${i*60}ms` }}>
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-5 group-hover:bg-sky-500/20 transition-colors">
                    {s.icon}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white mb-1.5">{s.n}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/30">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="relative z-10 py-24 sm:py-36 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-sky-400 mb-4">{t.servicesNav}</p>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              <span className="text-white">{t.servicesTitle} </span>
              <span className="italic" style={{ color:'transparent', backgroundImage:'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip:'text', backgroundClip:'text' }}>
                {t.servicesTitle2}
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-[280px] sm:auto-rows-[340px]">
            {SERVICES.map((s, i) => <ServiceCard key={s.id} s={s} lang={lang} i={i}/>)}
          </div>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section id="events" className="relative z-10 py-24 sm:py-36 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 reveal">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-sky-400 mb-4">{t.eventsLabel}</p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white">{t.eventsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {EVENTS.map((ev, i) => (
              <div key={ev.id} className="reveal group relative h-72 sm:h-96 rounded-3xl overflow-hidden cursor-default" style={{ transitionDelay:`${i*100}ms` }}>
                <img src={ev.img} alt={ev.title[lang]} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#060b14] via-[#060b14]/40 to-transparent"/>
                <div className="absolute bottom-0 inset-x-0 p-6 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-400 block mb-2">{ev.date}</span>
                  <h3 className="text-lg sm:text-xl font-black text-white">{ev.title[lang]}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-10 py-24 sm:py-36 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto reveal">
          <div className="rounded-[2.5rem] overflow-hidden border border-white/[0.08]" style={{ background:'#0c1424' }}>
            <div className="grid lg:grid-cols-5">
              {/* Left panel */}
              <div className="lg:col-span-2 p-10 sm:p-14 relative overflow-hidden flex flex-col justify-between"
                style={{ background:'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)' }}>
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"/>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/10 blur-2xl"/>
                <div className="relative z-10">
                  <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white leading-none mb-5">{t.letsB}</h2>
                  <p className="text-sm text-white/70 leading-relaxed">{t.contactDesc}</p>
                </div>
                <div className="relative z-10 mt-10 space-y-5">
                  {[
                    { icon:<Mail size={16}/>, label:'Email Us', val:'hello@mantiq.services' },
                    { icon:<Phone size={16}/>, label:'Call Us', val:'+20 100 1234 567' }
                  ].map((c,i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-white flex-shrink-0">{c.icon}</div>
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/50 mb-0.5">{c.label}</p>
                        <p className="text-sm font-bold text-white">{c.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right form */}
              <div className="lg:col-span-3 p-10 sm:p-14">
                {formStatus === 'success' ? (
                  <div className="flex flex-col items-center justify-center h-full gap-5 py-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center shadow-2xl shadow-sky-500/30">
                      <CheckCircle2 size={28} className="text-white"/>
                    </div>
                    <h3 className="text-2xl font-black text-white">{t.successTitle}</h3>
                    <p className="text-sm text-white/50 max-w-xs">{t.successBody}</p>
                  </div>
                ) : (
                  <form className="space-y-8" onSubmit={e => handleForm(e,'Leads')}>
                    <div className="grid sm:grid-cols-2 gap-8">
                      <FloatingField label={t.nameP} name="name" required isAr={ar}/>
                      <FloatingField label={t.companyP} name="company" isAr={ar}/>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8">
                      <FloatingField label={t.emailP} name="email" type="email" required isAr={ar}/>
                      <FloatingField label={t.phoneP} name="phone" type="tel" required isAr={ar}/>
                    </div>
                    <FloatingField label={t.serviceP} name="service" required isAr={ar} as="select">
                      {SERVICES.map(s => <option key={s.id} value={s.id} className="text-slate-900">{s.title[lang]}</option>)}
                    </FloatingField>
                    <button disabled={formStatus==='sending'}
                      className="w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-40"
                      style={{ background:'linear-gradient(135deg,#0ea5e9,#3b82f6)', boxShadow:'0 8px 32px rgba(14,165,233,0.25)' }}>
                      {formStatus==='sending' ? <><Sparkles size={14} className="animate-spin"/>{t.sending}</> : <>{t.submit}<ChevronRight size={14} className={ar ? 'rotate-180' : ''}/></>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/[0.06] pt-6 pb-12 px-5 sm:px-8">
        <Marquee lang={lang}/>
        <div className="max-w-7xl mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {[Facebook, Linkedin, Mail].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/15 transition-all">
                <Icon size={15}/>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <a href="https://mantiq-pricing.vercel.app/" target="_blank" rel="noopener"
              className="text-sky-400/70 hover:text-sky-400 font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1.5">
              <Calculator size={11}/> {t.pricing}
            </a>
            <button onClick={() => setCareers(true)}
              className="text-white/30 hover:text-white/70 font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1.5">
              <Users size={11}/> {t.careers}
            </button>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            © 2026 MANTIQ. {t.rights}
          </p>
        </div>
      </footer>

      {/* ── CAREERS MODAL ── */}
      {careers && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={() => setCareers(false)}/>
          <div className="relative w-full max-w-4xl rounded-[2.5rem] overflow-hidden border border-white/10 flex flex-col md:flex-row animate-zoomIn" style={{ background:'#0c1424' }}>
            {/* Left */}
            <div className="md:w-2/5 p-10 sm:p-14 relative flex flex-col justify-between hidden md:flex" style={{ background:'linear-gradient(135deg,#0ea5e9,#3b82f6)' }}>
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"/>
              <div className="relative z-10">
                <Briefcase size={32} className="text-white mb-6"/>
                <h2 className="text-4xl font-black tracking-tighter text-white leading-tight mb-4">{t.joinTeam}</h2>
                <p className="text-sm text-white/70 leading-relaxed">{t.careerMsg}</p>
              </div>
              <div className="relative z-10 space-y-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">{t.valTitle}</p>
                {[
                  { icon:<Lightbulb size={14}/>, label:t.val1 },
                  { icon:<Target size={14}/>, label:t.val2 },
                  { icon:<Rocket size={14}/>, label:t.val3 },
                ].map((v,i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80">
                    {v.icon}<span className="text-xs font-bold">{v.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right */}
            <div className="flex-1 p-8 sm:p-12 relative">
              <button onClick={() => setCareers(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                <X size={16}/>
              </button>
              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center shadow-2xl">
                    <CheckCircle2 size={28} className="text-white"/>
                  </div>
                  <h3 className="text-2xl font-black text-white">{t.successTitle}</h3>
                  <p className="text-sm text-white/50">Our HR team will review your profile shortly.</p>
                </div>
              ) : (
                <form className="space-y-8 h-full flex flex-col justify-center" onSubmit={e => handleForm(e,'Work')}>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <FloatingField label={t.nameP} name="name" required isAr={ar}/>
                    <FloatingField label={t.emailP} name="email" type="email" required isAr={ar}/>
                  </div>
                  <FloatingField label={t.cvLink} name="cv_link" type="url" isAr={ar}/>
                  <button disabled={formStatus==='sending'}
                    className="w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-40"
                    style={{ background:'linear-gradient(135deg,#0ea5e9,#3b82f6)', boxShadow:'0 8px 32px rgba(14,165,233,0.25)' }}>
                    {formStatus==='sending' ? <><Sparkles size={14} className="animate-spin"/>{t.sending}</> : <>{t.applyBtn}<ChevronRight size={14} className={ar ? 'rotate-180' : ''}/></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=Noto+Sans+Arabic:wght@400;700;900&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; margin: 0; }
        .font-sans { font-family: 'Syne', sans-serif; }

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee { animation: marquee 45s linear infinite; will-change: transform; }
        @media(max-width:640px) { .animate-marquee { animation-duration: 22s; } }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .animate-fadeUp {
          opacity: 0;
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        .reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
          will-change: opacity, transform;
        }
        .rv {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        @keyframes zoomIn {
          from { opacity:0; transform:scale(0.94) translateY(12px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        .animate-zoomIn { animation: zoomIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards; }

        /* Fix pointer events after reveal */
        .reveal { pointer-events: none; }
        .rv     { pointer-events: auto; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.3); border-radius: 2px; }

        /* Arabic font override */
        [dir="rtl"] { font-family: 'Noto Sans Arabic', sans-serif; }
      `}</style>
    </div>
  );
}
