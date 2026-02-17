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
/* ========================================
   MODAL CREAR PRODUCTO - FUNCIONALIDAD
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("modalCrearProducto");
    const btnAbrir = document.querySelectorAll(".btn-agregar");
    const btnCerrar = document.querySelector(".cerrar-modal");
    const inputImagen = document.getElementById("imagenProducto");
    const preview = document.getElementById("previewImagen");

    // Abrir modal
    btnAbrir.forEach(btn => {
        btn.addEventListener("click", function () {
            if (modal) modal.style.display = "flex";
        });
    });

    // Cerrar con X
    if (btnCerrar) {
        btnCerrar.addEventListener("click", function () {
            if (modal) modal.style.display = "none";
        });
    }

    // Cerrar haciendo click fuera
    if (modal) {
        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    /* ===== PREVISUALIZAR IMAGEN ===== */

    if (inputImagen && preview) {

        inputImagen.addEventListener("change", function () {

            const file = this.files[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onload = function (e) {
                preview.src = e.target.result;
                preview.style.display = "block";
            };

            reader.readAsDataURL(file);
        });
    }

});


/* ========================================
   CREAR PRODUCTO
======================================== */

function crearProducto() {

    const titulo = document.getElementById("tituloProducto").value.trim();
    const descripcion = document.getElementById("descripcionProducto").value.trim();
    const precio = document.getElementById("precioProducto").value.trim();
    const imagenInput = document.getElementById("imagenProducto");
    const preview = document.getElementById("previewImagen");

    if (!titulo || !descripcion || !precio) {
        alert("Por favor completa todos los campos");
        return;
    }

    const imagenURL = imagenInput.files[0]
        ? URL.createObjectURL(imagenInput.files[0])
        : "Imagenes/default.jpg";

    const nuevoProducto = `
        <div class="card" data-category="nuevo">
            <img src="${imagenURL}" alt="${titulo}">
            <div class="card-content">
                <h3>${titulo}</h3>
                <p>${descripcion}</p>
                <span>$${Number(precio).toLocaleString()}</span>
            </div>
            <button class="btn-add">Añadir</button>
        </div>
    `;

    document.getElementById("products").insertAdjacentHTML("beforeend", nuevoProducto);

    // Limpiar campos
    document.getElementById("tituloProducto").value = "";
    document.getElementById("descripcionProducto").value = "";
    document.getElementById("precioProducto").value = "";
    document.getElementById("imagenProducto").value = "";

    // Limpiar preview
    if (preview) {
        preview.src = "";
        preview.style.display = "none";
    }

    // Cerrar modal
    const modal = document.getElementById("modalCrearProducto");
    if (modal) modal.style.display = "none";
}
