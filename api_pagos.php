<?php
require_once('vendor/autoload.php');

\Stripe\Stripe::setApiKey('sk_test_51T96SRAwHprUZMBwd6ZOBC4wIPPyEFp0VLdSahaSmYLTrl6VJx54QRvWkKhhvjoMPu1l8EEsdq1Lo4m0fEQIuWUU00S3iRR13Y');

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$user_id = $data['user_id'];

try {
    $customer = \Stripe\Customer::create([
      'email' => $email,
      'metadata' => ['supabase_id' => $user_id]
    ]);
    
    echo json_encode(['status' => 'success', 'customer_id' => $customer->id]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}