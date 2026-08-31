const header = document.querySelector('.site-header');
const revealElements = document.querySelectorAll('.reveal');
const playButton = document.querySelector('.story-video .play');
const year = document.getElementById('year');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

playButton?.addEventListener('click', () => {
  window.alert('Área pronta para receber o vídeo oficial da história da Fran.');
});

if (year) {
  year.textContent = String(new Date().getFullYear());
}
