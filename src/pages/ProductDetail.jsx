import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const C = {
  cream: "#F5F0E8", linen: "#EDE6D8", parchment: "#E8DFD0",
  forest: "#2D4A3E", forestDeep: "#1E352B", charcoal: "#2C2926",
  warmGray: "#4A4540", stone: "#7A756F", gold: "#B8976A",
  turmeric: "#E8A838", saffron: "#D4764E", rose: "#C45A7B",
  neem: "#5A9E6F", sandalwood: "#C4A97D",
};

const product = {
  name: "Kumkumadi Glow Serum",
  tagline: "The overnight radiance ritual",
  price: 899,
  size: "30ml",
  category: "Serum",
  rating: 4.7,
  reviewCount: 128,
  accent: C.saffron,
  description: "A potent face serum rooted in the ancient Kumkumadi Tailam tradition — reimagined with traceable, organic ingredients. Saffron and turmeric work overnight to brighten, even tone, and restore your skin's natural glow.",
  howToUse: [
    "Cleanse your face and pat dry",
    "Press 3–4 drops between your palms",
    "Gently press onto face and neck — don't rub",
    "Let absorb for 2 minutes before moisturizer",
    "Use every evening for best results",
  ],
  heroIngredient: {
    name: "Kashmiri Saffron",
    latin: "Crocus sativus L.",
    origin: "Pampore, Kashmir",
    batch: "PSK-2026-04",
    story: "Our saffron comes from the fields of Pampore — the only region in India where Crocus sativus blooms. Each strand is hand-harvested at dawn, when the flower first opens, to preserve its potent antioxidants and natural pigments.",
    benefits: ["Brightening", "Anti-oxidant", "Anti-inflammatory"],
  },
  otherIngredients: [
    { name: "Turmeric extract", origin: "Lakadong, Meghalaya" },
    { name: "Sandalwood oil", origin: "Marayoor, Kerala" },
    { name: "Manjistha root", origin: "Himalayan foothills" },
    { name: "Vetiver oil", origin: "Tamil Nadu" },
    { name: "Jojoba oil", origin: "Rajasthan" },
  ],
  routines: [
    { name: "The glow ritual", concern: "Dullness & uneven tone", step: 2, stepType: "Treat" },
    { name: "The even ritual", concern: "Pigmentation & dark spots", step: 2, stepType: "Treat" },
  ],
  reviews: [
    { name: "Priya M.", rating: 5, date: "March 2026", text: "I've been using this for 3 weeks and the difference is visible. My skin tone is more even and there's a genuine glow — not oily shine, actual glow. The saffron scent is subtle and beautiful." },
    { name: "Ananya K.", rating: 4, date: "February 2026", text: "Love the texture — it absorbs quickly and doesn't feel heavy. Took about 2 weeks to see results but definitely worth the wait. Only wish it came in a larger size." },
    { name: "Rhea S.", rating: 5, date: "January 2026", text: "I was skeptical about the sourcing claims but they actually sent me the batch info. Knowing where the saffron comes from makes me trust this way more than other \"natural\" brands." },
  ],
};

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

