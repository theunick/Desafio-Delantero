<?php
// Include il file per la connessione al database
require '../quiz_easy/db_connect.php';

// Imposta gli header HTTP per permettere le richieste da qualsiasi origine (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Connetti al database utilizzando la funzione connectDB definita nel file incluso
$conn = connectDB();

// Definisce la query SQL per ottenere i primi 5 utenti con i punteggi più alti, ignorando i nomi utente null o vuoti
$leaderboardQuery = "SELECT uname, score FROM user_scores WHERE uname IS NOT NULL AND uname != 'null' AND uname != '' ORDER BY score DESC LIMIT 5";

// Prepara la query per l'esecuzione
$stmt = pg_prepare($conn, "fetch_leaderboard", $leaderboardQuery);

// Esegue la query preparata
$leaderboardResult = pg_execute($conn, "fetch_leaderboard", array());

// Recupera tutti i risultati della query in un array associativo
$leaderboard = pg_fetch_all($leaderboardResult);

// Prepara i dati per la risposta JSON
$response_data = [
    'leaderboard' => $leaderboard,
];

// Invia i dati come JSON
echo json_encode($response_data);
