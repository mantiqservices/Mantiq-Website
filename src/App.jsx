import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Menu, X, Sun, Moon, ArrowRight, ArrowLeft, Globe, 
  Layout, Smartphone, BarChart3, Binary, Mail, 
  Linkedin, Facebook, CheckCircle2, ChevronRight, 
  Target, Eye, Zap, Shield, Users, Trophy, Calculator, Upload, Sparkles,
  Phone, MapPin, Briefcase, Lightbulb, Rocket, ChevronDown
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
    tag: "Intelligence in Business",
    hero_title: "The Path You Should Take",
    hero_desc: "We deliver modern digital infrastructure and strategic consultancy to help businesses scale with intelligence.",
    get_started: "Get Started",
    about_us: "About Us",
    services: "Our Services",
    services_headline_1: "Strategic",
    services_headline_2: "Solutions",
    events: "Events",
    careers: "Careers",
    contact: "Contact",
    partners: "Our Trusted Partners",
    some_customers: "Some of our customers",
    stats_serv: "Completed Services",
    stats_proj: "Managed Projects",
    stats_vent: "Launched Ventures",
    stats_experts: "Expert Partners",
    msg_title: "Our Mission",
    vision_title: "Our Vision",
    join_team: "Join Our Team",
    submit: "Initiate Project",
    apply: "Send Application",
    pricing: "Pricing Calculator",
    lets_build: "Let's Build.",
    contact_desc: "Ready to transform your vision into reality? Fill out the form and our strategy team will reach out.",
    explore_more: "Explore More",
    participated: "Involved In",
    mantiq_on_land: "Mantiq On Land",
    name_placeholder: "Full Name",
    company_placeholder: "Organization",
    email_placeholder: "Email Address",
    phone_placeholder: "Phone Number",
    select_service: "Select Service",
    sending: "Syncing coordinates...",
    mission_received: "Project Logged",
    mission_desc: "We have received your brief. A consultant will contact you within one business day.",
    rights: "ALL RIGHTS RESERVED.",
    career_msg: "We're looking for architects of the future. Help us redefine intelligence in business.",
    values_title: "Our DNA",
    val_1: "Inherent Innovation",
    val_2: "Data Integrity",
    val_3: "Human-First Tech"
  },
  ar: {
    logo: "منطق",
    tag: "الذكاء في الأعمال",
    hero_title: "المسار الذي يجب أن تسلكه",
    hero_desc: "نحن نقدم بنية تحتية رقمية حديثة واستشارات استراتيجية لمساعدة الشركات على التوسع بذكاء.",
    get_started: "ابدأ الآن",
    about_us: "من نحن",
    services: "خدماتنا",
    services_headline_1: "خدماتنا",
    services_headline_2: "",
    events: "الفعاليات",
    careers: "فرص العمل",
    contact: "اتصل بنا",
    partners: "شركاؤنا الموثوقون",
    some_customers: "بعض من عملائنا",
    stats_serv: "خدمة مكتملة",
    stats_proj: "مشروع مدار",
    stats_vent: "مشروع انطلق",
    stats_experts: "خبير مشارك",
    msg_title: "رسالتنا",
    vision_title: "رؤيتنا",
    join_team: "انضم لفريقنا",
    submit: "بدء المشروع",
    apply: "إرسال الطلب",
    pricing: "حاسبة التسعير",
    lets_build: "فلنبنِ معاً.",
    contact_desc: "جاهز لتحويل رؤيتك إلى حقيقة؟ املأ النموذج وسيتواصل معك فريقنا الاستراتيجي.",
    explore_more: "استكشف المزيد",
    participated: "شاركنا في",
    mantiq_on_land: "منطق على أرض الواقع",
    name_placeholder: "الاسم الكامل",
    company_placeholder: "الشركة / المؤسسة",
    email_placeholder: "البريد الإلكتروني",
    phone_placeholder: "رقم الهاتف",
    select_service: "اختر الخدمة",
    sending: "مزامنة البيانات...",
    mission_received: "تم تسجيل المشروع",
    mission_desc: "تلقينا طلبك. سيتواصل معك أحد مستشارينا خلال يوم عمل واحد.",
    rights: "جميع الحقوق محفوظة.",
    career_msg: "نبحث عن مهندسي المستقبل. ساعدنا في إعادة تعريف الذكاء في الأعمال.",
    values_title: "قيمنا الجوهرية",
    val_1: "الابتكار الأصيل",
    val_2: "نزاهة البيانات",
    val_3: "تكنولوجيا محورها الإنسان"
  }
};

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

