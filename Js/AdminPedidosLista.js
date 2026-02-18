document.addEventListener("DOMContentLoaded", cargarPedidos);

let pedidosGlobal = [];

/**************************************************
 * CARGAR TODOS LOS PEDIDOS DESDE BD
 **************************************************/
function cargarPedidos() {

    fetch("api/admin_obtener_pedidos.php")
        .then(res => res.json())
        .then(pedidos => {

            pedidosGlobal = pedidos;
            mostrarPedidos("todos");

        })
        .catch(error => {
            console.error("Error cargando pedidos:", error);
        });
}


/**************************************************
 * FILTRAR POR ESTADO
 **************************************************/
function filtrarPedidos() {
    const filtro = document.getElementById("filtroEstado").value;
    mostrarPedidos(filtro);
}


/**************************************************
 * MOSTRAR PEDIDOS
 **************************************************/
function mostrarPedidos(filtro) {

    const contenedor = document.getElementById("listaPedidos");
    contenedor.innerHTML = "";

    pedidosGlobal.forEach(pedido => {

        if (filtro === "todos" || filtro == pedido.estado) {

            const card = document.createElement("div");
            card.classList.add("pedido-card");

            card.innerHTML = `
                <div>
                    <strong>Pedido #${pedido.codigo_pedido}</strong><br>
                    Estado: ${traducirEstado(pedido.estado)}<br>
                    Total: $${Number(pedido.total).toLocaleString("es-CO")}
                </div>
                <button class="btn-ver" onclick="verPedido('${pedido.codigo_pedido}')">
                    Ver
                </button>
            `;

            contenedor.appendChild(card);
        }

    });

}


/**************************************************
 * TRADUCIR ESTADO
 **************************************************/
function traducirEstado(estado) {
    switch (parseInt(estado)) {
        case 0: return "Recibido";
        case 1: return "En preparación";
        case 2: return "En camino";
        case 3: return "Entregado";
        default: return "Desconocido";
    }
}


/**************************************************
 * IR A DETALLE
 **************************************************/
function verPedido(codigo) {
    window.location.href = "AdminPedido.html?codigo=" + codigo;
}
