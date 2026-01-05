document.addEventListener("DOMContentLoaded", () => {

    // REGISTRO
    document.querySelector('#registerModal .btn-modal')?.addEventListener('click', async (e) => {
        e.preventDefault();

        const nombre = document.querySelector('#registerModal input[placeholder="Nombre de usuario"]').value;
        const correo = document.querySelector('#registerModal input[placeholder="Correo electrónico"]').value;
        const contrasena = document.querySelector('#registerModal input[placeholder="Contraseña"]').value;

        if (!nombre || !correo || !contrasena) return alert("Completa todos los campos");

        try {
            const r = await fetch("api/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, correo, contrasena })
            });

            const text = await r.text();
            const result = JSON.parse(text);

            alert(result.mensaje || result.error);

            if (result.mensaje) {
                closeModal("registerModal");
                openModal("loginModal");
            }

        } catch (err) {
            alert("Error en el servidor");
        }
    });

    // LOGIN
    document.querySelector('#loginModal .btn-modal')?.addEventListener('click', async (e) => {
        e.preventDefault();

        const correo = document.getElementById('loginEmail').value;
        const contrasena = document.getElementById('loginPassword').value;

        if (!correo || !contrasena) return alert("Completa todos los campos");

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

                alert(result.mensaje);
                closeModal("loginModal");

                updateSessionState();
            } else alert(result.error);

        } catch (err) {
            
        }
    });

    // CAMBIO VISUAL SEGÚN SESIÓN
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
