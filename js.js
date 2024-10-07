const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');
const loginBox = document.querySelector('.login-box');
const registerBox = document.querySelector('.register-box');

// Mostrar el formulario de registro
registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginBox.style.display = 'none';
    registerBox.style.display = 'block';
});

// Mostrar el formulario de inicio de sesión
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerBox.style.display = 'none';
    loginBox.style.display = 'block';
});

// Validar el inicio de sesión (agrega lógica aquí)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    alert(`Iniciar sesión con ${username}`);
});

// Validar el registro (agrega lógica aquí)
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = registerForm.username.value;
    const password = registerForm.password.value;
    alert(`Usuario creado: ${username}`);
});
