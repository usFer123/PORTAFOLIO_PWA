document.querySelector('.menu-btn').addEventListener('click', function() {
    const menu = document.querySelector('.menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block'; // Muestra el menú
    } else {
        menu.style.display = 'none'; // Oculta el menú
    }
});


