const form = document.getElementById("form-pedido-tienda");
const nombre = document.getElementById("nombre");
const telefono = document.getElementById("telefono");

// 🔢 SOLO NÚMEROS + MÁX 10
telefono.addEventListener("input", () => {
    telefono.value = telefono.value.replace(/\D/g, "");
    if (telefono.value.length > 10) {
        telefono.value = telefono.value.slice(0, 10);
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    // 👤 VALIDAR NOMBRE
    if (nombre.value.trim() === "") {
        showError(nombre, "err-nombre", "Campo obligatorio");
        valid = false;
    } else {
        hideError(nombre, "err-nombre");
    }

    // 📞 VALIDAR TELÉFONO (10 DÍGITOS)
    if (telefono.value.length !== 10) {
        showError(telefono, "err-telefono", "Debe tener 10 números");
        valid = false;
    } else {
        hideError(telefono, "err-telefono");
    }

    // ✅ TODO OK
    if (!valid) return;

    const datosCliente = {
        nombre: nombre.value.trim(),
        telefono: telefono.value.trim(),
        tipoPedido: "tienda"
    };

    localStorage.setItem("datosCliente", JSON.stringify(datosCliente));

    window.location.href = "Menu.html";
});

// 🧩 HELPERS
function showError(input, errorId, mensaje) {
    const err = document.getElementById(errorId);
    err.textContent = mensaje;
    err.style.display = "block";
    input.classList.add("input-error");
}

function hideError(input, errorId) {
    document.getElementById(errorId).style.display = "none";
    input.classList.remove("input-error");
}
