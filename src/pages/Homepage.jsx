import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const C = {
  cream: "#F5F0E8", linen: "#EDE6D8", parchment: "#E8DFD0",
  forest: "#2D4A3E", forestDeep: "#1E352B", charcoal: "#2C2926",
  warmGray: "#6B6560", stone: "#9C9590", gold: "#B8976A",
  turmeric: "#E8A838", saffron: "#D4764E", rose: "#C45A7B",
  neem: "#5A9E6F", sandalwood: "#C4A97D", lavender: "#8B7EB8",
};

const products = [
  { id: 1, name: "Kumkumadi Glow Serum", sub: "Radiance-boosting face serum", price: 899, ingredient: "Saffron", origin: "Pampore, Kashmir", accent: C.saffron, tag: "Bestseller", height: 340 },
  { id: 2, name: "Haldi & Honey Cleanser", sub: "Gentle brightening face wash", price: 649, ingredient: "Turmeric", origin: "Lakadong, Meghalaya", accent: C.turmeric, tag: null, height: 310 },
  { id: 3, name: "Rose & Jojoba Moisturizer", sub: "Deep hydration day cream", price: 799, ingredient: "Rose", origin: "Kannauj, Uttar Pradesh", accent: C.rose, tag: null, height: 360 },
  { id: 4, name: "Neem Purifying Mask", sub: "Weekly detox clay mask", price: 749, ingredient: "Neem", origin: "Vrindavan, Uttar Pradesh", accent: C.neem, tag: "New", height: 320 },
];

const ritualSteps = [
  { step: 1, type: "Cleanse", product: "Haldi & Honey Cleanser", desc: "Wet your face. Take a pea-sized amount. Massage in gentle circles for 60 seconds. Rinse with lukewarm water.", accent: C.turmeric, ingredient: "Turmeric" },
  { step: 2, type: "Treat", product: "Kumkumadi Glow Serum", desc: "Pat skin dry. Press 3-4 drops between your palms. Press gently onto face and neck. Let it absorb for 2 minutes.", accent: C.saffron, ingredient: "Saffron" },
  { step: 3, type: "Moisturize", product: "Rose & Jojoba Moisturizer", desc: "Take a small dollop. Warm between fingers. Press and sweep across face in upward motions. Don't forget your neck.", accent: C.rose, ingredient: "Rose" },
];

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function PaperTexture() {
  return <div style={{
    position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.028, mixBlendMode: "multiply",
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    backgroundSize: "180px 180px",
  }} />;
}

function BotanicalScatter({ top, items, children }) {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top, height: 200, pointerEvents: "none", zIndex: 3 }}>
      <svg viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
        {items}
      </svg>
      {children}
    </div>
  );
}

function SaffronStrands() {
  return [
    { x: 80, y: 90, r: -25, l: 48 }, { x: 230, y: 110, r: 18, l: 38 },
    { x: 380, y: 75, r: -42, l: 52 }, { x: 520, y: 120, r: 30, l: 34 },
    { x: 670, y: 85, r: -12, l: 46 }, { x: 810, y: 105, r: 45, l: 40 },
    { x: 960, y: 70, r: -35, l: 50 }, { x: 1100, y: 95, r: 22, l: 38 },
    { x: 1250, y: 115, r: -18, l: 44 },
  ].map((s, i) => (
    <g key={i} transform={`translate(${s.x},${s.y}) rotate(${s.r})`} opacity={0.09 + Math.sin(i * 1.7) * 0.03}>
      <line x1={-s.l / 2} y1="0" x2={s.l / 2} y2="0" stroke={C.saffron} strokeWidth="1" strokeLinecap="round" />
      <circle cx={-s.l / 2 - 2} cy="0" r="1.2" fill={C.saffron} opacity="0.5" />
      <circle cx={s.l / 2 + 2} cy="0" r="1.2" fill={C.saffron} opacity="0.5" />
    </g>
  ));
}

