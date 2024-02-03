// This script handles the toggle button and fetch Category

const toggleButton = document.getElementById("toggleMenuBar");
const menuBar = document.querySelector(".menuBar");
const categoriesContainer = document.getElementById("categories");
const allButton = document.getElementById("allProducts");

// Function to toggle the display of the categories

categoriesContainer.style.center = "200px";
toggleButton.onclick = function () {
  document.getElementsByClassName("displayAll").style.display = "none";
  categoriesContainer.style.display = "block";
  // categoriesContainer.style.right =
  //   categoriesContainer.style.right === "-200px" ? "0" : "-200px";
  // toggleButton.textContent = categoriesContainer.style.display = "block";
  // categoriesContainer.style.right === "-200px" ? "✕" : "☰";
};

function toggleCategoriesDisplay() {
  if (categoriesContainer.style.display === "block") {
    categoriesContainer.style.display = "none";
  } else {
    categoriesContainer.style.display = "block";
  }
}
// Event listener for the toggle button
toggleButton.addEventListener("click", toggleCategoriesDisplay);

document.addEventListener("DOMContentLoaded", () => {
  const categoriesContainer = document.getElementById("categories");

  async function fetchCategory() {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await res.json();
    return categories;
  }

  async function fetchAllProducts() {
    const res = await fetch("https://fakestoreapi.com/products?limit=12");
    const products = await res.json();
    return products;
  }

  async function fetchProductsByCategory(category) {
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    const products = await res.json();
    return products;
  }

  function displayProducts(products) {
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product-info";
      productDiv.innerHTML = `
              <img src=${product.image} alt=${product.title} id="product-image">
              <h3 id="product-title">${product.title}</h3>
              <p id="product-description">${product.description}</p>
              <p id="product-price">$ ${product.price}</p>
              <p id="product-category">${product.category}</p>
              <p id="product-rating">${product.rating.rate} (${product.rating.count} reviews)</p>
            `;
      container.appendChild(productDiv);
    });
  }

  async function handleCategoryClick(category) {
    const products = await fetchProductsByCategory(category);
    displayProducts(products);
  }

  async function handleAllButtonClick() {
    const allProducts = await fetchAllProducts();
    displayProducts(allProducts);
  }

  function displayCategories(categories) {
    categories.forEach((category) => {
      if (category.toLowerCase() !== "all") {
        const catLink = document.createElement("a");
        catLink.className = "category";
        catLink.innerText = category;

        const categoryUrl = `https://fakestoreapi.com/products/${encodeURIComponent(
          category
        )}`;
        catLink.href = categoryUrl;

        catLink.addEventListener("click", (event) => {
          event.preventDefault();
          handleCategoryClick(category);
        });

        categoriesContainer.appendChild(catLink);
      }
    });
  }

  const allButton = document.createElement("button");
  allButton.id = "allProducts";
  allButton.innerText = "All";
  allButton.addEventListener("click", handleAllButtonClick);
  categoriesContainer.appendChild(allButton);

  fetchCategory().then((categories) => {
    categories.unshift("All");
    displayCategories(categories);
  });
});

togglebutton.onclick = function () {
  menuBar.classList.toggle("hidden");
  displayCategories(categories);
};
