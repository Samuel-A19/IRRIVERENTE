const form = document.getElementById('form-pedido-tienda');
const nombre = document.getElementById('nombre');
const telefono = document.getElementById('telefono');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita enviar el formulario automáticamente
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

    // Si todo es válido, se puede enviar el formulario o hacer otra acción
    if (valid) {
        alert('Formulario válido. Continuar con el pedido.');
        form.reset(); // Opcional: limpia el formulario
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
