// Datos de productos
const products = [
  { id: 1, name: 'Pantalón bebé', price: 1990, cat: 'Pantalones', img: 'assets/imagen1.png', sizes: ['3M', '6M'], featured: true },
  { id: 2, name: 'Remera manga corta', price: 1290, cat: 'Remera MC', img: 'assets/imagen1.png', sizes: ['3M', '6M', '9M'], featured: false },
  { id: 3, name: 'Remera manga larga', price: 1490, cat: 'Remera ML', img: 'assets/Superiores.png', sizes: ['RN', '3M'], featured: true },
  { id: 4, name: 'Conjunto bebé', price: 2590, cat: 'Conjunto', img: 'assets/Inferiores.png', sizes: ['RN', '3M', '6M', '9M'], featured: true },
  { id: 5, name: 'Conjunto bebé', price: 2590, cat: 'Conjunto', img: 'assets/banner.png', sizes: ['RN', '3M', '6M', '9M'], featured: true }
];

const categoriaURLMap = {
  inferiores: ['Pantalones'],
  superiores: ['Remera MC', 'Remera ML'],
  conjuntos: ['Conjunto']
};

// Función para convertir a moneda
function currency(value) {
  return '$' + value.toLocaleString('es-AR', { minimumFractionDigits: 2 });
}

// --- Renderizado de productos ---
function renderProducts(list, containerId = 'productsContainer') {
  const cont = document.getElementById(containerId);
  if (!cont) return;

  cont.innerHTML = ''; // Limpiar contenedor antes de cargar productos

  list.forEach(p => {
    const div = document.createElement('div');
    div.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4';
    div.innerHTML = `
      <a href="producto.html?id=${p.id}" class="text-decoration-none text-dark">
        <div class="product-card h-100 d-flex flex-column justify-content-between shadow-sm rounded bg-white">
          <img src="${p.img}" class="img-fluid rounded" alt="${p.name}" />
          <div>
            <h6 class="fw-semibold mb-1">${p.name}</h6>
            <p class="mb-1 text-terra fw-bold">${currency(p.price)}</p>
            <p class="mb-1 text-muted small">3 cuotas sin interés</p>
            <p class="text-success small">15% off efectivo / transferencia</p>
          </div>
        </div>
      </a>`;
    cont.appendChild(div);
  });
}

// --- Filtros de búsqueda y categoría ---
function applyFilters() {
  const activeCats = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(cb => cb.value);
  const activeSizes = Array.from(document.querySelectorAll('.filter-size:checked')).map(cb => cb.value);
  const onlyFeatured = document.getElementById('onlyFeatured')?.checked || false;
  const term = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const minPrice = parseFloat(document.getElementById('minPrice')?.value) || 0;
  const maxPrice = parseFloat(document.getElementById('maxPrice')?.value) || Infinity;
  const sortOption = document.getElementById('sortSelect')?.value || 'relevance';

  let filtered = products.filter(p =>
    (activeCats.length === 0 || activeCats.includes(p.cat)) &&
    (activeSizes.length === 0 || activeSizes.some(s => p.sizes.includes(s))) &&
    (!onlyFeatured || p.featured) &&
    p.name.toLowerCase().includes(term) &&
    p.price >= minPrice && p.price <= maxPrice
  );

  // Ordenamiento de productos
  if (sortOption === 'asc') filtered.sort((a, b) => a.price - b.price);
  else if (sortOption === 'desc') filtered.sort((a, b) => b.price - a.price);
  else filtered.sort((a, b) => a.id - b.id);

  renderProducts(filtered);
}

// --- Aplicar categoría desde la URL ---
function applyCategoryFromURL() {
  const catParam = new URLSearchParams(window.location.search).get('cat');
  if (!catParam || !categoriaURLMap[catParam.toLowerCase()]) return;

  const mappedCats = categoriaURLMap[catParam.toLowerCase()];
  document.querySelectorAll('.filter-checkbox').forEach(cb => {
    cb.checked = mappedCats.includes(cb.value);
  });
  applyFilters();
}

