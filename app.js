'use strict';

/* ── Data ──────────────────────────────────────────────────── */
const products = [
  {
    id: 1, name: "Air Force 1 '07", sub: "Blanc / Blanc Classique", category: "homme",
    price: 54.99, oldPrice: 89.99, badge: "promo",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/chaussure-air-force-1-07-pour-homme-JdLBJr.png"
  },
  {
    id: 2, name: "Air Force 1 Low Retro", sub: "Noir / Gomme Naturelle", category: "homme",
    price: 64.99, oldPrice: null, badge: "new",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0bd3e94e-1f41-4226-97f4-0b38fb4a7ff7/chaussure-air-force-1-07-pour-homme-JdLBJr.png"
  },
  {
    id: 3, name: "Air Force 1 Shadow", sub: "Rose Poudré / Blanc Sommet", category: "femme",
    price: 59.99, oldPrice: 94.99, badge: "promo",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/aa84dc08-cee9-4ec7-8e3d-0d3bb64e9e5c/chaussure-air-force-1-shadow-pour-femme-3pRvFb.png"
  },
  {
    id: 4, name: "Air Force 1 Crater", sub: "Gris Fumé / Blanc", category: "homme",
    price: 49.99, oldPrice: 79.99, badge: "promo",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1b2b5bd0-3adf-4d19-a8b4-9e26d8e74e2c/chaussure-air-force-1-crater-pour-homme-Cfh7sb.png"
  },
  {
    id: 5, name: "Air Force 1 LV8", sub: "Bleu Marine / Blanc Voile", category: "enfant",
    price: 44.99, oldPrice: null, badge: "new",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9bad6a83-ac01-491e-9fcb-7e6d47d2ce4d/chaussure-air-force-1-lv8-pour-enfant-plus-age-VxkZrn.png"
  },
  {
    id: 6, name: "Air Force 1 Essential", sub: "Blanc / Voile / Gomme", category: "femme",
    price: 52.99, oldPrice: 84.99, badge: "promo",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/53689816-ed5a-4f1e-8a3e-bcd00c9bc75f/chaussure-air-force-1-07-essential-pour-femme-T2bXHP.png"
  },
  {
    id: 7, name: "Air Force 1 React", sub: "Gris Fumée / Noir Total", category: "homme",
    price: 69.99, oldPrice: null, badge: "new",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b56c0d92-bfc5-4b72-8f3b-c20c2c0a1d6f/chaussure-air-force-1-react-pour-homme-VvFBqT.png"
  },
  {
    id: 8, name: "Air Force 1 Mini Swoosh", sub: "Rouge Université / Blanc", category: "enfant",
    price: 39.99, oldPrice: 64.99, badge: "promo",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f1edbd8e-0f52-4d0c-9482-7a53d37a61af/chaussure-air-force-1-lv8-pour-enfant-plus-age-VxkZrn.png"
  },
];

let cart = [];

/* ── Loader ────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const progress = document.getElementById('loader-progress');
  progress.style.width = '100%';
  setTimeout(() => loader.classList.add('hidden'), 1400);
});

/* ── Custom Cursor ─────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.transform = `translate(${followerX - 16}px, ${followerY - 16}px)`;
    requestAnimationFrame(animateFollower);
  })();

  document.querySelectorAll('a, button, .product-card, .filter-btn, .social-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(2)';
      follower.style.opacity = '0.5';
      follower.style.width = '48px';
      follower.style.height = '48px';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.opacity = '1';
      follower.style.width = '32px';
      follower.style.height = '32px';
    });
  });
}

/* ── Navbar scroll ─────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
};
window.addEventListener('scroll', onScroll, { passive: true });

/* ── 3D Tilt on product cards ──────────────────────────────── */
function attachTilt(card) {
  if (prefersReducedMotion) return;
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
}

