// ===============================
// ELEMENTOS
// ===============================
const msg = document.getElementById("recoverMsg");
function clearMsg() {
    msg.textContent = "";
}


const email = document.getElementById("recoverEmail");
const password = document.getElementById("recoverPassword");

const btnSend = document.getElementById("btnSend");
const btnVerify = document.getElementById("btnVerify");
const btnReset = document.getElementById("btnReset");

const stepEmail = document.getElementById("stepEmail");
const stepCode = document.getElementById("stepCode");
const stepPassword = document.getElementById("stepPassword");

const codeBoxes = document.querySelectorAll("#stepCode .code-box");

// ===============================
// FUNCIONES
// ===============================
function showStep(step) {
    stepEmail.style.display = "none";
    stepCode.style.display = "none";
    stepPassword.style.display = "none";

    step.style.display = "block";
}

// ===============================
// ENVIAR CÓDIGO
// ===============================
btnSend.addEventListener("click", () => {

    if (!email.value.trim()) {
        msg.textContent = "Escribe tu correo";
        return;
    }

    fetch("api/recover_send.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "correo=" + encodeURIComponent(email.value)
    })
        .then(res => res.text())
        .then(res => {
            if (res === "ok") {

                //  OCULTAR TODO EL PASO DEL CORREO
                stepEmail.style.display = "none";

                //  MOSTRAR PASO CÓDIGO
                stepCode.style.display = "block";

                //  MOSTRAR BOTONES DEL CÓDIGO
                btnVerify.style.display = "block";
                btnResend.style.display = "block";

                clearMsg();

                // limpiar y enfocar
                codeBoxes.forEach(box => box.value = "");
                codeBoxes[0].focus();

            } else {
                msg.textContent = res;
            }
        });
});



// ===============================
// COMPORTAMIENTO DE LOS 6 CUADROS
// ===============================
codeBoxes.forEach((box, index) => {

    box.addEventListener("input", () => {
        if (box.value && index < codeBoxes.length - 1) {
            codeBoxes[index + 1].focus();
        }
    });

    box.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !box.value && index > 0) {
            codeBoxes[index - 1].focus();
        }
    });

});

// ===============================
// VERIFICAR CÓDIGO
// ===============================
btnVerify.addEventListener("click", () => {

    let codigo = "";
    codeBoxes.forEach(box => codigo += box.value);

    if (codigo.length !== 6) {
        msg.textContent = "Ingresa el código completo";
        return;
    }

    fetch("api/recover_verify.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "codigo=" + encodeURIComponent(codigo)
    })
        .then(res => res.text())
        .then(res => {
            if (res === "ok") {

                // limpiar mensajes
                clearMsg();

                // ocultar el paso del código
                stepCode.style.display = "none";

                // mostrar el paso de la contraseña
                stepPassword.style.display = "";

                // MOSTRAR BOTÓN CAMBIAR CONTRASEÑA
                btnReset.style.display = "";

            } else {
                // solo mostrar mensaje si hay error
                msg.textContent = res;
            }

        });
});

// ===============================
// CAMBIAR CONTRASEÑA
// ===============================
btnReset.addEventListener("click", () => {

    if (!password.value.trim()) {
        msg.textContent = "Escribe una nueva contraseña";
        return;
    }

    fetch("api/recover_reset.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "password=" + encodeURIComponent(password.value)
    })
        .then(res => res.text())
        .then(res => {
            if (res === "ok") {
                msg.textContent = "Contraseña cambiada correctamente";
            } else {
                msg.textContent = res;
            }
        });
});
const btnResend = document.getElementById("btnResend");

btnResend.addEventListener("click", () => {

    msg.textContent = "Reenviando código...";

    fetch("api/recover_send.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "correo=" + encodeURIComponent(email.value)
    })
        .then(res => res.text())
        .then(res => {
            if (res === "ok") {
                msg.textContent = "Código reenviado a tu correo";

                // limpiar cuadros y enfocar primero
                codeBoxes.forEach(box => box.value = "");
                codeBoxes[0].focus();
            } else {
                msg.textContent = res;
            }
        });
});

function resetRecover() {

    // limpiar valores
    email.value = "";
    password.value = "";
    codeBoxes.forEach(box => box.value = "");

    // limpiar mensaje
    clearMsg();

    // volver al estado inicial SIN forzar layout
    stepCode.style.display = "none";
    stepPassword.style.display = "none";

    btnVerify.style.display = "none";
    btnResend.style.display = "none";
    btnReset.style.display = "none";

    // SOLO mostrar el paso email (como al inicio)
    stepEmail.style.display = "";
    btnSend.style.display = "";
}
