<?php
header('Content-Type: application/json');
require "conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !isset($data['estado'])) {
    echo json_encode(["success" => false]);
    exit;
}

$id = intval($data['id']);
$estado = intval($data['estado']);

$sql = "UPDATE pedidos SET estado = ? WHERE id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ii", $estado, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "id" => $id,
        "estado" => $estado
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => $stmt->error
    ]);
}
