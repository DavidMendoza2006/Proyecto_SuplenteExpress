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

$apiKey = getenv('GEMINI_API_KEY');
$url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=' . $apiKey;

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

if ($respuestaGoogle === false) {
    echo json_encode(['error' => 'Error cURL: ' . curl_error($ch)]);
} else {
    echo $respuestaGoogle;
}
curl_close($ch);
