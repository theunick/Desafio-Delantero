// Seleziona l'elemento del DOM con l'ID 'signup'
const signUp = document.getElementById('signup');

// Seleziona l'elemento del DOM con l'ID 'signin'
const signIn = document.getElementById('signin');

// Seleziona il primo elemento del DOM con la classe 'container'
const container = document.querySelector('.container');

// Aggiunge un event listener al pulsante 'signUp'
signUp.addEventListener('click', () => {
    // Aggiunge la classe 'active' all'elemento con la classe 'container' quando viene cliccato il pulsante 'signUp'
    container.classList.add('active');
});

// Aggiunge un event listener al pulsante 'signIn'
signIn.addEventListener('click', () => {
    // Rimuove la classe 'active' dall'elemento con la classe 'container' quando viene cliccato il pulsante 'signIn'
    container.classList.remove('active');
});
