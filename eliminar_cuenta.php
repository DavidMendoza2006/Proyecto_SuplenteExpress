<?php
include 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(['status' => 'error', 'message' => 'ID no proporcionado']);
    exit;
}

try {
    $pdo->beginTransaction();

    $queries = [
        "DELETE FROM favoritos WHERE usuario_id = ?",
        "DELETE FROM marketplace_ofertas WHERE usuario_id = ?",
        "DELETE FROM pedidos WHERE usuario_id = ?",
        "DELETE FROM perfiles WHERE id = ?"
    ];

    foreach ($queries as $sql) {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$user_id]);
    }

    $pdo->commit();
    echo json_encode(['status' => 'success']);

} catch (Exception $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>