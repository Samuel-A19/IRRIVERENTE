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
 * CARGA INICIAL (RESUMEN)
 **************************************************/
document.addEventListener("DOMContentLoaded", () => {

    const datosCliente = JSON.parse(localStorage.getItem("datosCliente"));
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
    }

    /* ===== RESUMEN DEL PEDIDO ===== */
    const ul = document.getElementById("resumenProductos");
    const totalEl = document.getElementById("resumenTotal");

    if (!ul || !totalEl) return;

    ul.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        ul.innerHTML = "<li>Carrito vacío</li>";
        totalEl.textContent = formatoCOP(0);
        return;
    }

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
});

/**************************************************
 * FORMULARIO + PAGAR
 **************************************************/
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("paymentForm");
    const btnPagar = document.getElementById("btnPagar");

    if (!form || !btnPagar) return;

    btnPagar.disabled = true;

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

        btnPagar.disabled = false;
    });

    btnPagar.addEventListener("click", () => {

        const metodoPago = JSON.parse(localStorage.getItem("metodoPago"));
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        if (!metodoPago) {
            alert("Envía el formulario primero");
            return;
        }

        if (carrito.length === 0) {
            alert("El carrito está vacío");
            return;
        }

        if (metodoPago.metodo === "efectivo") {
            alert("Pedido confirmado. Pago en efectivo.");
            window.location.href = "Siguepedido.html";
            return;
        }
        console.log("Carrito enviado:", carrito);


        fetch("api/crear_pago.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ carrito })
        })
            .then(res => res.json())
            .then(data => {
                console.log("Respuesta MP:", data);

                if (data.error) {
                    alert(data.error);
                    return;
                }

                if (!data.sandbox_init_point) {
                    alert("No se pudo generar el pago");
                    console.error(data);
                    return;
                }

                window.location.href = data.sandbox_init_point;
            })
    });
});
/**************************************************
 * EDITAR DATOS
 **************************************************/
document.addEventListener("DOMContentLoaded", () => {

    const btnEditar = document.getElementById("btnEditar");
    const btnPagar = document.getElementById("btnPagar");
    const bloqueFormulario = document.getElementById("bloqueFormulario");
    const bloqueEntrega = document.getElementById("bloqueEntrega");

    if (!btnEditar) return;

    btnEditar.addEventListener("click", () => {
        // Mostrar formulario nuevamente
        bloqueFormulario.style.display = "block";

        // Ocultar resumen / entrega
        bloqueEntrega.style.display = "none";

        // Desactivar pagar hasta volver a enviar formulario
        if (btnPagar) btnPagar.disabled = true;
    });
});

