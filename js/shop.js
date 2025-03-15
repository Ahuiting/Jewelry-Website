document.addEventListener("DOMContentLoaded", function () {
    fetch("../products.json") // Load the JSON file
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById("product-container");
            const categoryLinks = document.querySelectorAll("#shopnav a"); // Get category links

            // Function to render products
            function renderProducts(productsToRender) {
                productContainer.innerHTML = ""; // Clear previous content

                productsToRender.forEach(product => {
                    // Create product div
                    const productDiv = document.createElement("div");
                    productDiv.classList.add("product-item");
                    productDiv.setAttribute("data-category", product.category);
                    productDiv.setAttribute("data-id", product.id);

                    // Add product HTML
                    productDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <div id="${product.id}">
                            <h5>${product.name}</h5>
                            <p>$${product.price.toFixed(2)}</p>
                            <button class="addToCartBtn" data-id="${product.id}">
                                <h7>Add to Cart</h7>
                            </button>
                        </div>
                    `;

                    // Append to container
                    productContainer.appendChild(productDiv);
                });
            }

            // Initially render all products
            renderProducts(products);

            // Function to filter products by category
            function filterByCategory(category) {
                const filteredProducts = products.filter(product => {
                    return product.category.toLowerCase() === category.toLowerCase();
                });
                renderProducts(filteredProducts);
            }

            // Add event listeners for category links
            categoryLinks.forEach(link => {
                link.addEventListener("click", function (e) {
                    e.preventDefault(); // Prevent the default link behavior

                    // Get category based on the clicked link
                    let category = e.target.innerText.toLowerCase();
                    call_filter(category)
                });
            });

            // Attach event listeners to "Add to Cart" buttons
            document.querySelectorAll(".addToCartBtn").forEach(button => {
                button.addEventListener("click", function () {
                    let productId = this.getAttribute("data-id");
                    addToCart(productId); // Assuming you have a function called `addToCart`
                });
            });

            function getQueryParam(param) {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get(param); // Returns the value of the 'filter' parameter or null if not found
            }
            function addParamToUrl(key, value) {
                // Get the current URL
                const url = new URL(window.location);

                // Add or update the query parameter
                url.searchParams.set(key, value);

                // Update the browser's URL without reloading the page
                window.history.pushState({}, '', url);
            }


            function call_filter(filterValue){
            if (filterValue) {
                addParamToUrl("filter",filterValue)
                if (filterValue === "rings") {
                    filterByCategory("A"); // Assuming "A" is for Rings
                } else if (filterValue === "bracelets") {
                    filterByCategory("B"); // Assuming "B" is for Bracelets
                } else if (filterValue === "necklaces") {
                    filterByCategory("C"); // Assuming "C" is for Necklaces
                } else if (filterValue === "earrings") {
                    filterByCategory("D"); // Assuming "D" is for Earrings
                }
            }
            }

// Check if '?filter=' is in the URL and retrieve its value
            call_filter(getQueryParam('filter'));


        })
        .catch(error => console.error("Error loading products:", error));
});
