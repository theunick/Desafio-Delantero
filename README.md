# Desafio Delantero - Guida delle cartelle e dei file nel codice sorgente

Il progetto è suddiviso in 6 cartelle principali e 3 file separati.

## File Principali

1. **index.html**: Costituisce il codice HTML della home page, con l'integrazione di jQuery.
2. **anim_card.js**: Contiene il codice jQuery relativo alle animazioni delle card presenti nella home page.
3. **style.css**: Foglio di stile per le card e le varie sezioni del sito web.

## Cartelle del Progetto

### 1. Bootstrap
Contiene fogli di stile CSS standard del framework Bootstrap con l'aggiunta di un file chiamato `index_style.css` contenente gli stili della home page.

### 2. Hangman
Contiene i file relativi al gioco "Football Hangman":
- **images**: Cartella contenente i media per il gioco Football Hangman.
- **get_word.php**: Ottiene dal database la parola e il suggerimento da utilizzare nella sessione di gioco corrente.
- **index.html**: Costituisce la pagina del gioco.
- **script.js**: Gestisce la comunicazione tra `index.html` e `get_word.php`, gestendo i dati in entrata dal database per la sessione di gioco corrente.
- **style.css**: Definisce gli stili del gioco.

### 3. Images
Contiene le immagini utilizzate nel sito web.

### 4. Leaderboard
Contiene i file relativi alla leaderboard:
- **leaderboard.html**: Costituisce la pagina della leaderboard.
- **lb.css**: Definisce gli stili della leaderboard.
- **get_leaderboard.php**: Ottiene dal database i dati necessari per la leaderboard.
- **get_helper.js**: Gestisce la creazione dinamica della leaderboard e comunica tramite AJAX con `get_leaderboard.php`.

### 5. Log-in
Contiene i file relativi al login e alla registrazione degli utenti:
- **index.html**: Costituisce la pagina principale per login e signup.
- **style.css**: Definisce gli stili per login e signup.
- **swap.js**: Gestisce l'animazione di swap tra le sezioni di login e signup.
- **login.php**: Gestisce il database relativo agli utenti in fase di login, verificando l'esistenza o meno dell'utente che sta accedendo e la correttezza delle credenziali.
- **signup.php**: Gestisce le interazioni con il database in fase di registrazione.
- **logout.php**: Gestisce il logout.
- **validation.js**: Fa comunicare `index.html`, dal quale prende le credenziali, con `login.php` e `signup.php` tramite chiamate AJAX.

### 6. Quiz_easy
Contiene i file relativi al quiz:
- **difficulty.js**: Per la gestione delle difficoltà dei quiz
- **db_connect.php**: Per la connessione al database. Viene richiamato in tutti gli altri file PHP.
- **get_questions.php**: Richiede le domande al database e le invia ai file JS che le richiedono.
- **submit_score.php**: Registra nel database i punteggi degli utenti.
- **quiz_menu.html**: Costituisce la pagina di menu dalla quale si sceglie la modalità di gioco.
- **single.html**: Costituisce le pagine relative alla modalità singleplayer.
- **multi.html**: Costituisce le pagine relative alla modalità multiplayer.
- **script_single.js**: Collega `single.html`, `get_questions.php` e `submit_score.php` e gestisce tutte le meccaniche relative al quiz in singleplayer.
- **multi.js**: Collega `multi.html`, `get_questions.php` e `submit_score.php` e gestisce tutte le meccaniche relative al quiz in multiplayer.
