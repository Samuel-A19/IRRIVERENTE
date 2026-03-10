<?php
session_start();
require_once "conexion.php";

// ==========================================
// VERIFICACIÓN DE PERMISOS DE ADMINISTRADOR
// ==========================================
if (!isset($_SESSION['rango']) || $_SESSION['rango'] !== 'admin') {
    http_response_code(403);
    echo "ERROR_NO_AUTORIZADO";
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo "ERROR: Método no permitido";
    exit;
}

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
if (!$id) {
    echo "ERROR: id inválido";
    exit;
}

// obtener ruta de imagen para eliminar archivo si existe
$res = $conexion->query("SELECT image FROM products WHERE id = $id LIMIT 1");
if ($res && $row = $res->fetch_assoc()) {
    $image = $row['image'];
    if ($image) {
        // evitar eliminación fuera de uploads
        if (strpos($image, 'uploads/') !== false) {
            $file = __DIR__ . '/../' . $image;
            if (file_exists($file)) {
                @unlink($file);
            }
        }
    }
}

// eliminar registro
if ($conexion->query("DELETE FROM products WHERE id = $id")) {
    echo "ok";
} else {
    echo "ERROR: " . $conexion->error;
}

$conexion->close();
?>