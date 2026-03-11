<?php
require_once "conexion.php";

// comprobar si existe la columna is_promo
$promoCheck = $conexion->query("SHOW COLUMNS FROM products LIKE 'is_promo'");

if ($promoCheck && $promoCheck->num_rows > 0) {
    $sql = "SELECT * FROM products WHERE is_promo = 1 ORDER BY id DESC";
} else {
    echo "<p>No hay promociones porque falta la columna <code>is_promo</code> en la tabla.</p>";
    $conexion->close();
    exit;
}

$resultado = $conexion->query($sql);

if ($resultado && $resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $imagen = $row['image'] ? $row['image'] : 'Imagenes/default.jpg';
        // convertir a ruta absoluta si es relativa
        if ($row['image'] && strpos($imagen, '/') !== 0 && strpos($imagen, 'http') !== 0) {
            $imagen = '/IRRIVERENTE/' . $imagen;
        }
        ?>
        <div class="promo" data-id="<?php echo $row['id']; ?>" data-name="<?php echo htmlspecialchars($row['name']); ?>" data-desc="<?php echo htmlspecialchars($row['ingredients']); ?>" data-price="<?php echo $row['price']; ?>" data-cat="<?php echo $row['category']; ?>">
            <img src="<?php echo $imagen; ?>" alt="<?php echo htmlspecialchars($row['name']); ?>">
            <div class="promo-content">
                <h3><?php echo htmlspecialchars($row['name']); ?></h3>
                <p><?php echo htmlspecialchars($row['ingredients']); ?></p>
                <span>Desde $<?php echo number_format($row['price'],2); ?></span>
            </div>
            <button class="btn-promo">AÑADIR AL CARRITO</button>
            <div class="promo-admin-btns" style="display:none;">
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Eliminar</button>
            </div>
        </div>
        <?php
    }
} else {
    
}

$conexion->close();