function DriftingLeaves() {
  return [
    { x: 120, y: 80, s: 1.2, r: -20 }, { x: 300, y: 110, s: 0.8, r: 35 },
    { x: 480, y: 70, s: 1, r: -45 }, { x: 640, y: 120, s: 0.7, r: 15 },
    { x: 800, y: 85, s: 1.1, r: -30 }, { x: 960, y: 115, s: 0.9, r: 50 },
    { x: 1120, y: 75, s: 1, r: -10 }, { x: 1280, y: 105, s: 0.8, r: 40 },
  ].map((l, i) => (
    <g key={i} transform={`translate(${l.x},${l.y}) scale(${l.s}) rotate(${l.r})`} opacity={0.06 + i * 0.006}>
      <path d="M0 0 Q-8 -18 3 -32 Q12 -20 0 0Z" fill={C.neem} />
      <path d="M0 0 Q12 -14 22 -24 Q16 -8 0 0Z" fill={C.neem} opacity="0.8" />
      <path d="M3 -32 Q3 -20 0 -10" fill="none" stroke={C.forest} strokeWidth="0.3" opacity="0.3" />
    </g>
  ));
}

function RosePetals() {
  return [
    { x: 140, y: 90, r: -15, s: 1 }, { x: 300, y: 110, r: 40, s: 0.8 },
    { x: 460, y: 75, r: -50, s: 1.1 }, { x: 600, y: 120, r: 25, s: 0.7 },
    { x: 760, y: 80, r: -30, s: 0.9 }, { x: 920, y: 115, r: 55, s: 1 },
    { x: 1080, y: 70, r: -20, s: 0.8 }, { x: 1240, y: 100, r: 35, s: 0.9 },
  ].map((p, i) => (
    <g key={i} transform={`translate(${p.x},${p.y}) scale(${p.s}) rotate(${p.r})`} opacity={0.07 + Math.sin(i * 1.5) * 0.02}>
      <path d="M0 -8 Q8 -12 12 0 Q8 12 0 8 Q-4 4 0 -8Z" fill={C.rose} />
      <path d="M0 -8 Q-8 -12 -12 0 Q-8 12 0 8 Q4 4 0 -8Z" fill={C.rose} opacity="0.7" />
    </g>
  ));
}

function NeemCanopy() {
  return [
    { x: 60, y: 130, s: 1.6, r: 15 }, { x: 200, y: 110, s: 1.2, r: -20 },
    { x: 380, y: 140, s: 1, r: 35 }, { x: 540, y: 100, s: 1.4, r: -10 },
    { x: 700, y: 135, s: 1.1, r: 40 }, { x: 860, y: 115, s: 1.3, r: -30 },
    { x: 1020, y: 130, s: 1, r: 25 }, { x: 1180, y: 120, s: 1.2, r: -15 },
    { x: 1320, y: 140, s: 0.9, r: 30 },
  ].map((l, i) => (
    <g key={i} transform={`translate(${l.x},${l.y}) scale(${l.s}) rotate(${l.r})`} opacity={0.08 + i * 0.005}>
      <path d="M0 0 Q-10 -22 4 -38 Q14 -24 0 0Z" fill={C.neem} />
      <path d="M0 0 Q14 -16 26 -28 Q18 -10 0 0Z" fill={C.neem} opacity="0.7" />
      <path d="M0 0 Q-14 -10 -24 -18 Q-14 -4 0 0Z" fill={C.neem} opacity="0.6" />
    </g>
  ));
}

