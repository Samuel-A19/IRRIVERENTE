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
    if (modal) modal.style.display = "none";
}


/* =====================================================
   GUARDAR PRODUCTO / PROMO CON IMAGEN
===================================================== */

function guardarAdmin() {

    const tipo = document.getElementById("tipoAdmin")?.value;
    const titulo = document.getElementById("tituloInput")?.value;
    const descripcion = document.getElementById("descripcionInput")?.value;
    const precio = document.getElementById("precioInput")?.value;
    const imagen = document.getElementById("imagenAdmin")?.files[0];

    if (!tipo || !titulo || !descripcion || !precio) {
        mostrarAlerta("Todos los campos son obligatorios");
        return;
    }

    const formData = new FormData();
    formData.append("tipo", tipo);
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
                cerrarModalAdmin();

                document.getElementById("tituloInput").value = "";
                document.getElementById("descripcionInput").value = "";
                document.getElementById("precioInput").value = "";
                document.getElementById("imagenAdmin").value = "";
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

    if (fileInput) {

        fileInput.addEventListener("change", function () {

            const file = fileInput.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    preview.src = e.target.result;
                    preview.style.display = "block";
                };

                reader.readAsDataURL(file);
            }
        });
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