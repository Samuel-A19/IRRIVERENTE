<?php
require_once "conexion.php";

// si se añadió la columna is_promo, sólo traemos productos normales
$promoCheck = $conexion->query("SHOW COLUMNS FROM products LIKE 'is_promo'");
if ($promoCheck && $promoCheck->num_rows > 0) {
    $sql = "SELECT * FROM products WHERE is_promo = 0 ORDER BY id DESC";
} else {
    $sql = "SELECT * FROM products ORDER BY id DESC";
}
$resultado = $conexion->query($sql);

if ($resultado->num_rows > 0) {

    while ($row = $resultado->fetch_assoc()) {

        $imagen = $row['image'] ? $row['image'] : 'Imagenes/default.jpg';
        // si la ruta es relativa y no comienza por / o http, convertir a ruta absoluta del proyecto
        if ($row['image'] && strpos($imagen, '/') !== 0 && strpos($imagen, 'http') !== 0) {
            $imagen = '/IRRIVERENTE/' . $imagen;
        }
        $precio = $row['price'] ? number_format($row['price'], 0, ',', '.') : '0';
?>

        <div class="card" data-category="<?php echo strtolower($row['category']); ?>" data-id="<?php echo $row['id']; ?>" data-name="<?php echo htmlspecialchars($row['name']); ?>" data-desc="<?php echo htmlspecialchars($row['ingredients']); ?>" data-price="<?php echo $row['price']; ?>" data-cat="<?php echo $row['category']; ?>">
            <img src="<?php echo $imagen; ?>" alt="">
            <div class="card-content">
                <h3><?php echo $row['name']; ?></h3>
                <p><?php echo $row['ingredients']; ?></p>
                <span>Desde $<?php echo $precio; ?></span>
            </div>
            <button class="btn-add">Añadir</button>
            <div class="card-admin-btns" style="display:none;">
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Eliminar</button>
            </div>
        </div>

<?php
    }

} else {
    echo "<p>No hay productos registrados.</p>";
}

$conexion->close();
?>