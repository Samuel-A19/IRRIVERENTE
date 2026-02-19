document.addEventListener("DOMContentLoaded", () => {

    const userId = localStorage.getItem("userId");

    if (!userId) {
        mostrarAlerta("Debes iniciar sesión", "Sesión requerida");
        window.location.href = "Inicio.html";
        return;
    }

    cargarHistorial(userId);
});

/**************************************************
 * CARGAR HISTORIAL
 **************************************************/
function cargarHistorial(userId) {

    fetch(`api/obtener_historial.php?id_usuario=${userId}`)
        .then(res => res.json())
        .then(pedidos => {

            const tbody = document.getElementById("tablaHistorial");
            if (!tbody) return;

            tbody.innerHTML = "";

            if (pedidos.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="5" style="text-align:center;">
                            No tienes pedidos aún.
                        </td>
                    </tr>
                `;
                return;
            }

            pedidos.forEach(p => {

                const estadosTexto = [
                    "Recibido",
                    "En preparación",
                    "En camino",
                    "Entregado"
                ];

                const clasesEstado = [
                    "recibido",
                    "en-preparacion",
                    "en-camino",
                    "entregado"
                ];

                const estadoTexto = estadosTexto[p.estado] ?? "Desconocido";
                const estadoClase = clasesEstado[p.estado] ?? "";

                const fecha = new Date(p.fecha).toLocaleDateString("es-CO");

                const fila = document.createElement("tr");

                fila.innerHTML = `
                    <td class="pedido-id">#${p.codigo_pedido}</td>
                    <td>${fecha}</td>
                    <td>
                        <span class="estado ${estadoClase}">
                            ${estadoTexto}
                        </span>
                    </td>
                    <td class="total">
                        $${Number(p.total).toLocaleString("es-CO")}
                    </td>
                    <td class="td-action">
                        <button class="btn-ver" onclick="verDetalle(${p.id})">
                            Ver
                        </button>
                    </td>
                `;

                tbody.appendChild(fila);
            });

        })
        .catch(error => {
            console.error("Error cargando historial:", error);
        });
}

/**************************************************
 * VER DETALLE DEL PEDIDO
 **************************************************/
function verDetalle(idPedido) {

    fetch(`api/obtener_detalle_pedido.php?id_pedido=${idPedido}`)
        .then(res => res.json())
        .then(productos => {

            const contenedor = document.getElementById("detalleContenido");
            const totalEl = document.getElementById("detalleTotal");

            contenedor.innerHTML = "";

            let total = 0;

            productos.forEach(p => {

                const subtotal = Number(p.precio) * Number(p.cantidad);
                total += subtotal;

                const div = document.createElement("div");
                div.classList.add("detalle-item");

                div.innerHTML = `
                    <span>${p.nombre_producto} x${p.cantidad}</span>
                    <span>$${subtotal.toLocaleString("es-CO")}</span>
                `;

                contenedor.appendChild(div);
            });

            totalEl.textContent = "$" + total.toLocaleString("es-CO");

            document.getElementById("modalDetalle").style.display = "flex";

        })
        .catch(error => {
            console.error("Error cargando detalle:", error);
        });
}

/**************************************************
 * CERRAR MODAL
 **************************************************/
function cerrarDetalle() {
    document.getElementById("modalDetalle").style.display = "none";
}
