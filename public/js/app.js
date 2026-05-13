/* app.js — Main application init */
const App = {
  async init() {
    await Store.init();
    Cart.init();
    Checkout.init();
    this.initScrollEffects();
    this.initSearch();
    this.initHeroCTA();
  },

  initScrollEffects() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  },

  initSearch() {
    const input = document.getElementById('search-input');
    let timeout;
    input.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => Store.loadProducts(input.value.trim()), 300);
    });
  },

  initHeroCTA() {
    document.getElementById('hero-cta').addEventListener('click', () => {
      document.getElementById('categories-section').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('logo-link').addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  showToast(message, isError = false) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${isError ? '⚠️' : '✅'}</span>${message}`;
    container.appendChild(toast);
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 3000);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
