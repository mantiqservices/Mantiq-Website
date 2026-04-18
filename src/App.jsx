import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, Sun, Moon, ArrowRight, ArrowUpRight,
  Layout, Smartphone, BarChart3, Binary, Mail,
  Linkedin, Facebook, CheckCircle2, ChevronRight,
  Target, Eye, Zap, Users, Trophy,
  Sparkles, Phone, Briefcase, Lightbulb, Rocket, ChevronDown, Globe, CalendarCheck, CreditCard, Clock, Shield, MonitorPlay, Upload, Gem, ShieldCheck, Timer, Cpu, ExternalLink, Monitor, Settings, Calculator, FileText,
  ShoppingBag, User, Search, Code, Building, Star, Download, Play
} from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────────────────

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

// ─── Templates Gallery Data ──────────────────────────────────────────────────

const CATEGORIES = [
  { id: "All", icon: Layout },
  { id: "E-Commerce", icon: ShoppingBag },
  { id: "Profiles", icon: Building }
];

const TEMPLATES = [
  {
    id: 1,
    title: "Luxe Accessories",
    category: "E-Commerce",
    description: "Premium dark-mode storefront for high-end jewelry, watches, and accessories with a gold-on-black aesthetic.",
    image: "https://images.unsplash.com/photo-1599643478524-4624419205b3?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Stripe API", "Tailwind", "Framer"],
    badge: "new",
    rating: 4.9, reviews: 24, downloads: 312,
    pages: ["Home","Shop","Product","Cart","Checkout"],
    features: ["Animated product reveals","Wishlist & quick-buy","Gold accent system","Dark mode native"],
    complexity: "Advanced", time: "3–5 days"
  },
  {
    id: 2,
    title: "Glow Cosmetics",
    category: "E-Commerce",
    description: "Soft, pastel-toned beauty store for skincare, makeup, and cosmetics brands. Built for high conversion.",
    image: "https://images.unsplash.com/photo-1596462502278-27bf85033878?auto=format&fit=crop&w=800&q=80",
    tags: ["Next.js", "Tailwind", "Cart", "CMS"],
    rating: 4.7, reviews: 18, downloads: 198,
    pages: ["Home","Shop","Product","About","Blog"],
    features: ["Shade selector widget","Ingredient transparency panel","Reviews integration","Bundle builder"],
    complexity: "Intermediate", time: "2–4 days"
  },
  {
    id: 3,
    title: "URBN Clothing",
    category: "E-Commerce",
    description: "High-contrast streetwear fashion storefront with an editorial grid layout and hype-drop countdown mechanics.",
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=800&q=80",
    tags: ["Vue.js", "Shopify Headless", "GSAP"],
    rating: 4.8, reviews: 31, downloads: 276,
    pages: ["Feed","Shop","Drop","Lookbook","Cart"],
    features: ["Drop countdown timer","Animated marquee ticker","Grayscale-to-color hover","Size guide modal"],
    complexity: "Advanced", time: "4–6 days"
  },
  {
    id: 4,
    title: "TechGear Mobile",
    category: "E-Commerce",
    description: "Clean, blue-toned tech accessories store with a card-grid layout engineered for high product clarity.",
    image: "https://images.unsplash.com/photo-1611314643773-40eab71bd0eb?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Redux", "Payment", "TypeScript"],
    badge: "new",
    rating: 4.6, reviews: 14, downloads: 145,
    pages: ["Home","Shop","Compare","Cart","Checkout"],
    features: ["Spec comparison table","Stock urgency tags","Sticky add-to-cart bar","Search with filters"],
    complexity: "Intermediate", time: "2–3 days"
  },
  {
    id: 5,
    title: "Pro Business Developer",
    category: "Profiles",
    description: "Sleek personal profile for consultants and business developers. Results-led layout with a case study section.",
    image: "https://images.unsplash.com/photo-1560250097001-a47b36f8636e?auto=format&fit=crop&w=800&q=80",
    tags: ["HTML5", "CSS3", "GSAP", "Calendly"],
    rating: 4.8, reviews: 27, downloads: 389,
    pages: ["Profile","Services","Clients","Contact"],
    features: ["Client logo wall","Timeline achievements","Booking integration","PDF resume export"],
    complexity: "Starter", time: "1–2 days"
  },
  {
    id: 6,
    title: "Studio Kroma Branding",
    category: "Profiles",
    description: "Dark-mode creative agency portfolio with a bento-grid layout, smooth scroll effects, and bold typography.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Framer Motion", "GSAP", "Lenis"],
    badge: "hot",
    rating: 5.0, reviews: 42, downloads: 534,
    pages: ["Index","Work","Studio","Process","Contact"],
    features: ["Bento grid layout","Custom cursor animation","Horizontal scroll gallery","Lenis smooth scroll"],
    complexity: "Advanced", time: "5–7 days"
  },
  {
    id: 7,
    title: "Vertex Corporate",
    category: "Profiles",
    description: "Professional B2B enterprise profile with a clean blue palette, capability sections, and trust-building layouts.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    tags: ["Next.js", "Tailwind CSS", "CMS", "i18n"],
    rating: 4.5, reviews: 19, downloads: 228,
    pages: ["Company","Capabilities","Leadership","Clients","Contact"],
    features: ["ISO certification badges","Org chart component","Stats counter animation","Case study grid"],
    complexity: "Intermediate", time: "3–4 days"
  },
  {
    id: 8,
    title: "Aseel Real Estate",
    category: "Profiles",
    description: "Luxury property listing site with oversized imagery, map integration, and elegant editorial typography.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Mapbox API", "Sanity CMS", "i18n"],
    badge: "new",
    rating: 4.9, reviews: 36, downloads: 461,
    pages: ["Home","Portfolio","Property","Map","Contact"],
    features: ["Interactive map pins","Currency & area converter","Virtual tour embed","Lead capture form"],
    complexity: "Advanced", time: "4–6 days"
  }
];

// ─── Template Preview HTML Generator ────────────────────────────────────────

