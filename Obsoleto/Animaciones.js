/*INICIO*/

/***************************
 * 1. FUNCIONALIDAD DE MODALES (LOGIN, REGISTRO, ETC.)
 ***************************/

// Abre un modal, estableciendo su estilo 'display' a 'flex' para mostrarlo
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}

// Cierra un modal, estableciendo su estilo 'display' a 'none' para ocultarlo
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Cierra el modal actual y abre el modal de destino
function switchModal(current, target) {
  closeModal(current);
  openModal(target);
}

// Cierre automático al hacer clic fuera del contenido del modal
window.onclick = function (event) {
  // Lista de IDs de los modales a gestionar
  const modals = ['loginModal', 'registerModal', 'recoverModal'];
  modals.forEach(id => {
    const modal = document.getElementById(id);
    // Comprueba si el clic ocurrió directamente sobre el fondo del modal
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

/*********************************
 * 2. INICIALIZACIÓN DEL DOM Y CARRUSEL
 *********************************/

// Ejecuta el código una vez que el DOM ha sido completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa el carrusel Swiper
  // Configura el carrusel para mostrar 2 slides (o 1 en móviles) con loop y autoplay
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 2, // Muestra 2 slides por defecto
    spaceBetween: 20,
    loop: true,
    centeredSlides: false,
    autoplay: {
      delay: 3000, // Cambia cada 3 segundos
    },
    breakpoints: { // Configuración responsive
      768: { slidesPerView: 2 },
      480: { slidesPerView: 1 }
    }
  });

  /********************************
   * 3. LÓGICA DEL CARRITO DE COMPRAS *
   ********************************/

  // Referencias a elementos del DOM del carrito
  const btnCarrito = document.getElementById("btnCarrito");
  const carritoDropdown = document.getElementById("carritoDropdown");
  const contadorCarrito = document.getElementById("contadorCarrito");
  const carritoLista = document.getElementById("carritoLista");
  const totalTexto = document.querySelector(".carrito-total p");
  // Botones para añadir productos, tanto de la tarjeta normal como de promociones
  const botonesAñadir = document.querySelectorAll(".btn-add, .btn-promo");

  // Carga el estado del carrito desde localStorage o inicializa un array vacío
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Utilidad: Convierte una cadena de precio (ej. "10$") a un número decimal (ej. 10.00)
  const parsePrecio = (str) => {
    if (!str) return 0;
    // Elimina cualquier caracter que no sea dígito o punto
    const cleaned = str.replace(/[^\d.]/g, "");
    return parseFloat(cleaned) || 0;
  };

  // Utilidad: Formatea un número a una cadena de precio con 2 decimales (ej. 10 → "10.00")
  const formatPrecio = (n) => n.toFixed(2);

  // Función principal para renderizar el carrito en el DOM y guardar en localStorage
  const actualizarCarrito = () => {
    if (carritoLista) carritoLista.innerHTML = ""; // Limpia la lista actual

    let contador = 0; // Para el número total de artículos
    let total = 0; // Para la suma total de precios

    carrito.forEach((item, index) => {
      // Crea el elemento <li> para cada producto del carrito
      const li = document.createElement("li");
      li.className = "carrito-item";
      // Guarda datos importantes en atributos para su posterior gestión (ej. + / - / eliminar)
      li.dataset.nombre = item.nombre;
      li.dataset.precio = item.precio;
      // Estructura HTML del ítem con imagen, info y botones de acción
      li.innerHTML = `
 ${item.imagen ? `<img src="${item.imagen}" alt="${item.nombre}">` : ""}
 <div class="carrito-info">
 <p>${item.nombre}</p>
 <span>${formatPrecio(item.precio)}$</span>
 </div>
 <div class="acciones">
 <button class="menos"><i class="fa-solid fa-circle-minus"></i></button>
 <span class="cantidad">${item.cantidad}</span>
 <button class="mas"><i class="fa-solid fa-circle-plus"></i></button>
 <button class="eliminar"><i class="fa-solid fa-trash"></i></button>
 </div>
`;
      carritoLista.appendChild(li);

      // Actualiza el contador y el total
      contador += item.cantidad;
      total += item.precio * item.cantidad;
    });

    // Actualiza el contador visual y su visibilidad
    if (contadorCarrito) {
      contadorCarrito.textContent = contador;
      contadorCarrito.style.display = contador > 0 ? "inline-block" : "none";
    }
    // Actualiza el texto del total
    if (totalTexto) {
      totalTexto.textContent = `Total: ${formatPrecio(total)}$`;
    }

    // Guarda el estado actual del carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Muestra mensaje si el carrito está vacío
    if (carrito.length === 0 && carritoLista) {
      carritoLista.innerHTML = '<p style="text-align: center; padding: 20px;">El carrito está vacío</p>';
    }
  };

  // Eventos para mostrar/ocultar el carrito al hacer clic en su icono
  if (btnCarrito && carritoDropdown) {
    btnCarrito.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // Evita que se propague el clic
      // Alterna la visibilidad
      carritoDropdown.style.display = carritoDropdown.style.display === "flex" ? "none" : "flex";
    });

    // Oculta el carrito al hacer clic en cualquier parte fuera de él o del botón
    document.addEventListener("click", (e) => {
      if (!btnCarrito.contains(e.target) && !carritoDropdown.contains(e.target)) {
        carritoDropdown.style.display = "none";
      }
    });
  }

  // Evento para añadir productos al hacer clic en los botones de "Añadir"
  botonesAñadir.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Encuentra el contenedor principal del producto (tarjeta o promoción)
      const container = btn.closest(".card, .promo");
      if (!container) return;

      // Extrae los datos del producto
      const nombre = (container.querySelector("h3")?.textContent || "Producto").trim();
      const precioStr = (container.querySelector("span")?.textContent || "0").trim();
      const imgSrc = container.querySelector("img")?.getAttribute("src") || "";
      const precio = parsePrecio(precioStr);

      // Busca si el producto ya existe en el carrito
      const existingItem = carrito.find(item => item.nombre === nombre);

      if (existingItem) {
        // Si existe, solo aumenta la cantidad
        existingItem.cantidad += 1;
      } else {
        // Si no existe, añade el nuevo producto
        carrito.push({
          nombre,
          precio,
          cantidad: 1,
          imagen: imgSrc
        });
      }

      actualizarCarrito(); // Refresca la vista y el localStorage
    });
  });

  // Delegación de eventos: Gestiona los clics en los botones + / - / eliminar dentro de la lista del carrito
  if (carritoLista) {
    carritoLista.addEventListener("click", (e) => {
      e.stopPropagation();
      const btn = e.target.closest("button"); // Encuentra el botón clicado
      if (!btn) return;

      const item = btn.closest(".carrito-item");
      const nombre = item.dataset.nombre;
      // Encuentra el índice del producto en el array del carrito
      const itemIndex = carrito.findIndex(i => i.nombre === nombre);

      if (itemIndex === -1) return;

      if (btn.classList.contains("mas")) {
        // Aumenta la cantidad
        carrito[itemIndex].cantidad += 1;
      } else if (btn.classList.contains("menos")) {
        if (carrito[itemIndex].cantidad > 1) {
          // Disminuye la cantidad
          carrito[itemIndex].cantidad -= 1;
        } else {
          // Si la cantidad es 1 y se presiona 'menos', elimina el ítem
          carrito.splice(itemIndex, 1);
        }
      } else if (btn.classList.contains("eliminar")) {
        // Elimina el ítem completamente
        carrito.splice(itemIndex, 1);
      }

      actualizarCarrito(); // Refresca la vista y el localStorage
    });
  }

  // Botón "Seguir comprando" (solo cierra el dropdown)
  const btnSeguir = document.querySelector(".carrito-acciones .seguir");
  if (btnSeguir) {
    btnSeguir.addEventListener("click", () => {
      carritoDropdown.style.display = "none";
    });
  }

  // Botón "Finalizar compra" (simulación: vacía el carrito)
  const btnCheckout = document.querySelector(".carrito-acciones .checkout");
  if (btnCheckout) {
    btnCheckout.addEventListener("click", () => {
      carrito = []; // Vacía el array del carrito
      actualizarCarrito(); // Actualiza la vista y guarda el carrito vacío
      // Se podría añadir aquí lógica de redirección o confirmación de pago real
    });
  }

  // Inicializar el carrito al cargar la página por primera vez
  actualizarCarrito();


  /************************************
   * 4. GESTIÓN DE AUTENTICACIÓN (REGISTRO / LOGIN) *
   ************************************/

  // Evento de Registro
  document.querySelector('#registerModal .btn-modal').addEventListener('click', async (e) => {
    e.preventDefault();
    // Captura los valores de los campos
    const nombre = document.querySelector('#registerModal input[placeholder="Nombre de usuario"]').value;
    const correo = document.querySelector('#registerModal input[placeholder="Correo electrónico"]').value;
    const contrasena = document.querySelector('#registerModal input[placeholder="Contraseña"]').value;

    if (!nombre || !correo || !contrasena) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const data = { nombre, correo, contrasena };
    try {
      // Envía la solicitud al backend (api/register.php)
      const response = await fetch('api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const text = await response.text();
      console.log('Respuesta cruda (registro):', text);
      const result = JSON.parse(text); // Parsea la respuesta JSON

      alert(result.mensaje || result.error);
      if (result.mensaje) {
        // Si el registro es exitoso, cambia al modal de login
        closeModal('registerModal');
        openModal('loginModal');
      }
    } catch (error) {
      console.error('Error (registro):', error.message);
      alert(`Error al conectar con el servidor: ${error.message}`);
    }
  });

  // Evento de Inicio de Sesión (Login)
  document.querySelector('#loginModal .btn-modal').addEventListener('click', async (e) => {
    e.preventDefault();
    // Captura los valores de los campos
    const correo = document.getElementById('loginEmail').value;
    const contrasena = document.getElementById('loginPassword').value;

    if (!correo || !contrasena) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const data = { correo, contrasena };
    try {
      // Envía la solicitud al backend (api/login.php)
      const response = await fetch('api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json(); // Parsea la respuesta JSON
      console.log('LOGIN RESPUESTA:', result); // Depuración

      if (result.mensaje) {
        // Si el login es exitoso, guarda datos del usuario en localStorage
        localStorage.setItem('userId', result.id_usuario);
        localStorage.setItem('userName', result.nombre); // Guarda el nombre del usuario

        alert(result.mensaje);
        closeModal('loginModal');

        // Actualiza la interfaz para reflejar el estado de sesión
        const loginLink = document.getElementById('loginLink');
        const logoutLink = document.getElementById('logoutLink');
        if (loginLink) {
          loginLink.innerHTML = `<i class="bi bi-person"></i> ${result.nombre}`; // Muestra el nombre
          loginLink.onclick = null; // Desactiva la apertura del modal de login
        }
        if (logoutLink) {
          logoutLink.style.display = 'inline'; // Muestra el botón de Logout
        }
      } else {
        alert(result.error || 'Error desconocido');
      }
    } catch (error) {
      console.error('ERROR LOGIN:', error);
      alert('Error de conexión. Verifica que "api/login.php" exista y sea accesible');
    }
  });

  // Referencias a los enlaces de sesión
  const loginLink = document.getElementById('loginLink');
  const logoutLink = document.getElementById('logoutLink');
  const savedUserName = localStorage.getItem('userName');

  // Función para actualizar la UI según si hay sesión iniciada o no
  function updateSessionState() {
    const currentUserName = localStorage.getItem('userName');
    if (currentUserName && loginLink && logoutLink) {
      // Si hay sesión: Muestra el nombre y el botón de cerrar sesión
      loginLink.innerHTML = `<i class="bi bi-person"></i> ${currentUserName}`;
      loginLink.onclick = null; // No abre el modal
      logoutLink.style.display = 'inline';
    } else if (loginLink) {
      // Si no hay sesión: Muestra "INICIAR SESIÓN" y oculta el botón de cerrar sesión
      loginLink.innerHTML = '<i class="bi bi-person"></i> INICIAR SESIÓN';
      loginLink.onclick = () => openModal('loginModal'); // Abre el modal de login
      logoutLink.style.display = 'none';
    }
  }

  // Llama a la función para establecer el estado de sesión al cargar
  updateSessionState();

  // Manejar el Logout (Cerrar Sesión)
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      // Elimina la información de sesión de localStorage
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      updateSessionState(); // Actualiza la UI
      alert('Sesión cerrada con éxito');
    });
  }

  // Escucha cambios en localStorage (ej. login/logout desde otra pestaña) para mantener la sincronización
  window.addEventListener('storage', (event) => {
    if (event.key === 'userName') {
      updateSessionState();
    }
  });
});
function iniciarRastreo() {
  const codigo = document.getElementById("codigoRastreo").value.trim();

  if (codigo === "") {
    alert("Por favor ingresa tu codigo de pedido.");
    return; //No iniciar animación
  }

  // Si tiene código, iniciar animación
  trackOrder();
}

