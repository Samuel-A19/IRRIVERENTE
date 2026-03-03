<?php
require_once "conexion.php";

$name = $_POST['titulo'];
$ingredients = $_POST['descripcion'];
$price = floatval($_POST['precio']);
$category = $_POST['tipo'];

$imagePath = NULL;

if (isset($_FILES['imagen'])) {
    if ($_FILES['imagen']['error'] === 0) {

        $extension = strtolower(pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION));
        $newName = time() . "_" . rand(1000, 9999) . "." . $extension;

        $destination = "../uploads/" . $newName;

        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $destination)) {
            $imagePath = "uploads/" . $newName;
        } else {
            // fallo al mover, registramos para depuración
            error_log("[guardar_producto] no se pudo mover la imagen a " . $destination);
        }
    } else {
        // el archivo estuvo presente pero llegó con error
        error_log("[guardar_producto] error en la subida de imagen: " . $_FILES['imagen']['error']);
    }
}

// determinar si es promoción (se espera 0/1 en el formulario)
$isPromo = isset($_POST['is_promo']) && intval($_POST['is_promo']) === 1 ? 1 : 0;

// si la columna is_promo no existe, la base de datos lo ignorará en la inserción
// si se proporciona id => actualizar en lugar de insertar
if (isset($_POST['id']) && intval($_POST['id']) > 0) {
    $id = intval($_POST['id']);
    $sql = "UPDATE products SET name='$name', ingredients='$ingredients', price=$price, category='$category'";
    if ($imagePath) {
        $sql .= ", image='$imagePath'";
    }
    if ($isPromo) {
        $sql .= ", is_promo=$isPromo";
    }
    $sql .= " WHERE id=$id";

    $result = $conexion->query($sql);
    if ($result) {
        if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === 0 && !$imagePath) {
            echo "ERROR_IMG";
        } else {
            echo "ok";
        }
    } else {
        echo "ERROR: " . $conexion->error;
    }

} else {
    // realizar inserción
    $sql = "INSERT INTO products (name, ingredients, price, category, image" .
            ($isPromo ? ", is_promo" : "") . ")
            VALUES ('$name', '$ingredients', $price, '$category', " .
            ($imagePath ? "'$imagePath'" : "NULL") .
            ($isPromo ? ", $isPromo" : "") . ")";

    $result = $conexion->query($sql);
    if ($result) {
        if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === 0 && !$imagePath) {
            echo "ERROR_IMG";
        } else {
            echo "ok";
        }
    } else {
        echo "ERROR: " . $conexion->error;
    }
}

$conexion->close();
?>