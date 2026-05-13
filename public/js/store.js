/* store.js — Product listing & filtering */
const Store = {
  currentCategory: 'All',
  products: [],

  async init() {
    await this.loadCategories();
    await this.loadProducts();
  },

  async loadCategories() {
    const categories = await API.getCategories();
    const container = document.getElementById('category-filters');
    const emojiMap = { All: '🏪', Fruits: '🍎', Vegetables: '🥦', Dairy: '🧀', Bakery: '🍞', Beverages: '☕', Snacks: '🍿' };

    const allChip = this.createChip('All', emojiMap['All'], true);
    container.appendChild(allChip);

    categories.forEach(cat => {
      container.appendChild(this.createChip(cat, emojiMap[cat] || '📦', false));
    });
  },

  createChip(name, emoji, active) {
    const btn = document.createElement('button');
    btn.className = `category-chip${active ? ' active' : ''}`;
    btn.innerHTML = `<span class="category-emoji">${emoji}</span>${name}`;
    btn.addEventListener('click', () => this.selectCategory(name));
    return btn;
  },

  selectCategory(category) {
    this.currentCategory = category;
    document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
    const chips = document.querySelectorAll('.category-chip');
    chips.forEach(c => { if (c.textContent.includes(category)) c.classList.add('active'); });
    this.loadProducts();
  },

  async loadProducts(search) {
    const products = await API.getProducts(this.currentCategory, search);
    this.products = products;
    this.renderProducts(products);
  },

  renderProducts(products) {
    const grid = document.getElementById('products-grid');
    const title = document.getElementById('products-title');
    const count = document.getElementById('product-count');

    title.textContent = this.currentCategory === 'All' ? 'All Products' : this.currentCategory;
    count.textContent = `${products.length} items`;

    if (products.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-muted)">
        <div style="font-size:48px;margin-bottom:12px">🔍</div>
        <p>No products found</p></div>`;
      return;
    }

    grid.innerHTML = products.map(p => `
      <div class="product-card" data-id="${p.id}">
        <div class="product-image">
          <span>${p.emoji}</span>
          <div class="product-rating">${p.rating}</div>
        </div>
        <div class="product-info">
          <div class="product-category">${p.category}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-desc">${p.description}</div>
          <div class="product-footer">
            <div class="product-price">$${p.price.toFixed(2)}<span class="product-unit"> / ${p.unit}</span></div>
            <button class="add-btn" data-product='${JSON.stringify(p).replace(/'/g, "&#39;")}' id="add-btn-${p.id}">
              <span>+</span> Add
            </button>
          </div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const product = JSON.parse(btn.dataset.product);
        await Cart.addItem(product);
        btn.classList.add('added');
        btn.innerHTML = '✓ Added';
        setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = '<span>+</span> Add'; }, 1200);
      });
    });
  }
};
