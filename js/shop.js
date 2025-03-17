// Constants
const CATEGORY_MAP = {
    'all products': 'all',
    'rings': 'A',
    'bracelets': 'B',
    'necklaces': 'C',
    'earrings': 'D'
};

const REVERSE_CATEGORY_MAP = {
    'all': 'all products',
    'A': 'rings',
    'B': 'bracelets',
    'C': 'necklaces',
    'D': 'earrings'
};

// Product Class
class Product {
    constructor(id, category, image, name, price, material, stones) {
        this.id = id;
        this.category = category;
        this.image = image;
        this.name = name;
        this.price = price;
        this.material = material;
        this.stones = stones;
    }

    createProductElement() {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.dataset.category = this.category;
        productElement.dataset.material = this.material;
        productElement.dataset.stones = this.stones.join(',');
        productElement.dataset.price = this.price;
        productElement.dataset.id = this.id;

        const productLink = document.createElement('a');
        productLink.href = `product.html?id=${this.id}`;
        productLink.className = 'product-link';

        const content = document.createElement('div');
        content.className = 'product-content';

        const img = document.createElement('img');
        img.src = this.image;
        img.alt = this.name;
        img.className = 'product-image';

        const info = document.createElement('div');
        info.className = 'product-info';

        const name = document.createElement('h5');
        name.textContent = this.name;

        const price = document.createElement('p');
        price.textContent = `€${this.price.toFixed(2)}`;

        const stones = document.createElement('p');
        stones.className = 'product-stones';
        stones.textContent = this.stones.filter(stone => stone !== 'none').join(', ');

        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'addToCartBtn';
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.dataset.id = this.id;
        addToCartBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.addToCart(this);
        };

        info.appendChild(name);
        info.appendChild(price);
        if (this.stones.filter(stone => stone !== 'none').length > 0) {
            info.appendChild(stones);
        }
        content.appendChild(img);
        content.appendChild(info);
        content.appendChild(addToCartBtn);
        productLink.appendChild(content);
        productElement.appendChild(productLink);

        return productElement;
    }

    addToCart(product) {
        // Get existing cart items from localStorage
        let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        
        // Add new item to cart
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            stones: product.stones
        });
        
        // Save updated cart to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Show feedback to user
        const button = document.querySelector(`.addToCartBtn[data-id="${product.id}"]`);
        if (button) {
            button.textContent = 'Added to Cart';
            setTimeout(() => {
                button.textContent = 'Add to Cart';
            }, 2000);
        }
    }
}

// Shop Manager Class
class ShopManager {
    constructor() {
        this.products = [];
        this.currentProducts = [];
        this.initializeElements();
        this.bindEvents();
        this.loadProducts();
    }

    initializeElements() {
        this.productContainer = document.getElementById("product-container");
        this.categoryLinks = document.querySelectorAll("#shopnav a");
        this.searchBar = document.getElementById("search-bar");
        this.sortSelect = document.getElementById("sort-by");
        this.filterSidebar = document.querySelector(".filter-sidebar");
        this.filterToggle = document.querySelector(".filter-toggle");
        this.closeSidebar = document.querySelector(".close-sidebar");
        this.filterCheckboxes = document.querySelectorAll(".filter-option input[type='checkbox']");
    }

    bindEvents() {
        // Category navigation
        this.categoryLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                this.categoryLinks.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
                this.filterByCategory(link.id.replace("filter-", ""));
            });
        });

        // Search functionality
        if (this.searchBar) {
            this.searchBar.addEventListener("input", () => {
                this.applyFilters();
            });
        }

        // Sort functionality
        if (this.sortSelect) {
            this.sortSelect.addEventListener("change", () => {
                this.applyFilters();
            });
        }

        // Filter sidebar toggle
        if (this.filterToggle) {
            this.filterToggle.addEventListener("click", () => {
                this.filterSidebar.classList.toggle("active");
            });
        }

        // Close sidebar when clicking outside
        document.addEventListener("click", (e) => {
            if (this.filterSidebar && 
                !this.filterSidebar.contains(e.target) && 
                !this.filterToggle.contains(e.target)) {
                this.filterSidebar.classList.remove("active");
            }
        });

        // Filter checkboxes
        this.filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener("change", () => {
                this.applyFilters();
            });
        });
    }

    async loadProducts() {
        try {
            const response = await fetch("../products.json");
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            this.products = data.map(product => new Product(
                product.id,
                product.category,
                product.image,
                product.name,
                product.price,
                product.material || 'silver',
                product.stones || ['none']
            ));
            this.currentProducts = [...this.products];
            this.applyFilters();
        } catch (error) {
            console.error("Error loading products:", error);
        }
    }

    filterByCategory(category) {
        if (category === "all") {
            this.currentProducts = [...this.products];
        } else {
            this.currentProducts = this.products.filter(product => 
                product.category === CATEGORY_MAP[category]
            );
        }
        this.applyFilters();
    }

    filterBySearch(products, searchTerm) {
        if (!searchTerm) return products;
        const term = searchTerm.toLowerCase();
        return products.filter(product => 
            product.name.toLowerCase().includes(term)
        );
    }

    filterByAttributes(products) {
        const selectedMaterials = Array.from(document.querySelectorAll('input[name="material"]:checked'))
            .map(cb => cb.value);
        const selectedStones = Array.from(document.querySelectorAll('input[name="stone"]:checked'))
            .map(cb => cb.value);
        const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked'))
            .map(cb => cb.value);

        return products.filter(product => {
            const materialMatch = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
            const stoneMatch = selectedStones.length === 0 || 
                product.stones.some(stone => selectedStones.includes(stone));
            const priceMatch = this.matchPriceRange(product.price, selectedPrices);
            return materialMatch && stoneMatch && priceMatch;
        });
    }

    matchPriceRange(price, selectedRanges) {
        if (selectedRanges.length === 0) return true;
        return selectedRanges.some(range => {
            switch(range) {
                case 'under-50': return price < 50;
                case '50-100': return price >= 50 && price <= 100;
                case 'over-100': return price > 100;
                default: return true;
            }
        });
    }

    sortProducts(products) {
        const sortBy = this.sortSelect ? this.sortSelect.value : '';
        if (!sortBy) return products;
    
        return [...products].sort((a, b) => {
            switch(sortBy) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                default: return 0;
            }
        });
    }

    applyFilters() {
        let filteredProducts = [...this.currentProducts];
        
        // Apply search filter
        if (this.searchBar) {
            filteredProducts = this.filterBySearch(filteredProducts, this.searchBar.value);
        }

        // Apply attribute filters
        filteredProducts = this.filterByAttributes(filteredProducts);

        // Apply sorting
        filteredProducts = this.sortProducts(filteredProducts);

        // Render filtered products
        this.renderProducts(filteredProducts);
    }

    renderProducts(products) {
        if (!this.productContainer) return;
        
        this.productContainer.innerHTML = "";
        products.forEach(product => {
            const productElement = product.createProductElement();
            this.productContainer.appendChild(productElement);
        });
    }
}

// Initialize shop when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ShopManager();
});
