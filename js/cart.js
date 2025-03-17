// cart.js
const cartItemsContainer = document.querySelector('.cart-items.filled-state');
const emptyCartContainer = document.querySelector('.cart-items.empty-state');
const cartSummary = document.querySelector('.cart-summary');
const cartTotalElement = document.getElementById('cartTotal');
const ptop = document.getElementById('ptop');

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cartItemsContainer.innerHTML = savedCart;
        // Check if there are any cart items after loading
        const cartItems = cartItemsContainer.querySelectorAll('.cart-item');
        if (cartItems.length === 0) {
            showEmptyCart();
        } else {
            showFilledCart();
            updateCartTotal();
            attachQuantityListeners();
        }
    } else {
        showEmptyCart();
    }
}

// Show empty cart message
function showEmptyCart() {
    emptyCartContainer.style.display = 'block';
    cartItemsContainer.style.display = 'none';
    cartSummary.style.display = 'none';
}

// Show filled cart state
function showFilledCart() {
    emptyCartContainer.style.display = 'none';
    cartItemsContainer.style.display = 'block';
    cartSummary.style.display = 'block';
}

// Check if cart is empty
function checkEmptyCart() {
    const cartItems = cartItemsContainer.querySelectorAll('.cart-item');
    if (cartItems.length === 0) {
        showEmptyCart();
    } else {
        showFilledCart();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', cartItemsContainer.innerHTML);
}

// Function to update the cart total
function updateCartTotal() {
    let cartTotal = 0;
    const cartItems = cartItemsContainer.querySelectorAll('.cart-item');
    
    cartItems.forEach(item => {
        const priceElement = item.querySelector('.item-details .p4:first-of-type');
        const quantityElement = item.querySelector('.quantity-control input');
        
        if (priceElement && quantityElement) {
            const priceText = priceElement.textContent.replace('€', '').trim();
            const price = parseFloat(priceText);
            const quantity = parseInt(quantityElement.value) || 0;
            
            if (!isNaN(price) && !isNaN(quantity)) {
                cartTotal += price * quantity;
            }
        }
    });
    
    const formattedTotal = cartTotal.toFixed(2);
    cartTotalElement.textContent = `€${formattedTotal}`;
    ptop.textContent = `Subtotal: €${formattedTotal}`;
    saveCart();
    checkEmptyCart();
}

// Function to attach quantity control listeners
function attachQuantityListeners() {
    const increaseButtons = cartItemsContainer.querySelectorAll('.increase');
    const decreaseButtons = cartItemsContainer.querySelectorAll('.decrease');
    const removeButtons = cartItemsContainer.querySelectorAll('.remove-item');

    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            if (input && input.type === 'number') {
                input.value = parseInt(input.value) + 1;
                updateCartTotal();
            }
        });
    });

    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.nextElementSibling;
            if (input && input.type === 'number') {
                const currentValue = parseInt(input.value);
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                    updateCartTotal();
                } else {
                    button.closest('.cart-item').remove();
                    updateCartTotal();
                }
            }
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.cart-item').remove();
            updateCartTotal();
        });
    });
}

// Function to add an item to the cart
function addToCart(item) {
    if (!item) return;

    // Get the product details
    const imageSrc = item.querySelector('.product-image')?.src;
    const title = item.querySelector('#des h5')?.textContent;
    const priceText = item.querySelector('#des p1')?.textContent;
    
    if (!imageSrc || !title || !priceText) {
        console.error('Missing required product details');
        return;
    }

    // Convert price from $ to € (assuming 1:1 conversion for now)
    const price = parseFloat(priceText.replace('$', ''));

    // Create a new cart item element
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <img src="${imageSrc}" alt="${title}" class="cartitemimg">
        <div class="item-details">
            <h1>${title}</h1>
            <p class="p4">€${price.toFixed(2)}</p>
            <div class="quantity-control">
                <button class="decrease">-</button>
                <input type="number" value="1" min="1">
                <button class="increase">+</button>
            </div>
            <button class="remove-item">×</button>
        </div>
    `;

    // Add the new cart item to the cart container
    cartItemsContainer.appendChild(cartItem);

    // Attach event listeners to the new item
    attachQuantityListeners();

    // Update the cart total
    updateCartTotal();

    // Show feedback
    const button = item.querySelector('#addToCartBtn');
    if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<h7>Added to Cart</h7>';
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    }
}

// Add event listeners to "Add to Cart" buttons in the shop page
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    
    const addToCartButtons = document.querySelectorAll('#addToCartBtn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productItem = button.closest('.product-item');
            if (productItem) {
                addToCart(productItem);
            }
        });
    });
});