<?php
session_start();
require_once 'conexion.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$correo = trim($data['correo'] ?? '');
$contrasena = trim($data['contrasena'] ?? '');

if (empty($correo) || empty($contrasena)) {
    echo json_encode(['error' => 'Todos los campos son requeridos']);
    exit;
}

$sql = "SELECT id_usuario, nombre_completo, contrasena, rango 
        FROM usuario 
        WHERE correo = ?
        LIMIT 1";

$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode(['error' => 'Error en la consulta']);
    exit;
}

$stmt->bind_param("s", $correo);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['error' => 'Credenciales inválidas']);
    exit;
}

$usuario = $result->fetch_assoc();

$hash = $usuario['contrasena'];

// 🔥 Aquí ya existe el hash correctamente
if (!password_verify($contrasena, $hash)) {
    echo json_encode(['error' => 'Credenciales inválidas']);
    exit;
}

// Guardar sesión
$_SESSION['id_usuario'] = $usuario['id_usuario'];
$_SESSION['nombre'] = $usuario['nombre_completo'];
$_SESSION['rango'] = $usuario['rango'];

// Redirección
if ($usuario['rango'] === 'admin') {
    $redirect = '../AdminPedidosLista.html';
} else {
    $redirect = '../Siguepedido.html';
}

echo json_encode([
    'mensaje' => 'Login exitoso',
    'id_usuario' => $usuario['id_usuario'],
    'nombre' => $usuario['nombre_completo'],
    'rango' => $usuario['rango'],
    'redirect' => $redirect
]);

$stmt->close();
$conexion->close();
?>
