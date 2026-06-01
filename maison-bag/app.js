'use strict';

/* ── Catalogue ─────────────────────────────────────────────── */
const catalog = [
  {
    id: 1, name: "Tote Signature", mat: "Cuir Végan · Ivoire naturel",
    category: "tote", price: 189, oldPrice: null, badge: "new",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80&fm=webp",
    desc: "Notre bestseller intemporel. Cuir pleine fleur tannée végétal, doublure suède, poche zippée intérieure. Format A4 compatible."
  },
  {
    id: 2, name: "Pochette Dorée", mat: "Cuir Lisse · Or Pale",
    category: "clutch", price: 129, oldPrice: 169, badge: "promo",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80&fm=webp",
    desc: "Pochette de soirée emblématique. Fermoir magnétique doré, chaîne amovible, intérieur satin crème."
  },
  {
    id: 3, name: "Mini Bag Cognac", mat: "Cuir Grainé · Cognac",
    category: "mini", price: 149, oldPrice: null, badge: "new",
    img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80&fm=webp",
    desc: "Mini format, grand style. Bandoulière réglable, quincaillerie dorée 24k, cuir grainé de caractère."
  },
  {
    id: 4, name: "Sac Baguette", mat: "Cuir Lisse · Noir Profond",
    category: "shoulder", price: 219, oldPrice: 279, badge: "promo",
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80&fm=webp",
    desc: "Revisitez l'icône. Sac baguette structuré, bandoulière en cuir, boucle dorée signature Maison Bag."
  },
  {
    id: 5, name: "Tote Market", mat: "Cuir Souple · Camel",
    category: "tote", price: 169, oldPrice: null, badge: null,
    img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80&fm=webp",
    desc: "Le tote quotidien revisité. Grande capacité, cuir souple naturel, anses tressées, fond renforcé."
  },
  {
    id: 6, name: "Pochette Minimaliste", mat: "Cuir Nappa · Blanc Ivoire",
    category: "clutch", price: 99, oldPrice: 139, badge: "promo",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80&fm=webp",
    desc: "La pochette minimaliste pour toutes les occasions. Cuir nappa doux, fermeture zip dorée, format compact."
  },
  {
    id: 7, name: "Sac Hobo Vintage", mat: "Cuir Vintage · Bordeaux",
    category: "shoulder", price: 239, oldPrice: null, badge: "exclu",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80&fm=webp",
    desc: "Silhouette souple et enveloppante. Cuir vintage bordeaux, anses passantes, compartiment principal spacieux."
  },
  {
    id: 8, name: "Mini Crossbody", mat: "Cuir Lisse · Taupe",
    category: "mini", price: 119, oldPrice: 159, badge: "promo",
    img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80&fm=webp",
    desc: "Le crossbody indispensable. Bandoulière réglable, deux compartiments, fermoir pression dorée."
  },
];

let cart = [];
let toastTimer = null;

/* ── Loader ────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const fill = document.getElementById('loader-fill');
  const loader = document.getElementById('loader');
  fill.style.width = '100%';
  setTimeout(() => loader.classList.add('out'), 1500);
});

/* ── Custom Cursor ─────────────────────────────────────────── */
const cursorEl  = document.getElementById('cursor');
const ringEl    = document.getElementById('cursor-ring');
const mq        = window.matchMedia('(hover: hover) and (pointer: fine)');
const noMotion  = window.matchMedia('(prefers-reduced-motion: reduce)');

if (mq.matches && !noMotion.matches) {
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    cursorEl.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    rx += (e.clientX - 18 - rx) * 0.14;
    ry += (e.clientY - 18 - ry) * 0.14;
    ringEl.style.transform = `translate(${rx}px, ${ry}px)`;
  }, { passive: true });

  (function lerp() {
    requestAnimationFrame(lerp);
  })();

  const interactiveSelector = 'a, button, .product-card, .filter-btn, .bento-card, .testi-card';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactiveSelector)) {
      cursorEl.classList.add('hover');
      ringEl.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactiveSelector)) {
      cursorEl.classList.remove('hover');
      ringEl.classList.remove('hover');
    }
  });
}

