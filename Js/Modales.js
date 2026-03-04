/* =====================================================
   MODALES (open, close, switch)
===================================================== */

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'flex';
}


// Recarga dinámica de productos (reemplaza el contenido de #products)
window.reloadProducts = function () {
    const container = document.getElementById('products');
    if (!container) return;
    fetch('/IRRIVERENTE/api/mostrar_productos.php')
        .then(r => r.text())
        .then(html => {
            container.innerHTML = html;
            setTimeout(() => {
                if (typeof window.initMenuCards === 'function') {
                    window.initMenuCards();
                }
                if (typeof aplicarPermisos === 'function') {
                    aplicarPermisos();
                }
            }, 50);
        })
        .catch(err => console.error('Error recargando productos:', err));
};

// Recarga dinámica de promociones (reemplaza contenido de #promosContainer)
window.reloadPromos = function () {
    const container = document.getElementById('promosContainer');
    if (!container) return;
    fetch('/IRRIVERENTE/api/mostrar_promos.php')
        .then(r => r.text())
        .then(html => {
            container.innerHTML = html;
            setTimeout(() => {
                if (typeof attachPromoHandlers === 'function') {
                    attachPromoHandlers();
                }
                if (typeof aplicarPermisos === 'function') {
                    aplicarPermisos();
                }
            }, 50);
        })
        .catch(err => console.error('Error recargando promociones:', err));
};

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';

    if (id === "recoverModal" && typeof resetRecover === "function") {
        resetRecover();
    }
}

function switchModal(current, target) {
    closeModal(current);
    openModal(target);
}


/* =====================================================
   CERRAR MODALES AL HACER CLICK FUERA
===================================================== */

window.onclick = function (event) {

    const modals = [
        'loginModal',
        'registerModal',
        'recoverModal',
        'modalGeneral',
        'modalCrearProducto',
        'modalAdmin',
        'sizeModal'
    ];

    modals.forEach(id => {
        const modal = document.getElementById(id);
        if (modal && event.target === modal) {
            modal.style.display = "none";
        }
    });
};


/* =====================================================
   ALERTAS PERSONALIZADAS
===================================================== */

function mostrarAlerta(mensaje, titulo = "Atención") {

    const overlay = document.getElementById("alertOverlay");
    const title = document.getElementById("alertTitle");
    const message = document.getElementById("alertMessage");

    if (!overlay || !title || !message) {
        console.error("AlertOverlay no existe en esta página");
        return;
    }

    title.textContent = titulo;
    message.textContent = mensaje;

    overlay.style.display = "flex";
}

function cerrarAlerta() {
    const overlay = document.getElementById("alertOverlay");
    if (overlay) overlay.style.display = "none";
}

/* =====================================================
   CONFIRMACIÓN PERSONALIZADA
===================================================== */

let confirmCallback = null;

function mostrarConfirmacion(mensaje, titulo = "Confirmación") {
    const overlay = document.getElementById("confirmOverlay");
    const title = document.getElementById("confirmTitle");
    const message = document.getElementById("confirmMessage");

    if (!overlay || !title || !message) {
        console.error("ConfirmOverlay no existe en esta página");
        return false;
    }

    title.textContent = titulo;
    message.textContent = mensaje;
    overlay.style.display = "flex";

    return true;
}

function aceptarConfirmacion() {
    const overlay = document.getElementById("confirmOverlay");
    if (overlay) overlay.style.display = "none";
    if (confirmCallback) {
        confirmCallback(true);
        confirmCallback = null;
    }
}

function cancelarConfirmacion() {
    const overlay = document.getElementById("confirmOverlay");
    if (overlay) overlay.style.display = "none";
    if (confirmCallback) {
        confirmCallback(false);
        confirmCallback = null;
    }
}

// Función que retorna una promesa para uso en async/await
function confirmar(mensaje, titulo = "Confirmación") {
    return new Promise(resolve => {
        confirmCallback = resolve;
        mostrarConfirmacion(mensaje, titulo);
    });
}

