document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("btnContinuar");

    // Campos a validar
    const campos = [
        { id: "nombre", err: "err-nombre", type: "text" },
        { id: "telefono", err: "err-telefono", type: "text" },
        { id: "email", err: "err-email", type: "email" },
        { id: "direccion", err: "err-direccion", type: "text" }
    ];

    // Ocultar mensajes al teclear y quitar clase de error
    campos.forEach(c => {
        const input = document.getElementById(c.id);
        const msg = document.getElementById(c.err);
        if (!input || !msg) return;
        input.addEventListener("input", () => {
            msg.style.display = "none";
            input.classList.remove("input-error");
        });
    });

    btn.addEventListener("click", function (e) {
        e.preventDefault();

        let valido = true;

        campos.forEach(c => {
            const input = document.getElementById(c.id);
            const msg = document.getElementById(c.err);
            if (!input || !msg) return;

            const val = input.value.trim();

            if (c.type === "email") {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (val === "" || !re.test(val)) {
                    msg.textContent = val === "" ? "Campo obligatorio" : "Ingresa un correo válido";
                    msg.style.display = "block";
                    input.classList.add("input-error");
                    valido = false;
                    return;
                }
            } else {
                if (val === "") {
                    msg.textContent = "Campo obligatorio";
                    msg.style.display = "block";
                    input.classList.add("input-error");
                    valido = false;
                }
            }
        });

        if (valido) {
    // Guardar datos del cliente
    const datosCliente = {
    nombre: document.getElementById("nombre").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    email: document.getElementById("email").value.trim(),
    direccion: document.getElementById("direccion").value.trim(),
    referencias: document.getElementById("referencias").value.trim()
};

localStorage.setItem("datosCliente", JSON.stringify(datosCliente));

// Redirige al menú o pago
window.location.href = "Menu.html"; // o Pago.html según tu flujo

}
 else {
            // desplazar al primer error visible
            const primerError = document.querySelector(".error-msg[style*='display: block']");
            if (primerError) {
                primerError.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    });
});
