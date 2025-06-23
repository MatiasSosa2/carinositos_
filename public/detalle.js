document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));

  // Simulación de base de datos de productos
  const products = [
    {
      id: 1,
      name: "Pantalón bebé",
      description: "Pantalón de algodón suave y cómodo para bebés.",
      price: 1990,
      image: "assets/Inferiores.png",
      thumbnails: [
        "assets/Inferiores.png",
        "assets/Superiores.png",
        "assets/conjunto.png",
      ],
      stock: {
        S: 3,
        M: 1,
        L: 0,
        XL: 2,
      },
    },
    {
      id: 2,
      name: "Remera manga corta",
      description: "Remera fresca y liviana para los días cálidos.",
      price: 1290,
      image: "assets/Superiores.png",
      thumbnails: [
        "assets/Superiores.png",
        "assets/Inferiores.png",
        "assets/conjunto.png",
      ],
      stock: {
        S: 0,
        M: 0,
        L: 2,
        XL: 0,
      },
    },
    {
      id: 3,
      name: "Conjunto bebé",
      description: "Conjunto completo para bebés: remera + pantalón.",
      price: 2990,
      image: "assets/conjunto.png",
      thumbnails: [
        "assets/conjunto.png",
        "assets/Superiores.png",
        "assets/Inferiores.png",
      ],
      stock: {
        S: 4,
        M: 2,
        L: 1,
        XL: 0,
      },
    },
    {
      id: 4,
      name: "Enterito de osito",
      description: "Enterito de algodón suave con diseño de osito.",
      price: 2490,
      image: "assets/enterito.png",
      thumbnails: ["assets/enterito.png"],
      stock: {
        S: 3,
        M: 1,
        L: 0,
        XL: 1,
      },
    },
    {
      id: 5,
      name: "Body estampado",
      description: "Body con estampado divertido para bebés activos.",
      price: 1590,
      image: "assets/body.png",
      thumbnails: ["assets/body.png"],
      stock: {
        S: 2,
        M: 0,
        L: 3,
        XL: 1,
      },
    },
  ];

  const product = products.find((p) => p.id === productId);

  if (product) {
    // Rellenar contenido del producto
    document.getElementById("breadcrumb-product-name").textContent = product.name;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productDescription").textContent = product.description;
    document.getElementById("productPrice").textContent = `$${product.price}`;
    document.getElementById("mainImage").src = product.image;

    // Thumbnails
    const thumbnailsContainer = document.querySelector(".thumbnails");
    thumbnailsContainer.innerHTML = "";
    product.thumbnails.forEach((thumb, index) => {
      const img = document.createElement("img");
      img.src = thumb;
      img.className = "thumbnail" + (index === 0 ? " active" : "");
      img.alt = `Miniatura ${index + 1}`;
      img.setAttribute("tabindex", "0");
      img.addEventListener("click", () => {
        document.getElementById("mainImage").src = thumb;
        document.querySelectorAll(".thumbnail").forEach((t) => t.classList.remove("active"));
        img.classList.add("active");
      });
      thumbnailsContainer.appendChild(img);
    });

    // Selector de talles
    const sizeSelect = document.getElementById("sizeSelect");
    const stockStatus = document.getElementById("stockStatus");
    const addToCartBtn = document.getElementById("addToCartBtn");

    sizeSelect.addEventListener("change", () => {
      const selectedSize = sizeSelect.value;
      if (selectedSize && product.stock[selectedSize] > 0) {
        stockStatus.textContent = "En stock";
        stockStatus.classList.remove("out");
        addToCartBtn.disabled = false;
        addToCartBtn.setAttribute("aria-disabled", "false");
      } else {
        stockStatus.textContent = "Sin stock";
        stockStatus.classList.add("out");
        addToCartBtn.disabled = true;
        addToCartBtn.setAttribute("aria-disabled", "true");
      }
    });
  }

  // ============================
  // Swiper para productos relacionados
  // ============================
  const swiper = new Swiper(".related-swiper", {
    slidesPerView: 3,
    spaceBetween: 20,  // Ajuste del espacio entre los productos
    loop: true,       // El loop debe ser desactivado
    centeredSlides: true, // Cambiado para que no se centre el primer slide
    initialSlide: 2,  
    grabCursor: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2.5,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
});
