-- ============================================
-- Āhā Skincare — Seed Data
-- ============================================
-- Run after schema.sql
-- ============================================

-- ============================================
-- HERO INGREDIENTS
-- ============================================

INSERT INTO ingredients (id, name, scientific_name, source_region, source_story, benefits, certification) VALUES
(
    'a1000000-0000-0000-0000-000000000001',
    'Kashmiri Saffron',
    'Crocus sativus L.',
    'Pampore, Kashmir',
    'Our saffron comes from the fields of Pampore — the only region in India where Crocus sativus blooms. Each strand is hand-harvested at dawn, when the flower first opens, to preserve its potent antioxidants and natural pigments. Used in Ayurvedic skincare for centuries, saffron naturally brightens skin tone, reduces dark spots, and gives that unmistakable inner glow.',
    'Brightening, Anti-oxidant, Anti-inflammatory',
    'India Organic'
),
(
    'a1000000-0000-0000-0000-000000000002',
    'Lakadong Turmeric',
    'Curcuma longa',
    'Lakadong, Meghalaya',
    'Lakadong turmeric contains the highest curcumin content of any turmeric variety in the world — up to 8-9%, compared to the 2-3% found in regular turmeric. Grown in the Jaintia Hills of Meghalaya by Pnar tribal farmers, each root is sun-dried and cold-processed to preserve its potency.',
    'Brightening, Anti-bacterial, Healing',
    'India Organic'
),
(
    'a1000000-0000-0000-0000-000000000003',
    'Kannauj Rose',
    'Rosa damascena',
    'Kannauj, Uttar Pradesh',
    'Kannauj has been the perfume capital of India for over 400 years. Our rose otto is distilled using the traditional deg-bhapka method — a copper still technique passed down through generations. It takes approximately 60,000 roses to produce one ounce of pure rose otto.',
    'Hydrating, Soothing, Anti-aging',
    'India Organic'
),
(
    'a1000000-0000-0000-0000-000000000004',
    'Vrindavan Neem',
    'Azadirachta indica',
    'Vrindavan, Uttar Pradesh',
    'Our neem is sourced from century-old trees in and around Vrindavan. Cold-pressed from seeds and leaves, neem oil has been used in Ayurveda for thousands of years as a powerful skin purifier. Its natural antibacterial properties make it effective against acne without harsh chemicals.',
    'Anti-bacterial, Purifying, Anti-fungal',
    'India Organic'
),
(
    'a1000000-0000-0000-0000-000000000005',
    'Marayoor Sandalwood',
    'Santalum album',
    'Marayoor, Kerala',
    'The Marayoor valley in Kerala is one of the last natural sandalwood forests in India. Our sandalwood is sustainably harvested from government-managed forests and steam-distilled on site. The oil has been prized for centuries for its ability to soothe inflammation and even skin tone.',
    'Soothing, Even-toning, Anti-inflammatory',
    'FSC Certified'
),
(
    'a1000000-0000-0000-0000-000000000006',
    'Nilgiri Tea Tree',
    'Melaleuca alternifolia',
    'Nilgiris, Tamil Nadu',
    'Grown in the misty hills of the Nilgiris at 2000m elevation, our tea tree oil is steam-distilled from leaves harvested at peak terpinen-4-ol content. The high altitude and cool climate produce a gentler, less harsh oil compared to Australian varieties.',
    'Clarifying, Anti-microbial, Pore-refining',
    'India Organic'
),
(
    'a1000000-0000-0000-0000-000000000007',
    'Rajasthani Aloe Vera',
    'Aloe barbadensis miller',
    'Rajasthan',
    'Grown in the arid climate of Rajasthan, our aloe vera develops a higher concentration of active polysaccharides than varieties grown in more humid regions. The inner gel is cold-processed within hours of harvest to retain its skin-barrier-repairing properties.',
    'Hydrating, Barrier-repair, Cooling',
    'India Organic'
),
(
    'a1000000-0000-0000-0000-000000000008',
    'Rajasthani Bakuchiol',
    'Psoralea corylifolia',
    'Rajasthan',
    'Bakuchiol is nature''s alternative to retinol — with similar anti-aging benefits but without the irritation or sun sensitivity. Our bakuchiol is extracted from the seeds of the babchi plant, which grows wild across Rajasthan. Clinical studies show it stimulates collagen production comparable to retinol.',
    'Anti-aging, Firming, Collagen-boosting',
    'India Organic'
);

