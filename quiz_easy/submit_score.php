<?php
include 'db_connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

$conn = connectDB();

$uname = $_POST['userId']; // Nome utente
$user_score = $_POST['score']; // Punteggio dell'utente

$query = "INSERT INTO user_scores (uname, score) VALUES ($1, $2)";
$stmt = pg_prepare($conn, "insert_score", $query);
$result = pg_execute($conn, "insert_score", array($uname, $user_score));
/*
$leaderboardQuery = "SELECT uname, score FROM user_scores WHERE uname IS NOT NULL ORDER BY score DESC LIMIT 10";
$stmt = pg_prepare($conn, "fetch_leaderboard", $leaderboardQuery);

$leaderboardResult = pg_execute($conn, "fetch_leaderboard", array());
$leaderboard = pg_fetch_all($leaderboardResult);

$userPosition = array_search($uname, array_column($leaderboard, 'uname'));

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
*/
pg_close($conn);
