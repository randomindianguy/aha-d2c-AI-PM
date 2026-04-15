-- ============================================
-- Āhā Skincare — PostgreSQL Database Schema
-- ============================================
-- Routine-centric data model with hero ingredients
-- See PRD Section 6 for architecture rationale
-- ============================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CORE ENTITIES
-- ============================================

-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ingredients (hero ingredients only — small, curated table)
CREATE TABLE ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(150),
    source_region VARCHAR(200) NOT NULL,
    source_story TEXT,
    benefits TEXT,
    certification VARCHAR(100),
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    tagline VARCHAR(300),
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('cleanser', 'serum', 'moisturizer', 'sunscreen', 'oil', 'mask')),
    size VARCHAR(50),
    image_url VARCHAR(500),
    hero_ingredient_id UUID REFERENCES ingredients(id),
    stock_quantity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    how_to_use TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skin Profiles (from quiz — separate from users for retake support)
CREATE TABLE skin_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    skin_type VARCHAR(20) NOT NULL CHECK (skin_type IN ('dry', 'oily', 'combination', 'normal')),
    primary_concern VARCHAR(20) NOT NULL CHECK (primary_concern IN ('dullness', 'acne', 'pigmentation', 'aging')),
    is_sensitive BOOLEAN NOT NULL DEFAULT FALSE,
    routine_size_pref VARCHAR(10) NOT NULL CHECK (routine_size_pref IN ('minimal', 'full')),
    time_of_day_pref VARCHAR(10) NOT NULL CHECK (time_of_day_pref IN ('morning', 'evening', 'both')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Routines (pre-built by the brand, mapped to skin profiles)
CREATE TABLE routines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    tagline VARCHAR(300),
    description TEXT,
    skin_type VARCHAR(20) NOT NULL CHECK (skin_type IN ('dry', 'oily', 'combination', 'normal')),
    primary_concern VARCHAR(20) NOT NULL CHECK (primary_concern IN ('dullness', 'acne', 'pigmentation', 'aging')),
    for_sensitive BOOLEAN NOT NULL DEFAULT FALSE,
    time_of_day VARCHAR(10) NOT NULL CHECK (time_of_day IN ('morning', 'evening')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Routine Steps (ordered products within a routine)
CREATE TABLE routine_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    routine_id UUID NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    step_order INTEGER NOT NULL,
    step_type VARCHAR(20) NOT NULL CHECK (step_type IN ('cleanse', 'treat', 'moisturize', 'protect')),
    instructions TEXT,
    UNIQUE (routine_id, step_order)
);

-- ============================================
-- COMMERCE ENTITIES
-- ============================================

-- Addresses
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    line1 VARCHAR(255) NOT NULL,
    line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    shipping_address_id UUID REFERENCES addresses(id),
    status VARCHAR(20) NOT NULL DEFAULT 'placed' CHECK (status IN ('placed', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
    payment_ref VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items (price frozen at time of purchase)
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL
);

-- Cart Items
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, product_id)
);

-- Reviews (verified purchasers only enforced at app level)
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    product_id UUID NOT NULL REFERENCES products(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, product_id)
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_hero_ingredient ON products(hero_ingredient_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_skin_profiles_user ON skin_profiles(user_id);
CREATE INDEX idx_routines_lookup ON routines(skin_type, primary_concern, for_sensitive, time_of_day);
CREATE INDEX idx_routine_steps_routine ON routine_steps(routine_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_cart_items_user ON cart_items(user_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_addresses_user ON addresses(user_id);

-- ============================================
-- HELPER FUNCTION: updated_at auto-update
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
