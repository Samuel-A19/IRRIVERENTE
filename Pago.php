<!DOCTYPE html> <!-- Declara que este documento es HTML5 -->
<html lang="es"> <!-- Indica que el idioma principal del contenido es español -->

<head>
    <meta charset="UTF-8" />
    <!-- Define la codificación de caracteres para que soporte acentos y caracteres especiales -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Permite que la página sea adaptable en dispositivos móviles -->
    <title>Irriverente Pizza & Pasta</title> <!-- Título de la pestaña del navegador -->

    <!-- Enlace a la hoja de estilos CSS personalizada -->
    <link rel="stylesheet" href="Css/Pago.css" />
    <link rel="stylesheet" href="Css/Encabezado.css" />
    <link rel="stylesheet" href="Css/Carrito.css" />
    <link rel="stylesheet" href="Css/Modales.css" />
    <link rel="stylesheet" href="Css/PiePagina.css" />
    <link rel="stylesheet" href="Css/Fondos.css" />
    <link rel="stylesheet" href="Css/Menulateral.css">

    <!-- Librería de íconos Bootstrap Icons (permite usar iconos con la clase "bi") -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">

    <!-- Librería CSS de Swiper (estilos del carrusel) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <!-- Librería JS de Swiper (funcionalidad del carrusel) -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

    <!-- Fuente "Roboto" desde Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body class="pagina-pago">
    <!-- Comienza el contenido visible en el navegador -->

    <!-- ENCABEZADO PRINCIPAL -->
    <header class="main-header"> <!-- Contenedor del encabezado -->

        <!-- Contenedor del logo -->
        <div class="header-center logo">
            <a href="Inicio.php"><img src="Imagenes/Logo.png" alt="Logo-empresa"></a>
            <!-- Logo con enlace a la página de inicio -->
        </div>

        <!-- MENÚ DE NAVEGACIÓN -->
        <nav class="header-center nav-menu"> <!-- Contenedor del menú -->
            <a href="Inicio.php">INICIO</a> <!-- Enlace a la página de inicio -->
            <a href="Menu.php">MENÚ</a> <!-- Enlace a la sección de menú -->
            <a href="Promos.php">PROMOS</a> <!-- Enlace a la página de promociones -->
            <a href="#" id="linkSiguePedido">SIGUE TU PEDIDO</a> <!-- Enlace para seguimiento de pedido -->
            <a href="Acercanosotros.php">ACERCA DE NOSOTROS</a> <!-- Enlace sobre la empresa -->
            <a href="#" id="loginLink" onclick="openModal('loginModal')"><i class="bi bi-person"></i> INICIAR SESIÓN</a>
            <a href="#" id="btnCarrito"><i class="bi bi-cart"></i> CARRITO</a> <!-- Enlace al carrito -->
            <div id="carritoDropdown" class="carrito-dropdown">
                <h3>Tu Carrito</h3>
                <ul id="carritoLista" class="carrito-lista">
                    <li class="carrito-item">
                        <img src="Imagenes/Pizza 2.jpg" alt="">
                        <div class="carrito-info">
                            <p></p>
                            <span></span>
                        </div>
                        <div class="acciones">
                            <button class="menos"><i class="fa-solid fa-circle-minus"></i></button>
                            <span class="cantidad">1</span>
                            <button class="mas"><i class="fa-solid fa-circle-plus"></i></button>
                            <button class="eliminar">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </li>
                </ul>
                <div class="carrito-total">
                    <p>Total: 0$</p>
                </div>
                <div class="carrito-acciones">
                    <button class="seguir">Seguir comprando</button>
                    <button class="checkout">Finalizar compra</button>
                </div>
            </div>

            <!-- Botón menú solo icono -->
            <button id="btnMenuLateral" onclick="abrirMenu()">
                <i class="bi bi-justify"></i>
            </button>

            <!-- Overlay -->
            <div id="menuOverlay"></div>

            <!-- MENU LATERAL -->
            <aside id="sideMenu">

                <!-- PERFIL USUARIO -->
                <div class="side-user">
                    <img id="sideFoto" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Foto de perfil">
                    <span id="sideNombre">Usuario</span>
                </div>

                <div class="side-divider"></div>


                <a href="Historial.php">Historial de Pedidos</a>
                <a href="Ajustes.php">Ajustes</a>

                <!-- CERRAR SESIÓN -->
                <a href="#" id="btnCerrarSesion" class="logout">
                    Cerrar sesión
                </a>
                <div class="side-social">
                    <a href="https://www.instagram.com/irriverente_pp" target="_blank" aria-label="Instagram">
                        <i class="bi bi-instagram"></i>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100075994186402" target="_blank"
                        aria-label="Facebook">
                        <i class="bi bi-facebook"></i>
                    </a>
                    <a href="https://www.tiktok.com/@irriverente.pizza" target="_blank" aria-label="TikTok">
                        <i class="bi bi-tiktok"></i>
                    </a>
            </aside>
        </nav>
    </header>

    <!-- Formulario -->
    <div class="container formulario-pago" id="bloqueFormulario">
        <h1>Método de pago</h1>

        <form id="paymentForm">
            <div>
                <label for="customerName">Nombre del cliente</label>
                <input id="customerName" name="customerName" type="text" placeholder="Ej. Juan Pérez" required>
            </div>

            <div class="row">
                <div class="col">
                    <label for="phone">Teléfono</label>
                    <input id="phone" name="phone" type="tel" placeholder="Ej. 3001234567" maxlength="10"
                        inputmode="numeric" pattern="[0-9]{10}" required>

                </div>
                <div class="col">
                    <label for="email">Correo electrónico</label>
                    <input id="email" name="email" type="email" placeholder="ejemplo@correo.com" required>
                </div>
            </div>

            <div>
                <label>Método de pago</label>
                <div class="radios">
                    <label><input type="radio" name="paymentMethod" value="efectivo" checked> Efectivo</label>
                    <label><input type="radio" name="paymentMethod" value="transferencia"> Pago en Linea</label>
                </div>
            </div>

            <div id="transferFields" class="payment-details hidden">
                <p class="note">Transferencia bancaria: realiza el pago y conserva el comprobante.</p>

                <div>
                    <label for="bankName">Medio / Banco</label>
                    <select id="bankName" name="bankName">
                        <option value="">-- Seleccione --</option>
                        <option value="Nequi">Nequi</option>
                        <option value="Bancolombia">Bancolombia</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div style="flex:1">
                    <button id="submitBtn" class="btn" type="submit">ENVIAR PAGO</button>
                    <button id="clearBtn" class="btn secondary" type="button">LIMPIAR</button>
                </div>
            </div>
        </form>
    </div>

    <div class="container resumen-entrega" id="bloqueEntrega">
        <h3>Datos de entrega</h3>
        <p><strong>Nombre:</strong> <span id="res-nombre"></span></p>
        <p><strong>Teléfono:</strong> <span id="res-telefono"></span></p>
        <p><strong>Correo:</strong> <span id="res-email"></span></p>
        <p><strong>Dirección:</strong> <span id="res-direccion"></span></p>
        <p><strong>Referencias:</strong> <span id="res-referencias"></span></p>
        <p><strong>Medio de pago:</strong> <span id="res-metodo"></span></p>

        <div id="bloquePagoDigital" class="container hidden">
            <h3>Realiza tu pago</h3>

            <p id="textoPago"></p>

            <img id="qrPago" src="" alt="QR de pago" style="max-width:220px; margin:20px auto; display:block;">

            <button id="btnYaPague" class="btn">YA PAGUÉ</button>
        </div>

        <div class="resumen-pedido" id="resumenPedido">
            <h3>Resumen de tu pedido</h3>

            <div class="resumen-seccion">
                <strong>Productos:</strong>
                <ul id="resumenProductos"></ul>
            </div>

            <div class="resumen-seccion">
                <p><strong>Total:</strong> <span id="resumenTotal">0</span></p>
            </div>
        </div>


        <div class="acciones-pago">
            <button id="btnPagar" class="btn" type="button">

                PAGAR AHORA
            </button>

            <button id="btnEditar" class="btn secondary" type="button">

                EDITAR DATOS
            </button>
        </div>



    </div>
    <a href="https://wa.me/573228651543" class="btn-wsp" target="_blank">
        <img src="Imagenes/Whatsaap Logo.png" class="Logo-Whatsaap">
    </a>

    <div id="loginModal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="closeModal('loginModal')">&times;</span>
      <h2>Iniciar Sesión</h2>
      <input type="email" id="loginEmail" placeholder="Correo o Usuario" />
      <input type="password" id="loginPassword" placeholder="Contraseña" />
      <button class="btn-modal">Ingresar</button>
      <p>¿No tienes cuenta?
        <a href="#" onclick="switchModal('loginModal', 'registerModal')">Regístrate</a>
      </p>
      <a href="#" onclick="event.preventDefault();switchModal('loginModal', 'recoverModal')">¿Olvidaste tu
        contraseña?</a>
    </div>
  </div>

  <div id="recoverModal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="closeModal('recoverModal')">&times;</span>

      <h2>Recuperar Contraseña</h2>

      <!-- PASO 1: CORREO -->
      <div id="stepEmail">
        <input type="email" id="recoverEmail" placeholder="Correo registrado">
        <button class="btn-modal" id="btnSend">Enviar código</button>
      </div>

      <!-- PASO 2: CÓDIGO -->
      <div id="stepCode" style="display:none">
        <div class="code-inputs">
          <input type="text" maxlength="1" class="code-box">
          <input type="text" maxlength="1" class="code-box">
          <input type="text" maxlength="1" class="code-box">
          <input type="text" maxlength="1" class="code-box">
          <input type="text" maxlength="1" class="code-box">
          <input type="text" maxlength="1" class="code-box">
        </div>

        <button class="btn-modal" id="btnVerify">Verificar código</button>
        <button class="btn-modal btn-resend" id="btnResend">Reenviar correo</button>
      </div>

      <!-- PASO 3: NUEVA CONTRASEÑA -->
      <div id="stepPassword" style="display:none">
        <input type="password" id="recoverPassword" placeholder="Nueva contraseña">
        <button class="btn-modal" id="btnReset">Cambiar contraseña</button>
      </div>

      <!-- MENSAJE -->
      <p id="recoverMsg"></p>

      <p>
        <a href="#" onclick="event.preventDefault(); switchModal('recoverModal','loginModal')">
          Volver a iniciar sesión
        </a>
      </p>
    </div>
  </div>


  <div id="registerModal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="closeModal('registerModal')">&times;</span>
      <h2>Registro</h2>
      <input type="text" placeholder="Nombre de usuario" />
      <input type="email" placeholder="Correo electrónico" />
      <input type="password" placeholder="Contraseña" />
      <button class="btn-modal">Registrarse</button>
      <p>¿Ya tienes cuenta? <a href="#" onclick="switchModal('registerModal', 'loginModal')">Inicia sesión</a></p>
    </div>
  </div>
  
    <script src="Js/Modales.js"></script>
    <script src="Js/Pago.js"></script>
    <script src="Js/Carrito.js"></script>
    <script src="Js/Menulateral.js"></script>
    <script src="Js/clickF.js"></script>

