<?php
$host = 'localhost';
$usuario = 'root';
$contrasena = '';
$base_datos = 'pizzeria_irriverente';

$conexion = new mysqli($host, $usuario, $contrasena, $base_datos);
$conn = $conexion; // 👈 alias para compatibilidad

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
