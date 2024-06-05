<?php
include 'db_connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

$conn = connectDB();

$difficulty = isset($_GET['diff']) ? $_GET['diff'] : 'easy'; // Default a 'easy' se non specificato

$query = 'SELECT id, question, answer, option1, option2, option3, option4 FROM questions WHERE diff = $1 ORDER BY RANDOM() LIMIT 10';
$stmt = pg_prepare($conn, "get_random_questions", $query);
$result = pg_execute($conn, "get_random_questions", array($difficulty))
    or die('Query failed: ' . pg_last_error());

// Creare un array per memorizzare tutte le domande selezionate
$questions_array = [];
while ($row = pg_fetch_assoc($result)) {
    $questions_array[] = [
        'numb' => $row['id'],
        'question' => $row['question'],
        'answer' => $row['answer'], 
        'options' => [$row['option1'], $row['option2'], $row['option3'], $row['option4']],
    ];
}

$questions = json_encode($questions_array);
echo $questions; // Invia l'array di domande come risposta JSON

pg_close($conn);
