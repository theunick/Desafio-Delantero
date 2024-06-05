let correctLetters, wrongGuessCount, currentWord, currentHint;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0; 
    $(".hangman-box img").attr("src", "images/hangman-0.svg"); // Imposta l'immagine iniziale
    $(".guesses-text b").text(`${wrongGuessCount} / ${maxGuesses}`);
    $(".word-display").html(currentWord.split("").map(() => '<li class="letter"></li>').join(""));
    $(".keyboard button").prop("disabled", false); 
    $(".game-modal").removeClass("show");
}

const getWord = () => {
    $(".hint-text b").text(currentHint);
    resetGame();
}

const gameOver = (isVictory) => {
    const modalText = isVictory ? `Hai indovinato la parola:` : 'La parola corretta era:'; 
    $(".game-modal h4").text(isVictory ? 'Congratulazioni!' : 'Game Over!');
    $(".game-modal p").html(`${modalText} <b>${currentWord}</b>`);
    $(".game-modal").addClass("show");
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) { 
        [...currentWord].forEach((letter, index) => { 
            if (letter === clickedLetter) { 
                correctLetters.push(letter); 
                $(".word-display li").eq(index).text(letter).addClass("guessed");
            }
        });
    } else {
        wrongGuessCount++; 
        $(".hangman-box img").attr("src", `images/hangman-${wrongGuessCount}.svg`); 
    }

    $(button).prop("disabled", true); 
    $(".guesses-text b").text(`${wrongGuessCount} / ${maxGuesses}`); 

    if (wrongGuessCount === maxGuesses) return gameOver(false); 
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

// Creazione della tastiera
for (let i = 97; i <= 122; i++) { 
    const button = $('<button>').text(String.fromCharCode(i));
    $(".keyboard").append(button); 
    button.on("click", function () { initGame(this, String.fromCharCode(i)); }); 
}

let wordList = [];
let baba = 2; // Variabile non utilizzata

document.addEventListener("DOMContentLoaded", function () {
    function callData() {
        var url = 'http://localhost:3000/hangman/get_word.php';

        return new Promise((resolve, reject) => {
            $.post(url, function (data) {
                wordList = data;
                console.log(wordList);
                currentWord = wordList[0].word.toLowerCase();
                currentHint = wordList[0].hint;
                resolve(); 
            }).fail(function (xhr, status, error) {
                console.error("Failed to fetch data:", status, error);
                reject(error);
            });
        });
    }

    callData().then(() => {
        console.log("Dati ottenuti correttamente:", wordList);
        getWord();
    }).catch(error => {
        console.error("Errore durante il recupero dei dati:", error);
    });
});

$("#again").on("click", function () {
    window.location.reload(); // Ricarica la pagina
});
