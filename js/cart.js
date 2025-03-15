
function increase_click(button){
    const input = button.previousElementSibling;
    input.value = parseInt(input.value) + 1;
    updateCartTotal();
}
function decrease_click(button){
    const input = button.nextElementSibling;
    let val=parseInt(input.value)
    console.log(val,input)
    if (val > 1) {
        input.value = val - 1;
        updateCartTotal();
    } else {
        console.log("removing",button)
        button.closest('.cart-item').remove();
        updateCartTotal();
    }
}
function remove_click(button){
        button.closest('.cart-item').remove();
        updateCartTotal();
}




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
                <button class="decrease" onclick="decrease_click(this)">-</button>
                <input type="number" value="1">
                <button class="increase" onclick="increase_click(this)">+</button>
            </div>
            <button class="remove-item" onclick="remove_click(this)">X</button>
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