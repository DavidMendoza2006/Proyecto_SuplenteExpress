<?php
require_once('vendor/autoload.php');

\Stripe\Stripe::setApiKey(getenv('STRIPE_SECRET_KEY'));

header('Content-Type: application/json');

try {
    $setupIntent = \Stripe\SetupIntent::create([
        'usage' => 'off_session',
    ]);

    echo json_encode([
        'status' => 'success',
        'clientSecret' => $setupIntent->client_secret
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
