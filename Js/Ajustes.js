console.log("Ajustes.js cargado");

document.addEventListener("DOMContentLoaded", () => {

    const userId = localStorage.getItem("userId");

    /* ===============================
       PROTECCIÓN DE SESIÓN
    =============================== */
    if (!userId) {
        mostrarAlerta("Debes iniciar sesión", "Atención");
        setTimeout(() => {
            window.location.href = "Inicio.html";
        }, 1200);
        return;
    }

    /* ===============================
       CARGAR USUARIO
    =============================== */
    fetch(`api/obtener_usuario.php?id_usuario=${userId}`)
        .then(res => res.json())
        .then(data => {
            if (!data) return;

            document.getElementById("nombre").value = data.nombre_completo ?? "";
            document.getElementById("correo").value = data.correo ?? "";

            document.getElementById("headerNombre").textContent = data.nombre_completo;
            document.getElementById("headerInfo").textContent = data.correo;
        });

    /* ===============================
       CARGAR INFO CLIENTE
    =============================== */
    fetch(`api/obtener_info_cliente.php?id_usuario=${userId}`)
        .then(res => res.json())
        .then(data => {
            if (!data) return;

            document.getElementById("phone").value = data.telefono ?? "";
            document.getElementById("ciudad").value = data.ciudad ?? "";
            document.getElementById("direccion").value = data.direccion ?? "";

            const correo = document.getElementById("headerInfo").textContent;
            const telefono = data.telefono ? ` | ${data.telefono}` : "";
            document.getElementById("headerInfo").textContent = correo + telefono;

            if (data.foto) {
                document.getElementById("fotoPerfil").src = data.foto;
                document.getElementById("headerFoto").src = data.foto;
            }
        });

    /* ===============================
       GUARDAR PERFIL
    =============================== */
    document.getElementById("btnPerfil").addEventListener("click", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const telefono = document.getElementById("phone").value;
        const ciudad = document.getElementById("ciudad").value;
        const direccion = document.getElementById("direccion").value;

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
                    mostrarAlerta("Datos guardados correctamente", "Éxito");
                } else {
                    mostrarAlerta("Error al guardar datos", "Error");
                }
            });
    });

    /* ===============================
       CAMBIAR CONTRASEÑA
    =============================== */
    const btnCambiarClave = document.getElementById("btnCambiarClave");

    if (btnCambiarClave) {
        btnCambiarClave.addEventListener("click", (e) => {
            e.preventDefault();

            const claveActual = document.getElementById("claveActual").value;
            const nuevaClave = document.getElementById("nuevaClave").value;
            const confirmarClave = document.getElementById("confirmarClave").value;

            if (!claveActual || !nuevaClave || !confirmarClave) {
                mostrarAlerta("Completa todos los campos", "Atención");
                return;
            }

            if (nuevaClave !== confirmarClave) {
                mostrarAlerta("Las contraseñas no coinciden", "Error");
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
                        mostrarAlerta("Contraseña actualizada correctamente", "Éxito");
                        document.getElementById("claveActual").value = "";
                        document.getElementById("nuevaClave").value = "";
                        document.getElementById("confirmarClave").value = "";
                    } else if (res === "clave_incorrecta") {
                        mostrarAlerta("La contraseña actual no es correcta", "Error");
                    } else {
                        mostrarAlerta("Error al cambiar la contraseña", "Error");
                    }
                });
        });
    }
});

/* ===============================
   FOTO DE PERFIL
=============================== */
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
                mostrarAlerta("Foto de perfil actualizada", "Éxito");
            } else {
                mostrarAlerta("Error al subir la foto", "Error");
            }
        });
});
