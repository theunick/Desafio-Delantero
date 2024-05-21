$(document).ready(function () {
    // Aggiunge la classe 'activeResult' alla casella dei risultati per renderla visibile
    $('.result_box').addClass("activeResult");

    // URL per la richiesta della leaderboard
    var url = 'http://localhost:3000/leaderboard/get_leaderboard.php';

    // Effettua una richiesta AJAX per ottenere la leaderboard
    $.ajax({
        url: url,
        type: 'GET', // Metodo HTTP
        dataType: 'json', // Tipo di dati attesi dal server
        success: function (data) {
            // La risposta dal server è già un oggetto JavaScript
            generateLeaderboard(data.leaderboard); // Chiama la funzione per generare la leaderboard
        },
        error: function (xhr, status, error) {
            // Gestione degli errori
            console.error("Failed to fetch data:", status, error);
        }
    });

    // Funzione per generare la leaderboard
    function generateLeaderboard(leaderboard) {
        const leaderboardContainer = document.getElementById('cont');
        leaderboardContainer.innerHTML = ''; // Pulisce il contenitore

        // Itera attraverso ogni voce della leaderboard
        leaderboard.forEach((entry, index) => {
            const position = index + 1; // Determina la posizione (indice + 1)
            const username = entry.uname.toUpperCase(); // Converte il nome utente in maiuscolo
            const score = entry.score; // Ottiene il punteggio

            // Determina l'icona del rank in base alla posizione
            let rankDisplay;
            if (position === 1) {
                rankDisplay = '<span style="font-size: 35px;">🥇</span>';
            } else if (position === 2) {
                rankDisplay = '<span style="font-size: 30px;">🥈</span>';
            } else if (position === 3) {
                rankDisplay = '<span style="font-size: 25px;">🥉</span>';
            } else {
                rankDisplay = '<span style="font-size: 20px;">🏅</span>';
            }

            // Crea un elemento HTML per la voce della leaderboard
            const leaderboardRow = `
            <div class="entry">
                <span class="rank">${rankDisplay}</span>
                <span class="name">${username}</span>
                <span class="score">${score}</span>
            </div>
            `;
            // Aggiunge l'elemento HTML al contenitore della leaderboard
            leaderboardContainer.innerHTML += leaderboardRow;
        });
    }
});
