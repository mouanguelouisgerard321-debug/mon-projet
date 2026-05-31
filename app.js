const products = [
  {
    id: 1, name: "Air Force 1 '07", sub: "Blanc / Blanc", category: "homme",
    price: 54.99, oldPrice: 89.99, badge: "promo",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/chaussure-air-force-1-07-pour-homme-JdLBJr.png"
  },
  {
    id: 2, name: "Air Force 1 Low Retro", sub: "Noir / Gum", category: "homme",
    price: 64.99, oldPrice: null, badge: "new",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0bd3e94e-1f41-4226-97f4-0b38fb4a7ff7/chaussure-air-force-1-07-pour-homme-JdLBJr.png"
  },
  {
    id: 3, name: "Air Force 1 Shadow", sub: "Rose Pastel / Blanc", category: "femme",
    price: 59.99, oldPrice: 94.99, badge: "promo",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/aa84dc08-cee9-4ec7-8e3d-0d3bb64e9e5c/chaussure-air-force-1-shadow-pour-femme-3pRvFb.png"
  },
  {
    id: 4, name: "Air Force 1 Crater", sub: "Gris / Blanc", category: "homme",
    price: 49.99, oldPrice: 79.99, badge: "promo",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1b2b5bd0-3adf-4d19-a8b4-9e26d8e74e2c/chaussure-air-force-1-crater-pour-homme-Cfh7sb.png"
  },
  {
    id: 5, name: "Air Force 1 LV8", sub: "Bleu Marine / Blanc", category: "enfant",
    price: 44.99, oldPrice: null, badge: "new",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9bad6a83-ac01-491e-9fcb-7e6d47d2ce4d/chaussure-air-force-1-lv8-pour-enfant-plus-age-VxkZrn.png"
  },
  {
    id: 6, name: "Air Force 1 '07 Essential", sub: "Blanc / Voile", category: "femme",
    price: 52.99, oldPrice: 84.99, badge: "promo",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/53689816-ed5a-4f1e-8a3e-bcd00c9bc75f/chaussure-air-force-1-07-essential-pour-femme-T2bXHP.png"
  },
  {
    id: 7, name: "Air Force 1 React", sub: "Gris Fumé / Noir", category: "homme",
    price: 69.99, oldPrice: null, badge: "new",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b56c0d92-bfc5-4b72-8f3b-c20c2c0a1d6f/chaussure-air-force-1-react-pour-homme-VvFBqT.png"
  },
  {
    id: 8, name: "Air Force 1 Mini Swoosh", sub: "Rouge / Blanc", category: "enfant",
    price: 39.99, oldPrice: 64.99, badge: "promo",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f1edbd8e-0f52-4d0c-9482-7a53d37a61af/chaussure-air-force-1-lv8-pour-enfant-plus-age-VxkZrn.png"
  },
];

let cart = [];
let currentFilter = 'all';

function renderProducts(containerId, items) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  items.forEach(p => {
    container.insertAdjacentHTML('beforeend', productCard(p));
  });
}

function productCard(p) {
  const badgeHtml = p.badge
    ? `<span class="product-badge ${p.badge}">${p.badge === 'new' ? 'Nouveau' : '-' + Math.round((1 - p.price / p.oldPrice) * 100) + '%'}</span>`
    : '';
  const oldPriceHtml = p.oldPrice
    ? `<span class="price-old">${p.oldPrice.toFixed(2)}€</span>` : '';
  return `
    <div class="product-card" data-category="${p.category}" data-id="${p.id}">
      <div class="product-img">
        ${badgeHtml}
        <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/200x160/1a1a1a/888?text=AF1'" loading="lazy"/>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-sub">${p.sub}</div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-current">${p.price.toFixed(2)}€</span>
            ${oldPriceHtml}
          </div>
          <button class="add-to-cart" onclick="addToCart(${p.id})" title="Ajouter au panier">+</button>
        </div>
      </div>
    </div>`;
}

function filterProducts(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filtered = cat === 'all'
    ? products
    : cat === 'promo'
    ? products.filter(p => p.badge === 'promo')
    : products.filter(p => p.category === cat);
  renderProducts('main-grid', filtered);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  showToast(`✓ ${product.name} ajouté au panier !`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cart-count').textContent = count;

  const itemsEl = document.getElementById('cart-items');
  const footerEl = document.getElementById('cart-footer');

  if (cart.length === 0) {
    itemsEl.innerHTML = '<div class="cart-empty">Votre panier est vide</div>';
    footerEl.style.display = 'none';
    return;
  }

  footerEl.style.display = 'block';
  itemsEl.innerHTML = cart.map(c => `
    <div class="cart-item">
      <img src="${c.img}" alt="${c.name}" onerror="this.src='https://via.placeholder.com/60/1a1a1a/888?text=AF1'"/>
      <div class="cart-item-info">
        <strong>${c.name}</strong>
        <span>${(c.price * c.qty).toFixed(2)}€</span>
        <small style="color:#666"> × ${c.qty}</small>
      </div>
      <button class="remove-item" onclick="removeFromCart(${c.id})">✕</button>
    </div>
  `).join('');

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById('cart-total').textContent = total.toFixed(2) + '€';
}

function toggleCart() {
  const panel = document.getElementById('cart-panel');
  const overlay = document.getElementById('cart-overlay');
  const isOpen = panel.classList.contains('open');
  panel.classList.toggle('open');
  overlay.style.display = isOpen ? 'none' : 'block';
}

function toggleMenu() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  if (links.style.display === 'flex') {
    links.style.display = '';
  } else {
    links.style.cssText = 'display:flex;flex-direction:column;position:absolute;top:64px;left:0;right:0;background:#111;padding:20px 24px;gap:16px;border-bottom:1px solid rgba(255,255,255,0.08)';
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

function submitForm(e) {
  e.preventDefault();
  showToast('✉️ Message envoyé ! On vous répond sous 2h.');
  e.target.reset();
}

function checkout() {
  showToast('🎉 Commande simulée — Site de démo !');
  toggleCart();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  const newArrivals = products.filter(p => p.badge === 'new');
  renderProducts('new-grid', newArrivals);
  renderProducts('main-grid', products);
});
