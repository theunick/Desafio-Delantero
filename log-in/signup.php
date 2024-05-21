<?php
include '../quiz_easy/db_connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

$conn = connectDB();

$name = filter_var($_POST['uname'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['uemail'], FILTER_SANITIZE_EMAIL);
$password = filter_var($_POST['upassword'], FILTER_SANITIZE_STRING);

$queryCheckEmail = "SELECT email FROM users WHERE email = $1";
$resultCheck = pg_prepare($conn, "check_email", $queryCheckEmail);
$resultCheck = pg_execute($conn, "check_email", array($email));

if (pg_num_rows($resultCheck) > 0) {
    echo json_encode(array("error" => "Email già registrata."));
    pg_close($conn);
    exit;
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";
$stmt = pg_prepare($conn, "insert_user", $query);
$result = pg_execute($conn, "insert_user", array($name, $email, $hashed_password));

if ($result) {
    echo json_encode(array("success" => "Registrazione completata con successo!"));
} else {
    $error = pg_last_error($conn);
    if (strpos($error, "users_email_key") !== false) {
        echo json_encode(array("error" => "Email già registrata."));
    } else {
        echo json_encode(array("error" => "Errore durante la registrazione: " . $error));
    }
}

pg_close($conn);
