const header = document.querySelector('header');
const nav = document.querySelector('.navlinks, .main-nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.navlinks a, .main-nav a');
const filters = document.querySelectorAll('.filter');
const resultCards = document.querySelectorAll('.result-card, .result');
const galleryItems = document.querySelectorAll('.gallery-item');
const videoCards = document.querySelectorAll('.video-card, .content-card');
const modal = document.getElementById('media-modal');
const modalTitle = document.getElementById('modal-title');
const modalMedia = document.getElementById('modal-media');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');
const toast = document.getElementById('toast');

// Branding oficial da Fran Personal
const officialLogo = 'assets/fran-personal-logo.svg';
const brand = document.querySelector('.brand');
if (brand) {
  const oldLogo = brand.querySelector('svg, img');
  const logo = document.createElement('img');
  logo.src = officialLogo;
  logo.alt = 'Fran Personal';
  logo.width = 64;
  logo.height = 64;
  logo.decoding = 'async';
  logo.style.cssText = 'width:64px;height:64px;object-fit:contain;display:block;flex:0 0 auto';
  oldLogo?.replaceWith(logo);
}

const footerBrand = document.querySelector('.footer-brand');
if (footerBrand) {
  const oldFooterLogo = footerBrand.querySelector('svg, img');
  const logo = document.createElement('img');
  logo.src = officialLogo;
  logo.alt = 'Fran Personal';
  logo.width = 120;
  logo.height = 120;
  logo.loading = 'lazy';
  logo.decoding = 'async';
  logo.style.cssText = 'width:120px;height:120px;object-fit:contain;display:block;flex:0 0 auto';
  oldFooterLogo?.replaceWith(logo);
}

// Instagram oficial restaurado no rodapé
const footer = document.querySelector('.footer');
if (footer && !footer.querySelector('.fran-instagram-link')) {
  const instagram = document.createElement('a');
  instagram.className = 'fran-instagram-link';
  instagram.href = 'https://www.instagram.com/fran_wellness/';
  instagram.target = '_blank';
  instagram.rel = 'noopener noreferrer';
  instagram.setAttribute('aria-label', 'Abrir Instagram da Fran Wellness');
  instagram.innerHTML = `
    <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
    </svg>
    <span>@fran_wellness</span>`;
  instagram.style.cssText = 'display:inline-flex;align-items:center;gap:9px;margin-top:16px;color:#ff78a8;font-weight:800;font-size:.9rem;transition:transform .2s ease,color .2s ease';
  instagram.addEventListener('mouseenter', () => instagram.style.transform = 'translateY(-2px)');
  instagram.addEventListener('mouseleave', () => instagram.style.transform = '');

  const target = footerBrand?.querySelector('div') || footerBrand || footer.querySelector('.container');
  target?.appendChild(instagram);
}

// Resultados reais: duas composições com antes/depois
const realResults = [
  {
    src: 'assets/results/resultado-01.webp',
    alt: 'Resultado real de acompanhamento: comparação antes e depois, com vistas frontal e posterior.'
  },
  {
    src: 'assets/results/resultado-02.webp',
    alt: 'Segundo resultado real de acompanhamento: comparação antes e depois, com vistas frontal e posterior.'
  }
];

const resultMedia = document.querySelectorAll('.result .compare, .result-card .result-media');
realResults.forEach((result, index) => {
  const media = resultMedia[index];
  if (!media) return;

  media.innerHTML = `
    <img src="${result.src}" alt="${result.alt}" loading="lazy" decoding="async"
      style="width:100%;height:100%;object-fit:cover;display:block">
    <span aria-hidden="true"
      style="position:absolute;left:12px;bottom:12px;padding:7px 10px;border-radius:999px;background:rgba(9,7,9,.84);color:#fff;font-size:.68rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase;backdrop-filter:blur(8px)">
      Antes ↑ • Depois ↓
    </span>`;
  media.style.position = 'relative';
  media.style.overflow = 'hidden';
  media.style.background = '#090709';
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 12);
});

menuToggle?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open') || false;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menu');
  });
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}

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
  if (!modal || !modalTitle || !modalMedia) return;
  modalTitle.textContent = title;
  modalMedia.innerHTML = html;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close')?.focus();
}

function closeModal() {
  if (!modal || !modalMedia) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalMedia.innerHTML = '';
  document.body.style.overflow = '';
}

closeModalButtons.forEach((button) => button.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('open')) closeModal();
});

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const title = item.dataset.gallery || 'Foto do trabalho';
    const image = item.dataset.image;
    if (image) openModal(title, `<img src="${image}" alt="${title}" loading="lazy">`);
  });
});

videoCards.forEach((card) => {
  card.addEventListener('click', () => {
    const source = card.dataset.video;
    const title = card.dataset.title || card.querySelector('h3')?.textContent || 'Vídeo';
    if (source) {
      openModal(title, `<video controls preload="metadata" playsinline><source src="${source}">Seu navegador não suporta vídeo HTML5.</video>`);
    }
  });
});

let toastTimer;
function showToast(message) {
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

document.querySelectorAll('.js-placeholder-contact').forEach((button) => {
  button.addEventListener('click', () => showToast('Adicione o WhatsApp real da profissional antes de publicar.'));
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
