/**
 * Cart Routes — /api/cart
 *
 * Manages the shopping cart using an in-memory array.
 * Supports add, update quantity, remove single item, and clear all.
 * Each response returns the full cart state (items, total, count).
 * Exports getCart() and clearCart() for use by the orders module.
 *
 * @module routes/cart
 */

const express = require('express');
const router = express.Router();

// In-memory cart store — resets on server restart
let cart = [];

// GET /api/cart — get current cart
router.get('/', (_req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ items: cart, total: Math.round(total * 100) / 100, count: cart.reduce((s, i) => s + i.quantity, 0) });
});

// POST /api/cart — add item to cart
router.post('/', (req, res) => {
  const { productId, name, price, unit, emoji, quantity = 1 } = req.body;

  if (!productId || !name || price == null) {
    return res.status(400).json({ error: 'productId, name, and price are required' });
  }

  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, name, price, unit, emoji, quantity });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ items: cart, total: Math.round(total * 100) / 100, count: cart.reduce((s, i) => s + i.quantity, 0) });
});

// PUT /api/cart/:productId — update quantity
router.put('/:productId', (req, res) => {
  const { quantity } = req.body;
  const item = cart.find(i => i.productId === req.params.productId);

  if (!item) return res.status(404).json({ error: 'Item not in cart' });

  if (quantity <= 0) {
    cart = cart.filter(i => i.productId !== req.params.productId);
  } else {
    item.quantity = quantity;
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  res.json({ items: cart, total: Math.round(total * 100) / 100, count: cart.reduce((s, i) => s + i.quantity, 0) });
});

// DELETE /api/cart/:productId — remove item
router.delete('/:productId', (req, res) => {
  cart = cart.filter(i => i.productId !== req.params.productId);
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  res.json({ items: cart, total: Math.round(total * 100) / 100, count: cart.reduce((s, i) => s + i.quantity, 0) });
});

// DELETE /api/cart — clear cart
router.delete('/', (_req, res) => {
  cart = [];
  res.json({ items: [], total: 0, count: 0 });
});

// Export cart reference for orders
router.getCart = () => cart;
router.clearCart = () => { cart = []; };

module.exports = router;
