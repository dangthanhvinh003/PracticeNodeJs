document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchProduct');
    const typeFilter = document.getElementById('typeFilter');
    const priceSort = document.getElementById('priceSort');
    const productContainer = document.querySelector('.product-container');

    // Debounce function to limit API calls
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Function to fetch and update products
    async function updateProducts() {
        const searchValue = searchInput.value;
        const typeValue = typeFilter.value;
        const sortValue = priceSort.value;

        // Construct query parameters
        const params = new URLSearchParams();
        if (searchValue) params.append('search', searchValue);
        if (typeValue) params.append('type', typeValue);
        if (sortValue) params.append('sort', sortValue);

        // Update URL without reloading the page
        const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        window.history.pushState({ path: newUrl }, '', newUrl);

        try {
            const response = await fetch(`/filter?${params.toString()}`);
            const result = await response.json();

            if (result.errCode === 0) {
                displayProducts(result.data);
            } else {
                console.error('Error fetching products:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to display products
    function displayProducts(products) {
        if (!productContainer) return;

        productContainer.innerHTML = products.map(product => `
            <div class="col-md-3 mb-4">
                <div class="card h-100">
                    <img src="${product.img}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description ? product.description : 'Perfect getaway for nature lovers'}</p>
                        <p class="card-text"><strong>Price: $${product.price}</strong></p>
                        <p class="card-text"><small class="text-muted">Type: ${product.type}</small></p>
                        <a href="/product/${product.productId}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Add event listeners with debounce for search
    const debouncedUpdate = debounce(updateProducts, 200);
    searchInput.addEventListener('input', debouncedUpdate);
    
    // Immediate update for select filters
    typeFilter.addEventListener('change', updateProducts);
    priceSort.addEventListener('change', updateProducts);

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        // Parse URL parameters
        const params = new URLSearchParams(window.location.search);
        
        // Update form values
        searchInput.value = params.get('search') || '';
        typeFilter.value = params.get('type') || '';
        priceSort.value = params.get('sort') || '';
        
        // Update products
        updateProducts();
    });

    // Set initial form values from URL if any
    const params = new URLSearchParams(window.location.search);
    if (params.toString()) {
        searchInput.value = params.get('search') || '';
        typeFilter.value = params.get('type') || '';
        priceSort.value = params.get('sort') || '';
    }

    // Initial load
    updateProducts();
});
