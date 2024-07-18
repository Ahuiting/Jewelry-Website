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

document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.cart-item').remove();
        updateCart();
    });
});

function updateCart() {
    // Update cart total and other details
}
