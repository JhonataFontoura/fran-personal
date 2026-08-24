# Mídias da Fran Wellness

Use esta pasta para organizar os materiais reais da landing page.

Estrutura recomendada:

```text
assets/
├── images/
│   ├── gallery/
│   ├── results/
│   └── testimonials/
└── videos/
    ├── training/
    └── testimonials/
```

O Git não versiona pastas vazias. Crie as subpastas conforme for adicionando fotos e vídeos reais.

## Galeria

No `index.html`, adicione o caminho da foto no atributo `data-image` do card correspondente.

Exemplo:

```html
<button class="gallery-item" data-gallery="Treino acompanhado" data-image="assets/images/gallery/treino-01.webp">
```

## Vídeos

Nos cards da seção de vídeos, preencha `data-video` com o caminho do arquivo real.

Exemplo:

```html
<button class="video-card" data-video="assets/videos/training/treino-01.mp4" data-title="Treino na prática">
```

Prefira imagens em WebP ou AVIF e vídeos otimizados para web. Não publique fotos, resultados ou depoimentos de clientes sem autorização.
