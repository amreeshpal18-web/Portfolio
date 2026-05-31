import { useState, useEffect, useRef } from "react";

// ============================================================
//  ✏️  EDIT YOUR INFO HERE — change anything you want!
// ============================================================
const DATA = {
  name: "Amreesh Pal",
  role: "Aspiring Data Analyst",
  tagline: "Turning raw data into meaningful insights.",
  about:
    "I'm Amreesh, a BCA student specializing in Data Science & AI at BBD University, Lucknow. My goal is to become a professional Data Analyst — helping organizations make smarter, data-driven decisions. I'm actively building real-world projects to prepare for campus placements.",
  available: true,
  photo: "/profile.jpg",
  skills: [
    { name: "Python", icon: "🐍", level: 65, desc: "Scripting, automation, data manipulation with core libraries." },
    { name: "SQL", icon: "🗄️", level: 60, desc: "Queries, joins, aggregations, relational database management." },
    { name: "Excel", icon: "📊", level: 70, desc: "Pivot tables, advanced formulas, dashboards, data cleaning." },
  ],

  projects: [
    {
      tag: "Python · Data Analysis",
      name: "Sales Data Analysis",
      desc: "Analyzing a retail sales dataset to uncover trends, top products and seasonal patterns using Python and Pandas. Visualized with Matplotlib.",
      tech: ["Python", "Pandas", "Matplotlib", "Excel"],
      github: "#",
      status: "coming",
    },
    {
      tag: "SQL · Database",
      name: "Student Database System",
      desc: "Designed and queried a relational database for managing student records, grades, and attendance using SQL with complex joins.",
      tech: ["SQL", "MySQL", "Database Design"],
      github: "#",
      status: "coming",
    },
    {
      tag: "Excel · Dashboard",
      name: "HR Analytics Dashboard",
      desc: "Interactive Excel dashboard tracking employee KPIs, attrition rate and departmental metrics using pivot tables and charts.",
      tech: ["Excel", "Pivot Tables", "Data Viz"],
      github: "#",
      status: "coming",
    },
  ],

  education: [
    {
      period: "2024 – 2027",
      degree: "Bachelor of Computer Applications (BCA)",
      institute: "BBD University, Lucknow",
      detail: "Data Science & AI Specialization",
      badge: "Current",
    },
    {
      period: "2024",
      degree: "12th CBSE — PCM",
      institute: "SR Global School, Lucknow",
      detail: "Physics, Chemistry, Mathematics · 78%",
      badge: null,
    },
    {
      period: "2022",
      degree: "10th CBSE",
      institute: "SR Global School, Lucknow",
      detail: "83.3%",
      badge: null,
    },
  ],

  certifications: [
    { period: "2024 – Present", title: "Python for Data Analysis", org: "Self-learning · HackerRank" },
    { period: "2024", title: "SQL Fundamentals", org: "Self-learning · Practice Projects" },
    { period: "2024", title: "Excel for Data Analysis", org: "University + Self-learning" },
  ],

  contact: {
    email: "amreeshpal18@gmail.com",
    linkedin:"https://www.linkedin.com/in/amreesh-pal-42711433b",
    github: "https://github.com/amreeshpal18-web",
  },
};
// ============================================================

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const Reveal = ({ children, delay = 0, style = {} }) => {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(26px)",
      transition: `opacity 0.65s ${delay}s ease, transform 0.65s ${delay}s ease`,
      ...style,
    }}>
      {children}
    </div>
  );
};

const SkillBar = ({ level }) => {
  const [ref, visible] = useInView(0.3);
  return (
    <div ref={ref} style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden", marginTop: 14 }}>
      <div style={{
        height: "100%",
        background: "linear-gradient(90deg,#c9a84c,#e8c96a)",
        borderRadius: 2,
        width: visible ? level + "%" : "0%",
        transition: "width 1.3s cubic-bezier(0.4,0,0.2,1)",
      }} />
    </div>
  );
};

