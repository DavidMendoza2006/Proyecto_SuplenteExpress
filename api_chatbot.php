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

$apiKey = '';
$env_paths = [__DIR__ . '/.env', '/etc/secrets/.env']; 

// Primero busca físicamente en los archivos .env
foreach ($env_paths as $path) {
    if (file_exists($path)) {
        $lineas = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lineas as $linea) {
            if (strpos(trim($linea), '#') === 0) continue; // Ignora los comentarios
            $partes = explode('=', $linea, 2);
            if (count($partes) == 2 && trim($partes[0]) === 'GEMINI_API_KEY') {
                $apiKey = trim(trim($partes[1]), '"\'');
                break 2; // Detiene la búsqueda al encontrarla
            }
        }
    }
}

if (empty($apiKey)) {
    $apiKey = getenv('GEMINI_API_KEY') ?: $_SERVER['GEMINI_API_KEY'] ?? '';
}

if (empty($apiKey)) {
    echo json_encode([
        "candidates" => [["content" => ["parts" => [["text" => "DA1 Control: API Key no encontrada en el sistema."]]]]]
    ]);
    exit;
}

$url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' . $apiKey;


$contents = [];

$contents[] = [
    "role" => "user",
    "parts" => [["text" => "INSTRUCCIONES DE COMPORTAMIENTO: A partir de ahora eres el asistente VIP de DA1MOTORS, un concesionario de hiperdeportivos. Eres muy profesional, lujoso y vas directo al grano. Responde de forma breve y nunca repitas tu saludo inicial."]]
];

$contents[] = [
    "role" => "model",
    "parts" => [["text" => "Entendido. Acepto mi rol como asistente VIP de DA1MOTORS. ¿En qué puedo ayudar al cliente?"]]
];

foreach ($historial as $msg) {
    $contents[] = [
        "role" => $msg['role'] === 'ai' ? 'model' : 'user',
        "parts" => [["text" => $msg['text']]]
    ];
}

$datos = [
    "contents" => $contents
];


$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($datos));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$respuestaGoogle = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);


if ($respuestaGoogle === false) {
    echo json_encode([
        "candidates" => [["content" => ["parts" => [["text" => "DA1 Control: Fallo interno de red cURL ($curlError)"]]]]]
    ]);
    exit;
}

$resDecoded = json_decode($respuestaGoogle, true);

if ($httpCode === 200 && isset($resDecoded['candidates'][0]['content']['parts'][0]['text'])) {
    echo $respuestaGoogle;
} else {
    $errorMsg = "DA1 Control: Error de Satélite ($httpCode)";
    if (isset($resDecoded['error']['message'])) {
        $errorMsg = "DA1 Control: " . $resDecoded['error']['message'];
    }
    
    echo json_encode([
        "candidates" => [[
            "content" => [
                "parts" => [["text" => $errorMsg]]
            ]
        ]]
    ]);
}