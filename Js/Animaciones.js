/* ===============================
   MODALES
=============================== */
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}
function switchModal(current, target) {
  closeModal(current);
  openModal(target);
}

window.onclick = function (event) {
  ['loginModal', 'registerModal', 'recoverModal'].forEach(id => {
    const modal = document.getElementById(id);
    if (event.target === modal) modal.style.display = "none";
  });
};

/* ===============================
   DOM READY
=============================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     CARRUSEL
  =============================== */
  new Swiper('.swiper-container', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: { delay: 3000 },
    breakpoints: { 768: { slidesPerView: 2 }, 480: { slidesPerView: 1 } }
  });

  /* ===============================
     CARRITO
  =============================== */
  const btnCarrito = document.getElementById("btnCarrito");
  const carritoDropdown = document.getElementById("carritoDropdown");
  const carritoLista = document.getElementById("carritoLista");
  const totalTexto = document.querySelector(".carrito-total p");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const actualizarCarrito = () => {
    carritoLista.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
      total += item.precio * item.cantidad;
      carritoLista.innerHTML += `
        <li class="carrito-item">
          <p>${item.nombre} x${item.cantidad}</p>
          <span>${(item.precio * item.cantidad).toFixed(2)}$</span>
        </li>`;
    });

    totalTexto.textContent = `Total: ${total.toFixed(2)}$`;
    localStorage.setItem("carrito", JSON.stringify(carrito));

    if (carrito.length === 0)
      carritoLista.innerHTML = '<p style="text-align:center">El carrito está vacío</p>';
  };

  btnCarrito?.addEventListener("click", e => {
    e.preventDefault();
    carritoDropdown.style.display =
      carritoDropdown.style.display === "flex" ? "none" : "flex";
  });

  actualizarCarrito();

  /* ===============================
     REGISTRO
  =============================== */
  document.querySelector('#registerModal .btn-modal')?.addEventListener('click', async e => {
    e.preventDefault();

    const nombre = document.querySelector('#registerModal input[placeholder="Nombre de usuario"]').value.trim();
    const correo = document.querySelector('#registerModal input[placeholder="Correo electrónico"]').value.trim();
    const contrasena = document.querySelector('#registerModal input[placeholder="Contraseña"]').value.trim();

    if (!nombre || !correo || !contrasena) {
      mostrarAlerta("Completa todos los campos", "Atención");
      return;
    }

    const r = await fetch("api/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, contrasena })
    });
    const result = await r.json();

    if (result.mensaje) {
      mostrarAlerta(result.mensaje, "Éxito");
      setTimeout(() => {
        cerrarAlerta();
        closeModal("registerModal");
        openModal("loginModal");
      }, 1200);
    } else {
      mostrarAlerta(result.error, "Error");
    }
  });

  /* ===============================
     LOGIN
  =============================== */
  document.querySelector('#loginModal .btn-modal')?.addEventListener('click', async e => {
    e.preventDefault();

    const correo = loginEmail.value.trim();
    const contrasena = loginPassword.value.trim();

    if (!correo || !contrasena) {
      mostrarAlerta("Completa todos los campos", "Atención");
      return;
    }

    const r = await fetch("api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contrasena })
    });
    const result = await r.json();

    if (result.mensaje) {
      localStorage.setItem("userId", result.id_usuario);
      localStorage.setItem("userName", result.nombre);
      mostrarAlerta(result.mensaje, "Éxito");
      setTimeout(() => {
        cerrarAlerta();
        closeModal("loginModal");
        location.reload();
      }, 1000);
    } else {
      mostrarAlerta(result.error, "Error");
    }
  });

});

/* ===============================
   RASTREO
=============================== */
function iniciarRastreo() {
  const codigo = codigoRastreo.value.trim();
  if (!codigo) {
    mostrarAlerta("Ingresa tu código de pedido", "Atención");
    return;
  }
  trackOrder();
}

function trackOrder() {
  const steps = document.querySelectorAll(".progress-tracker .step");
  const statusText = document.querySelector(".status-text");
  const estados = ["Recibido", "En preparación", "En camino", "Entregado"];
  let i = 0;

  steps.forEach(s => s.classList.remove("active", "completed"));

  function avanzar() {
    steps[i].classList.add("active");
    statusText.textContent = estados[i];
    setTimeout(() => {
      steps[i].classList.remove("active");
      steps[i].classList.add("completed");
      if (++i < steps.length) avanzar();
    }, 2000);
  }
  avanzar();
}

/* ===============================
   HISTORIAL
=============================== */
function verDetallesPedido(id) {
  mostrarAlerta(`Mostrando detalles del pedido ${id}`, "Información");
}

/* ===============================
   PERFIL
=============================== */
document.querySelector("#btnPerfil")?.addEventListener("click", () => {
  const telefono = phone.value;
  if (!/^[0-9]{10}$/.test(telefono)) {
    mostrarAlerta("El teléfono debe tener 10 dígitos", "Atención");
    return;
  }
  mostrarAlerta("Datos actualizados correctamente", "Éxito");
});

/* ===============================
   IDIOMA
=============================== */
btnIdioma?.addEventListener("click", () => {
  mostrarAlerta(`Idioma actualizado`, "Información");
});

/* ===============================
   SEGURIDAD
=============================== */
btnPassword?.addEventListener("click", () => {
  if (!passActual.value || !passNueva.value) {
    mostrarAlerta("Completa ambos campos", "Atención");
    return;
  }
  if (passNueva.value.length < 6) {
    mostrarAlerta("Mínimo 6 caracteres", "Atención");
    return;
  }
  mostrarAlerta("Contraseña cambiada correctamente", "Éxito");
});

/* ===============================
   FOTO PERFIL
=============================== */
function abrirSelector() {
  inputFoto.click();
}

inputFoto?.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    fotoPerfil.src = e.target.result;
    headerFoto.src = e.target.result;
    mostrarAlerta("Foto actualizada", "Éxito");
  };
  reader.readAsDataURL(file);
});