/* ── Render products ───────────────────────────────────────── */
function productCard(p) {
  const pct = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const badgeHtml = p.badge
    ? `<span class="product-badge ${p.badge}">${p.badge === 'new' ? 'Nouveau' : `−${pct}%`}</span>`
    : '';
  const oldPriceHtml = p.oldPrice
    ? `<span class="price-old">${p.oldPrice.toFixed(2)} €</span>` : '';

  return `
    <article class="product-card" role="listitem" data-id="${p.id}" data-category="${p.category}">
      <div class="product-img">
        ${badgeHtml}
        <img
          src="${p.img}"
          alt="${p.name} — ${p.sub}"
          loading="lazy"
          onerror="this.src='https://placehold.co/280x220/1a1917/666?text=AF1'"
        />
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-sub">${p.sub}</div>
        <div class="product-footer">
          <div class="product-price">
            ${oldPriceHtml}
            <span class="price-current">${p.price.toFixed(2)} €</span>
          </div>
          <button
            class="add-to-cart"
            onclick="addToCart(${p.id})"
            aria-label="Ajouter ${p.name} au panier"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    </article>`;
}

function renderProducts(containerId, items) {
  const container = document.getElementById(containerId);
  container.innerHTML = items.map(productCard).join('');
  container.querySelectorAll('.product-card').forEach((card, i) => {
    attachTilt(card);
    setTimeout(() => observeCard(card), i * 60);
  });
}

/* ── Intersection Observer for reveal ─────────────────────── */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

function observeCard(card) {
  revealObserver.observe(card);
}

/* ── Filter ────────────────────────────────────────────────── */
function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filtered = cat === 'all' ? products
    : cat === 'promo' ? products.filter(p => p.badge === 'promo')
    : products.filter(p => p.category === cat);

  const grid = document.getElementById('main-grid');
  grid.style.opacity = '0';
  setTimeout(() => {
    renderProducts('main-grid', filtered);
    grid.style.transition = 'opacity 0.3s';
    grid.style.opacity = '1';
  }, 180);
}

/* ── Cart ──────────────────────────────────────────────────── */
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });
  updateCartUI();
  showToast(`${product.name} ajouté au panier`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const badge = document.getElementById('cart-count');
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';

  const itemsEl = document.getElementById('cart-items');
  const footerEl = document.getElementById('cart-footer');

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty" aria-live="polite">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Votre panier est vide</p>
      </div>`;
    footerEl.hidden = true;
    return;
  }

  footerEl.hidden = false;
  itemsEl.innerHTML = cart.map(c => `
    <div class="cart-item" role="listitem">
      <img
        src="${c.img}"
        alt="${c.name}"
        onerror="this.src='https://placehold.co/72/1a1917/666?text=AF1'"
      />
      <div class="cart-item-info">
        <div class="cart-item-name">${c.name}</div>
        <div class="cart-item-sub">${c.sub}</div>
        <div class="cart-item-price">${(c.price * c.qty).toFixed(2)} € × ${c.qty}</div>
      </div>
      <button class="remove-item" onclick="removeFromCart(${c.id})" aria-label="Retirer ${c.name}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>`).join('');

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById('cart-total').textContent = total.toFixed(2) + ' €';
}

function toggleCart() {
  const panel = document.getElementById('cart-panel');
  const overlay = document.getElementById('cart-overlay');
  const isOpen = panel.classList.toggle('open');
  overlay.style.display = isOpen ? 'block' : 'none';
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

/* ── Mobile menu ───────────────────────────────────────────── */
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  const btn = document.querySelector('.menu-toggle');
  const isOpen = links.style.display === 'flex';
  if (isOpen) {
    links.style.display = '';
    btn.setAttribute('aria-expanded', 'false');
  } else {
    Object.assign(links.style, {
      display: 'flex', flexDirection: 'column',
      position: 'absolute', top: '72px', left: '0', right: '0',
      background: 'rgba(0,0,0,0.95)', padding: '24px 24px',
      borderBottom: '1px solid rgba(202,138,4,0.1)',
      gap: '20px', backdropFilter: 'blur(20px)',
    });
    btn.setAttribute('aria-expanded', 'true');
  }
}

/* ── Toast ─────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ── Forms ─────────────────────────────────────────────────── */
function submitForm(e) {
  e.preventDefault();
  showToast('Message envoyé — réponse sous 2h');
  e.target.reset();
}

function checkout() {
  showToast('Paiement simulé — site de démonstration');
  toggleCart();
}

/* ── Escape key closes cart ────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.getElementById('cart-panel').classList.contains('open')) {
    toggleCart();
  }
});

/* ── Init ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const newArrivals = products.filter(p => p.badge === 'new');
  renderProducts('new-grid', newArrivals);
  renderProducts('main-grid', products);

  // Hide cart badge initially
  document.getElementById('cart-count').style.display = 'none';
});