function trackOrder() {
  const steps = document.querySelectorAll(".progress-tracker .step");
  const statusText = document.querySelector(".status-text");
  const statusIcon = document.querySelector(".status-icon-large");

  const estados = [
    { texto: "Recibido", icono: "✓" },
    { texto: "En preparación", icono: "📦" },
    { texto: "En camino", icono: "🚚" },
    { texto: "Entregado", icono: "🎯" }
  ];

  let index = 0;

  // Resetear estados visuales SIEMPRE antes de comenzar
  steps.forEach(s => {
    s.classList.remove("completed", "active");
  });

  function avanzarEstado() {
    // Poner activo
    steps[index].classList.add("active");
    statusText.textContent = estados[index].texto;
    statusIcon.textContent = estados[index].icono;

    // Después del tiempo, desactivar y pasar al siguiente
    setTimeout(() => {
      steps[index].classList.remove("active");
      steps[index].classList.add("completed");

      index++;

      if (index < steps.length) {
        avanzarEstado();
      }
    }, 3000);
  }

  avanzarEstado();
}

function abrirSoporte() {
  const numero = "573228651543";
  const url = "https://wa.me/" + numero;

  window.open(url, "_blank"); // abre en nueva pestaña
}
// ========== PERFIL + DIRECCIÓN ==========
document.addEventListener("DOMContentLoaded", () => {

  const btnPerfil = document.querySelector("#btnPerfil");

  btnPerfil?.addEventListener("click", () => {

    const nombre = document.querySelector("#nombre").value;
    const correo = document.querySelector("#correo").value;
    const telefono = document.querySelector("#phone").value;
    const ciudad = document.querySelector("#ciudad").value;
    const direccion = document.querySelector("#direccion").value;

    // Validar número de teléfono
    if (!/^[0-9]{10}$/.test(telefono)) {
      alert("⚠ El número de teléfono debe tener exactamente 10 dígitos y solo números.");
      return;
    }

    // Confirmación en pantalla
    alert(
      `✔ Datos actualizados:\n\n` +
      `Nombre: ${nombre}\n` +
      `Correo: ${correo}\n` +
      `Teléfono: ${telefono}\n` +
      `Ciudad: ${ciudad}\n` +
      `Dirección: ${direccion}`
    );

    // Actualizar encabezado
    document.querySelector("#headerNombre").textContent = nombre;
    document.querySelector("#headerInfo").textContent = `${correo} | ${telefono}`;
  });

});