// --- Carrito ---
let cart = [];

// Guardar carrito en LocalStorage
function saveCartLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Cargar carrito desde LocalStorage
function loadCartLocalStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

// Actualizar carrito visualmente
function updateCart() {
  const ul = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  const countEl = document.getElementById('cartCount');
  if (!ul || !totalEl || !countEl) return;

  ul.innerHTML = '';
  let total = 0;
  cart.forEach((p, idx) => {
    total += p.price * (p.quantity || 1);
    const qty = p.quantity || 1;
    ul.innerHTML += `
      <li class="list-group-item d-flex align-items-center cart-item">
        <img src="${p.img}" alt="${p.name}" width="50" height="50" style="object-fit:cover;border-radius:8px">
        <span class="ms-3 flex-grow-1">${p.name} x${qty} - ${currency(p.price * qty)}</span>
        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${idx})">&times;</button>
      </li>`;
  });

  totalEl.innerText = currency(total);
  countEl.innerText = cart.length;
}

// Añadir producto al carrito
function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const exists = cart.find(i => i.id === id);
  if (exists) exists.quantity = (exists.quantity || 1) + 1;
  else cart.push({ ...p, quantity: 1 });
  saveCartLocalStorage();
  updateCart();
}

// Eliminar producto del carrito
function removeFromCart(idx) {
  cart.splice(idx, 1);
  saveCartLocalStorage();
  updateCart();
}

// --- Destacados ---
function renderDestacadosMinimal() {
  const destacados = products.filter(p => p.featured).slice(0, 4);
  const cont = document.getElementById('destacadosContainer');
  if (!cont) return;
  cont.innerHTML = '';
  destacados.forEach(p => {
    const card = document.createElement('div');
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <div class="product-info">
        <h6>${p.name}</h6>
        <p class="descuento-texto">15% de descuento en efectivo/transferencia</p> 
        <button class="btn-view-more btn-terracota" data-id="${p.id}">Ver más</button>
      </div>`;
    cont.appendChild(card);
  });
}

function renderDestacadosCarouselMobile() {
  const destacados = products.filter(p => p.featured).slice(0, 4);
  const cont = document.getElementById('destacadosCarouselContainer');
  if (!cont) return;
  cont.innerHTML = '';
  destacados.forEach((p, idx) => {
    const item = document.createElement('div');
    item.className = `carousel-item${idx === 0 ? ' active' : ''}`;
    item.innerHTML = `
      <div class="d-flex flex-column align-items-center justify-content-center p-4">
        <img src="${p.img}" class="d-block w-100" alt="${p.name}" style="object-fit:cover;">
        <h6>${p.name}</h6>
        <button class="btn-view-more btn-terracota" data-id="${p.id}">Ver más</button>
      </div>`;
    cont.appendChild(item);
  });
}

// --- Toast visual ---
function mostrarToast(mensaje) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast position-fixed bottom-0 end-0 m-4 bg-success text-white shadow rounded';
    toast.style.zIndex = 9999;
    toast.innerHTML = `<div class="toast-body">${mensaje}</div>`;
    document.body.appendChild(toast);
  } else {
    toast.querySelector('.toast-body').textContent = mensaje;
  }
  toast.style.display = 'block';
  setTimeout(() => toast.style.display = 'none', 3000);
}

// --- Inits ---
document.addEventListener('DOMContentLoaded', () => {
  loadCartLocalStorage();

  // Cargar productos al inicio
  if (document.getElementById('productsContainer')) {
    applyCategoryFromURL();
    renderProducts(products);
    applyFilters();
  }

  // Renderizar destacados
  if (document.getElementById('destacadosContainer')) {
    renderDestacadosMinimal();
  }
  renderDestacadosCarouselMobile();

  updateCart();
});

// Delegación para botones dinámicos
document.body.addEventListener('click', e => {
  if (e.target.matches('.btn-view-more')) {
    const id = parseInt(e.target.dataset.id);
    if (id) {
      window.location.href = `producto.html?id=${id}`;
    }
  }
});
