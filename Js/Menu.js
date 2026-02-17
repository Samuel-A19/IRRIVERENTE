document.addEventListener('DOMContentLoaded', () => {

    /* ================= BUSCADOR + FILTROS ================= */

    const searchInput = document.getElementById('search');
    const filters = document.querySelectorAll('.filter');
    const cards = document.querySelectorAll('.card');

    // Filtros por categoría
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            const category = filter.dataset.category;

            cards.forEach(card => {
                card.style.display =
                    category === 'all' || card.dataset.category === category
                        ? 'flex'
                        : 'none';
            });
        });
    });

    // Buscador por texto
    searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase();
        cards.forEach(card => {
            card.style.display = card.textContent.toLowerCase().includes(term)
                ? 'flex'
                : 'none';
        });
    });

    document.querySelector('.filter[data-category="all"]').click();

    /* ================= MODALES AUTENTICACIÓN ================= */

    window.openAuthModal = function(id) {
        document.getElementById(id).style.display = 'flex';
    };

    window.closeAuthModal = function(id) {
        document.getElementById(id).style.display = 'none';
    };

    window.switchModal = function(currentId, targetId) {
        closeAuthModal(currentId);
        openAuthModal(targetId);
    };

    // Cerrar modales si se hace click fuera del contenido
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    /* ================= MODAL TAMAÑO PIZZA ================= */

    let currentPizza = '';
    let prices = { small: 0, medium: 0, large: 0 };

    window.openSizeModal = function(name, small, medium, large) {
        currentPizza = name;
        prices = { small, medium, large };

        document.getElementById('modalTitle').textContent = name;
        document.querySelector('#sizeSmall span').textContent = small.toLocaleString();
        document.querySelector('#sizeMedium span').textContent = medium.toLocaleString();
        document.querySelector('#sizeLarge span').textContent = large.toLocaleString();

        document.getElementById('sizeModal').style.display = 'flex';
    };

    window.closeSizeModal = function() {
        document.getElementById('sizeModal').style.display = 'none';
    };

    // Selección de tamaño y agregar al carrito
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', () => {
            const size = option.id === 'sizeSmall'
                ? 'Pequeña'
                : option.id === 'sizeMedium'
                ? 'Mediana'
                : 'Grande';

            const price =
                size === 'Pequeña' ? prices.small :
                size === 'Mediana' ? prices.medium :
                prices.large;

            const nombreFinal = `${currentPizza} - ${size}`;

            agregarDesdeModal(nombreFinal, price);
            closeSizeModal();
        });
    });

    // Cerrar modal pizza si se hace click fuera
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('sizeModal')) {
            closeSizeModal();
        }
    });

});