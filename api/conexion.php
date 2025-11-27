<?php
$host = 'localhost';
$usuario = 'root';
$contrasena = ''; // Deja vacío si no configuraste contraseña en XAMPP
$base_datos = 'pizzeria_irriverente';

$conexion = new mysqli($host, $usuario, $contrasena, $base_datos);

if ($conexion->connect_error) {
    die('Conexión fallida: ' . $conexion->connect_error); // Termina si falla, pero no envía JSON
}
?>