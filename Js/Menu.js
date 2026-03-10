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

    window.openAuthModal = function (id) {
        document.getElementById(id).style.display = 'flex';
    };

    window.closeAuthModal = function (id) {
        document.getElementById(id).style.display = 'none';
    };

    window.switchModal = function (currentId, targetId) {
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

    window.openSizeModal = function (name, small, medium, large) {
        currentPizza = name;
        prices = { small, medium, large };

        document.getElementById('modalTitle').textContent = name;
        document.querySelector('#sizeSmall span').textContent = small.toLocaleString();
        document.querySelector('#sizeMedium span').textContent = medium.toLocaleString();
        document.querySelector('#sizeLarge span').textContent = large.toLocaleString();

        document.getElementById('sizeModal').style.display = 'flex';
    };

    window.closeSizeModal = function () {
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
// Exponer función para (re)inicializar el comportamiento de filtros/búsqueda
window.initMenuCards = function () {
    const searchInput = document.getElementById('search');

    // Reemplazar filtros para eliminar listeners previos
    document.querySelectorAll('.filter').forEach(f => {
        const clone = f.cloneNode(true);
        f.parentNode.replaceChild(clone, f);
    });

    const filters = document.querySelectorAll('.filter');
    const cards = document.querySelectorAll('.card');

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

    if (searchInput) {
        searchInput.oninput = () => {
            const term = searchInput.value.toLowerCase();
            document.querySelectorAll('.card').forEach(card => {
                card.style.display = card.textContent.toLowerCase().includes(term) ? 'flex' : 'none';
            });
        };
    }

    const all = document.querySelector('.filter[data-category="all"]');
    if (all) all.click();

    // Attach Edit/Delete handlers
    attachProductHandlers();
};

function attachProductHandlers() {
    document.querySelectorAll('.card .btn-delete').forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault();
            const card = this.closest('.card');
            const id = card.dataset.id;
            if (!id) return;
            if (!confirm('¿Confirmas eliminar este producto?')) return;

            fetch('/IRRIVERENTE/api/eliminar_producto.php', {
                method: 'POST',
                body: new URLSearchParams({ id }),
                credentials: 'include'
            })
                .then(r => r.text())
                .then(t => {
                    const resp = t.trim();
                    if (resp === 'ok') {
                        if (typeof reloadProducts === 'function') reloadProducts();
                        if (typeof mostrarAlerta === 'function') mostrarAlerta('Producto eliminado');
                    } else if (resp === 'ERROR_NO_AUTORIZADO') {
                        if (typeof mostrarAlerta === 'function') mostrarAlerta('No tienes permisos de administrador', 'Acceso Denegado');
                    } else {
                        if (typeof mostrarAlerta === 'function') mostrarAlerta('Error al eliminar');
                    }
                })
                .catch(err => console.error(err));
        };
    });

    document.querySelectorAll('.card .btn-edit').forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault();
            const card = this.closest('.card');
            const id = card.dataset.id;
            const name = card.dataset.name || '';
            const desc = card.dataset.desc || '';
            const price = card.dataset.price || '';
            const category = card.dataset.cat || '';

            document.getElementById('tipoAdmin').value = 'producto';
            document.getElementById('idAdmin').value = id;
            document.getElementById('tituloInput').value = name;
            document.getElementById('descripcionInput').value = desc;
            document.getElementById('precioInput').value = price;
            document.getElementById('categoriaInput').value = category;

            if (typeof abrirModalAdmin === 'function') abrirModalAdmin('producto');
        };
    });
};

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.initMenuCards === 'function') window.initMenuCards();
});
