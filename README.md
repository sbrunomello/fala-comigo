# Fala Comigo

**Fala Comigo** é uma PWA local-first para apoiar comunicação funcional, exploração de letras e números e rotinas visuais de crianças pequenas com necessidades de comunicação.

> Este projeto é uma ferramenta de apoio familiar e educacional. Não diagnostica, não mede “grau” de autismo, não substitui avaliação ou intervenção de pediatra, fonoaudiólogo, terapeuta ocupacional, psicólogo ou outros profissionais que acompanhem a criança.

## O que já existe na v0.1

- comunicador visual com símbolos, categorias e faixa para montar frases;
- síntese de voz em português (`SpeechSynthesis` / `pt-BR` quando disponível);
- vocabulário inicial funcional: pedir, recusar, terminar, pedir ajuda, pessoas, alimentação, brincadeiras, lugares e estados/necessidades;
- exploração livre das 26 letras, sem cronômetro ou pontuação;
- exploração dos números de 0 a 10 com representação visual de quantidade;
- quadro visual **Agora → Depois**;
- área do adulto protegida por gesto de pressionar e segurar;
- cartões personalizados com foto da vida real da criança;
- preferências para reduzir estímulos e ajustar velocidade da voz;
- histórico local de uso, sem score clínico;
- funcionamento offline após o primeiro carregamento;
- nenhum login, backend, analytics, anúncio ou chamada de terceiros.

## Princípios de produto

1. **Comunicação vale mesmo sem fala.** O app não exige repetição verbal para aceitar uma escolha.
2. **Modelar em vez de testar.** O cuidador pode apontar/tocar nos símbolos enquanto fala naturalmente.
3. **Pouco ruído.** Sem autoplay, streak, ranking, moedas, confete, cronômetros ou loops de recompensa.
4. **Interação real é o objetivo.** O app deve criar oportunidades para pedir, escolher, recusar, comentar e brincar com outra pessoa.
5. **Personalização vem antes de complexidade.** Fotos, palavras e rotinas familiares podem ser mais úteis do que milhares de símbolos genéricos.
6. **Privacidade por padrão.** Dados ficam no dispositivo.

A justificativa clínica/educacional e as fontes estão em [`docs/EVIDENCE.md`](docs/EVIDENCE.md).

## Arquitetura

O MVP usa **JavaScript moderno com ES Modules, APIs nativas da Web e zero dependências de runtime**.

```text
fala-comigo/
├── index.html
├── service-worker.js
├── public/
│   ├── manifest.webmanifest
│   └── icons
├── src/
│   ├── app.js
│   ├── styles.css
│   ├── core/
│   │   ├── phrase.js
│   │   ├── speech.js
│   │   └── storage.js
│   ├── data/
│   │   ├── learning.js
│   │   └── vocabulary.js
│   └── ui/
│       └── dom.js
├── tests/
├── docs/
└── scripts/
```

### Por que sem framework no MVP?

O problema atual não exige SSR, autenticação, estado remoto ou um ecossistema grande de componentes. A abordagem nativa reduz tamanho, dependências, risco de supply chain e tempo de inicialização. Se o produto crescer para sincronização multi-dispositivo, colaboração com profissionais ou administração complexa de conteúdo, a arquitetura pode evoluir sem alterar os contratos centrais de vocabulário, persistência e comunicação.

## Rodar localmente

Requisito: Node.js 22+.

```bash
npm run dev
```

Abra `http://localhost:4173`.

Não é necessário `npm install`: os scripts atuais usam apenas módulos nativos do Node e APIs nativas do navegador.

## Verificação

```bash
npm run verify
```

Executa checagem sintática de todos os módulos e os testes unitários com `node:test`.

## Privacidade

- configurações, cartões, fotos e histórico usam IndexedDB;
- não existe backend na v0.1;
- não existe telemetria;
- não existe armazenamento em nuvem;
- fotos adicionadas pela família não saem do dispositivo;
- o app não solicita microfone, câmera ou localização.

Veja [`docs/PRIVACY.md`](docs/PRIVACY.md).

## Acessibilidade e UX sensorial

- alvos de toque grandes;
- contraste e foco de teclado visíveis;
- suporte a `prefers-reduced-motion` e `prefers-contrast`;
- nenhuma informação depende apenas de cor;
- nenhuma animação piscante;
- sem áudio automático;
- modo calmo opcional com menos escolhas por tela;
- texto + símbolo, com opção de ocultar rótulos;
- posição dos cartões preservada dentro de cada categoria.

Veja [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md).

## Próximos passos

O roadmap está em [`docs/ROADMAP.md`](docs/ROADMAP.md). Antes de transformar o aplicativo em um AAC robusto para uso terapêutico mais amplo, vale revisar a seleção de vocabulário, layout de símbolos e estratégia de modelagem com um(a) fonoaudiólogo(a) que conheça a criança.

## Licença

MIT para o código do projeto. As famílias são responsáveis pelas fotos pessoais adicionadas localmente ao aplicativo.
