// This script handles the toggle button and fetch Category

const toggleButton = document.getElementById("toggleMenuBar");
const menuBar = document.querySelector(".menuBar");
const categoriesContainer = document.getElementById('categories');
 
// Function to toggle the display of the categories

categoriesContainer.style.center = "250px";
toggleButton.onclick = function(){
    categoriesContainer.style.right =(categoriesContainer.style.right === "-250px") ? "0" : "-250px";
    toggleButton.textContent = (categoriesContainer.style.right === "-250px") ? '✕' : '☰';
};


 function toggleCategoriesDisplay() {
    if (categoriesContainer.style.display === 'block') {
       categoriesContainer.style.display = 'none';

  } else {
      categoriesContainer.style.display = 'block';

  }
 }
 
// Event listener for the toggle button
 toggleButton.addEventListener('click', toggleCategoriesDisplay);
 
document.addEventListener('DOMContentLoaded',  () => {
    

    // Fetch categories and display them
    async function fetchCategory() {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const category = await res.json();
        console.log(category)
        return category;
    }
 
    function displayCategories(categories) {
        categories.forEach(category => {
            const catDiv = document.createElement('div');
            catDiv.className = 'category';
            catDiv.innerText = category;
            categoriesContainer.appendChild(catDiv);
        });
        
    }

    
 
    fetchCategory().then(displayCategories);
});
 