// Example function to handle "Add to Cart"
function addToCart(productId) {
    console.log("Added product to cart:", productId);
}


document.querySelector('.add-to-cart').addEventListener('click', (e) => {
    const productId = e.target.getAttribute('data-id');
    // Functionality to add the product to cart
    const addToCart = () => {
        const productId = target.getAttribute('data-id');
        // Add code here to add the product to the cart
        console.log(`Product with ID ${productId} added to cart`);
    };

    document.querySelector('.add-to-cart').addEventListener('click', addToCart);
});

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.product-imgs img');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    function updateImageDisplay() {
        images.forEach((img, index) => {
            img.style.display = index === currentIndex ? 'block' : 'none';
        });
    }

    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImageDisplay();
    });

    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImageDisplay();
    });

    updateImageDisplay(); // Initial display update
});

// color choice displau
document.addEventListener('DOMContentLoaded', () => {
    const colorSpans = document.querySelectorAll('#colors span');
    const colorChoice = document.querySelector('.colorchoice');

    colorSpans.forEach(span => {
        span.addEventListener('click', function() {
            const color = this.id.split('-')[1]; // Get color from id like 'color-red'
            colorChoice.textContent = color.charAt(0).toUpperCase() + color.slice(1); // Capitalize first letter
            colorChoice.style.display = 'block'; // Show the color choice
        });
    });
});

// increase decrease quantity control buttons 
document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.previousElementSibling;
        input.value = parseInt(input.value) + 1;
        updateCart();
    });
});

document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.nextElementSibling;
        if (input.value > 1) {
            input.value = parseInt(input.value) - 1;
            updateCart();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        window.location.href = 'shop.html';
        return;
    }

    // Fetch product data
    fetch('../products.json')  // Fix the path to products.json
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === parseInt(productId));
            if (!product) {
                window.location.href = 'shop.html';
                return;
            }

            // Update page content
            document.title = `${product.name} - Jewelry Store`;
            
            // Update product image
            const productImage = document.getElementById('product-image');
            if (productImage) {
                productImage.src = product.image;
                productImage.alt = product.name;
            }

            // Update product details
            const productName = document.getElementById('product-name');
            const productPrice = document.getElementById('product-price');
            const productMaterial = document.getElementById('product-material');
            const productStone = document.getElementById('product-stone');
            const productDescription = document.getElementById('product-description');

            if (productName) productName.textContent = product.name;
            if (productPrice) productPrice.textContent = `€${product.price.toFixed(2)}`;
            if (productMaterial) productMaterial.textContent = product.material;
            
            // Update stones display
            if (productStone) {
                const stonesList = product.stones.filter(stone => stone !== 'none');
                productStone.textContent = stonesList.length > 0 ? stonesList.join(', ') : 'None';
            }
            
            if (productDescription) {
                productDescription.textContent = product.description || 'No description available.';
            }

            // Add to cart functionality
            const addToCartBtn = document.getElementById('add-to-cart');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => {
                    // Get existing cart items
                    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
                    
                    // Add new item
                    cartItems.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        stones: product.stones
                    });
                    
                    // Save to localStorage
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    
                    // Show feedback
                    addToCartBtn.textContent = 'Added to Cart';
                    setTimeout(() => {
                        addToCartBtn.textContent = 'Add to Cart';
                    }, 2000);
                });
            }
        })
        .catch(error => {
            console.error('Error loading product:', error);
            window.location.href = 'shop.html';
        });
});

// Image gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.product-imgs img');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    if (!images.length || !prevButton || !nextButton) return;
    
    let currentIndex = 0;

    function updateImageDisplay() {
        images.forEach((img, index) => {
            img.style.display = index === currentIndex ? 'block' : 'none';
        });
    }

    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImageDisplay();
    });

    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImageDisplay();
    });

    updateImageDisplay(); // Initial display update
});

// Color choice functionality
document.addEventListener('DOMContentLoaded', () => {
    const colorSpans = document.querySelectorAll('#colors span');
    const colorChoice = document.querySelector('.colorchoice');

    if (!colorSpans.length || !colorChoice) return;

    colorSpans.forEach(span => {
        span.addEventListener('click', function() {
            const color = this.id.split('-')[1]; // Get color from id like 'color-red'
            colorChoice.textContent = color.charAt(0).toUpperCase() + color.slice(1); // Capitalize first letter
            colorChoice.style.display = 'block'; // Show the color choice
        });
    });
});

// Quantity control functionality
document.addEventListener('DOMContentLoaded', () => {
    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');

    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            if (input && input.type === 'number') {
                input.value = parseInt(input.value) + 1;
                updateCart();
            }
        });
    });

    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.nextElementSibling;
            if (input && input.type === 'number' && parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
                updateCart();
            }
        });
    });
});

// Cart update function
function updateCart() {
    // Implement cart update logic here
    console.log('Cart updated');
}