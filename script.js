// Products data
const products = [
    {
        id: '1',
        name: 'Techwear Jacket',
        price: 199,
        image: 'assets/placeholder.jpg',
        description: 'Wasserabweisende Jacke mit futuristischem Design, ideal für urbane Abenteuer.',
        category: 'jackets'
    },
    {
        id: '2',
        name: 'Minimalist Watch',
        price: 99,
        image: 'assets/placeholder.jpg',
        description: 'Elegante Uhr mit minimalistischem Design, perfekt für jeden Anlass.',
        category: 'accessories'
    },
    {
        id: '3',
        name: 'Urban Backpack',
        price: 149,
        image: 'assets/placeholder.jpg',
        description: 'Robuster Rucksack mit modularer Funktionalität für den modernen Alltag.',
        category: 'accessories'
    },
];

// Cart state management
let cart = JSON.parse(localStorage.getItem('nove-cart')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('nove-cart', JSON.stringify(cart));
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Scroll reveal animations
function handleScrollAnimations() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top <= windowHeight * 0.8) {
            el.classList.add('visible');
        }
    });
}

// Filter and sort products
function filterAndSortProducts() {
    const category = document.getElementById('category')?.value || 'all';
    const sort = document.getElementById('sort')?.value || 'price-asc';
    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(p => p.category === category);
    }

    filteredProducts.sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        if (sort === 'name') return a.name.localeCompare(b.name);
        return 0;
    });

    grid.innerHTML = '';
    filteredProducts.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-card scroll-reveal';
        div.dataset.product = JSON.stringify(product);
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <div class="product-actions">
                <button class="view-details" data-id="${product.id}" aria-label="Details zu ${product.name} anzeigen"><i data-lucide="eye"></i> Details</button>
                <button class="add-to-cart" aria-label="${product.name} zum Warenkorb hinzufügen"><i data-lucide="shopping-cart"></i> In den Warenkorb</button>
            </div>
        `;
        grid.appendChild(div);
    });
    lucide.createIcons();
    handleScrollAnimations();
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');

    // Hide loader after 1.2 seconds
    setTimeout(() => {
        if (loader) loader.classList.add('hidden');
    }, 1200);

    // Initial scroll animations
    handleScrollAnimations();

    // Scroll event for animations and parallax
    window.addEventListener('scroll', () => {
        handleScrollAnimations();
        if (window.scrollY > 150) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });

    // Page transition
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Add to cart
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card') || e.target.closest('.product-detail');
            if (card) {
                const product = JSON.parse(card.dataset.product || '{}');
                const size = document.getElementById('size')?.value || 'M';
                const color = document.getElementById('color')?.value || 'black';
                const cartItem = { ...product, size, color, quantity: 1 };
                const existing = cart.find(item => item.id === product.id && item.size === size && item.color === color);
                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push(cartItem);
                }
                saveCart();
                alert(`${product.name} (${size}, ${color}) zum Warenkorb hinzugefügt!`);
                if (window.location.pathname.includes('cart.html') || window.location.pathname.includes('checkout.html')) {
                    updateCart();
                }
            }
        });
    });

    // View details
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const product = products.find(p => p.id === id);
            if (product) {
                localStorage.setItem('current-product', JSON.stringify(product));
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = 'product.html';
                }, 500);
            } else {
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = 'notfound.html';
                }, 500);
            }
        });
    });

    // Product page load
    if (window.location.pathname.includes('product.html')) {
        const product = JSON.parse(localStorage.getItem('current-product') || '{}');
        if (product.id) {
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-img').src = product.image;
            document.getElementById('product-img').alt = product.name;
            document.getElementById('product-price').textContent = `$${product.price}`;
            document.getElementById('product-desc').textContent = product.description;
            document.querySelector('.product-detail').dataset.product = JSON.stringify(product);
        } else {
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = 'notfound.html';
            }, 500);
        }
    }

    // Shop filters
    if (window.location.pathname.includes('shop.html')) {
        filterAndSortProducts();
        document.getElementById('category')?.addEventListener('change', filterAndSortProducts);
        document.getElementById('sort')?.addEventListener('change', filterAndSortProducts);
    }

    // Cart and checkout page
    if (window.location.pathname.includes('cart.html') || window.location.pathname.includes('checkout.html')) {
        updateCart();
        document.getElementById('clear-cart')?.addEventListener('click', () => {
            cart = [];
            saveCart();
            updateCart();
        });
    }

    // Checkout form
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Zahlung erfolgreich! Vielen Dank für deinen Einkauf.');
            cart = [];
            saveCart();
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Willkommen im NØVE-Universum! Danke für deine Anmeldung.');
            newsletterForm.reset();
        });
    }

    // Accessibility: Keyboard navigation
    document.querySelectorAll('button, a, select').forEach(el => {
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                el.click();
            }
        });
    });
});

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    if (cartItems && cartTotal) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item scroll-reveal';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="cart-item-details">
                    <span>${item.name} (${item.size}, ${item.color})</span>
                    <span>$${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div class="cart-item-actions">
                    <button onclick="updateQuantity(${index}, ${item.quantity - 1})" aria-label="Menge von ${item.name} reduzieren"><i data-lucide="minus"></i></button>
                    <button onclick="updateQuantity(${index}, ${item.quantity + 1})" aria-label="Menge von ${item.name} erhöhen"><i data-lucide="plus"></i></button>
                    <button onclick="removeFromCart(${index})" aria-label="${item.name} aus Warenkorb entfernen"><i data-lucide="trash-2"></i></button>
                </div>
            `;
            cartItems.appendChild(div);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = total.toFixed(2);
        if (orderItems && orderTotal) {
            orderItems.innerHTML = cart.map(item => `
                <div class="order-item">
                    <span>${item.name} (${item.size}, ${item.color}) x${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
            orderTotal.textContent = total.toFixed(2);
        }
        lucide.createIcons();
        handleScrollAnimations();
    }
}

function updateQuantity(index, quantity) {
    if (quantity < 1) return;
    cart[index].quantity = quantity;
    saveCart();
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}