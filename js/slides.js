const iframe = document.getElementById('slide-frame');
const totalSlides = 12;
let current = 1;

/* Atualiza iframe */
function updateSlide() {
  iframe.src = `slide/${current}.html`;
  document.getElementById('counter').innerText = `${current} / ${totalSlides}`;
}

/* Navegação */
function nextSlide() {
  if (current < totalSlides) {
    current++;
    updateSlide();
  }
}

function prevSlide() {
  if (current > 1) {
    current--;
    updateSlide();
  }
}

/* Escala responsiva estilo PowerPoint */
function scalePresentation() {
  const baseWidth = 1920;
  const baseHeight = 1080;

  const availableWidth = window.innerWidth;
  const availableHeight = window.innerHeight;

  const scale = Math.min(
    availableWidth / baseWidth,
    availableHeight / baseHeight
  );

  // Aplica a escala
  iframe.style.transform = `scale(${scale})`;

  // Centraliza manualmente o iframe escalonado dentro do wrapper
  const left = (availableWidth - baseWidth * scale) / 2;
  const top = (availableHeight - baseHeight * scale) / 2;

  iframe.style.position = 'absolute';
  iframe.style.left = `${left}px`;
  iframe.style.top = `${top}px`;
}

window.addEventListener('resize', scalePresentation);
scalePresentation();

/* Fullscreen */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

/* Teclado */
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key.toLowerCase() === 'f') toggleFullscreen();
  if (e.key === 'Escape' && document.fullscreenElement) {
    document.exitFullscreen();
  }
});

const controls = document.querySelector('.controls');
let hideTimeout;

/* Mostra controles */
function showControls() {
  controls.classList.remove('hidden');

  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    controls.classList.add('hidden');
  }, 3000);
}

/* Ao carregar a página */
window.addEventListener('load', showControls);

/* Mouse move (captura global) */
window.addEventListener('mousemove', showControls);

/* Mouse move no container */
document
  .getElementById('presentation-wrapper')
  .addEventListener('mousemove', showControls);

/* Hover direto nos controles */
controls.addEventListener('mouseenter', showControls);
