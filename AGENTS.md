# Engineering guardrails

## Produto
Fala Comigo é uma ferramenta de apoio à comunicação e aprendizagem infantil. Mudanças devem priorizar autonomia comunicativa, previsibilidade, privacidade e interação real com cuidadores.

## Regras
1. Não adicionar analytics, ads, trackers ou chamadas remotas sem requisito explícito, revisão de privacidade e documentação.
2. Não transformar eventos locais em score clínico, diagnóstico ou ranking da criança.
3. Não usar dark patterns, streaks, loot/rewards, autoplay, infinite scroll ou notificações persuasivas.
4. Não reorganizar automaticamente cartões AAC por frequência; localização consistente é parte da experiência.
5. Não exigir fala, pronúncia correta ou repetição para liberar funcionalidade.
6. Novas afirmações médicas/terapêuticas devem citar fonte primária ou guideline confiável e ser revisadas antes de entrar na UI.
7. Preferir APIs nativas e dependências mínimas. Toda nova dependência precisa de justificativa de segurança/manutenção.
8. Toda persistência de dados de criança deve ser local por padrão.
9. Manter alvos de toque grandes, foco visível e suporte a reduced-motion.
10. Rodar `npm run verify` antes de publicar mudanças.
