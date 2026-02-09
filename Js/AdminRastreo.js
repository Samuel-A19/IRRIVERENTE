const ADMIN_EMAIL = "Samuelesssneider@gmail.com";


// VALIDAR ACCESO ADMIN

function validarAdmin() {
    const emailIngresado = document.getElementById("emailAdmin").value.trim();

    if (emailIngresado === "") {
        alert("Ingrese el correo de administrador");
        return;
    }

    if (emailIngresado === ADMIN_EMAIL) {
        document.getElementById("admin-pedidos").classList.remove("oculto-admin");

        // Guardar sesión admin
        localStorage.setItem("adminActivo", "true");

        alert("Acceso administrador concedido");
    } else {
        alert("Correo no autorizado");
    }
}


// MANTENER SESIÓN ADMIN

window.onload = function () {
    if (localStorage.getItem("adminActivo") === "true") {
        const adminPanel = document.getElementById("admin-pedidos");
        if (adminPanel) {
            adminPanel.classList.remove("oculto-admin");
        }
    }
};


// CERRAR SESIÓN ADMIN 

function cerrarAdmin() {
    localStorage.removeItem("adminActivo");
    location.reload();
}


// CAMBIAR ESTADO DEL PEDIDO

function cambiarEstado() {
    const codigo = document.getElementById("adminCodigo").value;
    const estado = document.getElementById("estadoPedido").value;

    if (codigo.trim() === "") {
        alert("Ingrese el número de pedido");
        return;
    }

    // Obtener pedidos existentes
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || {};

    // Guardar estado del pedido
    pedidos[codigo] = parseInt(estado);

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    alert("Estado del pedido actualizado correctamente");
}
