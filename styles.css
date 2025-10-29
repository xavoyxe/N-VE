// === 12 PRODUKTE ===
const products = [
    { id: 1, name: "Nova Runner", price: 189, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop", desc: "Ultralight. Breathable. Future-ready." },
    { id: 2, name: "Void Shell", price: 299, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop", desc: "Waterproof. Modular. Invisible seams." },
    { id: 3, name: "Chronos Edge", price: 449, img: "https://images.unsplash.com/photo-1576566587633-3e2d39b2e0b8?w=800&h=800&fit=crop", desc: "AMOLED. Biometric. 30-day battery." },
    { id: 4, name: "Neon Cap", price: 59, img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop", desc: "Reflective. Adjustable. Glow-in-dark." },
    { id: 5, name: "Eclipse Hood", price: 179, img: "https://images.unsplash.com/photo-1543508282-63138d2f6ac0?w=800&h=800&fit=crop", desc: "Thermal. Silent. Blackout." },
    { id: 6, name: "Zero Bag", price: 129, img: "https://images.unsplash.com/photo-1553065340-9a0d4d6e5e6e?w=800&h=800&fit=crop", desc: "Minimal. 15L. Waterproof." },
    { id: 7, name: "Phantom Belt", price: 89, img: "https://images.unsplash.com/photo-1584911846140-2b1c8a1c9c3d?w=800&h=800&fit=crop", desc: "Magnetic. Invisible. Strong." },
    { id: 8, name: "Nexus Ring", price: 399, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop", desc: "Titanium. NFC. Health." },
    { id: 9, name: "Shadow Sock", price: 39, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop", desc: "Anti-slip. Breathable. Black." },
    { id: 10, name: "Vanta Tee", price: 69, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop", desc: "Cotton. Oversized. Vanta Black." },
    { id: 11, name: "Pulse Band", price: 199, img: "https://images.unsplash.com/photo-1575311346698-2b8d92e6d3b5?w=800&h=800&fit=crop", desc: "Fitness. Heart. Sleep." },
    { id: 12, name: "Null Key", price: 149, img: "https://images.unsplash.com/photo-1593642532973-05e8e9d0e3a8?w=800&h=800&fit=crop", desc: "Titanium. RFID. Unbreakable." },
];

let cart = JSON.parse(localStorage.getItem('nove-cart') || '[]');
let currentProduct = null;

// === ELEMENTE ===
const els = {
    loader: document.getElementById('loader'),
    cartCount: document.getElementById('cart-count'),
    productGrid: document.getElementById('product-grid'),
    cartItems: document.getElementById('cart-items'),
    cartTotal: document.getElementById('cart-total'),
    productImg: document.getElementById('product-img'),
    productName: document.getElementById('product-name'),
    productPrice: document.getElementById('product-price'),
    productDesc: document.getElementById('product-desc'),
    pageTitle: document.getElementById('page-title'),
    addToCartBtn: document.getElementById('add-to-cart-btn'),
};

// === BEIM LADEN ===
window.addEventListener('load', () => {
    setTimeout(() => els.loader?.classList.add('hidden'), 1000);
    updateCartCount();
    lucide.createIcons();

    const page = location.pathname.split('/').pop();
    if (page === 'shop.html') renderShop();
    if (page === 'product.html') loadProduct();
    if (page === 'cart.html') renderCart();
});

// === SHOP RENDERN ===
function renderShop() {
    if (!els.productGrid) return;
    els.productGrid.innerHTML = products.map(p => `
    <div class="card" onclick="goToProduct(${p.id})">
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
      <div class="card-info">
        <h3>${p.name}</h3>
        <p class="price">€${p.price}</p>
      </div>
    </div>
  `).join('');
}

// === ZUM PRODUKT ===
function goToProduct(id) {
    location.href = `product.html?id=${id}`;
}

// === PRODUKT LADEN ===
function loadProduct() {
    const params = new URLSearchParams(location.search);
    const id = parseInt(params.get('id'));
    const p = products.find(x => x.id === id);
    if (!p) return location.href = '404.html';
    currentProduct = p;

    els.productImg.src = p.img;
    els.productName.textContent = p.name;
    els.productPrice.textContent = `€${p.price}`;
    els.productDesc.textContent = p.desc;
    els.pageTitle.textContent = `${p.name} – NØVE`;

    if (els.addToCartBtn) {
        els.addToCartBtn.onclick = () => addToCart(p);
    }
    lucide.createIcons();
}

// === WARENKORB ===
function addToCart(p) {
    const item = cart.find(i => i.id === p.id);
    item ? item.qty++ : cart.push({ ...p, qty: 1 });
    localStorage.setItem('nove-cart', JSON.stringify(cart));
    updateCartCount();
    alert('Zum Warenkorb hinzugefügt');
}

function updateCartCount() {
    const total = cart.reduce((s, i) => s + i.qty, 0);
    if (els.cartCount) els.cartCount.textContent = total;
}

function renderCart() {
    if (!cart.length) {
        els.cartItems.innerHTML = '<p style="text-align:center; padding:2rem; opacity:0.5;">Warenkorb leer.</p>';
        els.cartTotal.textContent = '€0';
        return;
    }
    els.cartItems.innerHTML = cart.map(i => `
    <div class="cart-item">
      <img src="${i.img}" alt="${i.name}" />
      <div>
        <h4>${i.name}</h4>
        <p>€${i.price} × ${i.qty}</p>
      </div>
      <button onclick="removeFromCart(${i.id})">×</button>
    </div>
  `).join('');
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    els.cartTotal.textContent = `€${total}`;
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem('nove-cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}