-- ============================================
-- PRODUCTS
-- ============================================

INSERT INTO products (id, name, tagline, description, price, category, size, hero_ingredient_id, stock_quantity, how_to_use) VALUES
(
    'b1000000-0000-0000-0000-000000000001',
    'Kumkumadi Glow Serum',
    'The overnight radiance ritual',
    'A potent face serum rooted in the ancient Kumkumadi Tailam tradition — reimagined with traceable, organic ingredients. Saffron and turmeric work overnight to brighten, even tone, and restore your skin''s natural glow.',
    899.00, 'serum', '30ml',
    'a1000000-0000-0000-0000-000000000001', 150,
    ARRAY['Cleanse your face and pat dry', 'Press 3-4 drops between your palms', 'Gently press onto face and neck — don''t rub', 'Let absorb for 2 minutes before moisturizer', 'Use every evening for best results']
),
(
    'b1000000-0000-0000-0000-000000000002',
    'Haldi & Honey Cleanser',
    'Brightness begins here',
    'A gentle brightening face wash that combines Lakadong turmeric with raw forest honey. Dissolves impurities and dead skin cells without stripping moisture. Your first step toward visibly brighter skin.',
    649.00, 'cleanser', '120ml',
    'a1000000-0000-0000-0000-000000000002', 200,
    ARRAY['Wet your face with lukewarm water', 'Take a pea-sized amount', 'Massage in gentle circles for 60 seconds', 'Rinse thoroughly with lukewarm water', 'Use morning and evening']
),
(
    'b1000000-0000-0000-0000-000000000003',
    'Rose & Jojoba Moisturizer',
    'Deep hydration, dewy finish',
    'A rich day cream that locks in moisture with Kannauj rose otto and cold-pressed jojoba oil. Absorbs without heaviness, leaving skin hydrated and dewy — not oily. The finishing touch to any ritual.',
    799.00, 'moisturizer', '50ml',
    'a1000000-0000-0000-0000-000000000003', 180,
    ARRAY['Take a small dollop on your fingertip', 'Warm between fingers for 5 seconds', 'Press and sweep across face in upward motions', 'Don''t forget your neck and décolletage', 'Use as the last step of your ritual']
),
(
    'b1000000-0000-0000-0000-000000000004',
    'Neem Purifying Cleanser',
    'Deep clean without the strip',
    'An antibacterial face wash powered by cold-pressed Vrindavan neem. Draws out impurities, unclogs pores, and calms active breakouts — all without stripping your skin''s natural moisture barrier.',
    599.00, 'cleanser', '120ml',
    'a1000000-0000-0000-0000-000000000004', 160,
    ARRAY['Wet your face', 'Lather a small amount between palms', 'Apply to face, focusing on oily areas', 'Massage gently for 45 seconds', 'Rinse with cool water']
),
(
    'b1000000-0000-0000-0000-000000000005',
    'Tea Tree Clarifying Serum',
    'Breakout intervention',
    'A lightweight clarifying serum with Nilgiri tea tree oil and niacinamide. Targets active breakouts, prevents new ones, and gradually refines pore size. Non-comedogenic — won''t clog what it''s trying to clear.',
    749.00, 'serum', '30ml',
    'a1000000-0000-0000-0000-000000000006', 120,
    ARRAY['Apply to clean, dry skin', 'Use 2-3 drops on problem areas', 'Tap gently until absorbed', 'Follow with a light moisturizer', 'Use every evening']
),
(
    'b1000000-0000-0000-0000-000000000006',
    'Aloe Barrier Gel',
    'Weightless hydration',
    'A gel-cream moisturizer made with cold-processed Rajasthani aloe vera. Provides deep hydration without any heaviness or pore-clogging. Rebuilds your skin barrier while keeping oil production balanced.',
    599.00, 'moisturizer', '50ml',
    'a1000000-0000-0000-0000-000000000007', 140,
    ARRAY['Apply to clean face after serum', 'Use a fingertip-sized amount', 'Smooth across face and neck', 'Can be layered under sunscreen', 'Use morning and evening']
),
(
    'b1000000-0000-0000-0000-000000000007',
    'Saffron Brightening Cleanser',
    'Glow from the first wash',
    'A saffron-infused cleansing milk that gently lifts impurities while depositing brightening actives. Formulated for daily use — each wash gradually fades dark spots and evens skin tone.',
    699.00, 'cleanser', '120ml',
    'a1000000-0000-0000-0000-000000000001', 130,
    ARRAY['Apply to dry face with fingertips', 'Massage in upward circles for 60 seconds', 'Add water to emulsify', 'Rinse thoroughly', 'Use morning and evening']
),
(
    'b1000000-0000-0000-0000-000000000008',
    'Sandalwood Day Cream SPF 30',
    'Protect what you''ve built',
    'A daily moisturizer with mineral SPF 30, infused with Marayoor sandalwood oil. Prevents new pigmentation from UV exposure while sandalwood soothes and evens existing marks. No white cast.',
    849.00, 'sunscreen', '50ml',
    'a1000000-0000-0000-0000-000000000005', 110,
    ARRAY['Apply as the last step of your morning ritual', 'Use a generous amount — don''t skimp on SPF', 'Spread evenly across face, neck, and ears', 'Reapply every 3-4 hours if outdoors', 'Works under makeup']
),
(
    'b1000000-0000-0000-0000-000000000009',
    'Rose Cream Cleanser',
    'The gentle start',
    'A cream-based cleanser enriched with Kannauj rose otto that melts away makeup and impurities without disrupting your skin''s moisture balance. Leaves skin clean, soft, and lightly fragrant.',
    699.00, 'cleanser', '120ml',
    'a1000000-0000-0000-0000-000000000003', 125,
    ARRAY['Massage onto dry face in circular motions', 'Spend extra time on makeup-heavy areas', 'Add lukewarm water to emulsify', 'Rinse clean', 'Use every evening']
),
(
    'b1000000-0000-0000-0000-000000000010',
    'Bakuchiol Night Serum',
    'Nature''s retinol alternative',
    'A potent anti-aging night serum powered by Rajasthani bakuchiol. Stimulates collagen, reduces fine lines, and firms skin — with none of the irritation, peeling, or sun sensitivity of synthetic retinol.',
    949.00, 'serum', '30ml',
    'a1000000-0000-0000-0000-000000000008', 100,
    ARRAY['Apply to clean face in the evening', 'Use 4-5 drops across face and neck', 'Press gently into skin — don''t drag', 'Follow with moisturizer', 'Results visible in 4-6 weeks of consistent use']
),
(
    'b1000000-0000-0000-0000-000000000011',
    'Neem Purifying Mask',
    'Weekly detox',
    'A weekly clay mask with cold-pressed neem oil and kaolin clay. Draws out deep-seated impurities, absorbs excess oil, and calms inflammation. Use once a week for clearer, calmer skin.',
    749.00, 'mask', '100ml',
    'a1000000-0000-0000-0000-000000000004', 90,
    ARRAY['Apply to clean, dry face', 'Spread an even layer avoiding eye area', 'Leave on for 10-15 minutes', 'Rinse with lukewarm water', 'Use once a week, ideally in the evening']
),
(
    'b1000000-0000-0000-0000-000000000012',
    'Chamomile Gentle Cleanser',
    'For skin that needs kindness',
    'An ultra-gentle cleanser formulated for sensitive and reactive skin. Chamomile extract calms redness while oat proteins strengthen the skin barrier. No fragrance, no essential oils, no drama.',
    649.00, 'cleanser', '120ml',
    'a1000000-0000-0000-0000-000000000003', 115,
    ARRAY['Wet face with lukewarm water', 'Gently lather a small amount', 'Apply with minimal pressure', 'Rinse with cool water', 'Pat dry — never rub']
),
(
    'b1000000-0000-0000-0000-000000000013',
    'Sandalwood Soothe Serum',
    'Calm in a bottle',
    'A calming serum with Marayoor sandalwood and centella asiatica. Reduces redness, strengthens the skin barrier, and soothes irritation. Designed for skin that reacts to everything else.',
    849.00, 'serum', '30ml',
    'a1000000-0000-0000-0000-000000000005', 95,
    ARRAY['Apply to clean face', 'Use 3-4 drops', 'Press gently — never drag on sensitive skin', 'Wait 1 minute before moisturizer', 'Use morning and evening']
);

