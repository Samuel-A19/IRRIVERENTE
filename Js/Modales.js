/* =====================================================
   MODALES (open, close, switch)
===================================================== */

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'flex';
}

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

    if (!modal) return;

    modal.style.display = "flex";

    if (tipoInput) tipoInput.value = tipo;

    if (titulo) {
        if (tipo === "pizza") {
            titulo.textContent = "Crear Pizza";
        } else if (tipo === "promo") {
            titulo.textContent = "Crear Promoción";
        } else {
            titulo.textContent = "Crear Producto";
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

function guardarAdmin() {

    const tipo = document.getElementById("tipoAdmin")?.value;
    const categoria = document.getElementById("categoriaInput")?.value;
    const titulo = document.getElementById("tituloInput")?.value;
    const descripcion = document.getElementById("descripcionInput")?.value;
    const precio = document.getElementById("precioInput")?.value;
    const imagen = document.getElementById("imagenAdmin")?.files[0];

    if (!tipo || !categoria || !titulo || !descripcion || !precio) {
        mostrarAlerta("Todos los campos son obligatorios");
        return;
    }

    const formData = new FormData();
    formData.append("tipo", categoria);
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);

    if (imagen) {
        formData.append("imagen", imagen);
    }

    fetch("api/guardar_producto.php", {
        method: "POST",
        body: formData
    })
        .then(res => res.text())
        .then(data => {

            console.log("RESPUESTA SERVIDOR:", data);

            if (data.trim() === "ok") {
                mostrarAlerta("Guardado correctamente 🔥", "Administrador");
                
                // Obtener referencias al modal
                const modal = document.getElementById("modalAdmin");
                
                cerrarModalAdmin();

                // Limpiar formulario
                document.getElementById("tituloInput").value = "";
                document.getElementById("descripcionInput").value = "";
                document.getElementById("precioInput").value = "";
                document.getElementById("categoriaInput").value = "";
                document.getElementById("imagenAdmin").value = "";
                
                // Limpiar imagen si es necesario
                if (modal) {
                    const preview = modal.querySelector("#previewAdmin");
                    const uploadBox = modal.querySelector(".upload-box");
                    
                    if (preview) {
                        preview.src = "";
                        preview.classList.remove("show");
                    }
                    if (uploadBox) {
                        uploadBox.classList.remove("has-image");
                        uploadBox.style.height = "auto"; // Restaurar altura inicial
                    }
                }
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