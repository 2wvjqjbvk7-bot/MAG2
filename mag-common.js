window.MAG_CONFIG = {
  WHATSAPP_NUMBER: "34636952595",
  INSTAGRAM_USER: "mag.handmade",
  EMAIL: "mag.handmade@gmail.com"
};

const MAG_PRODUCTS = [
  { id: "1", nombre: "Bolso de lino natural", categoria: "Bolsos", precio: 42, desc: "Lino crudo con ribete en terracota", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600" },
  { id: "2", nombre: "Bolso de tela estampada", categoria: "Bolsos", precio: 38, desc: "Estampado suave, asas reforzadas", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600" },
  { id: "3", nombre: "Neceser acolchado", categoria: "Neceseres", precio: 24, desc: "Guateado a mano con cremallera", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600" },
  { id: "4", nombre: "Mini neceser", categoria: "Neceseres", precio: 16, desc: "El tamaño justo para lo esencial", img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600" },
  { id: "5", nombre: "Funda de gafas botánica", categoria: "Fundas de gafas", precio: 18, desc: "Estampado floral con cierre suave", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600" },
  { id: "6", nombre: "Funda de portátil / iPad", categoria: "Ordenador e iPad", precio: 32, desc: "Protección acolchada en lino", img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600" }
];

let cart = JSON.parse(localStorage.getItem("mag_cart")) || [];
let favorites = JSON.parse(localStorage.getItem("mag_favorites")) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderHeaderAndDrawers();
  renderFooter();
  updateCartUI();
});

function renderHeaderAndDrawers() {
  const headerHTML = `
    <header class="header">
      <div class="wrap header-inner">
        <div class="header-left">
          <button class="menu-btn" id="open-menu">☰</button>
          <a href="index.html" class="brand">
            <span class="brand-title">MAG</span>
            <span class="brand-sub">HECHO A MANO</span>
          </a>
        </div>
        <div class="header-right">
          <input type="text" class="search-box" placeholder="Buscar..." id="search-input" />
          <a href="favoritos.html" class="icon-btn" title="Favoritos">♡</a>
          <button class="icon-btn" id="open-cart" title="Carrito">
            🛍 <span class="cart-badge" id="cart-count">0</span>
          </button>
        </div>
      </div>
    </header>

    <div class="drawer-overlay" id="overlay"></div>

    <!-- Menú Lateral Izquierdo -->
    <div class="drawer drawer-left" id="menu-drawer">
      <div>
        <div class="drawer-header">
          <span class="drawer-title">M A G</span>
          <button class="drawer-close" id="close-menu">✕</button>
        </div>
        <div class="drawer-menu">
          <a href="catalogo.html">Catálogo</a>
          <a href="personalizacion.html">Personalización</a>
          <a href="favoritos.html">Favoritos</a>
          <a href="contacto.html">¿Hablamos?</a>
        </div>
        <div class="drawer-cats">
          <h5>Categorías</h5>
          <a href="catalogo.html?cat=Bolsos">Bolsos</a>
          <a href="catalogo.html?cat=Neceseres">Neceseres</a>
          <a href="catalogo.html?cat=Fundas de gafas">Fundas de gafas</a>
          <a href="catalogo.html?cat=Ordenador e iPad">Ordenador e iPad</a>
        </div>
      </div>
    </div>

    <!-- Carrito Desplegable Derecho -->
    <div class="drawer drawer-right" id="cart-drawer">
      <div style="display:flex; flex-direction:column; height:100%;">
        <div class="drawer-header">
          <span class="drawer-title">Tu Cesta</span>
          <button class="drawer-close" id="close-cart">✕</button>
        </div>
        <div class="cart-items" id="cart-items-list"></div>
        <div class="cart-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span id="cart-total-price">0 €</span>
          </div>
          <div style="display:flex; gap:8px; margin-bottom:8px;">
            <a href="catalogo.html" class="btn-outline" style="text-align:center;">+ Añadir más</a>
            <button class="btn-outline" onclick="clearCart()">Vaciar</button>
          </div>
          <button class="btn-rust" onclick="checkoutWhatsApp()">Pagar por WhatsApp</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  // Eventos de apertura/cierre
  const overlay = document.getElementById("overlay");
  const menuDrawer = document.getElementById("menu-drawer");
  const cartDrawer = document.getElementById("cart-drawer");

  document.getElementById("open-menu").onclick = () => { menuDrawer.classList.add("open"); overlay.classList.add("open"); };
  document.getElementById("close-menu").onclick = closeDrawers;
  
  document.getElementById("open-cart").onclick = () => { cartDrawer.classList.add("open"); overlay.classList.add("open"); };
  document.getElementById("close-cart").onclick = closeDrawers;
  
  overlay.onclick = closeDrawers;

  function closeDrawers() {
    menuDrawer.classList.remove("open");
    cartDrawer.classList.remove("open");
    overlay.classList.remove("open");
  }
}

function addToCart(id) {
  const product = MAG_PRODUCTS.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("overlay").classList.add("open");
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  }
  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

function saveCart() {
  localStorage.setItem("mag_cart", JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const countEl = document.getElementById("cart-count");
  const listEl = document.getElementById("cart-items-list");
  const totalEl = document.getElementById("cart-total-price");

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.precio * item.qty), 0);

  if (countEl) countEl.innerText = totalCount;
  if (totalEl) totalEl.innerText = totalPrice + " €";

  if (listEl) {
    if (cart.length === 0) {
      listEl.innerHTML = `<p style="text-align:center; color:var(--text-muted); margin-top:40px;">Tu cesta está vacía</p>`;
    } else {
      listEl.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.img}" class="cart-item-img">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.nombre}</div>
            <div class="cart-item-price">${item.precio} €</div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
              <span>${item.qty}</span>
              <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
            </div>
          </div>
          <button class="remove-btn" onclick="updateQty('${item.id}', -${item.qty})">✕</button>
        </div>
      `).join("");
    }
  }
}

function toggleFav(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("mag_favorites", JSON.stringify(favorites));
  if (window.renderPageProducts) window.renderPageProducts();
}

function checkoutWhatsApp() {
  if (cart.length === 0) return alert("Añade algún producto antes de realizar el pedido");
  let msg = "Hola! Quisiera realizar el siguiente pedido:\n\n";
  cart.forEach(item => {
    msg += `- ${item.nombre} x${item.qty} (${item.precio * item.qty}€)\n`;
  });
  const total = cart.reduce((sum, item) => sum + (item.precio * item.qty), 0);
  msg += `\nTotal: ${total}€`;
  window.open(`https://wa.me/${window.MAG_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

function renderFooter() {
  const footerHTML = `
    <footer>
      <div class="wrap footer-grid">
        <div>
          <div class="footer-brand">M A G</div>
          <p class="footer-text">Costura artesanal de María José Arcón Gauses. Hecho a mano, pieza a pieza.</p>
        </div>
        <div class="footer-col">
          <h5>TIENDA</h5>
          <a href="catalogo.html">Catálogo</a>
          <a href="personalizacion.html">Personalización</a>
          <a href="favoritos.html">Favoritos</a>
        </div>
        <div class="footer-col">
          <h5>HABLAMOS</h5>
          <p>WhatsApp +${window.MAG_CONFIG.WHATSAPP_NUMBER}</p>
          <p>Instagram @${window.MAG_CONFIG.INSTAGRAM_USER}</p>
          <p>${window.MAG_CONFIG.EMAIL}</p>
        </div>
      </div>
      <div class="footer-bottom">© 2026 MAG · María José Arcón Gauses</div>
    </footer>
  `;
  document.body.insertAdjacentHTML("beforeend", footerHTML);
}
