document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('carrito-container');
  const totalSpan = document.getElementById('carrito-total');
  const emptyMsg = document.getElementById('carrito-empty');
  const footer = document.getElementById('carrito-footer');
  const btnVaciar = document.getElementById('vaciar-carrito');

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  function renderCarrito() {
    contenedor.innerHTML = '';
    if (carrito.length === 0) {
      emptyMsg.classList.remove('d-none');
      footer.classList.add('d-none');
      return;
    }

    emptyMsg.classList.add('d-none');
    footer.classList.remove('d-none');

    carrito.forEach(item => {
      const row = document.createElement('div');
      row.className = 'row align-items-center mb-4 shadow-sm p-3 rounded bg-white';

      row.innerHTML = `
        <div class="col-3 col-md-2">
          <img src="${item.img}" alt="${item.nombre}" class="img-fluid rounded">
        </div>
        <div class="col-5 col-md-4 fw-semibold">${item.nombre}</div>
        <div class="col-4 col-md-3 d-flex align-items-center justify-content-center">
          <button class="btn btn-outline-secondary btn-sm me-2 btn-decrease" data-id="${item.id}">−</button>
          <span>${item.cantidad}</span>
          <button class="btn btn-outline-secondary btn-sm ms-2 btn-increase" data-id="${item.id}">+</button>
        </div>
        <div class="col-12 col-md-2 mt-2 mt-md-0 text-md-end">$${(item.precio * item.cantidad).toFixed(2)}</div>
        <div class="col-12 col-md-1 text-end mt-2 mt-md-0">
          <button class="btn btn-sm btn-danger btn-remove" data-id="${item.id}"><i class="bi bi-trash"></i></button>
        </div>
      `;

      contenedor.appendChild(row);
    });

    actualizarTotal();
  }

  function actualizarTotal() {
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalSpan.textContent = total.toFixed(2);
  }

  function guardarYRecargar() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
  }

  contenedor.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains('btn-decrease')) {
      carrito = carrito.map(p => {
        if (p.id === id && p.cantidad > 1) p.cantidad--;
        return p;
      });
    }

    if (e.target.classList.contains('btn-increase')) {
      carrito = carrito.map(p => {
        if (p.id === id) p.cantidad++;
        return p;
      });
    }

    if (e.target.classList.contains('btn-remove')) {
      carrito = carrito.filter(p => p.id !== id);
    }

    guardarYRecargar();
  });

  btnVaciar.addEventListener('click', () => {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      carrito = [];
      guardarYRecargar();
    }
  });

  renderCarrito();
});
