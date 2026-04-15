# Design System — Āhā Skincare

> Brand essence: "A beautifully designed spice market — the architecture is clean and intentional, but what fills the shelves is vibrant and alive."

---

## 1. Brand Identity

### Positioning
Organic, nature-rooted, ritual-driven skincare. Forest Essentials' sensorial quality meets Juicy Chemistry's ingredient authenticity, at accessible pricing (₹600–1200).

### Personality
- Warm but not loud
- Intentional but not minimal
- Heritage-inspired but not old-fashioned
- Celebratory but not chaotic

### Visual Principle
Apothecary structure + Tropical energy. The layout breathes like Muji. The color and illustration celebrate like Fab India. Calm until you look closely, then alive.

### Anti-References (what we are NOT)
- The Ordinary — too clinical, too white, too lab-like
- Generic "clean beauty" — sad beige Pinterest boards
- Nykaa — too commercial, too busy
- Forest Essentials — too ornate, too expensive-looking

---

## 2. Color Palette

### Core Colors

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Warm Cream | #F5F0E8 | Page backgrounds, cards, modals |
| Background Alt | Soft Linen | #EDE6D8 | Section alternates, hover states |
| Primary | Forest Green | #2D4A3E | Headers, nav, footer, primary text on light bg |
| Primary Light | Sage | #4A6B5D | Secondary buttons, borders, subtle accents |
| Text Primary | Deep Charcoal | #2C2926 | Body text, labels |
| Text Secondary | Warm Gray | #6B6560 | Captions, helper text, metadata |
| Text Tertiary | Muted Stone | #9C9590 | Placeholders, disabled text |

### Ingredient Accent Colors
Each product line gets its own accent derived from its hero ingredient. These appear on product cards, quiz results, and ingredient story sections.

| Ingredient | Name | Hex | Light Wash (8% opacity) |
|------------|------|-----|------------------------|
| Turmeric | Golden Haldi | #E8A838 | rgba(232, 168, 56, 0.08) |
| Saffron | Kesar Orange | #D4764E | rgba(212, 118, 78, 0.08) |
| Rose | Gulab Pink | #C45A7B | rgba(196, 90, 123, 0.08) |
| Neem | Neem Green | #5A9E6F | rgba(90, 158, 111, 0.08) |
| Sandalwood | Chandan Beige | #C4A97D | rgba(196, 169, 125, 0.08) |
| Lavender | Lavender Mist | #8B7EB8 | rgba(139, 126, 184, 0.08) |

### Functional Colors

| Role | Hex | Usage |
|------|-----|-------|
| Success | #4A7C5F | Order confirmed, in-stock |
| Warning | #D4944E | Low stock, expiring offers |
| Error | #C45454 | Form errors, payment failures |
| Info | #5A7E9E | Tooltips, informational badges |

