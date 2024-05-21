$(document).ready(function () {
    // Gestore per il form di registrazione
    $('#signupForm').submit(function (event) {
        event.preventDefault(); // Previene il comportamento predefinito del form (invio e ricarica della pagina)

        // Recupera i valori degli input e li pulisce dagli spazi vuoti
        var uname = $('input[name="uname"]').val().trim();
        var uemail = $('input[name="uemail"]').val().trim();
        var upassword = $('input[name="upassword"]').val();

        // Verifica se i campi sono vuoti
        if (uname === "" || uemail === "" || upassword === "") {
            console.log("Tutti i campi sono obbligatori.");
            return;
        }

        // Verifica se l'email è valida
        if (!validateEmail(uemail)) {
            console.log("Inserisci un indirizzo email valido.");
            return;
        }

        // Crea un oggetto con i dati del form
        var formData = {
            uname: uname,
            uemail: uemail,
            upassword: upassword
        };

        // Effettua una richiesta AJAX per inviare i dati al server
        $.ajax({
            type: "POST", // Metodo HTTP
            url: "http://localhost:3000/log-in/signup.php", // URL del server a cui inviare la richiesta
            data: formData, // Dati da inviare
            dataType: "json",  // Interpreta la risposta come JSON
            success: function (response) {
                // Gestisce la risposta del server
                if (response.error) {
                    alert(response.error); // Mostra un alert con il messaggio di errore
                } else {
                    alert("Registrazione completata con successo!"); // Mostra un alert di successo
                }
            },
            error: function (xhr, status, error) {
                // Gestisce eventuali errori di richiesta
                alert("Errore tecnico, prova più tardi.");
            }
        });
    });

    // Funzione per validare l'email usando una regex
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Gestore per il form di login
    $('#signinForm').on('submit', function (event) {
        event.preventDefault(); // Previene il comportamento predefinito del form (invio e ricarica della pagina)

        // Recupera i valori degli input e li pulisce dagli spazi vuoti
        var uname_login = $('input[name="uname_login"]').val().trim();
        var upassword_login = $('input[name="upassword_login"]').val();

        console.log(uname_login);

        // Crea un oggetto con i dati del form
        var formData_2 = {
            name: uname_login,
            password: upassword_login
        };

        // Effettua una richiesta AJAX per inviare i dati al server
        $.ajax({
            type: "POST", // Metodo HTTP
            url: "http://localhost:3000/log-in/login.php", // URL del server a cui inviare la richiesta
            data: formData_2, // Dati da inviare
            dataType: "json",  // Interpreta la risposta come JSON
            success: function (response) {
                // Gestisce la risposta del server
                if (!response.success) {
                    alert(response.message); // Mostra un alert con il messaggio di errore
                } else {
                    sessionStorage.setItem('utente', uname_login); // Memorizza l'utente nella sessione
                    window.location.href = '../index.html'; // Reindirizza alla pagina principale
                }
            },
            error: function (xhr, status, error) {
                // Gestisce eventuali errori di richiesta
                alert("Login failed, try again later.");
            }
        });
    });
});
