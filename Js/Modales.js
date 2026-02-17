/* MODALES (open, close, switch) */
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


/* ===============================
   Cerrar modales al hacer click fuera
=============================== */

window.onclick = function (event) {
    const modals = [
        'loginModal',
        'registerModal',
        'recoverModal',
        'modalGeneral',
        'modalCrearProducto',
        'sizeModal'
    ];

    modals.forEach(id => {
        const modal = document.getElementById(id);
        if (modal && event.target === modal) {
            modal.style.display = "none";
        }
    });
};


/* ===============================
   ALERTAS PERSONALIZADAS
=============================== */

function mostrarAlerta(mensaje, titulo = "Atención") {
    const overlay = document.getElementById("alertOverlay");
    const title = document.getElementById("alertTitle");
    const message = document.getElementById("alertMessage");

    if (overlay && title && message) {
        title.textContent = titulo;
        message.textContent = mensaje;
        overlay.style.display = "flex";
    }
}

function cerrarAlerta() {
    const overlay = document.getElementById("alertOverlay");
    if (overlay) overlay.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    const alertOverlay = document.getElementById("alertOverlay");

    if (alertOverlay) {
        alertOverlay.addEventListener("click", function (e) {
            if (e.target.id === "alertOverlay") cerrarAlerta();
        });
    }
});

/* ===============================
   MODAL GENERAL (AGREGAR)
=============================== */

document.addEventListener("DOMContentLoaded", function () {

    const modalGeneral = document.getElementById("modalGeneral");

    if (modalGeneral) {

        // Abrir modal
        document.querySelectorAll(".btn-agregar").forEach(btn => {
            btn.addEventListener("click", function () {
                modalGeneral.style.display = "flex";
            });
        });

        // Cerrar con X
        const cerrar = modalGeneral.querySelector(".cerrar-modal");
        if (cerrar) {
            cerrar.addEventListener("click", function () {
                modalGeneral.style.display = "none";
            });
        }

        // Cerrar haciendo click fuera
        modalGeneral.addEventListener("click", function (e) {
            if (e.target === modalGeneral) {
                modalGeneral.style.display = "none";
            }
        });
    }

});
