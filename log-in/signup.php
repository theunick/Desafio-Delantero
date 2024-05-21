<?php
// Include il file per la connessione al database
include '../quiz_easy/db_connect.php';

// Imposta gli header HTTP per permettere le richieste da qualsiasi origine (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Connetti al database utilizzando la funzione connectDB definita nel file incluso
$conn = connectDB();

// Filtra e sanitizza i dati di input per prevenire attacchi XSS e SQL injection
$name = filter_var($_POST['uname'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['uemail'], FILTER_SANITIZE_EMAIL);
$password = filter_var($_POST['upassword'], FILTER_SANITIZE_STRING);

// Controlla se l'email è già presente nel database
$queryCheckEmail = "SELECT email FROM users WHERE email = $1";
$resultCheck = pg_prepare($conn, "check_email", $queryCheckEmail);
$resultCheck = pg_execute($conn, "check_email", array($email));

// Se l'email è già registrata, invia un messaggio di errore
if (pg_num_rows($resultCheck) > 0) {
    echo json_encode(array("error" => "Email già registrata."));
    pg_close($conn);
    exit; // Termina l'esecuzione dello script
}

// Hash della password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Query SQL per inserire i nuovi dati dell'utente nel database
$query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";
$stmt = pg_prepare($conn, "insert_user", $query);
$result = pg_execute($conn, "insert_user", array($name, $email, $hashed_password));

// Verifica se l'inserimento è andato a buon fine
if ($result) {
    // Se l'inserimento ha avuto successo, invia un messaggio di successo
    echo json_encode(array("success" => "Registrazione completata con successo!"));
} else {
    // Gestisci specificamente l'errore di duplicazione dell'email
    $error = pg_last_error($conn);
    if (strpos($error, "users_email_key") !== false) {
        // Se l'errore riguarda una email duplicata, invia un messaggio di errore specifico
        echo json_encode(array("error" => "Email già registrata."));
    } else {
        // Per qualsiasi altro errore, invia un messaggio di errore generico
        echo json_encode(array("error" => "Errore durante la registrazione: " . $error));
    }
}

// Chiude la connessione al database
pg_close($conn);
