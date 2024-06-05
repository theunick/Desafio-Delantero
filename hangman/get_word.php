<?php
require '../quiz_easy/db_connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

$conn = connectDB();

$query = 'SELECT word, hint FROM hangman ORDER BY RANDOM() LIMIT 1';

$stmt = pg_prepare($conn, "get_random_questions", $query);

$result = pg_execute($conn, "get_random_questions", array())
    or die('Query failed: ' . pg_last_error());

$wordList = [];
while ($row = pg_fetch_assoc($result)) {
    $wordList[] = [
        'word' => $row['word'],
        'hint' => $row['hint'],
    ];
}

$words = json_encode($wordList);
echo $words;

pg_close($conn);
