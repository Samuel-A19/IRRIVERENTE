<?php
include __DIR__ . "/conexion.php";

if (
    !isset($_POST['id_usuario']) ||
    !isset($_POST['nombre']) ||
    !isset($_POST['correo'])
) {
    echo "error";
    exit;
}

$id_usuario = intval($_POST['id_usuario']);
$nombre = trim($_POST['nombre']);
$correo = trim($_POST['correo']);

$sql = "UPDATE usuario 
        SET nombre_completo = ?, correo = ?
        WHERE id_usuario = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("ssi", $nombre, $correo, $id_usuario);

if ($stmt->execute()) {
    echo "ok";
} else {
    echo "error";
}
