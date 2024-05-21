<?php

// Inizia la sessione
session_start();

// Include il file per la connessione al database
require '../quiz_easy/db_connect.php';

// Filtra e sanitizza i dati di input (nome e password) per prevenire attacchi XSS e SQL injection
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

// Connetti al database utilizzando la funzione connectDB definita nel file incluso
$conn = connectDB();

// Prepara una query SQL per selezionare il nome e la password dell'utente dal database
$query = "SELECT name, password FROM users WHERE name = $1";
$result = pg_prepare($conn, "login_user", $query);

// Esegui la query preparata passando il nome dell'utente come parametro
$result = pg_execute($conn, "login_user", array($name));

// Controlla se la query ha restituito dei risultati
if ($result && pg_num_rows($result) > 0) {
    // Recupera i dati dell'utente dalla query
    $user = pg_fetch_assoc($result);

    // Verifica la password inserita dall'utente confrontandola con quella memorizzata nel database
    if (password_verify($password, $user['password'])) {
        // Se la password è corretta, imposta il nome utente nella sessione
        $_SESSION['user_name'] = $name;

        // Risposta JSON con successo e l'ID utente
        echo json_encode(['success' => true, 'userId' => $_SESSION['user_name']]);
    } else {
        // Se la password è errata, invia una risposta JSON con un messaggio di errore
        echo json_encode(['success' => false, 'message' => 'Incorrect password.']);
    }
} else {
    // Se non è stato trovato alcun utente con il nome inserito, invia una risposta JSON con un messaggio di errore
    echo json_encode(['success' => false, 'message' => 'No user found with this name.']);
}

// Chiude la connessione al database
pg_close($conn);
