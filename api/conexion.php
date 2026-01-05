<?php
$host = 'localhost';
$usuario = 'root';
$contrasena = ''; // Deja vacío si no configuraste contraseña en XAMPP
$base_datos = 'pizzeria_irriverente';

$conexion = new mysqli($host, $usuario, $contrasena, $base_datos);
?>