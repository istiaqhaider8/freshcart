/* api.js — API client module */
const API = {
  BASE: '/api',

  async getProducts(category, search) {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.set('category', category);
    if (search) params.set('search', search);
    const res = await fetch(`${this.BASE}/products?${params}`);
    return res.json();
  },

  async getCategories() {
    const res = await fetch(`${this.BASE}/products/categories`);
    return res.json();
  },

  async getCart() {
    const res = await fetch(`${this.BASE}/cart`);
    return res.json();
  },

  async addToCart(product) {
    const res = await fetch(`${this.BASE}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        emoji: product.emoji
      })
    });
    return res.json();
  },

  async updateCartItem(productId, quantity) {
    const res = await fetch(`${this.BASE}/cart/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    });
    return res.json();
  },

  async removeFromCart(productId) {
    const res = await fetch(`${this.BASE}/cart/${productId}`, { method: 'DELETE' });
    return res.json();
  },

  async clearCart() {
    const res = await fetch(`${this.BASE}/cart`, { method: 'DELETE' });
    return res.json();
  },

  async placeOrder(customer) {
    const res = await fetch(`${this.BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer })
    });
    if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
    return res.json();
  }
};
