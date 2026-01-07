const form = document.getElementById('form-pedido-tienda');
const nombre = document.getElementById('nombre');
const telefono = document.getElementById('telefono');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Validar nombre
    if (nombre.value.trim() === '') {
        showError(nombre, 'err-nombre');
        valid = false;
    } else {
        hideError(nombre, 'err-nombre');
    }

    // Validar teléfono
    const telRegex = /^\d{7,15}$/;
    if (!telRegex.test(telefono.value.trim())) {
        showError(telefono, 'err-telefono');
        valid = false;
    } else {
        hideError(telefono, 'err-telefono');
    }

    // 👉 SI TODO ES VÁLIDO
    if (valid) {
        // Guardar datos del cliente (modo tienda)
        const datosCliente = {
            nombre: nombre.value.trim(),
            telefono: telefono.value.trim(),
            tipoPedido: "tienda"
        };

        localStorage.setItem("datosCliente", JSON.stringify(datosCliente));

        // Ir directamente al menú
        window.location.href = "Menu.html";
    }
});

// Funciones para mostrar/ocultar errores
function showError(input, errorId) {
    document.getElementById(errorId).style.display = 'block';
    input.classList.add('error');
}

function hideError(input, errorId) {
    document.getElementById(errorId).style.display = 'none';
    input.classList.remove('error');
}
