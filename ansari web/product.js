/* =========================================================
   ANSARI.CO — Product detail JavaScript
   Product data is stored in script.js.
   ========================================================= */

function getProductFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return products.find(product => product.id === id) || products[0];
}

function detailImage(src, alt, className = "") {
  if (src) {
    return `<img src="${src}" alt="${alt}" loading="lazy">`;
  }
  return "";
}

function renderProductDetail(product) {
  const container = document.getElementById("productDetail");
  if (!container) return;

  const galleryImages = product.images?.length ? product.images : [product.image, "", "", ""];

  container.innerHTML = `
    <div class="product-gallery">
      <div class="main-product-image">
        ${detailImage(product.image, product.name)}
      </div>
      <div class="gallery-thumbs">
        ${galleryImages.slice(0, 4).map(image => `
          <div class="gallery-thumb">
            ${detailImage(image, product.name)}
          </div>
        `).join("")}
      </div>
    </div>

    <div class="product-summary">
      <span class="product-category">${product.category}</span>
      <h1>${product.name}</h1>
      <div class="detail-price">${product.price}</div>

      <p class="detail-description">${product.description}</p>

      <ul class="detail-list">
        <li><span>Material</span><span>${product.material}</span></li>
        <li><span>Fit</span><span>${product.fit}</span></li>
        <li><span>Color</span><span>${product.color}</span></li>
      </ul>

      <label class="size-label">Select Size</label>
      <div class="size-options">
        ${product.sizes.map((size, index) =>
          `<button class="size-btn ${index === 0 ? "selected" : ""}" type="button">${size}</button>`
        ).join("")}
      </div>

      <button class="add-cart" id="addCart">Add to Cart</button>
    </div>
  `;

  container.querySelectorAll(".size-btn").forEach(button => {
    button.addEventListener("click", () => {
      container.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");
    });
  });

  document.getElementById("addCart")?.addEventListener("click", () => {
    const selectedSize = container.querySelector(".size-btn.selected")?.textContent || "";
    alert(`${product.name} — Size ${selectedSize} selected. Connect this button to your cart/payment system.`);
  });

  document.title = `Ansari.co | ${product.name}`;
}

function renderRelatedProducts(currentProduct) {
  const grid = document.getElementById("relatedProducts");
  if (!grid) return;

  const related = products
    .filter(product => product.id !== currentProduct.id)
    .slice(0, 4);

  grid.innerHTML = related.map(productCard).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const product = getProductFromUrl();
  renderProductDetail(product);
  renderRelatedProducts(product);
});
