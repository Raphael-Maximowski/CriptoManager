## Acessibilidade

Este sistema foi desenvolvido com foco em acessibilidade, seguindo as diretrizes da WCAG 2.1 nível AA.

### Práticas adotadas:

- Navegação por teclado: todos os elementos interativos são acessíveis via teclado (Tab, Enter, setas, etc.).
- Labels e descrições:
- Gráficos usam `aria-label` e `role="img"` para leitores de tela.
- Estrutura semântica (Utilização adequada das tags html)
- Cores e contraste:
  - Cores testadas para atender contraste mínimo de 4.5:1.
  software que foi testado as cores "https://webaim.org/resources/contrastchecker/"
- Foco visível:
- Mensagens e alertas:
  - Mensagem claras de erro e de sucesso.
- Texto redimensional (texto se adapta tranquilamente a um zoom de 200%)

### Recursos testados:
- Teclado
- Contraste de cores