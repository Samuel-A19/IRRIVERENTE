<?php
header('Content-Type: application/json');
require "conexion.php";

if (!isset($_GET['codigo'])) {
    echo json_encode(null);
    exit;
}

$codigo = $_GET['codigo'];

$sql = "SELECT * FROM pedidos WHERE codigo_pedido = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $codigo);
$stmt->execute();

$result = $stmt->get_result();
$pedido = $result->fetch_assoc();

echo json_encode($pedido);
