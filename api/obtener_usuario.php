<?php
include __DIR__ . "/conexion.php";

if (!isset($_GET['id_usuario'])) {
    echo json_encode(null);
    exit;
}

$id_usuario = intval($_GET['id_usuario']);

$sql = "SELECT nombre_completo, correo 
        FROM usuario 
        WHERE id_usuario = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(null);
}
