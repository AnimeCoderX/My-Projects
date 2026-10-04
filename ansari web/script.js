/* =========================================================
   ANSARI.CO — Main JavaScript
   Edit products and banners in this file.
   ========================================================= */

/*
  IMAGE SETUP:
  1. Put your clothing images inside the "images" folder.
  2. Replace an empty image value with, for example:
     image: "images/black-shirt.jpg"

  Leave image: "" if you want the image area to stay empty.
*/

const banners = [
  {
    title: "Your style. Your statement.",
    text: "Discover the latest Ansari.co collection.",
    button: "Shop Collection",
    image: ""
  },
  {
    title: "Designed for every day.",
    text: "Clean silhouettes, premium details and timeless essentials.",
    button: "Explore Now",
    image: ""
  },
  {
    title: "The new collection is here.",
    text: "Build your wardrobe with pieces made to last.",
    button: "View Collection",
    image: ""
  }
];

const products = [
  {
    id: "classic-navy-shirt",
    name: "Classic Navy Shirt",
    category: "Shirts",
    price: "PKR 3,499",
    image: "",
    description: "A clean everyday shirt with a refined silhouette. Add your complete product description here.",
    material: "Premium Cotton",
    fit: "Regular Fit",
    color: "Navy",
    sizes: ["S", "M", "L", "XL"],
    images: ["", "", "", ""]
  },
  {
    id: "essential-white-shirt",
    name: "Essential White Shirt",
    category: "Shirts",
    price: "PKR 3,299",
    image: "",
    description: "A versatile white shirt designed to work with both casual and smart outfits.",
    material: "Cotton",
    fit: "Regular Fit",
    color: "White",
    sizes: ["S", "M", "L", "XL"],
    images: ["", "", "", ""]
  },
  {
    id: "signature-gold-tee",
    name: "Signature Tee",
    category: "T-Shirts",
    price: "PKR 1,999",
    image: "",
    description: "A minimal everyday tee with a comfortable fit. Replace this text with your actual product details.",
    material: "100% Cotton",
    fit: "Relaxed Fit",
    color: "Gold",
    sizes: ["S", "M", "L", "XL"],
    images: ["", "", "", ""]
  },
  {
    id: "everyday-black-polo",
    name: "Everyday Black Polo",
    category: "Polos",
    price: "PKR 2,499",
    image: "",
    description: "A versatile polo built for effortless everyday styling.",
    material: "Cotton Blend",
    fit: "Regular Fit",
    color: "Black",
    sizes: ["S", "M", "L", "XL"],
    images: ["", "", "", ""]
  },
  {
    id: "premium-beige-kurta",
    name: "Premium Beige Kurta",
    category: "Kurtas",
    price: "PKR 3,799",
    image: "",
    description: "A modern traditional piece with a clean cut and comfortable fabric.",
    material: "Premium Cotton",
    fit: "Regular Fit",
    color: "Beige",
    sizes: ["S", "M", "L", "XL"],
    images: ["", "", "", ""]
  },
  {
    id: "everyday-blue-pants",
    name: "Everyday Blue Pants",
    category: "Bottoms",
    price: "PKR 3,199",
    image: "",
    description: "A comfortable pair of trousers designed for easy everyday wear.",
    material: "Cotton Twill",
    fit: "Straight Fit",
    color: "Blue",
    sizes: ["30", "32", "34", "36"],
    images: ["", "", "", ""]
  },
  {
    id: "minimal-overshirt",
    name: "Minimal Overshirt",
    category: "Overshirts",
    price: "PKR 4,299",
    image: "",
    description: "A structured overshirt that adds an easy premium layer to your outfit.",
    material: "Cotton Twill",
    fit: "Relaxed Fit",
    color: "Olive",
    sizes: ["S", "M", "L", "XL"],
    images: ["", "", "", ""]
  },
  {
    id: "signature-jacket",
    name: "Signature Jacket",
    category: "Outerwear",
    price: "PKR 5,499",
    image: "",
    description: "A statement outer layer with a clean Ansari.co aesthetic.",
    material: "Cotton Blend",
    fit: "Regular Fit",
    color: "Navy",
    sizes: ["S", "M", "L", "XL"],
    images: ["", "", "", ""]
  }
];

function createImage(src, alt = "") {
  if (!src) return "";
  return `<img src="${src}" alt="${alt}" loading="lazy">`;
}

function productCard(product) {
  const imageClass = product.image ? "" : "empty";
  return `
    <a class="product-card product-link" href="product.html?id=${encodeURIComponent(product.id)}">
      <div class="product-image ${imageClass}">
        ${createImage(product.image, product.name)}
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="product-price">${product.price}</div>
      </div>
    </a>
  `;
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  grid.innerHTML = products.map(productCard).join("");
}

function renderBanners() {
  const slides = document.getElementById("heroSlides");
  const dots = document.getElementById("heroDots");
  if (!slides || !dots) return;

  slides.innerHTML = banners.map((banner, index) => `
    <article class="hero-slide ${banner.image ? "has-image" : ""} ${index === 0 ? "active" : ""}">
      ${banner.image ? `<img class="hero-slide-image" src="${banner.image}" alt="">` : ""}
      <div class="hero-slide-content">
        <p class="eyebrow">${index === 0 ? "ANSARI.CO" : "NEW COLLECTION"}</p>
        <h1>${banner.title}</h1>
        <p>${banner.text}</p>
        <a class="hero-btn" href="#shop">${banner.button}</a>
      </div>
    </article>
  `).join("");

  dots.innerHTML = banners.map((_, index) =>
    `<button class="hero-dot ${index === 0 ? "active" : ""}" data-slide="${index}" aria-label="Go to slide ${index + 1}"></button>`
  ).join("");

  let current = 0;
  const slideElements = [...document.querySelectorAll(".hero-slide")];
  const dotElements = [...document.querySelectorAll(".hero-dot")];

  function showSlide(index) {
    current = (index + slideElements.length) % slideElements.length;
    slideElements.forEach((slide, i) => slide.classList.toggle("active", i === current));
    dotElements.forEach((dot, i) => dot.classList.toggle("active", i === current));
  }

  document.getElementById("prevSlide")?.addEventListener("click", () => showSlide(current - 1));
  document.getElementById("nextSlide")?.addEventListener("click", () => showSlide(current + 1));
  dotElements.forEach(dot => dot.addEventListener("click", () => showSlide(Number(dot.dataset.slide))));

  // Automatically change banner every 5 seconds.
  setInterval(() => showSlide(current + 1), 5000);
}

function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderBanners();
  setupMenu();

  const newsletter = document.getElementById("newsletterForm");
  newsletter?.addEventListener("submit", event => {
    event.preventDefault();
    alert("Thanks! Newsletter functionality can be connected to your email service later.");
  });
});
