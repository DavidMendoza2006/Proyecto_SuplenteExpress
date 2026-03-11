<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

$input = json_decode(file_get_contents('php://input'), true);
$historial = $input['historial'] ?? [];

if (empty($historial)) {
    echo json_encode(['error' => 'No se recibió historial.']);
    exit;
}

$apiKey = getenv('GEMINI_API_KEY') ?: $_SERVER['GEMINI_API_KEY'] ?? '';

// Lector de rescate para el Docker local (Busca directamente en tu archivo .env)
if (empty($apiKey) && file_exists(__DIR__ . '/.env')) {
    $lineas = file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lineas as $linea) {
        if (strpos(trim($linea), '#') === 0) continue;
        $partes = explode('=', $linea, 2);
        if (count($partes) == 2 && trim($partes[0]) === 'GEMINI_API_KEY') {
            $apiKey = trim(trim($partes[1]), '"\'');
        }
    }
}

$url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' . $apiKey;

$contents = [];
foreach ($historial as $msg) {
    $contents[] = [
        "role" => $msg['role'] === 'ai' ? 'model' : 'user',
        "parts" => [["text" => $msg['text']]]
    ];
}

$datos = [
    "systemInstruction" => [
        "parts" => [
            ["text" => "Eres el asistente virtual VIP de DA1MOTORS, un concesionario de hiperdeportivos. Profesional, lujoso y directo. Responde de forma concisa. IMPORTANTE: Continúa la conversación de forma natural. NUNCA repitas tu presentación inicial ni vuelvas a decir 'Bienvenido a DA1MOTORS' si ya has saludado."]
        ]
    ],
    "contents" => $contents
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($datos));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$respuestaGoogle = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE); // Sacamos el código de error
$curlError = curl_error($ch);
curl_close($ch);

if ($respuestaGoogle === false) {
    echo json_encode(['error' => 'Fallo de conexión cURL: ' . $curlError]);
} else if ($httpCode >= 400) {
    echo json_encode([
        'error' => 'Google devolvió un error HTTP ' . $httpCode,
        'detalles_google' => json_decode($respuestaGoogle, true)
    ]);
} else {
    echo $respuestaGoogle;
}