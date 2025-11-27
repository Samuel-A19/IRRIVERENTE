// ----------------------------------
// MENÚ LATERAL
// ----------------------------------
function abrirMenu() {
    document.getElementById("sideMenu").classList.add("active");
    document.getElementById("menuOverlay").classList.add("active");
}

function cerrarMenu() {
    document.getElementById("sideMenu").classList.remove("active");
    document.getElementById("menuOverlay").classList.remove("active");
}

document.getElementById("menuOverlay")?.addEventListener("click", cerrarMenu);


// ----------------------------------
// ACTUALIZAR SESIÓN (ya existente)
// ----------------------------------
function updateSessionState() {
    const loginLink = document.getElementById("loginLink");
    const logoutLink = document.getElementById("logoutLink");
    const userName = localStorage.getItem("userName");

    if (userName) {
        loginLink.innerHTML = `<i class="bi bi-person"></i> ${userName}`;
        loginLink.onclick = null;
        if (logoutLink) logoutLink.style.display = "inline";
    } else {
        loginLink.innerHTML = `<i class="bi bi-person"></i> INICIAR SESIÓN`;
        loginLink.onclick = () => openModal("loginModal");
        if (logoutLink) logoutLink.style.display = "none";
    }
}


// ----------------------------------
// MENÚ LATERAL CON CERRAR SESIÓN
// ----------------------------------
function actualizarMenuLateral() {
    const sideMenu = document.getElementById("sideMenu");
    const userName = localStorage.getItem("userName");

    sideMenu.innerHTML = `
        <h2>Mi Menú</h2>
        <a href="Historial.html">Historial de Pedidos</a><br>
        <a href="Ajustes.html">Ajustes</a><br>
        <a href="#" onclick="cerrarMenu()">Cerrar</a><br>
        ${userName ? `<a href="#" id="logoutSide">Cerrar sesión</a>` : ""}
    `;

    // Evento del botón "Cerrar sesión"
    document.getElementById("logoutSide")?.addEventListener("click", () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");

        updateSessionState();      // Actualiza header
        actualizarMenuLateral();   // Actualiza menú lateral
        cerrarMenu();              // Cierra menú lateral
    });
}


// ----------------------------------
// REACCIONES A CAMBIOS DE SESIÓN
// ----------------------------------
updateSessionState();
actualizarMenuLateral();

window.addEventListener("storage", (e) => {
    if (e.key === "userName") {
        updateSessionState();
        actualizarMenuLateral();
    }
});
