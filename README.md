# Āhā Skincare — Full-Stack Website Prototype
## Assignment Submission

---

## Project Overview

Āhā is an organic D2C skincare brand that sells **curated routines** (not individual products), anchored by **hero ingredients with transparent sourcing**, at accessible pricing (₹600–1200).

**One-line pitch:** Forest Essentials' sensorial quality meets Juicy Chemistry's ingredient authenticity — at prices that respect you.

---

## Process Followed

This prototype was built following the AI PM prototyping framework taught in the course. Every step was deliberate.

### Step 1: Problem Definition & Thesis

**Started with PM fundamentals before touching any tool.**

- Defined target user using JTBD (Functional, Social, Emotional)
- Positioned against competitors (FSE, Juicy Chemistry, Plum, Minimalist, The Ordinary)
- Applied Kunal Shah's Delta-4 framework to validate differentiation
- Identified that the primary delta (+5) is **routine curation**, not individual product quality
- Validated that hero ingredient sourcing transparency is the trust layer (delta +4)
- Considered and rejected men's skincare (market education cost too high for a new brand)
- Considered and rejected quiz-to-custom-formulation (SkinKraft/Vedix already do this)
- Settled on **quiz-to-curated-routine** with **selective hero ingredient sourcing** (Option B — only the hero ingredient per product gets premium sourcing, keeping costs manageable)

### Step 2: Database Choice

**Evaluated every relevant database type against the 8 decision factors from the course PDF.**

| Factor | Assessment | Points To |
|--------|-----------|-----------|
| Data model complexity | Highly relational (users → profiles → routines → steps → products → ingredients) | Relational |
| Query patterns | Read-heavy, complex joins | Relational |
| Consistency | ACID required for orders/payments | Relational |
| Scale | Sub-5000 DAU Year 1 — not a differentiator | Anything |
| Operational complexity | Need largest developer ecosystem | PostgreSQL |
| Cost | Open source, free tier hosting | PostgreSQL |
| Latency | Standard web latency sufficient | Not a differentiator |
| Geographic distribution | Single region (India) | Single-instance |

**Decision: PostgreSQL.** Not because it's the default, but because all 8 factors either point to it or don't provide a reason to choose otherwise.

**Alternatives evaluated and rejected with reasoning:**
- MongoDB — document model fights our relational routine structure
- Neo4j — over-engineered, small talent pool (per course: "graph DBs are much harder to maintain")
- SQLite — violates "operate in production mode" principle
- CockroachDB/Spanner — distributed SQL for a single-region D2C brand is overkill

### Step 3: Data Model

**Went to data model BEFORE UI design (per course: "go to the data model first, then go to the UI design").**

Explored 3 variations before deciding:
1. **Product-Centric** (traditional e-commerce) — too generic, doesn't enforce our differentiator
2. **Routine-Centric** (prescription style) — bakes curation into the schema ✅
3. **Ingredient-Centric** (transparency-first) — over-engineered for prototype

**Decision: Routine-Centric with a standalone Ingredients entity from Variation 3.**

Core entities: Users, Skin Profiles, Routines, Routine Steps, Products, Ingredients (hero only), Orders, Order Items, Addresses, Cart Items, Reviews.

Key design decisions:
- Skin Profile is separate from Users (retake quiz without losing history)
- Ingredients table is small and curated (~8-12 hero ingredients only)
- Routine Steps have step_order and step_type (the sequence IS the product)
- unit_price stored on Order Items at time of purchase

### Step 4: Design System

**Created design system BEFORE prototyping (per course: "create your own design system before asking it to design anything").**

Explored 4 design directions:
1. The Apothecary — warm, grounded, heritage
2. Wabi-Sabi Minimal — quiet, intentional, Japanese-inspired
3. Tropical Maximalist — joyful, abundant, colorful
4. Modern Editorial — authoritative, magazine-like

