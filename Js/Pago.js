document.addEventListener("DOMContentLoaded", () => {
    const datosCliente = JSON.parse(localStorage.getItem("datosCliente"));
    if (!datosCliente) return;

    document.getElementById("res-nombre").textContent = datosCliente.nombre || "—";
    document.getElementById("res-telefono").textContent = datosCliente.telefono || "—";
    document.getElementById("res-email").textContent = datosCliente.email || "—";
    document.getElementById("res-direccion").textContent = datosCliente.direccion || "—";
    document.getElementById("res-referencias").textContent = datosCliente.referencias || "—";
});



(function () {
    const form = document.getElementById('paymentForm');
    const radios = form.elements['paymentMethod'];
    const transferFields = document.getElementById('transferFields');
    const clearBtn = document.getElementById('clearBtn');

    const confirmation = document.getElementById('confirmation');
    const summary = document.getElementById('summary');

    function updateVisibility() {
        const method = form.paymentMethod.value;
        if (method === 'efectivo') {
            transferFields.classList.add('hidden');
        } else {
            transferFields.classList.remove('hidden');
        }
    }

    updateVisibility();
    Array.from(radios).forEach(r =>
        r.addEventListener('change', updateVisibility)
    );

    clearBtn.addEventListener('click', () => {
        form.reset();
        updateVisibility();
    });

    form.addEventListener("submit", (e) => {
    e.preventDefault();

    // llenar datos
    document.getElementById("res-nombre").textContent = form.customerName.value;
    document.getElementById("res-telefono").textContent = form.phone.value;
    document.getElementById("res-email").textContent = form.email.value;
    document.getElementById("res-direccion").textContent =
        JSON.parse(localStorage.getItem("datosCliente"))?.direccion || "";

    // 🔥 AQUÍ ESTÁ LA CLAVE
    document.getElementById("bloqueFormulario").style.display = "none";
    document.getElementById("bloqueEntrega").style.display = "block";
});


})();
