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

// 1. CARGA DE API KEY (Prioridad absoluta al .env con tu nueva clave ...UQ0o)
$apiKey = '';
$env_paths = [__DIR__ . '/.env', '/etc/secrets/.env']; 

foreach ($env_paths as $path) {
    if (file_exists($path)) {
        $lineas = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lineas as $linea) {
            if (strpos(trim($linea), '#') === 0) continue;
            $partes = explode('=', $linea, 2);
            if (count($partes) == 2 && trim($partes[0]) === 'GEMINI_API_KEY') {
                $apiKey = trim(trim($partes[1]), '"\'');
                break 2;
            }
        }
    }
}

if (empty($apiKey)) {
    $apiKey = getenv('GEMINI_API_KEY') ?: $_SERVER['GEMINI_API_KEY'] ?? '';
}

// 2. CONFIGURACIÓN DEL MODELO (Usamos gemini-1.5-flash-latest para evitar el 404)
// URL configurada con el nombre de modelo más estándar
$url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' . $apiKey;
// 3. PREPARACIÓN DEL CONTENIDO
$contents = [];
foreach ($historial as $msg) {
    $contents[] = [
        "role" => $msg['role'] === 'ai' ? 'model' : 'user',
        "parts" => [["text" => $msg['text']]]
    ];
}

// Estructura oficial v1beta: usamos system_instruction (con guion bajo)
$datos = [
    "contents" => $contents,
    "system_instruction" => [
        "parts" => [
            ["text" => "Eres el asistente VIP de DA1MOTORS. Profesional, lujoso y directo. Responde de forma muy breve. No te repitas."]
        ]
    ]
];

// 4. EJECUCIÓN CON CURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($datos));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$respuestaGoogle = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// 5. RESPUESTA AL FRONTEND
$resDecoded = json_decode($respuestaGoogle, true);

if ($httpCode === 200 && isset($resDecoded['candidates'][0]['content']['parts'][0]['text'])) {
    echo $respuestaGoogle;
} else {
    // Si falla el modelo -latest, intentamos el nombre base como último recurso
    $errorMsg = "Control DA1: Error de Satélite ($httpCode)";
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