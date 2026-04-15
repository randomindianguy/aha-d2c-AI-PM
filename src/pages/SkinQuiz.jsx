import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const C = {
  cream: "#F5F0E8", linen: "#EDE6D8", parchment: "#E8DFD0",
  forest: "#2D4A3E", forestDeep: "#1E352B", charcoal: "#2C2926",
  warmGray: "#4A4540", stone: "#7A756F", gold: "#B8976A",
  turmeric: "#E8A838", saffron: "#D4764E", rose: "#C45A7B",
  neem: "#5A9E6F", sandalwood: "#C4A97D",
};

const questions = [
  {
    id: "skin_type", label: "Let's start with the basics",
    question: "What's your skin type?",
    subtitle: "Think about how your skin feels by midday, without any products on.",
    accent: C.turmeric, latin: "Curcuma longa",
    options: [
      { value: "dry", label: "Dry", desc: "Feels tight, sometimes flaky" },
      { value: "oily", label: "Oily", desc: "Shiny by noon, enlarged pores" },
      { value: "combination", label: "Combination", desc: "Oily T-zone, dry cheeks" },
      { value: "normal", label: "Normal", desc: "Balanced, rarely reactive" },
    ],
  },
  {
    id: "concern", label: "Now, the important part",
    question: "What's your primary skin concern?",
    subtitle: "Pick the one that bothers you most. We'll build your routine around this.",
    accent: C.saffron, latin: "Crocus sativus",
    options: [
      { value: "dullness", label: "Dullness & uneven tone", desc: "Skin looks tired, lacks glow" },
      { value: "acne", label: "Acne & breakouts", desc: "Recurring pimples, clogged pores" },
      { value: "pigmentation", label: "Pigmentation & dark spots", desc: "Sun damage, post-acne marks" },
      { value: "aging", label: "Early aging & fine lines", desc: "Loss of firmness, fine lines" },
    ],
  },
  {
    id: "sensitivity", label: "One more thing about your skin",
    question: "Is your skin sensitive?",
    subtitle: "Sensitive skin reacts easily — redness, stinging, or irritation from new products.",
    accent: C.rose, latin: "Rosa damascena",
    options: [
      { value: "yes", label: "Yes, it reacts easily", desc: "New products often cause redness or irritation" },
      { value: "no", label: "No, it's fairly resilient", desc: "I can try new things without worrying" },
    ],
  },
  {
    id: "routine_size", label: "About your ritual",
    question: "How many products are you comfortable using?",
    subtitle: "Be honest — the best routine is one you'll actually follow.",
    accent: C.sandalwood, latin: "Santalum album",
    options: [
      { value: "minimal", label: "Keep it minimal", desc: "2 products, in and out" },
      { value: "full", label: "I'll make the time", desc: "3-4 products, the full ritual" },
    ],
  },
  {
    id: "time", label: "Almost there",
    question: "When do you want your ritual?",
    subtitle: "Morning routines protect. Evening routines repair. Both does it all.",
    accent: C.neem, latin: "Azadirachta indica",
    options: [
      { value: "morning", label: "Morning only", desc: "Quick routine before I head out" },
      { value: "evening", label: "Evening only", desc: "Wind-down ritual before bed" },
      { value: "both", label: "Both morning & evening", desc: "I want the full experience" },
    ],
  },
];

