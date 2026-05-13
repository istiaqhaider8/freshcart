/**
 * Product Routes — /api/products
 *
 * Provides endpoints for browsing the product catalog.
 * Products are loaded from a static JSON seed file at startup.
 * Supports filtering by category and full-text search.
 *
 * @module routes/products
 */

const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// GET /api/products — list all, optionally filter by category
router.get('/', (req, res) => {
  const { category, search } = req.query;
  let result = [...products];

  if (category && category !== 'All') {
    result = result.filter(p => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  res.json(result);
});

// GET /api/products/categories — list unique categories
router.get('/categories', (_req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json(categories);
});

// GET /api/products/:id — single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

module.exports = router;
