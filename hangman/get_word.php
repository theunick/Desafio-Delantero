<?php
// Include il file per la connessione al database
require '../quiz_easy/db_connect.php';

// Imposta gli header HTTP per permettere le richieste da qualsiasi origine (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Connetti al database utilizzando la funzione connectDB definita nel file incluso
$conn = connectDB();

// Preparare la query SQL per selezionare una parola casuale dal database
$query = 'SELECT word, hint FROM hangman ORDER BY RANDOM() LIMIT 1';

// Prepara la query per l'esecuzione
$stmt = pg_prepare($conn, "get_random_questions", $query);

// Esegui la query preparata
$result = pg_execute($conn, "get_random_questions", array())
    or die('Query failed: ' . pg_last_error()); // Se la query fallisce, interrompi l'esecuzione e mostra l'errore

// Creare un array per memorizzare la parola selezionata e il suggerimento
$wordList = [];
while ($row = pg_fetch_assoc($result)) {
    // Aggiungi la parola e il suggerimento all'array
    $wordList[] = [
        'word' => $row['word'], // La parola selezionata
        'hint' => $row['hint'], // Il suggerimento per la parola
    ];
}

// Codifica l'array di parole in formato JSON
$words = json_encode($wordList);
echo $words; // Invia l'array di parole come risposta JSON

// Chiudi la connessione al database
pg_close($conn);
