const categories = [
  {
    slug: "rodas",
    name: "Rodas",
    tag: "Linha principal",
    description: "Modelos esportivos, classicos e custom para transformar o visual do carrinho.",
    items: ["Esportivas", "Classicas", "Custom"]
  },
  {
    slug: "acessorios",
    name: "Acessorios",
    tag: "Complemento",
    description: "Itens extras para compor projetos e expandir o visual da miniatura.",
    items: ["Displays", "Kits", "Suportes"]
  },
  {
    slug: "gasser",
    name: "Gasser",
    tag: "Estilo",
    description: "Linha placeholder para modelos com pegada drag e visual mais agressivo.",
    items: ["Drag", "Muscle", "Vintage"]
  },
  {
    slug: "miniaturas",
    name: "Miniaturas",
    tag: "Customizacao",
    description: "Modelos completos e projetos visuais para apresentar a marca em contexto.",
    items: ["Street", "JDM", "Diorama"]
  },
  {
    slug: "velozes-e-furiosos",
    name: "Velozes e Furiosos",
    tag: "Licenca",
    description: "Placeholder para selecoes inspiradas em filmes e cultura automotiva popular.",
    items: ["Classicos", "JDM", "Street"]
  },
  {
    slug: "lowrider",
    name: "Lowrider",
    tag: "Estilo",
    description: "Categoria placeholder para linhas de perfil baixo e acabamento mais marcante.",
    items: ["Cromadas", "Malha", "Classicas"]
  },
  {
    slug: "brclassics",
    name: "BrClassics",
    tag: "Linha",
    description: "Categoria placeholder voltada a projetos nacionais e referencias classicas.",
    items: ["Vintage", "Nacionais", "Custom"]
  },
  {
    slug: "edicao-limitada",
    name: "Edicao Limitada",
    tag: "Novidades",
    description: "Espaco reservado para lotes pequenos, pecas especiais e projetos exclusivos.",
    items: ["Limitadas", "Series curtas", "Projetos unicos"]
  }
];

const products = [
  {
    slug: "kit-rodas-esportivas-aro-baixo-164",
    category: "rodas",
    meta: "Destaque | Escala 1:64",
    name: "Kit de rodas esportivas aro baixo",
    description: "Visual mais agressivo para projetos street e custom com foco em presenca.",
    price: "Sob consulta",
    image: "assets/base/wheel-purple.png"
  },
  {
    slug: "kit-roda-estante-prata",
    category: "acessorios",
    meta: "Acessorio | Exposicao",
    name: "Conjunto prata em display",
    description: "Apresentacao limpa para vitrines, estantes e dioramas com perfil mais discreto.",
    price: "Sob consulta",
    image: "assets/base/wheel-rack.png"
  },
  {
    slug: "roda-malha-bronze-ilors",
    category: "lowrider",
    meta: "Lowrider | Malha bronze",
    name: "Roda malha bronze Ilors",
    description: "Modelo com leitura mais fina e acabamento que chama atencao em projetos baixos.",
    price: "Sob consulta",
    image: "assets/base/wheel-mesh-bronze.png"
  },
  {
    slug: "roda-five-spoke-branca",
    category: "brclassics",
    meta: "BrClassics | Five spoke",
    name: "Five spoke branca polida",
    description: "Leitura classica, limpa e forte para projetos mais tradicionais e visual de rua.",
    price: "Sob consulta",
    image: "assets/base/wheel-five-spoke.png"
  },
  {
    slug: "roda-gold-mesh-deep-dish",
    category: "edicao-limitada",
    meta: "Edicao limitada | Gold mesh",
    name: "Gold mesh deep dish",
    description: "Modelo com presenca forte e acabamento dourado para builds mais ousadas.",
    price: "Sob consulta",
    image: "assets/base/wheel-gold-mesh.png"
  },
  {
    slug: "roda-chrome-embalada",
    category: "miniaturas",
    meta: "Miniaturas | Chrome wire",
    name: "Chrome wire pronta para envio",
    description: "Imagem de produto com cara comercial para dar mais vida real a vitrine inicial.",
    price: "Sob consulta",
    image: "assets/base/wheel-packaged-chrome.png"
  }
];

const page = document.body.dataset.page || "";
const homeProductGrid = document.querySelector("#home-product-grid");
const catalogProductGrid = document.querySelector("#product-grid");
const sidebarCategories = document.querySelector("#sidebar-categories");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const menuToggle = document.querySelector(".menu-toggle");
const primaryMenu = document.querySelector(".primary-nav");
const dropdownToggles = Array.from(document.querySelectorAll(".nav-dropdown-toggle"));
const carouselTrack = document.querySelector("#home-carousel-track");
const carouselPrev = document.querySelector("[data-carousel-prev]");
const carouselNext = document.querySelector("[data-carousel-next]");
const carouselDots = Array.from(document.querySelectorAll(".carousel-dot"));
const slides = Array.from(document.querySelectorAll(".carousel-slide"));

