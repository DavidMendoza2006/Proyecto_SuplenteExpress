<?php
session_start();

$host = "aws-1-eu-north-1.pooler.supabase.com"; 

$port = "5432";

$dbname = "postgres";

$user = "postgres.xqtxmceatjupoasnllot"; 

$password = "iNEG4koQOtdzF1Z4"; 

$dsn = "pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password;sslmode=require";

try {
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die(json_encode(["status" => "error", "message" => "Error BD: " . $e->getMessage()]));
}
?>

