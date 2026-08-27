# Fran Personal — Branding & Landing Page Stage

## Direção aprovada
- Landing page única, sem descaracterizar a proposta original.
- Identidade fitness premium, feminina e forte.
- Base visual: preto profundo, vinho, magenta/rosa e branco.
- Marca: Fran Personal — Disciplina • Foco • Constância • Resultados.
- Motion somente quando melhorar hierarquia, storytelling, interação ou conversão.

## Referências de design
MotionSites, Universe Checkboxes, Unlumen UI, Magic UI, OriginKit, Cult UI e Skiper UI.

## Implementado nesta branch
1. Branding aplicado ao header e footer.
2. Seção História da Fran com espaço para resumo confirmado e vídeo de 1:00–1:30.
3. Serviços reorganizados em linguagem editorial premium.
4. Conteúdo em movimento com destaque principal + cards secundários e swipe no mobile.
5. Área de resultados preparada para 6–8 casos antes/depois.
6. Motion leve por IntersectionObserver.
7. Responsividade e estrutura de performance para mídia futura.

## Assets ainda necessários
- Logo oficial escolhida em PNG/WebP transparente (substituir o SVG temporário usado no layout).
- Vídeo oficial da história da Fran.
- Texto real de 250–350 caracteres sobre a trajetória.
- 6–8 conjuntos autorizados de antes/depois.
- Aproximadamente 4 imagens adicionais da Fran/rotina.
- Links reais de contato e redes sociais.

## Performance
Converter imagens para AVIF/WebP, usar loading=lazy fora do primeiro viewport e manter vídeos fora do carregamento inicial, preferencialmente com poster e carregamento sob demanda.
