document.addEventListener("DOMContentLoaded", () => {

    // PERFIL
    document.querySelector("#btnPerfil")?.addEventListener("click", () => {
        const nombre = document.querySelector("#nombre").value;
        const correo = document.querySelector("#correo").value;
        const telefono = document.querySelector("#phone").value;
        const ciudad = document.querySelector("#ciudad").value;
        const direccion = document.querySelector("#direccion").value;

        if (!/^[0-9]{10}$/.test(telefono))
            return alert("El teléfono debe tener 10 dígitos.");

        alert(`Datos actualizados:\n\n${nombre}\n${correo}\n${telefono}`);

        document.querySelector("#headerNombre").textContent = nombre;
        document.querySelector("#headerInfo").textContent = `${correo} | ${telefono}`;
    });

    // Bloquear letras en teléfono
    const phoneInput = document.getElementById("phone");
    phoneInput?.addEventListener("input", () => {
        phoneInput.value = phoneInput.value.replace(/[^0-9]/g, "");
    });

    // Idioma
    document.querySelector("#btnIdioma")?.addEventListener("click", () => {
        const idioma = document.querySelector("#idioma").value;
        alert(`Idioma actualizado a: ${idioma}`);
    });

    // Cambio de contraseña
    document.querySelector("#btnPassword")?.addEventListener("click", () => {
        const actual = document.querySelector("#passActual").value;
        const nueva = document.querySelector("#passNueva").value;

        if (!actual || !nueva) return alert("Llena ambos campos.");
        if (nueva.length < 6) return alert("Contraseña muy corta.");

        alert("Contraseña cambiada correctamente.");
    });

    // FOTO PERFIL
    function abrirSelector() {
        document.getElementById("inputFoto").click();
    }

    document.getElementById("fotoPerfil")?.addEventListener("click", abrirSelector);
    document.getElementById("headerFoto")?.addEventListener("click", abrirSelector);

    document.getElementById("inputFoto")?.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById("fotoPerfil").src = e.target.result;
            document.getElementById("headerFoto").src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
});
