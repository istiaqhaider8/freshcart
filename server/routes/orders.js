/**
 * Order Routes — /api/orders
 *
 * Handles order placement and retrieval.
 * When an order is placed, the current cart contents are captured,
 * a unique order ID is generated (short UUID), and the cart is cleared.
 * Orders are stored in an in-memory array.
 *
 * @module routes/orders
 */

const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const cartRouter = require('./cart');

// In-memory orders store
const orders = [];

// POST /api/orders — place an order
router.post('/', (req, res) => {
  const { customer } = req.body;
  const cartItems = cartRouter.getCart();

  if (!cartItems.length) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  if (!customer || !customer.name || !customer.email || !customer.address) {
    return res.status(400).json({ error: 'Customer name, email, and address are required' });
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = {
    id: uuidv4().split('-')[0].toUpperCase(),
    items: [...cartItems],
    total: Math.round(total * 100) / 100,
    customer,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  cartRouter.clearCart();

  res.status(201).json(order);
});

// GET /api/orders — list all orders
router.get('/', (_req, res) => {
  res.json(orders);
});

// GET /api/orders/:id — single order
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

module.exports = router;
