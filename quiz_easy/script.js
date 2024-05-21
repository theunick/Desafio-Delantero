// Selezione degli elementi del DOM e memorizzazione nelle variabili con jQuery
const $startBtn = $(".start_btn button");
const $infoBox = $(".info_box");
const $introBox = $("#intro_box");
const $exitBtn = $(".buttons .quit", $infoBox);
const $backBtn = $("#back", $infoBox);
const $continueBtn = $(".buttons .restart", $infoBox);
const $quizBox = $(".quiz_box");
const $resultBox = $(".result_box");
const $optionList = $(".option_list");
const $timeLine = $("header .time_line");
const $timeText = $(".timer .time_left_txt");
const $timeCount = $(".timer .timer_sec");
const $restartQuiz = $(".buttons .restart", $resultBox);
const $quitQuiz = $(".buttons .quit", $resultBox);
const $nextBtn = $("footer .next_btn");
const $bottomQuesCounter = $("footer .total_que");

// Recupera l'ID dell'utente dal session storage
let userId = sessionStorage.getItem('utente');
console.log(userId);

// Inizializzazione delle variabili
let timeValue = 10;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

// Mostrare la info box all'inizio
$infoBox.addClass("activeInfo animating");

// Gestire gli eventi click
$exitBtn.on("click", function () {
    $infoBox.removeClass("activeInfo");
    window.location.href = '../index.html';
});

$backBtn.on("click", function () {
    // Imposta un ritardo prima di fare il reindirizzamento
    setTimeout(function () {
        $infoBox.removeClass("animating");
        // Sostituisci questo con il tuo URL di destinazione.
    }, 300); // Ritardo di 300 millisecondi
    window.location.href = './quiz_menu.html';
    $infoBox.removeClass("activeInfo");
});

$continueBtn.on("click", function () {
    $infoBox.removeClass("activeInfo");
    $quizBox.addClass("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(10);
    startTimerLine(0);
});

$restartQuiz.on("click", function () {
    $quizBox.addClass("activeQuiz");
    $resultBox.removeClass("activeResult");
    timeValue = 10;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    $timeText.text("Time Left");
    $nextBtn.removeClass("show");
});

$quitQuiz.on("click", function () {
    window.location.href = '../index.html';
});

$nextBtn.on("click", function () {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        $timeText.text("Time Left");
        $nextBtn.removeClass("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
});

// Mostrare le domande e le opzioni
function showQuestions(index) {
    const $queText = $(".que_text");
    let question = questions[index];
    let queTag = `<span>${question.question}</span>`;
    let optionTag = question.options.map((option, i) =>
        `<div class="option"><span>${option}</span></div>`
    ).join('');
    $queText.html(queTag);
    $optionList.html(optionTag);

    $(".option", $optionList).on("click", function () {
        optionSelected(this);
    });
}

// Icone per le risposte corrette e sbagliate
const tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
const crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answerElement) {
    clearInterval(counter);
    clearInterval(counterLine);

    let userAns = $(answerElement).text(); // Utilizzo di jQuery per ottenere il testo
    let correcAns = questions[que_count].answer;
    const allOptions = $('.option').length; // Utilizzo di jQuery per contare gli elementi

    if (userAns === correcAns) {
        userScore += 1;
        $(answerElement).addClass("correct").append(tickIconTag); // Aggiunge classe e icona con jQuery
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        $(answerElement).addClass("incorrect").append(crossIconTag); // Aggiunge classe e icona con jQuery
        console.log("Wrong Answer");

        $('.option').each(function () { // Ciclo su ogni opzione con jQuery
            if ($(this).text() === correcAns) {
                $(this).addClass("correct").append(tickIconTag); // Aggiunge classe e icona con jQuery
                console.log("Auto selected correct answer.");
            }
        });
    }

    $('.option').addClass("disabled"); // Disabilita tutte le opzioni
    $('.next_btn').addClass("show"); // Mostra il pulsante successivo
}

// Funzione per mostrare il risultato del quiz
function showResult() {
    $('.info_box').removeClass("activeInfo");
    $('.quiz_box').removeClass("activeQuiz");
    $('.result_box').addClass("activeResult");

    let scoreText = $('.score_text');
    scoreText.html(`<span> Hai totalizzato <p>${userScore}</p>/<p>${questions.length}</p></span>`);

    if (userId !== null) {
        var url = 'http://localhost:3000/quiz_easy/submit_score.php';

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: { userId: encodeURIComponent(userId), score: encodeURIComponent(userScore) },
            success: function (data) {
                // La risposta dal server è già un oggetto JavaScript
                console.log(data.leaderboard);
                //displayLeaderboard(data.leaderboard, data.userPosition);
            },
            error: function (xhr, status, error) {
                console.error("Failed to fetch data:", status, error);
            }
        });
    }
}

// Funzione per iniziare il timer
function startTimer(time) {
    $('.timer_sec').text(timeValue);
    counter = setInterval(function () {
        $('.timer_sec').text(time); // jQuery per aggiornare il testo
        time--;
        if (time <= 9) {
            $('.timer_sec').text("0" + time); // Aggiunge uno zero davanti al numero
        }

        if (time == 0) {
            clearInterval(counter);
            $('#time_left_txt').text("Tempo terminato");
            $('.option').each(function () { // Cicla su tutti gli elementi con classe 'option'
                if ($(this).text() === questions[que_count].answer) {
                    $(this).addClass("correct").append(tickIconTag);
                }
            });
            $('.option').addClass("disabled");
            $('.next_btn').addClass("show");
        }
    }, 1000);
}

// Funzione per iniziare la linea del timer
function startTimerLine(time) {
    counterLine = setInterval(function () {
        time += 0.025;
        $('.time_line').css('width', time * 4 + "%"); // Modifica il CSS usando jQuery
        if (time > 25) {
            clearInterval(counterLine);
        }
    }, 10);
}

// Funzione per mostrare il contatore delle domande
function queCounter(index) {
    let totalQueCountTag = `<span><p>${index}</p> of <p>${questions.length}</p></span>`;
    $('.total_que').html(totalQueCountTag); // Imposta il contenuto HTML di '.total_que' usando jQuery
}