function ContinuousVine() {
  return (
    <div style={{ position: "absolute", top: 0, right: 36, width: 120, height: "100%", pointerEvents: "none", zIndex: 3, overflow: "hidden" }}>
      <svg viewBox="0 0 120 5000" style={{ width: 120, height: "100%" }} preserveAspectRatio="xMidYMin slice">
        <path d="M60 0 Q80 80 50 160 Q20 240 70 320 Q95 400 45 480 Q15 560 65 640 Q85 720 40 800 Q10 880 60 960 Q80 1040 45 1120 Q20 1200 70 1280 Q90 1360 50 1440 Q15 1520 65 1600 Q85 1680 40 1760 Q10 1840 60 1920 Q80 2000 45 2080 Q20 2160 70 2240 Q90 2320 50 2400 Q15 2480 65 2560 Q85 2640 40 2720 Q10 2800 60 2880 Q80 2960 45 3040 Q20 3120 70 3200 Q90 3280 50 3360 Q15 3440 65 3520 Q85 3600 40 3680 Q10 3760 60 3840 Q80 3920 45 4000 Q20 4080 70 4160 Q90 4240 50 4320 Q15 4400 65 4480 Q85 4560 40 4640 Q10 4720 60 4800 Q80 4880 45 4960"
          fill="none" stroke={C.forest} strokeWidth="1.2" opacity="0.12" />
        {[80, 200, 360, 520, 680, 840, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2500, 2800, 3100, 3400, 3700, 4000, 4300, 4600].map((y, i) => {
          const x = 60 + Math.sin(y / 160 * Math.PI) * 25;
          const dir = i % 2 === 0 ? 1 : -1;
          const col = [C.neem, C.forest, C.saffron, C.rose, C.turmeric][i % 5];
          return (
            <g key={i} transform={`translate(${x},${y})`} opacity={0.1 + Math.sin(i * 1.3) * 0.03}>
              <path d={`M0 0 Q${dir * 16} -12 ${dir * 28} -18 Q${dir * 20} -7 0 0Z`} fill={col} />
              <path d={`M0 0 Q${dir * 14} 7 ${dir * 24} 14 Q${dir * 16} 5 0 0Z`} fill={col} opacity="0.7" />
              {i % 3 === 0 && <circle cx={dir * 32} cy={-4} r={3 + Math.sin(i) * 1.5} fill={[C.rose, C.saffron, C.turmeric][i % 3]} opacity="0.15" />}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { label: "Shop", to: "/product/kumkumadi" },
    { label: "Rituals", to: "/quiz" },
    { label: "Ingredients", to: "/product/kumkumadi" },
    { label: "Our Story", to: null },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? `${C.cream}f2` : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      transition: "all 0.4s ease", padding: "0 32px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <div onClick={() => navigate('/')} style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: C.forest, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <svg viewBox="0 0 24 28" style={{ width: 20, height: 24 }}>
            <path d="M12 26 Q10 16 4 9 Q1 5 5 2 Q9 -1 12 3 Q15 -1 19 2 Q23 5 20 9 Q14 16 12 26Z" fill={C.forest} opacity="0.7" />
          </svg>
          Āhā
        </div>
        <div style={{ display: "flex", gap: 36 }}>
          {navLinks.map((l) => (
            <span key={l.label} onClick={() => l.to && navigate(l.to)} style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 500, color: C.forest, textDecoration: "none", letterSpacing: "0.03em", transition: "color 0.2s", cursor: "pointer" }}
              onMouseEnter={(e) => e.target.style.color = C.saffron} onMouseLeave={(e) => e.target.style.color = C.forest}>{l.label}</span>
          ))}
        </div>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.forest} strokeWidth="1.5" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
          <span style={{ position: "absolute", top: -5, right: -8, background: C.saffron, color: "white", fontSize: 9, fontWeight: 700, fontFamily: "'DM Sans'", width: 15, height: 15, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>2</span>
        </div>
      </div>
    </nav>
  );
}

function HeroContent() {
  const navigate = useNavigate();
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 200); }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 32px 140px", position: "relative" }}>
      <svg viewBox="0 0 1000 700" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <g opacity="0.5">
          {[
            { x: 700, y: 600, s: 2.2, r: -15, c: C.neem }, { x: 850, y: 350, s: 1.8, r: 30, c: C.forest },
            { x: 780, y: 120, s: 1.4, r: -40, c: C.neem }, { x: 620, y: 200, s: 1, r: 55, c: C.forest },
            { x: 50, y: 550, s: 1.5, r: 20, c: C.forest },
          ].map((l, i) => (
            <g key={i} transform={`translate(${l.x},${l.y}) scale(${l.s}) rotate(${l.r})`} opacity={0.08 + i * 0.008}>
              <path d="M0 0 Q-15 -30 5 -55 Q20 -35 0 0Z" fill={l.c} />
              <path d="M0 0 Q20 -25 40 -40 Q30 -15 0 0Z" fill={l.c} opacity="0.8" />
            </g>
          ))}
          {[{ x: 800, y: 450, s: 22, c: C.rose }, { x: 680, y: 150, s: 16, c: C.saffron }, { x: 100, y: 420, s: 12, c: C.turmeric }].map((f, i) => (
            <g key={`f${i}`} transform={`translate(${f.x},${f.y})`} opacity={0.06}>
              {[0, 60, 120, 180, 240, 300].map((a, j) => (
                <ellipse key={j} cx={Math.cos(a * Math.PI / 180) * f.s * 0.6} cy={Math.sin(a * Math.PI / 180) * f.s * 0.6} rx={f.s * 0.45} ry={f.s * 0.25} transform={`rotate(${a} ${Math.cos(a * Math.PI / 180) * f.s * 0.6} ${Math.sin(a * Math.PI / 180) * f.s * 0.6})`} fill={f.c} />
              ))}
            </g>
          ))}
        </g>
      </svg>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
        <div style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.12em", color: C.saffron, textTransform: "uppercase", marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
            <svg viewBox="0 0 40 8" style={{ width: 40, height: 8 }}><path d="M0 4 Q10 1 20 4 Q30 7 40 4" fill="none" stroke={C.saffron} strokeWidth="0.8" opacity="0.5" /></svg>
            Farm-traced organic skincare
          </div>
        </div>
        <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 84, fontWeight: 400, color: C.forest, lineHeight: 0.95, letterSpacing: "-0.035em", margin: "0 0 0 -6px", opacity: v ? 1 : 0, transform: v ? "none" : "translateX(-30px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.25s" }}>Your skin</h1>
        <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 84, fontWeight: 400, color: C.forest, lineHeight: 0.95, letterSpacing: "-0.035em", margin: "8px 0 0 -6px", fontStyle: "italic", opacity: v ? 1 : 0, transform: v ? "none" : "translateX(-30px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.4s" }}>knows.</h1>
        <div style={{ margin: "40px 0 36px", maxWidth: 380, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: "all 0.8s ease 0.6s" }}>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 17, lineHeight: 1.7, color: C.warmGray }}>Curated rituals built around hero ingredients, sourced from farms you can trace. Nature didn't hold back. Neither did we.</p>
        </div>
        <div style={{ display: "flex", gap: 16, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(12px)", transition: "all 0.7s ease 0.75s" }}>
          <button onClick={() => navigate('/quiz')} style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", background: C.forest, color: C.cream, border: "none", padding: "18px 40px", borderRadius: 100, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", gap: 12, boxShadow: `0 6px 24px ${C.forest}30` }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 32px ${C.forest}40`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 6px 24px ${C.forest}30`; }}>
            Find your ritual
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </button>
        </div>
        <div style={{ display: "flex", gap: 28, marginTop: 56, opacity: v ? 1 : 0, transition: "all 0.7s ease 0.9s" }}>
          {[{ c: C.turmeric, n: "Turmeric", p: "Meghalaya" }, { c: C.saffron, n: "Saffron", p: "Kashmir" }, { c: C.rose, n: "Rose", p: "Kannauj" }, { c: C.neem, n: "Neem", p: "Vrindavan" }].map((ing, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${ing.c}15`, border: `1.5px solid ${ing.c}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: ing.c, opacity: 0.5 }} />
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, color: C.charcoal }}>{ing.n}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.stone }}>{ing.p}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RitualContent() {
  const navigate = useNavigate();
  const stepRefs = [useScrollReveal(0.3), useScrollReveal(0.3), useScrollReveal(0.3)];
  return (
    <div style={{ padding: "100px 32px 140px", position: "relative" }}>
      <div style={{ position: "absolute", right: 60, top: 80, fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 220, color: C.forest, opacity: 0.012, lineHeight: 0.85, pointerEvents: "none", userSelect: "none" }}>Ri<br />tu<br />al</div>
      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: C.saffron, textTransform: "uppercase", marginBottom: 16 }}>The glow ritual</div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 48, fontWeight: 400, color: C.forest, margin: "0 0 12px", lineHeight: 1.1, fontStyle: "italic" }}>Three steps to luminous skin</h2>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 16, color: C.warmGray, maxWidth: 420, margin: "0 auto" }}>Each product designed to amplify the next. This is how a routine should feel.</p>
        </div>
        {ritualSteps.map((s, i) => {
          const [ref, visible] = stepRefs[i];
          return (
            <div key={i} ref={ref} style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1.2fr" : "1.2fr 1fr", gap: 48, alignItems: "center", marginBottom: i < 2 ? 32 : 0, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s` }}>
              {i % 2 === 1 && <ProductVisual accent={s.accent} ingredient={s.ingredient} />}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${s.accent}12`, border: `2px solid ${s.accent}25`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Serif Display'", fontSize: 22, color: s.accent }}>{s.step}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: s.accent, textTransform: "uppercase" }}>{s.type}</div>
                    <div style={{ fontFamily: "'DM Serif Display'", fontSize: 22, color: C.forest, fontStyle: "italic", marginTop: 2 }}>{s.product}</div>
                  </div>
                </div>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 15, lineHeight: 1.7, color: C.warmGray, borderLeft: `2px solid ${s.accent}25`, paddingLeft: 20, margin: "0 0 20px" }}>{s.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.accent, opacity: 0.4 }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: s.accent, opacity: 0.7 }}>Hero: {s.ingredient}</span>
                </div>
                {i < 2 && <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 32, fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.stone }}>
                  <svg viewBox="0 0 20 20" style={{ width: 14, height: 14 }}><path d="M10 4 L10 16 M6 12 L10 16 L14 12" fill="none" stroke={C.stone} strokeWidth="1" /></svg>
                  continue ritual
                </div>}
              </div>
              {i % 2 === 0 && <ProductVisual accent={s.accent} ingredient={s.ingredient} />}
            </div>
          );
        })}
        <div style={{ textAlign: "center", marginTop: 64 }}>
          <button onClick={() => navigate('/quiz')} style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", background: C.forest, color: C.cream, border: "none", padding: "18px 44px", borderRadius: 100, cursor: "pointer", transition: "all 0.3s", boxShadow: `0 4px 16px ${C.forest}25` }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
            Get your personalized ritual
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductVisual({ accent, ingredient }) {
  return (
    <div style={{ background: `${accent}08`, border: `1px solid ${accent}12`, borderRadius: 24, padding: 48, minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 50%, ${accent}0a, transparent 70%)` }} />
      <div style={{ width: 60, height: 120, borderRadius: "10px 10px 6px 6px", background: `${accent}20`, border: `1px solid ${accent}18`, position: "relative" }}>
        <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 22, height: 22, borderRadius: "50%", background: `${accent}30` }} />
      </div>
      <div style={{ position: "absolute", bottom: 16, left: 20, fontFamily: "'DM Mono', monospace", fontSize: 10, color: accent, opacity: 0.5 }}>{ingredient}</div>
    </div>
  );
}