const generateDummyTemplate = (template) => {
  const head = `
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"><\/script>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;700;900&family=Outfit:wght@300;400;600;700&family=Playfair+Display:wght@400;700&display=swap');
        body { margin: 0; overflow-x: hidden; scroll-behavior: smooth; }
        .font-serif { font-family: 'Bodoni Moda', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-tech { font-family: 'Space Grotesk', sans-serif; }
        .font-modern { font-family: 'Outfit', sans-serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .page-view { display: none; }
        .page-view.active { display: block; animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      </style>
      <script>
        function navigateTo(pageId) {
          document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
          var target = document.getElementById('page-' + pageId);
          if(target) target.classList.add('active');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      <\/script>
    </head>
  `;

  let body = '';

  if (template.id === 1) {
    body = `
      <div class="bg-[#111] font-sans text-white min-h-screen flex flex-col">
        <header class="px-8 py-6 flex justify-between items-center sticky top-0 z-30 bg-[#111]/90 backdrop-blur-md border-b border-[#333]">
          <h1 class="text-2xl font-serif tracking-widest uppercase cursor-pointer text-[#D4AF37]" onclick="navigateTo('home')">Luxe.</h1>
          <div class="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase font-bold text-gray-400">
            <button onclick="navigateTo('home')" class="hover:text-[#D4AF37] transition">Home</button>
            <button onclick="navigateTo('shop')" class="hover:text-[#D4AF37] transition">Collections</button>
          </div>
          <div class="flex gap-6 text-lg text-gray-400">
            <i class="fas fa-search cursor-pointer hover:text-[#D4AF37]"></i>
            <div class="relative cursor-pointer hover:text-[#D4AF37]">
               <i class="fas fa-shopping-bag"></i>
               <span class="absolute -bottom-2 -right-2 bg-[#D4AF37] text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
            </div>
          </div>
        </header>
        <div id="page-home" class="page-view active flex-1">
          <section class="relative h-[80vh] flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1599643478524-4624419205b3?auto=format&fit=crop&w=1600&q=80" class="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent"></div>
            <div class="relative z-10 text-center text-white p-6">
              <span class="text-xs uppercase tracking-[0.4em] font-bold text-[#D4AF37] mb-4 block">New Arrivals</span>
              <h2 class="text-5xl md:text-7xl font-serif mb-8">Elegance in Details.</h2>
              <button onclick="navigateTo('shop')" class="border border-[#D4AF37] text-[#D4AF37] px-10 py-3 uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#D4AF37] hover:text-black transition duration-300">Shop Now</button>
            </div>
          </section>
          <section class="py-24 px-6 max-w-7xl mx-auto w-full text-center">
            <h3 class="text-3xl font-serif mb-16 text-white">Curated For You</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              ${[
                { img:"https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80", name:"Onyx Chronograph", price:"4,500" },
                { img:"https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80", name:"Gold Halo Ring", price:"2,200" },
                { img:"https://images.unsplash.com/photo-1573408301185-9519f94816a0?auto=format&fit=crop&w=600&q=80", name:"Pearl Drop Earrings", price:"1,850" }
              ].map(p => `
              <div class="group cursor-pointer border border-[#333] p-4 rounded-xl hover:border-[#D4AF37] transition">
                <div class="relative aspect-square overflow-hidden mb-6 rounded-lg">
                  <img src="${p.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-1000" />
                </div>
                <h4 class="text-sm font-bold tracking-wider uppercase text-gray-200">${p.name}</h4>
                <p class="text-[#D4AF37] font-serif text-lg mt-2">EGP ${p.price}</p>
              </div>
              `).join('')}
            </div>
          </section>
        </div>
        <div id="page-shop" class="page-view flex-1 py-16 px-6 max-w-7xl mx-auto w-full">
          <h2 class="text-4xl font-serif mb-12 border-b border-[#333] pb-6">All Accessories</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            ${[
              { img:"https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80", n:"Onyx Chronograph", p:"4,500" },
              { img:"https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80", n:"Gold Halo Ring", p:"2,200" },
              { img:"https://images.unsplash.com/photo-1573408301185-9519f94816a0?auto=format&fit=crop&w=400&q=80", n:"Pearl Earrings", p:"1,850" },
              { img:"https://images.unsplash.com/photo-1599643478524-4624419205b3?auto=format&fit=crop&w=400&q=80", n:"Chain Necklace", p:"3,100" },
              { img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80", n:"Leather Handbag", p:"6,500" },
              { img:"https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80", n:"Diamond Bracelet", p:"12,000" },
              { img:"https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80", n:"Silver Band", p:"1,100" },
              { img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80", n:"Classic Shades", p:"2,400" }
            ].map(item => `
              <div class="group cursor-pointer">
                <div class="aspect-square overflow-hidden mb-4 rounded-lg bg-[#222]">
                  <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-80 group-hover:opacity-100" />
                </div>
                <h4 class="text-xs font-bold uppercase tracking-wide text-gray-300 group-hover:text-[#D4AF37] transition">${item.n}</h4>
                <p class="font-serif text-[#D4AF37] mt-1">EGP ${item.p}</p>
              </div>
            `).join('')}
          </div>
        </div>
        <footer class="bg-black py-12 text-center text-xs text-gray-500 uppercase tracking-widest border-t border-[#333] mt-auto">
           <p>&copy; 2026 Luxe Accessories Egypt.</p>
        </footer>
      </div>
    `;
  } else if (template.id === 2) {
    body = `
      <div class="bg-[#FAF7F2] font-sans text-[#4A4A4A] min-h-screen flex flex-col">
        <header class="px-8 py-5 flex justify-between items-center sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md">
          <div class="flex gap-6 font-medium text-sm tracking-wide">
            <button onclick="navigateTo('home')" class="hover:text-[#D98A82] transition">Discover</button>
            <button onclick="navigateTo('shop')" class="hover:text-[#D98A82] transition">Shop Skincare</button>
          </div>
          <h1 class="text-3xl font-playfair italic font-bold tracking-tight text-[#333]" onclick="navigateTo('home')" style="cursor:pointer;">Glow.</h1>
          <div class="flex gap-6 text-xl text-[#333]">
             <i class="far fa-user cursor-pointer"></i>
             <i class="fas fa-shopping-bag cursor-pointer text-[#D98A82]"></i>
          </div>
        </header>
        <div id="page-home" class="page-view active flex-1">
          <section class="relative h-[70vh] flex items-center justify-center bg-[#F2E8DF] mx-4 rounded-3xl overflow-hidden mt-4">
            <img src="https://images.unsplash.com/photo-1596462502278-27bf85033878?auto=format&fit=crop&w=1600&q=80" class="absolute inset-0 w-full h-full object-cover opacity-80" />
            <div class="relative z-10 text-center bg-white/70 backdrop-blur-sm p-10 rounded-2xl max-w-lg">
              <h2 class="text-5xl font-playfair text-[#333] mb-4">Pure Radiance</h2>
              <p class="mb-8 text-[#666]">Vegan, cruelty-free skincare formulated for your natural glow.</p>
              <button onclick="navigateTo('shop')" class="bg-[#D98A82] text-white px-8 py-3 rounded-full font-bold tracking-wide hover:bg-[#C27A73] transition shadow-lg shadow-[#D98A82]/30">Shop Collection</button>
            </div>
          </section>
          <section class="py-20 px-6 max-w-6xl mx-auto text-center">
            <h3 class="text-3xl font-playfair mb-12 text-[#333]">Best Sellers</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-10">
              ${[
                { img:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80", name:"Hydrating Face Cream", price:"650" },
                { img:"https://images.unsplash.com/photo-1586495777744-4e6232bf2f9d?auto=format&fit=crop&w=600&q=80", name:"Velvet Matte Lipstick", price:"420" },
                { img:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80", name:"Vitamin C Serum", price:"890" }
              ].map(p => `
              <div class="group cursor-pointer">
                <div class="relative aspect-square overflow-hidden rounded-2xl mb-4 bg-[#F2E8DF]">
                  <img src="${p.img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <h4 class="font-bold text-[#333]">${p.name}</h4>
                <p class="text-[#D98A82] font-medium mt-1">EGP ${p.price}</p>
              </div>
              `).join('')}
            </div>
          </section>
        </div>
        <div id="page-shop" class="page-view flex-1 py-12 px-6 max-w-6xl mx-auto w-full">
          <h2 class="text-4xl font-playfair mb-10 text-[#333]">Skincare Essentials</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            ${[
              { img:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80", n:"Face Cream", p:"650" },
              { img:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=80", n:"Vitamin Serum", p:"890" },
              { img:"https://images.unsplash.com/photo-1586495777744-4e6232bf2f9d?auto=format&fit=crop&w=400&q=80", n:"Lipstick Duo", p:"420" },
              { img:"https://images.unsplash.com/photo-1596462502278-27bf85033878?auto=format&fit=crop&w=400&q=80", n:"Cleansing Oil", p:"550" },
              { img:"https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=400&q=80", n:"Rose Toner", p:"380" },
              { img:"https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=400&q=80", n:"Clay Mask", p:"450" },
              { img:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80", n:"Eye Cream", p:"720" },
              { img:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=80", n:"Night Repair", p:"950" }
            ].map(item => `
              <div class="group cursor-pointer text-center">
                <div class="aspect-square overflow-hidden mb-4 rounded-2xl bg-[#F2E8DF]">
                  <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <h4 class="font-bold text-[#333] text-sm">${item.n}</h4>
                <p class="text-[#D98A82] text-sm mt-1">EGP ${item.p}</p>
              </div>
            `).join('')}
          </div>
        </div>
        <footer class="bg-[#F2E8DF] py-10 text-center text-sm font-medium text-[#888] mt-auto">
           <p>Glow Cosmetics Egypt &copy; 2026</p>
        </footer>
      </div>
    `;
  } else if (template.id === 3) {
    body = `
      <div class="bg-black font-tech text-white min-h-screen flex flex-col selection:bg-[#ff3366] selection:text-white">
        <div class="bg-[#ff3366] text-black overflow-hidden py-2 whitespace-nowrap border-b-2 border-black relative z-30">
           <div class="animate-[marquee_15s_linear_infinite] inline-block font-black uppercase text-sm tracking-widest">
              NEW DROP OUT NOW // FREE SHIPPING IN EGYPT ON ORDERS OVER 2000 EGP // NEW DROP OUT NOW // FREE SHIPPING IN EGYPT ON ORDERS OVER 2000 EGP //&nbsp;
           </div>
           <style>@keyframes marquee { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-50%, 0, 0); } }</style>
        </div>
        <header class="bg-black border-b border-zinc-800 p-5 sticky top-0 z-20 flex justify-between items-center">
          <div class="flex gap-6 font-bold uppercase text-sm tracking-widest">
            <button onclick="navigateTo('home')" class="hover:text-[#ff3366] transition">Feed</button>
            <button onclick="navigateTo('shop')" class="hover:text-[#ff3366] transition">Shop</button>
          </div>
          <h1 class="text-4xl font-black italic tracking-tighter cursor-pointer select-none" onclick="navigateTo('home')">URBN<span class="text-[#ff3366]">THREADS</span></h1>
          <div class="flex gap-6 text-xl">
             <i class="fas fa-shopping-cart cursor-pointer hover:text-[#ff3366]"></i>
          </div>
        </header>
        <div id="page-home" class="page-view active w-full flex-1">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 p-1 bg-zinc-900">
             <div class="md:col-span-2 lg:col-span-2 relative bg-black aspect-[16/9] md:aspect-auto md:h-[70vh] flex items-center justify-center group overflow-hidden cursor-pointer" onclick="navigateTo('shop')">
                <img src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1200&q=80" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition duration-700 grayscale group-hover:grayscale-0" />
                <div class="relative z-10 text-center pointer-events-none p-4">
                   <h2 class="text-6xl md:text-9xl font-black italic tracking-tighter text-transparent leading-none" style="-webkit-text-stroke: 2px white;">DROP<br/>004</h2>
                   <button class="mt-8 bg-[#ff3366] text-black font-black uppercase tracking-widest px-8 py-3 text-sm pointer-events-auto hover:bg-white transition">Shop The Drop</button>
                </div>
             </div>
             <div class="relative bg-zinc-800 aspect-square md:aspect-auto md:h-[70vh] group overflow-hidden cursor-pointer">
                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80" class="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-500" />
                <div class="absolute inset-0 p-6 flex flex-col justify-between z-10">
                   <span class="bg-white text-black font-black px-2 py-1 text-[10px] self-start uppercase">Footwear</span>
                   <div><h3 class="text-2xl font-black italic uppercase">Retro Hi-Tops</h3><p class="text-[#ff3366] font-bold">EGP 2,400</p></div>
                </div>
             </div>
          </div>
        </div>
        <div id="page-shop" class="page-view w-full p-6 lg:p-12 flex-1">
          <h2 class="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-12 border-b border-zinc-800 pb-6">All Gear.</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
             ${[
               { img:"https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=500&q=80", name:"Retro Hi-Tops", p:"2,400" },
               { img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80", name:"Nylon Anorak", p:"3,200" },
               { img:"https://images.unsplash.com/photo-1578681994506-b09e18b6a6c6?auto=format&fit=crop&w=500&q=80", name:"Heavy Hoodie", p:"1,500" },
               { img:"https://images.unsplash.com/photo-1617331721458-bd3fa364a5d8?auto=format&fit=crop&w=500&q=80", name:"Utility Vest", p:"1,850" },
               { img:"https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=500&q=80", name:"Graphic Tee", p:"850" },
               { img:"https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80", name:"Cargo Pants", p:"1,900" },
               { img:"https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=500&q=80", name:"Beanie Red", p:"450" },
               { img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80", name:"Crossbody Bag", p:"950" }
             ].map(item => `
              <div class="group cursor-pointer">
                <div class="relative bg-zinc-900 aspect-[3/4] mb-4 overflow-hidden border border-zinc-800">
                  <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100" />
                  <button class="absolute bottom-0 w-full bg-white text-black py-4 font-black uppercase tracking-widest text-sm transform translate-y-full group-hover:translate-y-0 transition duration-300">Add to Cart</button>
                </div>
                <h4 class="font-black italic uppercase text-lg group-hover:text-[#ff3366] transition">${item.name}</h4>
                <p class="text-zinc-400 font-bold">EGP ${item.p}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } else if (template.id === 4) {
    body = `
      <div class="bg-[#F8FAFC] font-sans text-slate-900 min-h-screen flex flex-col">
        <header class="px-8 py-5 flex justify-between items-center sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm">
          <h1 class="text-2xl font-black tracking-tight text-blue-600 cursor-pointer" onclick="navigateTo('home')">TechGear<i class="fas fa-bolt ml-1 text-yellow-400"></i></h1>
          <div class="hidden md:flex gap-8 font-bold text-sm text-slate-600">
            <button onclick="navigateTo('home')" class="hover:text-blue-600 transition">Home</button>
            <button onclick="navigateTo('shop')" class="hover:text-blue-600 transition">Accessories</button>
          </div>
          <button class="bg-slate-900 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-blue-600 transition"><i class="fas fa-shopping-cart mr-2"></i>Cart</button>
        </header>
        <div id="page-home" class="page-view active flex-1">
          <section class="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
            <div class="md:w-1/2">
              <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">Premium Quality</span>
              <h2 class="text-5xl md:text-7xl font-black mb-6 leading-tight text-slate-900">Power Up<br/>Your Tech.</h2>
              <p class="text-lg text-slate-500 mb-8 font-medium">Discover top-tier mobile cases, fast chargers, and durable cables engineered for your daily life.</p>
              <button onclick="navigateTo('shop')" class="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/30">Shop Collection</button>
            </div>
            <div class="md:w-1/2 relative">
               <img src="https://images.unsplash.com/photo-1611314643773-40eab71bd0eb?auto=format&fit=crop&w=800&q=80" class="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl shadow-blue-900/10" />
            </div>
          </section>
        </div>
        <div id="page-shop" class="page-view flex-1 py-16 px-6 max-w-7xl mx-auto w-full">
          <h2 class="text-3xl font-black mb-10 text-slate-900">All Accessories</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            ${[
              { img:"https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=400&q=80", n:"Silicone Phone Case", p:"350" },
              { img:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=400&q=80", n:"Fast Power Bank", p:"1,200" },
              { img:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80", n:"Wireless Earbuds", p:"450" },
              { img:"https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80", n:"Type-C Cable 2M", p:"250" },
              { img:"https://images.unsplash.com/photo-1611314643773-40eab71bd0eb?auto=format&fit=crop&w=400&q=80", n:"Clear Armor Case", p:"400" },
              { img:"https://images.unsplash.com/photo-1618366712010-f4ae9c647dcf?auto=format&fit=crop&w=400&q=80", n:"Wireless Charger", p:"850" },
              { img:"https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=400&q=80", n:"Screen Protector", p:"150" },
              { img:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=400&q=80", n:"Dual Car Charger", p:"380" }
            ].map(item => `
              <div class="group cursor-pointer bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition">
                <div class="aspect-square overflow-hidden mb-4 rounded-xl bg-slate-50">
                  <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <h4 class="font-bold text-slate-900 text-sm">${item.n}</h4>
                <p class="text-blue-600 font-black mt-1">EGP ${item.p}</p>
                <button class="w-full mt-4 bg-slate-100 text-slate-700 py-2 rounded-lg text-xs font-bold uppercase hover:bg-blue-600 hover:text-white transition">Add</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } else if (template.id === 5) {
    body = `
      <div class="bg-white font-sans text-slate-900 min-h-screen flex flex-col">
        <header class="px-8 py-6 flex justify-between items-center sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100">
          <h1 class="text-xl font-bold tracking-tight cursor-pointer" onclick="navigateTo('home')">Omar<span class="text-blue-600">Gharib.</span></h1>
          <nav class="hidden md:flex gap-8 font-semibold text-sm text-slate-500">
            <button onclick="navigateTo('home')" class="hover:text-blue-600 transition">Profile</button>
            <button onclick="navigateTo('services')" class="hover:text-blue-600 transition">Expertise</button>
          </nav>
          <button class="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition">Hire Me</button>
        </header>
        <div id="page-home" class="page-view active flex-1 px-6 max-w-6xl mx-auto w-full py-20 flex flex-col md:flex-row items-center gap-16">
          <div class="md:w-1/2">
            <span class="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4 block">Senior Business Developer</span>
            <h2 class="text-5xl md:text-7xl font-black mb-6 leading-tight text-slate-900">Driving<br/>Scalable<br/>Growth.</h2>
            <p class="text-lg text-slate-500 mb-8 leading-relaxed">I help B2B companies in Egypt and the MENA region build strategic partnerships, optimize sales pipelines, and achieve exponential revenue growth.</p>
            <div class="flex gap-4">
               <button onclick="navigateTo('services')" class="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition">View My Services</button>
            </div>
          </div>
          <div class="md:w-1/2">
            <img src="https://images.unsplash.com/photo-1560250097001-a47b36f8636e?auto=format&fit=crop&w=800&q=80" class="w-full h-[600px] object-cover rounded-3xl shadow-2xl" />
          </div>
        </div>
        <div id="page-services" class="page-view flex-1 bg-slate-50 py-20 px-6">
           <div class="max-w-6xl mx-auto">
              <h2 class="text-4xl font-black mb-12 text-center text-slate-900">Core Expertise</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition">
                    <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6"><i class="fas fa-chart-line"></i></div>
                    <h3 class="text-xl font-bold mb-3">Market Expansion</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">Identifying new territories and executing market entry strategies tailored for the Egyptian landscape.</p>
                 </div>
                 <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition">
                    <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl mb-6"><i class="fas fa-handshake"></i></div>
                    <h3 class="text-xl font-bold mb-3">B2B Partnerships</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">Building and nurturing high-value corporate relationships and closing enterprise-level deals.</p>
                 </div>
                 <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition">
                    <div class="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-6"><i class="fas fa-filter"></i></div>
                    <h3 class="text-xl font-bold mb-3">Sales Optimization</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">Restructuring sales funnels and CRM workflows to maximize lead conversion rates.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    `;
  } else if (template.id === 6) {
    body = `
      <div class="bg-[#0f0f0f] font-modern text-[#f0f0f0] min-h-screen flex flex-col selection:bg-[#ccff00] selection:text-black">
        <header class="p-6 md:p-8 flex justify-between items-center sticky top-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md">
          <div class="text-2xl font-bold tracking-tight cursor-pointer flex items-center gap-2" onclick="navigateTo('home')">
             <div class="w-6 h-6 bg-[#ccff00] rounded-full"></div> KROMA.
          </div>
          <nav class="flex gap-8 font-semibold text-sm">
            <button onclick="navigateTo('home')" class="hover:text-[#ccff00] transition">Index</button>
            <button onclick="navigateTo('work')" class="hover:text-[#ccff00] transition">Work</button>
          </nav>
        </header>
        <div id="page-home" class="page-view active flex-1">
          <section class="px-6 md:px-12 py-20 flex flex-col justify-center min-h-[70vh]">
            <h1 class="text-5xl md:text-8xl lg:text-[10vw] font-bold tracking-tighter leading-[0.9] mb-8">
              Visual <span class="text-[#ccff00] italic">identities</span><br/>that perform.
            </h1>
            <p class="text-xl md:text-3xl max-w-3xl font-light text-[#a0a0a0] mb-12">Studio Kroma is a Cairo-based branding agency crafting bold visual systems and digital experiences for modern brands.</p>
            <button onclick="navigateTo('work')" class="bg-[#ccff00] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition self-start">See Our Work</button>
          </section>
          <section class="px-6 md:px-12 pb-24">
             <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                <div class="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer" onclick="navigateTo('work')">
                   <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                   <div class="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black to-transparent">
                      <h3 class="text-4xl font-bold mb-2">Neon Dynamics</h3><p class="text-[#ccff00] font-medium">Brand Identity / 3D</p>
                   </div>
                </div>
                <div class="relative rounded-3xl bg-[#1a1a1a] p-8 flex flex-col justify-between border border-[#333]">
                   <div class="text-5xl text-[#ccff00]"><i class="fas fa-layer-group"></i></div>
                   <div><h3 class="text-2xl font-bold mb-2">Branding</h3><p class="opacity-70 text-sm">Logos, Guidelines, Strategy</p></div>
                </div>
                <div class="relative rounded-3xl bg-[#1a1a1a] p-8 flex flex-col justify-between border border-[#333]">
                   <div class="text-5xl text-[#ccff00]"><i class="fas fa-desktop"></i></div>
                   <div><h3 class="text-2xl font-bold mb-2">Web Design</h3><p class="opacity-70 text-sm">UI/UX, Webflow, React</p></div>
                </div>
             </div>
          </section>
        </div>
        <div id="page-work" class="page-view px-6 md:px-12 py-12 w-full flex-1">
           <h2 class="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-16">Selected<br/><span class="text-[#ccff00]">Archive.</span></h2>
           <div class="space-y-24 pb-24">
             ${[
               { img:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80", title:"Neon Dynamics", cat:"Brand Identity", color:"ccff00" },
               { img:"https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80", title:"Abstract Data", cat:"Data Visualization", color:"00ffff" }
             ].map((p) => `
             <div class="group cursor-pointer">
               <div class="relative overflow-hidden rounded-3xl aspect-[16/9] mb-8 bg-[#1a1a1a]">
                  <img src="${p.img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-80 group-hover:opacity-100" />
               </div>
               <div class="flex justify-between items-center border-b border-[#333] pb-6 group-hover:border-[#${p.color}] transition">
                 <h3 class="font-bold text-3xl md:text-5xl tracking-tight">${p.title}</h3>
                 <span class="text-lg text-[#a0a0a0] font-medium hidden md:block">${p.cat}</span>
               </div>
             </div>
             `).join('')}
           </div>
        </div>
      </div>
    `;
  } else if (template.id === 7) {
    body = `
      <div class="bg-white font-sans text-slate-800 min-h-screen flex flex-col">
        <header class="px-8 py-5 flex justify-between items-center sticky top-0 z-30 bg-white shadow-sm">
          <div class="flex items-center gap-2 cursor-pointer" onclick="navigateTo('home')">
             <div class="w-8 h-8 bg-blue-700 rounded flex items-center justify-center text-white font-bold text-xl">V</div>
             <h1 class="text-2xl font-bold tracking-tight text-slate-900">Vertex</h1>
          </div>
          <nav class="hidden md:flex gap-8 font-semibold text-sm text-slate-600">
            <button onclick="navigateTo('home')" class="hover:text-blue-700 transition">Company</button>
            <button onclick="navigateTo('services')" class="hover:text-blue-700 transition">Capabilities</button>
          </nav>
          <button class="bg-slate-900 text-white px-5 py-2 rounded font-medium text-sm hover:bg-blue-700 transition">Contact Us</button>
        </header>
        <div id="page-home" class="page-view active flex-1">
          <section class="relative h-[60vh] flex items-center bg-slate-900">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80" class="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay" />
            <div class="relative z-10 px-8 md:px-16 max-w-4xl text-white">
               <h2 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">Excellence in Enterprise Solutions.</h2>
               <p class="text-lg text-blue-100 mb-8 max-w-2xl">Vertex provides world-class operational management and corporate consultancy for businesses across Egypt.</p>
               <button onclick="navigateTo('services')" class="bg-blue-600 px-8 py-3 rounded text-white font-bold hover:bg-blue-500 transition">Explore Capabilities</button>
            </div>
          </section>
          <section class="py-20 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
             <div class="md:w-1/2">
                <h3 class="text-blue-700 font-bold uppercase tracking-widest text-sm mb-2">Our Mission</h3>
                <h2 class="text-4xl font-bold text-slate-900 mb-6">Empowering Corporate Growth</h2>
                <p class="text-slate-600 leading-relaxed mb-6">Established in 2015, Vertex has grown to become a cornerstone of corporate strategy in the MENA region.</p>
                <ul class="space-y-3 text-slate-700 font-medium">
                   <li><i class="fas fa-check text-blue-600 mr-2"></i> 500+ Enterprise Clients</li>
                   <li><i class="fas fa-check text-blue-600 mr-2"></i> ISO 9001 Certified</li>
                   <li><i class="fas fa-check text-blue-600 mr-2"></i> Regional Expertise</li>
                </ul>
             </div>
             <div class="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" class="rounded-xl shadow-xl w-full" />
             </div>
          </section>
        </div>
        <div id="page-services" class="page-view flex-1 py-20 px-8 max-w-7xl mx-auto w-full">
           <h2 class="text-4xl font-bold text-slate-900 mb-12 text-center">Our Capabilities</h2>
           <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="p-8 border border-slate-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition cursor-default">
                 <i class="fas fa-chart-pie text-4xl text-blue-600 mb-6"></i>
                 <h3 class="text-xl font-bold mb-3">Financial Advisory</h3>
                 <p class="text-slate-600 text-sm leading-relaxed">Comprehensive financial restructuring and audit services for large scale enterprises.</p>
              </div>
              <div class="p-8 border border-slate-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition cursor-default">
                 <i class="fas fa-users-cog text-4xl text-blue-600 mb-6"></i>
                 <h3 class="text-xl font-bold mb-3">HR Management</h3>
                 <p class="text-slate-600 text-sm leading-relaxed">Talent acquisition, organizational structuring, and payroll management systems.</p>
              </div>
              <div class="p-8 border border-slate-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition cursor-default">
                 <i class="fas fa-globe text-4xl text-blue-600 mb-6"></i>
                 <h3 class="text-xl font-bold mb-3">Global Logistics</h3>
                 <p class="text-slate-600 text-sm leading-relaxed">Supply chain optimization and international trade consultation.</p>
              </div>
           </div>
        </div>
      </div>
    `;
  } else if (template.id === 8) {
    body = `
      <div class="bg-[#FDFBF7] font-serif text-[#2B3A30] min-h-screen flex flex-col">
        <header class="px-8 py-6 flex justify-between items-center sticky top-0 z-30 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E8E2D2]">
          <h1 class="text-3xl font-serif font-bold text-[#1A231C] cursor-pointer" onclick="navigateTo('home')">Aseel.</h1>
          <nav class="hidden md:flex gap-8 text-sm font-sans font-bold tracking-widest uppercase text-[#556658]">
            <button onclick="navigateTo('home')" class="hover:text-[#C5A880] transition">Home</button>
            <button onclick="navigateTo('properties')" class="hover:text-[#C5A880] transition">Properties</button>
          </nav>
          <button class="border border-[#C5A880] text-[#C5A880] px-6 py-2 font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#C5A880] hover:text-white transition">Contact</button>
        </header>
        <div id="page-home" class="page-view active flex-1">
          <section class="relative h-[80vh] mx-4 mt-4 rounded-[2rem] overflow-hidden flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute inset-0 bg-[#1A231C]/40"></div>
            <div class="relative z-10 text-center text-white p-6 max-w-3xl">
              <span class="text-xs uppercase font-sans tracking-[0.3em] font-bold text-[#C5A880] mb-6 block">Luxury Real Estate Egypt</span>
              <h2 class="text-5xl md:text-7xl font-serif mb-8 leading-tight">Extraordinary Homes for Extraordinary Lives.</h2>
              <button onclick="navigateTo('properties')" class="bg-[#C5A880] text-white px-10 py-4 font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-white hover:text-[#2B3A30] transition duration-300">View Portfolio</button>
            </div>
          </section>
          <section class="py-24 px-6 max-w-7xl mx-auto w-full text-center">
             <h3 class="text-4xl font-serif mb-4">Featured Property</h3>
             <p class="font-sans text-[#556658] mb-12 max-w-2xl mx-auto">Discover unparalleled luxury in the heart of New Cairo.</p>
             <div class="relative rounded-3xl overflow-hidden group cursor-pointer" onclick="navigateTo('properties')">
                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" class="w-full h-[500px] object-cover group-hover:scale-105 transition duration-1000" />
                <div class="absolute bottom-0 w-full p-8 bg-gradient-to-t from-[#1A231C] to-transparent text-left text-white">
                   <h4 class="text-3xl font-serif mb-2">The Crown Villa</h4>
                   <p class="font-sans text-[#C5A880] font-bold tracking-widest uppercase text-sm">EGP 25,000,000</p>
                </div>
             </div>
          </section>
        </div>
        <div id="page-properties" class="page-view flex-1 py-20 px-6 max-w-7xl mx-auto w-full">
          <div class="flex justify-between items-end mb-12 border-b border-[#E8E2D2] pb-6">
             <h2 class="text-4xl font-serif">Exclusive Portfolio</h2>
             <span class="font-sans text-sm font-bold uppercase tracking-widest text-[#C5A880]">4 Properties</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            ${[
              { img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", n:"The Crown Villa", p:"25,000,000", loc:"New Cairo" },
              { img:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", n:"Modern Duplex", p:"12,500,000", loc:"Zayed City" },
              { img:"https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80", n:"Lakefront Mansion", p:"45,000,000", loc:"North Coast" },
              { img:"https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80", n:"Oasis Townhouse", p:"8,900,000", loc:"October City" }
            ].map(item => `
              <div class="group cursor-pointer">
                <div class="relative overflow-hidden mb-4 rounded-xl aspect-[4/3]">
                  <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-1000" />
                  <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 font-sans text-xs font-bold uppercase tracking-widest text-[#2B3A30] rounded">${item.loc}</div>
                </div>
                <h4 class="text-2xl font-serif group-hover:text-[#C5A880] transition">${item.n}</h4>
                <p class="font-sans text-[#556658] font-bold tracking-widest mt-2 text-sm">EGP ${item.p}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  return `<!DOCTYPE html><html>${head}<body class="antialiased">${body}</body></html>`;
};

// ─── Translations ─────────────────────────────────────────────────────────────

const T = {
  en:{
    logo:"Mantiq",
    tag:"Intelligence in Business",
    nav_about:"About", nav_services:"Services", nav_events:"Events", nav_demos:"View Demos", nav_careers: "Careers",
    cta:"Get Started",
    hero_label:"MENA Region's Digital Partner",
    hero_line1:"The Path You Should",
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
    events_title2:"",
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
    apply:"Send Application", cv_link:"Upload CV",
    exp_brief_p: "Application & Experience Brief",
    rights:"All rights reserved.", pricing:"",
    footer_desc:"Strategic consultancy and digital infrastructure for the MENA region.",
    explore:"View Service",
    why_label:"Why Mantiq",
    why_title1:"Why choose",
    why_title2:"US.",
    why_1_t:"Strategic Intelligence", why_1_d:"We don't just build code; we build logic based on deep business strategy.",
    why_2_t:"Custom Ecosystems", why_2_d:"No templates. We design intelligent digital environments tailored to your workflow.",
    why_3_t:"Execution Speed", why_3_d:"Agile development cycles that move as fast as your business growth.",
    why_4_t:"MENA Expertise", why_4_d:"Deep understanding of regional market dynamics and user behavior.",
    demos_label: "Experience Logic",
    demos_title1: "Digital",
    demos_title2: "Ecosystems.",
    demos_body: "Explore the architectures of our managed digital solutions and categorized pre-built architectures.",
    demo_status_msg: "We are working on this feature.",
    demo_form_title: "Request System Customization",
    demo_form_btn: "Confirm Demo Request",
    consult_title: "Book Strategy Session",
    consult_btn: "Confirm Consultation",
    careers_section_title: "Architect the future with us.",
    careers_section_body: "We are always looking for logic-driven minds in strategy, engineering, and design.",
    search_placeholder: "Search templates (e.g. 'E-Commerce', 'Profile', 'Real Estate')...",
    all_templates: "All Templates",
    e_commerce: "E-Commerce",
    portfolio: "Company & Profiles",
    showing: "Showing",
    templates_found: "templates",
    in_cat: "in",
    no_templates: "No templates found",
    no_templates_desc: "Try adjusting your search or filters.",
    clear_filters: "Clear all filters",
    view_demo: "View Demo",
    close_preview: "Close Preview",
    new_badge: "NEW",
    hot_badge: "HOT",
    feat_cat: "Featured Categories",
    pages_label: "Included Pages",
    features_label: "Key Features",
    stack_label: "Tech Stack",
    delivery_label: "Delivery",
    complexity_label: "Level",
    reviews_label: "Reviews",
    requests_label: "Requests",
  },
  ar:{
    logo:"منطق",
    tag:"الذكاء في الأعمال",
    nav_about:"من نحن", nav_services:"خدماتنا", nav_events:"الفعاليات", nav_demos:"نماذج حية", nav_careers: "التوظيف",
    cta:"ابدأ الآن",
    hero_label:"الشريك الرقمي لمنطقة الشرق الأوسط",
    hero_line1:"المسار الذى يجب",
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
    events_title2:"",
    customers_label:"يثق بنا",
    contact_label:"ابدأ مشروعاً",
    contact_title1:"فلنبني",
    contact_title2:"معا.",
    contact_body:"أخبرنا عن مشروعك. سيتواصل معك فريقنا الاستراتيجي خلال يوم عمل واحد.",
    name_p:"الاسم الكامل", company_p:"الشركة", email_p:"البريد الإلكتروني", phone_p:"رقم الهاتف", service_p:"اختر الخدمة",
    submit:"إرسال الموجز", sending:"جارٍ الإرسال…",
    success_title:"تم استلام الطلب.", success_body:"سيتواصل معك أحد مستشارينا خلال يوم عمل واحد.",
    careers:"فرص العمل", join_title:"انضم للفريق.",
    career_body:"نحن نبني مستقبل الذكاء التجاري في منطقة الشرق الأوسط. نبحث عن أشخاص استثنائيين لبنائه معنا.",
    val_title:"ما يحركنا", val_1:"الابتكار الأصيل", val_2:"نزاهة البيانات", val_3:"تكنولوجيا محورها الإنسان",
    apply:"إرسال الطلب", cv_link:"رفع السيرة الذاتية",
    exp_brief_p: "نبذة عن الخبرة وسر التقديم",
    rights:"جميع الحقوق محفوظة.", pricing:"",
    footer_desc:"استشارات استراتيجية وبنية تحتية رقمية لمنطقة الشرق الأوسط.",
    explore:"عرض الخدمة",
    why_label:"لماذا منطق؟",
    why_title1:"بنيت من أجل",
    why_title2:"الدقة.",
    why_1_t:"ذكاء استراتيجي", why_1_d:"نحن لا نبني أكواداً فقط، بل نبني منطقاً قائماً على استراتيجية عمل عميقة.",
    why_2_t:"أنظمة مخصصة", why_2_d:"لا نستخدم قوالب جاهزة. نصمم بيئات رقمية ذكية تناسب سير عملك تماماً.",
    why_3_t:"سرعة التنفيذ", why_3_d:"دورات تطوير رشيقة تتحرك بنفس سرعة نمو وتوسع أعمالك.",
    why_4_t:"خبرة إقليمية", why_4_d:"فهم عميق لديناميكيات السوق وسلوك المستخدمين في منطقة الشرق الأوسط.",
    demos_label: "تجربة المنطق",
    demos_title1: "أنظمة",
    demos_title2: "رقمية.",
    demos_body: "استكشف معماريات حلولنا الرقمية المُدارة والنماذج والتطبيقات الحية.",
    demo_status_msg: "نحن نعمل على تطوير هذه الميزة بطريقة احترافية تليق بكم.",
    demo_form_title: "طلب تخصيص للأنظمة",
    demo_form_btn: "تأكيد طلب العرض",
    consult_title: "حجز جلسة استراتيجية",
    consult_btn: "تأكيد حجز الاستشارة",
    careers_section_title: "صمم المستقبل معنا.",
    careers_section_body: "نبحث دائمًا عن العقول المدفوعة بالمنطق في الاستراتيجية والهندسة والتصميم.",
    search_placeholder: "ابحث عن النماذج (مثل: 'متجر'، 'شركات', 'عقارات')...",
    all_templates: "جميع النماذج",
    e_commerce: "متاجر إلكترونية",
    portfolio: "ملفات الشركات والأفراد",
    showing: "عرض",
    templates_found: "نماذج",
    in_cat: "في فئة",
    no_templates: "لم يتم العثور على نماذج",
    no_templates_desc: "حاول تعديل الفلاتر أو البحث.",
    clear_filters: "مسح جميع الفلاتر",
    view_demo: "عرض النموذج",
    close_preview: "إغلاق المعاينة",
    new_badge: "جديد",
    hot_badge: "رائج",
    feat_cat: "الفئات المميزة",
    pages_label: "الصفحات المضمنة",
    features_label: "المميزات الرئيسية",
    stack_label: "التقنيات",
    delivery_label: "مدة التسليم",
    complexity_label: "المستوى",
    reviews_label: "تقييمات",
    requests_label: "طلبات",
  }
};

// ─── Hooks ─────────────────────────────────────────────────────────────────────

const useReveal = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('rv'); io.unobserve(e.target); }
      }),
      { threshold: 0.07 }
    );
    setTimeout(() => {
      const items = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
      items.forEach(el => io.observe(el));
    }, 100);
    return () => io.disconnect();
  });
};

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