function SaffronDrawing({ size = 240 }) {
  return (
    <svg viewBox="0 0 200 280" style={{ width: size, height: size * 1.4 }}>
      <g>
        <path d="M100 270 Q98 220 96 165 Q94 130 100 60" fill="none" stroke={C.saffron} strokeWidth="2" opacity="0.45" />
        <path d="M100 60 Q94 35 84 18 Q78 6 84 -2 Q90 -8 98 2 Q100 8 100 60" fill={C.saffron} opacity="0.28" />
        <path d="M100 60 Q106 35 116 18 Q122 6 116 -2 Q110 -8 102 2 Q100 8 100 60" fill={C.saffron} opacity="0.25" />
        <path d="M100 60 Q100 40 100 20 Q98 8 92 -2 Q96 -6 100 2 Q104 -6 108 -2 Q102 8 100 20" fill={C.saffron} opacity="0.32" />
        <ellipse cx="84" cy="0" rx="6" ry="14" fill={C.saffron} opacity="0.4" transform="rotate(-12 84 0)" />
        <ellipse cx="116" cy="0" rx="6" ry="14" fill={C.saffron} opacity="0.38" transform="rotate(12 116 0)" />
        <ellipse cx="100" cy="-4" rx="5" ry="16" fill={C.saffron} opacity="0.45" />
        <path d="M96 165 Q76 155 60 170 Q52 185 65 196 Q80 200 96 165" fill={C.neem} opacity="0.1" />
        <path d="M96 165 Q78 160 68 166" fill="none" stroke={C.neem} strokeWidth="0.5" opacity="0.2" />
        <path d="M98 220 Q118 212 130 225 Q136 240 124 246 Q112 242 98 220" fill={C.neem} opacity="0.08" />
        <path d="M98 220 Q114 215 124 220" fill="none" stroke={C.neem} strokeWidth="0.5" opacity="0.15" />
        {[80, 120, 160, 200, 240].map((y, i) => (
          <circle key={i} cx={92 + Math.sin(i * 2.3) * 16} cy={y + Math.sin(i * 1.7) * 10} r={1.2} fill={C.turmeric} opacity={0.12 + i * 0.02} />
        ))}
      </g>
    </svg>
  );
}

function StarRating({ rating, size = 14 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} viewBox="0 0 20 20" style={{ width: size, height: size }}>
          <path d="M10 1.5 L12.5 7 L18.5 7.5 L14 11.5 L15.5 17.5 L10 14 L4.5 17.5 L6 11.5 L1.5 7.5 L7.5 7Z"
            fill={star <= Math.floor(rating) ? C.saffron : star - 0.5 <= rating ? `${C.saffron}80` : `${C.charcoal}15`}
            stroke="none" />
        </svg>
      ))}
    </div>
  );
}

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: `${C.cream}f2`, backdropFilter: "blur(16px)",
      padding: "0 32px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div onClick={() => navigate('/')} style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 24, color: C.forest, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <svg viewBox="0 0 20 24" style={{ width: 16, height: 19 }}><path d="M10 22 Q8 14 3 8 Q1 5 4 2 Q7 0 10 3 Q13 0 16 2 Q19 5 17 8 Q12 14 10 22Z" fill={C.forest} opacity="0.7" /></svg>
            Āhā
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            <span onClick={() => navigate('/quiz')} style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 500, color: C.forest, cursor: "pointer", letterSpacing: "0.03em", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.target.style.color = C.saffron} onMouseLeave={(e) => e.target.style.color = C.forest}>Rituals</span>
            <span onClick={() => navigate('/product/kumkumadi')} style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 500, color: C.saffron, cursor: "pointer", letterSpacing: "0.03em" }}>Ingredients</span>
          </div>
        </div>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.forest} strokeWidth="1.5" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
          <span style={{ position: "absolute", top: -5, right: -8, background: C.saffron, color: "white", fontSize: 9, fontWeight: 700, fontFamily: "'DM Sans'", width: 15, height: 15, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>2</span>
        </div>
      </div>
    </nav>
  );
}

