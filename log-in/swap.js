const signUp = document.getElementById('signup');
const signIn = document.getElementById('signin');
const container = document.querySelector('.container');

signUp.addEventListener('click', () => {
    container.classList.add('active');
});

signIn.addEventListener('click', () => {
    container.classList.remove('active');
});
