<?php
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $nombre = $data['nombre'] ?? '';
    $correo = $data['correo'] ?? '';
    $contrasena = password_hash($data['contrasena'] ?? '', PASSWORD_DEFAULT);

    if (empty($nombre) || empty($correo) || empty($contrasena)) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Todos los campos son requeridos']);
        exit;
    }

    $check = $conexion->prepare("SELECT id_usuario FROM usuario WHERE correo = ?");
    $check->bind_param('s', $correo);
    $check->execute();
    $check->store_result();
    if ($check->num_rows > 0) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Correo ya registrado']);
        $check->close();
        exit;
    }
    $check->close();

    $fecha = date('Y-m-d');
    $rango = 'cliente';
    $query = "INSERT INTO usuario (nombre_completo, correo, contrasena, rango, fecha_creacion) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param('sssss', $nombre, $correo, $contrasena, $rango, $fecha);

    if ($stmt->execute()) {
        header('Content-Type: application/json');
        echo json_encode(['mensaje' => 'Registro exitoso']);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Error al registrar: ' . $conexion->error]);
    }

    $stmt->close();
    $conexion->close();
    exit;
} else {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Método no permitido. Usa POST.']);
    exit;
}
?>