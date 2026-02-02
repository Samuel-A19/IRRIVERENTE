<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include __DIR__ . "/conexion.php";

if (!isset($_POST['id_usuario']) || !isset($_FILES['foto'])) {
    echo "error";
    exit;
}

$id_usuario = intval($_POST['id_usuario']);
$foto = $_FILES['foto'];

if ($foto['error'] !== 0) {
    echo "error";
    exit;
}

// 🔒 Validar tipo de imagen
$permitidos = ['image/jpeg', 'image/png', 'image/webp'];
if (!in_array($foto['type'], $permitidos)) {
    echo "formato_invalido";
    exit;
}

// 📂 Crear nombre único
$extension = pathinfo($foto['name'], PATHINFO_EXTENSION);
$nombreArchivo = "perfil_" . $id_usuario . "_" . time() . "." . $extension;

$rutaDestino = "../uploads/perfiles/" . $nombreArchivo;

// 🟢 Mover archivo
if (!move_uploaded_file($foto['tmp_name'], $rutaDestino)) {
    echo "error";
    exit;
}

// 🧾 Guardar ruta en BD
$rutaBD = "uploads/perfiles/" . $nombreArchivo;

$sql = "UPDATE informacion_cliente 
        SET foto = ? 
        WHERE id_usuario = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $rutaBD, $id_usuario);

if ($stmt->execute()) {
    echo "ok";
} else {
    echo "error";
}
