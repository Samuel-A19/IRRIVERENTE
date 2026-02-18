<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

require "conexion.php";

$ACCESS_TOKEN = 'TEST-8697586186314967-020907-840968211a6dfe78f624a4dc05b0f4c3-3181533452';

// LEER JSON
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data || empty($data['carrito']) || empty($data['id_usuario'])) {
    echo json_encode(["error" => "Datos incompletos"]);
    exit;
}

$id_usuario = intval($data['id_usuario']);
$carrito = $data['carrito'];

// GENERAR CÓDIGO PEDIDO
$codigo = rand(1000, 9999);

// CALCULAR TOTAL
$total = 0;
foreach ($carrito as $p) {
    $precio = (int) preg_replace('/[^0-9]/', '', $p['precio']);
    $cantidad = (int)($p['cantidad'] ?? 1);
    $total += $precio * $cantidad;
}

// INSERTAR PEDIDO
$stmt = $conexion->prepare("INSERT INTO pedidos (id_usuario, codigo_pedido, total) VALUES (?, ?, ?)");
$stmt->bind_param("isd", $id_usuario, $codigo, $total);
$stmt->execute();
$id_pedido = $stmt->insert_id;

// INSERTAR DETALLE
foreach ($carrito as $p) {

    $precio = (int) preg_replace('/[^0-9]/', '', $p['precio']);
    $cantidad = (int)($p['cantidad'] ?? 1);

    $stmtDetalle = $conexion->prepare(
        "INSERT INTO pedido_detalle (id_pedido, nombre_producto, precio, cantidad)
         VALUES (?, ?, ?, ?)"
    );

    $stmtDetalle->bind_param(
        "isdi",
        $id_pedido,
        $p['nombre'],
        $precio,
        $cantidad
    );

    $stmtDetalle->execute();
}

// ARMAR ITEMS PARA MERCADOPAGO
$items = [];

foreach ($carrito as $p) {

    $precio = (int) preg_replace('/[^0-9]/', '', $p['precio']);
    $cantidad = (int)($p['cantidad'] ?? 1);

    if ($precio <= 0) continue;

    $items[] = [
        "title" => $p['nombre'],
        "quantity" => $cantidad,
        "unit_price" => $precio,
        "currency_id" => "COP"
    ];
}

if (!$items) {
    echo json_encode(["error" => "Items inválidos"]);
    exit;
}

// CREAR PREFERENCIA
$preference = [
    "items" => $items,
    "back_urls" => [
        "success" => "http://localhost/IRRIVERENTE/pago_exitoso.html",
        "failure" => "http://localhost/IRRIVERENTE/pago_error.html",
        "pending" => "http://localhost/IRRIVERENTE/pago_pendiente.html"
    ],
];

$ch = curl_init("https://api.mercadopago.com/checkout/preferences");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $ACCESS_TOKEN",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($preference));

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);

// RESPUESTA FINAL
echo json_encode([
    "sandbox_init_point" => $result['sandbox_init_point']
]);
exit;
