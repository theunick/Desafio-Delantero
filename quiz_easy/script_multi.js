const $start = $(".start_btn button");
const $infoBox = $(".info_box");
const $exit = $(".buttons .quit", $infoBox);
const $back = $("#back", $infoBox);
const $continueBtn = $(".buttons .restart", $infoBox);
const $quizBox = $(".quiz_box");
const $resultBox = $(".result_box");
const $optionList = $(".option_list");
const $timeLine = $("header .time_line");
const $timeText = $(".timer .time_left_txt");
const $timeCount = $(".timer .timer_sec");
const $restartQuiz = $(".buttons .restart", $resultBox);
const $quitQuiz = $(".buttons .quit", $resultBox);
const $next = $("footer .next_btn");
const $bottomQuesCounter = $("footer .total_que");

// Inizializzazione delle variabili
let timerTime = 10;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthTimeLine = 0;
let currentPlayer = player1;
let totalPlayers = 2;
let nTimeout = 0;
let nWrong = 0;
let player1Score = 0;
let player2Score = 0;

// Funzione per mostrare il giocatore corrente
function showPlayer() {
    let turn = `<span class="turn-container">È il turno di <p class="player-name">${currentPlayer}</p></span>`;
    $('.turn').html(turn); // Aggiorna l'indicazione di chi è il giocatore corrente
}

// Funzione per alternare i turni tra i giocatori
function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    showPlayer();
}

// Funzione per assegnare punti al giocatore corrente
function assignPoint() {
    if (currentPlayer == player1) {
        player1Score++;
    }
    else {
        player2Score++;
    }
}

function resetTimer() {
    clearInterval(counter);
    startTimer(timerTime);
}

function resetTimerLine() {
    clearInterval(counterLine);
    widthTimeLine = 0;
    startTimerLine(widthTimeLine);
}

function disableOptions() {
    $(".option").off("click");
}

function enableOptions() {
    $(".option").on("click", function () {
        optionSelected(this);
    });
}

$infoBox.addClass("activeInfo animating");

$exit.on("click", function () {
    $infoBox.removeClass("activeInfo");
    window.location.href = '../index.html';
});

$back.on("click", function () {
    $infoBox.removeClass("activeInfo");
    window.location.href = 'quiz_menu.html';
});

$('#gameForm').on("submit", function (event) {
    event.preventDefault();

    player1 = $("#player1").val();
    player2 = $("#player2").val();
    currentPlayer = player1;
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
    timerTime = 10;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthTimeLine = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timerTime);
    startTimerLine(widthTimeLine);
    $timeText.text("Time Left");
    $next.removeClass("show");
});

$quitQuiz.on("click", function () {
    window.location.href = '../index.html';
});

$next.on("click", function () {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timerTime);
        startTimerLine(widthTimeLine);
        $timeText.text("Time Left");
        $next.removeClass("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
});

// Mostrare le domande e le opzioni
function showQuestions(index) {
    showPlayer();
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

const okIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
const errorIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answerElement) {
    if ($(answerElement).hasClass("disabled")) {
        return;
    }

    let userAns = $(answerElement).text();
    let correcAns = questions[que_count].answer;

    $(".option", $optionList).removeClass("selected");
    $(answerElement).addClass("selected");

    if (userAns === correcAns) {
        assignPoint();
        $(answerElement).addClass("correct").append(okIconTag);
        console.log("Correct Answer - Player " + currentPlayer);
        console.log("Your correct answers = " + userScore);
        switchPlayer();
        $('.option').addClass("disabled");
        $('.next_btn').addClass("show");
        clearInterval(counter);
        clearInterval(counterLine);
    } else {
        $(answerElement).addClass("incorrect").append(errorIconTag);
        console.log("Wrong Answer - Player " + currentPlayer);
        switchPlayer();
        nWrong++;
        resetTimer();
        resetTimerLine();

        $next.addClass("disabled").removeClass("show");
    }

    // Disabilita l'opzione selezionata per impedire ulteriori click
    $(answerElement).addClass("disabled");
}

function showResult() {
    $('.info_box').removeClass("activeInfo");
    $('.quiz_box').removeClass("activeQuiz"); 
    $('.result_box').addClass("activeResult"); 

    $('.score_text_player1').text(player1 + ' scored: ' + player1Score);
    $('.score_text_player2').text(player2 + ' scored: ' + player2Score);

    let winnerText = '';
    if (player1Score > player2Score) {
        winnerText = player1 + ' wins!';
    } else if (player2Score > player1Score) {
        winnerText = player2 + ' wins!';
    } else {
        winnerText = 'It\'s a tie!';
    }

    $('.winner_text').text(winnerText);
}

function startTimer(time) {
    $('.timer_sec').text(timerTime);
    counter = setInterval(function () {
        $('.timer_sec').text(time); 
        time--;

        if (time <= 9) {
            $('.timer_sec').text("0" + time); // Aggiunge uno zero davanti al numero
        }

        if (time == 0) {
            nTimeout++;
            clearInterval(counter);
            $('#time_left_txt').text("Tempo terminato");
            $('.option').each(function () { 
                if ($(this).text() !== questions[que_count].answer && !$(this).hasClass("incorrect")) {
                    $(this).addClass("incorrect").append(errorIconTag);
                    $(this).addClass("disabled");
                    resetTimer();
                    resetTimerLine();
                    return false;
                }

                if (nTimeout + nWrong == 4) {
                    if ($(this).text() === questions[que_count].answer) {
                        $(this).addClass("correct").append(okIconTag);
                        $(this).addClass("disabled");
                        console.log("Auto selected correct answer.");
                        assignPoint();
                        $('.option').addClass("disabled");
                        $('.next_btn').addClass("show");
                        clearInterval(counter);
                        clearInterval(counterLine);
                    }
                }
            });

            switchPlayer();
        }
    }, 1000);
}

function startTimerLine(time) {
    counterLine = setInterval(function () {
        time += 0.025;
        $('.time_line').css('width', time * 4 + "%");
        if (time > 25) {
            clearInterval(counterLine);
        }
    }, 10);
}

function queCounter(index) {
    let totalQueCountTag = `<span><p>${index}</p> of <p>${questions.length}</p></span>`;
    $('.total_que').html(totalQueCountTag); 
}
