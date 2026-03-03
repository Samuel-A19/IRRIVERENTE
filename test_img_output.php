<?php
require_once 'api/conexion.php';
$res = $conexion->query("SELECT id,name,image FROM products ORDER BY id DESC LIMIT 50");
while($r = $res->fetch_assoc()){
    $img = $r['image'] ? $r['image'] : 'Imagenes/default.jpg';
    echo "ID: {$r['id']} | NAME: {$r['name']} | IMAGE_FIELD:'{$r['image']}' | IMG_TAG: <img src=\"{$img}\" style=\"max-width:200px;height:auto\"> <br>\n";
}
?>