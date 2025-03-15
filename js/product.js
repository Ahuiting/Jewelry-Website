
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