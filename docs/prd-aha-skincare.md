# Product Requirements Document
## Āhā — Organic D2C Skincare Brand

**Version:** 1.0
**Date:** April 14, 2026
**Author:** [Your Name]
**Status:** Draft — Ready for Design & Engineering Review

---

## 1. Problem Statement

### The user problem
Urban, ingredient-conscious women aged 22–35 want skincare that is genuinely organic, trustworthy, and effective — but the current market forces them into one of three bad tradeoffs:

1. **Premium heritage brands (Forest Essentials):** Beautiful experience, credible ingredients, but pricing at ₹2000–4000 per product makes it inaccessible for regular use.
2. **Affordable "clean" brands (Plum, Mamaearth):** Accessible pricing, but mass-market expansion has eroded trust. "Natural" claims feel like marketing, not reality.
3. **Authentic indie brands (Juicy Chemistry):** Genuine ingredient sourcing, but the brand experience feels raw — basic packaging, overwhelming catalogs, no guidance on routine building.

The core gap: **no brand offers curated, routine-level guidance with verifiable ingredient sourcing at an accessible price point (₹600–1200).**

### Why this matters now
- The Indian organic personal care market is growing at ~15% CAGR
- Consumer awareness of ingredient sourcing has increased significantly post-COVID
- Competitor brands are either scaling up (losing authenticity) or staying niche (limiting access)
- D2C infrastructure (Shopify India, Razorpay, Delhivery) has matured enough to make a new entrant viable

### Thesis
A skincare brand that sells curated routines (not individual products), anchored by hero ingredients with transparent sourcing, at accessible pricing, can capture the user who has outgrown mass-market brands but can't justify luxury pricing.

---

## 2. Target User

### Demographics
- Women, 22–35 years old
- Urban metros and Tier-1 cities in India
- Mid-to-upper disposable income (not luxury, not budget-constrained)
- Active on Instagram, reads ingredient lists, follows skincare content creators

### Psychographics
- Values authenticity over branding — she reads the back of the label, not just the front
- Willing to pay more for genuine quality, but resents paying for packaging and marketing
- Seeks simplicity in routine — doesn't want 10 steps, wants 3 that work
- Sees skincare as self-care, not vanity — it's her evening ritual, not a chore

### Jobs to Be Done

**Functional:** "Help me build a skincare routine that actually works for my skin type without needing a chemistry degree to decode ingredients. Tell me what to use, in what order, and why."

**Social:** "Help me signal that I make thoughtful, conscious choices — without coming across as preachy or performative. This brand on my shelf should say 'I care' not 'look at me.'"

**Emotional:** "Make me feel like I'm doing something genuinely good for myself in a world full of shortcuts and fakes. The unboxing, the texture, the ritual — it should feel like an act of self-respect."