function ProductHero() {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div style={{ padding: "48px 32px 0", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 72, alignItems: "start" }}>
        {/* Product image area */}
        <div style={{
          background: `radial-gradient(ellipse at 50% 50%, ${C.saffron}0c 0%, ${C.saffron}04 50%, transparent 70%)`,
          border: `1px solid ${C.saffron}10`, borderRadius: 28,
          padding: "60px 48px", minHeight: 520,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 20, left: 20 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", background: C.gold, color: C.cream, padding: "4px 12px", borderRadius: 100 }}>Bestseller</span>
          </div>
          <SaffronDrawing size={200} />
          <div style={{ position: "absolute", bottom: 20, left: 24, right: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.saffron, opacity: 0.4 }}>Crocus sativus L.</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: C.stone }}>30ml · Face serum</span>
          </div>
        </div>

        {/* Product info */}
        <div style={{ paddingTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.08em", color: C.saffron, textTransform: "uppercase", background: `${C.saffron}0c`, border: `1px solid ${C.saffron}15`, padding: "4px 14px", borderRadius: 100 }}>
              Saffron · Pampore, Kashmir
            </span>
          </div>

          <h1 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 38, fontWeight: 400, color: C.forest,
            lineHeight: 1.1, margin: "0 0 6px", fontStyle: "italic",
          }}>{product.name}</h1>

          <p style={{
            fontFamily: "'DM Sans'", fontSize: 15, color: C.warmGray,
            margin: "0 0 20px",
          }}>{product.tagline}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <StarRating rating={product.rating} />
            <span style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 500, color: C.charcoal }}>{product.rating}</span>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: C.stone }}>({product.reviewCount} reviews)</span>
          </div>

          <div style={{ fontFamily: "'DM Serif Display'", fontSize: 32, color: C.forest, marginBottom: 24 }}>
            ₹{product.price}
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: C.stone, marginLeft: 10 }}>{product.size}</span>
          </div>

          <p style={{
            fontFamily: "'DM Sans'", fontSize: 15, lineHeight: 1.7, color: C.warmGray,
            marginBottom: 32, borderLeft: `2px solid ${C.saffron}25`, paddingLeft: 20,
          }}>{product.description}</p>

          {/* Quantity + Add to Cart */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
            <div style={{
              display: "flex", alignItems: "center",
              border: `1.5px solid ${C.charcoal}10`, borderRadius: 100,
              overflow: "hidden",
            }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{
                width: 40, height: 44, border: "none", background: "transparent",
                fontFamily: "'DM Sans'", fontSize: 18, color: C.charcoal,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}>-</button>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 600, color: C.charcoal, width: 32, textAlign: "center" }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{
                width: 40, height: 44, border: "none", background: "transparent",
                fontFamily: "'DM Sans'", fontSize: 18, color: C.charcoal,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}>+</button>
            </div>
            <button onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }} style={{
              flex: 1, fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 700,
              letterSpacing: "0.05em", textTransform: "uppercase",
              background: added ? C.neem : C.forest, color: C.cream, border: "none",
              padding: "16px 32px", borderRadius: 100, cursor: "pointer",
              transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              boxShadow: `0 4px 16px ${C.forest}25`,
            }}
              onMouseEnter={(e) => { if (!added) e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
            >
              {added ? (
                <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12 L10 17 L19 7" /></svg> Added to cart</>
              ) : (
                <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg> Add to cart — ₹{product.price * qty}</>
              )}
            </button>
          </div>

          {/* Routine context */}
          <div style={{
            background: `${C.forest}05`, border: `1px solid ${C.forest}0a`, borderRadius: 16,
            padding: "16px 20px",
          }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.08em", color: C.stone, textTransform: "uppercase", marginBottom: 10 }}>Part of these rituals</div>
            {product.routines.map((r, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "8px 0",
                borderTop: i > 0 ? `1px solid ${C.charcoal}06` : "none",
              }}>
                <div>
                  <span style={{ fontFamily: "'DM Serif Display'", fontSize: 15, color: C.forest, fontStyle: "italic" }}>{r.name}</span>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: C.stone, marginLeft: 10 }}>{r.concern}</span>
                </div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.saffron, background: `${C.saffron}0c`, padding: "3px 10px", borderRadius: 100 }}>
                  Step {r.step} · {r.stepType}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function IngredientStory() {
  const [ref, visible] = useScrollReveal(0.15);
  const h = product.heroIngredient;

  return (
    <div ref={ref} style={{
      padding: "100px 32px", position: "relative",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)",
      transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <div style={{
        position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
        fontFamily: "'DM Serif Display'", fontSize: 180, color: C.saffron, opacity: 0.015,
        lineHeight: 0.85, pointerEvents: "none", writingMode: "vertical-lr",
      }}>Saffron</div>

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <svg viewBox="0 0 40 8" style={{ width: 32, height: 6 }}><path d="M0 4 Q10 1 20 4 Q30 7 40 4" fill="none" stroke={C.saffron} strokeWidth="0.8" opacity="0.4" /></svg>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: C.saffron, textTransform: "uppercase" }}>Hero ingredient</span>
        </div>

        <div style={{
          background: `${C.saffron}06`, border: `1px solid ${C.saffron}10`,
          borderRadius: 24, padding: "48px 52px",
          display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 56, alignItems: "center",
        }}>
          <div style={{ textAlign: "center" }}>
            <SaffronDrawing size={160} />
            <div style={{ marginTop: 16 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.saffron, opacity: 0.5 }}>{h.latin}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.stone, marginTop: 4 }}>Batch #{h.batch}</div>
            </div>
          </div>

          <div>
            <h3 style={{ fontFamily: "'DM Serif Display'", fontSize: 32, color: C.forest, margin: "0 0 4px", fontStyle: "italic" }}>{h.name}</h3>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: C.saffron, margin: "0 0 24px" }}>Sourced from {h.origin}</p>

            <p style={{ fontFamily: "'DM Sans'", fontSize: 16, lineHeight: 1.75, color: C.warmGray, margin: "0 0 24px" }}>{h.story}</p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
              {h.benefits.map((b) => (
                <span key={b} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.04em", color: C.saffron, background: `${C.saffron}0c`, border: `1px solid ${C.saffron}15`, padding: "6px 16px", borderRadius: 100 }}>{b}</span>
              ))}
            </div>

            <div style={{
              borderTop: `1px solid ${C.saffron}12`, paddingTop: 20,
            }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.08em", color: C.stone, textTransform: "uppercase", marginBottom: 10 }}>Also contains</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {product.otherIngredients.map((ing, i) => (
                  <span key={i} style={{ fontFamily: "'DM Sans'", fontSize: 12, color: C.warmGray, background: `${C.charcoal}05`, padding: "4px 12px", borderRadius: 100 }}>
                    {ing.name} <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: C.stone }}>· {ing.origin}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HowToUse() {
  const [ref, visible] = useScrollReveal(0.15);

  return (
    <div ref={ref} style={{
      padding: "40px 32px 80px",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
      transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <svg viewBox="0 0 40 8" style={{ width: 32, height: 6 }}><path d="M0 4 Q10 1 20 4 Q30 7 40 4" fill="none" stroke={C.forest} strokeWidth="0.8" opacity="0.3" /></svg>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: C.forest, textTransform: "uppercase" }}>How to use</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {product.howToUse.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: `${C.saffron}0c`, border: `1.5px solid ${C.saffron}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'DM Serif Display'", fontSize: 14, color: C.saffron,
                  flexShrink: 0,
                }}>{i + 1}</div>
                {i < product.howToUse.length - 1 && (
                  <div style={{ width: 1, height: 24, borderLeft: `1px dashed ${C.saffron}20`, marginTop: 4 }} />
                )}
              </div>
              <p style={{
                fontFamily: "'DM Sans'", fontSize: 15, lineHeight: 1.5, color: C.warmGray,
                paddingTop: 5, paddingBottom: i < product.howToUse.length - 1 ? 16 : 0,
              }}>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Reviews() {
  const [ref, visible] = useScrollReveal(0.1);

  return (
    <div ref={ref} style={{
      padding: "40px 32px 100px",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
      transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <svg viewBox="0 0 40 8" style={{ width: 32, height: 6 }}><path d="M0 4 Q10 1 20 4 Q30 7 40 4" fill="none" stroke={C.forest} strokeWidth="0.8" opacity="0.3" /></svg>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: C.forest, textTransform: "uppercase" }}>Reviews</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontFamily: "'DM Serif Display'", fontSize: 36, color: C.forest }}>{product.rating}</span>
              <div>
                <StarRating rating={product.rating} size={16} />
                <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: C.stone }}>{product.reviewCount} reviews</span>
              </div>
            </div>
          </div>
          <button style={{
            fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600,
            color: C.forest, background: `${C.forest}08`, border: "none",
            padding: "10px 22px", borderRadius: 100, cursor: "pointer",
          }}>Write a review</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {product.reviews.map((r, i) => (
            <div key={i} style={{
              background: `${C.cream}bb`, backdropFilter: "blur(8px)",
              border: `1px solid ${C.charcoal}06`, borderRadius: 20,
              padding: "24px", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: -10, right: -10, width: 40, height: 40, borderRadius: "50%", background: C.saffron, opacity: 0.03 }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: C.charcoal }}>{r.name}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.stone, marginTop: 2 }}>{r.date}</div>
                </div>
                <StarRating rating={r.rating} size={12} />
              </div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13, lineHeight: 1.6, color: C.warmGray, margin: 0 }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: C.forestDeep, padding: "48px 32px 28px", color: C.cream }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'DM Serif Display'", fontSize: 24, display: "flex", alignItems: "center", gap: 8 }}>
          <svg viewBox="0 0 20 24" style={{ width: 16, height: 19 }}><path d="M10 22 Q8 14 3 8 Q1 5 4 2 Q7 0 10 3 Q13 0 16 2 Q19 5 17 8 Q12 14 10 22Z" fill={C.cream} opacity="0.5" /></svg>
          Āhā
        </div>
        <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: `${C.cream}33` }}>2026 Āhā Skincare. Rooted in what's real.</span>
      </div>
    </footer>
  );
}

export default function ProductDetailPage() {
  const navigate = useNavigate();
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>

      {/* Continuous background */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `linear-gradient(180deg,
          ${C.cream} 0%,
          ${C.cream} 20%,
          ${C.parchment}60 35%,
          ${C.cream} 50%,
          ${C.cream} 70%,
          ${C.linen} 85%,
          ${C.forestDeep} 100%
        )`,
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          radial-gradient(ellipse at 25% 25%, ${C.saffron}08 0%, transparent 30%),
          radial-gradient(ellipse at 75% 40%, ${C.turmeric}05 0%, transparent 25%),
          radial-gradient(ellipse at 40% 70%, ${C.rose}04 0%, transparent 20%)
        `,
      }} />

      {/* Paper texture */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.025, mixBlendMode: "multiply",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 180px",
      }} />

      {/* Scattered botanicals */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
        <svg viewBox="0 0 1400 3000" style={{ position: "absolute", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMin slice">
          {[
            { x: 1250, y: 200, r: -20, s: 1.2 }, { x: 1300, y: 600, r: 35, s: 0.9 },
            { x: 80, y: 900, r: 15, s: 1.1 }, { x: 1280, y: 1200, r: -40, s: 1 },
            { x: 100, y: 1500, r: 50, s: 0.8 }, { x: 1250, y: 1800, r: -25, s: 1.2 },
            { x: 60, y: 2200, r: 30, s: 0.9 },
          ].map((l, i) => (
            <g key={i} transform={`translate(${l.x},${l.y}) scale(${l.s}) rotate(${l.r})`} opacity={0.05 + i * 0.005}>
              <path d="M0 0 Q-10 -22 4 -38 Q14 -24 0 0Z" fill={C.neem} />
              <path d="M0 0 Q14 -16 26 -28 Q18 -10 0 0Z" fill={C.neem} opacity="0.7" />
            </g>
          ))}
          {[...Array(15)].map((_, i) => (
            <circle key={`d${i}`} cx={100 + Math.sin(i * 4.7) * 600 + 600} cy={100 + i * 180 + Math.cos(i * 2.1) * 60}
              r={1.2 + Math.sin(i * 1.5) * 0.6} fill={[C.saffron, C.turmeric, C.rose, C.neem][i % 4]} opacity={0.03 + Math.sin(i) * 0.015} />
          ))}
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <Navbar />
        <ProductHero />
        <IngredientStory />
        <HowToUse />
        <Reviews />
      </div>
      <Footer />
    </div>
  );
}