// ========== BLOQUEAR LETRAS EN TELÉFONO ==========
const phoneInput = document.getElementById('phone');

phoneInput?.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/[^0-9]/g, "");
});


// ========== PREFERENCIAS ==========
document.querySelector("#btnIdioma")?.addEventListener("click", () => {
  const idioma = document.querySelector("#idioma").value;
  alert(`🌐 Idioma actualizado a: ${idioma}`);
});


// ========== SEGURIDAD ==========
document.querySelector("#btnPassword")?.addEventListener("click", () => {
  const actual = document.querySelector("#passActual").value;
  const nueva = document.querySelector("#passNueva").value;

  if (actual === "" || nueva === "") {
    alert("⚠ Debes llenar ambos campos.");
    return;
  }

  if (nueva.length < 6) {
    alert("⚠ La nueva contraseña debe tener al menos 6 caracteres.");
    return;
  }

  alert("🔒 Contraseña cambiada correctamente.");
});

function abrirSelector() {
  document.getElementById("inputFoto").click();
}

document.getElementById("inputFoto").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    // Cambiar la foto dentro del recuadro
    document.getElementById("fotoPerfil").src = e.target.result;

    // Cambiar la foto del encabezado
    document.querySelector(".user-header img").src = e.target.result;
  };

  reader.readAsDataURL(file);
});

