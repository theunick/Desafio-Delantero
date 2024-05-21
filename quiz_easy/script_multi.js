// Selezione degli elementi del DOM e memorizzazione nelle variabili con jQuery
const $startBtn = $(".start_btn button");
const $infoBox = $(".info_box");
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

// Inizializzazione delle variabili
let timeValue = 10;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
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

// Funzione per resettare il timer
function resetTimer() {
    clearInterval(counter);
    startTimer(timeValue);
}

// Funzione per resettare la linea del timer
function resetTimerLine() {
    clearInterval(counterLine);
    widthValue = 0;
    startTimerLine(widthValue);
}

// Funzione per disabilitare le opzioni
function disableOptions() {
    $(".option").off("click"); // Rimuove l'event handler dal click
}

// Funzione per abilitare le opzioni
function enableOptions() {
    $(".option").on("click", function () {
        optionSelected(this);
    });
}

// Mostrare la info box all'inizio
$infoBox.addClass("activeInfo animating");

// Gestire gli eventi click
$exitBtn.on("click", function () {
    $infoBox.removeClass("activeInfo");
    window.location.href = '../index.html';
});

$backBtn.on("click", function () {
    $infoBox.removeClass("activeInfo");
    window.location.href = 'quiz_menu.html';
});

// Gestire la sottomissione del form del gioco
$('#gameForm').on("submit", function (event) {
    event.preventDefault();  // Blocca il comportamento predefinito del form per non ricaricare la pagina

    // Se la validazione è passata, procedi con le altre operazioni
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

// Gestire il click sul pulsante di restart del quiz
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

// Gestire il click sul pulsante di quit del quiz
$quitQuiz.on("click", function () {
    window.location.href = '../index.html';
});

// Gestire il click sul pulsante di next
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

// Icone per le risposte corrette e sbagliate
const tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
const crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// Funzione che gestisce la selezione dell'opzione
function optionSelected(answerElement) {
    // Impedisci l'interazione se l'opzione è già stata disabilitata
    if ($(answerElement).hasClass("disabled")) {
        return;
    }

    let userAns = $(answerElement).text();
    let correcAns = questions[que_count].answer;

    $(".option", $optionList).removeClass("selected"); // Rimuove la classe 'selected' da tutte le opzioni
    $(answerElement).addClass("selected"); // Aggiunge una classe 'selected' all'opzione scelta

    if (userAns === correcAns) {
        assignPoint();
        $(answerElement).addClass("correct").append(tickIconTag);
        console.log("Correct Answer - Player " + currentPlayer);
        console.log("Your correct answers = " + userScore);
        switchPlayer();
        $('.option').addClass("disabled"); // Disabilita tutte le opzioni
        $('.next_btn').addClass("show"); // Mostra il pulsante successivo
        clearInterval(counter);
        clearInterval(counterLine);
    } else {
        $(answerElement).addClass("incorrect").append(crossIconTag);
        console.log("Wrong Answer - Player " + currentPlayer);
        switchPlayer();
        nWrong++;
        resetTimer();
        resetTimerLine();

        // Disabilita il pulsante Next se la risposta è sbagliata
        $nextBtn.addClass("disabled").removeClass("show");
    }

    // Disabilita l'opzione selezionata per impedire ulteriori click
    $(answerElement).addClass("disabled");
}

// Funzione per mostrare il risultato del quiz
function showResult() {
    $('.info_box').removeClass("activeInfo"); // Nasconde la info box
    $('.quiz_box').removeClass("activeQuiz"); // Nasconde la quiz box
    $('.result_box').addClass("activeResult"); // Mostra la result box

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
            nTimeout++;
            clearInterval(counter);
            $('#time_left_txt').text("Tempo terminato");
            $('.option').each(function () { // Cicla su tutti gli elementi con classe 'option'
                if ($(this).text() !== questions[que_count].answer && !$(this).hasClass("incorrect")) {
                    $(this).addClass("incorrect").append(crossIconTag);
                    $(this).addClass("disabled");
                    resetTimer();
                    resetTimerLine();
                    return false;
                }

                if (nTimeout + nWrong == 4) {
                    if ($(this).text() === questions[que_count].answer) {
                        $(this).addClass("correct").append(tickIconTag);
                        $(this).addClass("disabled"); // Aggiunge classe e icona con jQuery
                        console.log("Auto selected correct answer.");
                        assignPoint();
                        $('.option').addClass("disabled"); // Disabilita tutte le opzioni
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