<!-- ALERTA PERSONALIZADA -->
  <div id="alertOverlay" class="alert-overlay">
    <div class="alert-box">
      <h3 id="alertTitle">Atención</h3>
      <p id="alertMessage"></p>
      <button onclick="cerrarAlerta()">Aceptar</button>
    </div>
  </div>

  <div id="modalPrivacidad" class="modal">
    <div class="modal-content legal-modal">
      <span class="close" onclick="closeModal('modalPrivacidad')">&times;</span>
      <h2>Política de Privacidad</h2>

      <p><strong>Última actualización: 2025</strong></p>

      <p>En Irriverente Pizza & Pasta respetamos tu privacidad y protegemos tus datos personales conforme a la Ley 1581
        de 2012 y demás normas aplicables en Colombia.</p>

      <h3>1. Información que recopilamos</h3>
      <p>Recopilamos datos personales como nombre, número de teléfono, dirección, correo electrónico y la información
        necesaria para procesar tus pedidos y brindarte un mejor servicio.</p>

      <h3>2. Finalidad del tratamiento</h3>
      <p>La información recopilada es utilizada para gestionar pedidos, coordinar entregas, mejorar nuestros servicios y
        comunicarnos contigo en relación con promociones o novedades.</p>

      <h3>3. Protección de la información</h3>
      <p>Implementamos medidas técnicas y administrativas para proteger tus datos contra pérdida, acceso no autorizado o
        uso indebido.</p>

      <h3>4. Derechos del titular</h3>
      <p>Como titular de los datos, puedes solicitar actualización, corrección o eliminación de tu información en
        cualquier momento, enviando una solicitud a nuestros canales oficiales.</p>

      <h3>5. Conservación de datos</h3>
      <p>Los datos personales serán conservados únicamente durante el tiempo necesario para cumplir con las finalidades
        descritas o según lo exija la ley.</p>
    </div>
  </div>

  <div id="modalTerminos" class="modal">
    <div class="modal-content legal-modal">
      <span class="close" onclick="closeModal('modalTerminos')">&times;</span>
      <h2>Términos y Condiciones</h2>

      <p><strong>Última actualización: 2025</strong></p>

      <h3>1. Uso del sitio</h3>
      <p>El usuario se compromete a utilizar este sitio web de manera legal y responsable, evitando cualquier acción que
        pueda afectar el funcionamiento de la plataforma.</p>

      <h3>2. Registro y cuenta</h3>
      <p>El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las
        actividades realizadas desde su cuenta.</p>

      <h3>3. Pedidos</h3>
      <p>Todos los pedidos están sujetos a disponibilidad de productos y confirmación por parte de Irriverente Pizza &
        Pasta. Nos reservamos el derecho de cancelar pedidos en caso de inconsistencias.</p>

      <h3>4. Pagos</h3>
      <p>Aceptamos pagos en efectivo y pagos en línea mediante plataformas externas seguras. La empresa no almacena
        información financiera sensible.</p>

      <h3>5. Entregas</h3>
      <p>Los tiempos de entrega pueden variar según condiciones climáticas, tráfico u otros factores externos. Hacemos
        nuestro mejor esfuerzo para cumplir con los tiempos estimados.</p>

      <h3>6. Modificaciones</h3>
      <p>Irriverente Pizza & Pasta podrá actualizar estos términos en cualquier momento. Las modificaciones entrarán en
        vigencia desde su publicación en el sitio web.</p>
    </div>
  </div>

  <!-- ============================= -->
  <!-- BANNER TÉRMINOS OBLIGATORIOS -->
  <!-- ============================= -->
  <div id="termsBanner">
    <div class="terms-content">
      <p>
        Para continuar debes aceptar nuestros
        <a href="#" onclick="openModal('modalTerminos')">Términos y Condiciones</a>
        y nuestra
        <a href="#" onclick="openModal('modalPrivacidad')">Política de Privacidad</a>.
      </p>

      <div class="terms-buttons">
        <button onclick="aceptarTerminos()" class="btn-aceptar">Aceptar</button>
        <button onclick="rechazarTerminos()" class="btn-rechazar">Rechazar</button>
      </div>
    </div>
  </div>

    <!-- Fin del contenido visible en el navegador -->

    <!-- PIE DE PÁGINA -->
  <footer class="main-footer"> <!-- Contenedor principal del footer -->
    <div class="footer-content"> <!-- Contenedor del contenido del pie de página -->

      <div class="footer-copy">
        2025 Irriverente Pizza & Pasta - Todos los derechos reservados <!-- Texto de derechos -->
      </div>

      <div class="footer-links"> <!-- Enlaces legales -->
        <a href="#" onclick="openModal('modalPrivacidad')">Política de Privacidad</a>
        <a href="#" onclick="openModal('modalTerminos')">Términos y Condiciones</a>


      </div>

      <!-- REDES SOCIALES -->
      <div class="footer-social">
        <a href="https://www.instagram.com/irriverente_pp?utm_source=ig_web_button_share_sheet&igsh=MXd4N2hnM20zb2RnYg=="
          target="_blank"><i class="bi bi-instagram"></i></a> <!-- Instagram -->
        <a href="https://www.facebook.com/profile.php?id=100075994186402" target="_blank"><i
            class="bi bi-facebook"></i></a> <!-- Facebook -->
        <a href="https://www.tiktok.com/@irriverente.pizza" target="_blank"><i class="bi bi-tiktok"></i></a>
        <!-- TikTok -->
      </div>
    </div>
  </footer>

  <!-- ALERTA PERSONALIZADA -->
  <div id="alertOverlay" class="alert-overlay">
    <div class="alert-box">
      <h3 id="alertTitle">Atención</h3>
      <p id="alertMessage"></p>
      <button onclick="cerrarAlerta()">Aceptar</button>
    </div>
  </div>

  <div id="modalPrivacidad" class="modal">
    <div class="modal-content legal-modal">
      <span class="close" onclick="closeModal('modalPrivacidad')">&times;</span>
      <h2>Política de Privacidad</h2>

      <p><strong>Última actualización: 2025</strong></p>

      <p>En Irriverente Pizza & Pasta respetamos tu privacidad y protegemos tus datos personales conforme a la Ley 1581
        de 2012 y demás normas aplicables en Colombia.</p>

      <h3>1. Información que recopilamos</h3>
      <p>Recopilamos datos personales como nombre, número de teléfono, dirección, correo electrónico y la información
        necesaria para procesar tus pedidos y brindarte un mejor servicio.</p>

      <h3>2. Finalidad del tratamiento</h3>
      <p>La información recopilada es utilizada para gestionar pedidos, coordinar entregas, mejorar nuestros servicios y
        comunicarnos contigo en relación con promociones o novedades.</p>

      <h3>3. Protección de la información</h3>
      <p>Implementamos medidas técnicas y administrativas para proteger tus datos contra pérdida, acceso no autorizado o
        uso indebido.</p>

      <h3>4. Derechos del titular</h3>
      <p>Como titular de los datos, puedes solicitar actualización, corrección o eliminación de tu información en
        cualquier momento, enviando una solicitud a nuestros canales oficiales.</p>

      <h3>5. Conservación de datos</h3>
      <p>Los datos personales serán conservados únicamente durante el tiempo necesario para cumplir con las finalidades
        descritas o según lo exija la ley.</p>
    </div>
  </div>

  <div id="modalTerminos" class="modal">
    <div class="modal-content legal-modal">
      <span class="close" onclick="closeModal('modalTerminos')">&times;</span>
      <h2>Términos y Condiciones</h2>

      <p><strong>Última actualización: 2025</strong></p>

      <h3>1. Uso del sitio</h3>
      <p>El usuario se compromete a utilizar este sitio web de manera legal y responsable, evitando cualquier acción que
        pueda afectar el funcionamiento de la plataforma.</p>

      <h3>2. Registro y cuenta</h3>
      <p>El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las
        actividades realizadas desde su cuenta.</p>

      <h3>3. Pedidos</h3>
      <p>Todos los pedidos están sujetos a disponibilidad de productos y confirmación por parte de Irriverente Pizza &
        Pasta. Nos reservamos el derecho de cancelar pedidos en caso de inconsistencias.</p>

      <h3>4. Pagos</h3>
      <p>Aceptamos pagos en efectivo y pagos en línea mediante plataformas externas seguras. La empresa no almacena
        información financiera sensible.</p>

      <h3>5. Entregas</h3>
      <p>Los tiempos de entrega pueden variar según condiciones climáticas, tráfico u otros factores externos. Hacemos
        nuestro mejor esfuerzo para cumplir con los tiempos estimados.</p>

      <h3>6. Modificaciones</h3>
      <p>Irriverente Pizza & Pasta podrá actualizar estos términos en cualquier momento. Las modificaciones entrarán en
        vigencia desde su publicación en el sitio web.</p>
    </div>
  </div>

  <!-- ============================= -->
  <!-- BANNER TÉRMINOS OBLIGATORIOS -->
  <!-- ============================= -->
  <div id="termsBanner">
    <div class="terms-content">
      <p>
        Para continuar debes aceptar nuestros
        <a href="#" onclick="openModal('modalTerminos')">Términos y Condiciones</a>
        y nuestra
        <a href="#" onclick="openModal('modalPrivacidad')">Política de Privacidad</a>.
      </p>

      <div class="terms-buttons">
        <button onclick="aceptarTerminos()" class="btn-aceptar">Aceptar</button>
        <button onclick="rechazarTerminos()" class="btn-rechazar">Rechazar</button>
      </div>
    </div>
  </div>

    <!-- ALERTA PERSONALIZADA -->
    <div id="alertOverlay" class="alert-overlay" style="display:none;">
        <div class="alert-box">
            <h3 id="alertTitle">Atención</h3>
            <p id="alertMessage"></p>
            <button onclick="cerrarAlerta()">Aceptar</button>
        </div>
    </div>

</body>

</html>
