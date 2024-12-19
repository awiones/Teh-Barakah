document.addEventListener('DOMContentLoaded', () => {
    // Search elements
    const navbarSearchIcon = document.querySelector('.nav-icon[aria-label="Search"]');
    const searchModal = createSearchModal();
    const searchInput = searchModal.querySelector('.search-modal-input');
    const searchResults = searchModal.querySelector('.search-results');
    const closeSearchModalBtn = searchModal.querySelector('.search-modal-close');

    // Predefined search data (you can expand this or fetch from backend)
    const searchData = [
        // Teas
        { 
            type: 'Tea', 
            name: 'Tranquility Green Tea', 
            description: 'A soothing blend infused with Surah Ar-Rahman verses',
            link: '#teas'
        },
        { 
            type: 'Tea', 
            name: 'Strength Black Tea', 
            description: 'Energizing blend recited with Ayatul Kursi',
            link: '#teas'
        },
        { 
            type: 'Tea', 
            name: 'Serenity Chamomile Tea', 
            description: 'Gentle blend recited with Surah Ash-Sharh',
            link: '#teas'
        },
        // Blogs
        { 
            type: 'Blog', 
            name: 'The Art of Tea Meditation', 
            description: 'Discover how tea can be a powerful tool for mindfulness',
            link: '#blogs'
        },
        { 
            type: 'Blog', 
            name: 'Health Benefits of Herbal Teas', 
            description: 'Explore the natural healing properties of herbal teas',
            link: '#blogs'
        }
    ];

    // Create search modal dynamically
    function createSearchModal() {
        const modal = document.createElement('div');
        modal.className = 'search-modal';
        modal.innerHTML = `
            <div class="search-modal-content">
                <button class="search-modal-close">&times;</button>
                <div class="search-modal-header">
                    <input type="text" class="search-modal-input" placeholder="Search Teh Barakah...">
                    <button class="search-modal-button">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                <div class="search-results"></div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    // Debounce function to limit search frequency
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Perform search and display results
    function performSearch(query) {
        if (!query) {
            searchResults.innerHTML = '';
            return;
        }

        const filteredResults = searchData.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase()) || 
            item.description.toLowerCase().includes(query.toLowerCase())
        );

        displaySearchResults(filteredResults);
    }

    // Display search results
    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <p>No results found. Try a different search term.</p>
                </div>
            `;
            return;
        }

        searchResults.innerHTML = results.map(result => `
            <a href="${result.link}" class="search-result-item">
                <div class="search-result-icon">
                    <i class="fas ${result.type === 'Tea' ? 'fa-tea' : 'fa-newspaper'}"></i>
                </div>
                <div class="search-result-content">
                    <h3>${result.name}</h3>
                    <p>${result.description}</p>
                    <span class="search-result-type">${result.type}</span>
                </div>
            </a>
        `).join('');
    }

    // Event Listeners
    navbarSearchIcon.addEventListener('click', () => {
        searchModal.classList.add('search-modal-open');
        searchInput.focus();
    });

    closeSearchModalBtn.addEventListener('click', () => {
        searchModal.classList.remove('search-modal-open');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });

    // Close modal when clicking outside
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('search-modal-open');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });

    // Debounced search input
    const debouncedSearch = debounce(performSearch, 300);
    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });

    // Search button click
    searchModal.querySelector('.search-modal-button').addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    // Enter key search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
});