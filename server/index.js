/**
 * FreshCart — Express Server Entry Point
 *
 * Serves both the REST API and static frontend files.
 * The server uses in-memory data stores for cart and orders,
 * while product data is loaded from a JSON seed file.
 *
 * @module server/index
 * @requires express
 * @requires cors
 * @requires path
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

// Import route handlers
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// Serve static frontend files from the /public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// --- API Routes ---
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);

// --- SPA Fallback ---
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`\n  🛒  FreshCart is running!\n`);
  console.log(`  ➜  Local:   http://localhost:${PORT}`);
  console.log(`  ➜  API:     http://localhost:${PORT}/api/products\n`);
});
