<?php
session_start();

// Simular un login
$_SESSION['rango'] = 'admin';
$_SESSION['id_usuario'] = 1;
$_SESSION['nombre'] = 'Test Admin';

header('Content-Type: application/json');
echo json_encode([
    'mensaje' => 'Sesión iniciada',
    'session_id' => session_id(),
    'session' => $_SESSION
]);
?>
