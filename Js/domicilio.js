document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form-pedido-domicilio");

    // ✅ INPUTS DECLARADOS UNA SOLA VEZ (FIX SCOPE)
    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email");
    const direccion = document.getElementById("direccion");
    const referencias = document.getElementById("referencias");

    // 🔢 SOLO NÚMEROS + MÁX 10 EN TELÉFONO
    telefono.addEventListener("input", () => {
        telefono.value = telefono.value.replace(/\D/g, "");
        if (telefono.value.length > 10) {
            telefono.value = telefono.value.slice(0, 10);
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let valido = true;

        const validar = (input, errId) => {
            const msg = document.getElementById(errId);
            if (input.value.trim() === "") {
                msg.textContent = "Campo obligatorio";
                msg.style.display = "block";
                input.classList.add("input-error");
                valido = false;
            } else {
                msg.style.display = "none";
                input.classList.remove("input-error");
            }
        };

        validar(nombre, "err-nombre");
        validar(direccion, "err-direccion");

        // 📞 VALIDACIÓN TELÉFONO
        if (telefono.value.length !== 10) {
            const err = document.getElementById("err-telefono");
            err.textContent = "Debe tener 10 números";
            err.style.display = "block";
            telefono.classList.add("input-error");
            valido = false;
        } else {
            document.getElementById("err-telefono").style.display = "none";
            telefono.classList.remove("input-error");
        }

        // ✉️ VALIDACIÓN EMAIL
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email.value.trim())) {
            document.getElementById("err-email").textContent = "Correo inválido";
            document.getElementById("err-email").style.display = "block";
            email.classList.add("input-error");
            valido = false;
        } else {
            document.getElementById("err-email").style.display = "none";
            email.classList.remove("input-error");
        }

        if (!valido) return;

        // ✅ GUARDAR DATOS
        const datosCliente = {
            nombre: nombre.value.trim(),
            telefono: telefono.value.trim(),
            email: email.value.trim(),
            direccion: direccion.value.trim(),
            referencias: referencias.value.trim()
        };

        localStorage.setItem("datosCliente", JSON.stringify(datosCliente));

        // 🔁 REDIRECCIÓN
        if (localStorage.getItem("volverAPago") === "true") {
            localStorage.removeItem("volverAPago");
            window.location.href = "Pago.html";
        } else {
            window.location.href = "Menu.html";
        }
    });

    // 🔁 RELLENAR FORMULARIO SI EXISTE
    const datos = JSON.parse(localStorage.getItem("datosCliente"));
    if (datos) {
        nombre.value = datos.nombre || "";
        telefono.value = datos.telefono || "";
        email.value = datos.email || "";
        direccion.value = datos.direccion || "";
        referencias.value = datos.referencias || "";
    }
});