const useScrollRevealValue = (threshold = 0.15) => {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    const calc = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const start = window.innerHeight * (1 - threshold);
      const end   = window.innerHeight * 0.2;
      const divisor = start - end;
      if (Math.abs(divisor) < 0.1) {
        setVal(rect.top <= start ? 1 : 0);
      } else {
        const raw = (start - rect.top) / divisor;
        const safeVal = Math.min(1, Math.max(0, raw));
        setVal(isNaN(safeVal) ? 0 : safeVal);
      }
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(calc); };
    window.addEventListener('scroll', onScroll, { passive: true });
    calc();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [threshold]);
  return [ref, val];
};

// ─── Field Component ──────────────────────────────────────────────────────────

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
      ) : Tag === 'textarea' ? (
        <textarea required={required} name={name} autoComplete="off" rows="3"
          value={val} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onChange={e => setVal(e.target.value)}
          className={`w-full bg-transparent border-b py-3 outline-none text-sm transition-colors duration-200 resize-none ${border} ${textColor}`}/>
      ) : (
        <input required={required} name={name} type={type} autoComplete="off"
          value={val} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onChange={e => setVal(e.target.value)}
          className={`w-full bg-transparent border-b py-3 outline-none text-sm transition-colors duration-200 ${border} ${textColor}`}/>
      )}
    </div>
  );
};

