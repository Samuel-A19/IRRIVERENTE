// ----------------------------------
// MENÚ LATERAL (ABRIR / CERRAR)
// ----------------------------------
function abrirMenu() {
    document.getElementById("sideMenu")?.classList.add("active");
    document.getElementById("menuOverlay")?.classList.add("active");
}

function cerrarMenu() {
    document.getElementById("sideMenu")?.classList.remove("active");
    document.getElementById("menuOverlay")?.classList.remove("active");
}

document.getElementById("menuOverlay")?.addEventListener("click", cerrarMenu);


// ----------------------------------
// ACTUALIZAR HEADER (LOGIN LINK)
// ----------------------------------
function updateSessionState() {
    const loginLink = document.getElementById("loginLink");
    const userName = localStorage.getItem("userName");

    if (!loginLink) return;

    if (userName) {
        loginLink.innerHTML = `<i class="bi bi-person"></i> ${userName}`;
        loginLink.onclick = null;
    } else {
        loginLink.innerHTML = `<i class="bi bi-person"></i> INICIAR SESIÓN`;
        loginLink.onclick = () => openModal("loginModal");
    }
}


// ----------------------------------
// ACTUALIZAR MENÚ LATERAL (NOMBRE + FOTO)
// ----------------------------------
function actualizarMenuLateral() {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    const sideNombre = document.getElementById("sideNombre");
    const sideFoto = document.getElementById("sideFoto");

    // Si no hay sesión
    if (!userId) {
        if (sideNombre) sideNombre.textContent = "Invitado";
        if (sideFoto) {
            sideFoto.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        }
        return;
    }

    // Nombre (localStorage)
    if (sideNombre && userName) {
        sideNombre.textContent = userName;
    }

    // Foto (BD)
    fetch(`api/obtener_info_cliente.php?id_usuario=${userId}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.foto && sideFoto) {
                sideFoto.src = data.foto;
            }
        });

    // Botón cerrar sesión
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.onclick = (e) => {
            e.preventDefault();

            localStorage.removeItem("userId");
            localStorage.removeItem("userName");

            updateSessionState();
            actualizarMenuLateral();

            window.location.href = "Inicio.html";
        };
    }
}


// ----------------------------------
// INICIALIZACIÓN
// ----------------------------------
document.addEventListener("DOMContentLoaded", () => {
    updateSessionState();
    actualizarMenuLateral();
});

// Escuchar cambios entre pestañas
window.addEventListener("storage", (e) => {
    if (e.key === "userName" || e.key === "userId") {
        updateSessionState();
        actualizarMenuLateral();
    }
});
// ----------------------------------
// MOSTRAR / OCULTAR MENÚ SEGÚN SESIÓN
// ----------------------------------
function controlarMenuPorSesion() {
    const userId = localStorage.getItem("userId");

    const btnMenu = document.getElementById("btnMenuLateral");
    const sideMenu = document.getElementById("sideMenu");
    const overlay = document.getElementById("menuOverlay");

    if (!btnMenu || !sideMenu || !overlay) return;

    if (!userId) {
        // ❌ SIN SESIÓN → OCULTAR
        btnMenu.style.display = "none";
        sideMenu.classList.remove("active");
        sideMenu.style.display = "none";
        overlay.style.display = "none";
    } else {
        // ✅ CON SESIÓN → MOSTRAR
        btnMenu.style.display = "";   // vuelve al CSS original
        sideMenu.style.display = "";  // NO cambia posición
        overlay.style.display = "";   // NO cambia posición
    }
}

// ----------------------------------
// EJECUCIÓN AUTOMÁTICA
// ----------------------------------
document.addEventListener("DOMContentLoaded", controlarMenuPorSesion);

// Detectar login / logout EN TIEMPO REAL
window.addEventListener("storage", (e) => {
    if (e.key === "userId") {
        controlarMenuPorSesion();
    }
});
