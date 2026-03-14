// ============================================
// KEDAI NINDY - Script (Refactored)
// ============================================

const _savedProducts = localStorage.getItem("kedaiNindyProducts");
let products = _savedProducts ? JSON.parse(_savedProducts) : [...DEFAULT_PRODUCTS];
const WHATSAPP_NUMBER = "6281266002147";

// ---- STATE ----
let cart = [];
let activeMainCategory = "jualan";
let activeCategory = "semua";
let searchQuery = "";
let currentModalProduct = null;
let modalSelectedVariant = null;
let modalQty = 1;
let modalAgreed = false;

// ---- DOM ELEMENTS ----
const productsGrid = document.getElementById("productsGrid");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEls = document.querySelectorAll(".cart-count");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const waBtn = document.getElementById("waBtn");
const toastContainer = document.getElementById("toastContainer");
const searchInput = document.getElementById("searchInput");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const subTabs = document.getElementById("subTabs");
const transferSection = document.getElementById("transferSection");

// ---- VARIANT GROUPING (for topup category) ----
const VARIANT_PATTERNS = [
  /\s+\d+\s+(bulan|tahun)$/i,
  /\s+\d+\s+(diamond|dm|uc|genesis|vp|robux|oneiric|gems|cp|v-bucks|minecoins|stars|voucher|polychrome|lunite|tanium|points)$/i,
  /\s+\d+GB$/i,
];

function getProductBaseName(name) {
  let base = name;
  for (const pattern of VARIANT_PATTERNS) base = base.replace(pattern, '');
  return base.trim();
}

function getVariantLabel(name, baseName) {
  return name.substring(baseName.length).trim() || name;
}

function groupProducts(productList) {
  const groups = {};
  const order = [];
  productList.forEach(p => {
    const baseName = getProductBaseName(p.name);
    if (!groups[baseName]) { groups[baseName] = []; order.push(baseName); }
    groups[baseName].push(p);
  });
  return order.map(baseName => {
    const variants = groups[baseName];
    if (variants.length === 1) return { type: 'single', product: variants[0] };
    const rep = variants[0];
    return {
      type: 'group', baseName, representative: rep, variants,
      minPrice: Math.min(...variants.map(v => v.price)),
      badge: variants.find(v => v.badge)?.badge || null
    };
  });
}

// ---- MAIN CATEGORY ----
function setMainCategory(mainCat) {
  activeMainCategory = mainCat;
  document.querySelectorAll(".main-tabs .category-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.category === mainCat);
  });
  if (mainCat === "jualan") {
    subTabs.style.display = "";
    transferSection.style.display = "none";
    productsGrid.style.display = "";
    activeCategory = "semua";
    document.querySelectorAll(".sub-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.category === "semua");
    });
  } else if (mainCat === "transfer") {
    subTabs.style.display = "none";
    transferSection.style.display = "";
    productsGrid.style.display = "none";
    return;
  } else {
    subTabs.style.display = "none";
    transferSection.style.display = "none";
    productsGrid.style.display = "";
  }
  renderProducts();
}

// ---- RENDER PRODUCTS ----
function renderProducts() {
  // Akun Premium uses PREMIUM_PRODUCTS
  if (activeMainCategory === "akun") {
    renderPremiumGrid();
    return;
  }

  let filtered = products;
  if (activeMainCategory === "jualan") {
    filtered = filtered.filter(p => p.mainCat === "jualan");
    if (activeCategory !== "semua") filtered = filtered.filter(p => p.category === activeCategory);
  } else {
    filtered = filtered.filter(p => p.mainCat === activeMainCategory);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  }

  if (filtered.length === 0) { productsGrid.innerHTML = emptyStateHtml(); return; }

  const grouped = groupProducts(filtered);
  productsGrid.innerHTML = grouped.map((item, i) => {
    if (item.type === 'single') return renderSingleCard(item.product, i);
    return renderGroupCard(item, i);
  }).join('');
}

