<?php

// Funzione per connettersi al database
function connectDB()
{
    $host = "localhost"; // Indirizzo del server del database
    $port = "5454"; // Porta su cui il server del database è in ascolto
    $dbname = "desafio_delantero"; // Nome del database a cui connettersi
    $user = "postgres"; // Nome utente per l'accesso al database
    $password = "Nick1901"; // Password per l'accesso al database

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Content-Type: application/json; charset=UTF-8");

    $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password")
        or die('Could not connect: ' . pg_last_error());

    return $conn;
}
