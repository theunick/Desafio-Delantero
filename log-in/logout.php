<?php

// Imposta gli header HTTP per permettere le richieste da qualsiasi origine (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Avvia una nuova sessione o riprende una sessione esistente
session_start();

// Rimuove tutte le variabili di sessione attualmente registrate
session_unset();

// Distrugge la sessione corrente
session_destroy();

// Imposta l'header del contenuto come JSON
header('Content-Type: application/json');

// Invia una risposta JSON per confermare il logout
echo json_encode(['success' => true]);