function renderPremiumGrid() {
  let filtered = PREMIUM_PRODUCTS;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  if (filtered.length === 0) { productsGrid.innerHTML = emptyStateHtml(); return; }
  productsGrid.innerHTML = filtered.map((p, i) => renderPremiumCard(p, i)).join('');
}

function emptyStateHtml() {
  return `<div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:#7f8c8d;">
    <div style="font-size:3rem; margin-bottom:16px;">🔍</div>
    <p style="font-weight:600; font-size:1.1rem;">Produk tidak ditemukan</p>
    <span style="font-size:0.9rem;">Coba kata kunci lain atau pilih kategori berbeda</span></div>`;
}

// ---- CARD RENDERERS ----
function renderPremiumCard(product, i) {
  const badgeClass = getBadgeClass(product.badge);
  const minPrice = Math.min(...product.variants.map(v => v.price));
  const vc = product.variants.length;
  return `
    <div class="product-card product-card-grouped" style="animation-delay:${i * 0.05}s" onclick="openPremiumModal('${product.id}')">
      ${product.badge ? `<span class="product-badge ${badgeClass}">${product.badge}</span>` : ''}
      ${vc > 1 ? `<div class="variant-count-badge">${vc} varian</div>` : ''}
      <div class="product-image akun-bg">
        <img src="${product.icon}" alt="" class="product-logo" onerror="this.style.display='none'">
        <span class="product-emoji">${product.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-category-label">Akun Premium</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <div class="product-price">${vc > 1 ? '<span class="price-prefix">mulai </span>' : ''}<span class="currency">Rp</span>${formatPrice(minPrice)}</div>
          <button class="add-to-cart-btn variant-arrow" title="Lihat detail">›</button>
        </div>
      </div>
    </div>`;
}

function renderSingleCard(p, i) {
  const inCart = cart.find(c => c.id === p.id);
  const badgeClass = getBadgeClass(p.badge);
  const pricePrefix = p.mainCat === "service" ? '<span class="price-prefix">mulai </span>' : '';
  return `
    <div class="product-card" style="animation-delay:${i * 0.05}s" id="product-${p.id}">
      ${p.badge ? `<span class="product-badge ${badgeClass}">${p.badge}</span>` : ''}
      <div class="product-image ${getImageBgClass(p.mainCat)}">${p.emoji}</div>
      <div class="product-info">
        <div class="product-category-label">${getCategoryLabel(p.category, p.mainCat)}</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <div class="product-price">${pricePrefix}<span class="currency">Rp</span>${formatPrice(p.price)}</div>
          <button class="add-to-cart-btn ${inCart ? 'added' : ''}" onclick="event.stopPropagation(); addToCart(${p.id})" title="Tambah ke keranjang">
            ${inCart ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>`;
}

function renderGroupCard(group, i) {
  const rep = group.representative;
  const badgeClass = getBadgeClass(group.badge);
  const vc = group.variants.length;
  return `
    <div class="product-card product-card-grouped" style="animation-delay:${i * 0.05}s" onclick="openGroupedModal('${encodeURIComponent(group.baseName)}')">
      ${group.badge ? `<span class="product-badge ${badgeClass}">${group.badge}</span>` : ''}
      <div class="variant-count-badge">${vc} varian</div>
      <div class="product-image ${getImageBgClass(rep.mainCat)}">${rep.emoji}</div>
      <div class="product-info">
        <div class="product-category-label">${getCategoryLabel(rep.category, rep.mainCat)}</div>
        <h3 class="product-name">${group.baseName}</h3>
        <p class="product-desc">${rep.desc}</p>
        <div class="product-footer">
          <div class="product-price"><span class="price-prefix">mulai </span><span class="currency">Rp</span>${formatPrice(group.minPrice)}</div>
          <button class="add-to-cart-btn variant-arrow" title="Lihat varian">›</button>
        </div>
      </div>
    </div>`;
}