/* ── Navbar ────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Mobile Menu ───────────────────────────────────────────── */
function toggleMenu() {
  const links = document.getElementById('nav-links');
  const btn   = document.getElementById('menu-btn');
  const open  = links.style.display === 'flex';
  if (open) {
    links.style.display = '';
    btn.setAttribute('aria-expanded', 'false');
  } else {
    Object.assign(links.style, {
      display: 'flex', flexDirection: 'column',
      position: 'absolute', top: '68px', left: '0', right: '0',
      background: 'rgba(8,8,6,.97)',
      backdropFilter: 'blur(28px)',
      padding: '28px 40px',
      borderBottom: '1px solid rgba(202,138,4,.1)',
      gap: '24px', zIndex: '499',
    });
    btn.setAttribute('aria-expanded', 'true');
  }
}

/* ── Search ────────────────────────────────────────────────── */
function toggleSearch() {
  const bar    = document.getElementById('search-bar');
  const input  = document.getElementById('search-input');
  const isOpen = !bar.hidden;
  bar.hidden = isOpen;
  if (!isOpen) {
    setTimeout(() => input.focus(), 80);
    renderSearchSuggestions('');
  }
}

document.getElementById('search-input').addEventListener('input', e => {
  renderSearchSuggestions(e.target.value.toLowerCase());
});

function renderSearchSuggestions(q) {
  const box = document.getElementById('search-results');
  const results = q
    ? catalog.filter(p => p.name.toLowerCase().includes(q) || p.mat.toLowerCase().includes(q))
    : catalog.slice(0, 4);
  box.innerHTML = results.map(p =>
    `<button class="search-chip" onclick="openModal(${p.id}); toggleSearch()">${p.name}</button>`
  ).join('');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!document.getElementById('search-bar').hidden) toggleSearch();
    if (document.getElementById('cart-panel').classList.contains('open')) toggleCart();
    if (!document.getElementById('quickview-modal').hidden) closeModal();
  }
});

/* ── Render products ───────────────────────────────────────── */
function buildCard(p) {
  const pct = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const badgeMap = { new: 'Nouveau', promo: `−${pct}%`, exclu: 'Exclusivité' };
  const badge = p.badge ? `<span class="product-badge ${p.badge}">${badgeMap[p.badge]}</span>` : '';
  const oldPrice = p.oldPrice ? `<span class="price-old">${p.oldPrice} €</span>` : '';

  return `<article class="product-card" role="listitem" data-id="${p.id}" data-category="${p.category}">
    <div class="product-img-wrap">
      ${badge}
      <img src="${p.img}" alt="${p.name} — ${p.mat}" loading="lazy"
           onerror="this.src='https://placehold.co/300/1c1917/666?text=Maison+Bag'" />
      <button class="product-quick" onclick="openModal(${p.id})" aria-label="Aperçu rapide de ${p.name}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        Aperçu Rapide
      </button>
    </div>
    <div class="product-info">
      <div class="product-name">${p.name}</div>
      <div class="product-mat">${p.mat}</div>
      <div class="product-footer">
        <div class="price-wrap">
          ${oldPrice}
          <span class="price-now">${p.price} €</span>
        </div>
        <button class="add-btn" onclick="addToCart(${p.id})" aria-label="Ajouter ${p.name} au panier">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
    </div>
  </article>`;
}

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.08 });

function renderGrid(containerId, items) {
  const el = document.getElementById(containerId);
  el.innerHTML = items.map(buildCard).join('');
  el.querySelectorAll('.product-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 55}ms`;
    revealObs.observe(card);
  });
}

/* ── Filter ────────────────────────────────────────────────── */
function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const list = cat === 'all' ? catalog
    : cat === 'promo' ? catalog.filter(p => p.badge === 'promo')
    : catalog.filter(p => p.category === cat);
  const grid = document.getElementById('main-grid');
  grid.style.opacity = '0';
  setTimeout(() => {
    renderGrid('main-grid', list);
    requestAnimationFrame(() => { grid.style.transition = 'opacity .3s'; grid.style.opacity = '1'; });
  }, 200);
}