### Anti-Users
- Dermatology-focused users who want clinical/pharmaceutical products (The Ordinary's core user)
- Extremely price-sensitive users seeking sub-₹300 products
- Users who want maximum SKU variety and love browsing large catalogs
- Men (market requires education investment beyond current scope)

---

## 3. Positioning & Differentiation

### Brand Positioning
Nature-rooted, ritual-driven skincare. The sourcing authenticity of Juicy Chemistry, the sensorial premium-ness of Forest Essentials, at accessible pricing. Organic luxury without the luxury tax.

### Delta-4 Analysis (Kunal Shah Framework)

| Dimension | Current Experience (Score) | Āhā Experience (Target) | Delta |
|-----------|--------------------------|--------------------------|-------|
| Routine curation | 3 — self-assembling from scattered brands/advice | 8 — skin quiz maps to pre-built, coherent routine | **+5** |
| Trust in "organic" claims | 4 — everyone claims natural, nobody shows receipts | 8 — hero ingredient sourcing visible per product | **+4** |
| Brand experience & ritual | 4 — indie brands feel DIY, affordable brands feel generic | 7 — warm, intentional design at accessible price | **+3** |
| Price-to-quality perception | 5 — FSE overpriced, Plum quality dropped | 8 — premium feel, accessible price | **+3** |

**Primary delta:** Routine curation (+5) — this is the wedge.
**Secondary delta:** Sourcing transparency (+4) — this is the trust layer.
Supporting deltas (experience, price) reinforce the switch but don't drive it alone.

### Competitive Landscape

| Brand | Strength | Weakness | Our Advantage |
|-------|----------|----------|---------------|
| Forest Essentials | Premium experience, heritage | ₹2000+ pricing, overwhelming catalog | Same sensorial quality at ₹600-1200 |
| Juicy Chemistry | Genuine sourcing, authenticity | Raw brand experience, no routine guidance | Curated routines + polished experience |
| Plum | Affordable, wide distribution | Lost trust, mass-market feel | Genuine ingredient stories, not just claims |
| Minimalist/Ordinary | Science-backed, transparent | Clinical feel, no emotional connection | Nature-rooted warmth, ritual-driven |
| SkinKraft/Vedix | Personalization via quiz | Quiz leads to custom formulation (operationally complex) | Quiz maps to pre-built routines (simpler, scalable) |

### What We Are Not Building
- A custom formulation engine (like SkinKraft) — too operationally complex
- A marketplace with 100+ SKUs — curation IS the product
- A clinical/science-forward brand — we're nature-forward
- A subscription-first model (can add later) — start with one-time purchase

---

## 4. Core Functionality

### Must-Have (Prototype Scope)

**F1: Skin Quiz → Routine Recommendation**
- 5-question quiz: skin type, primary concern, sensitivity, routine size comfort, time of day
- Maps user to one of ~16 pre-built routines
- Creates a persistent Skin Profile linked to the user's account
- Result screen shows personalized routine with products in sequence

**F2: Routine Browsing & Product Discovery**
- Browse routines by skin type or concern
- View routine detail: ordered steps with products, why this combination works
- View individual product pages from within a routine context
- Each product page features hero ingredient sourcing story

**F3: Product Catalog**
- ~15-20 products across categories: cleansers, serums/treatments, moisturizers, protection
- Each product linked to one hero ingredient with sourcing metadata
- Product pages include: images, description, hero ingredient story, how to use, price, reviews

**F4: Cart & Checkout**
- Add individual products or entire routines to cart
- Cart drawer (slide-in from right)
- Routine upsell: "Complete your routine — add [product] for ₹X"
- Single-page checkout: address, payment (Razorpay integration), order summary
- Guest checkout supported, account creation encouraged

**F5: User Accounts**
- Registration / Login (email + password)
- Skin profile (from quiz)
- Order history
- Saved addresses
- Ability to retake quiz and get updated routine

**F6: Reviews & Ratings**
- Star rating (1-5) + text review per product
- Only verified purchasers can review
- Display average rating and review count on product cards

### Nice-to-Have (Post-Prototype)
- Subscription/auto-replenishment
- Referral program
- Blog/content section
- Ingredient glossary with full sourcing database
- Seasonal routine updates ("your monsoon routine")
- Wishlist functionality
- Push notifications for reorder reminders

### Explicitly Out of Scope
- Mobile app (website only, mobile-responsive)
- Multi-language support
- International shipping
- Loyalty points program
- Live chat support
- AI-powered skin analysis from photos

---

## 5. Skin Quiz Specification

### Questions & Options

**Q1: What's your skin type?**
Options: Dry / Oily / Combination / Normal
→ Stored as: `skin_type` enum

**Q2: What's your primary skin concern?**
Options: Dullness & uneven tone / Acne & breakouts / Pigmentation & dark spots / Early aging & fine lines
→ Stored as: `primary_concern` enum

**Q3: Is your skin sensitive?**
Options: Yes, it reacts easily / No, it's fairly resilient
→ Stored as: `is_sensitive` boolean

**Q4: How many products are you comfortable using?**
Options: Keep it minimal (2 products) / I'm okay with a full routine (3-4 products)
→ Stored as: `routine_size_pref` enum (minimal / full)

**Q5: When do you want to use your routine?**
Options: Morning / Evening / Both morning & evening
→ Stored as: `time_of_day_pref` enum (morning / evening / both)

### Mapping Logic
- Q1 (skin type) × Q2 (concern) = 16 base routine combinations
- Q3 (sensitivity) = swaps specific products for gentler variants within the same routine
- Q4 (routine size) = shows 2 steps (minimal) or 3-4 steps (full) from the same routine
- Q5 (time of day) = shows morning routine, evening routine, or both

### Quiz UX
- One question per screen
- Large serif question text, centered
- Options presented as tappable cards (not radio buttons or dropdowns)
- Progress bar at top (thin, Forest Green)
- Subtle botanical illustration in background at low opacity
- Back button available on every screen
- No account required to take quiz — prompt for account creation at results

---

## 6. System Architecture

### Database Choice: PostgreSQL

**Rationale (evaluated against 8 decision factors):**

| Factor | Assessment |
|--------|------------|
| Data model complexity | Highly relational — skin profiles → routines → steps → products → ingredients |
| Query patterns | Read-heavy, complex joins (routine page joins 4 tables) |
| Consistency | ACID required for orders and payments |
| Scale | Small (sub-5000 DAU Year 1) — anything works, choose based on other factors |
| Operational complexity | Largest developer ecosystem, easy managed hosting (Supabase, Neon) |
| Cost | Open source, free tier hosting sufficient for prototype |
| Latency | Standard web latency sufficient (no real-time requirements) |
| Geographic distribution | Single region (India) — no distribution needed |

**Alternatives considered and rejected:**
- MongoDB: document model fights our relational routine structure
- Neo4j: massively over-engineered, small talent pool, higher ops burden
- SQLite: fast for prototype but violates "operate in production mode" principle — would need full rewrite when team inherits
- CockroachDB/Spanner: distributed SQL for a single-region, small-scale D2C brand is absurd

### Data Model

**Core Entities:**

**USERS** — id, name, email (unique), password_hash, phone, created_at

**SKIN_PROFILES** — id, user_id (FK→Users), skin_type (enum), primary_concern (enum), is_sensitive (bool), routine_size_pref (enum), time_of_day_pref (enum), created_at
- Separate entity from Users (not a column) so users can retake quiz
- One-to-many: a user can have multiple profiles over time

**ROUTINES** — id, name, description, skin_type (enum), primary_concern (enum), for_sensitive (bool), time_of_day (enum), created_at
- Pre-built by the brand team, not generated dynamically
- ~16 base routines covering skin type × concern combinations

**ROUTINE_STEPS** — id, routine_id (FK→Routines), product_id (FK→Products), step_order (int), step_type (enum: cleanse/treat/moisturize/protect), instructions (text)
- Ordered sequence within a routine
- step_type categorizes the function of each step

**PRODUCTS** — id, name, description, price (decimal), category (enum), size, image_url, hero_ingredient_id (FK→Ingredients), stock_quantity, is_active, created_at
- ~15-20 products total
- Each product linked to exactly one hero ingredient

**INGREDIENTS** — id, name, scientific_name, source_region, source_story, benefits, certification, image_url
- Small, curated table (~8-12 hero ingredients only)
- NOT a full formulation database — only the featured ingredient per product
- source_story is the "saffron from Pampore, Kashmir" narrative
- This entity exists to create the prestige-at-accessible-price perception

**ORDERS** — id, user_id (FK→Users), shipping_address_id (FK→Addresses), status (enum: placed/confirmed/shipped/delivered/cancelled), total_amount, payment_status (enum), payment_ref, created_at

**ORDER_ITEMS** — id, order_id (FK→Orders), product_id (FK→Products), quantity, unit_price
- unit_price stored at time of purchase (price may change later)

**ADDRESSES** — id, user_id (FK→Users), line1, line2, city, state, pincode, is_default

**CART_ITEMS** — id, user_id (FK→Users), product_id (FK→Products), quantity, added_at

**REVIEWS** — id, user_id (FK→Users), product_id (FK→Products), rating (int 1-5), comment, created_at

### Key Relationships
```
Users ──┬── has many ──→ Skin Profiles ──→ maps to ──→ Routines
        ├── has many ──→ Orders ──→ contains ──→ Order Items ──→ refs ──→ Products
        ├── has many ──→ Addresses
        ├── has many ──→ Cart Items ──→ refs ──→ Products
        └── has many ──→ Reviews ──→ about ──→ Products

Routines ──→ contains ──→ Routine Steps ──→ includes ──→ Products ──→ features ──→ Ingredients
```

---

## 7. Design System

A separate design system document has been created (see: `design-system.md`).

### Design Direction Summary
Apothecary structure + Tropical energy. Clean, warm layouts (cream backgrounds, forest green typography, generous whitespace) with vibrant ingredient-driven color accents on product-related elements.

**Key design principles:**
- Warm Cream (#F5F0E8) backgrounds — never pure white
- Forest Green (#2D4A3E) as primary brand color
- Each product line has its own ingredient accent color (turmeric gold, saffron orange, rose pink, etc.)
- DM Serif Display for headings (editorial warmth), DM Sans for body (friendly readability)
- DM Mono for ingredient labels (apothecary feel)
- Hand-painted botanical illustrations used sparingly — one hero per page
- Product photography: warm lighting, raw ingredients shown alongside products

**Anti-references:**
- The Ordinary (too clinical)
- Generic clean beauty (too beige)
- Forest Essentials (too ornate)

---

## 8. Key User Flows

### Flow 1: First-Time Visitor → Quiz → Purchase

```
Landing Page
  → "Find your routine" CTA
  → Quiz Q1: Skin type
  → Quiz Q2: Primary concern
  → Quiz Q3: Sensitivity
  → Quiz Q4: Routine size
  → Quiz Q5: Time of day
  → Results: "Your routine" with 2-4 products in sequence
  → "Add routine to cart" (adds all products)
  → Cart drawer opens
  → Checkout (guest or create account)
  → Order confirmation
```

### Flow 2: Browse & Buy Individual Product

```
Landing Page or Nav
  → Shop by category (Cleansers / Serums / Moisturizers)
  → Product listing page
  → Product detail page (with ingredient story)
  → "Add to cart"
  → Cart drawer
  → Routine upsell: "This pairs well with [X] in a [skin type] routine"
  → Checkout
```

### Flow 3: Returning User → Reorder

```
Login
  → Dashboard (shows current routine, past orders)
  → "Reorder" on past order
  → Cart pre-filled
  → Checkout
```

### Flow 4: Retake Quiz

```
Account / Dashboard
  → "Retake skin quiz"
  → Full quiz flow
  → New results (may differ from previous)
  → New Skin Profile created (old one preserved)
  → Updated routine recommendation
```

---

## 9. Success Metrics

### Primary Metrics

| Metric | Target | Rationale |
|--------|--------|-----------|
| Quiz completion rate | >70% of quiz starters | Validates quiz is not too long or confusing |
| Quiz-to-cart rate | >30% of quiz completers | Validates routine recommendation is compelling |
| Cart-to-purchase rate | >50% | Standard e-commerce conversion benchmark |
| Average order value | ₹1500+ | Indicates users buying routines (2-3 products), not singles |

### Secondary Metrics

| Metric | Target | Rationale |
|--------|--------|-----------|
| Routine adoption rate | >60% of purchases include 2+ products | Validates the routine model over individual product sales |
| Ingredient story engagement | >40% scroll to ingredient section on PDP | Validates that sourcing transparency matters to users |
| Return visitor rate (30-day) | >25% | Indicates brand recall and potential repeat purchase |
| Review submission rate | >5% of purchasers | Early signal of user engagement and trust |

### Metrics We Explicitly Don't Optimize For (in prototype phase)
- Revenue and GMV (not meaningful with limited traffic)
- SEO rankings (prototype won't be indexed)
- Social shares (no sharing infrastructure in v1)

---

## 10. Risks & Mitigations

### Product Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Quiz feels too generic / doesn't feel personalized | Medium | High — users don't trust the recommendation | Ensure result screen explains WHY this routine was chosen for their specific answers. Show the logic, not just the output. |
| Too few products to make routines feel differentiated | Medium | Medium — users see the same products in different routines | Ensure at least 15 unique products. Sensitivity variants count as separate products. |
| Hero ingredient stories don't influence purchase | Low | Medium — the differentiator becomes just content | Test by tracking scroll depth and time on ingredient sections. If low, make ingredient info more prominent in the purchase flow. |
| Users want to buy individual products, not routines | Medium | Low — still a valid purchase, just lower AOV | Support both flows. Don't force routine purchase. Individual product pages should stand on their own. |

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Payment integration issues (Razorpay) | Low | High — blocks all purchases | Use Razorpay test mode during prototype. Keep checkout flow simple. |
| Database schema changes post-launch | Medium | Medium — migration required | Design schema with room for extension (nullable fields, enum types that can grow). PostgreSQL handles migrations well. |
| AI-generated prototype code quality | Medium | Medium — may not be production-ready | Follow course best practices: UI first with mock data, then backend. Get engineering review before any production deployment. |

### Business Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Brand positioning too similar to Juicy Chemistry | Medium | Medium — no clear reason to switch | Lean harder on routine curation as primary differentiator. JC doesn't do this at all. |
| Hero ingredient sourcing raises costs above ₹1200 price ceiling | Medium | High — breaks value proposition | Apply Option B: only hero ingredient per product needs premium sourcing. Remaining ingredients are standard cosmetic-grade. |
| User expects subscription model | Low | Low — can add later | Include "notify me for reorder" as a lightweight alternative in v1. |

---

## 11. Prototype Build Sequence

Following course framework: give backend context first, execute UI first.

### Phase 1: UI with Mock Data
1. Homepage (hero, featured routines, product grid, quiz CTA)
2. Skin quiz flow (5 screens + results)
3. Product listing page
4. Product detail page (with ingredient story section)
5. Routine detail page (steps with products)
6. Cart drawer
7. Checkout page
8. Account / order history

### Phase 2: Backend Integration
1. Set up PostgreSQL with schema from Section 6
2. Seed database with ~15 products, ~10 ingredients, ~16 routines
3. Connect quiz flow to Skin Profile + Routine mapping
4. Connect product/routine pages to database queries
5. Implement cart (CRUD on Cart Items)
6. Implement checkout + order creation
7. Integrate Razorpay (test mode)
8. User authentication (registration, login, session)

### Phase 3: Polish & Review
1. Responsive design pass (mobile, tablet, desktop)
2. Error states (empty cart, failed payment, out of stock)
3. Loading states (skeleton screens per design system)
4. Engineering review for production readiness

---

## 12. Open Questions (For Design & Tech Review)

1. Should the quiz results page show a "why this routine" explanation, or just the product list? (Hypothesis: showing the reasoning increases trust and conversion.)
2. Do we need product comparison functionality, or does the routine model eliminate the need for comparison shopping?
3. Should we show stock levels ("only 5 left") or does that feel too e-commerce and not enough luxury?
4. How do we handle the case where a product in a routine is out of stock? Show the routine without it, or suggest a substitute?
5. Should ingredient stories be expandable/collapsible or always visible on the PDP?

---

## Appendix A: Reference Files

| Document | Description |
|----------|-------------|
| `design-system.md` | Complete design system with colors, typography, components, page guidelines |
| `erd-diagram` | Entity-relationship diagram for the database schema |
| `DB Choices.pdf` | Database selection reference framework (course material) |

## Appendix B: Enums Reference

```
skin_type: dry | oily | combination | normal
primary_concern: dullness | acne | pigmentation | aging
routine_size_pref: minimal | full
time_of_day_pref: morning | evening | both
step_type: cleanse | treat | moisturize | protect
order_status: placed | confirmed | shipped | delivered | cancelled
payment_status: pending | completed | failed | refunded
product_category: cleanser | serum | moisturizer | sunscreen | oil | mask
```
