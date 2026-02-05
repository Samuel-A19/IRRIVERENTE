<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

$ACCESS_TOKEN = "TEST-";

$data = json_decode(file_get_contents("php://input"), true);
$carrito = $data["carrito"] ?? [];

if (empty($carrito)) {
    echo json_encode(["error" => "Carrito vacío"]);
    exit;
}

$items = [];

foreach ($carrito as $p) {
    $precioLimpio = preg_replace('/[^0-9]/', '', $p["precio"]);

    $items[] = [
        "title" => $p["nombre"],
        "quantity" => (int)$p["cantidad"],
        "unit_price" => (float)$precioLimpio,
        "currency_id" => "COP"
    ];
}

$preference = [
    "items" => $items,
    "back_urls" => [
        "success" => "http://localhost/IRRIVERENTE/Siguepedido.html",
        "failure" => "http://localhost/IRRIVERENTE/Pago.html",
        "pending" => "http://localhost/IRRIVERENTE/Siguepedido.html"
    ],
    "auto_return" => "approved"
];

$ch = curl_init("https://api.mercadopago.com/checkout/preferences");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer $ACCESS_TOKEN",
        "Content-Type: application/json"
    ],
    CURLOPT_POSTFIELDS => json_encode($preference)
]);

$response = curl_exec($ch);

if ($response === false) {
    echo json_encode(["error" => curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

$respuesta = json_decode($response, true);

if (!isset($respuesta["init_point"])) {
    echo json_encode([
        "error" => "Mercado Pago no devolvió init_point",
        "respuesta" => $respuesta
    ]);
    exit;
}

echo json_encode([
    "init_point" => $respuesta["init_point"]
]);
