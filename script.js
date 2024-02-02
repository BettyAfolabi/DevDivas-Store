const images = [
  "Images/Ring1.jpg",
  "Images/shopping-man.jpg",
  "Images/Women.jpg",
  "Images/Ring2.jpg",
  "Images/BigTV.jpg",
  "Images/Virtual-headset.jpg",
  "Images/suits.jpg",
  "Images/Pearl.jpg",
];

let currentImageIndex = 0;
const showShoppers = document.getElementById("shop-image");

function changeBackground() {
  showShoppers.style.backgroundImage = `url('${images[currentImageIndex]}')`;

  currentImageIndex = (currentImageIndex + 1) % images.length;

  setTimeout(changeBackground, 6000);
}

changeBackground();

document.addEventListener("DOMContentLoaded", () => {
  const loadMoreBtn = document.getElementById("load-more");
  let currPage = 1;

  async function getProducts(page) {
    const res = await fetch(
      `https://fakestoreapi.com/products?limit=8&page=${page}`
    );
    const products = await res.json();
    return products;
  }

  function displayProducts(products) {
    const container = document.getElementById("product-container");
    products.forEach((product) => {
      const productDIv = document.createElement("div");
      productDIv.className = "product-info";
      productDIv.innerHTML = `
            <img src=${product.image} alt=${product.title} id="product-image">
            <h3 id="product-title">${product.title}</h3>
            <p id="product-description">${product.description}</p>
            <p id="product-price">$ ${product.price}</p>
            <p id="product-category">${product.category}</p>
            <p id="product-rating">${product.rating.rate} (${product.rating.count} reviews)</p>
            `;
      container.appendChild(productDIv);
    });
  }

  loadMoreBtn.addEventListener("click", async () => {
    const products = await getProducts(currPage);
    displayProducts(products);
    currPage++;
  });

  loadMoreBtn.click();
});
