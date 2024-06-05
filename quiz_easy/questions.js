let questions = [];

document.addEventListener("DOMContentLoaded", function () {

    function init() {
        // Recupera il valore della difficoltà dal session storage
        let difficulty = sessionStorage.getItem('difficulty');

        if (!difficulty) {
            return;
        }
        callData(difficulty);
    }

    function callData(difficulty) {
        console.log("Chiamata callData() iniziata con difficoltà:", difficulty);

        var url = 'http://localhost:3000/quiz_easy/get_questions.php?diff=' + difficulty;

        $.post(url, function (data) {
            questions = data;
            console.log(questions);
        }).fail(function (xhr, status, error) {
            console.error("Failed to fetch data:", status, error);
        });
    }
    init();
});
