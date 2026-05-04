import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Download,
  ExternalLink,
  Mail,
  ChevronDown,
  Code2,
  BarChart3,
  Database,
  Award,
  Briefcase,
  User,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  TrendingUp,
  Layers,
  Star,
  BookOpen,
  Zap,
  Trophy,
} from "lucide-react";

// ─── PARTICLE CANVAS ────────────────────────────────────────────────────────────
const ParticleCanvas = ({ isDark }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    const mobile = window.innerWidth < 768;
    const N = mobile ? 40 : 80;
    const accent = isDark ? "0,243,255" : "0,120,200";
    particlesRef.current = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.3 + 0.4,
      o: Math.random() * 0.45 + 0.1,
    }));
    const connDist = mobile ? 80 : 120;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = particlesRef.current;
      ps.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent},${p.o})`;
        ctx.fill();
      });
      for (let i = 0; i < ps.length; i++)
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x,
            dy = ps[i].y - ps[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < connDist) {
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(${accent},${0.1 * (1 - d / connDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
};

// ─── REVEAL ─────────────────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 22 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ─── DATA ────────────────────────────────────────────────────────────────────────
const SKILLS = [
  "Python",
  "Pandas",
  "NumPy",
  "Scikit-learn",
  "TensorFlow",
  "PyTorch",
  "Matplotlib",
  "Seaborn",
  "Plotly",
  "SciPy",
  "OpenCV",
  "NLTK",
  "SpaCy",
  "Hugging Face",
  "FastAPI",
];
const TOOLS = [
  { name: "Power BI", icon: BarChart3, level: 90 },
  { name: "Tableau", icon: TrendingUp, level: 85 },
  { name: "SQL", icon: Database, level: 92 },
  { name: "Excel", icon: Layers, level: 88 },
  { name: "Jupyter", icon: BookOpen, level: 95 },
  { name: "Git", icon: Code2, level: 80 },
];
const PROJECTS = [
  {
    name: "SentimentScope",
    desc: "Real-time Twitter sentiment analysis pipeline using transformer models with 94% accuracy on financial news streams.",
    tags: ["BERT", "FastAPI", "Redis", "Docker"],
    cat: "NLP",
    highlight: true,
  },
  {
    name: "ChurnPredict AI",
    desc: "End-to-end customer churn prediction with XGBoost, SHAP explanations, and a Power BI dashboard integration.",
    tags: ["XGBoost", "SHAP", "Power BI", "Sklearn"],
    cat: "ML",
  },
  {
    name: "NeuroViz",
    desc: "Interactive visualisation toolkit for neural network activations and gradient flows built on Plotly & D3.",
    tags: ["Plotly", "D3.js", "PyTorch", "React"],
    cat: "Data Viz",
  },
  {
    name: "CrimeMap Analytics",
    desc: "Geospatial crime pattern analysis using clustering algorithms with a Tableau public dashboard.",
    tags: ["DBSCAN", "GeoPandas", "Tableau", "Folium"],
    cat: "Data Viz",
  },
  {
    name: "ResumeRank NLP",
    desc: "NLP-driven resume screening model achieving 89% precision using TF-IDF, BERT embeddings & cosine similarity.",
    tags: ["BERT", "TF-IDF", "SpaCy", "Streamlit"],
    cat: "NLP",
  },
  {
    name: "StockSight ML",
    desc: "LSTM-based stock price forecasting with technical indicators, a backtesting engine, and Slack alerting.",
    tags: ["LSTM", "TA-Lib", "Pandas", "Plotly"],
    cat: "ML",
  },
];
const CATS = ["All", "ML", "NLP", "Data Viz"];
const TIMELINE = [
  {
    title: "Data Scientist",
    org: "TechNova Analytics",
    date: "2025–Present",
    desc: "Leading ML pipeline development, reducing customer churn by 23% through predictive modelling and A/B testing.",
    icon: Briefcase,
  },
  {
    title: "IBM Data Science ",
    org: "IBM / Coursera",
    date: "2025",
    desc: "9-course specialisation covering data analysis, visualisation, machine learning, and applied capstone.",
    icon: Award,
  },
  {
    title: "Google  Data Analytics",
    org: "Google / Linkedin Learning",
    date: "2026",
    desc: "Advanced statistical analysis, regression modelling, and machine learning with Python.",
    icon: Award,
  },
  {
    title: "Microsoft Azure AI Essentials ",
    org: "Microsoft / Linkedin Learning",
    date: "2026",
    desc: "Power BI Desktop, DAX, data modelling, and enterprise report deployment.",
    icon: Trophy,
  },
  {
    title: "BSc Computer Science",
    org: "The Superior University Lahore",
    date: "2023–2027",
    org: "Microsoft / Linkedin Learning",
    org: "Microsoft / Linkedin Learning",
    desc: "Specialisation in AI Engineer & Data Science. Relevant coursework: Data Structures, Algorithms, Database Systems, Machine Learning, Deep Learning, NLP.",
    icon: BookOpen,
  },
];

// ─── PORTFOLIO ───────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenu] = useState(false);
  const [activeSection, setSection] = useState("home");
  const [glitch, setGlitch] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const upd = () => setMob(window.innerWidth < 768);
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 180);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setSection(e.target.id);
        }),
      { threshold: 0.25 },
    );
    ["home", "about", "projects", "timeline", "contact"].forEach((s) => {
      const el = document.getElementById(s);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };
  const filtered =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  const A = isDark ? "#00f3ff" : "#0078c8";
  const t = {
    bg: isDark ? "#000" : "#f0f6ff",
    bgCard: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.72)",
    border: isDark ? "rgba(0,243,255,0.18)" : "rgba(0,120,200,0.2)",
    borderH: isDark ? "rgba(0,243,255,0.6)" : "rgba(0,120,200,0.55)",
    accent: A,
    accentDim: isDark ? "rgba(0,243,255,0.1)" : "rgba(0,120,200,0.1)",
    text: isDark ? "#e8f4f8" : "#0a1628",
    textMute: isDark ? "#5a7a84" : "#6b8aaa",
    textSub: isDark ? "#8faab0" : "#4a6080",
    navBg: isDark ? "rgba(0,0,0,0.88)" : "rgba(240,246,255,0.92)",
    glow: isDark
      ? `0 0 18px rgba(0,243,255,.35),0 0 50px rgba(0,243,255,.1)`
      : `0 0 18px rgba(0,120,200,.2)`,
    glowS: isDark
      ? `0 0 28px rgba(0,243,255,.6),0 0 70px rgba(0,243,255,.18)`
      : `0 0 28px rgba(0,120,200,.4)`,
    scan: isDark ? "rgba(0,243,255,0.025)" : "rgba(0,120,200,0.018)",
  };
  const card = {
    background: t.bgCard,
    border: `1px solid ${t.border}`,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
  };
  const px = mob ? "16px" : "24px";
  const sp = mob ? "68px 16px" : "96px 24px";

  return (
    <div
      style={{
        background: t.bg,
        color: t.text,
        fontFamily: "'Rajdhani','Orbitron',monospace",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
        body{overflow-x:hidden}
        ::selection{background:${A}33}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:${t.bg}}
        ::-webkit-scrollbar-thumb{background:${A}55;border-radius:2px}

        .gt{color:${A};text-shadow:0 0 10px ${A}99,0 0 30px ${A}44}
        @keyframes glitch{
          0%{clip-path:inset(10% 0 85% 0);transform:translate(-3px,0)}
          33%{clip-path:inset(60% 0 10% 0);transform:translate(3px,0)}
          66%{clip-path:inset(30% 0 50% 0);transform:translate(-2px,0)}
          100%{clip-path:none;transform:none}
        }
        .glitch{animation:glitch .18s steps(2) 1}

        .sl::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,${t.scan} 0px,transparent 1px,transparent 3px);pointer-events:none;z-index:1}
        .ctlb{border-top:2px solid ${A};border-left:2px solid ${A}}
        .cbrb{border-bottom:2px solid ${A};border-right:2px solid ${A}}
        .tag{background:${t.accentDim};border:1px solid ${t.border};color:${A};font-family:'JetBrains Mono',monospace;font-size:10px;padding:2px 8px;border-radius:3px;white-space:nowrap}
        .slabel{font-family:'JetBrains Mono',monospace;color:${A};font-size:10px;letter-spacing:3px;text-transform:uppercase}
        .tbar{background:linear-gradient(90deg,${A},${A}88);box-shadow:0 0 10px ${A}55}
        .tnode{background:${A};box-shadow:0 0 0 4px ${t.accentDim},${t.glow}}

        .nl{background:none;border:none;cursor:pointer;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:13px;letter-spacing:2px;text-transform:uppercase;transition:color .2s;padding:4px 0;-webkit-tap-highlight-color:transparent}
        .nl:hover,.nl.act{color:${A}!important;text-shadow:0 0 8px ${A}77}

        .bp{background:transparent;border:1px solid ${A};color:${A};cursor:pointer;transition:all .3s;-webkit-tap-highlight-color:transparent}
        .bp:hover{background:${A}22;box-shadow:${t.glow};transform:translateY(-1px)}
        .bs{background:${A};color:#000;font-weight:700;border:1px solid ${A};cursor:pointer;transition:all .3s;-webkit-tap-highlight-color:transparent}
        .bs:hover{box-shadow:${t.glowS};transform:translateY(-2px)}

        .sk:hover{background:${t.accentDim}!important;border-color:${A}!important;color:${A}!important;box-shadow:${t.glow}!important;transform:translateY(-2px) scale(1.04)}
        .pc:hover{border-color:${t.borderH}!important;box-shadow:${t.glowS}!important;transform:translateY(-4px)}
        .soc:hover{color:${A}!important;border-color:${A}!important;box-shadow:${t.glow}!important;transform:translateY(-3px)}
        .fb:hover,.fb.act{background:${A}!important;color:#000!important;border-color:${A}!important;box-shadow:${t.glow}!important}

        .fab{position:fixed;bottom:22px;right:18px;z-index:100;background:${A};color:#000;border:none;border-radius:50px;padding:12px 18px;font-family:'Rajdhani',sans-serif;font-weight:700;font-size:13px;letter-spacing:1px;cursor:pointer;display:flex;align-items:center;gap:7px;box-shadow:${t.glowS};transition:all .3s;-webkit-tap-highlight-color:transparent}
        .fab:hover{transform:scale(1.06) translateY(-2px)}
        .fab:active{transform:scale(0.96)}

        button,a{-webkit-tap-highlight-color:transparent}

        @media(max-width:479px){
          .flx-wrap>*{width:100%;max-width:280px;justify-content:center}
          .flx-wrap{flex-direction:column;align-items:center}
          .fab-txt{display:none}
          .fab{border-radius:50%;padding:13px}
        }
        @media(min-width:768px){.mob-menu{display:none!important}.hbg{display:none!important}.dnav{display:flex!important}}
        @media(max-width:767px){.dnav{display:none!important}}
        .mob-menu{position:fixed;top:64px;left:0;right:0;bottom:0;z-index:44;background:${t.bg};border-top:1px solid ${t.border};overflow-y:auto;padding:8px 0 32px;display:flex;flex-direction:column}
        .mln{display:block;width:100%;padding:17px 24px;background:none;border:none;border-bottom:1px solid ${t.border}22;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:18px;letter-spacing:3px;text-transform:uppercase;color:${t.textSub};cursor:pointer;text-align:left;transition:all .2s;-webkit-tap-highlight-color:transparent}
        .mln:hover,.mln.act{color:${A};background:${t.accentDim}}
      `}</style>

      <ParticleCanvas isDark={isDark} />

      {/* ── NAV ── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: t.navBg,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: `0 ${px}`,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            className="gt"
            onClick={() => go("home")}
            style={{
              fontFamily: "'Orbitron',monospace",
              fontWeight: 900,
              fontSize: mob ? 14 : 18,
              cursor: "pointer",
              letterSpacing: 2,
              flexShrink: 0,
            }}
          >
            MKA<span style={{ color: t.textMute, fontWeight: 400 }}>.DS</span>
          </div>

          <div className="dnav" style={{ gap: 28 }}>
            {["home", "about", "projects", "timeline", "contact"].map((s) => (
              <button
                key={s}
                className={`nl ${activeSection === s ? "act" : ""}`}
                onClick={() => go(s)}
                style={{ color: activeSection === s ? A : t.textSub }}
              >
                {s}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => setIsDark((d) => !d)}
              style={{
                background: "none",
                border: `1px solid ${t.border}`,
                borderRadius: 6,
                padding: "7px 9px",
                cursor: "pointer",
                color: A,
                display: "flex",
                alignItems: "center",
                touchAction: "manipulation",
              }}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              className="hbg"
              onClick={() => setMenu((o) => !o)}
              style={{
                background: "none",
                border: `1px solid ${t.border}`,
                borderRadius: 6,
                padding: "7px 9px",
                cursor: "pointer",
                color: A,
                display: "flex",
                alignItems: "center",
              }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mob-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {["home", "about", "projects", "timeline", "contact"].map((s) => (
              <button
                key={s}
                className={`mln ${activeSection === s ? "act" : ""}`}
                onClick={() => go(s)}
              >
                {s}
              </button>
            ))}
            <div
              style={{
                margin: "24px 20px 0",
                padding: "14px 16px",
                border: `1px solid ${t.border}`,
                borderRadius: 6,
                background: t.accentDim,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 10,
                  color: t.textMute,
                  letterSpacing: 2,
                }}
              >
                BASED IN
              </div>
              <div
                style={{
                  fontFamily: "'Rajdhani',sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  color: A,
                  marginTop: 4,
                }}
              >
                Lahore, Pakistan 🇵🇰
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section
        id="home"
        className="sl"
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: `80px ${px} 48px`,
          position: "relative",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1 }}
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 680,
          }}
        >
          <div className="slabel" style={{ marginBottom: 16 }}>
             Data Scientist & AI/ML Engineer
          </div>
          <h1
            style={{
              fontFamily: "'Orbitron',monospace",
              fontWeight: 900,
              fontSize: "clamp(28px,8vw,80px)",
              letterSpacing: "clamp(2px,1vw,5px)",
              lineHeight: 1.05,
              color: t.text,
            }}
          >
            MUHAMMAD
          </h1>
          <h1
            className={`gt${glitch ? " glitch" : ""}`}
            style={{
              fontFamily: "'Orbitron',monospace",
              fontWeight: 900,
              fontSize: "clamp(28px,8vw,80px)",
              letterSpacing: "clamp(2px,1vw,5px)",
              lineHeight: 1.05,
            }}
          >
            KHINSHAN
          </h1>
          <h1
            style={{
              fontFamily: "'Orbitron',monospace",
              fontWeight: 900,
              fontSize: "clamp(28px,8vw,80px)",
              letterSpacing: "clamp(2px,1vw,5px)",
              lineHeight: 1.05,
              color: t.text,
            }}
          >
            ARIF
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              height: 2,
              background: `linear-gradient(90deg,transparent,${A},transparent)`,
              margin: "18px auto",
              maxWidth: 340,
            }}
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{
              fontFamily: "'Rajdhani',sans-serif",
              fontSize: "clamp(13px,3.5vw,21px)",
              fontWeight: 300,
              color: t.textSub,
              letterSpacing: "clamp(3px,1.5vw,6px)",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Turning Data into Insights
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: mob ? 9 : 11,
              color: t.textMute,
              letterSpacing: 2,
              marginBottom: 32,
            }}
          >
            &gt; Python · ML · Deep Learning · Data Viz · NLP
          </motion.p>
          <motion.div
            className="flx-wrap"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              className="bs"
              onClick={() => go("projects")}
              style={{
                padding: "12px 24px",
                fontFamily: "'Rajdhani',sans-serif",
                fontSize: 13,
                letterSpacing: 2,
                borderRadius: 4,
              }}
            >
              VIEW PROJECTS
            </button>
            <button
              className="bp"
              onClick={() => go("contact")}
              style={{
                padding: "12px 24px",
                fontFamily: "'Rajdhani',sans-serif",
                fontSize: 13,
                letterSpacing: 2,
                borderRadius: 4,
              }}
            >
              GET IN TOUCH
            </button>
          </motion.div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: "absolute",
            bottom: 24,
            color: A,
            opacity: 0.5,
            cursor: "pointer",
            zIndex: 2,
          }}
          onClick={() => go("about")}
        >
          <ChevronDown size={20} />
        </motion.div>
        <div
          className="ctlb"
          style={{
            position: "absolute",
            top: 88,
            left: 16,
            width: 20,
            height: 20,
          }}
        />
        <div
          className="cbrb"
          style={{
            position: "absolute",
            bottom: 48,
            right: 16,
            width: 20,
            height: 20,
          }}
        />
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        style={{ padding: sp, maxWidth: 1200, margin: "0 auto" }}
      >
        <Reveal>
          <div className="slabel" style={{ marginBottom: 10 }}>
            About & Skills
          </div>
          <h2
            style={{
              fontFamily: "'Orbitron',monospace",
              fontSize: "clamp(20px,4vw,36px)",
              fontWeight: 700,
              marginBottom: 40,
              color: t.text,
            }}
          >
            WHO I <span className="gt">AM</span>
          </h2>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,270px),1fr))",
            gap: mob ? 14 : 24,
            marginBottom: 52,
          }}
        >
          {/* Profile */}
          <Reveal delay={0.08}>
            <div
              style={{
                ...card,
                borderRadius: 8,
                padding: mob ? 18 : 26,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="ctlb"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 14,
                  height: 14,
                }}
              />
              <User size={22} color={A} style={{ marginBottom: 12 }} />
              <h3
                style={{
                  fontFamily: "'Orbitron',monospace",
                  fontSize: 13,
                  fontWeight: 700,
                  marginBottom: 10,
                  color: t.text,
                }}
              >
                Profile
              </h3>
              <p
                style={{
                  fontFamily: "'Rajdhani',sans-serif",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: t.textSub,
                }}
              >
                Data Scientist based in{" "}
                <span style={{ color: A }}>Lahore, Pakistan</span>. I transform
                raw, chaotic data into actionable intelligence through
                statistical modelling, machine learning, and compelling
                visualization.
              </p>
            </div>
          </Reveal>

          {/* Expertise */}
          <Reveal delay={0.13}>
            <div
              style={{
                ...card,
                borderRadius: 8,
                padding: mob ? 18 : 26,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="ctlb"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 14,
                  height: 14,
                }}
              />
              <Zap size={22} color={A} style={{ marginBottom: 12 }} />
              <h3
                style={{
                  fontFamily: "'Orbitron',monospace",
                  fontSize: 13,
                  fontWeight: 700,
                  marginBottom: 14,
                  color: t.text,
                }}
              >
                Expertise
              </h3>
              {[
                ["Machine Learning", 92],
                ["Data Visualization", 88],
                ["NLP / Deep Learning", 82],
                ["Statistical Analysis", 90],
              ].map(([label, v]) => (
                <div key={label} style={{ marginBottom: 11 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Rajdhani',sans-serif",
                        fontSize: 13,
                        color: t.textSub,
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: 10,
                        color: A,
                      }}
                    >
                      {v}%
                    </span>
                  </div>
                  <div
                    style={{ height: 3, background: t.border, borderRadius: 2 }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${v}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      style={{ height: "100%", borderRadius: 2 }}
                      className="tbar"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.18}>
            <div
              style={{
                ...card,
                borderRadius: 8,
                padding: mob ? 18 : 26,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="ctlb"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 14,
                  height: 14,
                }}
              />
              <Star size={22} color={A} style={{ marginBottom: 12 }} />
              <h3
                style={{
                  fontFamily: "'Orbitron',monospace",
                  fontSize: 13,
                  fontWeight: 700,
                  marginBottom: 14,
                  color: t.text,
                }}
              >
                Stats
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                {[
                  ["1+", "Years Exp."],
                  ["20+", "Projects"],
                  ["15+", "Certs"],
                  ["96%", "Best Acc."],
                ].map(([n, label]) => (
                  <div
                    key={label}
                    style={{
                      textAlign: "center",
                      padding: "10px 6px",
                      background: t.accentDim,
                      borderRadius: 6,
                      border: `1px solid ${t.border}`,
                    }}
                  >
                    <div
                      className="gt"
                      style={{
                        fontFamily: "'Orbitron',monospace",
                        fontSize: mob ? 17 : 20,
                        fontWeight: 700,
                      }}
                    >
                      {n}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Rajdhani',sans-serif",
                        fontSize: 11,
                        color: t.textMute,
                        marginTop: 2,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Skill Badges */}
        <Reveal>
          <h3
            style={{
              fontFamily: "'Orbitron',monospace",
              fontSize: 15,
              fontWeight: 700,
              marginBottom: 18,
              color: t.text,
            }}
          >
            DATA SCIENCE <span className="gt">SKILLS</span>
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
            {SKILLS.map((s, i) => (
              <motion.span
                key={s}
                className="sk"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 11,
                  padding: "7px 13px",
                  border: `1px solid ${t.border}`,
                  borderRadius: 4,
                  color: t.textSub,
                  background: t.bgCard,
                  backdropFilter: "blur(8px)",
                  cursor: "default",
                  transition: "all .25s",
                }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </Reveal>

        {/* Tools */}
        <Reveal delay={0.12}>
          <h3
            style={{
              fontFamily: "'Orbitron',monospace",
              fontSize: 15,
              fontWeight: 700,
              margin: mob ? "40px 0 18px" : "52px 0 22px",
              color: t.text,
            }}
          >
            TOOLS &amp; <span className="gt">TECHNOLOGY</span>
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(min(100%,170px),1fr))",
              gap: mob ? 11 : 16,
            }}
          >
            {TOOLS.map(({ name, icon: Icon, level }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.03 }}
                style={{
                  ...card,
                  borderRadius: 8,
                  padding: "16px 16px 13px",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 11,
                  }}
                >
                  <Icon size={15} color={A} />
                  <span
                    style={{
                      fontFamily: "'Rajdhani',sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      color: t.text,
                    }}
                  >
                    {name}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 10,
                      color: A,
                    }}
                  >
                    {level}%
                  </span>
                </div>
                <div
                  style={{ height: 3, background: t.border, borderRadius: 2 }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.05 }}
                    style={{ height: "100%", borderRadius: 2 }}
                    className="tbar"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        style={{
          padding: sp,
          background: isDark ? "rgba(0,243,255,0.01)" : "rgba(0,120,200,0.022)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div className="slabel" style={{ marginBottom: 10 }}>
              Projects
            </div>
            <h2
              style={{
                fontFamily: "'Orbitron',monospace",
                fontSize: "clamp(20px,4vw,36px)",
                fontWeight: 700,
                marginBottom: 28,
                color: t.text,
              }}
            >
              FEATURED <span className="gt">WORK</span>
            </h2>
            {/* Filter row — horizontally scrollable on mobile */}
            <div
              style={{
                display: "flex",
                gap: 9,
                marginBottom: 36,
                overflowX: "auto",
                paddingBottom: 2,
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
            >
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`fb ${filter === c ? "act" : ""}`}
                  style={{
                    flexShrink: 0,
                    padding: "8px 16px",
                    border: `1px solid ${t.border}`,
                    borderRadius: 4,
                    background: "transparent",
                    color: filter === c ? "#000" : t.textSub,
                    fontFamily: "'Rajdhani',sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: 1.5,
                    transition: "all .25s",
                    cursor: "pointer",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fill,minmax(min(100%,${mob ? "100%" : "290px"}),1fr))`,
                gap: mob ? 12 : 20,
              }}
            >
              {filtered.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="pc"
                  style={{
                    ...card,
                    borderRadius: 8,
                    padding: mob ? 18 : 24,
                    position: "relative",
                    overflow: "hidden",
                    transition: "all .3s",
                    ...(p.highlight ? { borderColor: `${A}44` } : {}),
                  }}
                >
                  {p.highlight && (
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: 8,
                        letterSpacing: 2,
                        color: A,
                        border: `1px solid ${A}`,
                        padding: "2px 6px",
                        borderRadius: 2,
                      }}
                    >
                      FEATURED
                    </div>
                  )}
                  <div
                    className="ctlb"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 12,
                      height: 12,
                    }}
                  />
                  <div style={{ marginBottom: 5 }}>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: 9,
                        color: t.textMute,
                        letterSpacing: 2,
                      }}
                    >
                      [{p.cat}]
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Orbitron',monospace",
                      fontSize: 13,
                      fontWeight: 700,
                      color: t.text,
                      marginBottom: 9,
                    }}
                  >
                    {p.name}
                  </h3>
            <p
              style={{
                fontFamily: "'Rajdhani',sans-serif",
                fontSize: 14,
                lineHeight: 1.7,
                color: t.textSub,
                marginBottom: 14,
              }}
            >
              {p.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  </div>
</section>

      {/* ── TIMELINE ── */}
      <section
        id="timeline"
        style={{ padding: sp, maxWidth: 900, margin: "0 auto" }}
      >
        <Reveal>
          <div className="slabel" style={{ marginBottom: 10 }}>
            Experience & Certifications
          </div>
          <h2
            style={{
              fontFamily: "'Orbitron',monospace",
              fontSize: "clamp(20px,4vw,36px)",
              fontWeight: 700,
              marginBottom: 48,
              color: t.text,
            }}
          >
            MY <span className="gt">JOURNEY</span>
          </h2>
        </Reveal>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: mob ? 15 : 17,
              top: 0,
              bottom: 0,
              width: 1,
              background: `linear-gradient(180deg,${A}88,${A}22,transparent)`,
            }}
          />
          {TIMELINE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div
                style={{
                  display: "flex",
                  gap: mob ? 14 : 24,
                  paddingBottom: mob ? 24 : 36,
                  position: "relative",
                }}
              >
                <div style={{ flexShrink: 0, zIndex: 2, paddingTop: 2 }}>
                  <div
                    className="tnode"
                    style={{
                      width: mob ? 30 : 34,
                      height: mob ? 30 : 34,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <item.icon size={mob ? 12 : 14} color="#000" />
                  </div>
                </div>
                <motion.div
                  whileHover={{ x: 3 }}
                  style={{
                    ...card,
                    borderRadius: 8,
                    padding: mob ? "14px 14px" : "17px 20px",
                    flex: 1,
                    position: "relative",
                    overflow: "hidden",
                    minWidth: 0,
                  }}
                >
                  <div
                    className="ctlb"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 11,
                      height: 11,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: 5,
                      marginBottom: 5,
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: "'Orbitron',monospace",
                          fontSize: mob ? 11 : 12,
                          fontWeight: 700,
                          color: t.text,
                          wordBreak: "break-word",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.title}
                      </h3>
                      <div
                        style={{
                          fontFamily: "'Rajdhani',sans-serif",
                          fontSize: 12,
                          color: A,
                          marginTop: 2,
                        }}
                      >
                        {item.org}
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: 9,
                        color: t.textMute,
                        border: `1px solid ${t.border}`,
                        padding: "2px 6px",
                        borderRadius: 3,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {item.date}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Rajdhani',sans-serif",
                      fontSize: 13,
                      lineHeight: 1.65,
                      color: t.textSub,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="contact"
        style={{
          padding: sp,
          background: isDark ? "rgba(0,243,255,0.01)" : "rgba(0,120,200,0.022)",
        }}
      >
        <div
          style={{
            maxWidth: 660,
            margin: "0 auto",
            textAlign: "center",
            padding: `0 ${px}`,
          }}
        >
          <Reveal>
            <div className="slabel" style={{ marginBottom: 10 }}>
              Contact
            </div>
            <h2
              style={{
                fontFamily: "'Orbitron',monospace",
                fontSize: "clamp(20px,4vw,36px)",
                fontWeight: 700,
                marginBottom: 14,
                color: t.text,
              }}
            >
              LET'S <span className="gt">CONNECT</span>
            </h2>
            <p
              style={{
                fontFamily: "'Rajdhani',sans-serif",
                fontSize: mob ? 15 : 17,
                color: t.textSub,
                marginBottom: 36,
                lineHeight: 1.7,
              }}
            >
              Open to opportunities, collaborations, and interesting data
              problems. My inbox is always open.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <a
              href="mailto:mkhinshanarif11@gmail.com"
              className="bs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "12px 26px",
                borderRadius: 4,
                textDecoration: "none",
                fontFamily: "'Rajdhani',sans-serif",
                fontSize: 13,
                letterSpacing: 2,
                marginBottom: 40,
              }}
            >
              <Mail size={15} /> SEND MESSAGE
            </a>
          </Reveal>
          <Reveal delay={0.13}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4,1fr)",
                gap: 10,
              }}
            >
              {[
                { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/muhammad-khinshan-arif-107282296/?skipRedirect=true" },
                { icon: Github, label: "GitHub", url: "https://github.com/mkhinshanarif" },
                { icon: Globe, label: "Kaggle", url: "https://www.kaggle.com/your-username" },
              ].map(({ icon: Icon, label, url }) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"

                  whileHover={{ y: -3 }}
                  className="soc"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 7,
                    padding: "11px 8px",
                    border: `1px solid ${t.border}`,
                    borderRadius: 6,
                    textDecoration: "none",
                    fontFamily: "'Rajdhani',sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: 0.5,
                    color: t.textSub,
                    background: t.bgCard,
                    backdropFilter: "blur(8px)",
                    transition: "all .25s",
                  }}
                >
                  <Icon size={14} /> {label}
                </motion.a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div
              style={{
                marginTop: 56,
                paddingTop: 24,
                borderTop: `1px solid ${t.border}`,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: mob ? 9 : 10,
                  color: t.textMute,
                  letterSpacing: 2,
                  lineHeight: 1.9,
                }}
              >
                © 2025 MUHAMMAD KHINSHAN ARIF · BUILT WITH PRECISION
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <motion.button
        className="fab"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, type: "spring", stiffness: 220 }}
        onClick={() => {
          const link = document.createElement('a');
          link.href = 'public/Muhammad_Khinshan_Arif_Resume .pdf'; // Path to file in public folder
          link.download = 'Muhammad_Khinshan_Arif_Resume.pdf';
          link.click();
        }}
        title="Download Resume"
      >
        <Download size={15} />
        <span className="fab-txt">RESUME</span>
      </motion.button>
    </div>
  );
}