**Decision: Hybrid of 1 (Apothecary) + 3 (Tropical).** Apothecary as structure, Tropical as energy. "A beautifully designed spice market — the architecture is clean and intentional, but what fills the shelves is vibrant and alive."

Key design tokens:
- Background: Warm Cream (#F5F0E8) — never pure white
- Primary: Forest Green (#2D4A3E)
- Each product line gets its own ingredient accent color (Turmeric gold, Saffron orange, Rose pink, Neem green)
- Typography: DM Serif Display (headings) + DM Sans (body) + DM Mono (ingredient labels)
- Botanical maximalist illustrations, paper grain texture, organic shapes

### Step 5: PRD

**PRD follows course principles:**
- Not prescriptive about exact solutions
- Talks about the framework: why this data model, why this DB, what risks to watch for
- Includes open questions for design + tech review
- Includes explicit anti-scope (what we're NOT building)
- Build sequence follows "give backend context first, execute UI first"

### Step 6: Prototype

**Built UI first with mock data (per course best practice #8).**

Iterated through multiple explorations per screen:
- Homepage: V1 (too modern/SaaS) → V2 (more botanical) → V3 (massive typography, broken grid, scroll reveals) → V4 (section transitions) → V5 (single continuous background, no seams)
- Skin Quiz: V1 (functional but generic) → V2 (off-center layout) → V3 (centered, botanical illustrations as background)
- PDP: Single iteration, applied all learnings from homepage

---

## Deliverables

### Documents

| File | Description |
|------|-------------|
| `prd-aha-skincare.md` | Complete PRD with problem statement, Delta-4 analysis, JTBD, data model, DB rationale, quiz spec, user flows, success metrics, risks |
| `design-system.md` | Full design system — colors, typography, spacing, components, page guidelines, photography/illustration direction, accessibility |

### Prototype Screens (React/JSX)

| File | Description |
|------|-------------|
| `aha-homepage-v5.jsx` | Homepage — continuous background, botanical vine, scroll-triggered ritual section, ingredient spotlight, staggered product grid, paper texture |
| `aha-skin-quiz-v3.jsx` | 5-question skin quiz — one question per screen, botanical illustrations per question, accent color shifts, staggered routine reveal on results |
| `aha-pdp.jsx` | Product detail page — hero ingredient story section, routine context, how-to-use ritual steps, reviews, add-to-cart with quantity |

### Backend (Node.js + PostgreSQL)

| File | Description |
|------|-------------|
| `schema.sql` | Complete PostgreSQL schema — all 11 tables, constraints, indexes, auto-update triggers |
| `seed.sql` | Seed data — 8 hero ingredients, 13 products, 8 routines with steps, sample users and reviews |
| `server.js` | Express API — endpoints for products, quiz/routines, cart (add/remove/add-routine), orders (with transaction), reviews (verified purchasers only) |
| `package.json` | Node dependencies and scripts |
| `.env.example` | Environment config template |

### Setup Instructions

```bash
# 1. Create the database
createdb aha_skincare

# 2. Run schema + seed
psql aha_skincare < schema.sql
psql aha_skincare < seed.sql

# 3. Install dependencies
npm install

# 4. Configure environment
cp .env.example .env
# Edit .env with your database credentials

# 5. Start the server
npm run dev
```

### Key API Endpoints

| Endpoint | Method | What it does |
|----------|--------|-------------|
| `/api/products` | GET | List all products (optional `?category=serum` filter) |
| `/api/products/:id` | GET | Single product with ingredient story, reviews, and routine context |
| `/api/ingredients` | GET | All hero ingredients with product counts |
| `/api/quiz` | POST | Submit quiz answers → get matched routines with products |
| `/api/routines` | GET | List all pre-built routines with steps |
| `/api/cart/:userId` | GET | User's cart with totals |
| `/api/cart` | POST | Add product to cart |
| `/api/cart/routine` | POST | Add entire routine to cart (all products in one action) |
| `/api/orders` | POST | Create order from cart (ACID transaction — decrements stock, freezes prices, clears cart) |
| `/api/orders/:userId` | GET | Order history |
| `/api/reviews` | POST | Submit review (verified purchasers only) |

### Earlier Explorations (showing iteration process)

| File | What it shows |
|------|--------------|
| `aha-homepage-v1.jsx` | First attempt — too clean, too "modern SaaS" |
| `aha-homepage-v2.jsx` | Pushed botanical elements — better but layout still generic |
| `aha-homepage-v3.jsx` | Added massive typography, broken grid, scroll reveals |
| `aha-homepage-v4.jsx` | Attempted section transitions — identified hard-line seam problem |
| `aha-skin-quiz.jsx` | First quiz — functional but missing botanical feeling |

---

## Key Decisions Log

| Decision | Options Considered | Chosen | Why |
|----------|--------------------|--------|-----|
| Target user | Women vs Men | Women 22-35 | Men's market needs education spend we can't afford |
| Differentiation | Product quality / Quiz-to-custom / Curated routines | Curated routines | Highest Delta-4, not done well by competitors |
| Ingredient sourcing | All ingredients / Hero only / Marketing copy only | Hero ingredient only (Option B) | Balances prestige perception with cost reality |
| Database | PostgreSQL / MongoDB / Neo4j / SQLite | PostgreSQL | All 8 decision factors point to it |
| Data model | Product-centric / Routine-centric / Ingredient-centric | Routine-centric + Ingredients entity | Bakes differentiator into schema |
| Design direction | Apothecary / Wabi-Sabi / Tropical / Editorial | Apothecary + Tropical hybrid | Structure from 1, energy from 3 |
| Section transitions | Hard cuts / Gradient match / Botanical dividers / Single background | Single continuous background | Only approach that eliminates seams entirely |
| Quiz layout | Centered / Side-by-side with illustration | Centered (illustration as bg) | Side layout felt off-center |

---

## What's Not Built (and why)

Per course best practice: "start small when building — resist the temptation to build everything at once."

**Not built in prototype:**
- Product listing page — standard grid, low differentiation value
- Routine detail page — similar to quiz results, would be redundant
- Cart drawer & checkout UI — standard e-commerce patterns, design system already specifies these
- User accounts UI — standard auth flow
- Razorpay payment integration — requires merchant account, test mode documented in PRD

**Explicitly out of scope (documented in PRD):**
- Mobile app, multi-language, international shipping
- Subscription model, loyalty points, live chat
- AI skin analysis from photos

---

## Course Principles Applied

| Principle | How Applied |
|-----------|-------------|
| "Should we even build it?" (1.1.1) | Delta-4 analysis validated the opportunity exists |
| "Slow is smooth, smooth is fast" (1.2.1) | Defined DB + data model before touching UI |
| "Go to data model first, then UI" (1.2.1) | Data model fully specified before any prototyping |
| "Create your own design system" (1.3.3) | Full design system document created before building |
| "Explore explore explore, constrain constrain constrain" (1.3.3) | 4 design directions → 1 hybrid; 5 homepage versions → final |
| "Ask it to restate what you said" (1.2.5) | Verified understanding before each build phase |
| "UI first, backend later" (1.2.5) | All screens built with mock data |
| "Play rally with AI" (1.2.6) | Used grill-me approach — systematic questioning before building |
| "Don't be prescriptive in the PRD" (1.2.6) | PRD discusses frameworks and rationale, not exact pixel specs |
| "Operate in production mode" (1.2.1) | PostgreSQL chosen over SQLite to match what eng team would use |
| "OODA loop" (1.3.1) | Each homepage version: observe what's wrong → orient on fix → decide → act → verify |
| "Never deploy without engineering review" (1.2.5) | Documented as risk in PRD, prototype is explicitly not production-ready |