/* ── Cart ──────────────────────────────────────────────────── */
function addToCart(id) {
  const p = catalog.find(x => x.id === id);
  const ex = cart.find(x => x.id === id);
  if (ex) ex.qty++; else cart.push({ ...p, qty: 1 });
  syncCart();
  showToast(`${p.name} ajouté au panier`);
}

function removeCartItem(id) {
  cart = cart.filter(x => x.id !== id);
  syncCart();
}

function syncCart() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const dot   = document.getElementById('cart-dot');
  dot.hidden  = count === 0;

  const body = document.getElementById('cart-body');
  const foot = document.getElementById('cart-foot');

  if (cart.length === 0) {
    body.innerHTML = `<div class="cart-empty-state">
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.8" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      <p>Votre panier est vide</p>
      <a href="#collection" class="btn-primary" onclick="toggleCart()">
        <span>Voir la Collection</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>`;
    foot.hidden = true;
    return;
  }

  foot.hidden = false;
  body.innerHTML = cart.map(c => `
    <div class="cart-item-row" role="listitem">
      <img class="cart-item-img" src="${c.img}" alt="${c.name}"
           onerror="this.src='https://placehold.co/76/1c1917/666?text=MB'" />
      <div class="cart-item-info">
        <div class="cart-item-name">${c.name}</div>
        <div class="cart-item-meta">${c.mat} · ×${c.qty}</div>
        <div class="cart-item-price">${(c.price * c.qty).toFixed(2)} €</div>
      </div>
      <button class="cart-rm" onclick="removeCartItem(${c.id})" aria-label="Retirer ${c.name}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>`).join('');

  document.getElementById('cart-total').textContent =
    cart.reduce((s, c) => s + c.price * c.qty, 0).toFixed(2) + ' €';
}

function toggleCart() {
  const panel   = document.getElementById('cart-panel');
  const overlay = document.getElementById('cart-overlay');
  const open    = panel.classList.toggle('open');
  overlay.style.display = open ? 'block' : 'none';
  document.body.style.overflow = open ? 'hidden' : '';
}

function checkout() {
  showToast('Paiement simulé — site de démonstration');
  toggleCart();
}

/* ── Quick View Modal ──────────────────────────────────────── */
function openModal(id) {
  const p = catalog.find(x => x.id === id);
  if (!p) return;
  const modal   = document.getElementById('quickview-modal');
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <img class="modal-img" src="${p.img}" alt="${p.name}"
         onerror="this.src='https://placehold.co/450x480/1c1917/666?text=Maison+Bag'" />
    <div class="modal-info">
      <span class="modal-tag">Maison Bag — ${p.category}</span>
      <h2 class="modal-name">${p.name}</h2>
      <p class="modal-mat">${p.mat}</p>
      <p class="modal-price">${p.price} €</p>
      <p class="modal-desc">${p.desc}</p>
      <button class="btn-primary" onclick="addToCart(${p.id}); closeModal()">
        <span>Ajouter au Panier</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      </button>
    </div>`;

  modal.hidden   = false;
  overlay.hidden = false;
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
  modal.focus?.();
}

function closeModal() {
  const modal   = document.getElementById('quickview-modal');
  const overlay = document.getElementById('modal-overlay');
  modal.hidden   = true;
  overlay.hidden = true;
  overlay.style.display = 'none';
  document.body.style.overflow = '';
}

/* ── Contact form ──────────────────────────────────────────── */
function handleContact(e) {
  e.preventDefault();
  showToast('Message envoyé — réponse sous 2h');
  e.target.reset();
}

/* ── Toast ─────────────────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  clearTimeout(toastTimer);
  t.textContent = msg;
  t.classList.add('show');
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

/* ── Init ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderGrid('new-grid', catalog.filter(p => p.badge === 'new'));
  renderGrid('main-grid', catalog);
  syncCart();
});
