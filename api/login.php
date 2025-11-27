<?php
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $correo = $data['correo'] ?? '';
    $contrasena = $data['contrasena'] ?? '';

    if (empty($correo) || empty($contrasena)) {
        echo json_encode(['error' => 'Todos los campos son requeridos']);
        exit;
    }

    $query = "SELECT id_usuario, nombre_completo, contrasena FROM usuario WHERE correo = ?";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param('s', $correo);
    $stmt->execute();
    $stmt->bind_result($id_usuario, $nombre_completo, $hash);
    $stmt->fetch();

    if ($hash && password_verify($contrasena, $hash)) {
        echo json_encode(['mensaje' => 'Login exitoso', 'id_usuario' => $id_usuario, 'nombre' => $nombre_completo]);
    } else {
        echo json_encode(['error' => 'Credenciales inválidas']);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Método no permitido']);
}

$conexion->close();
?>