// --- COMPONENTS ---

const FloatingInput = ({ label, name, type = "text", required = false, lang }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const isArabic = lang === 'ar';

  return (
    <div className="relative w-full group">
      <label 
        className={`absolute transition-all duration-300 pointer-events-none z-10 
          ${focused || value ? '-top-6 text-[10px] text-sky-500 font-bold uppercase tracking-widest' : 'top-4 text-base text-slate-400 font-medium'}
          ${isArabic ? 'right-0' : 'left-0'}`}
      >
        {label}
      </label>
      <input
        required={required}
        name={name}
        type={type}
        autoComplete="off"
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-transparent border-b-2 border-slate-100 dark:border-white/10 py-4 outline-none text-slate-900 dark:text-white relative z-0 transition-colors focus:border-transparent"
      />
      <div className={`absolute bottom-0 left-0 h-[2px] bg-sky-500 transition-all duration-500 ease-out z-20 ${focused ? 'w-full' : 'w-0'}`} />
    </div>
  );
};

const PremiumSelect = ({ label, name, options, lang, required = false }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const isArabic = lang === 'ar';

  return (
    <div className="relative w-full group">
      <label 
        className={`absolute transition-all duration-300 pointer-events-none z-10 
          ${focused || value ? '-top-6 text-[10px] text-sky-500 font-bold uppercase tracking-widest' : 'top-4 text-base text-slate-400 font-medium'}
          ${isArabic ? 'right-0' : 'left-0'}`}
      >
        {label}
      </label>
      <div className="relative">
        <select
          required={required}
          name={name}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-transparent border-b-2 border-slate-100 dark:border-white/10 py-4 outline-none text-slate-900 dark:text-white appearance-none relative z-10 cursor-pointer focus:border-transparent"
        >
          {/* Initial empty option to force an "empty" state on load */}
          <option value="" disabled hidden></option>
          {options.map((opt, i) => (
            <option key={i} value={opt.value} className="text-slate-900">{opt.label}</option>
          ))}
        </select>
        <ChevronDown 
          size={16} 
          className={`absolute top-5 pointer-events-none transition-transform duration-300 z-0 text-slate-400 ${focused ? 'rotate-180 text-sky-500' : ''} ${isArabic ? 'left-0' : 'right-0'}`} 
        />
      </div>
      <div className={`absolute bottom-0 left-0 h-[2px] bg-sky-500 transition-all duration-500 ease-out z-20 ${focused ? 'w-full' : 'w-0'}`} />
    </div>
  );
};

