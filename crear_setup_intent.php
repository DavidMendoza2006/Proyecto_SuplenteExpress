<?php
require_once('vendor/autoload.php');

\Stripe\Stripe::setApiKey('sk_test_51T96SRAwHprUZMBwd6ZOBC4wIPPyEFp0VLdSahaSmYLTrl6VJx54QRvWkKhhvjoMPu1l8EEsdq1Lo4m0fEQIuWUU00S3iRR13Y');

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