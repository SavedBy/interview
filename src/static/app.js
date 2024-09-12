window.addEventListener("DOMContentLoaded", setup);

async function setup() {
	// START HERE
	// PRODUCTS CAN BE FETCHED USING: GET /products
}
const baseURL = "http://localhost:3000";
const productsURL = `${baseURL}/products`;

//Fetch and render products 
function fetchAndRenderProducts() {
	fetch(productsURL)
		.then(res => res.json())
		.then(data => {
			products = data;
			products.sort((a, b) => a.price - b.price);
			renderProducts(products); // Initial rendering with all products
			setupSearch();
    })
    .catch(error => {
		console.log('Error fetching products', error);
    });
}

//Filter products based on input
function renderProducts(productsToRender) {
	const container = document.getElementById('productContainer');
	container.innerHTML = ''; // Clear existing content

	//Iterate over each product
	productsToRender.forEach(product => {
		//Create a card and add product info
		const card = document.createElement('div');
		card.classList.add('product-card');
		card.innerHTML = `
			<img src="${product.images[0].src}" alt="image for ${product.title}">
			<h3>${product.title}</h3>
			<p>$${(product.price / 100).toFixed(2)}</p>
		`;
		// Append card to container
		container.appendChild(card);
	});
}

//Search functionality
function setupSearch() {
	function handleInputChange() {
		const inputElement = document.querySelector('.search-products input');
		const searchTerm = inputElement.value;

		//Filter products based on search term AND price
		const filteredAndSortedProducts = products
			.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
			.sort((a, b) => a.price - b.price);

		// Render filtered products
		renderProducts(filteredAndSortedProducts);
	}
	document.querySelector('.search-products input').addEventListener('input', handleInputChange);
}

fetchAndRenderProducts();
