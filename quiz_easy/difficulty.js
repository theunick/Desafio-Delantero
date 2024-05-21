let difficulty = 'easy'; // Imposta un valore predefinito per la difficoltà

// Aggiunge un event listener che si attiva quando il contenuto del documento è completamente caricato
document.addEventListener("DOMContentLoaded", function () {
    // Seleziona tutti gli elementi 'a' con la classe 'btn' e un attributo 'data-difficulty'
    const difficultyButtons = document.querySelectorAll('a.btn[data-difficulty]');

    // Per ogni pulsante trovato, aggiunge un event listener per il click
    difficultyButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            // Recupera il valore dell'attributo 'data-difficulty' del pulsante cliccato
            difficulty = this.getAttribute('data-difficulty');
            console.log(difficulty); // Mostra il valore della difficoltà nel console log
            // Salva il valore della difficoltà nel session storage del browser
            sessionStorage.setItem('difficulty', difficulty);
        });
    });
});
