<?php
header('Content-Type: application/json');
require "conexion.php";

if (!isset($_GET['id_pedido'])) {
    echo json_encode([]);
    exit;
}

$id_pedido = intval($_GET['id_pedido']);

$sql = "SELECT * FROM pedido_detalle WHERE id_pedido = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id_pedido);
$stmt->execute();

$result = $stmt->get_result();
$productos = [];

while ($row = $result->fetch_assoc()) {
    $productos[] = $row;
}

echo json_encode($productos);
