<?php
session_start();
header('Content-Type: application/json');

// Debug: mostrar toda la sesión
echo json_encode([
    'session' => $_SESSION,
    'session_id' => session_id(),
    'session_status' => session_status(),
    'cookies' => $_COOKIE,
    'php_sapi' => php_sapi_name()
], JSON_PRETTY_PRINT);
?>
