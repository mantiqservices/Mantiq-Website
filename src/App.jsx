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
    num: '01',
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
    num: '02',
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
    num: '03',
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
    num: '04',
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
    tag: "Business Services · Est. July 2023",
    hero_title_1: "The Path You",
    hero_title_2: "Should Take",
    hero_desc: "We help startups and established businesses grow with services tailored to their goals — from strategy to software.",
    get_started: "Get Started",
    about_us: "About Us",
    services: "Our Services",
    events: "Events",
    careers: "Careers",
    contact: "Contact",
    partners: "Our Trusted Partners",
    stats_serv: "Completed Services",
    stats_proj: "Managed Projects",
    stats_vent: "Businesses Launched",
    stats_experts: "Interns Trained",
    msg_title: "Our Message",
    vision_title: "Our Vision",
    join_team: "Join Our Team",
    upload_cv: "Upload your CV (PDF/DOC)",
    submit: "Initiate Mission",
    apply: "Submit Application",
    pricing: "Pricing Calculator",
    lets_build: "Ready to Start",
    lets_build_accent: "Your Path?",
    lets_build_sub: "Let's talk about how MANTIQ can help take your business to the next level.",
    explore_more: "Explore More",
    participated: "Participated",
    mantiq_on_land: "Mantiq On Land",
    name_placeholder: "Your Name",
    company_placeholder: "Company Name",
    email_placeholder: "Email Address",
    phone_placeholder: "Phone Number",
    select_service: "Subject (Select Area)",
    sending: "Analysing coordinates...",
    mission_received: "Mission Accepted",
    mission_desc: "Your vision is now on our radar. Our strategy team will reach out for a briefing within 24 hours.",
    rights: "ALL RIGHTS RESERVED.",
    career_msg: "We're always looking for brilliant minds. Send us your details.",
    learn_more: "Learn More",
    our_impact: "Our Impact",
    numbers_matter: "Numbers That Matter",
    trusted_by: "Trusted By"
  },
  ar: {
    logo: "منطق",
    tag: "خدمات أعمال · تأسست يوليو ٢٠٢٣",
    hero_title_1: "المسار الذي",
    hero_title_2: "يجب سلوكه",
    hero_desc: "نساعد الشركات الناشئة والقائمة على النمو من خلال خدمات مصممة لأهدافها - من الاستراتيجية إلى البرمجيات.",
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
    stats_experts: "متدرب مكتمل",
    msg_title: "رسالتنا",
    vision_title: "رؤيتنا",
    join_team: "انضم لفريقنا",
    upload_cv: "ارفع سيرتك الذاتية (PDF/DOC)",
    submit: "بدء المهمة",
    apply: "إرسال الطلب",
    pricing: "حاسبة التسعير",
    lets_build: "جاهز لبدء",
    lets_build_accent: "مسارك الخاص؟",
    lets_build_sub: "دعنا نتحدث عن كيف يمكن لمنطق أن يساعد في نقل عملك إلى المستوى التالي.",
    explore_more: "استكشف المزيد",
    participated: "شاركنا في",
    mantiq_on_land: "منطق على أرض الواقع",
    name_placeholder: "اسمك",
    company_placeholder: "اسم الشركة",
    email_placeholder: "البريد الإلكتروني",
    phone_placeholder: "رقم الهاتف",
    select_service: "الموضوع (اختر المجال)",
    sending: "تحليل البيانات...",
    mission_received: "تم قبول المهمة",
    mission_desc: "رؤيتك الآن ضمن اهتماماتنا. سيتواصل معك فريقنا الاستراتيجي خلال ٢٤ ساعة لمناقشة التفاصيل.",
    rights: "جميع الحقوق محفوظة.",
    career_msg: "نحن دائماً نبحث عن العقول المبدعة. أرسل لنا بياناتك.",
    learn_more: "تعرف علينا",
    our_impact: "تأثيرنا",
    numbers_matter: "أرقام تهمنا",
    trusted_by: "موثوق بنا من قبل"
  }
};

