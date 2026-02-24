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
    icon: <BarChart3 className="w-8 h-8" />,
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
    icon: <Binary className="w-8 h-8" />,
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
    icon: <Layout className="w-8 h-8" />,
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
    icon: <Smartphone className="w-8 h-8" />,
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
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  return (
    <>
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
            <span className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white transition-all group-hover:tracking-[0.2em]">
              {t.logo}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {['about', 'services', 'events'].map(item => (
              <button 
                key={item}
                onClick={() => onNavigate(item)}
                className={`relative py-2 hover:text-sky-500 dark:hover:text-sky-400 transition-colors ${activeSection === item ? 'text-sky-500 dark:text-sky-400' : ''}`}
              >
                {t[item === 'about' ? 'about_us' : item]}
                {activeSection === item && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 transition-all animate-grow-x" />
                )}
              </button>
            ))}
            <div className="flex items-center gap-4 pl-8 border-l border-slate-200 dark:border-white/10 rtl:pl-0 rtl:pr-8 rtl:border-r rtl:border-l-0">
              <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center font-black text-slate-900 dark:text-white hover:scale-110 active:scale-95 transition-all">
                {lang === 'en' ? 'AR' : 'EN'}
              </button>
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-900 dark:text-white hover:rotate-90 transition-all duration-500">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button onClick={() => onNavigate('contact')} className="bg-sky-500 text-white px-6 py-3 rounded-full hover:bg-sky-400 shadow-lg shadow-sky-500/20 active:scale-95 transition-all font-bold">
                {t.get_started}
              </button>
            </div>
          </div>

          <button className="lg:hidden text-slate-900 dark:text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[150] bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity duration-500 ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileOpen(false)} />

      <div className={`fixed top-0 bottom-0 z-[200] lg:hidden w-[300px] bg-white dark:bg-slate-950 shadow-[0_0_50px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-in-out ${lang === 'ar' ? 'left-0 ' + (mobileOpen ? 'translate-x-0' : '-translate-x-full') : 'right-0 ' + (mobileOpen ? 'translate-x-0' : 'translate-x-full')}`}>
        <div className="flex flex-col h-full p-8 pt-24 text-slate-900 dark:text-white">
          <div className="flex flex-col gap-6 text-2xl font-black uppercase tracking-widest">
            {['home', 'about', 'services', 'events', 'contact'].map((item, idx) => (
              <button key={item} style={{ transitionDelay: `${idx * 50}ms` }} onClick={() => { onNavigate(item); setMobileOpen(false); }} className={`text-left hover:text-sky-500 transition-all py-2 border-b border-slate-100 dark:border-white/5 ${mobileOpen ? 'translate-x-0 opacity-100' : (lang === 'ar' ? '-translate-x-10' : 'translate-x-10') + ' opacity-0'}`}>{t[item === 'about' ? 'about_us' : item] || item}</button>
            ))}
          </div>
          <div className="mt-auto space-y-4">
            <div className="h-px bg-slate-200 dark:bg-white/10 w-full mb-6" />
            <button onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setMobileOpen(false); }} className="w-full py-4 flex items-center justify-between px-6 bg-slate-100 dark:bg-white/5 rounded-2xl font-black uppercase tracking-tighter">
              <span>{lang === 'en' ? 'Arabic Version' : 'النسخة الإنجليزية'}</span>
              <Globe size={18} className="text-sky-500" />
            </button>
            <button onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setMobileOpen(false); }} className="w-full py-4 flex items-center justify-between px-6 bg-slate-100 dark:bg-white/5 rounded-2xl font-black uppercase tracking-tighter">
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              {theme === 'dark' ? <Sun size={18} className="text-orange-400" /> : <Moon size={18} className="text-sky-600" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Section = ({ id, children, className }) => (
  <section id={id} className={`min-h-[80vh] pt-32 pb-20 px-6 lg:px-20 ${className}`}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const PartnerMarquee = ({ lang }) => (
  <div className="w-full overflow-hidden py-10 opacity-70 dark:opacity-50 hover:opacity-100 transition-opacity">
    <div className={`flex gap-10 animate-marquee whitespace-nowrap ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
      {[...CUSTOMERS, ...CUSTOMERS].map((name, i) => (
        <span key={i} className="text-xs font-black uppercase tracking-[0.3em] px-8 py-3 border border-slate-200 dark:border-white/10 rounded-full text-slate-900 dark:text-white transition-all hover:bg-sky-500 hover:text-white cursor-default">{name}</span>
      ))}
    </div>
  </div>
);

const ServiceCard = ({ service, lang, index }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div 
      className="group reveal relative bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden transition-all duration-700 shadow-sm hover:shadow-2xl hover:border-sky-500/50 flex flex-col h-full transform hover:-translate-y-4" 
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Visual Asset */}
      <div className="h-56 relative overflow-hidden">
        <img src={service.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt={service.title[lang]} />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent opacity-60" />
        
        {/* Floating Icon Overlay */}
        <div className={`absolute bottom-6 left-6 w-16 h-16 rounded-2xl backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${service.bgColor} ${service.color} border border-white/20 shadow-xl`}>
          {service.icon}
        </div>
      </div>

      <div className="p-10 pt-8 flex flex-col flex-1">
        {/* Title & Description */}
        <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors tracking-tight">
          {service.title[lang]}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10 font-medium">
          {service.desc[lang]}
        </p>

        {/* Dynamic Feature List */}
        <div className="space-y-4 mt-auto">
          {service.features[lang].map((f, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 transition-all duration-500 group-hover:translate-x-2"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${service.bgColor} ${service.color} transition-all duration-500 group-hover:scale-125`}>
                <CheckCircle2 size={16} />
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest text-[11px]">
                {f}
              </span>
            </div>
          ))}
        </div>

        {/* Decorative Progress Accent */}
        <div className="mt-12 h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
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
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeydown = (e) => {
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || (e.ctrlKey && e.keyCode === 85)) {
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
    if (showCareers) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showCareers]);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setFormStatus('success');
      e.target.reset();
      setTimeout(() => setFormStatus(null), 10000);
    } catch (error) {
      setFormStatus(null);
      console.error("Submission failed", error);
    }
  };

  return (
    <div className={`${theme} ${lang === 'ar' ? 'font-arabic' : 'font-sans'} selection:bg-sky-500 selection:text-white`}>
      <div className={`bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-all duration-700 min-h-screen overflow-x-hidden ${showCareers ? 'blur-md grayscale-[0.2]' : ''}`}>
        
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-sky-500/10 dark:bg-sky-400/5 blur-[120px] rounded-full animate-mesh-blob"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-400/5 blur-[120px] rounded-full animate-mesh-blob-reverse"></div>
          <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05] bg-square-grid text-slate-400 dark:text-sky-400"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.15),transparent_70%)] transition-opacity duration-1000"></div>
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay bg-noise"></div>
        </div>

        <Nav lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onNavigate={scrollToSection} activeSection={activeSection} />

        <Section id="home" className="flex flex-col justify-center items-center text-center !min-h-screen px-4 md:px-6">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 mb-8 animate-fade-in-up">
            <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-500 dark:text-sky-400">{t.tag}</span>
          </div>
          <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-black leading-[1.1] md:leading-none tracking-tighter mb-10 text-slate-900 dark:text-white animate-fade-in-up w-full max-w-[95vw] mx-auto break-words" style={{ animationDelay: '100ms' }}>
            <span className="block mb-2">{lang === 'en' ? 'The Path' : 'المسار'}</span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 italic px-2 md:px-4">{lang === 'en' ? 'You Should Take' : 'الذي يجب سلوكه'}</span>
          </h1>
          <div className="max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
            <p className="text-base sm:text-lg md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium px-4">{t.hero_desc}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up px-6 w-full max-w-sm sm:max-w-none mx-auto" style={{ animationDelay: '400ms' }}>
            <button onClick={() => scrollToSection('services')} className="px-10 py-5 bg-sky-500 text-white rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-sky-400 shadow-xl shadow-sky-500/20 active:scale-95 transition-all flex items-center justify-center gap-3">{t.services} <ChevronRight size={18} className="rtl:rotate-180" /></button>
            <button onClick={() => scrollToSection('about')} className="px-10 py-5 border border-slate-200 dark:border-white/10 rounded-full font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 active:scale-95 transition-all text-slate-900 dark:text-white">{t.about_us}</button>
          </div>
        </Section>

        <Section id="about">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12 reveal">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">{t.about_us}</h2>
                <div className="h-3 w-32 bg-sky-500 animate-grow-x origin-left shadow-lg" />
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {lang === 'en' ? 'Established in July 2023, Mantiq bridges the gap between traditional business wisdom and modern digital excellence.' : 'تأسست شركة منطق في يوليو 2023، لتعمل كجسر يربط بين حكمة الأعمال التقليدية والتميز الرقمي الحديث.'}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-sky-500/30 transition-all shadow-sm hover:scale-[1.02]">
                  <Target className="text-sky-500 dark:text-sky-400 mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{t.msg_title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{lang === 'en' ? 'Helping businesses grow smarter, operate faster, and compete stronger in a digital-first world.' : 'مساعدة الشركات على النمو بذكاء أكبر، والعمل بشكل أسرع، والمنافسة بقوة في عالم رقمي متسارع.'}</p>
                </div>
                <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all shadow-sm hover:scale-[1.02]">
                  <Eye className="text-indigo-500 dark:text-indigo-400 mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{t.vision_title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{lang === 'en' ? 'To become the trusted digital partner for businesses seeking technological excellence and operational clarity.' : 'أن نكون الشريك الرقمي الموثوق للشركات التي تسعى للتميز التكنولوجي والوضوح التشغيلي.'}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ count: '210+', label: t.stats_serv, icon: <Zap /> }, { count: '18+', label: t.stats_proj, icon: <Binary /> }, { count: '14', label: t.stats_vent, icon: <Trophy /> }, { count: '25+', label: t.stats_experts, icon: <Users /> }].map((stat, i) => (
                <div key={i} className="p-10 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] text-center space-y-4 hover:bg-sky-500/5 transition-all border border-slate-200 dark:border-white/5 shadow-sm reveal" style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="mx-auto w-12 h-12 flex items-center justify-center text-sky-500 dark:text-sky-400 bg-sky-500/10 rounded-2xl transition-transform">{stat.icon}</div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white">{stat.count}</div>
                  <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="services">
          <div className="text-center mb-24 space-y-6 reveal">
            <span className="text-sky-500 font-black uppercase tracking-[0.4em] text-sm">{t.services}</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
              Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Solutions</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 xl:gap-14">
            {Object.values(SERVICE_DATA).map((service, idx) => (
              <ServiceCard key={service.id} service={service} lang={lang} index={idx} />
            ))}
          </div>
        </Section>

        <Section id="events">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 reveal">
            <div className="space-y-4">
               <span className="text-sky-500 font-black uppercase tracking-[0.4em] text-sm">{t.participated}</span>
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">{t.mantiq_on_land}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS.map((event, idx) => (
              <div key={event.id} className="group reveal relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-lg transition-transform hover:scale-[1.03] duration-500" style={{ transitionDelay: `${idx * 150}ms` }}>
                <img src={event.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out" alt={event.title[lang]} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-8 w-full transform group-hover:-translate-y-2 transition-transform">
                  <span className="text-[10px] font-black text-sky-400 mb-2 block">{event.date}</span>
                  <h3 className="text-2xl font-black text-white">{event.title[lang]}</h3>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact">
          <div className="max-w-4xl mx-auto reveal">
            <div className="relative p-12 md:p-20 bg-sky-500 rounded-[4rem] text-white flex flex-col justify-center shadow-lg dark:bg-slate-900 dark:border dark:border-white/10 transition-all hover:shadow-2xl hover:shadow-sky-500/20 overflow-hidden min-h-[400px]">
              {formStatus === 'success' ? (
                <div className="text-center space-y-8 animate-fade-in flex flex-col items-center">
                  <div className="w-24 h-24 bg-white dark:bg-sky-500/20 rounded-full flex items-center justify-center animate-bounce shadow-2xl">
                    <CheckCircle2 size={48} className="text-sky-500 dark:text-sky-400" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter">{t.mission_received}</h2>
                    <p className="text-lg md:text-xl font-medium opacity-90 max-w-xl mx-auto leading-relaxed">
                      {t.mission_desc}
                    </p>
                  </div>
                  <button onClick={() => setFormStatus(null)} className="px-8 py-3 bg-white/20 hover:bg-white/30 rounded-full text-xs font-black uppercase tracking-widest transition-all">Send another briefing</button>
                </div>
              ) : (
                <>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">{t.lets_build}</h2>
                  <form className="space-y-6" onSubmit={(e) => handleFormSubmit(e, 'Leads')}>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <input required name="name" type="text" placeholder={t.name_placeholder} className="w-full px-6 py-5 bg-black/10 dark:bg-white/5 border-b border-white/20 outline-none focus:border-white transition-all placeholder:text-slate-200 dark:placeholder:text-slate-400 text-white rounded-t-xl" />
                      <input name="company" type="text" placeholder={t.company_placeholder} className="w-full px-6 py-5 bg-black/10 dark:bg-white/5 border-b border-white/20 outline-none focus:border-white transition-all placeholder:text-slate-200 dark:placeholder:text-slate-400 text-white rounded-t-xl" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <input required name="email" type="email" placeholder={t.email_placeholder} className="w-full px-6 py-5 bg-black/10 dark:bg-white/5 border-b border-white/20 outline-none focus:border-white transition-all placeholder:text-slate-200 dark:placeholder:text-slate-400 text-white rounded-t-xl" />
                      <input required name="phone" type="tel" placeholder={t.phone_placeholder} className="w-full px-6 py-5 bg-black/10 dark:bg-white/5 border-b border-white/20 outline-none focus:border-white transition-all placeholder:text-slate-200 dark:placeholder:text-slate-400 text-white rounded-t-xl" />
                    </div>
                    <select name="service" className="w-full px-6 py-5 bg-black/20 dark:bg-white/10 border-b border-white/20 outline-none focus:border-white transition-all text-white cursor-pointer rounded-t-xl">
                      <option value="" className="text-slate-900">{t.select_service}</option>
                      {Object.values(SERVICE_DATA).map(s => <option key={s.id} value={s.id} className="text-slate-900">{s.title[lang]}</option>)}
                    </select>
                    <button disabled={formStatus === 'sending'} className="w-full py-6 bg-slate-950 dark:bg-sky-500 text-white dark:text-slate-950 font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 shadow-xl flex items-center justify-center gap-3">
                      {formStatus === 'sending' && <Sparkles size={20} className="animate-spin" />}
                      {formStatus === 'sending' ? t.sending : t.submit}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </Section>

        <footer className="pt-10 pb-20 px-6 border-t border-slate-200 dark:border-white/5 reveal">
          <PartnerMarquee lang={lang} />
          <div className="max-w-7xl mx-auto mt-20 flex flex-col items-center gap-10">
            <div className="flex gap-6">
              <a href="https://www.facebook.com/mantiiq" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-sky-500 hover:text-white dark:hover:text-slate-950 transition-all text-slate-900 dark:text-white transform hover:-translate-y-1"><Facebook size={20} /></a>
              <a href="https://www.linkedin.com/company/mantiq.services" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-sky-500 hover:text-white dark:hover:text-slate-950 transition-all text-slate-900 dark:text-white transform hover:-translate-y-1"><Linkedin size={20} /></a>
              <a href="mailto:Mantiq2023@gmail.com" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-sky-500 hover:text-white dark:hover:text-slate-950 transition-all text-slate-900 dark:text-white transform hover:-translate-y-1"><Mail size={20} /></a>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-wrap justify-center gap-8">
                <a href="https://mantiq-pricing.vercel.app/" target="_blank" className="text-sky-500 font-black text-xs tracking-widest uppercase hover:underline flex items-center gap-2 group">
                  <Calculator size={14} className="group-hover:rotate-12 transition-transform" /> {t.pricing}
                </a>
                <button onClick={() => setShowCareers(true)} className="text-slate-500 dark:text-slate-400 font-black text-xs tracking-widest uppercase hover:text-sky-500 transition-colors flex items-center gap-2 group">
                  <Users size={14} className="group-hover:scale-110 transition-transform" /> {t.careers}
                </button>
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] text-center">© 2026 MANTIQ BUSINESS SERVICES. {t.rights}</p>
            </div>
          </div>
        </footer>

        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[90] hidden xl:flex flex-col gap-6">
          {['home', 'about', 'services', 'events', 'contact'].map(section => (
            <button key={section} onClick={() => scrollToSection(section)} className={`w-3 h-3 rounded-full transition-all duration-500 ease-in-out transform ${activeSection === section ? 'bg-sky-500 h-10 scale-125 shadow-[0_0_15px_rgba(56,189,248,0.5)]' : 'bg-slate-300 dark:bg-slate-700 hover:scale-150'}`} title={section} />
          ))}
        </div>
      </div>

      {showCareers && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl animate-fade-in" onClick={() => setShowCareers(false)}></div>
          <div className={`relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[3rem] shadow-2xl p-10 md:p-16 animate-zoom-in text-slate-900 dark:text-white ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <button onClick={() => setShowCareers(false)} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center"><X /></button>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 animate-fade-in">{t.join_team}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 animate-fade-in" style={{ animationDelay: '100ms' }}>{t.career_msg}</p>
            <form className="space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }} onSubmit={(e) => handleFormSubmit(e, 'Work')}>
              <input required name="name" type="text" placeholder={t.name_placeholder} className="w-full px-6 py-5 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 outline-none focus:border-sky-500 transition-all rounded-t-xl" />
              <input required name="email" type="email" placeholder={t.email_placeholder} className="w-full px-6 py-5 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 outline-none focus:border-sky-500 transition-all rounded-t-xl" />
              <div className="space-y-4">
                <input name="cv_link" type="url" placeholder="Paste Portfolio or Resume Link" className="w-full px-6 py-5 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 outline-none focus:border-sky-500 transition-all rounded-t-xl" />
                <p className="text-[10px] opacity-60">* Please paste a public link to your CV.</p>
              </div>
              <button disabled={formStatus === 'sending'} className="w-full py-6 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black uppercase tracking-widest rounded-2xl hover:bg-sky-500 active:scale-95 transition-all">
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
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 8s linear infinite; }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        @keyframes grow-x { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
        .animate-grow-x { animation: grow-x 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes zoom-in { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
        .animate-zoom-in { animation: zoom-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        @keyframes mesh-blob { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(10%, 10%) scale(1.1); } 66% { transform: translate(-5%, 15%) scale(0.9); } }
        @keyframes mesh-blob-reverse { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(-10%, -10%) scale(1.1); } 66% { transform: translate(5%, -15%) scale(0.9); } }
        .animate-mesh-blob { animation: mesh-blob 20s infinite alternate ease-in-out; }
        .animate-mesh-blob-reverse { animation: mesh-blob-reverse 25s infinite alternate-reverse ease-in-out; }
        .bg-square-grid { background-image: linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px); background-size: 60px 60px; }
        .bg-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); }
        .reveal { opacity: 0; transform: translateY(40px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none; }
        .reveal-visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
        ::selection { background-color: #38bdf8; color: white; }
      `}</style>
    </div>
  );
}
