/**************************************************
 * FORMATO COP Y LIMPIEZA DE PRECIOS
 **************************************************/
function formatoCOP(valor) {
    return valor.toLocaleString("es-CO", {
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

    // ===== DATOS CLIENTE =====
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

        // Autocompletar formulario
        if (document.getElementById("customerName")) {
            document.getElementById("customerName").value = datosCliente.nombre || "";
            document.getElementById("phone").value = datosCliente.telefono || "";
            document.getElementById("email").value = datosCliente.email || "";
        }
    }

    // ===== MÉTODO DE PAGO =====
    if (metodoPago) {
        document.getElementById("res-metodo").textContent =
            metodoPago.banco || metodoPago.metodo;
    }

    // ===== RESUMEN DEL PEDIDO =====
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
const form = document.getElementById("paymentForm");
const transferFields = document.getElementById("transferFields");

if (form) {
    const radios = document.querySelectorAll('input[name="paymentMethod"]');

    radios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.value === "efectivo") {
                transferFields.classList.add("hidden");
            } else {
                transferFields.classList.remove("hidden");
            }
        });
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const metodo = form.paymentMethod.value;
        const banco = metodo === "transferencia"
            ? form.bankName.value
            : "Efectivo";

        if (metodo === "transferencia" && !banco) {
            alert("Selecciona Nequi o Bancolombia");
            return;
        }

        localStorage.setItem("metodoPago", JSON.stringify({
            metodo,
            banco
        }));

        document.getElementById("res-metodo").textContent = banco;

        document.getElementById("bloqueFormulario").style.display = "none";
        document.getElementById("bloqueEntrega").style.display = "block";
    });
}


/**************************************************
 * BOTÓN PAGAR
 **************************************************/
document.getElementById("btnPagar")?.addEventListener("click", () => {
    const metodoPago = JSON.parse(localStorage.getItem("metodoPago"));

    if (!metodoPago) {
        alert("Selecciona un método de pago");
        return;
    }

    if (metodoPago.banco === "Nequi") {
        alert("Realiza el pago por Nequi y presiona 'Ya pagué'");
        window.open("https://nequi.com.co/", "_blank");
    } 
    else if (metodoPago.banco === "Bancolombia") {
        alert("Realiza el pago por Bancolombia y presiona 'Ya pagué'");
        window.open("https://www.bancolombia.com/personas", "_blank");
    } 
    else {
        alert("Pedido confirmado. Pago en efectivo.");
    }
});


/**************************************************
 * BOTÓN EDITAR DATOS
 **************************************************/
document.getElementById("btnEditar")?.addEventListener("click", () => {
    localStorage.setItem("volverAPago", "true");
    window.location.href = "Domicilio.html";
});
