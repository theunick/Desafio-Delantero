let difficulty = 'easy'; // Valore predefinito per la difficoltà

document.addEventListener("DOMContentLoaded", function () {
    const difficultyButtons = document.querySelectorAll('a.btn[data-difficulty]');

    difficultyButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            // Recupera il valore dell'attributo 'data-difficulty' del pulsante cliccato
            difficulty = this.getAttribute('data-difficulty');
            console.log(difficulty);
            sessionStorage.setItem('difficulty', difficulty);
        });
    });
});
