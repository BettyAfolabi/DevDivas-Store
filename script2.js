const togglebutton = document.getElementById("toggleMenuBar")
const menuBar = document.querySelector(".menuBar")



document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('categories')

    
    async function fetchCategory(){
        const res = await fetch('https://fakestoreapi.com/products/categories')
        const category = await res.json()
        return category
    }

    function displayCategories(categories){
        categories.forEach(category => {
            const catDiv = document.createElement('div')
            catDiv.className = 'category'
            catDiv.innerText = category
            categoriesContainer.appendChild(catDiv)
        })
    }

    fetchCategory().then(displayCategories)
})

// togglebutton.addEventListener("click", function(){
//     menuBar.classList.toggle("block")
// })
togglebutton.onclick = function(){
    menuBar.classList.toggle("hidden")
    displayCategories(categories)
}
