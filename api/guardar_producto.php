<?php
require_once "conexion.php";

$name = $_POST['titulo'];
$ingredients = $_POST['descripcion'];
$price = floatval($_POST['precio']);
$category = $_POST['tipo'];
$is_pizza = ($category === "pizza") ? 1 : 0;

$imagePath = NULL;

if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === 0) {

    $extension = strtolower(pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION));
    $newName = time() . "_" . rand(1000, 9999) . "." . $extension;

    $destination = "../uploads/" . $newName;

    if (move_uploaded_file($_FILES['imagen']['tmp_name'], $destination)) {
        $imagePath = "uploads/" . $newName;
    }
}

$sql = "INSERT INTO products (name, ingredients, price, category, is_pizza, image)
        VALUES ('$name', '$ingredients', $price, '$category', $is_pizza, " .
    ($imagePath ? "'$imagePath'" : "NULL") . ")";

if ($conexion->query($sql)) {
    echo "ok";
} else {
    echo "ERROR: " . $conexion->error;
}

$conexion->close();
?>