const routineResults = {
  dullness: {
    name: "The glow ritual", tagline: "Radiance restored, naturally",
    products: [
      { name: "Haldi & Honey Cleanser", type: "Cleanse", ingredient: "Turmeric", origin: "Lakadong, Meghalaya", price: 649, accent: C.turmeric, desc: "Gently dissolves impurities while turmeric brightens with every wash." },
      { name: "Kumkumadi Glow Serum", type: "Treat", ingredient: "Saffron", origin: "Pampore, Kashmir", price: 899, accent: C.saffron, desc: "Concentrated saffron extract targets dullness and evens your skin tone." },
      { name: "Rose & Jojoba Moisturizer", type: "Moisturize", ingredient: "Rose", origin: "Kannauj, UP", price: 799, accent: C.rose, desc: "Locks in moisture with a dewy finish. Your skin glows, not shines." },
    ],
  },
  acne: {
    name: "The clear ritual", tagline: "Calm the storm, clear the path",
    products: [
      { name: "Neem Purifying Cleanser", type: "Cleanse", ingredient: "Neem", origin: "Vrindavan, UP", price: 599, accent: C.neem, desc: "Antibacterial neem draws out impurities without stripping moisture." },
      { name: "Tea Tree Clarifying Serum", type: "Treat", ingredient: "Tea Tree", origin: "Nilgiris, TN", price: 749, accent: C.neem, desc: "Targets active breakouts. Light, non-comedogenic formula." },
      { name: "Aloe Barrier Gel", type: "Moisturize", ingredient: "Aloe Vera", origin: "Rajasthan", price: 599, accent: C.neem, desc: "Weightless gel that hydrates without clogging pores." },
    ],
  },
  pigmentation: {
    name: "The even ritual", tagline: "Every spot tells a story. Let's write a new one.",
    products: [
      { name: "Saffron Brightening Cleanser", type: "Cleanse", ingredient: "Saffron", origin: "Pampore, Kashmir", price: 699, accent: C.saffron, desc: "Saffron-infused milk that gently fades dark spots daily." },
      { name: "Kumkumadi Glow Serum", type: "Treat", ingredient: "Saffron", origin: "Pampore, Kashmir", price: 899, accent: C.saffron, desc: "23 Ayurvedic herbs working together to restore even tone." },
      { name: "Sandalwood Day Cream SPF 30", type: "Protect", ingredient: "Sandalwood", origin: "Marayoor, Kerala", price: 849, accent: C.sandalwood, desc: "Prevents new pigmentation while sandalwood soothes." },
    ],
  },
  aging: {
    name: "The renew ritual", tagline: "Age is earned. Radiance is maintained.",
    products: [
      { name: "Rose Cream Cleanser", type: "Cleanse", ingredient: "Rose", origin: "Kannauj, UP", price: 699, accent: C.rose, desc: "Gentle cream cleanser that hydrates while it cleans." },
      { name: "Bakuchiol Night Serum", type: "Treat", ingredient: "Bakuchiol", origin: "Rajasthan", price: 949, accent: C.rose, desc: "Nature's retinol alternative. Firms skin without irritation." },
      { name: "Rose & Jojoba Moisturizer", type: "Moisturize", ingredient: "Rose", origin: "Kannauj, UP", price: 799, accent: C.rose, desc: "Deep nourishment that plumps and protects." },
    ],
  },
};

