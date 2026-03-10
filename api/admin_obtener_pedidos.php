<?php
session_start();
header('Content-Type: application/json');
require "conexion.php";

// ==========================================
// VERIFICACIÓN DE PERMISOS DE ADMINISTRADOR
// ==========================================
if (!isset($_SESSION['rango']) || $_SESSION['rango'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'No autorizado']);
    exit();
}

$sql = "SELECT * FROM pedidos ORDER BY fecha DESC";
$result = $conexion->query($sql);

$pedidos = [];

while ($row = $result->fetch_assoc()) {
    $pedidos[] = $row;
}

echo json_encode($pedidos);
