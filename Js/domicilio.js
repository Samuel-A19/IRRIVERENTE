document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form-pedido-domicilio");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre");
        const telefono = document.getElementById("telefono");
        const email = document.getElementById("email");
        const direccion = document.getElementById("direccion");
        const referencias = document.getElementById("referencias");

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
        validar(telefono, "err-telefono");
        validar(direccion, "err-direccion");

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

        // ✅ SI VIENE DESDE PAGO, REGRESA A PAGO
        if (localStorage.getItem("volverAPago") === "true") {
            localStorage.removeItem("volverAPago");
            window.location.href = "Pago.html";
        } else {
            window.location.href = "Menu.html";
        }


    });

    // 🔁 RELLENAR SI EXISTE
    const datos = JSON.parse(localStorage.getItem("datosCliente"));
    if (datos) {
        nombre.value = datos.nombre || "";
        telefono.value = datos.telefono || "";
        email.value = datos.email || "";
        direccion.value = datos.direccion || "";
        referencias.value = datos.referencias || "";
    }
});
