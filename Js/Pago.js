/**************************************************
 * FORMATO COP Y LIMPIEZA DE PRECIOS
 **************************************************/
function formatoCOP(valor) {
    return Number(valor).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
    });
}

function limpiarPrecio(valor) {
    if (typeof valor === "string") {
        valor = valor.replace(/\./g, "").replace(",", ".");
    }
    return Number(valor) || 0;
}

/**************************************************
 * CARGA INICIAL
 **************************************************/
document.addEventListener("DOMContentLoaded", () => {
    const datosCliente = JSON.parse(localStorage.getItem("datosCliente"));
    const metodoPago = JSON.parse(localStorage.getItem("metodoPago"));
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    /* ===== DATOS CLIENTE ===== */
    if (datosCliente) {
        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val || "—";
        };

        set("res-nombre", datosCliente.nombre);
        set("res-telefono", datosCliente.telefono);
        set("res-email", datosCliente.email);
        set("res-direccion", datosCliente.direccion);
        set("res-referencias", datosCliente.referencias);

        if (document.getElementById("customerName")) {
            document.getElementById("customerName").value = datosCliente.nombre || "";
            document.getElementById("phone").value = datosCliente.telefono || "";
            document.getElementById("email").value = datosCliente.email || "";
        }
    }

    /* ===== MÉTODO DE PAGO ===== */
    if (metodoPago) {
        document.getElementById("res-metodo").textContent =
            metodoPago.banco || metodoPago.metodo;
    }

    /* ===== RESUMEN DEL PEDIDO ===== */
    const ul = document.getElementById("resumenProductos");
    const totalEl = document.getElementById("resumenTotal");

    if (ul && totalEl) {
        ul.innerHTML = "";
        let total = 0;

        carrito.forEach(p => {
            const precio = limpiarPrecio(p.precio);
            const cantidad = Number(p.cantidad) || 1;
            const subtotal = precio * cantidad;

            const li = document.createElement("li");
            li.textContent = `${p.nombre} x${cantidad} — ${formatoCOP(subtotal)}`;
            ul.appendChild(li);

            total += subtotal;
        });

        totalEl.textContent = formatoCOP(total);
    }
});

/**************************************************
 * FORMULARIO DE PAGO
 **************************************************/
document.addEventListener("DOMContentLoaded", () => {
    console.log("Pago.js cargado");

    const form = document.getElementById("paymentForm");
    const btnPagar = document.getElementById("btnPagar");

    if (!form || !btnPagar) {
        console.error("Formulario o botón no encontrados");
        return;
    }

    // ENVIAR PAGO
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const metodo = form.paymentMethod.value;

        localStorage.setItem("metodoPago", JSON.stringify({ metodo }));

        document.getElementById("res-metodo").textContent =
            metodo === "efectivo" ? "Efectivo" : "Mercado Pago";

        document.getElementById("bloqueFormulario").style.display = "none";
        document.getElementById("bloqueEntrega").style.display = "block";
        document.getElementById("resumenPedido").style.display = "block";
        document.querySelector(".acciones-pago").style.display = "flex";

        console.log("Formulario enviado");
    });

    // PAGAR AHORA
    btnPagar.addEventListener("click", () => {
        console.log("Click en PAGAR AHORA");

        const metodoPago = JSON.parse(localStorage.getItem("metodoPago"));

        if (!metodoPago) {
            alert("No hay método de pago");
            return;
        }

        // EFECTIVO
        if (metodoPago.metodo === "efectivo") {
            alert("Pedido confirmado. Pago en efectivo.");
            window.location.href = "Siguepedido.html";
            return;
        }

        // MERCADO PAGO
        fetch("api/crear_pago.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                carrito: JSON.parse(localStorage.getItem("carrito")) || [],
                cliente: JSON.parse(localStorage.getItem("datosCliente"))
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log("Respuesta Mercado Pago:", data);
                if (data.init_point) {
                    window.location.href = data.init_point;
                } else {
                    alert("Mercado Pago no respondió correctamente");
                }
            })
            .catch(err => {
                console.error(err);
                alert("Error de conexión con el servidor");
            });
    });
});

/**************************************************
 * BOTÓN EDITAR DATOS (VOLVER A DOMICILIO)
 **************************************************/
document.getElementById("btnEditar")?.addEventListener("click", () => {
    console.log("Click en EDITAR DATOS");

    // Bandera correcta
    localStorage.setItem("volverAPago", "true");

    window.location.href = "Domicilio.html";
});




