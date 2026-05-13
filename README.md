# 🛒 FreshCart

**Premium grocery shopping application** built with Express.js and vanilla JavaScript.

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- **Product Catalog** — Browse 22+ grocery items across 6 categories
- **Real-time Search** — Debounced search across product names
- **Category Filters** — Filter products by category with animated chips
- **Shopping Cart** — Slide-in cart panel with quantity controls
- **Checkout Flow** — Order summary, customer form, loading states
- **Order Confirmation** — Animated success screen with unique order ID
- **Premium UI** — Dark theme, glassmorphism, Inter font, animations

## 🚀 Quick Start

```bash
git clone https://github.com/istiaqhaider8/freshcart.git
cd freshcart
npm install
npm start
```

Open **http://localhost:3000** in your browser.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | List products (?category=, ?search=) |
| GET | /api/products/categories | List categories |
| GET | /api/products/:id | Get single product |
| GET | /api/cart | Get current cart |
| POST | /api/cart | Add item to cart |
| PUT | /api/cart/:productId | Update quantity |
| DELETE | /api/cart/:productId | Remove item |
| DELETE | /api/cart | Clear cart |
| POST | /api/orders | Place an order |
| GET | /api/orders | List all orders |

## License

MIT - Istiaq Haider