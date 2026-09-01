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

document.addEventListener("DOMContentLoaded", () => {
  renderHeaderAndDrawer();
  renderFooter();
});

function renderHeaderAndDrawer() {
  const headerHTML = `
    <header class="header">
      <div class="wrap header-inner">
        <div class="header-left">
          <button class="menu-btn" id="open-drawer">☰</button>
          <a href="index.html" class="brand">
            <span class="brand-title">MAG</span>
            <span class="brand-sub">HECHO A MANO</span>
          </a>
        </div>
        <div class="header-right">
          <input type="text" class="search-box" placeholder="Buscar..." id="search-input" />
          <a href="favoritos.html" class="icon-btn">♡</a>
          <a href="catalogo.html" class="icon-btn">🛍</a>
        </div>
      </div>
    </header>

    <div class="drawer-overlay" id="drawer-overlay"></div>
    <div class="drawer" id="drawer">
      <div>
        <button class="drawer-close" id="close-drawer">✕</button>
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
          <a href="catalogo.html?cat=Playa">Playa</a>
          <a href="catalogo.html?cat=Bebé">Bebé</a>
        </div>
      </div>
      <div style="font-size:11px; color:var(--text-muted);">Información legal</div>
    </div>
  `;
  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("drawer-overlay");
  
  document.getElementById("open-drawer").onclick = () => { drawer.classList.add("open"); overlay.classList.add("open"); };
  document.getElementById("close-drawer").onclick = overlay.onclick = () => { drawer.classList.remove("open"); overlay.classList.remove("open"); };

  document.getElementById("search-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") window.location.href = `catalogo.html?buscar=${encodeURIComponent(e.target.value)}`;
  });
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
          <a href="#">Devoluciones, envíos y aviso legal</a>
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