function BotanicalIllustration({ step, accent }) {
  const plants = [
    // Q1: Turmeric rhizomes
    <g key="t" opacity="0.55"><path d="M100 250 Q98 210 95 170 Q92 140 100 80" fill="none" stroke={C.turmeric} strokeWidth="2" opacity="0.5" /><path d="M100 80 Q85 70 72 80 Q60 95 70 110 Q82 118 100 80" fill={C.turmeric} opacity="0.25" /><path d="M100 80 Q115 68 130 75 Q142 88 132 105 Q118 113 100 80" fill={C.turmeric} opacity="0.2" /><ellipse cx="85" cy="40" rx="20" ry="35" fill={C.turmeric} opacity="0.2" transform="rotate(-15 85 40)" /><ellipse cx="115" cy="45" rx="16" ry="30" fill={C.turmeric} opacity="0.17" transform="rotate(12 115 45)" /><ellipse cx="100" cy="35" rx="14" ry="32" fill={C.turmeric} opacity="0.22" /><path d="M95 170 Q78 162 65 175 Q58 188 68 195 Q82 198 95 170" fill={C.neem} opacity="0.1" /><path d="M98 210 Q115 204 125 215 Q130 228 120 232 Q108 228 98 210" fill={C.neem} opacity="0.08" /></g>,
    // Q2: Saffron crocus
    <g key="s" opacity="0.55"><path d="M100 250 Q98 200 96 150 Q94 120 100 55" fill="none" stroke={C.saffron} strokeWidth="1.8" opacity="0.5" /><path d="M100 55 Q94 32 85 18 Q80 8 86 0 Q92 -6 98 4 Q100 10 100 55" fill={C.saffron} opacity="0.3" /><path d="M100 55 Q106 32 115 18 Q120 8 114 0 Q108 -6 102 4 Q100 10 100 55" fill={C.saffron} opacity="0.27" /><ellipse cx="85" cy="2" rx="5" ry="14" fill={C.saffron} opacity="0.45" transform="rotate(-12 85 2)" /><ellipse cx="115" cy="2" rx="5" ry="14" fill={C.saffron} opacity="0.4" transform="rotate(12 115 2)" /><ellipse cx="100" cy="-2" rx="4" ry="15" fill={C.saffron} opacity="0.5" /><path d="M96 150 Q78 142 65 155 Q58 168 68 176 Q82 180 96 150" fill={C.neem} opacity="0.1" /><path d="M98 200 Q115 194 126 206 Q130 218 120 222 Q108 218 98 200" fill={C.neem} opacity="0.08" /></g>,
    // Q3: Rose bloom
    <g key="r" opacity="0.55"><path d="M100 250 Q98 210 100 160 Q102 120 100 90" fill="none" stroke={C.rose} strokeWidth="1.5" opacity="0.4" /><g transform="translate(100, 50)">{[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => <ellipse key={i} cx={Math.cos(a*Math.PI/180)*20} cy={Math.sin(a*Math.PI/180)*20} rx="16" ry="9" transform={`rotate(${a} ${Math.cos(a*Math.PI/180)*20} ${Math.sin(a*Math.PI/180)*20})`} fill={C.rose} opacity={0.14+i*0.008} />)}{[0, 72, 144, 216, 288].map((a, i) => <ellipse key={`i${i}`} cx={Math.cos(a*Math.PI/180)*9} cy={Math.sin(a*Math.PI/180)*9} rx="9" ry="5" transform={`rotate(${a} ${Math.cos(a*Math.PI/180)*9} ${Math.sin(a*Math.PI/180)*9})`} fill={C.rose} opacity={0.18+i*0.015} />)}<circle r="5" fill={C.saffron} opacity="0.2" /></g><path d="M96 160 Q80 155 70 165 Q64 178 75 183 Q88 185 96 160" fill={C.neem} opacity="0.1" /><path d="M104 190 Q118 185 126 195 Q130 208 120 212 Q110 208 104 190" fill={C.neem} opacity="0.08" /></g>,
    // Q4: Sandalwood
    <g key="w" opacity="0.55"><path d="M100 250 Q95 200 90 150 Q88 120 95 70 Q100 45 105 28" fill="none" stroke={C.sandalwood} strokeWidth="2.5" opacity="0.3" /><path d="M95 70 Q70 60 55 75 Q48 90 62 100 Q78 105 95 70" fill={C.neem} opacity="0.12" /><path d="M100 110 Q125 98 138 110 Q145 128 130 135 Q115 132 100 110" fill={C.neem} opacity="0.1" /><path d="M90 150 Q68 145 58 158 Q52 172 65 178 Q78 175 90 150" fill={C.neem} opacity="0.08" /><path d="M105 28 Q95 15 88 22 Q92 30 105 28" fill={C.sandalwood} opacity="0.2" /><path d="M105 28 Q115 16 122 24 Q115 32 105 28" fill={C.sandalwood} opacity="0.17" /></g>,
    // Q5: Neem compound leaves
    <g key="n" opacity="0.55"><path d="M100 250 Q100 200 98 150 Q96 110 100 60" fill="none" stroke={C.neem} strokeWidth="1.5" opacity="0.4" />{[{y:60,d:1,s:1},{y:90,d:-1,s:0.85},{y:120,d:1,s:0.75},{y:148,d:-1,s:0.9},{y:178,d:1,s:0.7}].map((b,i) => <g key={i} transform={`translate(${100+b.d*5},${b.y}) scale(${b.s})`}><path d={`M0 0 Q${b.d*15} -10 ${b.d*32} -6`} fill="none" stroke={C.neem} strokeWidth="0.5" opacity="0.3" />{[-10,-3,4,11].map((o,j) => <ellipse key={j} cx={b.d*(14+j*5)} cy={o-3} rx="7" ry="3.5" fill={C.neem} opacity={0.1+j*0.015} transform={`rotate(${b.d*(8+j*4)} ${b.d*(14+j*5)} ${o-3})`} />)}</g>)}<g transform="translate(100,38)">{[0,72,144,216,288].map((a,i) => <circle key={i} cx={Math.cos(a*Math.PI/180)*7} cy={Math.sin(a*Math.PI/180)*7} r="2" fill={C.neem} opacity="0.15" />)}<circle r="3" fill={C.turmeric} opacity="0.12" /></g></g>,
  ];

  return (
    <div style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-55%)", width: 200, height: 280, pointerEvents: "none", zIndex: 1 }}>
      <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>{plants[step]}</svg>
      <div style={{ textAlign: "center", marginTop: 4, fontFamily: "'DM Mono', monospace", fontSize: 9, color: accent, opacity: 0.3, letterSpacing: "0.04em", fontStyle: "italic" }}>{questions[step].latin}</div>
    </div>
  );
}

