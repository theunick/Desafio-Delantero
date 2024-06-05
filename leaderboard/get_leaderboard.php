<?php
require '../quiz_easy/db_connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

$conn = connectDB();

$leaderboardQuery = "SELECT uname, score FROM user_scores WHERE uname IS NOT NULL AND uname != 'null' AND uname != '' ORDER BY score DESC LIMIT 5";

$stmt = pg_prepare($conn, "fetch_leaderboard", $leaderboardQuery);

$leaderboardResult = pg_execute($conn, "fetch_leaderboard", array());

$leaderboard = pg_fetch_all($leaderboardResult);

$response_data = [
    'leaderboard' => $leaderboard,
];

// Invia i dati come JSON
echo json_encode($response_data);
