# Ansari.co Clothing Website

## Files

- `index.html` — Home page
- `product.html` — Product detail page
- `styles.css` — All website styling and brand colors
- `script.js` — Banner slider + product data
- `product.js` — Product detail page logic
- `images/logo.png` — Your supplied Ansari.co logo

## Add product images

Put your images inside the `images` folder, then open `script.js`.

Example:

```js
image: "images/black-shirt.jpg",
images: [
  "images/black-shirt.jpg",
  "images/black-shirt-side.jpg",
  "images/black-shirt-back.jpg",
  "images/black-shirt-detail.jpg"
]
```

If you leave an image value as `""`, that image area stays blank.

## Change prices/details

All sample products are inside the `products` array in `script.js`.

Change:

- `name`
- `category`
- `price`
- `description`
- `material`
- `fit`
- `color`
- `sizes`
- `image`
- `images`

## Change banners

The rotating home banner is controlled by the `banners` array in `script.js`.

The banner automatically changes every **5 seconds**.

Add an image like:

```js
image: "images/banner-1.jpg"
```

or leave it as:

```js
image: ""
```

## Important

This is a front-end website. The "Add to Cart" button is currently a demo. A real cart, checkout, database, login, order management and payment gateway would need a backend/e-commerce system.
