$(document).ready(function () {
    $('#signupForm').submit(function (event) {
        event.preventDefault(); // Previene invio e ricarica della pagina

        var uname = $('input[name="uname"]').val().trim();
        var uemail = $('input[name="uemail"]').val().trim();
        var upassword = $('input[name="upassword"]').val();

        if (uname === "" || uemail === "" || upassword === "") {
            Swal.fire({
                icon: 'error',
                title: 'Errore',
                text: 'Tutti i campi sono obbligatori.',
                customClass: {
                    confirmButton: 'my-custom-button'
                }
            });
            return;
        }

        if (!validateEmail(uemail)) {
            Swal.fire({
                icon: 'error',
                title: 'Errore',
                text: 'Inserisci un indirizzo email valido.',
                customClass: {
                    confirmButton: 'my-custom-button'
                }
            });
            return;
        }

        var formData = {
            uname: uname,
            uemail: uemail,
            upassword: upassword
        };

        // Effettua una richiesta AJAX per inviare i dati al server
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/log-in/signup.php",
            data: formData, 
            dataType: "json",
            success: function (response) {
                if (response.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Errore',
                        text: response.error,
                        customClass: {
                            confirmButton: 'my-custom-button'
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successo',
                        text: 'Registrazione completata con successo!',
                        customClass: {
                            confirmButton: 'my-custom-button'
                        }
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Errore',
                    text: 'Errore tecnico, prova più tardi.',
                    customClass: {
                        confirmButton: 'my-custom-button'
                    }
                });
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
        event.preventDefault();

        var uname_login = $('input[name="uname_login"]').val().trim();
        var upassword_login = $('input[name="upassword_login"]').val();

        console.log(uname_login);

        var formData_2 = {
            name: uname_login,
            password: upassword_login
        };

        // Effettua una richiesta AJAX per inviare i dati al server
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/log-in/login.php",
            data: formData_2,
            dataType: "json", 
            success: function (response) {
                if (!response.success) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Errore',
                        text: response.message,
                        customClass: {
                            confirmButton: 'my-custom-button'
                        }
                    });
                } else {
                    sessionStorage.setItem('utente', uname_login); // Memorizza l'utente nella sessione
                    window.location.href = '../index.html';
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Errore',
                    text: 'Login failed, try again later.',
                    customClass: {
                        confirmButton: 'my-custom-button'
                    }
                });
            }
        });
    });
});