function abrirSelector() {
  document.getElementById("inputFoto").click();
}

// Permitir abrir selector desde el botón "Cambiar foto"
document.getElementById("fotoPerfil").addEventListener("click", abrirSelector);

// Permitir abrir selector desde la bolita de arriba
document.getElementById("headerFoto").addEventListener("click", abrirSelector);

// Procesar la imagen seleccionada
document.getElementById("inputFoto").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    // Cambiar foto del recuadro
    document.getElementById("fotoPerfil").src = e.target.result;

    // Cambiar foto de la barra superior
    document.getElementById("headerFoto").src = e.target.result;
  };

  reader.readAsDataURL(file);
});
/************************************
 * 5. CARGAR HISTORIAL DE PEDIDOS
 ************************************/

// Función para cargar y mostrar el historial de pedidos del usuario logueado
function cargarHistorial() {
  const userId = localStorage.getItem('userId');
  const noLogueado = document.getElementById('noLogueado');
  const tablaPedidos = document.getElementById('tablaPedidos');
  const sinPedidos = document.getElementById('sinPedidos');
  const listaPedidos = document.getElementById('listaPedidos');

  // Si no hay usuario logueado, mostrar mensaje
  if (!userId) {
    if (noLogueado) noLogueado.style.display = 'block';
    if (tablaPedidos) tablaPedidos.style.display = 'none';
    if (sinPedidos) sinPedidos.style.display = 'none';
    return;
  }

  // Usuario logueado: cargar sus pedidos
  if (noLogueado) noLogueado.style.display = 'none';

  fetch('api/obtener_pedidos.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Pedidos recibidos:', data);

      if (data.error) {
        console.error('Error:', data.error);
        if (sinPedidos) sinPedidos.style.display = 'block';
        if (tablaPedidos) tablaPedidos.style.display = 'none';
        return;
      }

      if (data.pedidos && data.pedidos.length > 0) {
        // Limpiar la tabla
        listaPedidos.innerHTML = '';

        // Agregar cada pedido como fila
        data.pedidos.forEach(pedido => {
          const fila = document.createElement('tr');

          // Determinar la clase de estado
          let claseEstado = 'estado-preparacion';
          if (pedido.estado === 'Entregado') claseEstado = 'estado-entregado';
          else if (pedido.estado === 'Cancelado') claseEstado = 'estado-cancelado';

          fila.innerHTML = `
          <td>${pedido.numero_pedido || 'N/A'}</td>
          <td>${pedido.fecha || 'N/A'}</td>
          <td class="${claseEstado}">${pedido.estado || 'N/A'}</td>
          <td>$${parseFloat(pedido.total || 0).toFixed(2)}</td>
          <td>
            <button class="btn-ver-detalles" onclick="verDetallesPedido('${pedido.id_pedido}')">
              Ver Detalles
            </button>
          </td>
        `;

          listaPedidos.appendChild(fila);
        });

        if (tablaPedidos) tablaPedidos.style.display = 'block';
        if (sinPedidos) sinPedidos.style.display = 'none';
      } else {
        // No hay pedidos
        if (tablaPedidos) tablaPedidos.style.display = 'none';
        if (sinPedidos) sinPedidos.style.display = 'block';
      }
    })
    .catch(error => {
      console.error('Error al obtener pedidos:', error);
      if (sinPedidos) sinPedidos.style.display = 'block';
      if (tablaPedidos) tablaPedidos.style.display = 'none';
    });
}

