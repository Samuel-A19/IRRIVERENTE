<?php
/**
 * DIAGNÓSTICO DE SESIONES
 * 
 * Este archivo te ayuda a entender qué está pasando con las sesiones
 * Abre esto en el navegador DESPUÉS de haber hecho login
 */

session_start();
header('Content-Type: application/json');

$diagnostico = [
    'sesion_activa' => !empty($_SESSION),
    'session_id' => session_id(),
    'php_session_name' => session_name(),
    'php_session_cookie_httponly' => ini_get('session.cookie_httponly'),
    'php_session_use_cookies' => ini_get('session.use_cookies'),
    'php_session_use_strict_mode' => ini_get('session.use_strict_mode'),
    'variables_sesion' => $_SESSION,
    'cookie_phpsessid_presente' => isset($_COOKIE['PHPSESSID']),
    'todas_las_cookies' => array_keys($_COOKIE),
    'rango_en_sesion' => $_SESSION['rango'] ?? 'NO ENCONTRADO',
    'es_admin' => ($_SESSION['rango'] ?? null) === 'admin'
];

echo json_encode($diagnostico, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
