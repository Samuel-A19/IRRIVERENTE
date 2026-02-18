<?php
header('Content-Type: application/json');
require "conexion.php";

if (!isset($_GET['id_usuario'])) {
    echo json_encode([]);
    exit;
}

$id_usuario = intval($_GET['id_usuario']);

$sql = "SELECT * FROM pedidos 
        WHERE id_usuario = ?
        ORDER BY fecha DESC";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();

$result = $stmt->get_result();
$pedidos = [];

while ($row = $result->fetch_assoc()) {
    $pedidos[] = $row;
}

echo json_encode($pedidos);
