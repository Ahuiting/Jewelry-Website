// // Get the 'Add to Cart' button
// const addToCartBtn = document.getElementById('addToCartBtn');

// // Add event listener to the 'Add to Cart' button
// addToCartBtn.addEventListener('click', function() {
//     // Get product details
//     const productName = 'Lorem Ipsum';
//     const productPrice = 10.99;

//     // Create an object to represent the product
//     const product = {
//         name: productName,
//         price: productPrice
//     };

//     // Get the current cart items from localStorage
//     let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

//     // Add the selected product to the cart
//     cartItems.push(product);

//     // Save the updated cart items back to localStorage
//     localStorage.setItem('cart', JSON.stringify(cartItems));

//     // add drop down/ some cart add confirmation here


    
// });


// shop.html products sort by filter and search, and container mngmnt


document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.product-container');
  const items = Array.from(container.children);
  const searchBar = document.getElementById('search-bar');
  const sortBtn = document.getElementById('sort-btn');
  const filterBtn = document.getElementById('filter-btn');

  // Shuffle array
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Display items
  const displayItems = (items) => {
    container.innerHTML = '';
    items.forEach(item => container.appendChild(item));
  };

  // Sort items
  const sortItems = () => {
    items.sort((a, b) => a.textContent.localeCompare(b.textContent));
    displayItems(items);
  };

  // Filter items by category A
  const filterItems = () => {
    const filteredItems = items.filter(item => item.dataset.category === 'A');
    displayItems(filteredItems);
  };

  // Initial shuffle and display
  displayItems(shuffle(items));

  // // Event listeners
  // sortBtn.addEventListener('click', sortItems);
  // filterBtn.addEventListener('click', filterItems);
  // searchBar.addEventListener('input', () => {
  //   const searchText = searchBar.value.toLowerCase();
  //   const filteredItems = items.filter(item => item.textContent.toLowerCase().includes(searchText));
  //   displayItems(filteredItems);
  // });
});

// // Handling sort and filter
// const sortBySelect = document.getElementById('sort-by');
// const filterBySelect = document.getElementById('filter-by');

// sortBySelect.addEventListener('change', () => {
//     const sortBy = sortBySelect.value;
//     // Implement sorting logic based on sortBy value
//     // E.g., sort products array and update the DOM
// });

// filterBySelect.addEventListener('change', () => {
//     const filterBy = filterBySelect.value;
//     // Implement filtering logic based on filterBy value
//     // E.g., filter products array and update the DOM
// });


// shop.html products (container)