/* =====================================================
   MODAL GENERAL (AGREGAR NORMAL)
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const modalGeneral = document.getElementById("modalGeneral");

    if (modalGeneral) {

        // 🔥 IMPORTANTE: excluye botones admin
        document.querySelectorAll(".btn-agregar:not(.solo-admin)").forEach(btn => {
            btn.addEventListener("click", function () {
                modalGeneral.style.display = "flex";
            });
        });

        const cerrar = modalGeneral.querySelector(".cerrar-modal");
        if (cerrar) {
            cerrar.addEventListener("click", function () {
                modalGeneral.style.display = "none";
            });
        }

        modalGeneral.addEventListener("click", function (e) {
            if (e.target === modalGeneral) {
                modalGeneral.style.display = "none";
            }
        });
    }

});


/* =====================================================
   MODAL ADMIN (PRODUCTO / PROMO)
===================================================== */

function abrirModalAdmin(tipo) {

    const modal = document.getElementById("modalAdmin");
    const titulo = document.getElementById("tituloAdmin");
    const tipoInput = document.getElementById("tipoAdmin");
    const submitBtn = modal ? modal.querySelector('button[type="submit"]') : null;

    if (!modal) return;

    modal.style.display = "flex";

    if (tipoInput) tipoInput.value = tipo;

    // ajustar título del modal
    if (titulo) {
        if (tipo === "pizza") {
            titulo.textContent = "Crear Pizza";
        } else if (tipo === "promo") {
            titulo.textContent = "Crear Promoción";
        } else {
            titulo.textContent = "Crear Producto";
        }
    }

    // cambiar texto del botón submit para mayor claridad
    if (submitBtn) {
        if (tipo === "promo") {
            submitBtn.textContent = "Guardar Promoción";
        } else {
            submitBtn.textContent = "Guardar Producto";
        }
    }
}

function cerrarModalAdmin() {
    const modal = document.getElementById("modalAdmin");

    if (modal) {
        modal.style.display = "none";

        // Obtener elementos dentro del modal
        const preview = modal.querySelector("#previewAdmin");
        const uploadBox = modal.querySelector(".upload-box");

        // Limpiar la imagen cuando se cierre el modal
        if (preview) {
            preview.src = "";
            preview.classList.remove("show");
        }

        if (uploadBox) {
            uploadBox.classList.remove("has-image");
            uploadBox.style.height = "auto"; // Restaurar altura inicial
        }

        // Limpiar el formulario
        const tituloInput = modal.querySelector("#tituloInput");
        const descripcionInput = modal.querySelector("#descripcionInput");
        const precioInput = modal.querySelector("#precioInput");
        const categoriaInput = modal.querySelector("#categoriaInput");

        if (tituloInput) tituloInput.value = "";
        if (descripcionInput) descripcionInput.value = "";
        if (precioInput) precioInput.value = "";
        if (categoriaInput) categoriaInput.value = "";
    }
}


/* =====================================================
   GUARDAR PRODUCTO / PROMO CON IMAGEN
===================================================== */

