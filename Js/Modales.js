/* MODALES (open, close, switch) */
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    if (id === "recoverModal") {
        resetRecover();
    }
}
function switchModal(current, target) {
    closeModal(current);
    openModal(target);
}


window.onclick = function (event) {
    const modals = ['loginModal', 'registerModal', 'recoverModal'];
    modals.forEach(id => {
        const modal = document.getElementById(id);
        if (event.target === modal) modal.style.display = "none";
    });
};

function mostrarAlerta(mensaje, titulo = "Atención") {
  document.getElementById("alertTitle").textContent = titulo;
  document.getElementById("alertMessage").textContent = mensaje;
  document.getElementById("alertOverlay").style.display = "flex";
}

function cerrarAlerta() {
  document.getElementById("alertOverlay").style.display = "none";
}

document.getElementById("alertOverlay").addEventListener("click", e => {
  if (e.target.id === "alertOverlay") cerrarAlerta();
});

mostrarAlerta("Código enviado al correo", "Información");
mostrarAlerta("Contraseña cambiada con éxito", "Éxito");
/* ===========================
   MODAL GENERAL (AGREGAR)
=========================== */

document.addEventListener("DOMContentLoaded", function () {

    const modalGeneral = document.getElementById("modalGeneral");

    if (!modalGeneral) return;

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

});
