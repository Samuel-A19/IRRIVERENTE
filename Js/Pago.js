/**************************************************
 * UTILIDADES
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
 * INICIO
 **************************************************/
document.addEventListener("DOMContentLoaded", () => {

    // 🔒 VALIDAR SESIÓN
    const userId = localStorage.getItem("userId");
    if (!userId) {
        alert("Debes iniciar sesión");
        window.location.href = "Inicio.html";
        return;
    }

    const datosCliente = JSON.parse(localStorage.getItem("datosCliente"));
    let metodoPago = JSON.parse(localStorage.getItem("metodoPago"));
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const form = document.getElementById("paymentForm");
    const btnPagar = document.getElementById("btnPagar");
    const btnEditar = document.getElementById("btnEditar");
    const clearBtn = document.getElementById("clearBtn");

    const phone = document.getElementById("phone");
    const inputNombre = document.getElementById("customerName");
    const inputEmail = document.getElementById("email");

    const bloqueFormulario = document.getElementById("bloqueFormulario");
    const bloqueEntrega = document.getElementById("bloqueEntrega");
    const resumenPedido = document.getElementById("resumenPedido");
    const accionesPago = document.querySelector(".acciones-pago");

    const ul = document.getElementById("resumenProductos");
    const totalEl = document.getElementById("resumenTotal");

    if (!form || !btnPagar) return;

    btnPagar.disabled = true;

    /**************************************************
     * AUTORELLENAR
     **************************************************/
    if (datosCliente) {
        if (inputNombre) inputNombre.value = datosCliente.nombre || "";
        if (phone) phone.value = datosCliente.telefono || "";
        if (inputEmail) inputEmail.value = datosCliente.email || "";
    }

    if (datosCliente) {
        const set = (id, valor) => {
            const el = document.getElementById(id);
            if (el) el.textContent = valor || "—";
        };

        set("res-nombre", datosCliente.nombre);
        set("res-telefono", datosCliente.telefono);
        set("res-email", datosCliente.email);
        set("res-direccion", datosCliente.direccion);
        set("res-referencias", datosCliente.referencias);
    }

    if (phone) {
        phone.addEventListener("input", () => {
            phone.value = phone.value.replace(/\D/g, "").slice(0, 10);
        });
    }

    /**************************************************
     * MÉTODO DE PAGO
     **************************************************/
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {

        if (metodoPago && metodoPago.metodo === radio.value) {
            radio.checked = true;
            document.getElementById("res-metodo").textContent =
                radio.value === "efectivo" ? "Efectivo" : "Pago en Línea";
        }

        radio.addEventListener("change", () => {
            metodoPago = { metodo: radio.value };
            localStorage.setItem("metodoPago", JSON.stringify(metodoPago));

            document.getElementById("res-metodo").textContent =
                radio.value === "efectivo" ? "Efectivo" : "Pago en Línea";
        });
    });

    /**************************************************
     * RESUMEN
     **************************************************/
    if (ul && totalEl) {
        ul.innerHTML = "";
        let total = 0;

        carrito.forEach(p => {
            const subtotal = limpiarPrecio(p.precio) * (Number(p.cantidad) || 1);
            const li = document.createElement("li");
            li.textContent = `${p.nombre} x${p.cantidad} — ${formatoCOP(subtotal)}`;
            ul.appendChild(li);
            total += subtotal;
        });

        totalEl.textContent = formatoCOP(total);
    }

    /**************************************************
     * FORMULARIO
     **************************************************/
    form.addEventListener("submit", e => {
        e.preventDefault();

        if (!phone || phone.value.length !== 10) {
            alert("El teléfono debe tener 10 números");
            return;
        }

        bloqueFormulario.style.display = "none";
        bloqueEntrega.style.display = "block";
        resumenPedido.style.display = "block";
        accionesPago.style.display = "flex";

        btnPagar.disabled = false;
    });

    /**************************************************
     * PAGAR
     **************************************************/
    btnPagar.addEventListener("click", () => {

        if (!metodoPago || carrito.length === 0) {
            alert("Información de pago incompleta");
            return;
        }

        fetch("api/crear_pago.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_usuario: userId,
                carrito: carrito
            })
        })
            .then(res => res.json())
            .then(data => {

                // 💵 EFECTIVO
                if (metodoPago.metodo === "efectivo") {
                    alert("Pedido confirmado. Pagarás en efectivo al recibir.");
                    localStorage.removeItem("carrito");
                    window.location.href = "Siguepedido.html";
                    return;
                }

                // 💳 MERCADO PAGO
                if (!data.sandbox_init_point) {
                    alert("No se pudo generar el pago");
                    console.error(data);
                    return;
                }

                window.location.href = data.sandbox_init_point;
            });
    });

    /**************************************************
     * LIMPIAR
     **************************************************/
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            form.reset();
            btnPagar.disabled = true;

            accionesPago.style.display = "none";
            resumenPedido.style.display = "none";
            bloqueEntrega.style.display = "none";
            bloqueFormulario.style.display = "block";

            localStorage.removeItem("metodoPago");
        });
    }

    /**************************************************
     * EDITAR
     **************************************************/
    if (btnEditar) {
        btnEditar.addEventListener("click", () => {
            localStorage.setItem("volverAPago", "true");
            window.location.href = "Domicilio.html";
        });
    }

});