// Cargar historial cuando se abre la página historial.html
document.addEventListener('DOMContentLoaded', () => {
  // Si estamos en la página de historial, cargar los pedidos
  if (document.querySelector('.historial-pedidos')) {
    cargarHistorial();

    // Recargar historial cuando cambia la sesión
    window.addEventListener('storage', (event) => {
      if (event.key === 'userId') {
        cargarHistorial();
      }
    });
  }
});

// Función para ver detalles de un pedido (puedes expandir esto)
function verDetallesPedido(idPedido) {
  alert(`Mostrando detalles del pedido: ${idPedido}`);
  // Aquí podrías hacer una petición para obtener más detalles
}
// ===== SIDEBAR MENU =====
function abrirMenu() {
  document.getElementById("sideMenu").classList.add("active");
  document.getElementById("menuOverlay").classList.add("active");
}
function cerrarMenu() {
  document.getElementById("sideMenu").classList.remove("active");
  document.getElementById("menuOverlay").classList.remove("active");
}
document.getElementById("menuOverlay")?.addEventListener("click", cerrarMenu);

/* PAGO */
(function () {
  const form = document.getElementById('paymentForm');
  const radios = form.elements['paymentMethod'];
  const transferFields = document.getElementById('transferFields');
  const result = document.getElementById('result');
  const clearBtn = document.getElementById('clearBtn');

  function updateVisibility() {
    const method = form.paymentMethod.value;
    if (method === 'efectivo') {
      transferFields.classList.add('hidden');
      document.getElementById('bankName').removeAttribute('required');
    } else {
      transferFields.classList.remove('hidden');
      document.getElementById('bankName').setAttribute('required', '');
    }
  }

  updateVisibility();
  Array.from(radios).forEach(r => r.addEventListener('change', updateVisibility));

  clearBtn.addEventListener('click', () => {
    form.reset(); updateVisibility();
    result.classList.add('hidden');
    result.textContent = '';
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    result.classList.add('hidden');
    result.textContent = '';

    const name = form.customerName.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const method = form.paymentMethod.value;

    if (!name || !phone || !email) {
      showError('Por favor complete su nombre, teléfono y correo.');
      return;
    }

    if (method === 'transferencia' && !form.bankName.value.trim()) {
      showError('Seleccione un banco para la transferencia.');
      return;
    }

    result.classList.remove('hidden');
    result.innerHTML = `Pago registrado: <strong>${method}</strong><br>
        Cliente: ${escapeHtml(name)} — Tel: ${escapeHtml(phone)} — Correo: ${escapeHtml(email)}.`;

    if (method === 'transferencia')
      result.innerHTML += `<br>Banco: ${escapeHtml(form.bankName.value)}<br>
            <strong>Nota:</strong> confirmar comprobante con el personal.`;
  });

  function showError(msg) {
    result.classList.remove('hidden');
    result.style.background = '#ffebee';
    result.style.border = '1px solid #ffcdd2';
    result.style.color = '#b71c1c';
    result.textContent = msg;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
  }
})();