const Nav = ({ lang, setLang, theme, setTheme, onNavigate, activeSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  return (
    <>
      <nav className="fixed w-full z-[100] border-b border-slate-200 dark:border-white/5 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="h-8 md:h-10 text-sky-500 dark:text-sky-400 transform group-hover:rotate-12 transition-transform">
              <svg className="h-full w-auto" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="200" cy="200" r="150" />
                  <path d="M320,430 C270,430 200,400 200,320 L200,140 M140,200 L200,140 L260,200" />
                </g>
              </svg>
            </div>
            <span className="text-lg md:text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white">
              {t.logo}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {['about', 'services', 'events'].map(item => (
              <button 
                key={item}
                onClick={() => onNavigate(item)}
                className={`relative py-2 transition-colors duration-200 ${activeSection === item ? 'text-sky-500' : 'hover:text-slate-900 dark:hover:text-white'}`}
              >
                {t[item === 'about' ? 'about_us' : item]}
              </button>
            ))}
            <div className="flex items-center gap-6 pl-8 border-l border-slate-200 dark:border-white/10 rtl:pl-0 rtl:pr-8 rtl:border-r">
              <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="hover:text-sky-500 transition-colors">
                {lang === 'en' ? 'AR' : 'EN'}
              </button>
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="hover:text-sky-500 transition-colors">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={() => onNavigate('contact')} className="bg-sky-500 text-white px-8 py-3 rounded-full hover:bg-sky-600 shadow-xl shadow-sky-500/20 active:scale-95 transition-all font-bold">
                {t.get_started}
              </button>
            </div>
          </div>

          <button className="lg:hidden text-slate-900 dark:text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[150] bg-slate-950/40 backdrop-blur-md lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileOpen(false)} />

      <div className={`fixed top-0 bottom-0 z-[200] lg:hidden w-[300px] bg-white dark:bg-slate-950 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${lang === 'ar' ? 'left-0 ' + (mobileOpen ? 'translate-x-0' : '-translate-x-full') : 'right-0 ' + (mobileOpen ? 'translate-x-0' : 'translate-x-full')}`}>
        <div className="flex flex-col h-full p-8 pt-24 text-slate-900 dark:text-white">
          <div className="flex flex-col gap-6 text-2xl font-black uppercase tracking-tighter">
            {['home', 'about', 'services', 'events', 'contact'].map((item) => (
              <button key={item} onClick={() => { onNavigate(item); setMobileOpen(false); }} className="text-left py-2 border-b border-slate-100 dark:border-white/5">{t[item === 'about' ? 'about_us' : item] || item}</button>
            ))}
          </div>
          
          <div className="mt-auto space-y-4">
            <button onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setMobileOpen(false); }} className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl font-bold uppercase tracking-widest text-[10px]">
              <span>{lang === 'en' ? 'Switch to Arabic' : 'تفعيل اللغة العربية'}</span>
              <Globe size={16} className="text-sky-500" />
            </button>
            <button onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setMobileOpen(false); }} className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl font-bold uppercase tracking-widest text-[10px]">
              <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
              {theme === 'dark' ? <Sun size={16} className="text-orange-400" /> : <Moon size={16} className="text-indigo-400" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Section = ({ id, children, className }) => (
  <section id={id} className={`pt-24 pb-16 md:pt-40 md:pb-24 px-6 ${className}`}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const PartnerMarquee = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="w-full py-12">
      <div className="text-center mb-10 reveal">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-400 dark:text-slate-500">
          {t.some_customers}
        </h3>
      </div>
      <div className="overflow-hidden relative after:absolute after:inset-y-0 after:right-0 after:w-20 after:bg-gradient-to-l after:from-white dark:after:from-slate-950 after:to-transparent before:absolute before:inset-y-0 before:left-0 before:w-20 before:bg-gradient-to-r before:from-white dark:before:from-slate-950 before:to-transparent">
        <div className={`flex gap-10 animate-marquee whitespace-nowrap w-max py-4 ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
          {[...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS].map((name, i) => (
            <span key={i} className="text-xs md:text-sm font-bold uppercase tracking-widest px-8 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-full hover:border-sky-500/50 transition-colors">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ service, lang, index }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div 
      className="group reveal relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[3rem] overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" 
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="h-64 relative overflow-hidden">
        <img src={service.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={service.title[lang]} />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-white/40 dark:via-slate-900/40 to-transparent" />
        <div className={`absolute bottom-6 left-8 w-14 h-14 rounded-2xl ${service.bgColor} ${service.color} flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl`}>
          {service.icon}
        </div>
      </div>
      <div className="p-8 md:p-12 flex flex-col h-full">
        <h3 className="text-2xl md:text-3xl font-black mb-4 group-hover:text-sky-500 transition-colors">{service.title[lang]}</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium">{service.desc[lang]}</p>
        <div className="mt-auto pt-8 border-t border-slate-50 dark:border-white/5 grid grid-cols-2 gap-4">
          {service.features[lang].slice(0, 4).map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{f}</span>
            </div>
          ))}
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
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'events', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    } catch (error) { setFormStatus(null); }
  };

  return (
    <div className={`${theme} ${lang === 'ar' ? 'font-arabic' : 'font-sans'} selection:bg-sky-500 selection:text-white`}>
      <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-500">
        
        {/* Modern Interactive Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-sky-500/5 blur-[120px] rounded-full animate-mesh-blob" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full animate-mesh-blob-reverse" />
          <div className="absolute inset-0 opacity-[0.03] bg-square-grid text-slate-900 dark:text-white" />
        </div>

        <Nav lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onNavigate={scrollToSection} activeSection={activeSection} />

        {/* HERO */}
        <Section id="home" className="flex flex-col justify-center items-center text-center !min-h-screen">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 mb-8 animate-fade-in-up">
            <div className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">{t.tag}</span>
          </div>
          <h1 className="text-4xl sm:text-7xl md:text-9xl font-black leading-[1] tracking-tighter mb-10 animate-fade-in-up">
            <span className="block">{lang === 'en' ? 'The Path' : 'المسار'}</span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 italic">{lang === 'en' ? 'You Should Take' : 'الذي يجب سلوكه'}</span>
          </h1>
          <p className="max-w-2xl mx-auto mb-12 text-lg sm:text-xl md:text-2xl text-slate-500 leading-relaxed font-medium animate-fade-in-up" style={{ animationDelay: '200ms' }}>{t.hero_desc}</p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <button onClick={() => scrollToSection('services')} className="px-12 py-5 bg-sky-500 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-sky-600 shadow-2xl shadow-sky-500/30 active:scale-95 transition-all flex items-center gap-4">{t.services} <ArrowRight size={18} className="rtl:rotate-180" /></button>
            <button onClick={() => scrollToSection('about')} className="px-12 py-5 border border-slate-200 dark:border-white/10 rounded-full font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 transition-all">{t.about_us}</button>
          </div>
        </Section>

        {/* ABOUT */}
        <Section id="about">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12 reveal">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">{t.about_us}</h2>
                <div className="h-2 w-32 bg-sky-500" />
              </div>
              <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium">{lang === 'en' ? 'Mantiq bridges the gap between traditional business wisdom and modern digital excellence, empowering enterprises to lead with data.' : 'تعمل منطق كجسر يربط بين حكمة الأعمال التقليدية والتميز الرقمي الحديث، لتمكين المؤسسات من القيادة بالبيانات.'}</p>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-10 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/5">
                  <Target className="text-sky-500 mb-6 size-10" />
                  <h3 className="text-xl font-bold mb-4">{t.msg_title}</h3>
                  <p className="text-sm text-slate-500">{lang === 'en' ? 'Transforming business operations through intelligent automation.' : 'تحويل عمليات الأعمال من خلال الأتمتة الذكية.'}</p>
                </div>
                <div className="p-10 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/5">
                  <Eye className="text-indigo-500 mb-6 size-10" />
                  <h3 className="text-xl font-bold mb-4">{t.vision_title}</h3>
                  <p className="text-sm text-slate-500">{lang === 'en' ? 'To be the standard of technological integrity in the MENA region.' : 'أن نكون المعيار للنزاهة التكنولوجية في منطقة الشرق الأوسط.'}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[{ count: '210+', label: t.stats_serv, icon: <Zap /> }, { count: '18+', label: t.stats_proj, icon: <Binary /> }, { count: '14', label: t.stats_vent, icon: <Trophy /> }, { count: '25+', label: t.stats_experts, icon: <Users /> }].map((stat, i) => (
                <div key={i} className="p-12 bg-white dark:bg-slate-900 rounded-[3rem] text-center space-y-4 border border-slate-100 dark:border-white/5 reveal shadow-lg shadow-slate-100/50 dark:shadow-none" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="mx-auto w-14 h-14 flex items-center justify-center text-sky-500 bg-sky-500/10 rounded-2xl">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-black">{stat.count}</div>
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* SERVICES */}
        <Section id="services" className="bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="text-center mb-24 space-y-6 reveal">
            <span className="text-sky-500 font-bold uppercase tracking-[0.4em] text-sm">{t.services}</span>
            <h2 className="text-5xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85]">
              {t.services_headline_1} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">{t.services_headline_2}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {Object.values(SERVICE_DATA).map((service, idx) => (
              <ServiceCard key={service.id} service={service} lang={lang} index={idx} />
            ))}
          </div>
        </Section>

        {/* EVENTS */}
        <Section id="events">
          <div className="space-y-6 mb-16 reveal text-center md:text-center">
            <span className="text-sky-500 font-bold uppercase tracking-[0.4em] text-sm">{t.participated}</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">{t.mantiq_on_land}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EVENTS.map((event, idx) => (
              <div key={event.id} className="group reveal relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl transform-gpu transition-all duration-700" style={{ transitionDelay: `${idx * 150}ms` }}>
                <img src={event.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={event.title[lang]} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-10 w-full text-center">
                  <span className="text-xs font-bold text-sky-400 mb-4 block tracking-[0.3em] uppercase">{event.date}</span>
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">{event.title[lang]}</h3>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" className="bg-slate-50 dark:bg-white/[0.01]">
          <div className="max-w-6xl mx-auto reveal">
            <div className="grid lg:grid-cols-5 gap-0 rounded-[4rem] overflow-hidden shadow-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5">
              
              <div className="lg:col-span-2 p-12 md:p-20 bg-sky-500 dark:bg-slate-800 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">{t.lets_build}</h2>
                  <p className="text-lg opacity-80 leading-relaxed max-w-xs">{t.contact_desc}</p>
                </div>
                <div className="space-y-8 relative z-10 mt-20">
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform"><Mail size={20} /></div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Email Us</p>
                      <p className="font-bold">hello@mantiq.services</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform"><Phone size={20} /></div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Call Us</p>
                      <p className="font-bold">+20 100 1234 567</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 p-12 md:p-20 flex flex-col justify-center">
                {formStatus === 'success' ? (
                  <div className="text-center space-y-8 flex flex-col items-center py-10 animate-fade-in">
                    <div className="w-24 h-24 bg-sky-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl"><CheckCircle2 size={48} className="text-white" /></div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white">{t.mission_received}</h2>
                    <p className="text-lg text-slate-500 max-w-sm mx-auto">{t.mission_desc}</p>
                  </div>
                ) : (
                  <form className="space-y-10" onSubmit={(e) => handleFormSubmit(e, 'Leads')}>
                    <div className="grid sm:grid-cols-2 gap-12">
                      <FloatingInput label={t.name_placeholder} name="name" required lang={lang} />
                      <FloatingInput label={t.company_placeholder} name="company" lang={lang} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-12">
                      <FloatingInput label={t.email_placeholder} name="email" type="email" required lang={lang} />
                      <FloatingInput label={t.phone_placeholder} name="phone" type="tel" required lang={lang} />
                    </div>
                    <PremiumSelect 
                      label={t.select_service} 
                      name="service" 
                      required
                      lang={lang}
                      options={Object.values(SERVICE_DATA).map(s => ({ value: s.id, label: s.title[lang] }))}
                    />
                    <button disabled={formStatus === 'sending'} className="group w-full py-6 bg-slate-950 dark:bg-sky-500 text-white font-black uppercase tracking-[0.3em] rounded-3xl hover:bg-slate-800 dark:hover:bg-sky-400 transition-all disabled:opacity-50 flex items-center justify-center gap-4 text-sm shadow-xl">
                      {formStatus === 'sending' ? <Sparkles size={20} className="animate-spin" /> : <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform rtl:rotate-180" />}
                      {formStatus === 'sending' ? t.sending : t.submit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Section>

        {/* FOOTER */}
        <footer className="pt-20 pb-16 px-6 border-t border-slate-100 dark:border-white/5 reveal">
          <PartnerMarquee lang={lang} />
          <div className="max-w-7xl mx-auto mt-20 flex flex-col items-center gap-12">
            <div className="flex gap-4">
              {[Facebook, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-500 hover:bg-sky-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm"><Icon size={22} /></a>
              ))}
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-wrap justify-center gap-10">
                <a href="https://mantiq-pricing.vercel.app/" target="_blank" className="text-sky-500 font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-2"><Calculator size={14} /> {t.pricing}</a>
                <button onClick={() => setShowCareers(true)} className="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-sky-500 transition-colors flex items-center gap-2"><Users size={14} /> {t.careers}</button>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] text-center">© 2026 MANTIQ BUSINESS SERVICES. {t.rights}</p>
            </div>
          </div>
        </footer>
      </div>

      {/* PREMIUM CAREER MODAL */}
      {showCareers && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl animate-fade-in" onClick={() => setShowCareers(false)} />
          <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[3rem] md:rounded-[4rem] shadow-3xl overflow-hidden animate-zoom-in flex flex-col md:flex-row min-h-[500px]">
            
            <div className="hidden md:flex md:w-2/5 p-12 bg-sky-500 dark:bg-slate-800 text-white flex-col justify-between relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div>
                <Briefcase size={40} className="mb-8" />
                <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6">{t.join_team}</h2>
                <p className="text-lg opacity-80 leading-relaxed">{t.career_msg}</p>
              </div>
              <div className="space-y-6 mt-12">
                <p className="text-xs uppercase font-bold tracking-[0.3em] opacity-60 mb-4">{t.values_title}</p>
                <div className="flex items-center gap-4">
                  <Lightbulb size={18} className="text-white/80" />
                  <span className="font-bold text-sm">{t.val_1}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Target size={18} className="text-white/80" />
                  <span className="font-bold text-sm">{t.val_2}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Rocket size={18} className="text-white/80" />
                  <span className="font-bold text-sm">{t.val_3}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative bg-white dark:bg-slate-900">
              <button onClick={() => setShowCareers(false)} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 dark:bg-white/10 flex items-center justify-center hover:bg-slate-100 transition-colors dark:text-white"><X size={20} /></button>
              
              {formStatus === 'success' ? (
                <div className="text-center space-y-6 flex flex-col items-center py-10 animate-fade-in">
                  <div className="w-20 h-20 bg-sky-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl"><CheckCircle2 size={36} className="text-white" /></div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t.mission_received}</h2>
                  <p className="text-slate-500 dark:text-slate-400">Our HR team will review your profile shortly.</p>
                </div>
              ) : (
                <form className="space-y-10" onSubmit={(e) => handleFormSubmit(e, 'Work')}>
                  <div className="grid sm:grid-cols-2 gap-12">
                    <FloatingInput label={t.name_placeholder} name="name" required lang={lang} />
                    <FloatingInput label={t.email_placeholder} name="email" type="email" required lang={lang} />
                  </div>
                  <div className="relative">
                    <FloatingInput label="Portfolio / Resume Link" name="cv_link" type="url" lang={lang} />
                  </div>
                  <button disabled={formStatus === 'sending'} className="group w-full py-5 bg-slate-950 dark:bg-sky-500 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-slate-800 dark:hover:bg-sky-400 transition-all disabled:opacity-50 flex items-center justify-center gap-4 text-xs shadow-xl mt-4">
                    {formStatus === 'sending' ? <Sparkles size={16} className="animate-spin" /> : <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform rtl:rotate-180" />}
                    {formStatus === 'sending' ? t.sending : t.apply}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;700;900&family=Noto+Sans+Arabic:wght@100;400;700;900&display=swap');
        
        body { -webkit-user-select: none; user-select: none; scroll-behavior: smooth; overflow-x: hidden; }
        .font-sans { font-family: 'Outfit', sans-serif; }
        .font-arabic { font-family: 'Noto Sans Arabic', sans-serif; }
        
        @keyframes marquee { 
          0% { transform: translate3d(0,0,0); } 
          100% { transform: translate3d(-33.333%,0,0); } 
        }
        
        .animate-marquee { 
          animation: marquee 60s linear infinite; 
          will-change: transform;
        }

        @media (max-width: 768px) {
          .animate-marquee { animation-duration: 25s; }
        }

        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in-up { from { opacity: 0; transform: translate3d(0, 40px, 0); } to { opacity: 1; transform: translate3d(0,0,0); } }
        
        .reveal { opacity: 0; transform: translate3d(0, 50px, 0); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none; will-change: opacity, transform; }
        .reveal-visible { opacity: 1; transform: translate3d(0,0,0); pointer-events: auto; }
        
        .bg-square-grid { 
          background-image: linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px); 
          background-size: 60px 60px; 
        }

        .shadow-3xl { box-shadow: 0 50px 100px -20px rgba(0,0,0,0.1); }
        .dark .shadow-3xl { box-shadow: 0 50px 100px -20px rgba(0,0,0,0.5); }

        @keyframes mesh-blob { 
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); } 
          50% { transform: translate3d(5%, 5%, 0) scale(1.1); } 
        }
        .animate-mesh-blob { animation: mesh-blob 20s infinite ease-in-out; }
        .animate-mesh-blob-reverse { animation: mesh-blob 25s infinite reverse ease-in-out; }

        @keyframes zoom-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-zoom-in { animation: zoom-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }

        ::selection { background-color: #38bdf8; color: white; }
      `}</style>
    </div>
  );
}
