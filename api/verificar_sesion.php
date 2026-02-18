<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['rango'])) {
    echo json_encode(['error' => 'No autorizado']);
    exit();
}

echo json_encode([
    'id_usuario' => $_SESSION['id_usuario'],
    'rango' => $_SESSION['rango']
]);