-- ============================================
-- ROUTINES
-- 16 base combinations: 4 skin types × 4 concerns
-- Each has morning + evening variants = 32 total
-- For brevity, seeding the 8 most common routines
-- ============================================

INSERT INTO routines (id, name, tagline, description, skin_type, primary_concern, for_sensitive, time_of_day) VALUES
-- Dullness routines
('c1000000-0000-0000-0000-000000000001', 'The glow ritual', 'Radiance restored, naturally', 'A 3-step routine that targets dullness and uneven tone. Turmeric brightens, saffron evens, rose hydrates.', 'combination', 'dullness', false, 'evening'),
('c1000000-0000-0000-0000-000000000002', 'The glow ritual', 'Radiance restored, naturally', 'A morning glow routine for all skin types.', 'normal', 'dullness', false, 'morning'),
-- Acne routines
('c1000000-0000-0000-0000-000000000003', 'The clear ritual', 'Calm the storm, clear the path', 'A purifying routine that fights breakouts without stripping moisture. Neem purifies, tea tree clarifies, aloe protects.', 'oily', 'acne', false, 'evening'),
('c1000000-0000-0000-0000-000000000004', 'The clear ritual', 'Clear skin starts in the morning', 'A lightweight morning routine for acne-prone skin.', 'combination', 'acne', false, 'morning'),
-- Pigmentation routines
('c1000000-0000-0000-0000-000000000005', 'The even ritual', 'Every spot tells a story. Let''s write a new one.', 'A brightening routine that fades dark spots and prevents new ones. Saffron corrects, sandalwood protects.', 'normal', 'pigmentation', false, 'evening'),
('c1000000-0000-0000-0000-000000000006', 'The even ritual', 'Protection is prevention', 'A morning routine focused on SPF and prevention.', 'dry', 'pigmentation', false, 'morning'),
-- Aging routines
('c1000000-0000-0000-0000-000000000007', 'The renew ritual', 'Age is earned. Radiance is maintained.', 'A nourishing routine that firms, plumps, and protects. Bakuchiol renews, rose hydrates deeply.', 'dry', 'aging', false, 'evening'),
('c1000000-0000-0000-0000-000000000008', 'The renew ritual', 'Firm and protect by day', 'A morning routine for aging concerns with SPF protection.', 'normal', 'aging', false, 'morning');

