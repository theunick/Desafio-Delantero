$(document).ready(function () {
    $('.result_box').addClass("activeResult");

    // URL per la richiesta della leaderboard
    var url = 'http://localhost:3000/leaderboard/get_leaderboard.php';

    // Effettua una richiesta AJAX per ottenere la leaderboard
    $.ajax({
        url: url,
        type: 'GET', 
        dataType: 'json', 
        success: function (data) {
            generateLeaderboard(data.leaderboard);
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch data:", status, error);
        }
    });

    // Funzione per generare la leaderboard
    function generateLeaderboard(leaderboard) {
        const leaderboardContainer = document.getElementById('cont');
        leaderboardContainer.innerHTML = ''; 

        leaderboard.forEach((entry, index) => {
            const position = index + 1; 
            const username = entry.uname.toUpperCase();
            const score = entry.score;

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
