<?php
session_start();
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['user_id'])) {
    $_SESSION['usuario_id'] = $data['user_id'];
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>