-- ============================================
-- ROUTINE STEPS
-- ============================================

-- The glow ritual (evening, combination)
INSERT INTO routine_steps (routine_id, product_id, step_order, step_type, instructions) VALUES
('c1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', 1, 'cleanse', 'Massage onto wet face for 60 seconds. Rinse with lukewarm water.'),
('c1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 2, 'treat', 'Press 3-4 drops onto face and neck. Let absorb for 2 minutes.'),
('c1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000003', 3, 'moisturize', 'Warm between fingers. Press and sweep in upward motions.');

-- The glow ritual (morning, normal)
INSERT INTO routine_steps (routine_id, product_id, step_order, step_type, instructions) VALUES
('c1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000002', 1, 'cleanse', 'Quick morning cleanse — 30 seconds is enough.'),
('c1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000003', 2, 'moisturize', 'Apply before sunscreen or makeup.');

-- The clear ritual (evening, oily)
INSERT INTO routine_steps (routine_id, product_id, step_order, step_type, instructions) VALUES
('c1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000004', 1, 'cleanse', 'Focus on T-zone and any active breakout areas.'),
('c1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000005', 2, 'treat', 'Apply 2-3 drops only on problem areas. Less is more.'),
('c1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000006', 3, 'moisturize', 'Even oily skin needs hydration. This gel won''t clog.');

-- The clear ritual (morning, combination)
INSERT INTO routine_steps (routine_id, product_id, step_order, step_type, instructions) VALUES
('c1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000004', 1, 'cleanse', 'Light morning cleanse to remove overnight oil.'),
('c1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000006', 2, 'moisturize', 'Hydrate without adding oil. Follow with SPF.');

-- The even ritual (evening, normal)
INSERT INTO routine_steps (routine_id, product_id, step_order, step_type, instructions) VALUES
('c1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000007', 1, 'cleanse', 'Massage the cleansing milk onto dry face to dissolve pigmentation-causing debris.'),
('c1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000001', 2, 'treat', 'The Kumkumadi serum is the hero here — let it work overnight.'),
('c1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000003', 3, 'moisturize', 'Seal in the serum with a hydrating layer.');

-- The even ritual (morning, dry)
INSERT INTO routine_steps (routine_id, product_id, step_order, step_type, instructions) VALUES
('c1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000007', 1, 'cleanse', 'Gentle morning cleanse.'),
('c1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000008', 2, 'protect', 'SPF is non-negotiable for pigmentation. This is your most important step.');

-- The renew ritual (evening, dry)
INSERT INTO routine_steps (routine_id, product_id, step_order, step_type, instructions) VALUES
('c1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000009', 1, 'cleanse', 'Cream cleanser melts away the day without stripping.'),
('c1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000010', 2, 'treat', 'Bakuchiol works while you sleep. Consistency is key — give it 6 weeks.'),
('c1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000003', 3, 'moisturize', 'Rich moisture to support skin renewal overnight.');

-- The renew ritual (morning, normal)
INSERT INTO routine_steps (routine_id, product_id, step_order, step_type, instructions) VALUES
('c1000000-0000-0000-0000-000000000008', 'b1000000-0000-0000-0000-000000000009', 1, 'cleanse', 'Quick cleanse to refresh.'),
('c1000000-0000-0000-0000-000000000008', 'b1000000-0000-0000-0000-000000000008', 2, 'protect', 'Always finish with SPF — sun damage accelerates aging.');

-- ============================================
-- SAMPLE REVIEWS
-- ============================================

-- We'll create a sample user for reviews
INSERT INTO users (id, name, email, password_hash, phone) VALUES
('d1000000-0000-0000-0000-000000000001', 'Priya Mehta', 'priya@example.com', '$2b$10$placeholder', '9876543210'),
('d1000000-0000-0000-0000-000000000002', 'Ananya Krishnan', 'ananya@example.com', '$2b$10$placeholder', '9876543211'),
('d1000000-0000-0000-0000-000000000003', 'Rhea Sharma', 'rhea@example.com', '$2b$10$placeholder', '9876543212');

INSERT INTO reviews (user_id, product_id, rating, comment) VALUES
('d1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 5, 'I''ve been using this for 3 weeks and the difference is visible. My skin tone is more even and there''s a genuine glow — not oily shine, actual glow. The saffron scent is subtle and beautiful.'),
('d1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 4, 'Love the texture — it absorbs quickly and doesn''t feel heavy. Took about 2 weeks to see results but definitely worth the wait. Only wish it came in a larger size.'),
('d1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000001', 5, 'I was skeptical about the sourcing claims but they actually sent me the batch info. Knowing where the saffron comes from makes me trust this way more than other "natural" brands.'),
('d1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', 5, 'The turmeric doesn''t stain like I expected. Leaves my face feeling clean but not tight. The honey makes it smell amazing.'),
('d1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000003', 4, 'Beautiful rose scent — very subtle, not overpowering. Hydrates well for my combination skin. A little goes a long way.'),
('d1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000004', 5, 'This is the only cleanser that has actually helped with my acne without drying me out. The neem smell is earthy but I''ve grown to love it.');

-- ============================================
-- SAMPLE SKIN PROFILE (showing quiz → routine mapping)
-- ============================================

INSERT INTO skin_profiles (user_id, skin_type, primary_concern, is_sensitive, routine_size_pref, time_of_day_pref) VALUES
('d1000000-0000-0000-0000-000000000001', 'combination', 'dullness', false, 'full', 'evening');
