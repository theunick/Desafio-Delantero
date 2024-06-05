let questions = []; // Inizializza un array vuoto per memorizzare le domande

// Aggiunge un event listener che si attiva quando il contenuto del documento è completamente caricato
document.addEventListener("DOMContentLoaded", function () {

    // Funzione di inizializzazione che viene chiamata quando il documento è pronto
    function init() {
        // Recupera il valore della difficoltà dal session storage
        let difficulty = sessionStorage.getItem('difficulty');

        // Se il valore della difficoltà non è presente nel session storage, termina la funzione
        if (!difficulty) {
            return;
        }

        // Chiama la funzione per recuperare le domande dal server
        callData(difficulty);
    }

    // Funzione che effettua una chiamata al server per recuperare le domande
    function callData(difficulty) {
        console.log("Chiamata callData() iniziata con difficoltà:", difficulty); // Log per debug

        // Costruisce l'URL per la richiesta al server con il parametro di difficoltà
        var url = 'http://localhost:3000/quiz_easy/get_questions.php?diff=' + difficulty;

        // Esegue una richiesta POST al server utilizzando jQuery
        $.post(url, function (data) {
            // Assegna le domande ricevute dal server all'array questions
            questions = data;
            console.log(questions);  // Stampa le domande ricevute nella console per debug
        }).fail(function (xhr, status, error) {
            // Se la richiesta fallisce, stampa un messaggio di errore nella console
            console.error("Failed to fetch data:", status, error);
        });
    }

    // Chiama la funzione di inizializzazione quando il documento è pronto
    init();
});
