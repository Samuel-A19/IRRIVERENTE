document.addEventListener("DOMContentLoaded", () => {

    const userId = localStorage.getItem("userId");

    // 🔒 Protección de sesión
    if (!userId) {
        alert("Debes iniciar sesión");
        window.location.href = "Inicio.html";
        return;
    }

    const nombreEl = document.getElementById("historialNombre");
    const fotoEl = document.getElementById("historialFoto");

    // ===============================
    // CARGAR NOMBRE DEL USUARIO
    // ===============================
    fetch(`api/obtener_usuario.php?id_usuario=${userId}`)
        .then(res => res.json())
        .then(data => {
            if (data && nombreEl) {
                nombreEl.textContent = data.nombre_completo;
            }
        });

    // ===============================
    // CARGAR FOTO DE PERFIL
    // ===============================
    fetch(`api/obtener_info_cliente.php?id_usuario=${userId}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.foto && fotoEl) {
                fotoEl.src = data.foto;
            }
        });

});
