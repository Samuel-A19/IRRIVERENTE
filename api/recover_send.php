<?php
// 1️⃣ Iniciamos sesión (para guardar el código)
session_start();

// 2️⃣ Conexión a la base de datos (ya la tienes)
require_once 'conexion.php';

// 3️⃣ Configuración de PHPMailer
require_once 'config.php';

// 4️⃣ Validar el correo recibido vía POST
if (!isset($_POST['correo']) || empty($_POST['correo'])) {
    echo "Correo inválido";
    exit;
}
// 5️⃣ Verificar si el correo existe en la base de datos
$correo = trim($_POST['correo']);
$sql = "SELECT id_usuario FROM usuario WHERE correo = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows === 0) {
    echo "Este correo no está registrado";
    exit;
}
// 6️⃣ Generar un código de recuperación de 6 dígitos
$codigo = random_int(100000, 999999);

$_SESSION['recover_code'] = $codigo;
$_SESSION['recover_email'] = $correo;
$_SESSION['recover_exp'] = time() + 600; // 10 minutos

if (enviarCorreo($correo, $codigo)) {
    echo "ok";
} else {
    echo "Error al enviar el correo";
}