function guardarAdmin(event) {

    // evitar envío tradicional del formulario
    if (event && event.preventDefault) event.preventDefault();

    console.log("FUNCION EJECUTADA 🔥");

    const tipo = document.getElementById("tipoAdmin")?.value; // 'producto' o 'promo'
    const categoria = document.getElementById("categoriaInput")?.value;
    const titulo = document.getElementById("tituloInput")?.value;
    const descripcion = document.getElementById("descripcionInput")?.value;
    const precio = document.getElementById("precioInput")?.value;
    const fileInput = document.getElementById("imagenAdmin");
    const imagen = fileInput?.files[0];

    if (!tipo || !categoria || !titulo || !descripcion || !precio) {
        mostrarAlerta("Todos los campos son obligatorios");
        return;
    }

    // la imagen se requiere para evitar que la tarjeta quede en blanco en el catálogo
    if (!imagen) {
        mostrarAlerta("Debes seleccionar una imagen para poder guardar");
        return;
    }

    const formData = new FormData();
    // la API antigua espera 'tipo' con la categoría, se puede renombrar en el servidor
    formData.append("tipo", categoria);
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);

    // indicar si se trata de una promo para la base de datos
    formData.append("is_promo", tipo === "promo" ? 1 : 0);

    // si estamos editando, enviar id
    const idAdmin = document.getElementById("idAdmin")?.value;
    if (idAdmin) {
        formData.append('id', idAdmin);
    }

    if (imagen) {
        console.log("Adjuntando imagen", imagen.name, imagen.size);
        formData.append("imagen", imagen);
    }

    fetch("/IRRIVERENTE/api/guardar_producto.php", {
        method: "POST",
        body: formData
    })
        .then(res => res.text())
        .then(data => {

            console.log("RESPUESTA SERVIDOR:", data);

            const resp = data.trim();
            if (resp === "ok") {
                mostrarAlerta("Guardado correctamente 🔥", "Administrador");

                const modal = document.getElementById("modalAdmin");
                cerrarModalAdmin();

                // recargar la lista correspondiente
                if (tipo === "promo") {
                    if (typeof reloadPromos === 'function') reloadPromos();
                } else {
                    if (typeof reloadProducts === 'function') reloadProducts();
                }

                // limpiar campos
                document.getElementById("tituloInput").value = "";
                document.getElementById("descripcionInput").value = "";
                document.getElementById("precioInput").value = "";
                document.getElementById("categoriaInput").value = "";
                document.getElementById("imagenAdmin").value = "";

                if (modal) {
                    const preview = modal.querySelector("#previewAdmin");
                    const uploadBox = modal.querySelector(".upload-box");

                    if (preview) {
                        preview.src = "";
                        preview.classList.remove("show");
                    }
                    if (uploadBox) {
                        uploadBox.classList.remove("has-image");
                        uploadBox.style.height = "auto";
                    }
                }
            } else if (resp === "ERROR_IMG") {
                mostrarAlerta("El producto se guardó pero la imagen no pudo subirse. Comprueba los permisos del directorio uploads.");
            } else {
                mostrarAlerta("Error al guardar");
            }

        })
        .catch(error => {
            console.error("Error:", error);
            mostrarAlerta("Error del servidor");
        });
}


/* =====================================================
   PREVISUALIZACIÓN DE IMAGEN
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const fileInput = document.getElementById("imagenAdmin");
    const preview = document.getElementById("previewAdmin");
    const modalAdmin = document.getElementById("modalAdmin");
    const uploadBox = modalAdmin ? modalAdmin.querySelector(".upload-box") : null;

    if (fileInput && uploadBox) {

        fileInput.addEventListener("change", function () {

            const file = fileInput.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    // Crear imagen temporal para obtener dimensiones
                    const tempImg = new Image();

                    tempImg.onload = function () {
                        try {
                            // Calcular aspect ratio
                            const aspectRatio = this.width / this.height;
                            const containerWidth = uploadBox.offsetWidth || 400; // Valor por defecto si no se puede obtener

                            // Calcular altura basada en el ancho del contenedor y aspect ratio
                            const newHeight = Math.round(containerWidth / aspectRatio);

                            // Establecer altura mínima de 160px
                            const finalHeight = Math.max(newHeight, 160);

                            // Aplicar altura al contenedor
                            uploadBox.style.height = finalHeight + "px";

                            console.log("Imagen cargada - Dimensiones:", this.width + "x" + this.height, "Altura calculada:", finalHeight + "px");
                        } catch (err) {
                            console.error("Error al procesar imagen:", err);
                        }
                    };

                    tempImg.src = e.target.result;

                    // Mostrar la preview
                    preview.src = e.target.result;
                    preview.classList.add("show");

                    if (uploadBox) {
                        uploadBox.classList.add("has-image");
                    }
                };

                reader.readAsDataURL(file);
            }
        });
    } else {
        console.warn("No se encontraron elementos: fileInput=" + !!fileInput + ", uploadBox=" + !!uploadBox);
    }

});


/* =====================================================
   BLOQUEAR ALERTAS NATIVAS
===================================================== */

window.alert = function (mensaje) {
    mostrarAlerta(mensaje, "Atención");
};

/* ===============================
   TÉRMINOS OBLIGATORIOS SIMPLE
=============================== */

document.addEventListener("DOMContentLoaded", function () {

    const decision = localStorage.getItem("termsDecision");

    if (!decision) {
        document.getElementById("termsBanner").style.display = "block";
    }

});

function aceptarTerminos() {
    localStorage.setItem("termsDecision", "accepted");
    document.getElementById("termsBanner").style.display = "none";
}

function rechazarTerminos() {

    mostrarAlerta(
        "Para continuar debes aceptar los Términos y Condiciones.",
        "Acción requerida"
    );

}