function IngredientContent() {
  const [ref, visible] = useScrollReveal(0.2);
  return (
    <div ref={ref} style={{ padding: "120px 32px 140px", position: "relative" }}>
      <div style={{ position: "absolute", left: -20, top: "50%", transform: "translateY(-50%)", fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 200, color: C.saffron, opacity: 0.015, lineHeight: 0.9, pointerEvents: "none", userSelect: "none", writingMode: "vertical-lr" }}>Saffron</div>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 2, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ background: `${C.saffron}08`, border: `1px solid ${C.saffron}15`, borderRadius: 28, padding: 64, minHeight: 480, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <svg viewBox="0 0 240 320" style={{ width: 180 }}>
            <path d="M120 300 Q118 240 116 180 Q114 140 120 70" fill="none" stroke={C.saffron} strokeWidth="1.8" opacity="0.5" />
            <path d="M120 70 Q114 45 104 28 Q98 15 104 6 Q110 -2 118 8 Q120 15 120 70" fill={C.saffron} opacity="0.3" />
            <path d="M120 70 Q126 45 136 28 Q142 15 136 6 Q130 -2 122 8 Q120 15 120 70" fill={C.saffron} opacity="0.28" />
            <ellipse cx="104" cy="8" rx="6" ry="12" fill={C.saffron} opacity="0.45" transform="rotate(-12 104 8)" />
            <ellipse cx="136" cy="8" rx="6" ry="12" fill={C.saffron} opacity="0.4" transform="rotate(12 136 8)" />
            <ellipse cx="120" cy="5" rx="5" ry="14" fill={C.saffron} opacity="0.5" />
            <path d="M116 180 Q96 170 78 185 Q68 200 82 212 Q98 218 116 180" fill={C.neem} opacity="0.12" />
            <path d="M118 230 Q138 222 152 238 Q158 255 142 260 Q128 256 118 230" fill={C.neem} opacity="0.1" />
          </svg>
          <div style={{ position: "absolute", bottom: 24, left: 28, right: 28, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.saffron, opacity: 0.5 }}>Crocus sativus L.</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.stone }}>Batch #PSK-2026</span>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <svg viewBox="0 0 40 8" style={{ width: 32, height: 6 }}><path d="M0 4 Q10 1 20 4 Q30 7 40 4" fill="none" stroke={C.saffron} strokeWidth="0.8" opacity="0.5" /></svg>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: C.saffron, textTransform: "uppercase" }}>Ingredient spotlight</span>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 52, fontWeight: 400, color: C.forest, margin: "0 0 6px", lineHeight: 1.05, fontStyle: "italic" }}>Kashmiri<br />Saffron</h2>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: C.stone, margin: "0 0 32px" }}>Sourced from Pampore, Kashmir</p>
          <div style={{ borderLeft: `2px solid ${C.saffron}30`, paddingLeft: 24, marginBottom: 32 }}>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 16, lineHeight: 1.75, color: C.warmGray, margin: "0 0 16px" }}>From the fields of Pampore — the only region in India where Crocus sativus blooms. Each strand hand-harvested at dawn, when the flower first opens.</p>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 16, lineHeight: 1.75, color: C.warmGray, margin: 0 }}>Used in Ayurvedic skincare for centuries, saffron naturally brightens and gives that unmistakable inner glow.</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
            {["Brightening", "Anti-oxidant", "Anti-inflammatory"].map((b) => (
              <span key={b} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.saffron, background: `${C.saffron}0d`, border: `1px solid ${C.saffron}18`, padding: "7px 18px", borderRadius: 100 }}>{b}</span>
            ))}
          </div>
          <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: C.forest, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, background: `${C.forest}08`, padding: "14px 28px", borderRadius: 100 }}>
            Shop saffron products
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ p, i, visible }) {
  const [h, setH] = useState(false);
  const stagger = [0, 40, 16, 56][i];
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: `${C.cream}dd`, border: `1px solid ${p.accent}12`, borderRadius: 24, overflow: "hidden", cursor: "pointer",
      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", transform: h ? `translateY(${stagger - 4}px)` : `translateY(${stagger}px)`,
      boxShadow: h ? `0 16px 40px ${p.accent}18` : `0 2px 8px ${C.charcoal}04`, opacity: visible ? 1 : 0,
      backdropFilter: "blur(8px)",
    }}>
      {p.tag && <div style={{ padding: "12px 18px 0" }}><span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", background: p.tag === "Bestseller" ? C.gold : C.forest, color: C.cream, padding: "4px 12px", borderRadius: 100 }}>{p.tag}</span></div>}
      <div style={{ height: p.height - 80, position: "relative", background: `radial-gradient(circle at 50% 70%, ${p.accent}10 0%, transparent 60%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 0" }}>
        <div style={{ width: 48, height: 100, borderRadius: "8px 8px 4px 4px", background: `${p.accent}18`, border: `1px solid ${p.accent}15`, position: "relative" }}>
          <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 18, height: 18, borderRadius: "50%", background: `${p.accent}25` }} />
        </div>
      </div>
      <div style={{ padding: "16px 20px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.accent, opacity: 0.5 }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: p.accent }}>{p.ingredient} · {p.origin}</span>
        </div>
        <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 17, fontWeight: 400, color: C.forest, margin: "0 0 4px", lineHeight: 1.25 }}>{p.name}</h3>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 11, color: C.stone, margin: "0 0 16px" }}>{p.sub}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'DM Serif Display'", fontSize: 19, color: C.forest }}>₹{p.price}</span>
          <button style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", background: `${p.accent}12`, color: p.accent, border: `1px solid ${p.accent}20`, padding: "9px 18px", borderRadius: 100, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = p.accent; e.currentTarget.style.color = "white"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = `${p.accent}12`; e.currentTarget.style.color = p.accent; }}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

function ProductsContent() {
  const [ref, visible] = useScrollReveal(0.1);
  return (
    <div ref={ref} style={{ padding: "100px 32px 140px", position: "relative" }}>
      <div style={{ position: "absolute", right: 20, top: 60, fontFamily: "'DM Serif Display'", fontSize: 160, color: C.forest, opacity: 0.012, pointerEvents: "none", userSelect: "none" }}>Botanicals</div>
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: C.gold, textTransform: "uppercase", marginBottom: 12 }}>Loved by your skin</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <h2 style={{ fontFamily: "'DM Serif Display'", fontSize: 48, fontWeight: 400, color: C.forest, margin: 0, fontStyle: "italic" }}>Our essentials</h2>
            <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, color: C.forest, textDecoration: "none", display: "flex", alignItems: "center", gap: 8, background: `${C.forest}06`, padding: "10px 22px", borderRadius: 100 }}>
              View all <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
            </a>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, alignItems: "start" }}>
          {products.map((p, i) => <ProductCard key={p.id} p={p} i={i} visible={visible} />)}
        </div>
      </div>
    </div>
  );
}

function QuizContent() {
  const navigate = useNavigate();
  const [ref, visible] = useScrollReveal(0.2);
  return (
    <div ref={ref} style={{ padding: "120px 32px", position: "relative" }}>
      <svg viewBox="0 0 1000 500" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {[{ x: 100, y: 400, s: 2.5, r: 10 }, { x: 850, y: 380, s: 2, r: -20 }, { x: 750, y: 80, s: 1.5, r: 35 }].map((l, i) => (
          <g key={i} transform={`translate(${l.x},${l.y}) scale(${l.s}) rotate(${l.r})`} opacity="0.04">
            <path d="M0 0 Q-15 -30 5 -55 Q20 -35 0 0Z" fill={C.cream} />
            <path d="M0 0 Q20 -25 40 -40 Q30 -15 0 0Z" fill={C.cream} opacity="0.7" />
          </g>
        ))}
      </svg>
      <div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: `${C.cream}55`, textTransform: "uppercase", marginBottom: 24 }}>Your ritual awaits</div>
        <h2 style={{ fontFamily: "'DM Serif Display'", fontSize: 52, fontWeight: 400, color: C.cream, margin: "0 0 16px", lineHeight: 1.1, fontStyle: "italic" }}>Not sure where<br />to start?</h2>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 16, lineHeight: 1.7, color: `${C.cream}88`, margin: "0 0 44px" }}>Five questions. Two minutes. One ritual — with every ingredient traced back to its source.</p>
        <button onClick={() => navigate('/quiz')} style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", background: C.cream, color: C.forest, border: "none", padding: "20px 48px", borderRadius: 100, cursor: "pointer", transition: "all 0.3s", display: "inline-flex", alignItems: "center", gap: 12 }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
          Take the skin quiz
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>
        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 52, fontFamily: "'DM Mono', monospace", fontSize: 11, color: `${C.cream}44` }}>
          <span>5 questions</span><span style={{ color: `${C.cream}22` }}>·</span><span>16 rituals</span><span style={{ color: `${C.cream}22` }}>·</span><span>100% organic</span>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const cols = [
    { t: "Shop", links: ["All products", "Cleansers", "Serums", "Moisturizers", "Ritual kits"] },
    { t: "Discover", links: ["Ingredients", "Skin quiz", "Rituals", "Our story"] },
    { t: "Support", links: ["Shipping", "Contact", "FAQs", "Track order"] },
  ];
  return (
    <footer style={{ background: C.forestDeep, padding: "72px 32px 36px", color: C.cream }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
        <div>
          <div style={{ fontFamily: "'DM Serif Display'", fontSize: 32, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <svg viewBox="0 0 20 24" style={{ width: 18, height: 22 }}><path d="M10 22 Q8 14 3 8 Q1 5 4 2 Q7 0 10 3 Q13 0 16 2 Q19 5 17 8 Q12 14 10 22Z" fill={C.cream} opacity="0.5" /></svg>
            Āhā
          </div>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 14, lineHeight: 1.7, color: `${C.cream}66`, maxWidth: 260, marginBottom: 24 }}>Organic skincare rituals, rooted in nature. Every ingredient traced.</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[C.turmeric, C.saffron, C.rose, C.neem, C.sandalwood].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.4 }} />
            ))}
          </div>
        </div>
        {cols.map((col) => (
          <div key={col.t}>
            <h4 style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: `${C.cream}33`, margin: "0 0 20px" }}>{col.t}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {col.links.map((l) => <a key={l} href="#" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: `${C.cream}77`, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => e.target.style.color = C.cream} onMouseLeave={(e) => e.target.style.color = `${C.cream}77`}>{l}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${C.cream}0a`, paddingTop: 24, display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: `${C.cream}2a` }}>2026 Āhā Skincare. Rooted in what's real.</span>
      </div>
    </footer>
  );
}

