import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Menu, X, Sun, Moon, ArrowRight, ArrowLeft, Globe, 
  Layout, Smartphone, BarChart3, Binary, Mail, 
  Linkedin, Facebook, CheckCircle2, ChevronRight, 
  Target, Eye, Zap, Shield, Users, Trophy, Calculator, Upload
} from 'lucide-react';

// --- DATA ---
const CUSTOMERS = [
  "EL ASEEL Development", "Omar Gharib", "ETMAM", "ALSAIF ANALYSIS", 
  "ELBEDAYA", "PE", "RESPRESSO", "COVER SPORE", "SIMCO", 
  "ALMUHANDIS INDUSTRIES", "NOURGEOUS ACCESSORIES", "NAQLA", 
  "START MART", "CREATIVO", "ALPHA ACADEMY", "VARM", "ART FURNITURE"
];

const EVENTS = [
  { id: 1, title: { en: "Enactus Event", ar: "حدث إيناكتس" }, date: "2024", img: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: { en: "AIESEC Event", ar: "حدث آيزيك" }, date: "2024", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: { en: "Pe Launching Event", ar: "حدث انطلاق Pe" }, date: "2024", img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: { en: "Corporate Summit", ar: "قمة الشركات" }, date: "2024", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: { en: "Innovation Lab", ar: "مختبر الابتكار" }, date: "2023", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800" },
];

const SERVICE_DATA = {
  business: {
    id: 'business',
    icon: <BarChart3 className="w-8 h-8" />,
    color: 'text-sky-500 dark:text-sky-400',
    title: { en: "Business Development", ar: "تطوير الأعمال" },
    features: { 
      en: ["Strategic Planning", "B2B Leads", "Data Analytics", "Consultancy"], 
      ar: ["التخطيط الاستراتيجي", "توليد العملاء", "التحليلات", "الاستشارات"] 
    },
    desc: { 
      en: "We create strategic growth paths by identifying untapped market opportunities and optimizing your internal operations.",
      ar: "نحن نصمم مسارات نمو استراتيجية من خلال تحديد فرص السوق غير المستغلة وتحسين عملياتك الداخلية."
    },
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
  },
  tracking: {
    id: 'tracking',
    icon: <Binary className="w-8 h-8" />,
    color: 'text-indigo-500 dark:text-indigo-400',
    title: { en: "Tracking Systems", ar: "أنظمة التتبع" },
    features: { 
      en: ["CRM Systems", "Finance Trackers", "HR Systems"], 
      ar: ["أنظمة CRM", "تتبع المالية", "الموارد البشرية"] 
    },
    desc: {
      en: "Transform raw data into efficient digital systems with custom CRM and financial tracking ecosystems.",
      ar: "حول بياناتك الخام إلى معلومات قابلة للتنفيذ عبر أنظمة CRM وتتبع مالي مخصصة."
    },
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
  },
  web: {
    id: 'web',
    icon: <Layout className="w-8 h-8" />,
    color: 'text-emerald-500 dark:text-emerald-400',
    title: { en: "Websites", ar: "المواقع الإلكترونية" },
    features: { 
      en: ["E-commerce", "Company Profile", "Technical SEO", "Usability Design"], 
      ar: ["التجارة الإلكترونية", "تحسين محركات البحث", "موقع لعرض شركتك"] 
    },
    desc: {
      en: "Design and develop performance-driven websites optimized for SEO, usability, and long-term scalability.",
      ar: "نحن نبني واجهات رقمية تعمل كأفضل بائع لديك، مصممة للأداء وقوة محركات البحث."
    },
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200"
  },
  mobile: {
    id: 'mobile',
    icon: <Smartphone className="w-8 h-8" />,
    color: 'text-orange-500 dark:text-orange-400',
    title: { en: "Mobile Apps", ar: "تطبيقات الموبايل" },
    features: { 
      en: ["UI/UX Design", "IOS & Android", "AI Integrations", "Payment Gateways"], 
      ar: ["تصميم واجهة المستخدم", "تكاملات الذكاء الاصطناعي", "دفع إلكتروني"] 
    },
    desc: {
      en: "Native mobile experiences built for today’s mobile-first users, integrating advanced AI logic.",
      ar: "تجارب أصلية لمستخدمي الموبايل تدمج منطق الذكاء الاصطناعي وتجربة مستخدم سلسة."
    },
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
  }
};

const TRANSLATIONS = {
  en: {
    tag: "Business Services Company",
    hero_title: "The Path You Should Take",
    hero_desc: "Empowering success through market knowledge and digital solutions.",
    get_started: "Get Started",
    about_us: "About Us",
    services: "Services",
    events: "Events",
    careers: "Careers",
    contact: "Contact",
    partners: "Our Trusted Partners",
    stats_serv: "Completed Services",
    stats_proj: "Managed Projects",
    stats_vent: "Launched Ventures",
    stats_experts: "Intern Experts",
    why_us: "Why Choose Us",
    msg_title: "Our Message",
    vision_title: "Our Vision",
    join_team: "Join Our Team",
    upload_cv: "Upload your CV (PDF/DOC)",
    submit: "Initiate Mission",
    apply: "Submit Application",
    pricing: "Pricing Calculator",
    sol_profile: "Solution Profile"
  },
  ar: {
    tag: "شركة خدمات أعمال",
    hero_title: "المسار الذي يجب أن تسلكه",
    hero_desc: "تمكين نجاحك من خلال المعرفة بالسوق والحلول الرقمية الحديثة.",
    get_started: "ابدأ الآن",
    about_us: "من نحن",
    services: "خدماتنا",
    events: "الفعاليات",
    careers: "فرص العمل",
    contact: "اتصل بنا",
    partners: "شركاؤنا الموثوقون",
    stats_serv: "خدمة مكتملة",
    stats_proj: "مشروع مدار",
    stats_vent: "مشروع انطلق",
    stats_experts: "خبير داخلي",
    why_us: "لماذا تختارنا؟",
    msg_title: "رسالتنا",
    vision_title: "رؤيتنا",
    join_team: "انضم لفريقنا",
    upload_cv: "ارفع سيرتك الذاتية (PDF/DOC)",
    submit: "بدء المهمة",
    apply: "إرسال الطلب",
    pricing: "حاسبة التسعير",
    sol_profile: "ملف الحل"
  }
};

// --- COMPONENTS ---

const Nav = ({ lang, setLang, theme, setTheme, onNavigate, activeSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  return (
    <nav className="fixed w-full z-[100] border-b border-slate-200 dark:border-white/5 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home')}>
          <div className="h-10 text-sky-500 dark:text-sky-400">
            <svg className="h-full w-auto" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="200" cy="200" r="150" />
                <path d="M320,430 C270,430 200,400 200,320 L200,140 M140,200 L200,140 L260,200" />
              </g>
            </svg>
          </div>
          <span className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white">Mantiq</span>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {['about', 'services', 'events', 'careers'].map(item => (
            <button 
              key={item}
              onClick={() => onNavigate(item)}
              className={`hover:text-sky-500 dark:hover:text-sky-400 transition-colors ${activeSection === item ? 'text-sky-500 dark:text-sky-400' : ''}`}
            >
              {t[item === 'careers' ? 'careers' : (item === 'about' ? 'about_us' : item)]}
            </button>
          ))}
          <div className="flex items-center gap-4 pl-8 border-l border-slate-200 dark:border-white/10 rtl:pl-0 rtl:pr-8 rtl:border-r rtl:border-l-0">
            <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center font-black text-slate-900 dark:text-white">
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-900 dark:text-white">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => onNavigate('contact')} className="bg-sky-500 text-white dark:text-slate-950 px-6 py-3 rounded-full hover:bg-sky-400 shadow-lg shadow-sky-500/20 transition-all font-bold">
              {t.get_started}
            </button>
          </div>
        </div>

        <button className="lg:hidden text-slate-900 dark:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white dark:bg-slate-950 z-[200] transition-all duration-500 ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="p-10 flex flex-col h-full text-slate-900 dark:text-white">
          <div className="flex justify-between items-center mb-16">
            <span className="text-xl font-black tracking-widest uppercase">Mantiq</span>
            <button onClick={() => setMobileOpen(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8 text-3xl font-black uppercase tracking-widest">
            {['home', 'about', 'services', 'events', 'careers', 'contact'].map((item, idx) => (
              <button 
                key={item} 
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={() => { onNavigate(item); setMobileOpen(false); }}
                className="text-left hover:text-sky-500 transition-all"
              >
                {t[item === 'about' ? 'about_us' : (item === 'careers' ? 'careers' : item)] || item}
              </button>
            ))}
          </div>
          <div className="mt-auto flex gap-4">
             <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="flex-1 py-4 bg-slate-100 dark:bg-white/5 rounded-2xl font-black">
              {lang === 'en' ? 'ARABIC' : 'ENGLISH'}
            </button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="flex-1 py-4 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center">
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Section = ({ id, children, className }) => (
  <section id={id} className={`min-h-screen pt-32 pb-20 px-6 lg:px-20 ${className}`}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const PartnerMarquee = () => (
  <div className="w-full overflow-hidden py-10 opacity-60 dark:opacity-40 hover:opacity-100 transition-opacity">
    <div className="flex gap-10 animate-marquee whitespace-nowrap">
      {[...CUSTOMERS, ...CUSTOMERS].map((name, i) => (
        <span key={i} className="text-xs font-black uppercase tracking-[0.3em] px-8 py-3 border border-slate-200 dark:border-white/10 rounded-full text-slate-600 dark:text-white">
          {name}
        </span>
      ))}
    </div>
  </div>
);

const ServiceCard = ({ service, lang, onOpen }) => (
  <div className="group relative bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden hover:border-sky-500/50 transition-all duration-500 shadow-sm hover:shadow-xl">
    <div className="h-48 overflow-hidden">
      <img src={service.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={service.title[lang]} />
    </div>
    <div className="p-8">
      <div className={`mb-6 ${service.color}`}>{service.icon}</div>
      <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white">{service.title[lang]}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">{service.desc[lang]}</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {service.features[lang].slice(0, 2).map((f, i) => (
          <span key={i} className="text-[10px] font-bold px-3 py-1 bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-white rounded-full uppercase tracking-widest">{f}</span>
        ))}
      </div>
      <button 
        onClick={() => onOpen(service)}
        className="w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-sky-500 text-white border-transparent hover:bg-sky-600 shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
      >
        Explore More <ArrowRight size={14} className="rtl:rotate-180" />
      </button>
    </div>
  </div>
);

export default function App() {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [formStatus, setFormStatus] = useState(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeydown = (e) => {
      if (
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
        (e.ctrlKey && e.keyCode === 85)
      ) {
        e.preventDefault();
        return false;
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedService]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      e.target.reset();
      setTimeout(() => setFormStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className={`${theme} ${lang === 'ar' ? 'font-arabic' : 'font-sans'} selection:bg-sky-500 selection:text-white`}>
      <div className={`bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-all duration-500 min-h-screen overflow-x-hidden ${selectedService ? 'blur-md grayscale-[0.2]' : ''}`}>
        
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_70%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <Nav 
          lang={lang} setLang={setLang} 
          theme={theme} setTheme={setTheme} 
          onNavigate={scrollToSection} 
          activeSection={activeSection}
        />

        {/* Hero */}
        <Section id="home" className="flex flex-col justify-center items-center text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 mb-10 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-500 dark:text-sky-400">{t.tag}</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[120px] font-black leading-none tracking-tighter mb-10 text-slate-900 dark:text-white">
            <span className="block">{lang === 'en' ? 'The Path' : 'المسار'}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 italic px-4">
              {lang === 'en' ? 'You Should Take' : 'الذي يجب سلوكه'}
            </span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
            {t.hero_desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-10 py-5 bg-sky-500 text-white dark:text-slate-950 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-sky-400 shadow-xl shadow-sky-500/20 transition-all flex items-center justify-center gap-3"
            >
              {t.get_started} <ChevronRight size={18} />
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="px-10 py-5 border border-slate-200 dark:border-white/10 rounded-full font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-slate-900 dark:text-white"
            >
              {t.about_us}
            </button>
          </div>
        </Section>

        {/* About */}
        <Section id="about">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">{t.about_us}</h2>
                <div className="h-1 w-20 bg-sky-500"></div>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Established in July 2023, Mantiq bridges the gap between traditional business wisdom and modern digital excellence.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-sky-500/30 transition-all shadow-sm">
                  <Target className="text-sky-500 dark:text-sky-400 mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{t.msg_title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Helping businesses grow smarter, operate faster, and compete stronger in a digital-first world.</p>
                </div>
                <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all shadow-sm">
                  <Eye className="text-indigo-500 dark:text-indigo-400 mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{t.vision_title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">To become the trusted digital partner for businesses seeking technological excellence and operational clarity.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { count: '210+', label: t.stats_serv, icon: <Zap /> },
                { count: '18+', label: t.stats_proj, icon: <Binary /> },
                { count: '14', label: t.stats_vent, icon: <Trophy /> },
                { count: '25+', label: t.stats_experts, icon: <Users /> },
              ].map((stat, i) => (
                <div key={i} className="p-10 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] text-center space-y-4 hover:bg-sky-500/5 transition-colors border border-slate-200 dark:border-white/5 shadow-sm">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center text-sky-500 dark:text-sky-400 bg-sky-500/10 rounded-2xl">{stat.icon}</div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white">{stat.count}</div>
                  <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Services */}
        <Section id="services">
          <div className="text-center mb-20 space-y-6">
            <span className="text-sky-500 font-black uppercase tracking-[0.4em] text-sm">{t.services}</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">{t.hero_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {Object.values(SERVICE_DATA).map(service => (
              <ServiceCard key={service.id} service={service} lang={lang} onOpen={setSelectedService} />
            ))}
          </div>
        </Section>

        {/* Events */}
        <Section id="events">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
               <span className="text-sky-500 font-black uppercase tracking-[0.4em] text-sm">Participated</span>
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">Mantiq On Land</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS.map(event => (
              <div key={event.id} className="group relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-lg">
                <img src={event.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="text-[10px] font-black text-sky-400 mb-2 block">{event.date}</span>
                  <h3 className="text-2xl font-black text-white">{event.title[lang]}</h3>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Career & Contact Split */}
        <Section id="careers">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="p-12 md:p-20 bg-slate-50 dark:bg-white/5 rounded-[4rem] border border-slate-200 dark:border-white/5 hover:border-sky-500/20 transition-all flex flex-col justify-center shadow-sm">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-slate-900 dark:text-white">{t.join_team}</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-12 text-lg">We are always looking for visionary developers, strategists, and analysts. Send your details to join our expert pool.</p>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleForm(e); }}>
                <input required type="text" placeholder="Full Name" className="w-full px-6 py-5 bg-white dark:bg-white/5 border-b border-slate-200 dark:border-white/10 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white" />
                <input required type="email" placeholder="Email Address" className="w-full px-6 py-5 bg-white dark:bg-white/5 border-b border-slate-200 dark:border-white/10 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white" />
                <label className="flex items-center gap-4 p-6 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl cursor-pointer hover:bg-white dark:hover:bg-white/5 transition-all">
                  <Upload className="text-sky-500" />
                  <span className="text-sm font-bold text-slate-500">{t.upload_cv}</span>
                  <input type="file" className="hidden" />
                </label>
                <button className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black uppercase tracking-widest rounded-2xl hover:bg-sky-500 dark:hover:bg-sky-500 transition-all">
                   {t.apply}
                </button>
              </form>
            </div>

            <div id="contact" className="p-12 md:p-20 bg-sky-500 rounded-[4rem] text-white flex flex-col justify-center shadow-lg dark:bg-slate-900 dark:border dark:border-white/10 transition-all">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">{lang === 'en' ? "Let's Build." : "فلنبنِ معاً."}</h2>
              <p className="mb-12 text-lg font-bold opacity-90">{t.contact_subtitle} <span className="underline cursor-pointer">Mantiq2023@gmail.com</span></p>
              <form className="space-y-6" onSubmit={handleForm}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <input required type="text" placeholder="Name" className="w-full px-6 py-5 bg-black/10 dark:bg-white/5 border-b border-white/20 outline-none focus:border-white transition-all placeholder:text-slate-200 dark:placeholder:text-slate-400 text-white" />
                  <input type="text" placeholder="Company" className="w-full px-6 py-5 bg-black/10 dark:bg-white/5 border-b border-white/20 outline-none focus:border-white transition-all placeholder:text-slate-200 dark:placeholder:text-slate-400 text-white" />
                </div>
                <input required type="email" placeholder="Email" className="w-full px-6 py-5 bg-black/10 dark:bg-white/5 border-b border-white/20 outline-none focus:border-white transition-all placeholder:text-slate-200 dark:placeholder:text-slate-400 text-white" />
                <select className="w-full px-6 py-5 bg-black/20 dark:bg-white/10 border-b border-white/20 outline-none focus:border-white transition-all text-white cursor-pointer">
                  <option value="" className="text-slate-900">Select Service</option>
                  <option value="business" className="text-slate-900">Business Development</option>
                  <option value="tracking" className="text-slate-900">Tracking Systems</option>
                  <option value="web" className="text-slate-900">Websites</option>
                  <option value="mobile" className="text-slate-900">Mobile Apps</option>
                </select>
                <button disabled={formStatus === 'sending'} className="w-full py-6 bg-slate-950 dark:bg-sky-500 text-white dark:text-slate-950 font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all disabled:opacity-50 shadow-xl">
                   {formStatus === 'sending' ? 'Sending...' : (formStatus === 'success' ? 'Mission Received' : t.submit)}
                </button>
              </form>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="pt-10 pb-20 px-6 border-t border-slate-200 dark:border-white/5">
          <PartnerMarquee />
          <div className="max-w-7xl mx-auto mt-20 flex flex-col items-center gap-10">
            <div className="flex gap-6">
              <a href="#" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-sky-500 hover:text-white dark:hover:text-slate-950 transition-all text-slate-900 dark:text-white"><Facebook size={20} /></a>
              <a href="#" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-sky-500 hover:text-white dark:hover:text-slate-950 transition-all text-slate-900 dark:text-white"><Linkedin size={20} /></a>
              <a href="#" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-sky-500 hover:text-white dark:hover:text-slate-950 transition-all text-slate-900 dark:text-white"><Mail size={20} /></a>
            </div>
            <div className="flex flex-col items-center gap-4">
              <a href="https://mantiq-pricing.vercel.app/" target="_blank" className="text-sky-500 font-black text-xs tracking-widest uppercase hover:underline flex items-center gap-2">
                <Calculator size={14} /> {t.pricing}
              </a>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">
                © 2026 MANTIQ BUSINESS SERVICES. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </footer>

        {/* Floating Side Nav (Desktop) */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[90] hidden xl:flex flex-col gap-6">
          {['home', 'about', 'services', 'events', 'careers', 'contact'].map(section => (
            <button 
              key={section}
              onClick={() => scrollToSection(section)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === section ? 'bg-sky-500 h-10 shadow-[0_0_15px_rgba(56,189,248,0.5)]' : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'}`}
            />
          ))}
        </div>
      </div>

      {/* MODAL POPUP (CENTERED) */}
      {selectedService && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl transition-all duration-500" 
            onClick={() => setSelectedService(null)}
          ></div>
          
          <div className={`relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-8 md:px-16 md:pt-16 bg-white dark:bg-slate-900">
              <div className={`w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center ${selectedService.color}`}>
                {selectedService.icon}
              </div>
              <button 
                onClick={() => setSelectedService(null)} 
                className="w-14 h-14 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 flex items-center justify-center transition-all text-slate-900 dark:text-white"
              >
                <X />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 pb-16 md:px-16 md:pb-20 custom-scrollbar">
              <div className="space-y-12">
                <div>
                  <span className="text-sky-500 dark:text-sky-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">{t.sol_profile}</span>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8 text-slate-900 dark:text-white">{selectedService.title[lang]}</h2>
                  
                  <div className="w-full aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-lg">
                    <img src={selectedService.img} className="w-full h-full object-cover" alt={selectedService.title[lang]} />
                  </div>
                </div>

                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {selectedService.desc[lang]}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedService.features[lang].map((f, i) => (
                    <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white">
                      <CheckCircle2 className="text-sky-500 flex-shrink-0" />
                      <span className="font-bold text-lg">{f}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => { setSelectedService(null); scrollToSection('contact'); }}
                  className="w-full py-6 md:py-8 bg-sky-500 text-white dark:text-slate-950 font-black uppercase tracking-widest rounded-3xl text-xl shadow-2xl shadow-sky-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  {t.get_started}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;700;900&family=Noto+Sans+Arabic:wght@100;400;700;900&display=swap');
        
        body { -webkit-user-select: none; user-select: none; scroll-behavior: smooth; }
        .font-sans { font-family: 'Outfit', sans-serif; }
        .font-arabic { font-family: 'Noto Sans Arabic', sans-serif; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #38bdf8; }
      `}</style>
    </div>
  );
}
