console.log("Ajustes.js cargado");

document.addEventListener("DOMContentLoaded", () => {

    const userId = localStorage.getItem("userId");

    // ===============================
    // PROTECCIÓN DE SESIÓN
    // ===============================
    if (!userId) {
        alert("Debes iniciar sesión");
        window.location.href = "Inicio.html";
        return;
    }

    // ===============================
    // CARGAR USUARIO (NOMBRE / CORREO)
    // ===============================
    fetch(`api/obtener_usuario.php?id_usuario=${userId}`)
        .then(res => res.json())
        .then(data => {
            if (!data) return;

            // Inputs
            document.getElementById("nombre").value = data.nombre_completo ?? "";
            document.getElementById("correo").value = data.correo ?? "";

            // Header superior
            document.getElementById("headerNombre").textContent = data.nombre_completo;
            document.getElementById("headerInfo").textContent = data.correo;
        });

    // ===============================
    // CARGAR INFO DEL CLIENTE
    // ===============================
    fetch(`api/obtener_info_cliente.php?id_usuario=${userId}`)
        .then(res => res.json())
        .then(data => {
            if (!data) return;

            // Inputs
            document.getElementById("phone").value = data.telefono ?? "";
            document.getElementById("ciudad").value = data.ciudad ?? "";
            document.getElementById("direccion").value = data.direccion ?? "";

            // Header (correo + teléfono)
            const correo = document.getElementById("headerInfo").textContent;
            const telefono = data.telefono ? ` | ${data.telefono}` : "";
            document.getElementById("headerInfo").textContent = correo + telefono;

            // Foto
            if (data.foto) {
                document.getElementById("fotoPerfil").src = data.foto;
                document.getElementById("headerFoto").src = data.foto;
            }
        });

    // ===============================
    // GUARDAR PERFIL
    // ===============================
    document.getElementById("btnPerfil").addEventListener("click", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const telefono = document.getElementById("phone").value;
        const ciudad = document.getElementById("ciudad").value;
        const direccion = document.getElementById("direccion").value;

        // ---- USUARIO ----
        const dataUsuario = new FormData();
        dataUsuario.append("id_usuario", userId);
        dataUsuario.append("nombre", nombre);
        dataUsuario.append("correo", correo);

        fetch("api/guardar_usuario.php", {
            method: "POST",
            body: dataUsuario
        }).then(() => {
            localStorage.setItem("userName", nombre);
            document.getElementById("headerNombre").textContent = nombre;
            document.getElementById("headerInfo").textContent = correo;
        });

        // ---- INFO CLIENTE ----
        const dataCliente = new FormData();
        dataCliente.append("id_usuario", userId);
        dataCliente.append("telefono", telefono);
        dataCliente.append("ciudad", ciudad);
        dataCliente.append("direccion", direccion);

        fetch("api/guardar_info_cliente.php", {
            method: "POST",
            body: dataCliente
        })
            .then(res => res.text())
            .then(res => {
                if (res.trim() === "ok") {
                    document.getElementById("headerInfo").textContent =
                        correo + (telefono ? ` | ${telefono}` : "");
                    alert("Datos guardados correctamente");
                } else {
                    alert("Error al guardar datos");
                }
            });
    });

    // ===============================
    // CAMBIAR CONTRASEÑA
    // ===============================
    const btnCambiarClave = document.getElementById("btnCambiarClave");

    if (btnCambiarClave) {
        btnCambiarClave.addEventListener("click", (e) => {
            e.preventDefault();

            const claveActual = document.getElementById("claveActual").value;
            const nuevaClave = document.getElementById("nuevaClave").value;
            const confirmarClave = document.getElementById("confirmarClave").value;

            if (!claveActual || !nuevaClave || !confirmarClave) {
                alert("Completa todos los campos");
                return;
            }

            if (nuevaClave !== confirmarClave) {
                alert("Las contraseñas no coinciden");
                return;
            }

            const data = new FormData();
            data.append("id_usuario", userId);
            data.append("claveActual", claveActual);
            data.append("nuevaClave", nuevaClave);

            fetch("api/cambiar_contrasena.php", {
                method: "POST",
                body: data
            })
                .then(res => res.text())
                .then(res => {
                    if (res === "ok") {
                        alert("Contraseña actualizada correctamente");
                        document.getElementById("claveActual").value = "";
                        document.getElementById("nuevaClave").value = "";
                        document.getElementById("confirmarClave").value = "";
                    } else if (res === "clave_incorrecta") {
                        alert("La contraseña actual no es correcta");
                    } else {
                        alert("Error al cambiar la contraseña");
                    }
                });
        });
    }

});

// ===============================
// FOTO DE PERFIL
// ===============================
function abrirSelector() {
    document.getElementById("inputFoto").click();
}

document.getElementById("inputFoto").addEventListener("change", () => {

    const file = document.getElementById("inputFoto").files[0];
    if (!file) return;

    const userId = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("id_usuario", userId);
    formData.append("foto", file);

    fetch("api/subir_foto_perfil.php", {
        method: "POST",
        body: formData
    })
        .then(res => res.text())
        .then(res => {
            if (res === "ok") {
                const url = URL.createObjectURL(file);
                document.getElementById("fotoPerfil").src = url;
                document.getElementById("headerFoto").src = url;
                alert("Foto de perfil actualizada");
            } else {
                alert("Error al subir la foto");
            }
        });
});
