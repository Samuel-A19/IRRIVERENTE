<?php
session_start();
require_once 'conexion.php';

// Verificar proceso activo
if (!isset($_SESSION['recover_email'])) {
    echo "No hay proceso de recuperación activo";
    exit;
}

// Validar contraseña
if (!isset($_POST['password']) || empty($_POST['password'])) {
    echo "Contraseña requerida";
    exit;
}

$nuevaPassword = $_POST['password'];
$correo = $_SESSION['recover_email'];

// Encriptar contraseña
$passwordHash = password_hash($nuevaPassword, PASSWORD_DEFAULT);

// Actualizar BD
$sql = "UPDATE usuario SET contrasena = ? WHERE correo = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ss", $passwordHash, $correo);

if ($stmt->execute()) {
    session_destroy();
    echo "ok";
} else {
    echo "Error al actualizar contraseña";
}
