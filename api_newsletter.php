<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Email no válido']);
    exit;
}

$resend_api_key = getenv('RESEND_API_KEY');

$html_content = '
    <div style="background-color: #0a0a0a; color: #ffffff; padding: 40px; border-top: 5px solid #e8001c; text-align: center; font-family: sans-serif;">
        <h1 style="color: #ffffff; letter-spacing: 2px; text-transform: uppercase;">BIENVENIDO A <span style="color: #e8001c;">DA1</span>MOTORS</h1>
        <p style="color: #c8c8c8; font-size: 16px;">Has entrado en el 1% del 1%.</p>
        <p style="color: #c8c8c8; font-size: 16px;">A partir de ahora, serás el primero en enterarte de las llegadas de hiperdeportivos y subastas privadas.</p>
        <br><br>
        <a href="https://tu-web-aqui.com/cars.php" style="background-color: #e8001c; color: white; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 4px; letter-spacing: 1px;">VER INVENTARIO OCULTO</a>
    </div>
';

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $resend_api_key,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'from' => 'VIP DA1MOTORS <onboarding@resend.dev>',
    'to' => [$email],
    'subject' => 'Acceso a la Carta VIP - DA1MOTORS',
    'html' => $html_content
]));

$response = curl_exec($ch);
curl_close($ch);

$res_data = json_decode($response, true);
if (isset($res_data['id'])) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Fallo al enviar correo']);
}