function productCard(product) {
  return `
    <article class="product-card">
      <div class="product-visual">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-content">
        <span class="product-meta">${product.meta}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-footer">
          <div class="product-price">
            <span>Preco inicial</span>
            <strong>${product.price}</strong>
          </div>
          <a class="mini-button" href="produto.html?produto=${product.slug}">Ver detalhes</a>
        </div>
      </div>
    </article>
  `;
}

function renderHomeProducts() {
  if (!homeProductGrid) {
    return;
  }

  homeProductGrid.innerHTML = products.map(productCard).join("");
}

function renderSidebarCategories(activeCategory) {
  if (!sidebarCategories) {
    return;
  }

  const links = [
    `<a href="catalogo.html" class="${activeCategory ? "" : "is-active"}">Todos</a>`,
    ...categories.map(
      (category) => `
        <a
          href="catalogo.html?categoria=${category.slug}"
          class="${activeCategory === category.slug ? "is-active" : ""}"
        >
          ${category.name}
        </a>
      `
    )
  ];

  sidebarCategories.innerHTML = links.join("");
}

function syncFilterButtons(activeCategory) {
  filterButtons.forEach((button) => {
    const value = button.dataset.filter || "";
    const isActive = value === activeCategory || (!activeCategory && value === "todos");
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderCatalogProducts() {
  if (!catalogProductGrid) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const activeCategory = params.get("categoria") || "";
  const visibleProducts =
    !activeCategory || activeCategory === "todos"
      ? products
      : products.filter((product) => product.category === activeCategory);

  catalogProductGrid.innerHTML = visibleProducts.map(productCard).join("");
  renderSidebarCategories(activeCategory);
  syncFilterButtons(activeCategory);
}

function attachCatalogFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "todos";
      const nextUrl =
        filter === "todos" ? "catalogo.html" : `catalogo.html?categoria=${encodeURIComponent(filter)}`;

      window.location.href = nextUrl;
    });
  });
}

function toggleMenu() {
  if (!menuToggle || !primaryMenu) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = primaryMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function toggleDropdowns() {
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const wrapper = toggle.closest(".nav-dropdown");
      if (!wrapper) {
        return;
      }

      const isOpen = wrapper.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.addEventListener("click", (event) => {
    dropdownToggles.forEach((toggle) => {
      const wrapper = toggle.closest(".nav-dropdown");
      if (!wrapper || wrapper.contains(event.target)) {
        return;
      }

      wrapper.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setActiveSlide(nextIndex) {
  if (!slides.length || !carouselDots.length) {
    return;
  }

  const slideCount = slides.length;
  const safeIndex = (nextIndex + slideCount) % slideCount;

  slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === safeIndex);
  });

  carouselDots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === safeIndex);
  });

  if (carouselTrack) {
    carouselTrack.dataset.activeSlide = String(safeIndex);
  }
}

function currentSlideIndex() {
  if (!carouselTrack) {
    return 0;
  }

  return Number(carouselTrack.dataset.activeSlide || 0);
}

function setupCarousel() {
  if (!slides.length) {
    return;
  }

  setActiveSlide(0);
  let autoRotate = window.setInterval(() => {
    setActiveSlide(currentSlideIndex() + 1);
  }, 2600);

  if (carouselPrev) {
    carouselPrev.addEventListener("click", () => {
      setActiveSlide(currentSlideIndex() - 1);
    });
  }

  if (carouselNext) {
    carouselNext.addEventListener("click", () => {
      setActiveSlide(currentSlideIndex() + 1);
    });
  }

  carouselDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = Number(dot.dataset.slideTo || 0);
      setActiveSlide(target);
    });
  });

  const carousel = document.querySelector(".carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", () => {
      window.clearInterval(autoRotate);
    });

    carousel.addEventListener("mouseleave", () => {
      window.clearInterval(autoRotate);
      autoRotate = window.setInterval(() => {
        setActiveSlide(currentSlideIndex() + 1);
      }, 2600);
    });
  }
}

function setupThemeToggle() {
  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;

  const stored = localStorage.getItem("theme");
  if (stored) {
    document.documentElement.setAttribute("data-theme", stored);
  }

  function updateLabel() {
    const current = document.documentElement.getAttribute("data-theme");
    const isDark = current === "dark" || (!current && window.matchMedia("(prefers-color-scheme: dark)").matches);
    toggle.textContent = isDark ? "☀️" : "🌙";
    toggle.setAttribute("aria-label", isDark ? "Tema claro" : "Tema escuro");
  }

  updateLabel();

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const isDark = current === "dark" || (!current && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateLabel();
  });
}

renderHomeProducts();
renderCatalogProducts();
attachCatalogFilters();
toggleMenu();
toggleDropdowns();
setupCarousel();
setupThemeToggle();
