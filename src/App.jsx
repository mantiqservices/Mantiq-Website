import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Menu, X, Sun, Moon, ArrowRight, ArrowLeft, Globe, 
  Layout, Smartphone, BarChart3, Binary, Mail, 
  Linkedin, Facebook, CheckCircle2, ChevronRight, 
  Target, Eye, Zap, Shield, Users, Trophy, Calculator, Upload, Sparkles,
  Phone, MapPin, Briefcase, Lightbulb, Rocket, ChevronDown, Plus
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

const SERVICE_DATA = [
  {
    id: 'business',
    index: '01',
    icon: <BarChart3 className="w-6 h-6 md:w-8 md:h-8" />,
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/10',
    title: { en: "Business Development", ar: "تطوير الأعمال" },
    features: { 
      en: ["Strategic Planning", "B2B Leads", "Data Analytics", "Consultancy"], 
      ar: ["التخطيط الاستراتيجي", "توليد العملاء", "التحليلات", "الاستشارات"] 
    },
    desc: { 
      en: "We create strategic growth paths by identifying untapped market opportunities.",
      ar: "نحن نصمم مسارات نمو استراتيجية من خلال تحديد فرص السوق غير المستغلة."
    },
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
    gridClass: "lg:col-span-3 lg:row-span-1"
  },
  {
    id: 'tracking',
    index: '02',
    icon: <Binary className="w-6 h-6 md:w-8 md:h-8" />,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    title: { en: "Tracking Systems", ar: "أنظمة التتبع" },
    features: { 
      en: ["CRM Systems", "Finance Trackers", "HR Systems", "Flow Automation"], 
      ar: ["أنظمة CRM", "تتبع المالية", "الموارد البشرية", "أتمتة العمليات"] 
    },
    desc: {
      en: "Transform raw data into efficient digital systems with custom CRM and financial ecosystems.",
      ar: "حول بياناتك الخام إلى معلومات قابلة للتنفيذ عبر أنظمة CRM وتتبع مالي مخصصة."
    },
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    gridClass: "lg:col-span-2 lg:row-span-2"
  },
  {
    id: 'web',
    index: '03',
    icon: <Layout className="w-6 h-6 md:w-8 md:h-8" />,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    title: { en: "Websites", ar: "المواقع الإلكترونية" },
    features: { 
      en: ["E-commerce", "Company Profile", "Technical SEO", "Usability Design"], 
      ar: ["التجارة الإلكترونية", "تحسين محركات البحث", "موقع لعرض شركتك", "تصميم تجربة المستخدم"] 
    },
    desc: {
      en: "Design and develop performance-driven websites optimized for SEO and usability.",
      ar: "نحن نبني واجهات رقمية تعمل كأفضل بائع لديك، مصممة للأداء وقوة محركات البحث."
    },
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200",
    gridClass: "lg:col-span-3 lg:row-span-1"
  },
  {
    id: 'mobile',
    index: '04',
    icon: <Smartphone className="w-6 h-6 md:w-8 md:h-8" />,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    title: { en: "Mobile Apps", ar: "تطبيقات الموبايل" },
    features: { 
      en: ["UI/UX Design", "IOS & Android", "AI Integrations", "Payment Gateways"], 
      ar: ["تصميم واجهة المستخدم", "تكاملات الذكاء الاصطناعي", "دفع إلكتروني", "أنظمة iOS و Android"] 
    },
    desc: {
      en: "Native mobile experiences built for today’s mobile-first users with AI logic.",
      ar: "تجارب أصلية لمستخدمي الموبايل تدمج منطق الذكاء الاصطناعي وتجربة مستخدم سلسة."
    },
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200",
    gridClass: "lg:col-span-5 lg:row-span-1"
  }
];

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
          ${focused || value ? '-top-5 text-[9px] text-sky-500 font-bold uppercase tracking-widest' : 'top-3 text-sm md:text-base text-slate-400 font-medium'}
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
        className="w-full bg-transparent border-b border-slate-100 dark:border-white/10 py-3 outline-none text-slate-900 dark:text-white relative z-0 transition-colors focus:border-transparent text-sm"
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
          ${focused || value ? '-top-5 text-[9px] text-sky-500 font-bold uppercase tracking-widest' : 'top-3 text-sm md:text-base text-slate-400 font-medium'}
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
          className="w-full bg-transparent border-b border-slate-100 dark:border-white/10 py-3 outline-none text-slate-900 dark:text-white appearance-none relative z-10 cursor-pointer focus:border-transparent text-sm"
        >
          <option value="" disabled hidden></option>
          {options.map((opt, i) => (
            <option key={i} value={opt.value} className="text-slate-900">{opt.label}</option>
          ))}
        </select>
        <ChevronDown 
          size={14} 
          className={`absolute top-4 pointer-events-none transition-transform duration-300 z-0 text-slate-400 ${focused ? 'rotate-180 text-sky-500' : ''} ${isArabic ? 'left-0' : 'right-0'}`} 
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
        <div className="max-w-7xl mx-auto px-6 h-14 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="h-7 md:h-10 text-sky-500 dark:text-sky-400 transform group-hover:rotate-12 transition-transform">
              <svg className="h-full w-auto" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="200" cy="200" r="150" />
                  <path d="M320,430 C270,430 200,400 200,320 L200,140 M140,200 L200,140 L260,200" />
                </g>
              </svg>
            </div>
            <span className="text-base md:text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white">
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
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[150] bg-slate-950/40 backdrop-blur-md lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileOpen(false)} />

      <div className={`fixed top-0 bottom-0 z-[200] lg:hidden w-[280px] bg-white dark:bg-slate-950 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${lang === 'ar' ? 'left-0 ' + (mobileOpen ? 'translate-x-0' : '-translate-x-full') : 'right-0 ' + (mobileOpen ? 'translate-x-0' : 'translate-x-full')}`}>
        <div className="flex flex-col h-full p-6 pt-20 text-slate-900 dark:text-white">
          <div className="flex flex-col gap-5 text-xl font-black uppercase tracking-tighter">
            {['home', 'about', 'services', 'events', 'contact'].map((item) => (
              <button key={item} onClick={() => { onNavigate(item); setMobileOpen(false); }} className="text-left py-2 border-b border-slate-100 dark:border-white/5">{t[item === 'about' ? 'about_us' : item] || item}</button>
            ))}
          </div>
          
          <div className="mt-auto space-y-4">
            <button onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setMobileOpen(false); }} className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-2xl font-bold uppercase tracking-widest text-[9px]">
              <span>{lang === 'en' ? 'Switch to Arabic' : 'تفعيل اللغة العربية'}</span>
              <Globe size={14} className="text-sky-500" />
            </button>
            <button onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setMobileOpen(false); }} className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-2xl font-bold uppercase tracking-widest text-[9px]">
              <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
              {theme === 'dark' ? <Sun size={14} className="text-orange-400" /> : <Moon size={14} className="text-indigo-400" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Section = ({ id, children, className }) => (
  <section id={id} className={`pt-16 pb-12 md:pt-40 md:pb-24 px-6 ${className}`}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const PartnerMarquee = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="w-full py-8 md:py-12">
      <div className="text-center mb-8 md:mb-10 reveal">
        <h3 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-slate-400 dark:text-slate-500">
          {t.some_customers}
        </h3>
      </div>
      <div className="overflow-hidden relative after:absolute after:inset-y-0 after:right-0 after:w-12 md:after:w-20 after:bg-gradient-to-l after:from-white dark:after:from-slate-950 after:to-transparent before:absolute before:inset-y-0 before:left-0 before:w-12 md:before:w-20 before:bg-gradient-to-r before:from-white dark:before:from-slate-950 before:to-transparent">
        <div className={`flex gap-6 md:gap-10 animate-marquee whitespace-nowrap w-max py-2 md:py-4 ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
          {[...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS].map((name, i) => (
            <span key={i} className="text-[10px] md:text-sm font-bold uppercase tracking-widest px-6 py-3 md:px-8 md:py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-full hover:border-sky-500/50 transition-colors">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const FantasticServiceCard = ({ service, lang, index }) => {
  const t = TRANSLATIONS[lang];
  const isArabic = lang === 'ar';
  
  return (
    <div 
      className={`group reveal relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-slate-900 shadow-2xl transition-all duration-700 hover:shadow-sky-500/10 ${service.gridClass}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={service.img} 
          className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-125 group-hover:rotate-3 opacity-60 group-hover:opacity-40" 
          alt={service.title[lang]} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950" />
      </div>

      <div className={`absolute top-6 md:top-10 ${isArabic ? 'left-6 md:left-10' : 'right-6 md:right-10'} pointer-events-none select-none`}>
        <span className="text-5xl md:text-[10rem] font-black text-white/[0.03] italic tracking-tighter leading-none transition-all duration-700 group-hover:text-sky-500/[0.08] group-hover:scale-110 block">
          {service.index}
        </span>
      </div>

      <div className="relative z-10 flex flex-col h-full p-6 md:p-14 justify-between">
        <div className="flex justify-between items-start">
          <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${service.bgColor} ${service.color} flex items-center justify-center backdrop-blur-3xl border border-white/10 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 shadow-xl`}>
            {service.icon}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">{t.explore_more}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-20">
          <h3 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-[1.1] md:leading-[0.9] tracking-tighter transition-all duration-500 group-hover:text-sky-400">
            {service.title[lang]}
          </h3>
          
          <div className="max-h-0 md:max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 transition-all duration-700 ease-in-out overflow-hidden">
            <p className="text-sm md:text-lg text-slate-300 mb-6 md:mb-8 leading-relaxed font-medium">
              {service.desc[lang]}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
              {service.features[lang].map((f, i) => (
                <div key={i} className="flex items-center gap-2 animate-fade-in">
                  <Plus size={10} className="text-sky-500" />
                  <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-white/70">{f}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Aligned Arrow Container */}
          <div className={`flex mt-4 items-center justify-end ${isArabic ? 'flex-row-reverse' : 'flex-row'} translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500`}>
             <ArrowRight size={24} className={`text-sky-500 md:size-8 ${isArabic ? 'rotate-180' : ''}`} />
          </div>
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
        
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-sky-500/5 blur-[120px] rounded-full animate-mesh-blob" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full animate-mesh-blob-reverse" />
          <div className="absolute inset-0 opacity-[0.03] bg-square-grid text-slate-900 dark:text-white" />
        </div>

        <Nav lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onNavigate={scrollToSection} activeSection={activeSection} />

        {/* HERO */}
        <Section id="home" className="flex flex-col justify-center items-center text-center min-h-[90vh] md:min-h-screen">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 mb-6 animate-fade-in-up">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)] animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">{t.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-6xl md:text-9xl font-black leading-[1.1] tracking-tighter mb-8 animate-fade-in-up">
            <span className="block">{lang === 'en' ? 'The Path' : 'المسار'}</span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 italic">{lang === 'en' ? 'You Should Take' : 'الذي يجب سلوكه'}</span>
          </h1>
          <p className="max-w-xl mx-auto mb-10 text-base md:text-2xl text-slate-500 leading-relaxed font-medium animate-fade-in-up" style={{ animationDelay: '200ms' }}>{t.hero_desc}</p>
          
          {/* Centered Buttons Container */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up w-full" style={{ animationDelay: '400ms' }}>
            <button onClick={() => scrollToSection('services')} className="w-full sm:w-auto px-10 py-4 bg-sky-500 text-white rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:bg-sky-600 shadow-2xl shadow-sky-500/30 active:scale-95 transition-all flex items-center justify-center gap-3">
              {t.services} <ArrowRight size={16} className="rtl:rotate-180" />
            </button>
            <button onClick={() => scrollToSection('about')} className="w-full sm:w-auto px-10 py-4 border border-slate-200 dark:border-white/10 rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
              {t.about_us}
            </button>
          </div>
        </Section>

        {/* ABOUT */}
        <Section id="about">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-8 md:space-y-12 reveal">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase">{t.about_us}</h2>
                <div className="h-1.5 w-24 bg-sky-500" />
              </div>
              <p className="text-lg md:text-2xl text-slate-500 leading-relaxed font-medium">{lang === 'en' ? 'Mantiq bridges the gap between traditional business wisdom and modern digital excellence, empowering enterprises to lead with data.' : 'تعمل منطق كجسر يربط بين حكمة الأعمال التقليدية والتميز الرقمي الحديث، لتمكين المؤسسات من القيادة بالبيانات.'}</p>
              <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/5">
                  <Target className="text-sky-500 mb-4 size-8" />
                  <h3 className="text-lg font-bold mb-3">{t.msg_title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{lang === 'en' ? 'Transforming business operations through intelligent automation.' : 'تحويل عمليات الأعمال من خلال الأتمتة الذكية.'}</p>
                </div>
                <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/5">
                  <Eye className="text-indigo-500 mb-4 size-8" />
                  <h3 className="text-lg font-bold mb-3">{t.vision_title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{lang === 'en' ? 'To be the standard of technological integrity in the MENA region.' : 'أن نكون المعيار للنزاهة التكنولوجية في منطقة الشرق الأوسط.'}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[{ count: '210+', label: t.stats_serv, icon: <Zap /> }, { count: '18+', label: t.stats_proj, icon: <Binary /> }, { count: '14', label: t.stats_vent, icon: <Trophy /> }, { count: '25+', label: t.stats_experts, icon: <Users /> }].map((stat, i) => (
                <div key={i} className="p-8 md:p-12 bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[3rem] text-center space-y-3 border border-slate-100 dark:border-white/5 reveal shadow-lg shadow-slate-100/50 dark:shadow-none" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="mx-auto w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-sky-500 bg-sky-500/10 rounded-xl md:rounded-2xl">{stat.icon}</div>
                  <div className="text-2xl md:text-5xl font-black">{stat.count}</div>
                  <div className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* SERVICES */}
        <Section id="services" className="bg-slate-50/50 dark:bg-white/[0.02] relative overflow-hidden">
          <div className="text-center mb-16 md:mb-24 space-y-4 reveal relative z-10">
            <span className="text-sky-500 font-bold uppercase tracking-[0.4em] text-xs md:text-sm">{t.services}</span>
            <h2 className="text-4xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.85]">
              {t.services_headline_1} <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500">
                {t.services_headline_2}
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-2 gap-6 md:gap-10 auto-rows-[380px] md:auto-rows-[600px] relative z-10">
            {SERVICE_DATA.map((service, idx) => (
              <FantasticServiceCard key={service.id} service={service} lang={lang} index={idx} />
            ))}
          </div>
        </Section>

        {/* EVENTS */}
        <Section id="events">
          <div className="space-y-4 mb-12 reveal text-center">
            <span className="text-sky-500 font-bold uppercase tracking-[0.4em] text-xs md:text-sm">{t.participated}</span>
            <h2 className="text-3xl md:text-8xl font-black tracking-tighter uppercase">{t.mantiq_on_land}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {EVENTS.map((event, idx) => (
              <div key={event.id} className="group reveal relative h-[350px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl transform-gpu transition-all duration-700" style={{ transitionDelay: `${idx * 150}ms` }}>
                <img src={event.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={event.title[lang]} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full text-center">
                  <span className="text-[10px] font-bold text-sky-400 mb-3 block tracking-[0.2em] uppercase">{event.date}</span>
                  <h3 className="text-xl md:text-3xl font-black text-white leading-tight">{event.title[lang]}</h3>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" className="bg-slate-50 dark:bg-white/[0.01]">
          <div className="max-w-6xl mx-auto reveal">
            <div className="grid lg:grid-cols-5 gap-0 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5">
              
              <div className="lg:col-span-2 p-10 md:p-20 bg-sky-500 dark:bg-slate-800 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 md:mb-8 leading-none">{t.lets_build}</h2>
                  <p className="text-sm md:text-lg opacity-80 leading-relaxed max-w-xs">{t.contact_desc}</p>
                </div>
                <div className="space-y-6 md:space-y-8 relative z-10 mt-12 md:mt-20">
                  <div className="flex items-center gap-4 md:gap-6 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform"><Mail size={18} /></div>
                    <div>
                      <p className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-60">Email Us</p>
                      <p className="font-bold text-xs md:text-base">hello@mantiq.services</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 md:gap-6 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform"><Phone size={18} /></div>
                    <div>
                      <p className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-60">Call Us</p>
                      <p className="font-bold text-xs md:text-base">+20 100 1234 567</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 p-10 md:p-20 flex flex-col justify-center">
                {formStatus === 'success' ? (
                  <div className="text-center space-y-6 flex flex-col items-center py-10 animate-fade-in">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-sky-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl"><CheckCircle2 size={32} className="text-white" /></div>
                    <h2 className="text-2xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white">{t.mission_received}</h2>
                    <p className="text-sm md:text-lg text-slate-500 max-w-sm mx-auto">{t.mission_desc}</p>
                  </div>
                ) : (
                  <form className="space-y-8 md:space-y-10" onSubmit={(e) => handleFormSubmit(e, 'Leads')}>
                    <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
                      <FloatingInput label={t.name_placeholder} name="name" required lang={lang} />
                      <FloatingInput label={t.company_placeholder} name="company" lang={lang} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
                      <FloatingInput label={t.email_placeholder} name="email" type="email" required lang={lang} />
                      <FloatingInput label={t.phone_placeholder} name="phone" type="tel" required lang={lang} />
                    </div>
                    <PremiumSelect 
                      label={t.select_service} 
                      name="service" 
                      required
                      lang={lang}
                      options={SERVICE_DATA.map(s => ({ value: s.id, label: s.title[lang] }))}
                    />
                    <button disabled={formStatus === 'sending'} className="group w-full py-5 md:py-6 bg-slate-950 dark:bg-sky-500 text-white font-black uppercase tracking-[0.2em] md:tracking-[0.3em] rounded-2xl md:rounded-3xl hover:bg-slate-800 dark:hover:bg-sky-400 transition-all disabled:opacity-50 flex items-center justify-center gap-3 md:gap-4 text-xs shadow-xl">
                      {formStatus === 'sending' ? <Sparkles size={16} className="animate-spin" /> : <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform rtl:rotate-180" />}
                      {formStatus === 'sending' ? t.sending : t.submit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Section>

        {/* FOOTER */}
        <footer className="pt-12 pb-10 md:pt-20 md:pb-16 px-6 border-t border-slate-100 dark:border-white/5 reveal">
          <PartnerMarquee lang={lang} />
          <div className="max-w-7xl mx-auto mt-12 md:mt-20 flex flex-col items-center gap-8 md:gap-12">
            <div className="flex gap-4 md:gap-6">
              {[Facebook, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-xl md:rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-500 hover:bg-sky-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm"><Icon size={18} /></a>
              ))}
            </div>
            <div className="flex flex-col items-center gap-4 md:gap-6">
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                <a href="https://mantiq-pricing.vercel.app/" target="_blank" className="text-sky-500 font-bold text-[10px] md:text-xs uppercase tracking-widest hover:underline flex items-center gap-2"><Calculator size={12} /> {t.pricing}</a>
                <button onClick={() => setShowCareers(true)} className="text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest hover:text-sky-500 transition-colors flex items-center gap-2"><Users size={12} /> {t.careers}</button>
              </div>
              <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] md:tracking-[0.5em] text-center">© 2026 MANTIQ BUSINESS SERVICES. {t.rights}</p>
            </div>
          </div>
        </footer>
      </div>

      {/* PREMIUM CAREER MODAL */}
      {showCareers && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl animate-fade-in" onClick={() => setShowCareers(false)} />
          <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] shadow-3xl overflow-hidden animate-zoom-in flex flex-col md:flex-row min-h-[450px]">
            
            <div className="hidden md:flex md:w-2/5 p-12 bg-sky-500 dark:bg-slate-800 text-white flex-col justify-between relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div>
                <Briefcase size={36} className="mb-6" />
                <h2 className="text-3xl lg:text-5xl font-black tracking-tighter mb-4">{t.join_team}</h2>
                <p className="text-base opacity-80 leading-relaxed">{t.career_msg}</p>
              </div>
              <div className="space-y-4 mt-8">
                <p className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-60 mb-2">{t.values_title}</p>
                <div className="flex items-center gap-3">
                  <Lightbulb size={16} className="text-white/80" />
                  <span className="font-bold text-xs">{t.val_1}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target size={16} className="text-white/80" />
                  <span className="font-bold text-xs">{t.val_2}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Rocket size={16} className="text-white/80" />
                  <span className="font-bold text-xs">{t.val_3}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative bg-white dark:bg-slate-900">
              <button onClick={() => setShowCareers(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-50 dark:bg-white/10 flex items-center justify-center hover:bg-slate-100 transition-colors dark:text-white"><X size={18} /></button>
              
              {formStatus === 'success' ? (
                <div className="text-center space-y-6 flex flex-col items-center py-6 animate-fade-in">
                  <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl"><CheckCircle2 size={32} className="text-white" /></div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">{t.mission_received}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Our HR team will review your profile shortly.</p>
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
        @keyframes fade-in-up { from { opacity: 0; transform: translate3d(0, 30px, 0); } to { opacity: 1; transform: translate3d(0,0,0); } }
        
        .reveal { opacity: 0; transform: translate3d(0, 40px, 0); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none; will-change: opacity, transform; }
        .reveal-visible { opacity: 1; transform: translate3d(0,0,0); pointer-events: auto; }
        
        .bg-square-grid { 
          background-image: linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px); 
          background-size: 40px 40px; 
        }

        @media (min-width: 768px) {
          .bg-square-grid { background-size: 60px 60px; }
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
        
        @keyframes fade-in { 
          from { opacity: 0; transform: translateY(10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }

        ::selection { background-color: #38bdf8; color: white; }
      `}</style>
    </div>
  );
}
