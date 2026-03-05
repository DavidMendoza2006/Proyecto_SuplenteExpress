<?php
header('Content-Type: application/json');
require 'conexion.php';

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["status" => "error", "message" => "No hay sesión en PHP"]);
    exit;
}

$uid = $_SESSION['usuario_id'];

try {
    $stmt = $pdo->prepare("SELECT * FROM perfiles WHERE id = :id::uuid");
    $stmt->execute([':id' => $uid]);
    $perfil = $stmt->fetch();

    $stmtKpis = $pdo->prepare("
        SELECT 
            COUNT(id) as total_pedidos,
            COALESCE(SUM(precio_pagado), 0) as total_gastado
        FROM pedidos 
        WHERE usuario_id = :id::uuid
    ");
    $stmtKpis->execute([':id' => $uid]);
    $kpis = $stmtKpis->fetch();

    $stmtFavs = $pdo->prepare("SELECT COUNT(id) as total_favs FROM favoritos WHERE usuario_id = :id::uuid");
    $stmtFavs->execute([':id' => $uid]);
    $favs = $stmtFavs->fetch();

    echo json_encode([
        "status" => "success",
        "perfil" => $perfil,
        "kpis" => [
            "pedidos" => $kpis['total_pedidos'],
            "gastado" => $kpis['total_gastado'],
            "favoritos" => $favs['total_favs']
        ]
    ]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Error SQL: " . $e->getMessage()]);
}
?>