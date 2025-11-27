(function () {
    const form = document.getElementById('paymentForm');
    const radios = form.elements['paymentMethod'];
    const transferFields = document.getElementById('transferFields');
    const result = document.getElementById('result');
    const clearBtn = document.getElementById('clearBtn');

    function updateVisibility() {
        const method = form.paymentMethod.value;
        if (method === 'efectivo') {
            transferFields.classList.add('hidden');
        } else {
            transferFields.classList.remove('hidden');
        }
    }

    updateVisibility();
    Array.from(radios).forEach(r => r.addEventListener('change', updateVisibility));

    clearBtn.addEventListener('click', () => {
        form.reset();
        updateVisibility();
        result.classList.add('hidden');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.customerName.value.trim();
        const phone = form.phone.value.trim();
        const email = form.email.value.trim();
        const method = form.paymentMethod.value;

        if (!name || !phone || !email)
            return showError("Completa los datos principales.");

        if (method === "transferencia" && !form.bankName.value.trim())
            return showError("Selecciona un banco.");

        result.classList.remove("hidden");
        result.innerHTML = `Pago registrado: ${method}<br>Cliente: ${name}`;
    });

    function showError(msg) {
        result.classList.remove('hidden');
        result.textContent = msg;
    }
})();