function ScatteredElements({ accent }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      <svg viewBox="0 0 1000 700" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {[
          { x: 60, y: 100, r: 25 }, { x: 900, y: 150, r: -40 },
          { x: 80, y: 550, r: 55 }, { x: 920, y: 520, r: -15 },
          { x: 450, y: 650, r: 35 }, { x: 150, y: 320, r: -50 },
          { x: 850, y: 350, r: 20 },
        ].map((s, i) => (
          <g key={i} transform={`translate(${s.x},${s.y}) rotate(${s.r})`} opacity={0.04 + Math.sin(i * 1.7) * 0.015}>
            <path d={`M0 0 Q-7 -16 2 -28 Q10 -18 0 0Z`} fill={accent} />
            <path d={`M0 0 Q10 -12 18 -20 Q13 -7 0 0Z`} fill={accent} opacity="0.7" />
          </g>
        ))}
        {[...Array(10)].map((_, i) => (
          <circle key={`p${i}`} cx={80 + i * 90 + Math.sin(i * 2.7) * 30} cy={100 + Math.cos(i * 1.9) * 250 + 200}
            r={1.2 + Math.sin(i * 1.3) * 0.6} fill={accent} opacity={0.03 + Math.sin(i) * 0.01} />
        ))}
      </svg>
    </div>
  );
}

