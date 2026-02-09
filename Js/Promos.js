function crearPromo() {
    const imagen = document.getElementById("promoImagen").files[0];
    const titulo = document.getElementById("promoTitulo").value;
    const descripcion = document.getElementById("promoDescripcion").value;
    const precio = document.getElementById("promoPrecio").value;

    if (!imagen || !titulo || !descripcion || !precio) {
        alert("Por favor completa todos los campos");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const promoContenedor = document.querySelector(".promo-contenedor");

        const promo = document.createElement("div");
        promo.classList.add("promo");

        promo.innerHTML = `
            <img src="${reader.result}" alt="${titulo}">
            <h2>${titulo}</h2>
            <p>${descripcion} <span>$${precio}</span></p>
            <button class="btn-promo">AÑADIR AL CARRITO</button>
        `;

        promoContenedor.appendChild(promo);
        closeModal('crearPromoModal');
    };

    reader.readAsDataURL(imagen);
}
function previewImagen(event) {
    const img = document.getElementById("previewPromo");
    img.src = URL.createObjectURL(event.target.files[0]);
    img.style.display = "block";

    // Ocultar icono y texto
    img.parentElement.querySelector("i").style.display = "none";
    img.parentElement.querySelector("span").style.display = "none";
}
