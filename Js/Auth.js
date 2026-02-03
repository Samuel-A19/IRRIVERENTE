document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       REGISTRO
    =============================== */
    document.querySelector('#registerModal .btn-modal')?.addEventListener('click', async (e) => {
        e.preventDefault();

        const nombre = document.querySelector('#registerModal input[placeholder="Nombre de usuario"]').value.trim();
        const correo = document.querySelector('#registerModal input[placeholder="Correo electrónico"]').value.trim();
        const contrasena = document.querySelector('#registerModal input[placeholder="Contraseña"]').value.trim();

        if (!nombre || !correo || !contrasena) {
            mostrarAlerta("Completa todos los campos", "Atención");
            return;
        }

        try {
            const r = await fetch("api/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, correo, contrasena })
            });

            const result = await r.json();

            if (result.mensaje) {
                mostrarAlerta(result.mensaje, "Éxito");

                setTimeout(() => {
                    cerrarAlerta();
                    closeModal("registerModal");
                    openModal("loginModal");
                }, 1500);

            } else {
                mostrarAlerta(result.error || "Error al registrarse", "Error");
            }

        } catch {
            mostrarAlerta("Error en el servidor", "Error");
        }
    });

    /* ===============================
       LOGIN
    =============================== */
    document.querySelector('#loginModal .btn-modal')?.addEventListener('click', async (e) => {
        e.preventDefault();

        const correo = document.getElementById('loginEmail').value.trim();
        const contrasena = document.getElementById('loginPassword').value.trim();

        if (!correo || !contrasena) {
            mostrarAlerta("Completa todos los campos", "Atención");
            return;
        }

        try {
            const r = await fetch("api/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo, contrasena })
            });

            const result = await r.json();

            if (result.mensaje) {
                localStorage.setItem("userId", result.id_usuario);
                localStorage.setItem("userName", result.nombre);

                mostrarAlerta(result.mensaje, "Éxito");

                setTimeout(() => {
                    cerrarAlerta();
                    closeModal("loginModal");
                    updateSessionState();
                }, 1000);

            } else {
                mostrarAlerta(result.error || "Credenciales incorrectas", "Error");
            }

        } catch {
            mostrarAlerta("Error en el servidor", "Error");
        }
    });

    /* ===============================
       SESIÓN / UI
    =============================== */
    const loginLink = document.getElementById("loginLink");
    const logoutLink = document.getElementById("logoutLink");

    function updateSessionState() {
        const userName = localStorage.getItem("userName");

        if (userName) {
            loginLink.innerHTML = `<i class="bi bi-person"></i> ${userName}`;
            loginLink.onclick = null;
            logoutLink.style.display = "inline";
        } else {
            loginLink.innerHTML = `<i class="bi bi-person"></i> INICIAR SESIÓN`;
            loginLink.onclick = () => openModal("loginModal");
            logoutLink.style.display = "none";
        }
    }

    updateSessionState();

    logoutLink?.addEventListener("click", () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        updateSessionState();
    });

    window.addEventListener("storage", (e) => {
        if (e.key === "userName") updateSessionState();
    });
});

/* ===============================
   CERRAR SESIÓN DESDE MENÚ LATERAL
=============================== */
document.addEventListener("DOMContentLoaded", () => {

    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (!btnCerrarSesion) return;

    btnCerrarSesion.addEventListener("click", (e) => {
        e.preventDefault();

        localStorage.removeItem("userId");
        localStorage.removeItem("userName");

        window.location.href = "Inicio.html";
    });
});
