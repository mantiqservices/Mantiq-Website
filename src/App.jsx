import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────────
const CUSTOMERS = [
  "EL ASEEL Development","Omar Gharib","ETMAM","ALSAIF ANALYSIS",
  "ELBEDAYA","PE","RESPRESSO","COVER SPORE","SIMCO","MIRROR",
  "ALMUHANDIS INDUSTRIES","NOURGEOUS ACCESSORIES","NAQLA",
  "START MART","CREATIVO","ALPHA ACADEMY","VARM","ART FURNITURE"
];

const SERVICES = [
  {
    id: "business", num: "01",
    title: "Business Development",
    sub: "Growth Architecture",
    desc: "We engineer strategic growth paths by identifying untapped market opportunities, building B2B pipelines, and optimizing internal operations for maximum velocity.",
    tags: ["Strategic Planning","B2B Leads","Data Analytics","Consultancy"],
    accent: "#C9A84C",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "tracking", num: "02",
    title: "Tracking Systems",
    sub: "Digital Infrastructure",
    desc: "Transform raw data into powerful operational ecosystems. Custom CRM, financial tracking, HR systems, and intelligent workflow automation built for scale.",
    tags: ["CRM Systems","Finance Trackers","HR Systems","Flow Automation"],
    accent: "#7C9ECC",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "web", num: "03",
    title: "Websites",
    sub: "Digital Presence",
    desc: "We build digital frontends that work as your best salesperson — engineered for performance, SEO dominance, and conversion at every touchpoint.",
    tags: ["E-commerce","Company Profile","Technical SEO","Usability Design"],
    accent: "#6EC99B",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "mobile", num: "04",
    title: "Mobile Apps",
    sub: "Native Experiences",
    desc: "Native mobile applications built for today's mobile-first generation, integrating advanced AI logic and frictionless payment flows on iOS and Android.",
    tags: ["UI/UX Design","iOS & Android","AI Integrations","Payment Gateways"],
    accent: "#D4845A",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
  }
];

const EVENTS = [
  { id:1, title:"Enactus Event", year:"2024", img:"https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=900" },
  { id:2, title:"AIESEC Event", year:"2024", img:"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=900" },
  { id:3, title:"Pe Launching Event", year:"2024", img:"https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=900" },
];

const STATS = [
  { n:"210+", label:"Completed Services" },
  { n:"18+",  label:"Managed Projects" },
  { n:"14",   label:"Launched Ventures" },
  { n:"25+",  label:"Intern Experts" },
];

// ─── HOOKS ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return { pos, hovered, setHovered };
}

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

function Cursor({ pos, hovered }) {
  return (
    <>
      <div style={{
        position:"fixed", left:pos.x, top:pos.y, width: hovered ? 48 : 12, height: hovered ? 48 : 12,
        borderRadius:"50%", background:"#C9A84C", transform:"translate(-50%,-50%)",
        pointerEvents:"none", zIndex:9999, transition:"width .3s,height .3s,opacity .3s",
        mixBlendMode:"difference", opacity: 0.9
      }} />
      <div style={{
        position:"fixed", left:pos.x, top:pos.y, width:40, height:40,
        borderRadius:"50%", border:"1px solid rgba(201,168,76,0.4)", transform:"translate(-50%,-50%)",
        pointerEvents:"none", zIndex:9998, transition:"left .12s,top .12s"
      }} />
    </>
  );
}

