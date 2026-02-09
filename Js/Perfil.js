document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       PERFIL
    =============================== */
    document.querySelector("#btnPerfil")?.addEventListener("click", () => {
        const nombre = document.querySelector("#nombre").value;
        const correo = document.querySelector("#correo").value;
        const telefono = document.querySelector("#phone").value;
        const ciudad = document.querySelector("#ciudad").value;
        const direccion = document.querySelector("#direccion").value;

        if (!/^[0-9]{10}$/.test(telefono)) {
            mostrarAlerta("El teléfono debe tener 10 dígitos", "Atención");
            return;
        }

        /* 👉 GUARDAR CORREO DEL USUARIO (CLAVE PARA ADMIN) */
        localStorage.setItem("usuarioCorreo", correo);

        mostrarAlerta("Datos actualizados correctamente", "Éxito");

        document.querySelector("#headerNombre").textContent = nombre;
        document.querySelector("#headerInfo").textContent = `${correo} | ${telefono}`;
    });

    /* ===============================
       BLOQUEAR LETRAS EN TELÉFONO
    =============================== */
    const phoneInput = document.getElementById("phone");
    phoneInput?.addEventListener("input", () => {
        phoneInput.value = phoneInput.value.replace(/[^0-9]/g, "");
    });

    /* ===============================
       IDIOMA
    =============================== */
    document.querySelector("#btnIdioma")?.addEventListener("click", () => {
        const idioma = document.querySelector("#idioma").value;
        mostrarAlerta(`Idioma actualizado a: ${idioma}`, "Información");
    });

    /* ===============================
       CAMBIO DE CONTRASEÑA
    =============================== */
    document.querySelector("#btnPassword")?.addEventListener("click", () => {
        const actual = document.querySelector("#passActual").value;
        const nueva = document.querySelector("#passNueva").value;

        if (!actual || !nueva) {
            mostrarAlerta("Llena ambos campos", "Atención");
            return;
        }

        if (nueva.length < 6) {
            mostrarAlerta("La contraseña debe tener al menos 6 caracteres", "Atención");
            return;
        }

        mostrarAlerta("Contraseña cambiada correctamente", "Éxito");
    });

    /* ===============================
       FOTO DE PERFIL
    =============================== */
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
            mostrarAlerta("Foto de perfil actualizada", "Éxito");
        };
        reader.readAsDataURL(file);
    });
});
