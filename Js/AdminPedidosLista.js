document.addEventListener("DOMContentLoaded", cargarPedidos);

function cargarPedidos() {
    mostrarPedidos("todos");
}

function filtrarPedidos() {
    const filtro = document.getElementById("filtroEstado").value;
    mostrarPedidos(filtro);
}

function mostrarPedidos(filtro) {

    const contenedor = document.getElementById("listaPedidos");
    contenedor.innerHTML = "";

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || {};

    for (let codigo in pedidos) {

        let estado = pedidos[codigo];

        if (filtro === "todos" || filtro == estado) {

            const card = document.createElement("div");
            card.classList.add("pedido-card");

            card.innerHTML = `
                <div>
                    <strong>Pedido #${codigo}</strong><br>
                    Estado: ${traducirEstado(estado)}
                </div>
                <button class="btn-ver" onclick="verPedido('${codigo}')">
                    Ver
                </button>
            `;

            contenedor.appendChild(card);
        }
    }
}

function traducirEstado(estado) {
    switch (parseInt(estado)) {
        case 0: return "Recibido";
        case 1: return "En preparación";
        case 2: return "En camino";
        case 3: return "Entregado";
        default: return "Desconocido";
    }
}

function verPedido(codigo) {
    window.location.href = "./AdminPedido.html?codigo=" + codigo;
}
