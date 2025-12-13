document.addEventListener("DOMContentLoaded", () => {

    const btnCarrito = document.getElementById("btnCarrito");
    const carritoDropdown = document.getElementById("carritoDropdown");
    const contadorCarrito = document.getElementById("contadorCarrito");  // ← este es tu contador
    const carritoLista = document.getElementById("carritoLista");
    const totalTexto = document.querySelector(".carrito-total p");
    const botonesAñadir = document.querySelectorAll(".btn-add, .btn-promo");

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const parsePrecio = (str) => parseFloat((str || "").replace(/[^\d.]/g, "")) || 0;
    const formatPrecio = (n) => n.toLocaleString();

    const actualizarCarrito = () => {
        if (carritoLista) carritoLista.innerHTML = "";

        let contador = 0;
        let total = 0;

        carrito.forEach(item => {
            const li = document.createElement("li");
            li.className = "carrito-item";
            li.dataset.nombre = item.nombre;

            li.innerHTML = `
      ${item.imagen ? `<img src="${item.imagen}">` : ""}
      <div class="carrito-info">
        <p>${item.nombre}</p>
        <span>$${formatPrecio(item.precio)}</span>
      </div>
      <div class="acciones">
        <button class="menos"><i class="fa-solid fa-circle-minus"></i></button>
        <span class="cantidad">${item.cantidad}</span>
        <button class="mas"><i class="fa-solid fa-circle-plus"></i></button>
        <button class="eliminar"><i class="fa-solid fa-trash"></i></button>
      </div>`;

            carritoLista.appendChild(li);

            contador += item.cantidad;
            total += item.precio * item.cantidad;
        });

        // ← AQUÍ ESTÁ EL CONTADOR QUE QUERÍAS
        if (contadorCarrito) {
            contadorCarrito.textContent = contador;
            contadorCarrito.style.display = contador > 0 ? "inline-block" : "none";
        }

        if (totalTexto) totalTexto.textContent = `Total: $${formatPrecio(total)}`;

        localStorage.setItem('carrito', JSON.stringify(carrito));

        if (carrito.length === 0 && carritoLista) {
            carritoLista.innerHTML = '<p style="text-align:center;padding:20px;">El carrito está vacío</p>';
        }
    };

    // TU DROPDOWN DEL CARRITO (sin cambios)
    if (btnCarrito && carritoDropdown) {
        btnCarrito.addEventListener("click", (e) => {
            e.stopPropagation();
            carritoDropdown.style.display =
                carritoDropdown.style.display === "flex" ? "none" : "flex";
        });

        document.addEventListener("click", (e) => {
            if (!btnCarrito.contains(e.target) && !carritoDropdown.contains(e.target)) {
                carritoDropdown.style.display = "none";
            }
        });
    }

    // PRODUCTOS NORMALES (pastas, bebidas, etc) → siguen funcionando igual
    botonesAñadir.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Si el botón abre el modal de tamaño → no hacemos nada aquí
            if (btn.getAttribute("onclick")?.includes("openSizeModal")) return;

            const container = btn.closest(".card, .promo");
            if (!container) return;

            const nombre = container.querySelector("h3")?.textContent.trim();
            const precio = parsePrecio(container.querySelector("span")?.textContent);
            const imagen = container.querySelector("img")?.src;

            const existing = carrito.find(i => i.nombre === nombre);
            if (existing) existing.cantidad++;
            else carrito.push({ nombre, precio, cantidad: 1, imagen });

            actualizarCarrito();
        });
    });

    // ACCIONES DENTRO DEL CARRITO (+ / - / eliminar)
   if (carritoLista) {
    carritoLista.addEventListener("click", (e) => {
        e.stopPropagation();   // ← ESTA ES LA LÍNEA QUE NECESITAS (evita que se cierre el carrito)

        const btn = e.target.closest("button");
        if (!btn) return;

        const item = btn.closest(".carrito-item");
        const nombre = item.dataset.nombre;
        const index = carrito.findIndex(i => i.nombre === nombre);

        if (index === -1) return;

        if (btn.classList.contains("mas")) carrito[index].cantidad++;
        else if (btn.classList.contains("menos"))
            carrito[index].cantidad > 1 ? carrito[index].cantidad-- : carrito.splice(index, 1);
        else if (btn.classList.contains("eliminar")) carrito.splice(index, 1);

        actualizarCarrito();
    });
}

    // Botones de abajo
    document.querySelector(".carrito-acciones .seguir")?.addEventListener("click", () => {
        carritoDropdown.style.display = "none";
    });

    document.querySelector(".carrito-acciones .checkout")?.addEventListener("click", () => {
        if (carrito.length > 0 && confirm("¿Finalizar compra?")) {
            alert("¡Redirigiendo al pago!");
            carrito = [];
            actualizarCarrito();
        }
    });

    // ← FUNCIÓN GLOBAL PARA EL MODAL DE TAMAÑO (esto es lo ÚNICO que agregué)
    window.agregarDesdeModal = (nombreCompleto, precio) => {
        const existing = carrito.find(i => i.nombre === nombreCompleto);
        if (existing) {
            existing.cantidad++;
        } else {
            carrito.push({ nombre: nombreCompleto, precio, cantidad: 1 });
        }
        actualizarCarrito();
    };

    actualizarCarrito();
});