// ---- HELPERS ----
function getBadgeClass(badge) {
  const g = ["Best Seller", "Laris", "Favorit", "Populer", "Segar", "Premium", "Terlaris", "Gen Z Fav", "Hot", "Best Deal"];
  return g.includes(badge) ? "best-seller" : "";
}
function getImageBgClass(mc) {
  return { ayam: 'ayam-bg', herbalife: 'herbalife-bg', service: 'service-bg', topup: 'topup-bg', akun: 'akun-bg' }[mc] || '';
}
function getCategoryLabel(cat) {
  return { beras: "Beras", rokok: "Rokok", jajanan: "Jajanan", minuman: "Minuman Dingin", ayam: "Jualan Ayam", herbalife: "Obat Herbalife", service: "Service HP & Elektro", topup: "Top Up Game", akun: "Akun Premium" }[cat] || cat;
}
function formatPrice(n) { return n.toLocaleString("id-ID"); }

// ---- PRODUCT MODAL ----
function openPremiumModal(productId) {
  const product = PREMIUM_PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  showModal({
    id: product.id, name: product.name, emoji: product.emoji, icon: product.icon,
    description: product.description, mainCat: "akun", badge: product.badge,
    variants: product.variants
  });
}

function openGroupedModal(encodedBaseName) {
  const baseName = decodeURIComponent(encodedBaseName);
  const items = products.filter(p => getProductBaseName(p.name) === baseName);
  if (items.length === 0) return;
  const rep = items[0];
  showModal({
    name: baseName, emoji: rep.emoji, description: rep.desc, mainCat: rep.mainCat,
    badge: items.find(i => i.badge)?.badge,
    variants: items.map(item => ({ id: item.id, label: getVariantLabel(item.name, baseName), price: item.price }))
  });
}

function showModal(data) {
  currentModalProduct = data;
  modalSelectedVariant = data.variants[0];
  modalQty = 1;
  modalAgreed = false;

  const hasIcon = data.icon;
  const iconInner = hasIcon
    ? `<img src="${data.icon}" alt="" class="modal-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><span class="modal-emoji-fallback" style="display:none;">${data.emoji}</span>`
    : `<span class="modal-emoji-only">${data.emoji}</span>`;

  const modal = document.getElementById("productModal");
  const content = document.getElementById("productModalContent");
  content.innerHTML = `
    <button class="modal-close-btn" onclick="closeProductModal()">✕</button>
    <div class="modal-body">
      <div class="modal-left">
        <div class="modal-product-icon ${getImageBgClass(data.mainCat)}">${iconInner}</div>
        <div class="modal-product-category">${getCategoryLabel(data.mainCat === 'akun' ? 'akun' : data.mainCat)}</div>
        <h2 class="modal-product-title" id="modalProductTitle">${data.name}</h2>
        <div class="modal-product-price" id="modalProductPrice"><span class="currency">Rp</span>${formatPrice(modalSelectedVariant.price)}</div>
        <p class="modal-product-desc">${data.description}</p>
        <div class="modal-guarantee">
          <span class="guarantee-icon">✅</span>
          <div>
            <strong>Garansi Produk</strong>
            <p>Garansi selama masa aktif. Jika akun mengalami kendala login atau tidak dapat digunakan, silakan hubungi support untuk pengecekan dan penggantian sesuai ketentuan.</p>
          </div>
        </div>
      </div>
      <div class="modal-right">
        <div class="modal-section">
          <div class="modal-section-header">
            <span class="modal-section-icon">${data.emoji}</span>
            <h3>Variasi Produk</h3>
          </div>
          <div class="variant-grid">
            ${data.variants.map((v, idx) => `
              <button class="variant-btn ${idx === 0 ? 'active' : ''}" data-id="${v.id}" onclick="selectVariant(${v.id})">
                <span class="variant-label">${v.label}</span>
                <span class="variant-price">Rp ${formatPrice(v.price)}</span>
              </button>`).join('')}
          </div>
        </div>
        <div class="modal-agreement">
          <label class="agreement-label">
            <input type="checkbox" id="modalAgreeCheck" onchange="toggleAgreement(this.checked)">
            <span class="agreement-checkbox-custom"></span>
            <span>Saya menyetujui syarat dan ketentuan garansi yang berlaku.</span>
          </label>
        </div>
        <div class="modal-qty-section">
          <button class="modal-qty-btn" onclick="changeModalQty(-1)">−</button>
          <span class="modal-qty-value" id="modalQtyValue">1</span>
          <button class="modal-qty-btn" onclick="changeModalQty(1)">+</button>
        </div>
        <div class="modal-actions">
          <button class="modal-cart-btn" id="modalCartBtn" onclick="addVariantToCart()" disabled>🛒 Tambah ke Keranjang</button>
          <button class="modal-buy-btn" id="modalBuyBtn" onclick="buyVariantWhatsApp()" disabled>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Beli via WhatsApp
          </button>
        </div>
      </div>
    </div>`;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  document.getElementById("productModal").classList.remove("active");
  document.body.style.overflow = "";
  currentModalProduct = null;
  modalSelectedVariant = null;
  modalQty = 1;
  modalAgreed = false;
}