function Reveal({ children, delay = 0, y = 40, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.9s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}ms`
    }}>
      {children}
    </div>
  );
}

function SplitText({ text, className = "", baseDelay = 0 }) {
  const [ref, inView] = useInView(0.1);
  return (
    <span ref={ref} className={className} style={{ display:"block", overflow:"hidden" }}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{
          display:"inline-block",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(100%)",
          transition: `opacity 0.7s ease ${baseDelay + i * 30}ms, transform 0.7s cubic-bezier(.16,1,.3,1) ${baseDelay + i * 30}ms`,
          whiteSpace: ch === " " ? "pre" : "normal"
        }}>{ch}</span>
      ))}
    </span>
  );
}

function GoldLine({ width = 60, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      height: 2, width: inView ? width : 0, background: "linear-gradient(90deg,#C9A84C,#F0D080)",
      transition: `width 1s cubic-bezier(.16,1,.3,1) ${delay}ms`, marginBottom: 32
    }} />
  );
}

// ─── NAV ───────────────────────────────────────────────────────────────────────
function Nav({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(id); setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:500,
        padding: scrolled ? "14px 48px" : "22px 48px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background: scrolled ? "rgba(6,5,3,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "none",
        transition:"all .5s ease"
      }}>
        {/* Logo */}
        <button onClick={() => go("hero")} style={{ display:"flex",alignItems:"center",gap:10,background:"none",border:"none",cursor:"pointer" }}>
          <svg width="32" height="40" viewBox="0 0 400 500" fill="none" stroke="#C9A84C" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="200" cy="200" r="150"/>
            <path d="M320,430 C270,430 200,400 200,320 L200,140 M140,200 L200,140 L260,200"/>
          </svg>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:"#F5EDD6", letterSpacing:4, textTransform:"uppercase" }}>Mantiq</span>
        </button>

        {/* Desktop links */}
        <div style={{ display:"flex", gap:40, alignItems:"center" }} className="desk-nav">
          {["about","services","events","contact"].map(id => (
            <button key={id} onClick={() => go(id)} style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600, letterSpacing:3,
              textTransform:"uppercase", color: active===id ? "#C9A84C" : "rgba(245,237,214,0.55)",
              background:"none", border:"none", cursor:"pointer", transition:"color .3s",
              borderBottom: active===id ? "1px solid #C9A84C" : "1px solid transparent", paddingBottom:2
            }}>{id}</button>
          ))}
          <button onClick={() => go("contact")} style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700, letterSpacing:3,
            textTransform:"uppercase", color:"#0A0804", background:"#C9A84C",
            border:"none", cursor:"pointer", padding:"10px 24px", borderRadius:2,
            transition:"transform .2s,background .2s"
          }} onMouseEnter={e=>e.target.style.background="#F0D080"} onMouseLeave={e=>e.target.style.background="#C9A84C"}>
            Get Started
          </button>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="mob-nav" style={{ background:"none",border:"none",cursor:"pointer",display:"none",flexDirection:"column",gap:5,padding:4 }}>
          {[0,1,2].map(i => <div key={i} style={{ width:26,height:2,background:"#C9A84C",transition:"all .3s",
            transform: menuOpen ? (i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"") : "none",
            opacity: menuOpen && i===1 ? 0 : 1 }} />)}
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position:"fixed", inset:0, zIndex:490, background:"rgba(6,5,3,0.97)",
        backdropFilter:"blur(30px)", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", gap:32,
        opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none",
        transition:"opacity .5s ease"
      }}>
        {["hero","about","services","events","contact"].map((id,i) => (
          <button key={id} onClick={() => go(id)} style={{
            fontFamily:"'Cormorant Garamond',serif", fontSize:40, fontWeight:300,
            color:"#F5EDD6", background:"none", border:"none", cursor:"pointer",
            letterSpacing:4, transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            opacity: menuOpen ? 1 : 0, transition:`all .5s ease ${i*80}ms`,
            textTransform:"capitalize"
          }}>{id}</button>
        ))}
      </div>

      <style>{`
        @media(max-width:768px){.desk-nav{display:none!important}.mob-nav{display:flex!important}}
      `}</style>
    </>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero({ setActive }) {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const handleMouse = useCallback((e) => {
    setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setActive(id); };

  return (
    <section id="hero" onMouseMove={handleMouse} style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      position:"relative", overflow:"hidden", background:"#060503"
    }}>
      {/* Parallax grain bg */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`radial-gradient(ellipse 80% 60% at ${mousePos.x*100}% ${mousePos.y*100}%, rgba(201,168,76,0.08) 0%, transparent 70%)`,
        transition:"background-image 0.1s", pointerEvents:"none"
      }}/>
      {/* Grid */}
      <div style={{
        position:"absolute", inset:0, opacity:0.04,
        backgroundImage:"linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)",
        backgroundSize:"80px 80px"
      }}/>
      {/* Glow orbs */}
      <div style={{ position:"absolute", top:"20%", left:"10%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(201,168,76,0.06),transparent 70%)", animation:"orb1 12s ease-in-out infinite alternate" }}/>
      <div style={{ position:"absolute", bottom:"15%", right:"8%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,158,204,0.07),transparent 70%)", animation:"orb2 15s ease-in-out infinite alternate-reverse" }}/>

      <div style={{ position:"relative", zIndex:10, textAlign:"center", padding:"0 24px", maxWidth:1100, margin:"0 auto" }}>
        {/* Badge */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:10,
          border:"1px solid rgba(201,168,76,0.3)", padding:"8px 20px", borderRadius:2,
          marginBottom:48,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(-20px)",
          transition:"all 1s ease 0.2s"
        }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#C9A84C", animation:"pulse 2s ease-in-out infinite" }}/>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, letterSpacing:5, color:"#C9A84C", textTransform:"uppercase", fontWeight:600 }}>Business Services — Est. 2023</span>
        </div>

        {/* Main heading */}
        <h1 style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(52px,10vw,140px)",
          fontWeight:300, lineHeight:0.9, color:"#F5EDD6",
          letterSpacing:-2, marginBottom:16,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(60px)",
          transition:"all 1.2s cubic-bezier(.16,1,.3,1) 0.4s"
        }}>
          The Path<br/>
          <em style={{ color:"#C9A84C", fontStyle:"italic" }}>You Should</em><br/>
          Take.
        </h1>

        <p style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(15px,2vw,19px)",
          color:"rgba(245,237,214,0.5)", maxWidth:520, margin:"32px auto 52px",
          lineHeight:1.8, fontWeight:300,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition:"all 1s ease 0.8s"
        }}>
          Empowering success through market knowledge, digital solutions, and strategic clarity for ambitious businesses.
        </p>

        {/* CTAs */}
        <div style={{
          display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition:"all 1s ease 1s"
        }}>
          <button onClick={() => go("services")} style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700, letterSpacing:3,
            textTransform:"uppercase", color:"#0A0804", background:"#C9A84C",
            border:"none", cursor:"pointer", padding:"16px 40px", borderRadius:2,
            transition:"all .25s"
          }} onMouseEnter={e=>{e.target.style.transform="scale(1.04)";e.target.style.background="#F0D080"}}
             onMouseLeave={e=>{e.target.style.transform="scale(1)";e.target.style.background="#C9A84C"}}>
            Explore Services
          </button>
          <button onClick={() => go("about")} style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700, letterSpacing:3,
            textTransform:"uppercase", color:"#C9A84C",
            background:"transparent", border:"1px solid rgba(201,168,76,0.35)",
            cursor:"pointer", padding:"16px 40px", borderRadius:2, transition:"all .25s"
          }} onMouseEnter={e=>{e.target.style.borderColor="#C9A84C";e.target.style.background="rgba(201,168,76,0.05)"}}
             onMouseLeave={e=>{e.target.style.borderColor="rgba(201,168,76,0.35)";e.target.style.background="transparent"}}>
            Our Story
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={{
          marginTop:80, display:"flex", flexDirection:"column", alignItems:"center", gap:8,
          opacity: loaded ? 0.5 : 0, transition:"opacity 1s ease 1.4s"
        }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9, letterSpacing:4, color:"#C9A84C", textTransform:"uppercase" }}>Scroll</span>
          <div style={{ width:1, height:48, background:"linear-gradient(180deg,#C9A84C,transparent)", animation:"scrollLine 2s ease-in-out infinite" }}/>
        </div>
      </div>

      {/* Corner decorations */}
      <div style={{ position:"absolute", top:80, left:40, width:60, height:60, borderTop:"1px solid rgba(201,168,76,0.3)", borderLeft:"1px solid rgba(201,168,76,0.3)", opacity: loaded ? 1 : 0, transition:"opacity 1s ease 1.5s" }}/>
      <div style={{ position:"absolute", top:80, right:40, width:60, height:60, borderTop:"1px solid rgba(201,168,76,0.3)", borderRight:"1px solid rgba(201,168,76,0.3)", opacity: loaded ? 1 : 0, transition:"opacity 1s ease 1.5s" }}/>
      <div style={{ position:"absolute", bottom:80, left:40, width:60, height:60, borderBottom:"1px solid rgba(201,168,76,0.3)", borderLeft:"1px solid rgba(201,168,76,0.3)", opacity: loaded ? 1 : 0, transition:"opacity 1s ease 1.5s" }}/>
      <div style={{ position:"absolute", bottom:80, right:40, width:60, height:60, borderBottom:"1px solid rgba(201,168,76,0.3)", borderRight:"1px solid rgba(201,168,76,0.3)", opacity: loaded ? 1 : 0, transition:"opacity 1s ease 1.5s" }}/>
    </section>
  );
}

// ─── MARQUEE ───────────────────────────────────────────────────────────────────
function Marquee() {
  const doubled = [...CUSTOMERS, ...CUSTOMERS];
  return (
    <div style={{ background:"#0E0C08", borderTop:"1px solid rgba(201,168,76,0.1)", borderBottom:"1px solid rgba(201,168,76,0.1)", padding:"18px 0", overflow:"hidden" }}>
      <div style={{ display:"flex", gap:40, animation:"marqueeX 22s linear infinite", whiteSpace:"nowrap" }}>
        {doubled.map((name, i) => (
          <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:20 }}>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, letterSpacing:4, color:"rgba(201,168,76,0.55)", textTransform:"uppercase", fontWeight:600 }}>{name}</span>
            <span style={{ color:"rgba(201,168,76,0.25)", fontSize:14 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ background:"#060503", padding:"140px 48px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:100, alignItems:"center" }} className="about-grid">
          {/* Left */}
          <div>
            <Reveal delay={0}>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, letterSpacing:5, color:"#C9A84C", textTransform:"uppercase", marginBottom:20, fontWeight:600 }}>About Mantiq</p>
            </Reveal>
            <GoldLine width={48} delay={100} />
            <Reveal delay={150}>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,5vw,72px)", fontWeight:300, color:"#F5EDD6", lineHeight:1.05, letterSpacing:-1, marginBottom:32 }}>
                Where Business Wisdom Meets Digital Excellence
              </h2>
            </Reveal>
            <Reveal delay={250}>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:16, color:"rgba(245,237,214,0.5)", lineHeight:1.9, marginBottom:24, fontWeight:300 }}>
                Established in July 2023, Mantiq was born from a simple belief: that businesses deserve partners who understand both the human side of commerce and the precision of digital systems.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:16, color:"rgba(245,237,214,0.5)", lineHeight:1.9, fontWeight:300 }}>
                We bridge the gap — translating ambitious visions into measurable growth, structured operations, and lasting digital presence.
              </p>
            </Reveal>

            <div style={{ marginTop:48, display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
              {[
                { icon:"◎", title:"Our Mission", text:"Helping businesses grow smarter, operate faster, and compete stronger in a digital-first world." },
                { icon:"◈", title:"Our Vision", text:"To become the trusted digital partner for businesses seeking technological excellence and operational clarity." }
              ].map((item,i) => (
                <Reveal key={i} delay={400 + i*100}>
                  <div style={{ padding:"24px", border:"1px solid rgba(201,168,76,0.12)", borderRadius:2, transition:"border-color .3s,background .3s", cursor:"default" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(201,168,76,0.35)";e.currentTarget.style.background="rgba(201,168,76,0.03)"}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(201,168,76,0.12)";e.currentTarget.style.background="transparent"}}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:"#C9A84C", marginBottom:10 }}>{item.icon}</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700, letterSpacing:3, color:"#F5EDD6", textTransform:"uppercase", marginBottom:8 }}>{item.title}</div>
                    <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(245,237,214,0.45)", lineHeight:1.7, fontWeight:300 }}>{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right — Stats */}
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
              {STATS.map((s, i) => (
                <Reveal key={i} delay={i * 120}>
                  <div style={{
                    padding:"52px 36px", background: i % 2 === 0 ? "#0E0C08" : "#100E09",
                    border:"1px solid rgba(201,168,76,0.07)",
                    transition:"background .4s,border-color .4s", cursor:"default"
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(201,168,76,0.04)";e.currentTarget.style.borderColor="rgba(201,168,76,0.25)"}}
                    onMouseLeave={e=>{e.currentTarget.style.background=i%2===0?"#0E0C08":"#100E09";e.currentTarget.style.borderColor="rgba(201,168,76,0.07)"}}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:64, fontWeight:300, color:"#C9A84C", lineHeight:1, marginBottom:12 }}>{s.n}</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, letterSpacing:4, color:"rgba(245,237,214,0.35)", textTransform:"uppercase", fontWeight:600 }}>{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={500}>
              <div style={{ marginTop:2, padding:"28px 36px", background:"#C9A84C", border:"none" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:"#0A0804", fontStyle:"italic", fontWeight:500, lineHeight:1.5 }}>
                  "Helping Egyptian businesses compete on the global stage."
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.about-grid{grid-template-columns:1fr!important;gap:60px!important}}`}</style>
    </section>
  );
}

