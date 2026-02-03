function mostrarAlerta(mensaje, tipo = "Atención") {
    const overlay = document.getElementById("alertOverlay");
    const title = document.getElementById("alertTitle");
    const text = document.getElementById("alertMessage");

    if (!overlay || !title || !text) {
        console.error("Alerta no encontrada en el DOM");
        return;
    }

    title.textContent = tipo;
    text.textContent = mensaje;
    overlay.style.display = "flex";
}

function cerrarAlerta() {
    const overlay = document.getElementById("alertOverlay");
    if (overlay) overlay.style.display = "none";
}
