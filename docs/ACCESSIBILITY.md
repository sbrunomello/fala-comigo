# Acessibilidade e conforto sensorial

O Fala Comigo tenta ser utilizável por crianças pequenas e por adultos com diferentes necessidades de acesso.

## Implementado

- botões grandes e separados;
- foco de teclado visível;
- HTML semântico e rótulos acessíveis;
- região `aria-live` apenas para confirmações úteis;
- suporte a `prefers-reduced-motion`;
- suporte a `prefers-contrast`;
- texto não depende de cor;
- áudio somente após ação do usuário;
- nenhuma animação piscante;
- modo calmo para reduzir quantidade de escolhas;
- layout responsivo para celular e tablet;
- fotos com função visual acompanhadas por rótulo textual quando habilitado.

## Princípios de AAC que afetam UI

- posições dentro das categorias devem permanecer previsíveis;
- não ordenar cartões por frequência automaticamente;
- não esconder “não”, “ajuda” ou outras palavras importantes para favorecer pedidos positivos;
- não exigir precisão de fala para avançar;
- não usar tempo de resposta como medida de desempenho.

## Próximas auditorias

- teste manual com VoiceOver/TalkBack;
- auditoria WCAG 2.2 AA automatizada e manual;
- teste de contraste em todos os estados;
- validação do tamanho real dos alvos em dispositivos pequenos;
- teste com profissionais e famílias para carga visual e organização do vocabulário.
