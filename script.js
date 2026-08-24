const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const filters = document.querySelectorAll('.filter');
const resultCards = document.querySelectorAll('.result-card');
const galleryItems = document.querySelectorAll('.gallery-item');
const videoCards = document.querySelectorAll('.video-card');
const modal = document.getElementById('media-modal');
const modalTitle = document.getElementById('modal-title');
const modalMedia = document.getElementById('modal-media');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');
const toast = document.getElementById('toast');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
});

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menu');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    resultCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

function openModal(title, html) {
  modalTitle.textContent = title;
  modalMedia.innerHTML = html;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close')?.focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalMedia.innerHTML = '';
  document.body.style.overflow = '';
}

closeModalButtons.forEach((button) => button.addEventListener('click', closeModal));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const title = item.dataset.gallery || 'Foto do trabalho';
    const image = item.dataset.image;

    if (image) {
      openModal(title, `<img src="${image}" alt="${title}" loading="lazy">`);
      return;
    }

    openModal(title, '<div><strong>Foto ainda não adicionada.</strong><p>Defina o caminho real no atributo <code>data-image</code> deste item.</p></div>');
  });
});

videoCards.forEach((card) => {
  card.addEventListener('click', () => {
    const source = card.dataset.video;
    const title = card.dataset.title || 'Vídeo';

    if (source) {
      openModal(title, `<video controls preload="metadata" playsinline><source src="${source}">Seu navegador não suporta vídeo HTML5.</video>`);
      return;
    }

    showToast('Este card está pronto para receber o vídeo real da Fran.');
  });
});

let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

document.querySelectorAll('.js-placeholder-contact').forEach((button) => {
  button.addEventListener('click', () => {
    showToast('Adicione o WhatsApp real da profissional antes de publicar.');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