// Label above sections
const SectionLabel = ({ text }) => (
  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
    <div style={{ width:32, height:2, background:"#c9a84c" }} />
    <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#c9a84c", fontFamily:"DM Sans,sans-serif" }}>{text}</span>
  </div>
);

const SectionHeading = ({ children }) => (
  <h2 style={{ fontFamily:"Playfair Display,serif", fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:700, color:"#fff", margin:"0 0 40px" }}>{children}</h2>
);

const cardHover = (e, enter) => {
  e.currentTarget.style.borderColor = enter ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.12)";
  e.currentTarget.style.transform = enter ? "translateY(-5px)" : "translateY(0)";
  e.currentTarget.style.boxShadow = enter ? "0 16px 40px rgba(0,0,0,0.3)" : "none";
};

// ── NAV ──
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["About","Skills","Projects","Resume","Contact"];
  const go = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth" });
  return (
    <nav style={{
      position:"fixed", top:0, width:"100%", zIndex:100, boxSizing:"border-box",
      background: scrolled ? "rgba(8,18,30,0.93)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "none",
      transition:"all 0.3s",
      padding:"0 6%", display:"flex", alignItems:"center", justifyContent:"space-between", height:64,
    }}>
      <div style={{ display:"flex", gap:28 }}>
        {links.map(l => (
          <button key={l} onClick={() => go(l)} style={{
            background:"none", border:"none", cursor:"pointer", color:"#8a9bb0",
            fontSize:11, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase",
            fontFamily:"DM Sans,sans-serif", transition:"color 0.2s", padding:0,
          }}
            onMouseEnter={e => e.target.style.color="#e8c96a"}
            onMouseLeave={e => e.target.style.color="#8a9bb0"}
          >{l}</button>
        ))}
      </div>
    </nav>
  );
};

