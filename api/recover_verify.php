<?php
session_start();

if (!isset($_POST['codigo']) || empty($_POST['codigo'])) {
    echo "Código requerido";
    exit;
}

if (!isset($_SESSION['recover_code'], $_SESSION['recover_exp'])) {
    echo "No hay un proceso de recuperación activo";
    exit;
}

if (time() > $_SESSION['recover_exp']) {
    echo "El código ha expirado";
    exit;
}

if ($_POST['codigo'] == $_SESSION['recover_code']) {
    echo "ok";
} else {
    echo "Código incorrecto";
}
