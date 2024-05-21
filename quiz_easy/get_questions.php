<?php
// Include il file per la connessione al database
include 'db_connect.php';

// Imposta gli header HTTP per permettere le richieste da qualsiasi origine (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Connetti al database utilizzando la funzione connectDB definita nel file incluso
$conn = connectDB();

// Ottieni il livello di difficoltà dalla query string
$difficulty = isset($_GET['diff']) ? $_GET['diff'] : 'easy'; // Default a 'easy' se non specificato

// Preparare la query SQL filtrando per difficoltà e randomizzando i risultati
$query = 'SELECT id, question, answer, option1, option2, option3, option4 FROM questions WHERE diff = $1 ORDER BY RANDOM() LIMIT 10';

// Prepara la query per l'esecuzione
$stmt = pg_prepare($conn, "get_random_questions", $query);

// Esegui la query con il parametro fornito (livello di difficoltà)
$result = pg_execute($conn, "get_random_questions", array($difficulty))
    or die('Query failed: ' . pg_last_error()); // Se la query fallisce, interrompi l'esecuzione e mostra l'errore

// Creare un array per memorizzare tutte le domande selezionate
$questions_array = [];
while ($row = pg_fetch_assoc($result)) {
    // Aggiungi ogni domanda all'array come un array associativo
    $questions_array[] = [
        'numb' => $row['id'], // ID della domanda
        'question' => $row['question'], // Testo della domanda
        'answer' => $row['answer'], // Risposta corretta
        'options' => [$row['option1'], $row['option2'], $row['option3'], $row['option4']], // Opzioni di risposta
    ];
}

// Codifica l'array di domande in formato JSON
$questions = json_encode($questions_array);
echo $questions; // Invia l'array di domande come risposta JSON

// Chiudi la connessione al database
pg_close($conn);
