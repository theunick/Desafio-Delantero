<?php
// Include il file per la connessione al database
include 'db_connect.php';

// Imposta gli header HTTP per permettere le richieste da qualsiasi origine (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Connetti al database utilizzando la funzione connectDB definita nel file incluso
$conn = connectDB();

// Recupera i dati POST inviati dalla richiesta
$uname = $_POST['userId']; // Nome utente
$user_score = $_POST['score']; // Punteggio dell'utente

// Prepara la query SQL per inserire i dati nel database
$query = "INSERT INTO user_scores (uname, score) VALUES ($1, $2)";
$stmt = pg_prepare($conn, "insert_score", $query);

// Esegui la query preparata con i parametri specificati (nome utente e punteggio)
$result = pg_execute($conn, "insert_score", array($uname, $user_score));

// Prepara la query SQL per ottenere la leaderboard (i migliori 10 punteggi)
$leaderboardQuery = "SELECT uname, score FROM user_scores WHERE uname IS NOT NULL ORDER BY score DESC LIMIT 10";
$stmt = pg_prepare($conn, "fetch_leaderboard", $leaderboardQuery);

// Esegui la query preparata per ottenere la leaderboard
$leaderboardResult = pg_execute($conn, "fetch_leaderboard", array());

// Recupera tutti i risultati della query in un array associativo
$leaderboard = pg_fetch_all($leaderboardResult);

// Trova la posizione dell'utente nella leaderboard
$userPosition = array_search($uname, array_column($leaderboard, 'uname'));

// Aggiungi 1 alla posizione perché array_search ritorna l'indice basato su zero
if ($userPosition !== false) {
    $userPosition += 1; // Converti in posizione basata su uno per visualizzazione
}

// Crea un array di risposta con i dati dell'utente e la leaderboard
$response_data = [
    'userName' => $uname, // Nome utente
    'score' => $user_score, // Punteggio dell'utente
    'leaderboard' => $leaderboard, // Leaderboard
    'userPosition' => $userPosition // Posizione dell'utente nella leaderboard
];

// Invia i dati come JSON
echo json_encode($response_data);

// Chiudi la connessione al database
pg_close($conn);
