// ============================================
// Āhā Skincare — API Server
// ============================================
// Express + PostgreSQL (via pg)
// Run: npm install express pg cors dotenv bcrypt
// ============================================

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // For local dev: postgresql://user:password@localhost:5432/aha_skincare
});

// ============================================
// PRODUCTS
// ============================================

// GET /api/products — list all active products
app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    let query = `
      SELECT p.*, 
             i.name as ingredient_name, 
             i.source_region as ingredient_origin,
             i.scientific_name as ingredient_latin,
             COALESCE(AVG(r.rating), 0) as avg_rating,
             COUNT(r.id) as review_count
      FROM products p
      LEFT JOIN ingredients i ON p.hero_ingredient_id = i.id
      LEFT JOIN reviews r ON r.product_id = p.id
      WHERE p.is_active = true
    `;
    const params = [];
    if (category) {
      params.push(category);
      query += ` AND p.category = $${params.length}`;
    }
    query += ` GROUP BY p.id, i.name, i.source_region, i.scientific_name ORDER BY p.created_at DESC`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id — single product with full details
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Product + hero ingredient
    const productResult = await pool.query(`
      SELECT p.*, 
             i.name as ingredient_name,
             i.scientific_name as ingredient_latin,
             i.source_region as ingredient_origin,
             i.source_story as ingredient_story,
             i.benefits as ingredient_benefits,
             i.certification as ingredient_certification
      FROM products p
      LEFT JOIN ingredients i ON p.hero_ingredient_id = i.id
      WHERE p.id = $1
    `, [id]);

    if (productResult.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Reviews
    const reviewsResult = await pool.query(`
      SELECT r.*, u.name as user_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.product_id = $1
      ORDER BY r.created_at DESC
      LIMIT 10
    `, [id]);

    // Which routines include this product
    const routinesResult = await pool.query(`
      SELECT ro.id, ro.name, ro.primary_concern, rs.step_order, rs.step_type
      FROM routine_steps rs
      JOIN routines ro ON rs.routine_id = ro.id
      WHERE rs.product_id = $1
    `, [id]);

    res.json({
      ...productResult.rows[0],
      reviews: reviewsResult.rows,
      routines: routinesResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// ============================================
// INGREDIENTS
// ============================================

// GET /api/ingredients — all hero ingredients
app.get('/api/ingredients', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT i.*, COUNT(p.id) as product_count
      FROM ingredients i
      LEFT JOIN products p ON p.hero_ingredient_id = i.id AND p.is_active = true
      GROUP BY i.id
      ORDER BY i.name
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
});

// ============================================
// SKIN QUIZ & ROUTINES
// ============================================

// POST /api/quiz — submit quiz answers, get routine recommendation
app.post('/api/quiz', async (req, res) => {
  try {
    const { user_id, skin_type, primary_concern, is_sensitive, routine_size_pref, time_of_day_pref } = req.body;

    // Save skin profile if user is logged in
    let profileId = null;
    if (user_id) {
      const profileResult = await pool.query(`
        INSERT INTO skin_profiles (user_id, skin_type, primary_concern, is_sensitive, routine_size_pref, time_of_day_pref)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `, [user_id, skin_type, primary_concern, is_sensitive, routine_size_pref, time_of_day_pref]);
      profileId = profileResult.rows[0].id;
    }

    // Find matching routines
    // Time of day: if 'both', return morning + evening routines
    const timeFilter = time_of_day_pref === 'both' 
      ? ['morning', 'evening'] 
      : [time_of_day_pref];

    const routinesResult = await pool.query(`
      SELECT r.*
      FROM routines r
      WHERE r.primary_concern = $1
        AND r.for_sensitive = $2
        AND r.time_of_day = ANY($3)
      ORDER BY r.time_of_day ASC
    `, [primary_concern, is_sensitive, timeFilter]);

    // For each routine, get the steps with products
    const routinesWithSteps = await Promise.all(
      routinesResult.rows.map(async (routine) => {
        const stepsResult = await pool.query(`
          SELECT rs.*, 
                 p.name as product_name, p.price, p.size, p.image_url, p.tagline,
                 i.name as ingredient_name, i.source_region as ingredient_origin
          FROM routine_steps rs
          JOIN products p ON rs.product_id = p.id
          LEFT JOIN ingredients i ON p.hero_ingredient_id = i.id
          WHERE rs.routine_id = $1
          ORDER BY rs.step_order
        `, [routine.id]);

        // If user prefers minimal, only return first 2 steps
        const steps = routine_size_pref === 'minimal' 
          ? stepsResult.rows.slice(0, 2) 
          : stepsResult.rows;

        return { ...routine, steps };
      })
    );

    res.json({
      profile_id: profileId,
      routines: routinesWithSteps,
      total_price: routinesWithSteps.reduce((sum, r) => 
        sum + r.steps.reduce((s, step) => s + parseFloat(step.price), 0), 0
      ),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process quiz' });
  }
});

// GET /api/routines — list all routines
app.get('/api/routines', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, 
             json_agg(json_build_object(
               'step_order', rs.step_order,
               'step_type', rs.step_type,
               'product_name', p.name,
               'product_price', p.price
             ) ORDER BY rs.step_order) as steps
      FROM routines r
      LEFT JOIN routine_steps rs ON rs.routine_id = r.id
      LEFT JOIN products p ON rs.product_id = p.id
      GROUP BY r.id
      ORDER BY r.primary_concern, r.time_of_day
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch routines' });
  }
});

// ============================================
// CART
// ============================================

// GET /api/cart/:userId — get user's cart
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT ci.*, p.name, p.price, p.image_url, p.size,
             i.name as ingredient_name
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      LEFT JOIN ingredients i ON p.hero_ingredient_id = i.id
      WHERE ci.user_id = $1
      ORDER BY ci.added_at DESC
    `, [req.params.userId]);

    const items = result.rows;
    const total = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

    res.json({ items, total, item_count: items.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart — add item to cart (or update quantity)
app.post('/api/cart', async (req, res) => {
  try {
    const { user_id, product_id, quantity = 1 } = req.body;

    const result = await pool.query(`
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, product_id)
      DO UPDATE SET quantity = cart_items.quantity + $3, added_at = NOW()
      RETURNING *
    `, [user_id, product_id, quantity]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// POST /api/cart/routine — add all products from a routine to cart
app.post('/api/cart/routine', async (req, res) => {
  try {
    const { user_id, routine_id } = req.body;

    // Get all products in this routine
    const stepsResult = await pool.query(`
      SELECT product_id FROM routine_steps WHERE routine_id = $1
    `, [routine_id]);

    // Add each product to cart
    for (const step of stepsResult.rows) {
      await pool.query(`
        INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES ($1, $2, 1)
        ON CONFLICT (user_id, product_id)
        DO UPDATE SET quantity = cart_items.quantity + 1, added_at = NOW()
      `, [user_id, step.product_id]);
    }

    res.json({ success: true, products_added: stepsResult.rows.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add routine to cart' });
  }
});

// PUT /api/cart/:itemId — update quantity
app.put('/api/cart/:itemId', async (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity <= 0) {
      await pool.query('DELETE FROM cart_items WHERE id = $1', [req.params.itemId]);
      return res.json({ deleted: true });
    }
    const result = await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *',
      [quantity, req.params.itemId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// DELETE /api/cart/:itemId — remove item
app.delete('/api/cart/:itemId', async (req, res) => {
  try {
    await pool.query('DELETE FROM cart_items WHERE id = $1', [req.params.itemId]);
    res.json({ deleted: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

// ============================================
// ORDERS
// ============================================

// POST /api/orders — create order from cart
app.post('/api/orders', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { user_id, shipping_address_id, payment_ref } = req.body;

    // Get cart items
    const cartResult = await client.query(`
      SELECT ci.*, p.price
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = $1
    `, [user_id]);

    if (cartResult.rows.length === 0) {
      throw new Error('Cart is empty');
    }

    const total = cartResult.rows.reduce((sum, item) => 
      sum + (parseFloat(item.price) * item.quantity), 0
    );

    // Create order
    const orderResult = await client.query(`
      INSERT INTO orders (user_id, shipping_address_id, total_amount, payment_status, payment_ref)
      VALUES ($1, $2, $3, 'completed', $4)
      RETURNING *
    `, [user_id, shipping_address_id, total, payment_ref]);

    const orderId = orderResult.rows[0].id;

    // Create order items (freeze prices)
    for (const item of cartResult.rows) {
      await client.query(`
        INSERT INTO order_items (order_id, product_id, quantity, unit_price)
        VALUES ($1, $2, $3, $4)
      `, [orderId, item.product_id, item.quantity, item.price]);

      // Decrease stock
      await client.query(`
        UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2
      `, [item.quantity, item.product_id]);
    }

    // Clear cart
    await client.query('DELETE FROM cart_items WHERE user_id = $1', [user_id]);

    await client.query('COMMIT');

    res.json(orderResult.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to create order' });
  } finally {
    client.release();
  }
});

// GET /api/orders/:userId — order history
app.get('/api/orders/:userId', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT o.*,
             json_agg(json_build_object(
               'product_name', p.name,
               'quantity', oi.quantity,
               'unit_price', oi.unit_price,
               'ingredient', i.name
             )) as items
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.id
      JOIN products p ON oi.product_id = p.id
      LEFT JOIN ingredients i ON p.hero_ingredient_id = i.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [req.params.userId]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// ============================================
// REVIEWS
// ============================================

// POST /api/reviews — submit a review
app.post('/api/reviews', async (req, res) => {
  try {
    const { user_id, product_id, rating, comment } = req.body;

    // Verify user has purchased this product
    const purchaseCheck = await pool.query(`
      SELECT 1 FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE o.user_id = $1 AND oi.product_id = $2 AND o.status != 'cancelled'
      LIMIT 1
    `, [user_id, product_id]);

    if (purchaseCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Only verified purchasers can review' });
    }

    const result = await pool.query(`
      INSERT INTO reviews (user_id, product_id, rating, comment)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id, product_id)
      DO UPDATE SET rating = $3, comment = $4, created_at = NOW()
      RETURNING *
    `, [user_id, product_id, rating, comment]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// ============================================
// SERVER
// ============================================

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Āhā API running on port ${PORT}`);
});

module.exports = app;