function selectVariant(id) {
  if (!currentModalProduct) return;
  const variant = currentModalProduct.variants.find(v => v.id === id);
  if (!variant) return;
  modalSelectedVariant = variant;
  document.querySelectorAll(".variant-btn").forEach(btn => {
    btn.classList.toggle("active", parseInt(btn.dataset.id) === id);
  });
  document.getElementById("modalProductTitle").textContent = `${currentModalProduct.name} (${variant.label})`;
  document.getElementById("modalProductPrice").innerHTML = `<span class="currency">Rp</span>${formatPrice(variant.price)}`;
}

function changeModalQty(delta) {
  modalQty = Math.max(1, modalQty + delta);
  document.getElementById("modalQtyValue").textContent = modalQty;
}

function toggleAgreement(checked) {
  modalAgreed = checked;
  const d = !modalAgreed;
  document.getElementById("modalCartBtn").disabled = d;
  document.getElementById("modalBuyBtn").disabled = d;
}

function addVariantToCart() {
  if (!modalSelectedVariant || !modalAgreed || !currentModalProduct) return;
  const p = currentModalProduct;
  const v = modalSelectedVariant;
  const cartItem = {
    id: v.id,
    productId: p.id,
    name: `${p.name} (${v.label})`,
    variantId: v.id,
    variantLabel: v.label,
    emoji: p.emoji,
    price: v.price,
    qty: modalQty
  };
  const existing = cart.find(c => c.id === cartItem.id);
  if (existing) { existing.qty += modalQty; }
  else { cart.push(cartItem); }
  updateCart();
  renderProducts();
  closeProductModal();
  showToast(`${p.emoji} ${cartItem.name} ditambahkan ke keranjang!`);
}

