import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Menu, X, Sun, Moon, ArrowRight, ArrowLeft, Globe, 
  Layout, Smartphone, BarChart3, Binary, Mail, 
  Linkedin, Facebook, CheckCircle2, ChevronRight, 
  Target, Eye, Zap, Shield, Users, Trophy, Calculator, Upload, Sparkles
} from 'lucide-react';

// --- DATA ---
const CUSTOMERS = [
  "EL ASEEL Development", "Omar Gharib", "ETMAM", "ALSAIF ANALYSIS", 
  "ELBEDAYA", "PE", "RESPRESSO", "COVER SPORE", "SIMCO","MIRROR", 
  "ALMUHANDIS INDUSTRIES", "NOURGEOUS ACCESSORIES", "NAQLA", 
  "START MART", "CREATIVO", "ALPHA ACADEMY", "VARM", "ART FURNITURE"
];

const EVENTS = [
  { id: 1, title: { en: "Enactus Event", ar: "حدث إيناكتس" }, date: "2024", img: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: { en: "AIESEC Event", ar: "حدث آيزيك" }, date: "2024", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: { en: "Pe Launching Event", ar: "حدث انطلاق Pe" }, date: "2024", img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800" },
];

const SERVICE_DATA = {
  business: {
    id: 'business',
    icon: <BarChart3 className="w-8 h-8 md:w-8 md:h-8 w-6 h-6" />,
    color: 'text-sky-500 dark:text-sky-400',
    bgColor: 'bg-sky-500/5',
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
    icon: <Binary className="w-8 h-8 md:w-8 md:h-8 w-6 h-6" />,
    color: 'text-indigo-500 dark:text-indigo-400',
    bgColor: 'bg-indigo-500/5',
    title: { en: "Tracking Systems", ar: "أنظمة التتبع" },
    features: { 
      en: ["CRM Systems", "Finance Trackers", "HR Systems", "Flow Automation"], 
      ar: ["أنظمة CRM", "تتبع المالية", "الموارد البشرية", "أتمتة العمليات"] 
    },
    desc: {
      en: "Transform raw data into efficient digital systems with custom CRM and financial tracking ecosystems.",
      ar: "حول بياناتك الخام إلى معلومات قابلة للتنفيذ عبر أنظمة CRM وتتبع مالي مخصصة."
    },
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
  },
  web: {
    id: 'web',
    icon: <Layout className="w-8 h-8 md:w-8 md:h-8 w-6 h-6" />,
    color: 'text-emerald-500 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/5',
    title: { en: "Websites", ar: "المواقع الإلكترونية" },
    features: { 
      en: ["E-commerce", "Company Profile", "Technical SEO", "Usability Design"], 
      ar: ["التجارة الإلكترونية", "تحسين محركات البحث", "موقع لعرض شركتك", "تصميم تجربة المستخدم"] 
    },
    desc: {
      en: "Design and develop performance-driven websites optimized for SEO, usability, and long-term scalability.",
      ar: "نحن نبني واجهات رقمية تعمل كأفضل بائع لديك، مصممة للأداء وقوة محركات البحث."
    },
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200"
  },
  mobile: {
    id: 'mobile',
    icon: <Smartphone className="w-8 h-8 md:w-8 md:h-8 w-6 h-6" />,
    color: 'text-orange-500 dark:text-orange-400',
    bgColor: 'bg-orange-500/5',
    title: { en: "Mobile Apps", ar: "تطبيقات الموبايل" },
    features: { 
      en: ["UI/UX Design", "IOS & Android", "AI Integrations", "Payment Gateways"], 
      ar: ["تصميم واجهة المستخدم", "تكاملات الذكاء الاصطناعي", "دفع إلكتروني", "أنظمة iOS و Android"] 
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
    logo: "Mantiq",
    tag: "Business Services Company",
    hero_title: "The Path You Should Take",
    hero_desc: "Empowering success through market knowledge and digital solutions.",
    get_started: "Get Started",
    about_us: "About Us",
    services: "Our Services",
    events: "Events",
    careers: "Careers",
    contact: "Contact",
    partners: "Our Trusted Partners",
    stats_serv: "Completed Services",
    stats_proj: "Managed Projects",
    stats_vent: "Launched Ventures",
    stats_experts: "Intern Experts",
    msg_title: "Our Message",
    vision_title: "Our Vision",
    join_team: "Join Our Team",
    upload_cv: "Upload your CV (PDF/DOC)",
    submit: "Initiate Mission",
    apply: "Submit Application",
    pricing: "Pricing Calculator",
    lets_build: "Let's Build.",
    explore_more: "Explore More",
    participated: "Participated",
    mantiq_on_land: "Mantiq On Land",
    name_placeholder: "Name",
    company_placeholder: "Company",
    email_placeholder: "Email",
    phone_placeholder: "Phone Number",
    select_service: "Select Service",
    sending: "Analysing coordinates...",
    mission_received: "Mission Accepted",
    mission_desc: "Your vision is now on our radar. Our strategy team will reach out for a briefing within 24 hours.",
    rights: "ALL RIGHTS RESERVED.",
    career_msg: "We're always looking for brilliant minds. Send us your details."
  },
  ar: {
    logo: "منطق",
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
    msg_title: "رسالتنا",
    vision_title: "رؤيتنا",
    join_team: "انضم لفريقنا",
    upload_cv: "ارفع سيرتك الذاتية (PDF/DOC)",
    submit: "بدء المهمة",
    apply: "إرسال الطلب",
    pricing: "حاسبة التسعير",
    lets_build: "فلنبنِ معاً.",
    explore_more: "استكشف المزيد",
    participated: "شاركنا في",
    mantiq_on_land: "منطق على أرض الواقع",
    name_placeholder: "الاسم",
    company_placeholder: "الشركة",
    email_placeholder: "البريد الإلكتروني",
    phone_placeholder: "رقم الهاتف",
    select_service: "اختر الخدمة",
    sending: "تحليل البيانات...",
    mission_received: "تم قبول المهمة",
    mission_desc: "رؤيتك الآن ضمن اهتماماتنا. سيتواصل معك فريقنا الاستراتيجي خلال ٢٤ ساعة لمناقشة التفاصيل.",
    rights: "جميع الحقوق محفوظة.",
    career_msg: "نحن دائماً نبحث عن العقول المبدعة. أرسل لنا بياناتك."
  }
};

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          // Unobserve after showing to save resources
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const Nav = ({ lang, setLang, theme, setTheme, onNavigate, activeSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  return (
    <>
      <nav className="fixed w-full z-[100] border-b border-slate-200 dark:border-white/5 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="h-8 md:h-10 text-sky-500 dark:text-sky-400">
              <svg className="h-full w-auto" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="200" cy="200" r="150" />
                  <path d="M320,430 C270,430 200,400 200,320 L200,140 M140,200 L200,140 L260,200" />
                </g>
              </svg>
            </div>
            <span className="text-lg md:text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white transition-all group-hover:tracking-[0.2em]">
              {t.logo}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {['about', 'services', 'events'].map(item => (
              <button 
                key={item}
                onClick={() => onNavigate(item)}
                className={`relative py-2 transition-colors duration-200 ${activeSection === item ? 'text-sky-500 dark:text-sky-400' : 'hover:text-sky-500'}`}
              >
                {t[item === 'about' ? 'about_us' : item]}
                {activeSection === item && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 animate-grow-x" />
                )}
              </button>
            ))}
            <div className="flex items-center gap-4 pl-8 border-l border-slate-200 dark:border-white/10 rtl:pl-0 rtl:pr-8 rtl:border-r rtl:border-l-0">
              <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center font-black text-slate-900 dark:text-white hover:scale-110 active:scale-95 transition-transform duration-200">
                {lang === 'en' ? 'AR' : 'EN'}
              </button>
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-900 dark:text-white hover:rotate-90 transition-transform duration-500">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button onClick={() => onNavigate('contact')} className="bg-sky-500 text-white px-6 py-3 rounded-full hover:bg-sky-400 shadow-lg shadow-sky-500/20 active:scale-95 transition-all duration-200 font-bold">
                {t.get_started}
              </button>
            </div>
          </div>

          <button className="lg:hidden text-slate-900 dark:text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[150] bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileOpen(false)} />

      <div className={`fixed top-0 bottom-0 z-[200] lg:hidden w-[280px] bg-white dark:bg-slate-950 shadow-[0_0_50px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-in-out ${lang === 'ar' ? 'left-0 ' + (mobileOpen ? 'translate-x-0' : '-translate-x-full') : 'right-0 ' + (mobileOpen ? 'translate-x-0' : 'translate-x-full')}`}>
        <div className="flex flex-col h-full p-6 pt-20 text-slate-900 dark:text-white">
          <div className="flex flex-col gap-4 text-xl font-black uppercase tracking-widest">
            {['home', 'about', 'services', 'events', 'contact'].map((item, idx) => (
              <button key={item} style={{ transitionDelay: `${idx * 50}ms` }} onClick={() => { onNavigate(item); setMobileOpen(false); }} className={`text-left transition-all py-2 border-b border-slate-100 dark:border-white/5 ${mobileOpen ? 'translate-x-0 opacity-100' : (lang === 'ar' ? '-translate-x-10' : 'translate-x-10') + ' opacity-0'}`}>{t[item === 'about' ? 'about_us' : item] || item}</button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Section = ({ id, children, className }) => (
  <section id={id} className={`min-h-[70vh] pt-20 pb-12 md:pt-32 md:pb-20 px-4 md:px-20 ${className}`}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const PartnerMarquee = ({ lang }) => (
  <div className="w-full overflow-hidden py-8 md:py-10 opacity-70 dark:opacity-50 hover:opacity-100 transition-opacity">
    <div className={`flex gap-6 md:gap-10 animate-marquee whitespace-nowrap ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
      {[...CUSTOMERS, ...CUSTOMERS].map((name, i) => (
        <span key={i} className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] px-6 py-2 md:px-8 md:py-3 border border-slate-200 dark:border-white/10 rounded-full text-slate-900 dark:text-white hover:bg-sky-500 hover:text-white cursor-default transition-colors duration-200">{name}</span>
      ))}
    </div>
  </div>
);

const ServiceCard = ({ service, lang, index }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div 
      className="group reveal relative bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:border-sky-500/50 flex flex-col h-full transform-gpu transition-all duration-500 hover:-translate-y-2" 
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="h-40 md:h-56 relative overflow-hidden">
        <img src={service.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt={service.title[lang]} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent opacity-60" />
        <div className={`absolute bottom-4 left-4 md:bottom-6 md:left-6 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${service.bgColor} ${service.color} border border-white/20 shadow-xl`}>
          {service.icon}
        </div>
      </div>

      <div className="p-6 md:p-10 pt-6 md:pt-8 flex flex-col flex-1">
        <h3 className="text-xl md:text-3xl font-black mb-3 md:mb-6 text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors duration-300 tracking-tight leading-tight">
          {service.title[lang]}
        </h3>
        
        <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6 md:mb-10 font-medium">
          {service.desc[lang]}
        </p>

        <div className="space-y-3 md:space-y-4 mt-auto">
          {service.features[lang].map((f, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 md:gap-4 transition-transform duration-300 group-hover:translate-x-1"
            >
              <div className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${service.bgColor} ${service.color}`}>
                <CheckCircle2 size={12} className="md:size-4" />
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest text-[9px] md:text-[11px]">
                {f}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 h-1 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
          <div className={`h-full w-0 group-hover:w-full transition-all duration-1000 ease-in-out bg-gradient-to-r from-sky-500 to-indigo-600`} />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('home');
  const [showCareers, setShowCareers] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const t = TRANSLATIONS[lang];
  const scriptURL = "https://script.google.com/macros/s/AKfycbyqSvxZ8nzURA776SWa-ccrTtO0xmp4-X7z1B64Kzc6SljwfkDE-3W2J5yTngjcZIxpfw/exec"; 

  useScrollReveal();

  useEffect(() => {
    // Basic context menu and developer tools prevention
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleFormSubmit = async (e, sheetName) => {
    e.preventDefault();
    setFormStatus('sending');
    
    const formData = new FormData(e.target);
    const data = {
      sheetName: sheetName,
      Name: formData.get('name'),
      Email: formData.get('email'),
      Phone: formData.get('phone'),
      Company: formData.get('company'),
      Service: formData.get('service'),
      CV_Link: formData.get('cv_link') || ""
    };

    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data)
      });
      setFormStatus('success');
      e.target.reset();
      setTimeout(() => setFormStatus(null), 10000);
    } catch (error) {
      setFormStatus(null);
    }
  };

  return (
    <div className={`${theme} ${lang === 'ar' ? 'font-arabic' : 'font-sans'} selection:bg-sky-500 selection:text-white`}>
      <div className={`bg-white dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen overflow-x-hidden ${showCareers ? 'blur-md grayscale-[0.2]' : ''}`}>
        
        {/* Optimized background visuals */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-sky-500/10 dark:bg-sky-400/5 blur-[120px] rounded-full animate-mesh-blob will-change-transform"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-400/5 blur-[120px] rounded-full animate-mesh-blob-reverse will-change-transform"></div>
          <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.05] bg-square-grid text-slate-400 dark:text-sky-400"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1),transparent_70%)]"></div>
          {/* Light noise layer for texture without heavy filtering */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none bg-noise"></div>
        </div>

        <Nav lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onNavigate={scrollToSection} activeSection={activeSection} />

        <Section id="home" className="flex flex-col justify-center items-center text-center !min-h-screen px-4 md:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6 md:mb-8 animate-fade-in-up">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-sky-500 animate-pulse"></div>
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-sky-500 dark:text-sky-400">{t.tag}</span>
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-7xl md:text-8xl lg:text-[120px] font-black leading-tight md:leading-none tracking-tighter mb-8 md:mb-10 text-slate-900 dark:text-white animate-fade-in-up w-full max-w-[95vw] mx-auto break-words" style={{ animationDelay: '100ms' }}>
            <span className="block mb-1 md:mb-2">{lang === 'en' ? 'The Path' : 'المسار'}</span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 italic px-2 md:px-4">{lang === 'en' ? 'You Should Take' : 'الذي يجب سلوكه'}</span>
          </h1>
          <div className="max-w-2xl mx-auto mb-10 md:mb-12 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
            <p className="text-sm sm:text-lg md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium px-4">{t.hero_desc}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in-up px-6 w-full max-w-xs sm:max-w-none mx-auto" style={{ animationDelay: '400ms' }}>
            <button onClick={() => scrollToSection('services')} className="px-8 py-4 md:px-10 md:py-5 bg-sky-500 text-white rounded-full font-black text-xs md:text-base uppercase tracking-widest hover:bg-sky-400 shadow-xl shadow-sky-500/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3">{t.services} <ChevronRight size={16} className="rtl:rotate-180" /></button>
            <button onClick={() => scrollToSection('about')} className="px-8 py-4 md:px-10 md:py-5 border border-slate-200 dark:border-white/10 rounded-full font-black text-xs md:text-base uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 active:scale-95 transition-all duration-200 text-slate-900 dark:text-white">{t.about_us}</button>
          </div>
        </Section>

        <Section id="about">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-8 md:space-y-12 reveal">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-3xl md:text-7xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">{t.about_us}</h2>
                <div className="h-2 md:h-3 w-20 md:w-32 bg-sky-500 animate-grow-x origin-left shadow-lg" />
                <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {lang === 'en' ? 'Established in July 2023, Mantiq bridges the gap between traditional business wisdom and modern digital excellence.' : 'تأسست شركة منطق في يوليو 2023، لتعمل كجسر يربط بين حكمة الأعمال التقليدية والتميز الرقمي الحديث.'}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                <div className="p-6 md:p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-sky-500/30 transition-colors duration-300 shadow-sm">
                  <Target className="text-sky-500 dark:text-sky-400 mb-3 md:mb-4 size-6 md:size-8" />
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-slate-900 dark:text-white">{t.msg_title}</h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{lang === 'en' ? 'Helping businesses grow smarter, operate faster, and compete stronger in a digital-first world.' : 'مساعدة الشركات على النمو بذكاء أكبر، والعمل بشكل أسرع، والمنافسة بقوة في عالم رقمي متسارع.'}</p>
                </div>
                <div className="p-6 md:p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-colors duration-300 shadow-sm">
                  <Eye className="text-indigo-500 dark:text-indigo-400 mb-3 md:mb-4 size-6 md:size-8" />
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-slate-900 dark:text-white">{t.vision_title}</h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{lang === 'en' ? 'To become the trusted digital partner for businesses seeking technological excellence and operational clarity.' : 'أن نكون الشريك الرقمي الموثوق للشركات التي تسعى للتميز التكنولوجي والوضوح التشغيلي.'}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[{ count: '210+', label: t.stats_serv, icon: <Zap /> }, { count: '18+', label: t.stats_proj, icon: <Binary /> }, { count: '14', label: t.stats_vent, icon: <Trophy /> }, { count: '25+', label: t.stats_experts, icon: <Users /> }].map((stat, i) => (
                <div key={i} className="p-6 md:p-10 bg-slate-50 dark:bg-white/5 rounded-[1.5rem] md:rounded-[2.5rem] text-center space-y-2 md:space-y-4 transition-all duration-300 border border-slate-200 dark:border-white/5 reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="mx-auto w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-sky-500 dark:text-sky-400 bg-sky-500/10 rounded-xl md:rounded-2xl">{stat.icon}</div>
                  <div className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white">{stat.count}</div>
                  <div className="text-[8px] md:text-[10px] font-black uppercase text-slate-500 tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="services">
          <div className="text-center mb-16 md:mb-24 space-y-4 md:space-y-6 reveal">
            <span className="text-sky-500 font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-xs md:text-sm">{t.services}</span>
            <h2 className="text-4xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
              Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Solutions</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-14">
            {Object.values(SERVICE_DATA).map((service, idx) => (
              <ServiceCard key={service.id} service={service} lang={lang} index={idx} />
            ))}
          </div>
        </Section>

        <Section id="events">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6 reveal">
            <div className="space-y-2 md:space-y-4">
               <span className="text-sky-500 font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-xs md:text-sm">{t.participated}</span>
               <h2 className="text-3xl md:text-7xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">{t.mantiq_on_land}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {EVENTS.map((event, idx) => (
              <div key={event.id} className="group reveal relative h-[300px] md:h-[400px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-lg transform-gpu transition-transform duration-500 hover:scale-[1.02]" style={{ transitionDelay: `${idx * 150}ms` }}>
                <img src={event.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" alt={event.title[lang]} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full transform transition-transform duration-300 group-hover:-translate-y-2">
                  <span className="text-[8px] md:text-[10px] font-black text-sky-400 mb-1 md:mb-2 block">{event.date}</span>
                  <h3 className="text-lg md:text-2xl font-black text-white leading-tight">{event.title[lang]}</h3>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact">
          <div className="max-w-4xl mx-auto reveal">
            <div className="relative p-8 md:p-20 bg-sky-500 rounded-[2.5rem] md:rounded-[4rem] text-white flex flex-col justify-center shadow-lg dark:bg-slate-900 dark:border dark:border-white/10 transition-shadow duration-300 hover:shadow-2xl hover:shadow-sky-500/20 overflow-hidden min-h-[350px]">
              {formStatus === 'success' ? (
                <div className="text-center space-y-6 md:space-y-8 animate-fade-in flex flex-col items-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white dark:bg-sky-500/20 rounded-full flex items-center justify-center animate-bounce shadow-2xl">
                    <CheckCircle2 size={32} className="text-sky-500 dark:text-sky-400 md:size-12" />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <h2 className="text-2xl md:text-6xl font-black tracking-tighter leading-tight">{t.mission_received}</h2>
                    <p className="text-sm md:text-xl font-medium opacity-90 max-w-xl mx-auto leading-relaxed">
                      {t.mission_desc}
                    </p>
                  </div>
                  <button onClick={() => setFormStatus(null)} className="px-6 py-2 md:px-8 md:py-3 bg-white/20 hover:bg-white/30 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors duration-200">Send another briefing</button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-7xl font-black tracking-tighter mb-6 md:mb-8">{t.lets_build}</h2>
                  <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleFormSubmit(e, 'Leads')}>
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                      <input required name="name" type="text" placeholder={t.name_placeholder} className="w-full px-5 py-4 md:px-6 md:py-5 bg-black/10 dark:bg-white/5 border-b border-white/20 outline-none focus:border-white transition-colors duration-200 placeholder:text-slate-200 dark:placeholder:text-slate-400 text-white rounded-t-lg text-sm md:text-base" />
                      <input name="company" type="text" placeholder={t.company_placeholder} className="w-full px-5 py-4 md:px-6 md:py-5 bg-black/10 dark:bg-white/5 border-b border-white/20 outline-none focus:border-white transition-colors duration-200 placeholder:text-slate-200 dark:placeholder:text-slate-400 text-white rounded-t-lg text-sm md:text-base" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                      <input required name="email" type="email" placeholder={t.email_placeholder} className="w-full px-5 py-4 md:px-6 md:py-5 bg-black/10 dark:bg-white/5 border-b border-white/20 outline-none focus:border-white transition-colors duration-200 placeholder:text-slate-200 dark:placeholder:text-slate-400 text-white rounded-t-lg text-sm md:text-base" />
                      <input required name="phone" type="tel" placeholder={t.phone_placeholder} className="w-full px-5 py-4 md:px-6 md:py-5 bg-black/10 dark:bg-white/5 border-b border-white/20 outline-none focus:border-white transition-colors duration-200 placeholder:text-slate-200 dark:placeholder:text-slate-400 text-white rounded-t-lg text-sm md:text-base" />
                    </div>
                    <select name="service" className="w-full px-5 py-4 md:px-6 md:py-5 bg-black/20 dark:bg-white/10 border-b border-white/20 outline-none focus:border-white transition-colors duration-200 text-white cursor-pointer rounded-t-lg text-sm md:text-base">
                      <option value="" className="text-slate-900">{t.select_service}</option>
                      {Object.values(SERVICE_DATA).map(s => <option key={s.id} value={s.id} className="text-slate-900">{s.title[lang]}</option>)}
                    </select>
                    <button disabled={formStatus === 'sending'} className="w-full py-5 md:py-6 bg-slate-950 dark:bg-sky-500 text-white dark:text-slate-950 font-black uppercase tracking-widest rounded-xl md:rounded-2xl hover:bg-slate-800 dark:hover:bg-sky-400 transition-all duration-200 disabled:opacity-50 shadow-xl flex items-center justify-center gap-3 text-xs md:text-base">
                      {formStatus === 'sending' && <Sparkles size={16} className="animate-spin md:size-5" />}
                      {formStatus === 'sending' ? t.sending : t.submit}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </Section>

        <footer className="pt-10 pb-16 md:pb-20 px-4 md:px-6 border-t border-slate-200 dark:border-white/5 reveal">
          <PartnerMarquee lang={lang} />
          <div className="max-w-7xl mx-auto mt-12 md:mt-20 flex flex-col items-center gap-8 md:gap-10">
            <div className="flex gap-4 md:gap-6">
              <a href="https://www.facebook.com/mantiiq" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-sky-500 hover:text-white dark:hover:text-slate-950 transition-all duration-200 text-slate-900 dark:text-white transform-gpu hover:-translate-y-1"><Facebook size={18} className="md:size-5" /></a>
              <a href="https://www.linkedin.com/company/mantiq.services" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-sky-500 hover:text-white dark:hover:text-slate-950 transition-all duration-200 text-slate-900 dark:text-white transform-gpu hover:-translate-y-1"><Linkedin size={18} className="md:size-5" /></a>
              <a href="mailto:Mantiq2023@gmail.com" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-sky-500 hover:text-white dark:hover:text-slate-950 transition-all duration-200 text-slate-900 dark:text-white transform-gpu hover:-translate-y-1"><Mail size={18} className="md:size-5" /></a>
            </div>
            <div className="flex flex-col items-center gap-4 md:gap-6">
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                <a href="https://mantiq-pricing.vercel.app/" target="_blank" className="text-sky-500 font-black text-[10px] md:text-xs tracking-widest uppercase hover:underline flex items-center gap-2 group">
                  <Calculator size={12} className="md:size-4 group-hover:rotate-12 transition-transform" /> {t.pricing}
                </a>
                <button onClick={() => setShowCareers(true)} className="text-slate-500 dark:text-slate-400 font-black text-[10px] md:text-xs tracking-widest uppercase hover:text-sky-500 transition-colors flex items-center gap-2 group">
                  <Users size={12} className="md:size-4 group-hover:scale-110 transition-transform" /> {t.careers}
                </button>
              </div>
              <p className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] md:tracking-[0.4em] text-center">© 2026 MANTIQ BUSINESS SERVICES. {t.rights}</p>
            </div>
          </div>
        </footer>
      </div>

      {showCareers && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl animate-fade-in" onClick={() => setShowCareers(false)}></div>
          <div className={`relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2rem] md:rounded-[3rem] shadow-2xl p-8 md:p-16 animate-zoom-in text-slate-900 dark:text-white ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <button onClick={() => setShowCareers(false)} className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"><X size={18} /></button>
            <h2 className="text-2xl md:text-5xl font-black tracking-tighter mb-4 md:mb-6 animate-fade-in">{t.join_team}</h2>
            <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400 mb-8 md:mb-10 animate-fade-in" style={{ animationDelay: '100ms' }}>{t.career_msg}</p>
            <form className="space-y-4 md:space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }} onSubmit={(e) => handleFormSubmit(e, 'Work')}>
              <input required name="name" type="text" placeholder={t.name_placeholder} className="w-full px-5 py-4 md:px-6 md:py-5 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 outline-none focus:border-sky-500 transition-colors duration-200 rounded-t-lg text-sm md:text-base" />
              <input required name="email" type="email" placeholder={t.email_placeholder} className="w-full px-5 py-4 md:px-6 md:py-5 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 outline-none focus:border-sky-500 transition-colors duration-200 rounded-t-lg text-sm md:text-base" />
              <div className="space-y-2">
                <input name="cv_link" type="url" placeholder="Paste Portfolio or Resume Link" className="w-full px-5 py-4 md:px-6 md:py-5 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 outline-none focus:border-sky-500 transition-colors duration-200 rounded-t-lg text-sm md:text-base" />
                <p className="text-[10px] opacity-60">* Please paste a public link to your CV.</p>
              </div>
              <button disabled={formStatus === 'sending'} className="w-full py-4 md:py-6 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black uppercase tracking-widest rounded-xl md:rounded-2xl hover:bg-sky-500 dark:hover:bg-slate-100 active:scale-95 transition-all duration-200 text-xs md:text-base">
                {formStatus === 'sending' ? t.sending : (formStatus === 'success' ? 'Sent!' : t.apply)}
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;700;900&family=Noto+Sans+Arabic:wght@100;400;700;900&display=swap');
        body { -webkit-user-select: none; user-select: none; scroll-behavior: smooth; }
        .font-sans { font-family: 'Outfit', sans-serif; }
        .font-arabic { font-family: 'Noto Sans Arabic', sans-serif; }
        @keyframes marquee { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }
        .animate-marquee { animation: marquee 15s linear infinite; }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translate3d(0, 30px, 0); } 100% { opacity: 1; transform: translate3d(0,0,0); } }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        @keyframes grow-x { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
        .animate-grow-x { animation: grow-x 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes zoom-in { 0% { opacity: 0; transform: scale3d(0.95, 0.95, 1); } 100% { opacity: 1; transform: scale3d(1,1,1); } }
        .animate-zoom-in { animation: zoom-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        @keyframes mesh-blob { 0%, 100% { transform: translate3d(0, 0, 0) scale(1); } 33% { transform: translate3d(5%, 5%, 0) scale(1.05); } 66% { transform: translate3d(-2%, 8%, 0) scale(0.95); } }
        @keyframes mesh-blob-reverse { 0%, 100% { transform: translate3d(0, 0, 0) scale(1); } 33% { transform: translate3d(-5%, -5%, 0) scale(1.05); } 66% { transform: translate3d(2%, -8%, 0) scale(0.95); } }
        .animate-mesh-blob { animation: mesh-blob 25s infinite alternate ease-in-out; }
        .animate-mesh-blob-reverse { animation: mesh-blob-reverse 30s infinite alternate-reverse ease-in-out; }
        .bg-square-grid { background-image: linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px); background-size: 40px 40px; }
        @media (min-width: 768px) { .bg-square-grid { background-size: 60px 60px; } }
        .bg-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: 0.05; }
        .reveal { opacity: 0; transform: translate3d(0, 40px, 0); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none; }
        .reveal-visible { opacity: 1; transform: translate3d(0,0,0); pointer-events: auto; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        @media (min-width: 768px) { .custom-scrollbar::-webkit-scrollbar { width: 6px; } }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
        ::selection { background-color: #38bdf8; color: white; }
        .will-change-transform { will-change: transform; }
      `}</style>
    </div>
  );
}
