function cargarHistorial() {
    const userId = localStorage.getItem('userId');
    const noLogueado = document.getElementById('noLogueado');
    const tablaPedidos = document.getElementById('tablaPedidos');
    const sinPedidos = document.getElementById('sinPedidos');
    const listaPedidos = document.getElementById('listaPedidos');

    if (!userId) {
        noLogueado.style.display = 'block';
        tablaPedidos.style.display = 'none';
        return;
    }

    noLogueado.style.display = 'none';

    fetch("api/obtener_pedidos.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
    })
        .then(res => res.json())
        .then(data => {
            if (!data.pedidos?.length) {
                sinPedidos.style.display = "block";
                tablaPedidos.style.display = "none";
                return;
            }

            tablaPedidos.style.display = "block";
            sinPedidos.style.display = "none";
            listaPedidos.innerHTML = "";

            data.pedidos.forEach(p => {
                const fila = document.createElement('tr');
                let clase =
                    p.estado === "Entregado"
                        ? "estado-entregado"
                        : p.estado === "Cancelado"
                            ? "estado-cancelado"
                            : "estado-preparacion";

                fila.innerHTML = `
          <td>${p.numero_pedido}</td>
          <td>${p.fecha}</td>
          <td class="${clase}">${p.estado}</td>
          <td>$${parseFloat(p.total).toFixed(2)}</td>
          <td><button onclick="verDetallesPedido('${p.id_pedido}')">Ver Detalles</button></td>
        `;

                listaPedidos.appendChild(fila);
            });
        });
}

function verDetallesPedido(id) {
    alert("Detalles del pedido: " + id);
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".historial-pedidos")) cargarHistorial();

    window.addEventListener("storage", e => {
        if (e.key === "userId") cargarHistorial();
    });
});