### Color Usage Rules
- Background is ALWAYS Warm Cream (#F5F0E8), never pure white (#FFFFFF)
- Forest Green is the dominant brand color — used for nav, headings, CTAs
- Ingredient accent colors appear ONLY in product-related contexts (cards, pages, quiz results)
- Never use more than one ingredient accent color in the same component
- Product cards get a subtle wash of their ingredient color as background tint
- The gold accent (#B8976A) is reserved for premium touches: "bestseller" badges, loyalty program, gift packaging references

---

## 3. Typography

### Font Families

| Role | Font | Fallback | Weight(s) |
|------|------|----------|-----------|
| Headings | DM Serif Display | Georgia, serif | 400 (regular only) |
| Body | DM Sans | -apple-system, sans-serif | 400 (regular), 500 (medium), 700 (bold) |
| Mono/Labels | DM Mono | monospace | 400 |

### Type Scale

| Element | Font | Size | Weight | Line Height | Letter Spacing | Color |
|---------|------|------|--------|-------------|----------------|-------|
| Hero Headline | DM Serif Display | 48px / 3rem | 400 | 1.15 | -0.02em | #2D4A3E |
| Section Headline | DM Serif Display | 36px / 2.25rem | 400 | 1.2 | -0.01em | #2D4A3E |
| Card Title | DM Serif Display | 24px / 1.5rem | 400 | 1.3 | 0 | #2D4A3E |
| Subsection Title | DM Sans | 20px / 1.25rem | 700 | 1.4 | 0 | #2C2926 |
| Body Large | DM Sans | 18px / 1.125rem | 400 | 1.6 | 0 | #2C2926 |
| Body Regular | DM Sans | 16px / 1rem | 400 | 1.6 | 0 | #2C2926 |
| Body Small | DM Sans | 14px / 0.875rem | 400 | 1.5 | 0 | #6B6560 |
| Caption | DM Sans | 12px / 0.75rem | 500 | 1.4 | 0.02em | #6B6560 |
| Price | DM Sans | 20px / 1.25rem | 700 | 1 | 0 | #2D4A3E |
| Strikethrough Price | DM Sans | 14px / 0.875rem | 400 | 1 | 0 | #9C9590 |
| Button Label | DM Sans | 14px / 0.875rem | 700 | 1 | 0.04em | — |
| Nav Link | DM Sans | 14px / 0.875rem | 500 | 1 | 0.02em | #2D4A3E |
| Badge/Tag | DM Sans | 11px / 0.6875rem | 700 | 1 | 0.06em | — |
| Ingredient Label | DM Mono | 12px / 0.75rem | 400 | 1.4 | 0.04em | #6B6560 |

### Typography Rules
- Headings are ALWAYS DM Serif Display — this is the brand's signature
- Never use serif for body text, buttons, or navigation
- DM Mono is reserved for ingredient names and sourcing labels only — the "apothecary label" feel
- All headings use Forest Green (#2D4A3E), not black
- Maximum line width for body text: 680px (for readability)
- Use sentence case everywhere — never ALL CAPS except badge/tag labels

---

## 4. Spacing System

Base unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Inline icon gaps, tight padding |
| sm | 8px | Between related elements (label to input) |
| md | 16px | Component internal padding |
| lg | 24px | Between components in a group |
| xl | 32px | Between content sections |
| 2xl | 48px | Major section separators |
| 3xl | 64px | Page section gaps |
| 4xl | 96px | Hero section padding |

### Layout Grid
- Max content width: 1200px
- Page margin (desktop): 64px
- Page margin (mobile): 20px
- Column gutter: 24px
- Product grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)

---

## 5. Components

### Buttons

**Primary Button**
- Background: #2D4A3E (Forest Green)
- Text: #F5F0E8 (Warm Cream)
- Font: DM Sans, 14px, 700, letter-spacing 0.04em, uppercase
- Padding: 14px 32px
- Border-radius: 6px
- Hover: background darkens to #1E352B
- Active: scale(0.98)
- Transition: all 200ms ease

**Secondary Button**
- Background: transparent
- Border: 1.5px solid #2D4A3E
- Text: #2D4A3E
- Same font and sizing as primary
- Hover: background fills to #2D4A3E, text becomes #F5F0E8

**Accent Button** (Add to Cart, View Routine)
- Background: ingredient accent color of the current product context
- Text: white or Forest Green (whichever has better contrast)
- Same sizing as primary

**Text Button / Link**
- Color: #2D4A3E
- Text-decoration: underline, offset 3px
- Hover: color shifts to ingredient accent

### Cards

**Product Card**
- Background: #FFFFFF with ingredient color wash at 8% opacity
- Border: 1px solid rgba(44, 41, 38, 0.08)
- Border-radius: 12px
- Padding: 0 (image bleeds to edges, text gets 20px padding)
- Shadow: 0 1px 3px rgba(44, 41, 38, 0.06)
- Hover: shadow deepens to 0 4px 12px rgba(44, 41, 38, 0.1), translateY(-2px)
- Image aspect ratio: 4:5
- Contains: product image, product name (Card Title), hero ingredient tag, price, "Add to routine" button

**Routine Card**
- Background: #F5F0E8
- Border: 1.5px solid #2D4A3E at 15% opacity
- Border-radius: 12px
- Padding: 24px
- Contains: routine name (Card Title), skin type badge, concern badge, product thumbnails in sequence with step numbers, "View routine" button

**Ingredient Story Card**
- Background: ingredient color at 8% opacity
- Left border: 3px solid ingredient accent color
- Border-radius: 0 12px 12px 0
- Padding: 24px
- Contains: ingredient illustration (hand-painted botanical), ingredient name (DM Mono), source region, sourcing story paragraph, benefits list

### Input Fields

- Background: #FFFFFF
- Border: 1.5px solid rgba(44, 41, 38, 0.15)
- Border-radius: 8px
- Padding: 12px 16px
- Font: DM Sans, 16px, 400
- Placeholder color: #9C9590
- Focus: border-color #2D4A3E, box-shadow 0 0 0 3px rgba(45, 74, 62, 0.1)
- Error: border-color #C45454, box-shadow 0 0 0 3px rgba(196, 84, 84, 0.1)

### Badges / Tags

**Skin Type Badge**
- Background: #2D4A3E at 10% opacity
- Text: #2D4A3E
- Font: DM Sans, 11px, 700, uppercase, letter-spacing 0.06em
- Padding: 4px 10px
- Border-radius: 100px (pill)

**Ingredient Tag**
- Background: ingredient accent at 12% opacity
- Text: ingredient accent color (darkened if needed for contrast)
- Font: DM Mono, 12px, 400
- Padding: 4px 10px
- Border-radius: 100px (pill)

**Bestseller Badge**
- Background: #B8976A (muted gold)
- Text: #FFFFFF
- Font: DM Sans, 10px, 700, uppercase
- Padding: 3px 8px
- Border-radius: 4px

### Navigation

**Desktop Navbar**
- Background: #F5F0E8
- Height: 72px
- Border-bottom: 1px solid rgba(44, 41, 38, 0.08)
- Logo: left-aligned, DM Serif Display, 22px, Forest Green
- Links: center-aligned, DM Sans, 14px, 500
- Right: search icon, account icon, cart icon with item count badge
- Sticky on scroll with subtle backdrop-blur

**Mobile Navbar**
- Height: 60px
- Hamburger menu left, logo center, cart icon right
- Slide-in drawer from left for menu

### Footer
- Background: #2D4A3E (Forest Green)
- Text: #F5F0E8 (Warm Cream)
- Links: #C8C0B4 (muted cream), hover to #FFFFFF
- Sections: About, Shop, Skin Quiz, Ingredients, Support
- Bottom bar: payment icons, copyright, social links

---

## 6. Iconography

- Style: line icons, 1.5px stroke, rounded line caps
- Size: 20px for navigation, 24px for feature highlights, 16px inline
- Color: inherits text color of context
- Source: Lucide Icons or Phosphor Icons (line weight matches brand)
- NO filled/solid icons — always outline
- NO emoji anywhere on the site

---

## 7. Illustration Guidelines

### Botanical Illustrations
- Style: hand-painted watercolor, not vector/flat
- Usage: hero sections, ingredient story cards, quiz result pages, 404/empty states
- Subject: raw ingredients in their natural form — turmeric roots with soil, saffron threads on fingers, rose petals scattered, neem leaves on a branch
- Color: uses the ingredient accent palette — each illustration's dominant color should match its ingredient hex
- Placement: intentional and sparse — one hero illustration per page max. NOT scattered everywhere.
- Background: always on cream or white, never on colored backgrounds
- Opacity: can be used at 30-50% opacity as subtle background textures for sections

### What to avoid
- Vector flat illustrations
- Generic "nature" clip art
- Symmetrical mandala patterns (too FSE)
- Photorealistic renders
- Illustrations with black outlines (too graphic novel)

---

## 8. Photography Guidelines

- Lighting: warm, natural, golden-hour feel. Never flash or studio-white lighting
- Composition: product + raw ingredient together. Serum bottle next to saffron strands. Moisturizer with rose petals.
- Surfaces: natural materials — raw wood, terracotta, handmade ceramic, linen cloth, stone
- Color temperature: warm (3500-4500K feel)
- People (if shown): natural skin, no heavy retouching, diverse skin tones, candid not posed
- Avoid: pure white backgrounds, floating product shots, clinical arrangements, lifestyle shots that feel stock-photo

---

## 9. Page-Specific Guidelines

### Homepage
1. Hero: full-width, botanical watercolor illustration bleeding into product photography. Serif headline on cream overlay. One CTA: "Find your routine"
2. Value props: 3 icons with short text (organic sourcing, curated routines, accessible luxury)
3. Featured routines: 2-3 routine cards in a row
4. Ingredient spotlight: one Ingredient Story Card, full-width, with large botanical illustration
5. Bestsellers: product grid, 3-4 products
6. Quiz CTA: warm section with different background, inviting the skin quiz
7. Footer

### Skin Quiz
- One question per screen
- Large serif question text, centered
- Answer options as tappable cards (not radio buttons)
- Progress indicator: thin Forest Green bar at top
- Subtle ingredient illustration in the background, low opacity
- Result screen: personalized routine name in serif, product cards in sequence with step numbers, ingredient accent colors matching the recommended products

### Product Detail Page
- Left: product image gallery (4:5 ratio)
- Right: product name (serif), price, hero ingredient tag (mono), short description, "Add to cart" button
- Below: ingredient story card (full-width), sourcing info, how-to-use steps, reviews
- Related products at bottom

### Cart & Checkout
- Clean, minimal — cream background, clear hierarchy
- Product thumbnails with names and prices
- Routine upsell: "Complete your routine — add [product] for ₹X"
- Trust signals: organic certification badge, secure payment icons, return policy
- Checkout: single-page, address form + payment, order summary sidebar

---

## 10. Motion & Interaction

- Transitions: 200ms ease for hover states, 300ms ease for page transitions
- Scroll animations: subtle fade-in-up on scroll for content sections (translate 16px, opacity 0 to 1)
- Loading: skeleton screens with cream-to-linen shimmer, not spinners
- No bouncy/spring animations — everything is gentle and smooth
- Page transitions: simple crossfade
- Cart: slide-in drawer from right, 300ms ease

---

## 11. Responsive Breakpoints

| Breakpoint | Width | Columns | Notes |
|------------|-------|---------|-------|
| Mobile | < 640px | 1 | Stack everything, full-width cards |
| Tablet | 640-1024px | 2 | 2-col product grid, side-by-side routine steps |
| Desktop | > 1024px | 3-4 | Full layout, sidebar on PDP |
| Wide | > 1440px | Max 1200px content | Center content, wider margins |

---

## 12. Accessibility

- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text
- All interactive elements: visible focus ring (3px Forest Green at 20% opacity)
- Alt text required for all product images and illustrations
- Quiz must be keyboard-navigable
- Touch targets: minimum 44x44px on mobile
- Ingredient tags and badges must not rely on color alone — include text labels