// ─── Logo ─────────────────────────────────────────────────────────────────────

const LogoQ = ({ size = '1.3em' }) => (
  <svg viewBox="0 0 400 500" fill="none" stroke="#0ea5e9" strokeWidth="55" strokeLinecap="round" strokeLinejoin="round"
    style={{ display:'inline-block', width:size, height:size, verticalAlign:'middle', marginBottom:'0.08em' }}>
    <circle cx="200" cy="200" r="150"/>
    <path d="M320,430 C270,430 200,400 200,320 L200,140 M140,200 L200,140 L260,200"/>
  </svg>
);

const LogoText = ({ className = '', color }) => (
  <span className={className} style={{ color: color || 'currentColor', letterSpacing:'inherit', fontWeight:400 }}>
    MANTI<LogoQ size="1.3em"/>
  </span>
);

// ─── Nav ──────────────────────────────────────────────────────────────────────

const Nav = ({ lang, setLang, go, active, currentPage, openCareers }) => {
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
    { id:'demos', label: t.nav_demos, isPage: true },
    { id:'events', label: t.nav_events },
    { id:'careers_nav', label: t.nav_careers, isCareers: true },
  ];

  return (
    <>
      <nav dir={ar ? 'rtl' : 'ltr'}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500
        ${scrolled || currentPage !== 'home' ? 'bg-white/95 backdrop-blur-xl border-b border-slate-100 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          <button onClick={() => go('home')} className="flex items-center group">
            {lang === 'ar'
              ? <span className={`font-normal text-xl tracking-[0.18em] uppercase transition-colors ${scrolled || currentPage !== 'home' ? 'text-slate-900' : 'text-white'}`}>{t.logo}</span>
              : <LogoText className={`font-normal text-xl tracking-[0.18em] uppercase transition-colors ${scrolled || currentPage !== 'home' ? 'text-slate-900' : 'text-white'}`} color={scrolled || currentPage !== 'home' ? '#0f172a' : '#ffffff'}/>
            }
          </button>
          <div className="hidden lg:flex items-center gap-10">
            {links.map(l => (
              <button key={l.id} onClick={() => l.isCareers ? openCareers() : go(l.id)}
                className={`text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-200
                  ${active === l.id || (currentPage === 'demos' && l.id === 'demos')
                    ? 'text-sky-500'
                    : (scrolled || currentPage !== 'home') ? 'text-slate-500 hover:text-slate-900' : 'text-white/60 hover:text-white'}`}>
                {l.label}
              </button>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-5">
            <button onClick={() => setLang(ar ? 'en' : 'ar')}
              className={`text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 ${(scrolled || currentPage !== 'home') ? 'text-sky-500 hover:text-sky-600' : 'text-white/50 hover:text-white'}`}>
              <Globe size={13}/> {ar ? 'EN' : 'AR'}
            </button>
            <button onClick={() => go('contact')}
              className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] rounded-full transition-all duration-200 active:scale-95
                ${(scrolled || currentPage !== 'home') ? 'bg-slate-900 text-white hover:bg-sky-600' : 'bg-white text-slate-900 hover:bg-sky-500 hover:text-white'}`}>
              {t.cta}
            </button>
          </div>
          <button className={`lg:hidden p-1 transition-colors ${scrolled || currentPage !== 'home' ? 'text-slate-900' : 'text-white'}`} onClick={() => setOpen(!open)}>
            {open ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </nav>

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
              const link = links.find(l => l.id === id);
              const label = id === 'home' ? t.logo : id === 'contact' ? t.cta : link?.label;
              return (
                <button key={id} onClick={() => { 
                  if (link?.isCareers) { openCareers(); } else { go(id); }
                  setOpen(false); 
                }}
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

// ─── Service Row ──────────────────────────────────────────────────────────────

const ServiceRow = ({ s, lang, i, onBookConsult, onViewDemos }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const [contentH, setContentH] = useState(0);
  const ar = lang === 'ar';

  useEffect(() => {
    if (contentRef.current) setContentH(contentRef.current.scrollHeight);
  }, [open, lang]);

  return (
    <div className={`reveal service-line border-b border-slate-100 group`} style={{ transitionDelay: `${i * 60}ms` }}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between py-7 sm:py-9 gap-6 text-left px-2 -mx-2 rounded-xl transition-all duration-300 hover:px-4" dir={ar ? 'rtl' : 'ltr'}>
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
        <div className={`relative w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-400 overflow-hidden ${open ? 'bg-sky-500 border-sky-500 text-white' : 'border-slate-200 text-sky-500 group-hover:border-sky-500 group-hover:bg-sky-50'}`}>
          <ArrowUpRight size={16} className={`transition-transform duration-400 ${open ? 'rotate-90 scale-110' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`}/>
        </div>
      </button>

      <div style={{ maxHeight: open ? `${contentH + 40}px` : '0px', opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(-8px)', transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease, transform 0.4s ease', overflow: 'hidden' }} dir={ar ? 'rtl' : 'ltr'}>
        <div ref={contentRef} className="grid md:grid-cols-2 gap-8 sm:gap-12 px-2 pb-8">
          <div className="flex flex-col">
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">{s.desc[lang]}</p>
            <div className="grid grid-cols-2 gap-2 mb-8">
              {s.features[lang].map((f, j) => (
                <div key={j} className={`flex items-center gap-2 ${ar ? 'flex-row-reverse' : ''}`} style={{ opacity: open ? 1 : 0, transform: open ? 'translateX(0)' : 'translateX(-10px)', transition: `opacity 0.4s ease ${j * 60 + 200}ms, transform 0.4s ease ${j * 60 + 200}ms` }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0"/>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{f}</span>
                </div>
              ))}
            </div>

            {onBookConsult && (
              <button onClick={e => { e.stopPropagation(); onBookConsult(); }} 
                style={{ opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.4s ease 0.35s, transform 0.4s ease 0.35s' }} 
                className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 active:scale-[0.98] transition-all duration-200 group/btn shadow-lg shadow-sky-500/25 animate-buttonEntry mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0"><CalendarCheck size={16} className="text-white"/></div>
                  <div className="text-left">
                    <p className="text-white font-black text-xs uppercase tracking-[0.15em]">{lang === 'ar' ? 'احجز استشارة' : 'Book a Consultation'}</p>
                    <p className="text-white/70 text-[10px] font-medium">{lang === 'ar' ? 'جلسة استراتيجية — $20' : 'Strategy session — $20'}</p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-white/80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200 flex-shrink-0"/>
              </button>
            )}

            {onViewDemos && (
              <button onClick={e => { e.stopPropagation(); onViewDemos(); }} 
                style={{ opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.4s ease 0.35s, transform 0.4s ease 0.35s' }} 
                className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 active:scale-[0.98] transition-all duration-200 group/btn shadow-lg shadow-sky-500/25 animate-buttonEntry">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0"><MonitorPlay size={16} className="text-white"/></div>
                  <div className="text-left">
                    <p className="text-white font-black text-xs uppercase tracking-[0.15em]">{lang === 'ar' ? 'عرض النماذج الحية' : 'View Live Demos'}</p>
                    <p className="text-white/70 text-[10px] font-medium">{lang === 'ar' ? 'استكشف الأنظمة' : 'Explore systems'}</p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-white/80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200 flex-shrink-0"/>
              </button>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-48 sm:h-56 rounded-2xl overflow-hidden" style={{ opacity: open ? 1 : 0, transform: open ? 'scale(1)' : 'scale(0.96)', transition: 'opacity 0.5s ease 0.15s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s' }}>
              <img src={s.img} alt={s.title[lang]} className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

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
    <div ref={ref} className="bg-white p-8 sm:p-10 flex flex-col items-center text-center gap-3 hover:bg-sky-50/40 transition-colors duration-300 group cursor-default">
      <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 group-hover:scale-110 transition-all duration-300">{stat.icon}</div>
      <span className="text-3xl sm:text-4xl font-black text-slate-900" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>{stat.n}</span>
      <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${delay + 100}ms` }}>{stat.l}</span>
    </div>
  );
};

// ─── Tilt Card ────────────────────────────────────────────────────────────────

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
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ transition: 'transform 0.15s ease', willChange: 'transform' }}>
      {children}
    </div>
  );
};

