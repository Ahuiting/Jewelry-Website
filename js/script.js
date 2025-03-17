// Utility Functions
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Product Display Functions
const displayItems = (container, items) => {
    container.innerHTML = '';
    items.forEach(item => container.appendChild(item));
};

const filterItemsByText = (items, searchText) => {
    return items.filter(item => 
        item.textContent.toLowerCase().includes(searchText.toLowerCase())
    );
};

// Navigation Functions
const handleNavigation = () => {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('#navbar li a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
};

const handleCategoryNavigation = () => {
    const categoryLinks = document.getElementsByClassName("displayitems");
    Array.from(categoryLinks).forEach(category => {
        category.onclick = () => {
            window.location.href = `shop.html?filter=${category.id}`;
        };
    });
};

// Product Container Functions
const initializeProductContainer = () => {
    const container = document.querySelector('.product-container');
    if (!container) return;

    const items = Array.from(container.children);
    const searchBar = document.getElementById('search-bar');

    // Initial display
    displayItems(container, shuffle(items));

    // Search functionality
    if (searchBar) {
        searchBar.addEventListener('input', () => {
            const filteredItems = filterItemsByText(items, searchBar.value);
            displayItems(container, filteredItems);
        });
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    handleNavigation();
    handleCategoryNavigation();
    initializeProductContainer();
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
for(let category of document.getElementsByClassName("displayitems")){
  console.log(category.id,category)
  category.onclick= ()=>{window.location.href="shop.html?filter="+category.id }


}
