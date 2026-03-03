<?php
require_once "api/conexion.php";
$res = $conexion->query('SELECT id,name,image FROM products ORDER BY id DESC LIMIT 10');
while($r = $res->fetch_assoc()) {
    echo "{$r['id']} - {$r['name']} - {$r['image']}\n";
}
?>