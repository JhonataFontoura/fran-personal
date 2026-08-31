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

if (year) year.textContent = String(new Date().getFullYear());

// Resultados reais: mantém somente as duas evoluções confirmadas.
// Os arquivos resultado-02 e resultado-01 são os conjuntos corretos das duas alunas.
const resultsSection = document.querySelector('#resultados');
const resultsGrid = resultsSection?.querySelector('.results-grid');
const resultsTitle = resultsSection?.querySelector('.title');
const resultsLead = resultsSection?.querySelector('.results-head .lead');
const proofNote = resultsSection?.querySelector('.proof-note');

if (resultsTitle) resultsTitle.innerHTML = 'Resultados <span style="color:var(--pink)">reais</span>';
if (resultsLead) resultsLead.textContent = 'Disciplina, método e consistência que transformam.';
if (proofNote) proofNote.remove();

if (resultsGrid) {
  resultsGrid.innerHTML = `
    <article class="result result-premium visible">
      <div class="result-premium-head">
        <strong>🏋 Evolução 01</strong><span>Com foco, tudo muda!</span>
      </div>
      <div class="result-media result-full">
        <img src="assets/results/resultado-02.webp" alt="Evolução 01: antes e depois, vistas frontal e posterior" loading="lazy" decoding="async">
      </div>
      <div class="result-highlight"><b>◎ + Definição e tonificação</b><small>Resultados que vão além do físico.</small></div>
    </article>
    <article class="result result-premium visible">
      <div class="result-premium-head">
        <strong>🏋 Evolução 02</strong><span>Com foco, tudo muda!</span>
      </div>
      <div class="result-media result-full">
        <img src="assets/results/resultado-01.webp" alt="Evolução 02: antes e depois, vistas frontal e posterior" loading="lazy" decoding="async">
      </div>
      <div class="result-highlight"><b>◎ + Definição muscular</b><small>Mais autoestima e qualidade de vida.</small></div>
    </article>`;

  resultsGrid.style.gridTemplateColumns = 'repeat(2,minmax(0,1fr))';

  const style = document.createElement('style');
  style.textContent = `
    #resultados .results-head{align-items:center;margin-bottom:8px}
    #resultados .results-head .title{max-width:none;font-size:clamp(2.8rem,6vw,5.8rem)}
    #resultados .results-grid{gap:28px}
    #resultados .result-premium{background:linear-gradient(180deg,#0b090d,#100d13);border:1px solid #512436;border-radius:24px;padding:18px;box-shadow:0 20px 55px #0005;overflow:hidden}
    .result-premium-head{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:2px 2px 16px;text-transform:uppercase}
    .result-premium-head strong{color:var(--pink2);font-size:1.05rem;letter-spacing:.02em}
    .result-premium-head span{font-size:.7rem;font-weight:900;color:#fff}
    #resultados .result-full{height:auto;aspect-ratio:767/1024;border-radius:16px;background:#090709;overflow:hidden}
    #resultados .result-full img{width:100%;height:100%;object-fit:contain;display:block;background:#090709}
    .result-highlight{margin-top:14px;padding:16px 18px;border-radius:16px;background:linear-gradient(180deg,#17131a,#0e0c10);display:grid;gap:2px}
    .result-highlight b{color:var(--pink2);text-transform:uppercase;font-size:1rem}
    .result-highlight small{color:var(--muted);font-size:.82rem}
    @media(max-width:760px){#resultados .results-grid{grid-template-columns:1fr!important}.result-premium-head{align-items:flex-start;flex-direction:column;gap:3px}}
  `;
  document.head.appendChild(style);
}
