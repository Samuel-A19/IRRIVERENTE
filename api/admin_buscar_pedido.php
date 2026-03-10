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

if (!$pedido) {
    echo json_encode(null);
    exit;
}

// 🔎 TRAER DETALLE DEL PEDIDO
$sqlDetalle = "SELECT * FROM pedido_detalle WHERE id_pedido = ?";
$stmtDetalle = $conexion->prepare($sqlDetalle);
$stmtDetalle->bind_param("i", $pedido['id']);
$stmtDetalle->execute();

$resultDetalle = $stmtDetalle->get_result();
$productos = [];

while ($row = $resultDetalle->fetch_assoc()) {
    $productos[] = $row;
}

// AGREGAR PRODUCTOS AL OBJETO PEDIDO
$pedido['productos'] = $productos;

echo json_encode($pedido);