// ─── SERVICES ──────────────────────────────────────────────────────────────────
function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = SERVICES[activeIdx];

  return (
    <section id="services" style={{ background:"#060503", padding:"120px 0", overflow:"hidden" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px" }}>
        <Reveal>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, letterSpacing:5, color:"#C9A84C", textTransform:"uppercase", marginBottom:20, fontWeight:600 }}>What We Do</p>
        </Reveal>
        <GoldLine width={48} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:80, flexWrap:"wrap", gap:20 }}>
          <Reveal>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(40px,6vw,80px)", fontWeight:300, color:"#F5EDD6", lineHeight:1, letterSpacing:-1 }}>
              Strategic<br/><em style={{ color:"#C9A84C" }}>Solutions</em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"rgba(245,237,214,0.4)", maxWidth:320, lineHeight:1.8, fontWeight:300 }}>
              Four integrated service pillars engineered to transform your business from the inside out.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Service selector tabs */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px", display:"flex", gap:2, marginBottom:4 }} className="svc-tabs">
        {SERVICES.map((s, i) => (
          <button key={s.id} onClick={() => setActiveIdx(i)} style={{
            flex:1, padding:"18px 12px", background: activeIdx===i ? "#C9A84C" : "#0E0C08",
            border:"1px solid rgba(201,168,76,0.1)",
            fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:700, letterSpacing:3,
            color: activeIdx===i ? "#0A0804" : "rgba(245,237,214,0.4)",
            textTransform:"uppercase", cursor:"pointer", transition:"all .35s"
          }}>{s.title}</button>
        ))}
      </div>

      {/* Active service panel */}
      <div key={active.id} style={{
        maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr",
        border:"1px solid rgba(201,168,76,0.1)", animation:"fadeInUp .5s ease"
      }} className="svc-panel">
        {/* Image */}
        <div style={{ position:"relative", overflow:"hidden", minHeight:480 }}>
          <img src={active.img} alt={active.title} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", position:"absolute", inset:0, transition:"transform .8s ease" }}
            onMouseEnter={e=>e.target.style.transform="scale(1.05)"}
            onMouseLeave={e=>e.target.style.transform="scale(1)"}
            onError={e=>{e.target.src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"}}
          />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(6,5,3,0.6),rgba(6,5,3,0.2))" }}/>
          <div style={{ position:"absolute", top:32, left:32 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:64, fontWeight:300, color:"rgba(201,168,76,0.25)", lineHeight:1 }}>{active.num}</div>
          </div>
          <div style={{ position:"absolute", bottom:32, left:32 }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9, letterSpacing:4, color:"#C9A84C", textTransform:"uppercase", marginBottom:6 }}>{active.sub}</div>
            <div style={{ width:40, height:1, background:"#C9A84C" }}/>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding:"52px 52px", background:"#0E0C08", display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:42, fontWeight:300, color:"#F5EDD6", lineHeight:1.1, marginBottom:24 }}>{active.title}</h3>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:15, color:"rgba(245,237,214,0.5)", lineHeight:1.85, fontWeight:300, marginBottom:36 }}>{active.desc}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {active.tags.map((tag,i) => (
              <span key={i} style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:700, letterSpacing:3,
                textTransform:"uppercase", padding:"8px 16px",
                border:`1px solid ${active.accent}44`, color:active.accent, borderRadius:1
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){.svc-panel{grid-template-columns:1fr!important}.svc-tabs{flex-direction:column!important}}
      `}</style>
    </section>
  );
}

// ─── EVENTS ────────────────────────────────────────────────────────────────────
function Events() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="events" style={{ background:"#0A0804", padding:"140px 48px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <Reveal>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, letterSpacing:5, color:"#C9A84C", textTransform:"uppercase", marginBottom:20, fontWeight:600 }}>Mantiq on the Ground</p>
        </Reveal>
        <GoldLine width={48} />
        <Reveal delay={100}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,5.5vw,76px)", fontWeight:300, color:"#F5EDD6", lineHeight:1.05, letterSpacing:-1, marginBottom:80 }}>
            Where We've<br/><em style={{ color:"#C9A84C" }}>Participated</em>
          </h2>
        </Reveal>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:3 }} className="evt-grid">
          {EVENTS.map((ev, i) => (
            <Reveal key={ev.id} delay={i * 150}>
              <div
                style={{ position:"relative", overflow:"hidden", cursor:"pointer", aspectRatio:"3/4" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <img src={ev.img} alt={ev.title} style={{
                  width:"100%", height:"100%", objectFit:"cover",
                  transform: hovered===i ? "scale(1.08)" : "scale(1)",
                  transition:"transform .8s cubic-bezier(.16,1,.3,1)",
                  filter: hovered===i ? "brightness(0.75)" : "brightness(0.55)"
                }} onError={e=>{e.target.src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=900"}} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(6,5,3,0.9) 0%,transparent 50%)" }}/>

                {/* Number */}
                <div style={{
                  position:"absolute", top:20, right:20,
                  fontFamily:"'Cormorant Garamond',serif", fontSize:52, fontWeight:300,
                  color:"rgba(201,168,76,0.2)", lineHeight:1,
                  transform: hovered===i ? "translateY(-5px)" : "translateY(0)", transition:"transform .5s"
                }}>0{ev.id}</div>

                {/* Info */}
                <div style={{
                  position:"absolute", bottom:0, left:0, right:0, padding:"28px 24px",
                  transform: hovered===i ? "translateY(-8px)" : "translateY(0)", transition:"transform .5s ease"
                }}>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9, letterSpacing:4, color:"#C9A84C", textTransform:"uppercase", marginBottom:6 }}>{ev.year}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:400, color:"#F5EDD6", lineHeight:1.2 }}>{ev.title}</div>
                  <div style={{
                    width: hovered===i ? 40 : 0, height:1, background:"#C9A84C",
                    marginTop:12, transition:"width .5s ease .1s"
                  }}/>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.evt-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ─── CONTACT ───────────────────────────────────────────────────────────────────
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyqSvxZ8nzURA776SWa-ccrTtO0xmp4-X7z1B64Kzc6SljwfkDE-3W2J5yTngjcZIxpfw/exec";

function Contact() {
  const [status, setStatus] = useState(null);
  const [focused, setFocused] = useState(null);

  const inputStyle = (name) => ({
    width:"100%", padding:"16px 0", background:"transparent",
    border:"none", borderBottom:`1px solid ${focused===name ? "#C9A84C" : "rgba(201,168,76,0.2)"}`,
    color:"#F5EDD6", fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:300,
    outline:"none", transition:"border-color .3s", boxSizing:"border-box"
  });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.target);
    const data = { sheetName:"Leads", Name:fd.get("name"), Email:fd.get("email"), Phone:fd.get("phone"), Company:fd.get("company"), Service:fd.get("service"), CV_Link:"" };
    try {
      await fetch(SCRIPT_URL, { method:"POST", mode:"no-cors", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) });
      setStatus("success"); e.target.reset();
    } catch { setStatus("error"); }
  };

  return (
    <section id="contact" style={{ background:"#060503", padding:"140px 48px", position:"relative", overflow:"hidden" }}>
      {/* Decorative gold vertical line */}
      <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:1, background:"linear-gradient(180deg,transparent,rgba(201,168,76,0.08),transparent)", pointerEvents:"none" }}/>

      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:80 }}>
          <Reveal>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, letterSpacing:5, color:"#C9A84C", textTransform:"uppercase", marginBottom:20, fontWeight:600 }}>Begin the Conversation</p>
          </Reveal>
          <GoldLine width={48} delay={100} />
          <Reveal delay={150}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(40px,6vw,88px)", fontWeight:300, color:"#F5EDD6", lineHeight:1, letterSpacing:-1 }}>
              Let's<br/><em style={{ color:"#C9A84C" }}>Build.</em>
            </h2>
          </Reveal>
          <Reveal delay={250}>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:15, color:"rgba(245,237,214,0.4)", marginTop:20, lineHeight:1.7, fontWeight:300 }}>
              Share your vision. Our strategy team responds within 24 hours.
            </p>
          </Reveal>
        </div>

        {status === "success" ? (
          <Reveal>
            <div style={{ textAlign:"center", padding:"80px 40px", border:"1px solid rgba(201,168,76,0.2)" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:72, color:"#C9A84C", marginBottom:16 }}>✦</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:42, fontWeight:300, color:"#F5EDD6", marginBottom:16 }}>Mission Accepted</h3>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"rgba(245,237,214,0.45)", lineHeight:1.8, maxWidth:400, margin:"0 auto 32px", fontWeight:300 }}>Your vision is now on our radar. Our strategy team will reach out within 24 hours.</p>
              <button onClick={() => setStatus(null)} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, letterSpacing:4, textTransform:"uppercase", color:"#C9A84C", background:"transparent", border:"1px solid rgba(201,168,76,0.3)", padding:"12px 28px", cursor:"pointer" }}>Send Another</button>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={200}>
            <form onSubmit={submit} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 48px" }} className="contact-form">
              {[
                ["Name","name","text",true],
                ["Company","company","text",false],
                ["Email","email","email",true],
                ["Phone","phone","tel",true]
              ].map(([ph,name,type,req]) => (
                <div key={name} style={{ marginBottom:36 }}>
                  <input required={req} name={name} type={type} placeholder={ph}
                    onFocus={() => setFocused(name)} onBlur={() => setFocused(null)}
                    style={inputStyle(name)}
                  />
                </div>
              ))}
              <div style={{ gridColumn:"1/-1", marginBottom:36 }}>
                <select name="service" onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}
                  style={{ ...inputStyle("service"), cursor:"pointer" }}>
                  <option value="" style={{ background:"#0A0804" }}>Select a Service</option>
                  {SERVICES.map(s => <option key={s.id} value={s.id} style={{ background:"#0A0804" }}>{s.title}</option>)}
                </select>
              </div>
              {status === "error" && (
                <div style={{ gridColumn:"1/-1", marginBottom:16, color:"#D4845A", fontFamily:"'DM Sans',sans-serif", fontSize:13 }}>Something went wrong. Please try again.</div>
              )}
              <div style={{ gridColumn:"1/-1" }}>
                <button type="submit" disabled={status==="sending"} style={{
                  width:"100%", padding:"20px", background: status==="sending" ? "rgba(201,168,76,0.5)" : "#C9A84C",
                  border:"none", color:"#0A0804", fontFamily:"'DM Sans',sans-serif",
                  fontSize:11, fontWeight:700, letterSpacing:4, textTransform:"uppercase",
                  cursor: status==="sending" ? "default" : "pointer", transition:"all .3s"
                }} onMouseEnter={e=>{if(status!=="sending")e.target.style.background="#F0D080"}}
                   onMouseLeave={e=>{if(status!=="sending")e.target.style.background="#C9A84C"}}>
                  {status==="sending" ? "Transmitting..." : "Initiate Mission →"}
                </button>
              </div>
            </form>
          </Reveal>
        )}
      </div>
      <style>{`@media(max-width:600px){.contact-form{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ setActive }) {
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setActive(id); };
  return (
    <footer style={{ background:"#0A0804", borderTop:"1px solid rgba(201,168,76,0.1)", padding:"64px 48px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:40, alignItems:"center" }} className="footer-grid">
        {/* Logo */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <svg width="24" height="30" viewBox="0 0 400 500" fill="none" stroke="#C9A84C" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="200" cy="200" r="150"/>
              <path d="M320,430 C270,430 200,400 200,320 L200,140 M140,200 L200,140 L260,200"/>
            </svg>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:700, color:"#F5EDD6", letterSpacing:4, textTransform:"uppercase" }}>Mantiq</span>
          </div>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"rgba(245,237,214,0.3)", lineHeight:1.7, maxWidth:220, fontWeight:300 }}>Business Services Company — Est. July 2023</p>
        </div>

        {/* Links */}
        <div style={{ textAlign:"center" }}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:24, justifyContent:"center" }}>
            {["about","services","events","contact"].map(id => (
              <button key={id} onClick={() => go(id)} style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:9, letterSpacing:4,
                textTransform:"uppercase", color:"rgba(245,237,214,0.35)",
                background:"none", border:"none", cursor:"pointer", fontWeight:600,
                transition:"color .2s"
              }} onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="rgba(245,237,214,0.35)"}>{id}</button>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div style={{ display:"flex", gap:14, justifyContent:"flex-end", flexWrap:"wrap" }}>
          {[
            { label:"LinkedIn", href:"https://www.linkedin.com/company/mantiq.services" },
            { label:"Facebook", href:"https://www.facebook.com/mantiiq" },
            { label:"Email", href:"mailto:Mantiq2023@gmail.com" },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:9, letterSpacing:3,
              color:"rgba(245,237,214,0.35)", textTransform:"uppercase", fontWeight:600,
              textDecoration:"none", transition:"color .2s", padding:"8px 12px",
              border:"1px solid rgba(201,168,76,0.1)", borderRadius:1
            }} onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="rgba(245,237,214,0.35)"}>{s.label}</a>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"32px auto 0", paddingTop:24, borderTop:"1px solid rgba(201,168,76,0.07)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, color:"rgba(245,237,214,0.2)", letterSpacing:2, fontWeight:300 }}>© 2026 MANTIQ BUSINESS SERVICES. ALL RIGHTS RESERVED.</p>
        <a href="https://mantiq-pricing.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"#C9A84C", textDecoration:"none", fontWeight:600, opacity:0.7 }}>Pricing Calculator ↗</a>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr!important;text-align:center}.footer-grid>div:last-child{justify-content:center!important}}`}</style>
    </footer>
  );
}

