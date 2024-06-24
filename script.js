// Get the 'Add to Cart' button
const addToCartBtn = document.getElementById('addToCartBtn');

// Add event listener to the 'Add to Cart' button
addToCartBtn.addEventListener('click', function() {
    // Get product details
    const productName = 'Lorem Ipsum';
    const productPrice = 10.99;

    // Create an object to represent the product
    const product = {
        name: productName,
        price: productPrice
    };

    // Get the current cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the selected product to the cart
    cartItems.push(product);

    // Save the updated cart items back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // add drop down/ some cart add confirmation here


    
});