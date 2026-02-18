<?php
header('Content-Type: application/json');
require "conexion.php";

if (!isset($_GET['id_usuario'])) {
    echo json_encode(null);
    exit;
}

$id_usuario = intval($_GET['id_usuario']);

$sql = "SELECT * FROM pedidos 
        WHERE id_usuario = ?
        ORDER BY fecha DESC
        LIMIT 1";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();

$result = $stmt->get_result();
$pedido = $result->fetch_assoc();

echo json_encode($pedido);