// ─── SCROLL PROGRESS ───────────────────────────────────────────────────────────
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setP((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, height:2, zIndex:600, background:"rgba(201,168,76,0.1)" }}>
      <div style={{ height:"100%", width:`${p}%`, background:"linear-gradient(90deg,#C9A84C,#F0D080)", transition:"width .1s" }}/>
    </div>
  );
}

// ─── SECTION NAV DOTS ──────────────────────────────────────────────────────────
function SideNav({ active }) {
  const sections = ["hero","about","services","events","contact"];
  return (
    <div style={{ position:"fixed", right:28, top:"50%", transform:"translateY(-50%)", zIndex:400, display:"flex", flexDirection:"column", gap:14 }} className="side-dots">
      {sections.map(id => (
        <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({behavior:"smooth"})}
          title={id}
          style={{
            width:6, height: active===id ? 28 : 6, borderRadius:3,
            background: active===id ? "#C9A84C" : "rgba(201,168,76,0.25)",
            border:"none", cursor:"pointer", transition:"all .5s cubic-bezier(.16,1,.3,1)", padding:0
          }}/>
      ))}
      <style>{`@media(max-width:768px){.side-dots{display:none!important}}`}</style>
    </div>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("hero");
  const { pos, hovered, setHovered } = useCursor();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const sections = ["hero","about","services","events","contact"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background:"#060503", minHeight:"100vh", overflowX:"hidden" }}>
      {!isMobile && <Cursor pos={pos} hovered={hovered} />}
      <ScrollProgress />
      <Nav active={active} setActive={setActive} />
      <SideNav active={active} />
      <Hero setActive={setActive} />
      <Marquee />
      <About />
      <Services />
      <Events />
      <Contact />
      <Footer setActive={setActive} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { cursor: none; }
        @media(max-width:768px){ body { cursor: auto; } }

        @keyframes orb1 { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(40px,30px) scale(1.15)} }
        @keyframes orb2 { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(-30px,-40px) scale(1.1)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        @keyframes scrollLine { 0%{transform:scaleY(0);transform-origin:top;opacity:1} 50%{transform:scaleY(1);transform-origin:top;opacity:1} 51%{transform:scaleY(1);transform-origin:bottom;opacity:1} 100%{transform:scaleY(0);transform-origin:bottom;opacity:0} }
        @keyframes marqueeX { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        input::placeholder, textarea::placeholder { color: rgba(245,237,214,0.2); }
        input, select, textarea { caret-color: #C9A84C; }
        select option { background: #0A0804; color: #F5EDD6; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060503; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #C9A84C; }
        ::selection { background: rgba(201,168,76,0.25); color: #F5EDD6; }
      `}</style>
    </div>
  );
}