// ─── Helper Components ────────────────────────────────────────────────────────

const SectionLabel = ({ text, dark = false }) => {
  const [ref, val] = useScrollRevealValue(0.3);
  const safeVal = isNaN(val) ? 0 : val;
  return (
    <div ref={ref} className="flex items-center gap-3 mb-12 overflow-hidden">
      <div style={{ width: `${safeVal * 20}px`, height: '2px', background: '#0ea5e9', transition: 'none', willChange: 'width', flexShrink: 0 }}/>
      <span style={{ opacity: safeVal, transform: `translateX(${(1 - safeVal) * -12}px)`, transition: 'none', willChange: 'opacity, transform' }} className={`text-[10px] font-bold uppercase tracking-[0.4em] ${dark ? 'text-white/40' : 'text-slate-400'}`}>
        {text}
      </span>
    </div>
  );
};

const ScrollRevealText = ({ children }) => {
  const [ref, val] = useScrollRevealValue(0.2);
  const safeVal = isNaN(val) ? 0 : val;
  return (
    <div ref={ref} style={{ opacity: safeVal, transform: `translateY(${(1 - safeVal) * 40}px)`, transition: 'none', willChange: 'opacity, transform' }}>
      {children}
    </div>
  );
};

const ParallaxBlock = ({ children, speed = 0.12, className = '' }) => {
  const [ref, offset] = useParallax(speed);
  return (
    <div ref={ref} style={{ transform: `translateY(${isNaN(offset) ? 0 : offset}px)`, willChange: 'transform' }} className={className}>
      {children}
    </div>
  );
};

