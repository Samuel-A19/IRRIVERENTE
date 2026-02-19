// CAMBIAR ESTADO DEL PEDIDO

function cambiarEstado() {
    const codigo = document.getElementById("adminCodigo").value;
    const estado = document.getElementById("estadoPedido").value;

    if (codigo.trim() === "") {
        mostrarAlerta("Ingrese el número de pedido");
        return;
    }

    // Obtener pedidos existentes
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || {};
    const ADMIN_EMAIL = "Samuelesssneider@gmail.com";


    // ===============================
    // VALIDAR ACCESO ADMIN
    // ===============================

    function validarAdmin() {

        const emailIngresado = document.getElementById("emailAdmin").value.trim();

        if (emailIngresado === "") {
            mostrarAlerta("Ingrese el correo de administrador");
            return;
        }

        if (emailIngresado === ADMIN_EMAIL) {

            document.getElementById("admin-pedidos").classList.remove("oculto-admin");

            localStorage.setItem("adminActivo", "true");

            mostrarAlerta("Acceso administrador concedido");

        } else {
            mostrarAlerta("Correo no autorizado");
        }
    }


    // ===============================
    // MANTENER SESIÓN ADMIN
    // ===============================

    document.addEventListener("DOMContentLoaded", function () {

        if (localStorage.getItem("adminActivo") === "true") {

            const adminPanel = document.getElementById("admin-pedidos");

            if (adminPanel) {
                adminPanel.classList.remove("oculto-admin");
            }
        }

        // ===============================
        // RECIBIR CÓDIGO DESDE URL
        // ===============================

        const params = new URLSearchParams(window.location.search);
        const codigo = params.get("codigo");

        if (codigo) {

            const inputCodigo = document.getElementById("adminCodigo");
            const selectEstado = document.getElementById("estadoPedido");

            if (inputCodigo) {
                inputCodigo.value = codigo;
            }

            let pedidos = JSON.parse(localStorage.getItem("pedidos")) || {};

            if (pedidos[codigo] !== undefined && selectEstado) {
                selectEstado.value = pedidos[codigo];
            }
        }

    });


    // ===============================
    // CERRAR SESIÓN ADMIN
    // ===============================

    function cerrarAdmin() {
        localStorage.removeItem("adminActivo");
        location.reload();
    }


    // ===============================
    // CAMBIAR ESTADO DEL PEDIDO
    // ===============================

    function cambiarEstado() {

        const codigo = document.getElementById("adminCodigo").value.trim();
        const estado = document.getElementById("estadoPedido").value;

        if (codigo === "") {
            mostrarAlerta("Ingrese el número de pedido");
            return;
        }

        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || {};

        pedidos[codigo] = parseInt(estado);

        localStorage.setItem("pedidos", JSON.stringify(pedidos));

        mostrarAlerta("Estado del pedido actualizado correctamente");
    }

    // Guardar estado del pedido
    pedidos[codigo] = parseInt(estado);

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    mostrarAlerta("Estado del pedido actualizado correctamente");
}


// ===============================
// RECIBIR CODIGO DESDE LA URL
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("codigo");

    if (codigo) {

        const inputCodigo = document.getElementById("adminCodigo");
        const selectEstado = document.getElementById("estadoPedido");

        if (inputCodigo) {
            inputCodigo.value = codigo;
        }

        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || {};

        if (pedidos[codigo] !== undefined && selectEstado) {
            selectEstado.value = pedidos[codigo];
        }
    }

});
