<?php
require_once 'api/conexion.php';
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($id) {
    $res = $conexion->query("SELECT id,name,ingredients,price,image FROM products WHERE id=$id");
    if ($res && $r = $res->fetch_assoc()) {
        echo '<pre>'.print_r($r, true).'</pre>';
    } else {
        echo 'no row';
    }
} else {
    echo 'no id';
}
?>