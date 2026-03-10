// ----------------------------------
// CERRAR MODALES AL HACER CLICK FUERA
// ----------------------------------
window.onclick = function (event) {

    const modalPrivacidad = document.getElementById("modalPrivacidad");
    const modalTerminos = document.getElementById("modalTerminos");

    if (event.target === modalPrivacidad) {
        modalPrivacidad.style.display = "none";
    }

    if (event.target === modalTerminos) {
        modalTerminos.style.display = "none";
    }
};

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", function (event) {

    let modales = document.querySelectorAll(".modal");

    modales.forEach(function (modal) {

        if (event.target === modal) {
            modal.style.display = "none";
        }

    });

});