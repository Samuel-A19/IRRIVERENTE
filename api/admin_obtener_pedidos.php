<?php
header('Content-Type: application/json');
require "conexion.php";

$sql = "SELECT * FROM pedidos ORDER BY fecha DESC";
$result = $conexion->query($sql);

$pedidos = [];

while ($row = $result->fetch_assoc()) {
    $pedidos[] = $row;
}

echo json_encode($pedidos);