export default function AhaV5() {
  const pageRef = useRef(null);
  const [pageH, setPageH] = useState(6000);
  useEffect(() => {
    const measure = () => { if (pageRef.current) setPageH(pageRef.current.scrollHeight); };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={pageRef} style={{ position: "relative", overflow: "hidden" }}>

      {/* ONE SINGLE CONTINUOUS BACKGROUND — no section has its own bg */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `linear-gradient(180deg,
          ${C.cream} 0%,
          ${C.cream} 12%,
          ${C.linen} 16%,
          ${C.cream} 20%,
          ${C.cream} 28%,
          ${C.parchment} 34%,
          #EFE2CC 40%,
          ${C.parchment} 46%,
          ${C.cream} 52%,
          ${C.cream} 58%,
          ${C.linen} 64%,
          ${C.cream} 70%,
          ${C.linen} 76%,
          ${C.forest}30 82%,
          ${C.forest} 86%,
          ${C.forest} 92%,
          ${C.forestDeep} 100%
        )`,
      }} />

      {/* Warm ingredient radial washes at key points */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          radial-gradient(ellipse at 70% 8%, ${C.saffron}08 0%, transparent 25%),
          radial-gradient(ellipse at 20% 15%, ${C.neem}06 0%, transparent 20%),
          radial-gradient(ellipse at 40% 38%, ${C.saffron}0a 0%, transparent 20%),
          radial-gradient(ellipse at 80% 42%, ${C.turmeric}06 0%, transparent 15%),
          radial-gradient(ellipse at 30% 58%, ${C.rose}05 0%, transparent 18%),
          radial-gradient(ellipse at 85% 70%, ${C.neem}06 0%, transparent 20%)
        `,
      }} />

      <PaperTexture />
      <ContinuousVine />
      <Navbar />

      {/* All content sections — NO backgrounds, transparent over the page gradient */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <HeroContent />
        <BotanicalScatter top="calc(100vh - 60px)" items={<SaffronStrands />} />
        <RitualContent />
        <BotanicalScatter top="auto" items={<DriftingLeaves />}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />
        </BotanicalScatter>
        <IngredientContent />
        <BotanicalScatter top="auto" items={<RosePetals />} />
        <ProductsContent />
        <BotanicalScatter top="auto" items={<NeemCanopy />} />
        <QuizContent />
      </div>

      <Footer />
    </div>
  );
}
