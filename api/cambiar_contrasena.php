<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include __DIR__ . "/conexion.php";

if (
    !isset($_POST['id_usuario']) ||
    !isset($_POST['claveActual']) ||
    !isset($_POST['nuevaClave'])
) {
    echo "error";
    exit;
}

$id_usuario = intval($_POST['id_usuario']);
$claveActual = $_POST['claveActual'];
$nuevaClave = $_POST['nuevaClave'];

// ===============================
// OBTENER HASH ACTUAL
// ===============================
$sql = "SELECT contrasena FROM usuario WHERE id_usuario = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo "error";
    exit;
}

$row = $result->fetch_assoc();
$hashActual = $row['contrasena'];

// ===============================
// VERIFICAR CONTRASEÑA ACTUAL
// ===============================
if (!password_verify($claveActual, $hashActual)) {
    echo "clave_incorrecta";
    exit;
}

// ===============================
// GUARDAR NUEVA CONTRASEÑA
// ===============================
$nuevoHash = password_hash($nuevaClave, PASSWORD_DEFAULT);

$sqlUpdate = "UPDATE usuario SET contrasena = ? WHERE id_usuario = ?";
$stmtUpdate = $conexion->prepare($sqlUpdate);
$stmtUpdate->bind_param("si", $nuevoHash, $id_usuario);

if ($stmtUpdate->execute()) {
    echo "ok";
} else {
    echo "error";
}
