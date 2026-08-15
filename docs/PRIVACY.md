# Privacidade

## Modelo atual

A v0.1 é **local-first e sem backend**.

Dados que podem existir no dispositivo:

- nome opcional da criança;
- preferências de interface e voz;
- cartões personalizados;
- fotos escolhidas pelo responsável;
- configuração do quadro Agora/Depois;
- eventos de uso recentes (tipo de cartão/letra/número e horário).

## O que não existe

- conta ou autenticação;
- cookies de publicidade;
- analytics;
- pixels de rastreamento;
- upload de fotos;
- microfone ou gravação de voz;
- localização;
- identificadores de publicidade;
- venda ou compartilhamento de dados.

## Armazenamento

Os dados são persistidos em IndexedDB no navegador. Limpar os dados do site/navegador pode apagar as personalizações.

## Regras para futuras versões

Qualquer sincronização em nuvem deve ser opt-in, desenhada especificamente para dados de criança e precedida por revisão jurídica e de segurança. Não adicionar SDK de analytics/ads “só para medir uso”.
