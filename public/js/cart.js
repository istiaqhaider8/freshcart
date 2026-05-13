/* cart.js */
const Cart = {
  isOpen: false,
  init() {
    document.getElementById('cart-btn').addEventListener('click', () => this.toggle());
    document.getElementById('cart-close').addEventListener('click', () => this.close());
    document.getElementById('cart-overlay').addEventListener('click', () => this.close());
    document.getElementById('checkout-btn').addEventListener('click', () => Checkout.open());
    this.refresh();
  },
  toggle() { this.isOpen ? this.close() : this.open(); },
  open() { this.isOpen = true; document.getElementById('cart-panel').classList.add('open'); document.getElementById('cart-overlay').classList.add('open'); document.body.style.overflow = 'hidden'; this.refresh(); },
  close() { this.isOpen = false; document.getElementById('cart-panel').classList.remove('open'); document.getElementById('cart-overlay').classList.remove('open'); document.body.style.overflow = ''; },
  async addItem(product) { const data = await API.addToCart(product); this.updateBadge(data.count); if (this.isOpen) this.render(data); App.showToast(product.emoji + ' ' + product.name + ' added to cart'); },
  async refresh() { const data = await API.getCart(); this.updateBadge(data.count); this.render(data); },
  updateBadge(count) { const badge = document.getElementById('cart-badge'); badge.textContent = count; badge.classList.remove('bounce'); void badge.offsetWidth; badge.classList.add('bounce'); },
  render(data) {
    const body = document.getElementById('cart-body'), total = document.getElementById('cart-total'), checkoutBtn = document.getElementById('checkout-btn');
    total.textContent = '$' + data.total.toFixed(2); checkoutBtn.disabled = data.items.length === 0;
    if (!data.items.length) { body.innerHTML = '<div class="cart-empty"><span class="cart-empty-icon">\ud83d\uded2</span><p class="cart-empty-text">Your cart is empty</p></div>'; return; }
    body.innerHTML = data.items.map(i => '<div class="cart-item"><div class="cart-item-emoji">'+(i.emoji||'')+'</div><div class="cart-item-details"><div class="cart-item-name">'+i.name+'</div><div class="cart-item-price">$'+i.price.toFixed(2)+' / '+(i.unit||'each')+'</div></div><div class="cart-item-controls"><button class="qty-btn" data-action="decrease" data-id="'+i.productId+'" data-qty="'+i.quantity+'">-</button><span class="qty-value">'+i.quantity+'</span><button class="qty-btn" data-action="increase" data-id="'+i.productId+'" data-qty="'+i.quantity+'">+</button><button class="remove-btn" data-id="'+i.productId+'">x</button></div></div>').join('');
    body.querySelectorAll('.qty-btn').forEach(b => b.addEventListener('click', async () => { const r = parseInt(b.dataset.qty), n = b.dataset.action==='increase'?r+1:r-1; const d = n<=0 ? await API.removeFromCart(b.dataset.id) : await API.updateCartItem(b.dataset.id,n); this.updateBadge(d.count); this.render(d); }));
    body.querySelectorAll('.remove-btn').forEach(b => b.addEventListener('click', async () => { const d = await API.removeFromCart(b.dataset.id); this.updateBadge(d.count); this.render(d); }));
  }
};