const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setHasStarted(true);
      }
    }, { threshold: 0.1 });

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = parseInt(target);
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return <span ref={elementRef}>{count}</span>;
};

const Nav = ({ lang, setLang, theme, setTheme, onNavigate, activeSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  return (
    <>
      <nav className="fixed w-full z-[100] border-b border-slate-200/10 bg-[#0a1628]/70 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="h-8 md:h-10 text-sky-400">
              <svg className="h-full w-auto" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="200" cy="200" r="150" />
                  <path d="M320,430 C270,430 200,400 200,320 L200,140 M140,200 L200,140 L260,200" />
                </g>
              </svg>
            </div>
            <span className="text-lg md:text-xl font-black uppercase tracking-widest text-white transition-all group-hover:tracking-[0.2em] font-syne">
              MANTI<span className="text-sky-400">Q</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            {['about', 'services', 'events'].map(item => (
              <button 
                key={item}
                onClick={() => onNavigate(item)}
                className={`relative py-2 hover:text-white transition-colors ${activeSection === item ? 'text-white' : ''}`}
              >
                {t[item === 'about' ? 'about_us' : item]}
              </button>
            ))}
            <div className="flex items-center gap-4 pl-8 border-l border-white/10 rtl:pl-0 rtl:pr-8 rtl:border-r rtl:border-l-0">
              <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center font-black text-white hover:bg-sky-500/20 transition-all">
                {lang === 'en' ? 'AR' : 'EN'}
              </button>
              <button onClick={() => onNavigate('contact')} className="bg-[#1a5cff] text-white px-6 py-2.5 rounded-full hover:bg-sky-400 shadow-lg shadow-blue-500/20 active:scale-95 transition-all font-bold">
                {t.get_started}
              </button>
            </div>
          </div>

          <button className="lg:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[150] bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity duration-500 ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileOpen(false)} />

      <div className={`fixed top-0 bottom-0 z-[200] lg:hidden w-[280px] bg-[#0a1628] shadow-[0_0_50px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-in-out ${lang === 'ar' ? 'left-0 ' + (mobileOpen ? 'translate-x-0' : '-translate-x-full') : 'right-0 ' + (mobileOpen ? 'translate-x-0' : 'translate-x-full')}`}>
        <div className="flex flex-col h-full p-6 pt-20 text-white">
          <div className="flex flex-col gap-4 text-xl font-black uppercase tracking-widest font-syne">
            {['home', 'about', 'services', 'events', 'contact'].map((item, idx) => (
              <button key={item} style={{ transitionDelay: `${idx * 50}ms` }} onClick={() => { onNavigate(item); setMobileOpen(false); }} className={`text-left hover:text-sky-400 transition-all py-2 border-b border-white/5 ${mobileOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>{t[item === 'about' ? 'about_us' : item] || item}</button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Section = ({ id, children, className }) => (
  <section id={id} className={`pt-20 pb-12 md:pt-32 md:pb-20 px-4 md:px-20 ${className}`}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const ServiceCard = ({ service, lang, index }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div 
      className="group reveal relative bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-700 shadow-sm hover:shadow-2xl hover:border-sky-400/30 flex flex-col h-full transform hover:-translate-y-2" 
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="h-40 md:h-56 relative overflow-hidden">
        <img src={service.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt={service.title[lang]} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] to-transparent opacity-60" />
        <div className="absolute top-4 right-6 font-syne text-5xl font-black text-white/10 leading-none">
          {service.num}
        </div>
        <div className={`absolute bottom-4 left-4 md:bottom-6 md:left-6 w-12 h-12 md:w-16 md:h-16 rounded-xl backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${service.bgColor} ${service.color} border border-white/20 shadow-xl`}>
          {service.icon}
        </div>
      </div>

      <div className="p-6 md:p-10 pt-6 md:pt-8 flex flex-col flex-1">
        <h3 className="text-xl md:text-2xl font-black mb-3 text-white group-hover:text-sky-400 transition-colors tracking-tight font-syne">
          {service.title[lang]}
        </h3>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-8 font-medium">
          {service.desc[lang]}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {service.features[lang].map((f, i) => (
            <span key={i} className="text-[10px] font-bold px-3 py-1 bg-sky-400/10 border border-sky-400/20 text-sky-400 rounded-full uppercase tracking-widest">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeSection, setActiveSection] = useState('home');
  const [showCareers, setShowCareers] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const t = TRANSLATIONS[lang];
  const scriptURL = "https://script.google.com/macros/s/AKfycbyqSvxZ8nzURA776SWa-ccrTtO0xmp4-X7z1B64Kzc6SljwfkDE-3W2J5yTngjcZIxpfw/exec"; 

  useScrollReveal();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const glow = document.getElementById('cursor-glow');
      if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      await fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
      setFormStatus('success');
      e.target.reset();
      setTimeout(() => setFormStatus(null), 10000);
    } catch (error) {
      setFormStatus(null);
    }
  };

  return (
    <div className={`dark bg-[#0a1628] text-white selection:bg-sky-400 selection:text-white ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      
      {/* Visual Infrastructure */}
      <div id="cursor-glow" className="cursor-glow" />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-1 opacity-20" />
        <div className="orb orb-2 opacity-15" />
        <div className="orb orb-3 opacity-10" />
      </div>

      <Nav lang={lang} setLang={setLang} onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Hero Section */}
      <Section id="home" className="relative !min-h-screen flex flex-col justify-center items-center text-center">
        <div className="hero-tag animate-fade-in-up">
          {t.tag}
        </div>
        <h1 className="text-4xl md:text-8xl lg:text-[110px] font-black leading-[1.05] tracking-tighter mb-10 font-syne animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          {t.hero_title_1} <br />
          <span className="text-sky-400">{t.hero_title_2}</span>
        </h1>
        <p className="max-w-2xl text-slate-400 text-lg md:text-xl font-light mb-12 animate-fade-in-up px-4" style={{ animationDelay: '300ms' }}>
          {t.hero_desc}
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '450ms' }}>
          <button onClick={() => scrollToSection('services')} className="btn-primary">
            {t.services}
          </button>
          <button onClick={() => scrollToSection('about')} className="btn-ghost">
            {t.learn_more}
          </button>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-20 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-black text-sky-400 font-syne"><AnimatedCounter target="210" /></div>
            <div className="text-[9px] uppercase tracking-widest text-slate-500 mt-2 font-bold">{t.stats_serv}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-black text-sky-400 font-syne"><AnimatedCounter target="18" /></div>
            <div className="text-[9px] uppercase tracking-widest text-slate-500 mt-2 font-bold">{t.stats_proj}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-black text-sky-400 font-syne"><AnimatedCounter target="14" /></div>
            <div className="text-[9px] uppercase tracking-widest text-slate-500 mt-2 font-bold">{t.stats_vent}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-black text-sky-400 font-syne"><AnimatedCounter target="25" />+</div>
            <div className="text-[9px] uppercase tracking-widest text-slate-500 mt-2 font-bold">{t.stats_experts}</div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.2em] text-slate-500 uppercase font-bold">
          <div className="w-px h-12 bg-gradient-to-b from-sky-400 to-transparent animate-pulse" />
          Scroll
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="reveal">
          <span className="text-sky-400 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">{lang === 'en' ? 'Who We Are' : 'من نحن'}</span>
          <h2 className="text-4xl md:text-7xl font-black font-syne tracking-tighter leading-none mb-8">
            Inspiring <br />
            <span className="text-sky-400">Innovation</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed font-light mb-10 max-w-lg">
            {lang === 'en' 
              ? 'MANTIQ is a business service hub dedicated to helping you start or grow your business. We combine strategy, technology, and creativity to take your venture to the next level.'
              : 'منطق هو مركز لخدمات الأعمال مخصص لمساعدتك في بدء أو تطوير عملك. نحن نجمع بين الاستراتيجية والتكنولوجيا والإبداع لنقل مشروعك إلى المستوى التالي.'}
          </p>
          <button onClick={() => scrollToSection('contact')} className="btn-primary">{lang === 'en' ? 'Work With Us' : 'اعمل معنا'}</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal" style={{ transitionDelay: '200ms' }}>
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-sky-400/50 transition-all group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
            <h4 className="font-syne font-bold mb-2">Launch Ready</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Idea to execution support for new ventures.</p>
          </div>
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-sky-400/50 transition-all group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">📈</div>
            <h4 className="font-syne font-bold mb-2">Growth Focus</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Scaling tools to reach untapped markets.</p>
          </div>
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-sky-400/50 transition-all group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
            <h4 className="font-syne font-bold mb-2">Empowerment</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Helping young minds build their future.</p>
          </div>
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-sky-400/50 transition-all group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🤝</div>
            <h4 className="font-syne font-bold mb-2">Partnership</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Results-driven long-term relationships.</p>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services">
        <div className="text-center mb-16 md:mb-24 reveal">
          <span className="text-sky-400 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">{lang === 'en' ? 'What We Offer' : 'ماذا نقدم'}</span>
          <h2 className="text-4xl md:text-6xl font-black font-syne tracking-tighter uppercase leading-none mb-6">Our Services</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-light">Four core pillars designed to cover every dimension of your business journey.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
          {Object.values(SERVICE_DATA).map((service, idx) => (
            <ServiceCard key={service.id} service={service} lang={lang} index={idx} />
          ))}
        </div>
      </Section>

      {/* Impact Row */}
      <section className="bg-gradient-to-br from-[#1a5cff] via-[#0a3a99] to-[#0a1628] py-24 px-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(58,176,240,0.3),transparent_70%)]" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
           {[
             { val: '210', label: t.stats_serv },
             { val: '18', label: t.stats_proj },
             { val: '14', label: t.stats_vent },
             { val: '25', label: t.stats_experts, plus: true }
           ].map((item, i) => (
             <div key={i} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
               <div className="text-6xl md:text-8xl font-black font-syne text-white leading-none">
                 <AnimatedCounter target={item.val} />{item.plus && <span className="text-sky-400 text-4xl font-light">+</span>}
               </div>
               <div className="text-xs uppercase tracking-[0.3em] font-bold text-white/70 mt-4">{item.label}</div>
             </div>
           ))}
        </div>
      </section>

      {/* Marquee */}
      <Section id="clients" className="overflow-hidden">
        <div className="text-center mb-16 reveal">
          <span className="text-sky-400 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">{t.trusted_by}</span>
          <h2 className="text-4xl md:text-5xl font-black font-syne tracking-tighter uppercase leading-none">Our Partners</h2>
        </div>
        <div className="marquee-wrap">
          <div className="marquee flex items-center gap-12 whitespace-nowrap">
            {[...CUSTOMERS, ...CUSTOMERS].map((c, i) => (
              <span key={i} className="text-xl md:text-2xl font-black font-syne uppercase text-slate-500 hover:text-sky-400 transition-colors cursor-default border border-white/10 px-8 py-3 rounded-full bg-white/5">
                {c}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="grid lg:grid-cols-2 gap-20 bg-[#112244]/50 rounded-[3rem] md:rounded-[5rem] overflow-hidden my-20 p-12 md:p-24 border border-white/5">
        <div className="reveal">
          <span className="text-sky-400 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Get In Touch</span>
          <h2 className="text-4xl md:text-7xl font-black font-syne tracking-tighter leading-none mb-8">
            {t.lets_build} <br />
            <span className="text-sky-400">{t.lets_build_accent}</span>
          </h2>
          <p className="text-slate-400 text-lg font-light mb-12">{t.lets_build_sub}</p>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-xl">✉️</div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</div>
                <div className="text-lg font-medium">Mantiq2023@gmail.com</div>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-xl">📍</div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Based In</div>
                <div className="text-lg font-medium">Suez, Egypt</div>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: '200ms' }}>
          {formStatus === 'success' ? (
            <div className="p-12 bg-sky-400/10 border border-sky-400/20 rounded-[2.5rem] text-center">
               <div className="text-4xl mb-6">✅</div>
               <h3 className="text-2xl font-black font-syne mb-4">{t.mission_received}</h3>
               <p className="text-slate-400 text-sm leading-relaxed">{t.mission_desc}</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={(e) => handleFormSubmit(e, 'Leads')}>
              <input required name="name" type="text" placeholder={t.name_placeholder} className="contact-input" />
              <input required name="email" type="email" placeholder={t.email_placeholder} className="contact-input" />
              <select name="service" className="contact-input">
                <option value="">{t.select_service}</option>
                {Object.values(SERVICE_DATA).map(s => <option key={s.id} value={s.id}>{s.title[lang]}</option>)}
              </select>
              <textarea name="msg" rows="5" placeholder="Tell us about your project..." className="contact-input resize-none" />
              <button disabled={formStatus === 'sending'} className="btn-primary w-full justify-center">
                {formStatus === 'sending' ? t.sending : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </Section>

      <footer className="p-12 md:p-16 border-t border-white/5 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black font-syne">MANTI<span className="text-sky-400">Q</span></div>
          <div className="text-xs text-slate-500 font-bold tracking-widest uppercase">© 2026 MANTIQ. {t.rights}</div>
          <div className="flex gap-6">
             <a href="https://www.facebook.com/mantiiq" target="_blank" className="text-slate-400 hover:text-sky-400 transition-colors"><Facebook /></a>
             <a href="https://www.linkedin.com/company/mantiq.services" target="_blank" className="text-slate-400 hover:text-sky-400 transition-colors"><Linkedin /></a>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500;700&family=Noto+Sans+Arabic:wght@300;400;700;900&display=swap');
        
        body { background: #0a1628; color: white; overflow-x: hidden; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-arabic { font-family: 'Noto Sans Arabic', sans-serif; }

        .cursor-glow {
          position: fixed; width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(58,176,240,0.08) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%);
        }

        .grid-bg {
          background-image: 
            linear-gradient(rgba(58,176,240,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(58,176,240,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .orb { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(58,176,240,0.4) 0%, transparent 70%); animation: float 10s infinite alternate; }
        .orb-1 { width: 600px; height: 600px; top: -100px; left: -100px; }
        .orb-2 { width: 400px; height: 400px; bottom: 100px; right: -50px; background: radial-gradient(circle, rgba(26,92,255,0.3) 0%, transparent 70%); }
        .orb-3 { width: 300px; height: 300px; top: 40%; right: 20%; animation-duration: 15s; }

        @keyframes float { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(30px, 40px) scale(1.05); } }

        .btn-primary { 
          @apply bg-[#1a5cff] text-white px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-sky-400 transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center gap-2;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-ghost {
          @apply border border-white/20 bg-transparent text-white px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:border-sky-400 transition-all active:scale-95;
          font-family: 'DM Sans', sans-serif;
        }

        .contact-input {
          @apply w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-sky-400 transition-all text-white placeholder:text-slate-600;
        }

        .reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-visible { opacity: 1; transform: translateY(0); }

        .hero-tag {
          @apply inline-block bg-sky-400/10 border border-sky-400/30 text-sky-400 text-[9px] font-bold uppercase tracking-[0.3em] px-5 py-2 rounded-full mb-8;
        }

        .marquee-wrap { @apply overflow-hidden mt-12; }
        .marquee { animation: marquee 30s linear infinite; width: max-content; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