function buyVariantWhatsApp() {
  if (!modalSelectedVariant || !modalAgreed || !currentModalProduct) return;
  const p = currentModalProduct;
  const v = modalSelectedVariant;
  const total = v.price * modalQty;
  let msg = `🛒 *Pesanan dari Kedai Nindy*\n\n`;
  msg += `1. ${p.emoji} ${p.name} (${v.label})\n`;
  msg += `   ${modalQty} × Rp${formatPrice(v.price)} = *Rp${formatPrice(total)}*\n`;
  msg += `\n──────────────\n💰 *Total: Rp${formatPrice(total)}*\n\nTerima kasih! 🙏`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

// ---- TRANSFER FEE CALCULATOR ----
function calculateTransferFee() {
  const input = document.getElementById("transferAmount");
  let rawValue = input.value.replace(/[^0-9]/g, "");
  let amount = parseInt(rawValue) || 0;
  if (rawValue) input.value = parseInt(rawValue).toLocaleString("id-ID");
  let fee = 0;
  if (amount > 0) {
    if (amount > 5000000) fee = 20000;
    else if (amount > 2000000) fee = 15000;
    else if (amount >= 500000) fee = 10000;
    else fee = 5000;
  }
  document.getElementById("transferNominal").textContent = `Rp${formatPrice(amount)}`;
  document.getElementById("transferFee").textContent = `Rp${formatPrice(fee)}`;
  document.getElementById("transferTotal").textContent = `Rp${formatPrice(amount + fee)}`;
}

// ---- CART FUNCTIONS ----
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(c => c.id === id);
  if (existing) { existing.qty++; } else { cart.push({ ...product, qty: 1 }); }
  updateCart();
  renderProducts();
  showToast(`${product.emoji} ${product.name} ditambahkan!`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCart();
  renderProducts();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  updateCart();
}

function updateCart() {
  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.qty, 0);
  cartCountEls.forEach(el => {
    el.textContent = totalItems;
    el.classList.add("pulse");
    setTimeout(() => el.classList.remove("pulse"), 400);
  });
  cartTotalEl.textContent = `Rp${formatPrice(totalPrice)}`;
  waBtn.disabled = cart.length === 0;
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<div class="cart-empty"><div class="empty-icon">🛒</div><p>Keranjang masih kosong</p><span>Yuk pilih produk favorit Anda!</span></div>`;
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-emoji">${item.emoji}</div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">Rp${formatPrice(item.price)} × ${item.qty} = <strong>Rp${formatPrice(item.price * item.qty)}</strong></div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="cart-item-qty">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})">🗑️</button>
        </div>
      </div>`).join('');
  }
  localStorage.setItem("kedaiNindyCart", JSON.stringify(cart));
}

// ---- CART SIDEBAR ----
function openCart() {
  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// ---- WHATSAPP ORDER ----
function sendWhatsApp() {
  if (cart.length === 0) return;
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  let msg = `🛒 *Pesanan dari Kedai Nindy*\n\n`;
  cart.forEach((item, i) => {
    msg += `${i + 1}. ${item.emoji} ${item.name}\n`;
    msg += `   ${item.qty} × Rp${formatPrice(item.price)} = *Rp${formatPrice(item.price * item.qty)}*\n`;
  });
  msg += `\n──────────────\n💰 *Total: Rp${formatPrice(total)}*\n\nTerima kasih! 🙏`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

// ---- CATEGORY FILTER ----
function setCategory(category) {
  activeCategory = category;
  document.querySelectorAll(".sub-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.category === category);
  });
  renderProducts();
}

// ---- SEARCH ----
function handleSearch(e) { searchQuery = e.target.value; renderProducts(); }

// ---- TOAST ----
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>✅</span> ${message}`;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ---- NAVBAR SCROLL ----
function handleScroll() {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  scrollTopBtn.classList.toggle("visible", window.scrollY > 500);
}
function scrollToTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

// ---- MOBILE MENU ----
function toggleMobileMenu() {
  document.querySelector(".navbar-links").classList.toggle("mobile-open");
}

// ---- INITIALIZE ----
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("kedaiNindyCart");
  if (saved) { try { cart = JSON.parse(saved); } catch (e) { cart = []; } }
  renderProducts();
  updateCart();
  searchInput.addEventListener("input", handleSearch);
  window.addEventListener("scroll", handleScroll);
  document.querySelectorAll(".navbar-links a").forEach(link => {
    link.addEventListener("click", () => document.querySelector(".navbar-links").classList.remove("mobile-open"));
  });
  document.getElementById("productModalOverlay").addEventListener("click", closeProductModal);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeProductModal(); });
});