const Marquee = ({ lang }) => {
  const t = T[lang];
  const items = [...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS];
  return (
    <div className="py-12 sm:py-16 border-y border-slate-100">
      <p className="text-center text-[10px] uppercase tracking-[0.5em] text-slate-300 font-bold mb-8">{t.customers_label}</p>
      <div className="relative overflow-hidden">
        <div className="relative overflow-hidden" dir="ltr">
          <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none" style={{ background:'linear-gradient(to right, white, transparent)' }}/>
          <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none" style={{ background:'linear-gradient(to left, white, transparent)' }}/>
          <div className="flex gap-4 w-max animate-marquee">
            {items.map((n, i) => (
              <span key={i} className="px-5 py-2 rounded-full border border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap hover:border-sky-200 hover:text-sky-500 transition-colors cursor-default">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Enhanced Template Card ───────────────────────────────────────────────────

const complexityColor = {
  Starter: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
  Intermediate: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  Advanced: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200' }
};

const TemplateCard = ({ template, t, lang, onPreview }) => {
  const ar = lang === 'ar';
  const cc = complexityColor[template.complexity] || complexityColor.Starter;

  const renderStars = (rating) => {
    return [1,2,3,4,5].map(i => (
      <span key={i} style={{ color: i <= Math.floor(rating) ? '#f59e0b' : '#e2e8f0', fontSize: '11px' }}>★</span>
    ));
  };

  return (
    <div className="group flex flex-col bg-white rounded-[1.5rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300 hover:-translate-y-1">

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={template.image}
          alt={template.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

        {/* Badges */}
        <div className={`absolute top-3 ${ar ? 'right-3' : 'left-3'} flex flex-col gap-1.5`}>
          <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur text-slate-800 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg shadow-sm">
            {template.category === 'E-Commerce' ? <ShoppingBag size={10} className="text-sky-500"/> : <Building size={10} className="text-sky-500"/>}
            {template.category === 'E-Commerce' ? t.e_commerce : t.portfolio}
          </span>
          {template.badge === 'new' && (
            <span className="bg-sky-500 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg shadow-sm">{t.new_badge}</span>
          )}
          {template.badge === 'hot' && (
            <span className="bg-orange-500 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg shadow-sm">{t.hot_badge} 🔥</span>
          )}
        </div>

        {/* Hover: View Demo button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => onPreview(template)}
            className="flex items-center gap-2.5 bg-white text-slate-900 font-black text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 hover:bg-sky-500 hover:text-white"
          >
            <Play size={14} fill="currentColor"/>
            {t.view_demo}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1 gap-4">

        {/* Header: title + rating */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-black tracking-tight text-slate-900 leading-tight group-hover:text-sky-600 transition-colors">{template.title}</h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            {renderStars(template.rating)}
            <span className="text-[10px] font-bold text-slate-400 ml-1">{template.rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{template.description}</p>

        {/* Stats row */}
        <div className="grid grid-cols-4 divide-x divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
          {[
            { val: `${template.downloads}+`, lbl: t.requests_label },
            { val: template.reviews, lbl: t.reviews_label },
            { val: template.pages.length, lbl: t.pages_label },
            { val: template.time, lbl: t.delivery_label }
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-2.5 px-1 text-center bg-slate-50/50">
              <span className={`font-black text-slate-900 leading-none ${i === 3 ? 'text-[9px]' : 'text-sm'}`}>{s.val}</span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 leading-tight">{s.lbl}</span>
            </div>
          ))}
        </div>

        {/* Pages chips */}
        <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{t.pages_label}</p>
          <div className="flex flex-wrap gap-1.5">
            {template.pages.map((pg, i) => (
              <span key={i} className={`text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-md border ${i < 3 ? 'bg-sky-50 border-sky-200 text-sky-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                {pg}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{t.features_label}</p>
          <div className="grid grid-cols-1 gap-1">
            {template.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-sky-400 flex-shrink-0"/>
                <span className="text-xs text-slate-500 font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech tags */}
        <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{t.stack_label}</p>
          <div className="flex flex-wrap gap-1.5">
            {template.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wide bg-slate-100 text-slate-500 border border-slate-200">
                <Code size={8}/> {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer — View Demo CTA only */}
      <div className="px-6 pb-5 pt-3 border-t border-slate-100 bg-slate-50/60">
        <button
          onClick={() => onPreview(template)}
          className="w-full flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-sky-500 text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-sm"
        >
          <Play size={13} fill="currentColor"/>
          {t.view_demo}
        </button>
      </div>
    </div>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState('en');
  const [page, setPage] = useState('home');
  const [active, setActive] = useState('home');
  const [careers, setCareers] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [consultModal, setConsultModal] = useState(false);
  const [consultStatus, setConsultStatus] = useState(null);
  const [demoStatus, setDemoStatus] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  // Gallery state
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [previewDevice, setPreviewDevice] = useState('desktop');

  const scriptURL = "https://script.google.com/macros/s/AKfycbyqSvxZ8nzURA776SWa-ccrTtO0xmp4-X7z1B64Kzc6SljwfkDE-3W2J5yTngjcZIxpfw/exec";

  const t = T[lang];
  const ar = lang === 'ar';

  useReveal();
  const scrollProgress = useScrollProgress();

  const [heroImgRef, heroImgOffset] = useParallax(0.25);
  const [heroTextRef, heroTextOffset] = useParallax(0.1);

  useEffect(() => {
    if (page !== 'home') return;
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
  }, [page]);

  const go = id => {
    if (id === 'demos') {
      setPage('demos');
      window.scrollTo(0, 0);
      return;
    }
    if (page !== 'home') {
      setPage('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setActive(id);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFileName(file.name);
  };

  const handleForm = async (e, sheet) => {
    e.preventDefault();
    setFormStatus('sending');
    const fd = new FormData(e.target);
    const data = { sheetName: sheet };
    for (let [key, value] of fd.entries()) {
      if (value instanceof File && value.name) {
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(value);
        });
        data[key] = base64;
        data[`${key}_name`] = value.name;
        data[`${key}_data`] = base64;
      } else {
        data[key] = value;
      }
    }
    try {
      await fetch(scriptURL, { method:'POST', mode:'no-cors', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) });
      setFormStatus('success');
      e.target.reset();
      setSelectedFileName('');
      setTimeout(() => setFormStatus(null), 10000);
    } catch(e) { setFormStatus(null); }
  };

  const handleActionForm = async (e, sheet, setter) => {
    e.preventDefault();
    setter('sending');
    const fd = new FormData(e.target);
    const data = { sheetName: sheet };
    fd.forEach((value, key) => { data[key] = value; });
    try {
      await fetch(scriptURL, { method:'POST', mode:'no-cors', body:JSON.stringify(data) });
      setter('success');
      e.target.reset();
      setTimeout(() => setter(null), 10000);
    } catch(e) { setter(null); }
  };

  const stats = [
    { n:'210+', l: t.stats_a, icon:<Zap size={16}/> },
    { n:'18+',  l: t.stats_b, icon:<Binary size={16}/> },
    { n:'14',   l: t.stats_c, icon:<Trophy size={16}/> },
    { n:'25+',  l: t.stats_d, icon:<Users size={16}/> },
  ];

  const filteredTemplates = TEMPLATES.filter(template => {
    const matchesCategory = activeCategory === "All" || template.category === activeCategory;
    const matchesSearch = !searchQuery || template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div dir={ar ? 'rtl' : 'ltr'} className="bg-white text-slate-900 min-h-screen font-sans selection:bg-sky-100 selection:text-sky-700 overflow-x-hidden">

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 z-[200] h-[2px] bg-sky-500 transition-none pointer-events-none" style={{ width:`${scrollProgress * 100}%`, boxShadow:'0 0 8px rgba(14,165,233,0.6)' }}/>

      <Nav lang={lang} setLang={setLang} go={go} active={active} currentPage={page} openCareers={() => setCareers(true)} />

      {page === 'home' ? (
        <>
          {/* ═══ Hero ═══ */}
          <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-slate-900">
            <div className="absolute inset-0 overflow-hidden" ref={heroImgRef}>
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" alt="" className="w-full h-full object-cover opacity-30" style={{ transform:`translateY(${isNaN(heroImgOffset) ? 0 : heroImgOffset}px)`, willChange:'transform' }}/>
              <div className="absolute inset-0" style={{ background:'linear-gradient(135deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.6) 60%, rgba(2,6,23,0.8) 100%)' }}/>
            </div>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-sky-500 z-10 animate-accentPulse"/>
            <div ref={heroTextRef} className="relative z-10 flex-1 flex flex-col justify-end pb-16 sm:pb-24 px-6 sm:px-10 pt-32 max-w-7xl mx-auto w-full" style={{ transform:`translateY(${isNaN(heroTextOffset) ? 0 : heroTextOffset}px)`, willChange:'transform' }}>
              <div className="flex items-center gap-3 mb-8 hero-label">
                <div className="w-5 h-[2px] bg-sky-500"/>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50">{t.hero_label}</span>
              </div>
              <h1>
                <span className="block text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.88] hero-word-1">{t.hero_line1}</span>
                <span className="block text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-sky-400 leading-[0.88] italic hero-word-3">{t.hero_line3}</span>
              </h1>
              <div className="mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
                <p className="max-w-md text-base sm:text-lg text-white/50 leading-relaxed font-medium hero-desc">{t.hero_desc}</p>
                <div className="flex gap-3 flex-shrink-0 hero-btns">
                  <button onClick={() => go('services')} className="px-7 py-3.5 bg-sky-500 hover:bg-sky-400 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-200 active:scale-95 flex items-center gap-2 shadow-lg shadow-sky-500/30">
                    {t.nav_services} <ArrowRight size={14} className={ar ? 'rotate-180' : ''}/>
                  </button>
                  <button onClick={() => go('about')} className="px-7 py-3.5 border border-white/20 hover:border-white/50 text-white/70 hover:text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-200">
                    {t.nav_about}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ About ═══ */}
          <section id="about" className="py-24 sm:py-36 px-6 sm:px-10">
            <div className="max-w-7xl mx-auto">
              <SectionLabel text={t.about_label}/>
              <div className="grid lg:grid-cols-2 gap-16 sm:gap-24 items-start">
                <ScrollRevealText><h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-900"><span className="block">{t.about_title1}</span><span className="block italic text-sky-500">{t.about_title2}</span></h2></ScrollRevealText>
                <div className="reveal space-y-8" style={{ transitionDelay:'100ms' }}>
                  <ParallaxBlock speed={0.06}><p className="text-lg sm:text-xl text-slate-500 leading-relaxed font-medium">{t.about_body}</p></ParallaxBlock>
                  <div className="grid grid-cols-1 gap-4">
                    {[ { icon:<Target size={18}/>, title: t.mission, body: t.mission_body }, { icon:<Eye size={18}/>, title: t.vision, body: t.vision_body } ].map((card, i) => (
                      <TiltCard key={i}>
                        <div className="flex gap-5 p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-sky-100 hover:bg-sky-50/30 transition-colors duration-300 group h-full">
                          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500 flex-shrink-0 shadow-sm transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white">{card.icon}</div>
                          <div><h4 className="font-black text-sm text-slate-900 uppercase tracking-wide mb-1.5">{card.title}</h4><p className="text-sm text-slate-500 leading-relaxed">{card.body}</p></div>
                        </div>
                      </TiltCard>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100 border border-slate-100 rounded-3xl overflow-hidden mt-20 reveal-scale reveal" style={{ transitionDelay:'150ms' }}>
                {stats.map((s, i) => <StatCard key={i} stat={s} delay={i * 120}/>)}
              </div>
            </div>
          </section>

          {/* ═══ Services ═══ */}
          <section id="services" className="py-24 sm:py-36 px-6 sm:px-10 bg-slate-50/50">
            <div className="max-w-7xl mx-auto">
              <SectionLabel text={t.services_label}/>
              <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-end mb-16">
                <ScrollRevealText><h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-900"><span className="block">{t.services_title1}</span><span className="block italic text-sky-500">{t.services_title2}</span></h2></ScrollRevealText>
                <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium reveal" style={{ transitionDelay:'80ms' }}>{t.services_body}</p>
              </div>
              <div className="border-t border-slate-100">
                {SERVICES.map((s, i) => (
                  <ServiceRow
                    key={s.id}
                    s={s}
                    lang={lang}
                    i={i}
                    onBookConsult={s.id === 'business' ? () => setConsultModal(true) : null}
                    onViewDemos={s.id === 'tracking' || s.id === 'web' || s.id === 'mobile' ? () => go('demos') : null}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ═══ Careers CTA ═══ */}
          <section className="py-24 sm:py-36 px-6 sm:px-10 bg-sky-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="reveal">
                <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white leading-tight mb-4">{t.careers_section_title}</h2>
                <p className="text-white/80 text-lg sm:text-xl font-medium max-w-xl">{t.careers_section_body}</p>
              </div>
              <button onClick={() => setCareers(true)} className="px-10 py-5 bg-white text-sky-600 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                {lang === 'ar' ? 'اعرض الفرص المتاحة' : 'View Open Roles'} <Users size={16}/>
              </button>
            </div>
          </section>

          {/* ═══ Events ═══ */}
          <section id="events" className="py-24 sm:py-36 px-6 sm:px-10">
            <div className="max-w-7xl mx-auto">
              <SectionLabel text={t.events_label}/>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
                <h2 className="text-4xl sm:text-7xl font-black tracking-tighter leading-[0.9] reveal">
                  <span className="block text-slate-900">{lang === 'ar' ? t.events_title1 : <LogoText color="#0f172a" className="text-4xl sm:text-7xl"/>}</span>
                  <span className="block italic text-sky-500">{t.events_title2}</span>
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {EVENTS.map((ev, i) => (
                  <div key={ev.id} className="reveal hover-lift group relative overflow-hidden rounded-3xl cursor-default" style={{ transitionDelay:`${i*60}ms` }}>
                    <div className="aspect-square sm:aspect-auto sm:h-72">
                      <ParallaxBlock speed={0.06} className="absolute inset-0 w-full h-full"><img src={ev.img} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110"/></ParallaxBlock>
                      <div className="absolute inset-0 bg-sky-700/0 group-hover:bg-sky-700/10 transition-colors duration-700"/>
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Marquee lang={lang}/>

          {/* ═══ Contact ═══ */}
          <section id="contact" className="py-24 sm:py-36 px-6 sm:px-10 bg-slate-900">
            <div className="max-w-7xl mx-auto">
              <SectionLabel text={t.contact_label} dark/>
              <div className="grid lg:grid-cols-2 gap-16 sm:gap-24 items-start">
                <div className="reveal">
                  <ScrollRevealText dark><h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white"><span className="block">{t.contact_title1}</span><span className="block italic text-sky-400">{t.contact_title2}</span></h2></ScrollRevealText>
                  <p className="mt-8 text-base sm:text-lg text-white/50 leading-relaxed max-w-sm font-medium">{t.contact_body}</p>
                </div>
                <div className="reveal" style={{ transitionDelay:'100ms' }}>
                  {formStatus === 'success' ? (
                    <div className="flex flex-col gap-5 py-8"><div className="w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center shadow-2xl shadow-sky-500/30"><CheckCircle2 size={24} className="text-white"/></div><h3 className="text-3xl font-black text-white tracking-tight">{t.success_title}</h3><p className="text-sm text-white/50 max-w-sm leading-relaxed">{t.success_body}</p></div>
                  ) : (
                    <form className="space-y-9" onSubmit={e => handleForm(e, 'Leads')}>
                      <div className="grid sm:grid-cols-2 gap-9"><Field label={t.name_p} name="name" required dark/><Field label={t.company_p} name="company" dark/></div>
                      <div className="grid sm:grid-cols-2 gap-9"><Field label={t.email_p} name="email" type="email" required dark/><Field label={t.phone_p} name="phone" type="tel" required dark/></div>
                      <Field label={t.service_p} name="service" required dark as="select">{SERVICES.map(s => <option key={s.id} value={s.id} className="text-slate-900 bg-white">{s.title[lang]}</option>)}</Field>
                      <button disabled={formStatus === 'sending'} className="relative w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] text-white bg-sky-500 hover:bg-sky-400 active:bg-sky-600 transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-3 disabled:opacity-40 shadow-xl shadow-sky-500/20 mt-2 overflow-hidden group/btn">
                        <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left rounded-2xl"/>
                        {formStatus === 'sending' ? <><Sparkles size={14} className="animate-spin"/>{t.sending}</> : <span className="relative flex items-center gap-3">{t.submit}<ChevronRight size={14} className={`transition-transform duration-300 group-hover/btn:translate-x-1 ${ar ? 'rotate-180' : ''}`}/></span>}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* ═══ Demos Page ═══ */
        <section className="pt-32 pb-24 px-6 sm:px-10 min-h-screen bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <SectionLabel text={t.demos_label}/>

            <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-end mb-16">
              <ScrollRevealText>
                <h2 className="text-4xl sm:text-7xl font-black tracking-tighter leading-[0.9] text-slate-900">
                  <span className="block">{t.demos_title1}</span>
                  <span className="block italic text-sky-500">{t.demos_title2}</span>
                </h2>
              </ScrollRevealText>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium reveal" style={{ transitionDelay:'80ms' }}>{t.demos_body}</p>
            </div>

            {/* Search */}
            <div className="max-w-2xl mx-auto relative mb-10 shadow-sm rounded-2xl">
              <div className={`absolute inset-y-0 ${ar ? 'right-0 pr-5' : 'left-0 pl-5'} flex items-center pointer-events-none`}>
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder={t.search_placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${ar ? 'pr-12 pl-5' : 'pl-12 pr-5'} py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm font-medium`}
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-5 border-b border-slate-200 pb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hidden lg:block">{t.feat_cat}</span>
              <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 w-full md:w-auto gap-2 sm:gap-3">
                {CATEGORIES.map(category => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  const catLabel = category.id === "All" ? t.all_templates : category.id === "E-Commerce" ? t.e_commerce : t.portfolio;
                  return (
                    <button key={category.id} onClick={() => setActiveCategory(category.id)}
                      className={`whitespace-nowrap flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                        isActive ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20' : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:bg-sky-50'
                      }`}>
                      <Icon size={14} className={isActive ? "text-white" : "text-slate-400"} />
                      {catLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results count */}
            <div className="mb-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {t.showing} {filteredTemplates.length} {t.templates_found}
              {activeCategory !== "All" && <span> {t.in_cat} <span className="text-sky-500">{activeCategory === "E-Commerce" ? t.e_commerce : t.portfolio}</span></span>}
            </div>

            {/* Grid */}
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-200 border-dashed">
                <Search size={32} className="mx-auto text-slate-300 mb-4"/>
                <h3 className="text-xl font-black text-slate-900 mb-2">{t.no_templates}</h3>
                <p className="text-slate-500 max-w-sm mx-auto font-medium text-sm">{t.no_templates_desc}</p>
                <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="mt-6 text-sky-600 font-bold hover:underline text-sm uppercase tracking-wider">
                  {t.clear_filters}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredTemplates.map(template => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    t={t}
                    lang={lang}
                    onPreview={setPreviewTemplate}
                  />
                ))}
              </div>
            )}

            {/* Customization form */}
            <div className="max-w-3xl mx-auto mt-20 py-16 px-8 sm:px-12 rounded-[3rem] bg-white border border-slate-200 shadow-xl reveal">
              {demoStatus === 'success' ? (
                <div className="flex flex-col items-center text-center gap-4 py-12">
                  <div className="w-16 h-16 rounded-3xl bg-sky-500 flex items-center justify-center shadow-xl shadow-sky-500/20"><CheckCircle2 size={32} className="text-white"/></div>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight">{ar ? 'تم الاستلام!' : "Request Received!"}</h4>
                  <p className="text-slate-500 text-sm max-w-xs leading-relaxed">{ar ? 'سيتواصل معك فريقنا التقني لترتيب عرض حي لنظامك المختار.' : 'Our technical team will reach out to arrange a live walkthrough for your chosen system or template.'}</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center shadow-lg"><MonitorPlay size={22} className="text-white"/></div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">{t.demo_form_title}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{ar ? 'تطوير وتخصيص كامل' : 'Full Customization & Development'}</p>
                    </div>
                  </div>
                  <form className="space-y-8" onSubmit={e => handleActionForm(e, 'Demos', setDemoStatus)}>
                    <div className="grid sm:grid-cols-2 gap-8"><Field label={t.name_p} name="name" required/><Field label={t.company_p} name="company"/></div>
                    <div className="grid sm:grid-cols-2 gap-8"><Field label={t.email_p} name="email" type="email" required/><Field label={t.phone_p} name="phone" type="tel" required/></div>
                    <Field label={ar ? 'نوع النظام / القالب' : 'System / Template'} name="system" required as="select">
                      <option value="Template Inquiry" className="text-slate-900">Mantiq Template Customization</option>
                      <option value="CRM" className="text-slate-900">CRM & Tracking System</option>
                      <option value="Sales" className="text-slate-900">E-Commerce System</option>
                      <option value="Finance" className="text-slate-900">Finance App</option>
                      <option value="HR" className="text-slate-900">HR & Management</option>
                    </Field>
                    <button disabled={demoStatus === 'sending'} className="w-full py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white bg-slate-900 hover:bg-sky-600 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl">
                      {demoStatus === 'sending' ? <Sparkles size={14} className="animate-spin"/> : <span className="flex items-center gap-2">{t.demo_form_btn} <ArrowRight size={14} className={ar ? 'rotate-180' : ''}/></span>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══ Footer ═══ */}
      <footer className="py-12 sm:py-16 px-6 sm:px-10 border-t border-slate-100 bg-white reveal z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <div className="mb-3">{lang === 'ar' ? <span className="font-normal text-xl tracking-[0.18em] uppercase text-slate-900">{t.logo}</span> : <LogoText className="font-normal text-xl tracking-[0.18em] uppercase" color="#0f172a"/>}</div>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">{t.footer_desc}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
            <button onClick={() => setCareers(true)} className="text-sky-500 hover:text-sky-600 font-black text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1.5"><Users size={11}/> {t.careers}</button>
            <div className="flex items-center gap-3">
              {[ { Icon: Facebook, url: 'https://www.facebook.com/share/1Dss3Eqybc' }, { Icon: Linkedin, url: 'https://www.linkedin.com/company/mantiq.services' }, { Icon: Mail, url: 'mailto:hello@mantiq.services' } ].map(({ Icon, url }, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-sky-100 bg-sky-50 flex items-center justify-center text-sky-500 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:-translate-y-1 transition-all duration-200" style={{ transitionDelay:`${i * 40}ms` }}><Icon size={14}/></a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ═══ Full-screen Preview Modal ═══ */}
      {previewTemplate && (
        <div className="fixed inset-0 z-[300] flex flex-col bg-slate-900 overflow-hidden animate-fadeIn" dir={ar ? 'rtl' : 'ltr'}>
          {/* Header */}
          <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 shrink-0 z-10">
            <div className="flex items-center gap-3 text-white">
              <h3 className="font-bold text-base hidden sm:block tracking-tight">{previewTemplate.title}</h3>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-[9px] uppercase tracking-widest font-bold border border-slate-700">
                {previewTemplate.category === "E-Commerce" ? t.e_commerce : t.portfolio}
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Device toggle */}
              <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
                <button onClick={() => setPreviewDevice('desktop')} className={`p-1.5 rounded-md transition-colors ${previewDevice === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`} title="Desktop">
                  <Monitor size={17}/>
                </button>
                <button onClick={() => setPreviewDevice('mobile')} className={`p-1.5 rounded-md transition-colors ${previewDevice === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`} title="Mobile">
                  <Smartphone size={17}/>
                </button>
              </div>
              <div className="w-px h-6 bg-slate-700 hidden sm:block"/>
              <button onClick={() => setPreviewTemplate(null)} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg">
                <span className="hidden sm:inline text-xs uppercase tracking-widest font-bold">{t.close_preview}</span>
                <X size={17}/>
              </button>
            </div>
          </div>

          {/* Iframe area */}
          <div className="flex-1 bg-slate-950 flex justify-center items-start overflow-auto p-4 sm:p-8" dir="ltr">
            <div className={`bg-white transition-all duration-300 ease-in-out shadow-2xl ${
              previewDevice === 'desktop'
                ? 'w-full h-full rounded-2xl'
                : 'w-[375px] h-[812px] rounded-[3rem] border-[14px] border-slate-800 overflow-hidden shrink-0 mt-4 sm:mt-0'
            }`}>
              <iframe
                srcDoc={generateDummyTemplate(previewTemplate)}
                className="w-full h-full border-0"
                title={`${previewTemplate.title} Preview`}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>
      )}

      {/* ═══ Consultation Modal ═══ */}
      {consultModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xl" onClick={() => setConsultModal(false)}/>
          <div className="relative w-full max-w-xl bg-white rounded-[2rem] p-8 sm:p-12 shadow-2xl animate-zoomIn" dir={ar ? 'rtl' : 'ltr'}>
            <button onClick={() => setConsultModal(false)} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all"><X size={16}/></button>
            {consultStatus === 'success' ? (
              <div className="flex flex-col items-center text-center gap-5 py-12">
                <div className="w-16 h-16 rounded-3xl bg-sky-500 flex items-center justify-center shadow-xl shadow-sky-500/20 animate-bounce"><CheckCircle2 size={32} className="text-white"/></div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{ar ? 'تم تأكيد طلبك' : 'Strategy Request Sent'}</h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">{ar ? 'سيتواصل معك مستشارنا الاستراتيجي خلال يوم عمل واحد.' : 'Our strategic consultant will contact you within one business day.'}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-lg"><CalendarCheck size={24}/></div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">{t.consult_title}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-sky-600">{ar ? 'جلسة استراتيجية — $20' : 'Strategic Business Session'}</p>
                  </div>
                </div>
                <form className="space-y-8" onSubmit={e => handleActionForm(e, 'Consultations', setConsultStatus)}>
                  <div className="grid sm:grid-cols-2 gap-8"><Field label="Name" name="name" required/><Field label="Organization" name="company"/></div>
                  <div className="grid sm:grid-cols-2 gap-8"><Field label="Email" name="email" type="email" required/><Field label="Phone" name="phone" type="tel" required/></div>
                  <button disabled={consultStatus === 'sending'} className="w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] text-white bg-slate-900 hover:bg-sky-500 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                    {consultStatus === 'sending' ? <Sparkles size={14} className="animate-spin"/> : <>{t.consult_btn} <ArrowRight size={14} className={ar ? 'rotate-180' : ''}/></>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══ Careers Modal ═══ */}
      {careers && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xl" onClick={() => setCareers(false)}/>
          <div className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-zoomIn" dir={ar ? 'rtl' : 'ltr'}>
            <div className="hidden md:flex md:w-5/12 flex-col justify-between p-12 bg-slate-900">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center mb-8"><Briefcase size={18} className="text-white"/></div>
                <h2 className="text-4xl font-black tracking-tighter text-white leading-tight mb-4">{t.join_title}</h2>
                <p className="text-sm text-white/50 leading-relaxed">{t.career_body}</p>
              </div>
              <div className="space-y-4">
                {[ { icon:<Lightbulb size={14}/>, label: t.val_1 }, { icon:<Target size={14}/>, label: t.val_2 }, { icon:<Rocket size={14}/>, label: t.val_3 } ].map((v, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/60"><div className="text-sky-400">{v.icon}</div><span className="text-xs font-bold uppercase tracking-wide">{v.label}</span></div>
                ))}
              </div>
            </div>
            <div className="flex-1 p-8 sm:p-12 relative overflow-y-auto max-h-[90vh]">
              <button onClick={() => setCareers(false)} className="absolute top-5 right-5 w-9 h-9 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all z-20"><X size={16}/></button>
              {formStatus === 'success' ? (
                <div className="flex flex-col gap-5 py-6">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center"><CheckCircle2 size={22} className="text-white"/></div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{t.success_title}</h3>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">{t.join_title}</h3>
                  <form className="space-y-8" onSubmit={e => handleForm(e, 'Work')}>
                    <div className="grid sm:grid-cols-2 gap-8">
                      <Field label={t.name_p} name="name" required/>
                      <Field label={t.email_p} name="email" type="email" required/>
                    </div>
                    <Field label={t.exp_brief_p} name="brief" required as="textarea" />
                    <div className="relative group">
                      <label className="absolute -top-5 text-[9px] tracking-[0.2em] font-bold uppercase text-sky-600">{t.cv_link}</label>
                      <div className="relative mt-2">
                        <input type="file" name="cv_file" id="cv_file" accept=".pdf,.doc,.docx" required onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                        <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl py-6 px-4 flex flex-col items-center justify-center gap-2 group-hover:border-sky-300 group-hover:bg-sky-50 transition-all">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-sky-500 shadow-sm transition-colors"><Upload size={18}/></div>
                          <span className="text-xs font-bold text-slate-500 text-center">{selectedFileName || (lang === 'ar' ? 'اسحب الملف هنا أو اضغط للرفع' : 'Drop your CV here or click to upload')}</span>
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest">PDF, DOC (MAX 2MB)</span>
                        </div>
                      </div>
                    </div>
                    <button disabled={formStatus === 'sending'} className="w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] text-white bg-slate-900 flex items-center justify-center gap-3 mt-4">
                      {formStatus === 'sending' ? <><Sparkles size={14} className="animate-spin"/>{t.sending}</> : <>{t.apply}<ChevronRight size={14} className={ar ? 'rotate-180' : ''}/></>}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── Global Styles ─── */}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/now');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700;900&display=swap');

        * { box-sizing: border-box; scrollbar-width: none; -ms-overflow-style: none; }
        *::-webkit-scrollbar { display: none; }
        html { scroll-behavior: smooth; }
        body { margin: 0; overflow-x: hidden; font-family: 'Now', sans-serif; }
        [dir="rtl"], [dir="rtl"] h1, [dir="rtl"] h2 { font-family: 'Noto Sans Arabic', sans-serif; }

        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        .animate-marquee { animation: marquee 50s linear infinite; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }

        .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .rv { opacity: 1 !important; transform: translateY(0) !important; pointer-events: auto; }

        .hover-lift { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .hover-lift:hover { transform: translateY(-4px); }

        .service-line { position: relative; overflow: hidden; }
        .service-line::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: #0ea5e9; transform: scaleX(0); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); transform-origin: left; }
        .service-line:hover::after { transform: scaleX(1); }

        .hero-word-1 { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0ms forwards; opacity:0; }
        .hero-word-3 { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 240ms forwards; opacity:0; }
        .hero-label { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0ms forwards; opacity:0; }
        .hero-desc { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 360ms forwards; opacity:0; }
        .hero-btns { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 480ms forwards; opacity:0; }

        @keyframes buttonEntry { from { opacity: 0; transform: scale(0.9) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .animate-buttonEntry { animation: buttonEntry 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease forwards; }

        @keyframes zoomIn { from { opacity:0; transform:scale(0.95) translateY(16px); } to { opacity:1; transform:scale(1) translateY(0); } }
        .animate-zoomIn { animation: zoomIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards; }

        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}