function OptionCard({ option, selected, onSelect, accent, wide }) {
  const [hovered, setHovered] = useState(false);
  const active = selected || hovered;

  return (
    <button onClick={() => onSelect(option.value)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%", textAlign: "left",
        background: selected ? `${accent}0c` : `${C.cream}bb`,
        border: `1.5px solid ${selected ? accent + "35" : active ? accent + "20" : C.charcoal + "06"}`,
        borderRadius: 18, padding: wide ? "22px 24px" : "18px 20px",
        cursor: "pointer", backdropFilter: "blur(8px)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: active ? "translateY(-2px)" : "none",
        boxShadow: active ? `0 8px 28px ${accent}12` : `0 1px 4px ${C.charcoal}04`,
        display: "flex", alignItems: "center", gap: 14,
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        width: 22, height: 22, borderRadius: "50%",
        border: `2px solid ${selected ? accent : C.stone + "40"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.3s", flexShrink: 0,
        background: selected ? `${accent}10` : "transparent",
      }}>
        {selected && <div style={{ width: 10, height: 10, borderRadius: "50%", background: accent }} />}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 600, color: selected ? accent : C.charcoal, transition: "color 0.3s" }}>{option.label}</div>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: C.warmGray, marginTop: 2, lineHeight: 1.4 }}>{option.desc}</div>
      </div>
      {selected && (
        <svg viewBox="0 0 18 18" style={{ width: 16, height: 16, flexShrink: 0 }}>
          <circle cx="9" cy="9" r="8" fill={accent} opacity="0.12" />
          <path d="M5 9 L8 12 L13 6" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function QuestionScreen({ question, step, total, answer, onAnswer, onBack, visible }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "80px 32px 60px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(50px)",
      transition: "all 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
      pointerEvents: visible ? "auto" : "none",
    }}>
      <ScatteredElements accent={question.accent} />
      <BotanicalIllustration step={step} accent={question.accent} />

      <div style={{ maxWidth: 480, width: "100%", textAlign: "center", position: "relative", zIndex: 5 }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          marginBottom: 24,
        }}>
          <svg viewBox="0 0 30 6" style={{ width: 22, height: 5 }}>
            <path d="M0 3 Q7 1 15 3 Q23 5 30 3" fill="none" stroke={question.accent} strokeWidth="0.6" opacity="0.4" />
          </svg>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: question.accent, textTransform: "uppercase" }}>{question.label}</span>
          <svg viewBox="0 0 30 6" style={{ width: 22, height: 5, transform: "scaleX(-1)" }}>
            <path d="M0 3 Q7 1 15 3 Q23 5 30 3" fill="none" stroke={question.accent} strokeWidth="0.6" opacity="0.4" />
          </svg>
        </div>

        <h2 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 34, fontWeight: 400, color: C.forest,
          lineHeight: 1.2, margin: "0 0 10px", fontStyle: "italic",
        }}>{question.question}</h2>

        <p style={{
          fontFamily: "'DM Sans'", fontSize: 13, color: C.warmGray,
          lineHeight: 1.6, margin: "0 0 40px", maxWidth: 380, marginLeft: "auto", marginRight: "auto",
        }}>{question.subtitle}</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: question.options.length <= 2 ? "1fr" : "1fr 1fr",
          gap: 10, maxWidth: question.options.length <= 2 ? 380 : 480,
          margin: "0 auto",
        }}>
          {question.options.map((opt) => (
            <OptionCard key={opt.value} option={opt} selected={answer === opt.value}
              onSelect={onAnswer} accent={question.accent} wide={question.options.length <= 2} />
          ))}
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
          marginTop: 44,
        }}>
          {step > 0 && (
            <button onClick={onBack} style={{
              fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 500,
              color: C.stone, background: "none", border: "none",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
              padding: "8px 14px", borderRadius: 100, transition: "color 0.2s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = C.forest}
              onMouseLeave={(e) => e.currentTarget.style.color = C.stone}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
              Back
            </button>
          )}
          <div style={{ display: "flex", gap: 5 }}>
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} style={{
                width: i === step ? 22 : 6, height: 6, borderRadius: 3,
                background: i <= step ? question.accent : `${C.forest}12`,
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsScreen({ answers, visible }) {
  const routine = routineResults[answers.concern] || routineResults.dullness;
  const isMinimal = answers.routine_size === "minimal";
  const prods = isMinimal ? routine.products.slice(0, 2) : routine.products;
  const total = prods.reduce((s, p) => s + p.price, 0);
  const [reveal, setReveal] = useState(-1);

  useEffect(() => {
    if (!visible) { setReveal(-1); return; }
    const t = prods.map((_, i) => setTimeout(() => setReveal(i), 500 + i * 350));
    return () => t.forEach(clearTimeout);
  }, [visible, prods.length]);

  return (
    <div style={{
      position: "absolute", inset: 0,
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)",
      transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      pointerEvents: visible ? "auto" : "none", overflowY: "auto",
    }}>
      <ScatteredElements accent={prods[0]?.accent || C.saffron} />

      <div style={{ maxWidth: 580, margin: "0 auto", padding: "80px 32px 60px", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: C.gold, textTransform: "uppercase", marginBottom: 18 }}>Your personalized ritual</div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 42, fontWeight: 400, color: C.forest, margin: "0 0 8px", fontStyle: "italic", lineHeight: 1.1 }}>{routine.name}</h2>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: C.warmGray, margin: "0 0 14px" }}>{routine.tagline}</p>
          <div style={{ display: "inline-flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
            {[answers.skin_type && `${answers.skin_type} skin`, answers.concern, answers.sensitivity === "yes" && "sensitive"].filter(Boolean).map((tag, i) => (
              <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.04em", color: C.forest, background: `${C.forest}08`, border: `1px solid ${C.forest}10`, padding: "4px 12px", borderRadius: 100, textTransform: "capitalize" }}>{tag}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {prods.map((p, i) => (
            <div key={i}>
              <div style={{ opacity: reveal >= i ? 1 : 0, transform: reveal >= i ? "none" : "translateY(24px)", transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                <div style={{ background: `${p.accent}06`, border: `1px solid ${p.accent}10`, borderRadius: 20, padding: "22px 24px", display: "flex", gap: 18, alignItems: "flex-start", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -15, right: -15, width: 50, height: 50, borderRadius: "50%", background: p.accent, opacity: 0.03 }} />
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${p.accent}10`, border: `2px solid ${p.accent}18`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Serif Display'", fontSize: 18, color: p.accent, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.08em", color: p.accent, textTransform: "uppercase", marginBottom: 3 }}>Step {i + 1} · {p.type}</div>
                    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 19, color: C.forest, fontStyle: "italic", marginBottom: 6, lineHeight: 1.25 }}>{p.name}</div>
                    <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: C.warmGray, lineHeight: 1.55, margin: "0 0 10px" }}>{p.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: p.accent, opacity: 0.5 }} />
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: p.accent }}>{p.ingredient} · {p.origin}</span>
                      </div>
                      <span style={{ fontFamily: "'DM Serif Display'", fontSize: 16, color: C.forest }}>₹{p.price}</span>
                    </div>
                  </div>
                </div>
              </div>
              {i < prods.length - 1 && (
                <div style={{ display: "flex", justifyContent: "center", padding: "4px 0", opacity: reveal >= i ? 0.25 : 0, transition: "opacity 0.4s ease 0.2s" }}>
                  <svg viewBox="0 0 20 20" style={{ width: 12, height: 14 }}><path d="M10 2 L10 16 M6 12 L10 16 L14 12" fill="none" stroke={C.forest} strokeWidth="1" strokeLinecap="round" /></svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 28, padding: "20px 24px", background: `${C.forest}06`, borderRadius: 16, border: `1px solid ${C.forest}0c`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          opacity: reveal >= prods.length - 1 ? 1 : 0, transform: reveal >= prods.length - 1 ? "none" : "translateY(12px)", transition: "all 0.5s ease 0.2s",
        }}>
          <div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: C.warmGray }}>Complete ritual</div>
            <div style={{ fontFamily: "'DM Serif Display'", fontSize: 22, color: C.forest }}>₹{total}<span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.stone, marginLeft: 8 }}>{prods.length} products</span></div>
          </div>
          <button style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", background: C.forest, color: C.cream, border: "none", padding: "15px 32px", borderRadius: 100, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", gap: 10, boxShadow: `0 4px 16px ${C.forest}25` }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
            Add ritual to cart
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: 14, opacity: reveal >= prods.length - 1 ? 1 : 0, transition: "opacity 0.4s ease 0.4s" }}>
          <button style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 500, color: C.stone, background: "none", border: `1px solid ${C.charcoal}08`, padding: "10px 24px", borderRadius: 100, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = C.forest; e.currentTarget.style.borderColor = `${C.forest}25`; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.stone; e.currentTarget.style.borderColor = `${C.charcoal}08`; }}>
            Or browse individually
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SkinQuizV3() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [questions[step].id]: value }));
    setTransitioning(true);
    setTimeout(() => {
      if (step < questions.length - 1) setStep(step + 1);
      else setShowResults(true);
      setTimeout(() => setTransitioning(false), 50);
    }, 350);
  };

  const handleBack = () => {
    if (showResults) { setShowResults(false); return; }
    setTransitioning(true);
    setTimeout(() => { setStep(step - 1); setTimeout(() => setTransitioning(false), 50); }, 200);
  };

  const currentAccent = questions[step]?.accent || C.saffron;
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>

      {/* Continuous background */}
      <div style={{ position: "absolute", inset: 0, background: C.cream }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 70% 30%, ${currentAccent}0a 0%, transparent 45%), radial-gradient(ellipse at 25% 75%, ${currentAccent}06 0%, transparent 35%)`, transition: "all 0.6s ease" }} />

      {/* Paper grain */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.025, mixBlendMode: "multiply", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "180px 180px" }} />

      {/* Progress bar */}
      {!showResults && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `${C.forest}08`, zIndex: 10 }}>
          <div style={{ height: "100%", background: `linear-gradient(90deg, ${C.forest}, ${currentAccent})`, borderRadius: "0 2px 2px 0", width: `${((step + 1) / questions.length) * 100}%`, transition: "width 0.5s cubic-bezier(0.16,1,0.3,1), background 0.5s ease" }} />
        </div>
      )}

      {/* Logo */}
      <div onClick={() => navigate('/')} style={{ position: "absolute", top: 24, left: 32, zIndex: 20, fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, color: C.forest, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
        <svg viewBox="0 0 20 24" style={{ width: 16, height: 19 }}><path d="M10 22 Q8 14 3 8 Q1 5 4 2 Q7 0 10 3 Q13 0 16 2 Q19 5 17 8 Q12 14 10 22Z" fill={C.forest} opacity="0.7" /></svg>
        Āhā
      </div>

      {showResults && (
        <button onClick={handleBack} style={{ position: "absolute", top: 24, right: 32, zIndex: 20, fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 500, color: C.stone, background: `${C.cream}cc`, backdropFilter: "blur(8px)", border: `1px solid ${C.charcoal}06`, padding: "7px 14px", borderRadius: 100, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          Retake
        </button>
      )}

      {questions.map((q, i) => (
        <QuestionScreen key={q.id} question={q} step={i} total={questions.length}
          answer={answers[q.id]} onAnswer={handleAnswer} onBack={handleBack}
          visible={!showResults && step === i && !transitioning} />
      ))}

      <ResultsScreen answers={answers} visible={showResults && !transitioning} />
    </div>
  );
}
