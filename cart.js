// document.querySelectorAll('.increase').forEach(button => {
//     button.addEventListener('click', () => {
//         const input = button.previousElementSibling;
//         input.value = parseInt(input.value) + 1;
//         updateCart();
//     });
// });

// document.querySelectorAll('.decrease').forEach(button => {
//     button.addEventListener('click', () => {
//         const input = button.nextElementSibling;
//         if (input.value > 1) {
//             input.value = parseInt(input.value) - 1;
//             updateCart();
//         }
//     });
// });

// document.querySelectorAll('.remove-item').forEach(button => {
//     button.addEventListener('click', () => {
//         button.closest('.cart-item').remove();
//         updateCart();
//     });
// });

// function updateCart() {
//     // Update cart total and other details
// }




// cart.js
const cartItemsContainer = document.querySelector('.cart-items');
const cartSummary = document.querySelector('.cart-summary');
const cartTotalElement = document.getElementById('cartTotal');
const ptop = document.getElementById('ptop');

// Function to update the cart total
function updateCartTotal() {
    let cartTotal = 0;
    const cartItems = cartItemsContainer.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        const priceElement = item.querySelector('.item-details .p4:first-of-type');
        const quantityElement = item.querySelector('.quantity-control input');
        const price = parseFloat(priceElement.textContent.replace('$', ''));
        const quantity = parseInt(quantityElement.value);
        cartTotal += price * quantity;
    });
    cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
    ptop.textContent = `Subtotal: $${cartTotal.toFixed(2)}`;
}

// Function to add an item to the cart
function addToCart(item) {
    // Get the product details
    const imageSrc = item.querySelector('.product-image').src;
    const title = item.querySelector('#des h5').textContent;
    const price = parseFloat(item.querySelector('#des p1').textContent.replace('$', ''));

    // Create a new cart item element
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <img src="${imageSrc}" alt="${title}" class="cartitemimg">
        <div class="item-details">
            <h1>${title}</h1>
            <p class="p4">$ ${price.toFixed(2)}</p>
            <div class="quantity-control">
                <button class="decrease">-</button>
                <input type="number" value="1">
                <button class="increase">+</button>
            </div>
            <button class="remove-item">Remove</button>
        </div>
    `;

    // Add the new cart item to the cart container
    cartItemsContainer.appendChild(cartItem);

    // Add event listeners to quantity control buttons
    const decreaseButton = cartItem.querySelector('.decrease');
    const increaseButton = cartItem.querySelector('.increase');
    decreaseButton.addEventListener('click', () => {
        const quantityElement = cartItem.querySelector('.quantity-control input');
        const quantity = parseInt(quantityElement.value);
        if (quantity > 1) {
            quantityElement.value = quantity - 1;
        }
        updateCartTotal();
    });
    increaseButton.addEventListener('click', () => {
        const quantityElement = cartItem.querySelector('.quantity-control input');
        const quantity = parseInt(quantityElement.value);
        quantityElement.value = quantity + 1;
        updateCartTotal();
    });

    // Add event listener to remove item button
    const removeButton = cartItem.querySelector('.remove-item');
    removeButton.addEventListener('click', () => {
        cartItemsContainer.removeChild(cartItem);
        updateCartTotal();
    });
    
    console.log('addToCart called with item:', item);

    // Update the cart total
    updateCartTotal();
}

// Add event listeners to "Add to Cart" buttons in the shop page
const addToCartButtons = document.querySelectorAll('#addToCartBtn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        addToCart(button.closest('.product-item'));
    });
});