// ── HERO — photo centred above text ──
const Hero = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);
  const anim = (d) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.7s ${d}s ease, transform 0.7s ${d}s ease`,
  });
  return (
    <section id="about" style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      flexDirection:"column", textAlign:"center",
      padding:"100px 6% 80px", background:"#0d1b2a", position:"relative", overflow:"hidden",
    }}>
      {/* subtle grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(201,168,76,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.035) 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none" }} />
      {/* glow */}
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 55% at 50% 40%,rgba(30,58,95,0.55) 0%,transparent 70%)", pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", maxWidth:700 }}>

        {/* ── PHOTO centred ── */}
        <div style={{ ...anim(0.1), marginBottom:28 }}>
          <div style={{
            width:180, height:180, borderRadius:"50%", overflow:"hidden",
            border:"3px solid #c9a84c",
            boxShadow:"0 0 0 10px rgba(201,168,76,0.1), 0 20px 60px rgba(0,0,0,0.55)",
            margin:"0 auto",
          }}>
            <img src={DATA.photo} alt={DATA.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition: "44% -20px" }} />
          </div>
        </div>

        {/* available badge */}
        <div style={{ ...anim(0.25), display:"flex", alignItems:"center", gap:8, marginBottom:16, justifyContent:"center" }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 6px #4ade80" }} />
          <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:"#c9a84c", fontFamily:"DM Sans,sans-serif" }}>
            {DATA.available ? "Available for Internships" : "Not Available"}
          </span>
        </div>

        {/* name */}
       {/* name */}
<h1 style={{ ...anim(0.4), fontFamily:"Playfair Display,serif", fontSize:"clamp(3rem,8vw,5.5rem)", fontWeight:900, lineHeight:1.05, color:"#fff", margin:"0 0 10px" }}>
  {DATA.name}
</h1>

        {/* role */}
        <p style={{ ...anim(0.52), fontSize:16, fontWeight:300, color:"#8a9bb0", margin:"0 0 14px", fontFamily:"DM Sans,sans-serif" }}>{DATA.role}</p>

        {/* tagline */}
        <p style={{ ...anim(0.64), fontSize:15, lineHeight:1.8, color:"#a0b4c8", maxWidth:480, margin:"0 0 32px", fontFamily:"DM Sans,sans-serif" }}>{DATA.tagline}</p>

        {/* CTA buttons */}
        <div style={{ ...anim(0.76), display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})} style={{
            padding:"12px 28px", background:"#c9a84c", color:"#0d1b2a", border:"none",
            borderRadius:4, fontFamily:"DM Sans,sans-serif", fontSize:12, fontWeight:700,
            letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer", transition:"all 0.2s",
          }}
            onMouseEnter={e=>{e.target.style.background="#e8c96a";e.target.style.transform="translateY(-2px)"}}
            onMouseLeave={e=>{e.target.style.background="#c9a84c";e.target.style.transform="translateY(0)"}}>
            View Projects
          </button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})} style={{
            padding:"12px 28px", background:"transparent", color:"#c9a84c",
            border:"1.5px solid #c9a84c", borderRadius:4, fontFamily:"DM Sans,sans-serif",
            fontSize:12, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase",
            cursor:"pointer", transition:"all 0.2s",
          }}
            onMouseEnter={e=>{e.target.style.background="rgba(201,168,76,0.1)";e.target.style.transform="translateY(-2px)"}}
            onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.transform="translateY(0)"}}>
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

// ── ABOUT ──
const About = () => (
  <section style={{ padding:"80px 6%", background:"#0f1e2f" }}>
    <div style={{ maxWidth:860, margin:"0 auto" }}>
      <Reveal><SectionLabel text="Who I Am" /></Reveal>
      <Reveal delay={0.05}><SectionHeading>About Me</SectionHeading></Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize:15, lineHeight:1.9, color:"#a0b4c8", fontFamily:"DM Sans,sans-serif", maxWidth:700, marginBottom:40 }}>{DATA.about}</p>
      </Reveal>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:16 }}>
        {[["3","Core Skills"],["BCA","Specialization"],["🎯","Placement Focus"]].map(([n,l],i) => (
          <Reveal key={l} delay={i*0.08}>
            <div style={{ background:"#12243a", border:"1px solid rgba(201,168,76,0.12)", borderRadius:10, padding:"22px 18px", transition:"all 0.3s", cursor:"default" }}
              onMouseEnter={e => cardHover(e,true)} onMouseLeave={e => cardHover(e,false)}>
              <div style={{ fontFamily:"Playfair Display,serif", fontSize:30, fontWeight:900, color:"#c9a84c" }}>{n}</div>
              <div style={{ fontSize:12, color:"#8a9bb0", marginTop:5, fontFamily:"DM Sans,sans-serif" }}>{l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ── SKILLS ──
const Skills = () => (
  <section id="skills" style={{ padding:"80px 6%", background:"#0d1b2a" }}>
    <div style={{ maxWidth:860, margin:"0 auto" }}>
      <Reveal><SectionLabel text="Technical Skills" /></Reveal>
      <Reveal delay={0.05}><SectionHeading>What I Work With</SectionHeading></Reveal>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20 }}>
        {DATA.skills.map((s,i) => (
          <Reveal key={s.name} delay={i*0.1}>
            <div style={{ background:"#12243a", border:"1px solid rgba(201,168,76,0.1)", borderRadius:10, padding:"28px 24px", transition:"all 0.3s" }}
              onMouseEnter={e => cardHover(e,true)} onMouseLeave={e => cardHover(e,false)}>
              <div style={{ fontSize:30, marginBottom:12 }}>{s.icon}</div>
              <div style={{ fontFamily:"Playfair Display,serif", fontSize:20, fontWeight:700, color:"#fff", marginBottom:6 }}>{s.name}</div>
              <div style={{ fontSize:13, color:"#8a9bb0", lineHeight:1.65, fontFamily:"DM Sans,sans-serif" }}>{s.desc}</div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#8a9bb0", marginTop:14, fontFamily:"DM Sans,sans-serif" }}>
                <span>Proficiency</span><span style={{ color:"#c9a84c" }}>{s.level}%</span>
              </div>
              <SkillBar level={s.level} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ── PROJECTS ──
const Projects = () => (
  <section id="projects" style={{ padding:"80px 6%", background:"#0f1e2f" }}>
    <div style={{ maxWidth:860, margin:"0 auto" }}>
      <Reveal><SectionLabel text="Portfolio" /></Reveal>
      <Reveal delay={0.05}><SectionHeading>Projects</SectionHeading></Reveal>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(255px,1fr))", gap:20 }}>
        {DATA.projects.map((p,i) => (
          <Reveal key={p.name} delay={i*0.1}>
            <div style={{ background:"#12243a", border:"1px solid rgba(201,168,76,0.1)", borderRadius:10, padding:"24px", position:"relative", height:"100%", boxSizing:"border-box", transition:"all 0.3s" }}
              onMouseEnter={e => cardHover(e,true)} onMouseLeave={e => cardHover(e,false)}>
              {p.status==="coming" && (
                <span style={{ position:"absolute", top:16, right:16, fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#0d1b2a", background:"#c9a84c", padding:"3px 8px", borderRadius:3 }}>Coming Soon</span>
              )}
              <span style={{ display:"inline-block", fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"#c9a84c", background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.2)", padding:"4px 10px", borderRadius:20, marginBottom:12 }}>{p.tag}</span>
              <div style={{ fontFamily:"Playfair Display,serif", fontSize:18, fontWeight:700, color:"#fff", marginBottom:8, paddingRight:p.status==="coming"?72:0 }}>{p.name}</div>
              <div style={{ fontSize:13, color:"#8a9bb0", lineHeight:1.7, fontFamily:"DM Sans,sans-serif", marginBottom:16 }}>{p.desc}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
                {p.tech.map(t => <span key={t} style={{ fontSize:11, color:"#f5f0e8", background:"rgba(255,255,255,0.06)", padding:"3px 8px", borderRadius:3, fontFamily:"DM Sans,sans-serif" }}>{t}</span>)}
              </div>
              <a href={p.github} style={{ fontSize:12, fontWeight:600, color:"#c9a84c", textDecoration:"none", fontFamily:"DM Sans,sans-serif" }}>⬡ GitHub →</a>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ── RESUME ──
const Timeline = ({ items }) => (
  <div style={{ borderLeft:"1px solid rgba(201,168,76,0.22)", paddingLeft:24, marginTop:4 }}>
    {items.map((item, i) => (
      <Reveal key={i} delay={i*0.08}>
        <div style={{ position:"relative", marginBottom:32 }}>
          <div style={{ position:"absolute", left:-30, top:5, width:11, height:11, borderRadius:"50%", background:"#c9a84c", boxShadow:"0 0 0 4px rgba(201,168,76,0.18)" }} />
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
            <span style={{ fontSize:11, color:"#8a9bb0", letterSpacing:"0.06em", fontFamily:"DM Sans,sans-serif" }}>{item.period}</span>
            {item.badge && <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#0d1b2a", background:"#4ade80", padding:"2px 7px", borderRadius:3 }}>{item.badge}</span>}
          </div>
          <div style={{ fontWeight:600, color:"#fff", fontSize:14, marginBottom:3, fontFamily:"DM Sans,sans-serif" }}>{item.degree || item.title}</div>
          <div style={{ fontSize:13, color:"#c9a84c", marginBottom:3, fontFamily:"DM Sans,sans-serif" }}>{item.institute || item.org}</div>
          <div style={{ fontSize:13, color:"#8a9bb0", fontFamily:"DM Sans,sans-serif" }}>{item.detail}</div>
        </div>
      </Reveal>
    ))}
  </div>
);

const Resume = () => (
  <section id="resume" style={{ padding:"80px 6%", background:"#0d1b2a" }}>
    <div style={{ maxWidth:860, margin:"0 auto" }}>
      <Reveal><SectionLabel text="Background" /></Reveal>
      <Reveal delay={0.05}><SectionHeading>Education & Journey</SectionHeading></Reveal>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:48 }}>
        <div>
          <Reveal><div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"#c9a84c", marginBottom:20, fontFamily:"DM Sans,sans-serif" }}>Education</div></Reveal>
          <Timeline items={DATA.education} />
        </div>
        <div>
          <Reveal><div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"#c9a84c", marginBottom:20, fontFamily:"DM Sans,sans-serif" }}>Certifications & Learning</div></Reveal>
          <Timeline items={DATA.certifications} />
          <Reveal delay={0.2}>
            <a href="#" style={{
              display:"inline-block", marginTop:8, padding:"12px 24px",
              background:"transparent", color:"#c9a84c", border:"1.5px solid #c9a84c",
              borderRadius:4, fontFamily:"DM Sans,sans-serif", fontSize:12, fontWeight:700,
              letterSpacing:"0.08em", textTransform:"uppercase", textDecoration:"none", transition:"all 0.2s",
            }}
              onMouseEnter={e=>{e.target.style.background="rgba(201,168,76,0.1)";e.target.style.transform="translateY(-2px)"}}
              onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.transform="translateY(0)"}}>
              ⬇ Download Resume
            </a>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

// ── CONTACT ──
const Contact = () => (
  <section id="contact" style={{ padding:"80px 6%", background:"#0f1e2f" }}>
    <div style={{ maxWidth:580, margin:"0 auto", textAlign:"center" }}>
      <Reveal>
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:10, marginBottom:10 }}>
          <div style={{ width:28, height:2, background:"#c9a84c" }} />
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#c9a84c", fontFamily:"DM Sans,sans-serif" }}>Get In Touch</span>
          <div style={{ width:28, height:2, background:"#c9a84c" }} />
        </div>
        <h2 style={{ fontFamily:"Playfair Display,serif", fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:700, color:"#fff", margin:"0 0 12px" }}>Let's Connect</h2>
        <p style={{ fontSize:14, color:"#8a9bb0", lineHeight:1.75, fontFamily:"DM Sans,sans-serif", marginBottom:36 }}>
          Open to internship opportunities, collaborations and data projects. Feel free to reach out!
        </p>
      </Reveal>
      <div style={{ display:"flex", justifyContent:"center", gap:16, flexWrap:"wrap" }}>
        {[
          { icon:"📧", label:"Email", handle: DATA.contact.email, href:"mailto:"+DATA.contact.email },
          { icon:"💼", label:"LinkedIn", handle:"linkedin.com/in/...", href: DATA.contact.linkedin },
          { icon:"🐙", label:"GitHub", handle:"github.com/...", href: DATA.contact.github },
        ].map((c,i) => (
          <Reveal key={c.label} delay={i*0.1}>
            <a href={c.href} target="_blank" rel="noreferrer" style={{
              background:"#12243a", border:"1px solid rgba(201,168,76,0.15)", borderRadius:10,
              padding:"22px 26px", textDecoration:"none", display:"flex", flexDirection:"column",
              alignItems:"center", gap:8, minWidth:155, transition:"all 0.3s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(201,168,76,0.45)";e.currentTarget.style.transform="translateY(-5px)"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(201,168,76,0.15)";e.currentTarget.style.transform="translateY(0)"}}>
              <span style={{ fontSize:26 }}>{c.icon}</span>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#c9a84c", fontFamily:"DM Sans,sans-serif" }}>{c.label}</span>
              <span style={{ fontSize:11, color:"#8a9bb0", fontFamily:"DM Sans,sans-serif" }}>{c.handle}</span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ── FOOTER ──
const Footer = () => (
  <footer style={{ textAlign:"center", padding:"22px 6%", borderTop:"1px solid rgba(201,168,76,0.1)", background:"#0d1b2a", fontSize:12, color:"#8a9bb0", fontFamily:"DM Sans,sans-serif" }}>
    Designed & Built by <span style={{ color:"#c9a84c" }}>Amreesh</span> · {new Date().getFullYear()}
  </footer>
);

// ── APP ──
export default function App() {
  useEffect(() => {
    document.title = DATA.name + " — Portfolio";
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#0d1b2a";
  }, []);

  return (
    <div style={{ fontFamily:"DM Sans,sans-serif", background:"#0d1b2a", color:"#f5f0e8" }}>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}