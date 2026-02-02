<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "conexion.php";

if (
    !isset($_POST['id_usuario']) ||
    !isset($_POST['telefono']) ||
    !isset($_POST['ciudad']) ||
    !isset($_POST['direccion'])
) {
    echo "error";
    exit;
}

$id_usuario = intval($_POST['id_usuario']);
$telefono = trim($_POST['telefono']);
$ciudad = trim($_POST['ciudad']);
$direccion = trim($_POST['direccion']);

$sql = "INSERT INTO informacion_cliente (id_usuario, telefono, ciudad, direccion)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            telefono = VALUES(telefono),
            ciudad = VALUES(ciudad),
            direccion = VALUES(direccion)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo "error";
    exit;
}

$stmt->bind_param("isss", $id_usuario, $telefono, $ciudad, $direccion);

if ($stmt->execute()) {
    echo "ok";
} else {
    echo "error";
}
