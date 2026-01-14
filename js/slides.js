const slides = document.querySelectorAll('.slide');
let current = 0;

// Carregar HTML externo
slides.forEach(slide => {
  fetch(slide.dataset.src)
    .then(res => res.text())
    .then(html => slide.innerHTML = html);
});

function updateSlides() {
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === current);
  });

  document.getElementById('counter').innerText =
    `${current + 1} / ${slides.length}`;
}

function nextSlide() {
  if (current < slides.length - 1) {
    current++;
    updateSlides();
  }
}

function prevSlide() {
  if (current > 0) {
    current--;
    updateSlides();
  }
}

// Navegação por teclado
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});
