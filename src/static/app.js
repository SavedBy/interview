window.addEventListener("DOMContentLoaded", setup);


async function setup() {
	// START HERE
	// PRODUCTS CAN BE FETCHED USING: GET /products
}

const baseURL = "http://localhost:3000"
const productsURL = `${baseURL}/products`;
let products;

fetch(productsURL) 
	.then(res => res.json())
	.then(data => {
		products = data;
		renderProducts();
	})
	.catch(error => {
		console.log('Error fetching products', error);
	});

function renderProducts() {
	const container = document.getElementById('productContainer');
	products.forEach(product => {
		const card = document.createElement('div');
		card.classList.add('product-card');
		card.innerHTML = `
			<img src="${product.images[0].src}" alt="${product.title}">
			<h3>${product.title}</h3>
			<p>$${(product.price / 100).toFixed(2)}</p>
		`;
		container.appendChild(card);
		});
	}
	
		