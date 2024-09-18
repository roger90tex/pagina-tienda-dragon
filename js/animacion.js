document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    const navSection = document.getElementById('navSection');
    
    let total = 0;
    let itemCount = 0;

    // Agregamos eventos para abrir y cerrar menú
    menuIcon.addEventListener('click', () => {
        navSection.classList.remove('hidden');
        navSection.setAttribute('aria-hidden', 'false');
    });

    closeIcon.addEventListener('click', () => {
        navSection.classList.add('hidden');
        navSection.setAttribute('aria-hidden', 'true');
    });
});
