// Inizializzazione delle variabili di gioco
let correctLetters, wrongGuessCount, currentWord, currentHint;
const maxGuesses = 6; // Numero massimo di tentativi errati

// Funzione per resettare il gioco
const resetGame = () => {
    correctLetters = []; // Inizializza l'array delle lettere corrette
    wrongGuessCount = 0; // Resetta il contatore dei tentativi errati
    $(".hangman-box img").attr("src", "images/hangman-0.svg"); // Imposta l'immagine dell'impiccato iniziale
    $(".guesses-text b").text(`${wrongGuessCount} / ${maxGuesses}`); // Aggiorna il testo dei tentativi
    $(".word-display").html(currentWord.split("").map(() => '<li class="letter"></li>').join("")); // Mostra i caratteri della parola come elementi <li>
    $(".keyboard button").prop("disabled", false); // Abilita tutti i pulsanti della tastiera
    $(".game-modal").removeClass("show"); // Nasconde il modal di fine gioco
}

// Funzione per ottenere la parola e il suggerimento e resettare il gioco
const getWord = () => {
    $(".hint-text b").text(currentHint); // Mostra il suggerimento
    resetGame(); // Resetta il gioco
}

// Funzione per mostrare il modal di fine gioco
const gameOver = (isVictory) => {
    const modalText = isVictory ? `Hai indovinato la parola:` : 'La parola corretta era:'; // Testo del modal
    $(".game-modal h4").text(isVictory ? 'Congratulazioni!' : 'Game Over!'); // Titolo del modal
    $(".game-modal p").html(`${modalText} <b>${currentWord}</b>`); // Testo del modal
    $(".game-modal").addClass("show"); // Mostra il modal
}

// Funzione per iniziare il gioco con la lettera cliccata
const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) { // Se la parola contiene la lettera cliccata
        [...currentWord].forEach((letter, index) => { // Itera sulla parola corrente
            if (letter === clickedLetter) { // Se la lettera corrisponde a quella cliccata
                correctLetters.push(letter); // Aggiunge la lettera corretta all'array
                $(".word-display li").eq(index).text(letter).addClass("guessed"); // Mostra la lettera corretta
            }
        });
    } else {
        wrongGuessCount++; // Incrementa il contatore dei tentativi errati
        $(".hangman-box img").attr("src", `images/hangman-${wrongGuessCount}.svg`); // Aggiorna l'immagine dell'impiccato
    }

    $(button).prop("disabled", true); // Disabilita il pulsante cliccato
    $(".guesses-text b").text(`${wrongGuessCount} / ${maxGuesses}`); // Aggiorna il testo dei tentativi

    if (wrongGuessCount === maxGuesses) return gameOver(false); // Se il numero massimo di tentativi errati è raggiunto, termina il gioco con sconfitta
    if (correctLetters.length === currentWord.length) return gameOver(true); // Se tutte le lettere sono indovinate, termina il gioco con vittoria
}

// Creazione dei pulsanti della tastiera e aggiunta dei gestori di eventi
for (let i = 97; i <= 122; i++) { // Per ogni lettera dell'alfabeto
    const button = $('<button>').text(String.fromCharCode(i)); // Crea un pulsante con la lettera corrente
    $(".keyboard").append(button); // Aggiunge il pulsante alla tastiera
    button.on("click", function () { initGame(this, String.fromCharCode(i)); }); // Aggiunge l'event handler al pulsante
}

let wordList = [];
let baba = 2; // Variabile non utilizzata

// Quando il documento è pronto
document.addEventListener("DOMContentLoaded", function () {
    // Funzione per chiamare il server e ottenere la parola
    function callData() {
        var url = 'http://localhost:3000/hangman/get_word.php';

        return new Promise((resolve, reject) => {
            $.post(url, function (data) {
                wordList = data; // Assegna i dati ricevuti a wordList
                console.log(wordList);
                currentWord = wordList[0].word.toLowerCase(); // Assegna la parola corrente
                currentHint = wordList[0].hint; // Assegna il suggerimento corrente
                resolve(); // Risolvi la Promise una volta che i dati sono stati ottenuti
            }).fail(function (xhr, status, error) {
                console.error("Failed to fetch data:", status, error);
                reject(error); // Rifiuta la Promise in caso di errore
            });
        });
    }

    // Chiama la funzione callData e gestisce il risultato
    callData().then(() => {
        console.log("Dati ottenuti correttamente:", wordList);
        // Esegui qui altre operazioni che dipendono dai dati ottenuti, se necessario
        getWord(); // Chiamare getWord qui, se necessario
    }).catch(error => {
        console.error("Errore durante il recupero dei dati:", error);
    });
});

// Gestore dell'evento click per il pulsante "again"
$("#again").on("click", function () {
    window.location.reload(); // Ricarica la pagina
});
