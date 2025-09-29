const carruselInner = document.querySelector('.carrusel-inner');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const images = document.querySelectorAll('.carrusel-inner img');

let currentIndex = 0;
let carruselInterval;
const autoplayDuration = 2000; // 3 segundos

function updateCarrusel() {
    const imageWidth = images[0].clientWidth;
    carruselInner.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
}

// Lógica para el avance automático del carrusel
function startAutoplay() {
    carruselInterval = setInterval(() => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarrusel();
    }, autoplayDuration);
}

// Lógica para detener el carrusel cuando el usuario interactúa
function stopAutoplay() {
    clearInterval(carruselInterval);
}

// Eventos de los botones para la navegación manual
nextBtn.addEventListener('click', () => {
    stopAutoplay();
    if (currentIndex < images.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarrusel();
    startAutoplay(); // Reinicia el temporizador
});

prevBtn.addEventListener('click', () => {
    stopAutoplay();
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = images.length - 1;
    }
    updateCarrusel();
    startAutoplay(); // Reinicia el temporizador
});

// Inicia el carrusel automático al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCarrusel();
    startAutoplay();
});

// Ajusta el carrusel al cambiar el tamaño de la ventana
window.addEventListener('resize', updateCarrusel);