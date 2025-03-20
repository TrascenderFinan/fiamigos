const carouselSlide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const intervalTime = 3000; // Intervalo de cambio en milisegundos (3 segundos en este caso)
let counter = 0;
const size = images[0].clientWidth;
let autoSlideInterval; // Variable para almacenar el intervalo automático

function nextSlide() {
  if (counter >= images.length - 1) return;
  carouselSlide.style.transition = 'transform 0.2s ease-in-out';
  counter++;
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

function prevSlide() {
  if (counter <= 0) return;
  carouselSlide.style.transition = 'transform 0.3s ease-in-out';
  counter--;
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

function changeSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, intervalTime);
}

// Llama a la función changeSlide para iniciar el cambio automático de imágenes
changeSlide();

// Detener el cambio automático al pasar el mouse sobre el carrusel
carouselSlide.addEventListener('mouseenter', () => {
  clearInterval(autoSlideInterval);
});

// Reanudar el cambio automático al retirar el mouse del carrusel
carouselSlide.addEventListener('mouseleave', () => {
  changeSlide();
});

// Botón de siguiente
const nextBtn = document.querySelector('.next-btn');
nextBtn.addEventListener('click', () => {
  nextSlide();
});

// Botón de anterior
const prevBtn = document.querySelector('.prev-btn');
prevBtn.addEventListener('click', () => {
  prevSlide();
});
