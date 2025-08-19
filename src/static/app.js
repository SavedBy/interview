window.addEventListener("DOMContentLoaded", setup);

async function setup() {


	// START HERE
	// PRODUCTS CAN BE FETCHED USING: GET /products
	const searchInput = document.getElementById('searchInput'); // references the <input id="searchInput"> element in the HTML
	const productList = document.getElementById('productList'); // references the <div id="productList"> element in the HTML

	try {
		// Fetch products from the API (http://localhost:3000/products)
		const response = await fetch('http://localhost:3000/products');
		const products = await response.json();
		console.log('Fetched products:', products);
		// console.log(products); // Uncomment to see the fetched products in the console

		// Sort products by price from low to high
		products.sort((a, b) => a.price - b.price);
		// console.log(products); // Uncomment to see the sorted products in the console

		function displayProducts(products) {
			// Clear the product list before adding new products
			productList.innerHTML = '';
			// Loop through each product and create a div for each one
			console.log('Rendering products:', products);
			products.forEach(product => {
				const individualProduct = document.createElement('div');
				individualProduct.className = 'product';
				// string literal to create the HTML for each product
				individualProduct.innerHTML = `
					<img src="${product.images[0].src}" alt= "${product.title}">
					<h3>${product.title}</h3>
					<p>Price: $${product.price.toFixed(2)}</p>
					`;
				// Adds indiviual product to the productList div
				productList.appendChild(individualProduct);
			});
		}
		// Display all products 
		displayProducts(products);

		// Add event listener for search input
		searchInput.addEventListener('input', (event) => {
			const searchProduct = event.target.value.toLowerCase();
			const filteredProducts = products.filter(product =>
				product.title.toLowerCase().includes(searchProduct)

			);

			// Display Filtered Products
			displayProducts(filteredProducts);
		});


	} catch (err) {
		console.error("Error fetching products:", err);
		productList.innerHTML = '<p>Error loading products. Please try again later.</p>';
	};

};
