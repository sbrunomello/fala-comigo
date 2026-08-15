import { DEFAULT_VOCABULARY, CATEGORIES, CATEGORY_ORDER, cardsForCategory, findCard } from './data/vocabulary.js';
import { LETTERS, NUMBERS, findLetter } from './data/learning.js';
import { addToPhrase, phraseLabel, phraseText, removeLast } from './core/phrase.js';
import { DEFAULT_SETTINGS, LocalRepository } from './core/storage.js';
import { SpeechController } from './core/speech.js';
import { announce, escapeHtml, formatDateTime, safeImageSrc } from './ui/dom.js';

const app = document.querySelector('#app');
const repo = new LocalRepository();
const speech = new SpeechController();

const state = {
  route: 'comunicar',
  category: 'essenciais',
  phrase: [],
  selectedLetter: 'A',
  selectedNumber: 1,
  settings: { ...DEFAULT_SETTINGS },
  customCards: [],
  routine: { nowId: 'comer', nextId: 'brincar' },
  events: [],
  adultUnlockedUntil: 0
};

function allCards() {
  return [...DEFAULT_VOCABULARY, ...state.customCards];
}

function isAdultUnlocked() {
  return Date.now() < state.adultUnlockedUntil;
}

function navigate(route) {
  if (route === 'adulto' && !isAdultUnlocked()) {
    openAdultGate();
    return;
  }
  state.route = route;
  history.replaceState(null, '', `#${route}`);
  render();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function renderSymbol(card, size = 'normal') {
  const image = safeImageSrc(card.image);
  if (image) return `<img class="card-photo card-photo--${size}" src="${image}" alt="" />`;
  return `<span class="symbol symbol--${size}" aria-hidden="true">${escapeHtml(card.symbol || '●')}</span>`;
}

function cardButton(card) {
  return `
    <button class="aac-card aac-card--${escapeHtml(card.color || 'noun')}" type="button"
      data-action="card" data-card-id="${escapeHtml(card.id)}" aria-label="${escapeHtml(card.label)}">
      ${renderSymbol(card)}
      ${state.settings.showLabels ? `<span class="aac-card__label">${escapeHtml(card.label)}</span>` : ''}
    </button>`;
}

function shell(content) {
  const childName = state.settings.childName.trim();
  return `
    <div class="app-shell ${state.settings.reducedStimulus ? 'is-calm' : ''}">
      <header class="topbar">
        <button class="brand" type="button" data-route="comunicar" aria-label="Ir para comunicação">
          <span class="brand__mark" aria-hidden="true"><span></span><span></span><span></span></span>
          <span><strong>Fala Comigo</strong><small>${childName ? `Palavras de ${escapeHtml(childName)}` : 'Palavras para o dia a dia'}</small></span>
        </button>
        <button class="icon-button" type="button" data-action="adult-gate" aria-label="Área do adulto" title="Área do adulto"><span aria-hidden="true">⚙️</span></button>
      </header>
      <main id="main-content">${content}</main>
      ${state.route !== 'adulto' ? bottomNav() : ''}
      <div id="live-region" class="sr-only" aria-live="polite" aria-atomic="true"></div>
    </div>`;
}

function bottomNav() {
  const items = [['comunicar', '💬', 'Falar'], ['letras', 'A', 'Letras'], ['numeros', '123', 'Números'], ['rotina', '→', 'Agora/Depois']];
  return `<nav class="bottom-nav" aria-label="Áreas do aplicativo">${items.map(([route, icon, label]) => `
    <button type="button" class="bottom-nav__item ${state.route === route ? 'is-active' : ''}" data-route="${route}">
      <span class="bottom-nav__icon" aria-hidden="true">${icon}</span><span>${label}</span>
    </button>`).join('')}</nav>`;
}

function communicateView() {
  const cards = cardsForCategory(allCards(), state.category);
  const visibleCards = state.settings.reducedStimulus ? cards.slice(0, 6) : cards;
  const phrase = phraseLabel(state.phrase);
  return shell(`
    <section class="page page--communicate" aria-labelledby="communicate-title">
      <div class="section-heading"><div><span class="eyebrow">Comunicação</span><h1 id="communicate-title">O que você quer dizer?</h1></div><p>Toque nas palavras. Não precisa repetir em voz alta.</p></div>
      <section class="phrase-board" aria-label="Frase atual">
        <div class="phrase-board__content ${state.phrase.length ? '' : 'is-empty'}">
          ${state.phrase.length ? state.phrase.map((card) => `<div class="phrase-token">${renderSymbol(card, 'small')}<span>${escapeHtml(card.label)}</span></div>`).join('') : `<span class="phrase-placeholder"><span aria-hidden="true">👆</span> Toque nas palavras para montar uma frase</span>`}
        </div>
        <div class="phrase-board__actions">
          <button type="button" class="soft-button" data-action="phrase-back" ${state.phrase.length ? '' : 'disabled'} aria-label="Apagar última palavra">⌫ <span>Voltar</span></button>
          <button type="button" class="speak-button" data-action="speak-phrase" ${phrase ? '' : 'disabled'}><span aria-hidden="true">🔊</span> Falar</button>
          <button type="button" class="soft-button" data-action="phrase-clear" ${state.phrase.length ? '' : 'disabled'}><span aria-hidden="true">↺</span> <span>Limpar</span></button>
        </div>
      </section>
      <div class="category-tabs" role="tablist" aria-label="Categorias de palavras">
        ${CATEGORY_ORDER.map((id) => `<button type="button" role="tab" aria-selected="${state.category === id}" class="category-tab ${state.category === id ? 'is-active' : ''}" data-category="${id}"><span aria-hidden="true">${CATEGORIES[id].icon}</span>${escapeHtml(CATEGORIES[id].label)}</button>`).join('')}
      </div>
      <div class="aac-grid ${state.settings.compactGrid ? 'aac-grid--compact' : ''}" aria-label="Palavras de ${escapeHtml(CATEGORIES[state.category].label)}">${visibleCards.map(cardButton).join('')}</div>
      ${state.settings.reducedStimulus && cards.length > visibleCards.length ? `<p class="calm-note">Modo calmo está mostrando menos opções por vez. O adulto pode desligá-lo nas configurações.</p>` : ''}
    </section>`);
}

function lettersView() {
  const selected = findLetter(state.selectedLetter) || LETTERS[0];
  return shell(`
    <section class="page" aria-labelledby="letters-title">
      <div class="section-heading"><div><span class="eyebrow">Explorar</span><h1 id="letters-title">Letras</h1></div><p>Sem cronômetro e sem erro. Toque, escute e explore no ritmo da criança.</p></div>
      <div class="learning-focus" aria-live="polite">
        <div class="learning-focus__big">${selected.letter}</div>
        <div class="learning-focus__example"><span class="learning-symbol" aria-hidden="true">${selected.symbol}</span><div><strong>${selected.letter} de ${escapeHtml(selected.word)}</strong><span>Toque abaixo em outra letra</span></div></div>
        <button type="button" class="listen-button" data-action="speak-letter" data-letter="${selected.letter}"><span aria-hidden="true">🔊</span> Ouvir de novo</button>
      </div>
      <div class="letter-grid" aria-label="Alfabeto">${LETTERS.map(({ letter }) => `<button type="button" class="letter-key ${letter === selected.letter ? 'is-selected' : ''}" data-action="letter" data-letter="${letter}" aria-pressed="${letter === selected.letter}">${letter}</button>`).join('')}</div>
      <aside class="caregiver-tip"><strong>Para o adulto</strong><span>Você pode acompanhar apontando para a letra e falando naturalmente. Não é necessário pedir que a criança repita.</span></aside>
    </section>`);
}

function numberDots(number) {
  if (number.value === 0) return '<span class="zero-set">nenhum</span>';
  return `<div class="dot-set" aria-label="${number.value} pontos">${number.dots.map(() => '<span></span>').join('')}</div>`;
}

function numbersView() {
  const selected = NUMBERS.find((item) => item.value === state.selectedNumber) || NUMBERS[1];
  return shell(`
    <section class="page" aria-labelledby="numbers-title">
      <div class="section-heading"><div><span class="eyebrow">Explorar</span><h1 id="numbers-title">Números</h1></div><p>Associe o símbolo à quantidade de forma visual e simples.</p></div>
      <div class="learning-focus learning-focus--number" aria-live="polite"><div class="learning-focus__big">${selected.value}</div>${numberDots(selected)}<button type="button" class="listen-button" data-action="speak-number" data-number="${selected.value}"><span aria-hidden="true">🔊</span> Ouvir número ${selected.value}</button></div>
      <div class="number-grid" aria-label="Números de zero a dez">${NUMBERS.map(({ value }) => `<button type="button" class="number-key ${value === selected.value ? 'is-selected' : ''}" data-action="number" data-number="${value}" aria-pressed="${value === selected.value}">${value}</button>`).join('')}</div>
    </section>`);
}

function routineCard(card, label) {
  if (!card) return `<div class="routine-card is-empty"><span>Configure na área do adulto</span></div>`;
  return `<div class="routine-card"><span class="routine-card__tag">${label}</span>${renderSymbol(card, 'large')}<strong>${escapeHtml(card.label)}</strong><button type="button" class="listen-button" data-action="speak-routine" data-card-id="${escapeHtml(card.id)}"><span aria-hidden="true">🔊</span> Ouvir</button></div>`;
}

function routineView() {
  const cards = allCards();
  const now = findCard(cards, state.routine.nowId);
  const next = findCard(cards, state.routine.nextId);
  return shell(`
    <section class="page" aria-labelledby="routine-title">
      <div class="section-heading"><div><span class="eyebrow">Suporte visual</span><h1 id="routine-title">Agora e depois</h1></div><p>Duas etapas previsíveis, sem excesso de informação.</p></div>
      <div class="routine-board">${routineCard(now, 'AGORA')}<div class="routine-arrow" aria-hidden="true">→</div>${routineCard(next, 'DEPOIS')}</div>
      <aside class="caregiver-tip"><strong>Como usar</strong><span>Mostre o quadro antes da transição e use poucas palavras: “Agora comer. Depois brincar.”</span></aside>
    </section>`);
}

function usageSummary() {
  const counts = new Map();
  for (const event of state.events) {
    if (event.type !== 'card' || !event.cardId) continue;
    counts.set(event.cardId, (counts.get(event.cardId) || 0) + 1);
  }
  return [...counts.entries()].map(([id, count]) => ({ card: findCard(allCards(), id), count })).filter(({ card }) => card).sort((a, b) => b.count - a.count).slice(0, 8);
}

function optionCards(selected) {
  return allCards().map((card) => `<option value="${escapeHtml(card.id)}" ${selected === card.id ? 'selected' : ''}>${escapeHtml(card.label)}</option>`).join('');
}

function adultView() {
  if (!isAdultUnlocked()) return communicateView();
  const usage = usageSummary();
  return shell(`
    <section class="page page--adult" aria-labelledby="adult-title">
      <div class="adult-header"><div><span class="eyebrow">Área protegida</span><h1 id="adult-title">Área do adulto</h1><p>Personalize a comunicação sem transformar o uso da criança em uma prova.</p></div><button type="button" class="soft-button" data-action="lock-adult">🔒 Sair da área do adulto</button></div>
      <div class="adult-layout">
        <section class="panel"><h2>Perfil e experiência</h2><form id="settings-form" class="form-stack">
          <label>Nome da criança <input name="childName" maxlength="32" autocomplete="off" value="${escapeHtml(state.settings.childName)}" placeholder="Opcional" /></label>
          <label>Velocidade da voz <input name="speechRate" type="range" min="0.65" max="1.1" step="0.05" value="${state.settings.speechRate}" /><span class="field-help">Mais lenta pode facilitar a escuta. Ajuste pelo que funciona melhor.</span></label>
          <label class="toggle-row"><input name="speakOnTap" type="checkbox" ${state.settings.speakOnTap ? 'checked' : ''} /><span><strong>Falar ao tocar no símbolo</strong><small>A palavra é pronunciada imediatamente.</small></span></label>
          <label class="toggle-row"><input name="showLabels" type="checkbox" ${state.settings.showLabels ? 'checked' : ''} /><span><strong>Mostrar palavras escritas</strong><small>Mantém texto junto dos símbolos.</small></span></label>
          <label class="toggle-row"><input name="reducedStimulus" type="checkbox" ${state.settings.reducedStimulus ? 'checked' : ''} /><span><strong>Modo calmo</strong><small>Mostra menos cartões por categoria.</small></span></label>
          <label class="toggle-row"><input name="compactGrid" type="checkbox" ${state.settings.compactGrid ? 'checked' : ''} /><span><strong>Grade mais compacta</strong><small>Útil em tablets maiores ou para quem prefere mais opções visíveis.</small></span></label>
          <button type="submit" class="primary-button">Salvar preferências</button>
        </form></section>
        <section class="panel"><h2>Agora e depois</h2><p class="panel-copy">Escolha duas ações/itens familiares. A criança verá apenas o quadro pronto.</p><form id="routine-form" class="form-stack"><label>Agora <select name="nowId">${optionCards(state.routine.nowId)}</select></label><label>Depois <select name="nextId">${optionCards(state.routine.nextId)}</select></label><button type="submit" class="primary-button">Atualizar quadro</button></form></section>
        <section class="panel panel--wide"><h2>Adicionar palavra com foto</h2><p class="panel-copy">Fotos de objetos e pessoas reais podem tornar os símbolos mais significativos. A imagem fica apenas neste dispositivo.</p><form id="custom-card-form" class="custom-card-form"><label>Palavra <input name="label" required maxlength="28" placeholder="Ex.: Dinossauro" /></label><label>Categoria <select name="category">${CATEGORY_ORDER.map((id) => `<option value="${id}">${escapeHtml(CATEGORIES[id].label)}</option>`).join('')}</select></label><label>Foto <input name="image" type="file" accept="image/png,image/jpeg,image/webp" /></label><button type="submit" class="primary-button">Adicionar cartão</button></form>
          ${state.customCards.length ? `<div class="custom-list">${state.customCards.map((card) => `<div class="custom-list__item">${renderSymbol(card, 'small')}<span><strong>${escapeHtml(card.label)}</strong><small>${escapeHtml(CATEGORIES[card.category]?.label || card.category)}</small></span><button type="button" class="danger-link" data-action="delete-custom" data-card-id="${escapeHtml(card.id)}">Remover</button></div>`).join('')}</div>` : '<p class="empty-state">Nenhum cartão personalizado ainda.</p>'}
        </section>
        <section class="panel panel--wide"><div class="panel-heading"><div><h2>Uso recente</h2><p class="panel-copy">Contagem local para você observar quais palavras aparecem mais. Não é avaliação clínica nem nota de progresso.</p></div><button type="button" class="danger-link" data-action="clear-events">Limpar histórico</button></div>
          ${usage.length ? `<div class="usage-grid">${usage.map(({ card, count }) => `<div class="usage-item">${renderSymbol(card, 'small')}<span><strong>${escapeHtml(card.label)}</strong><small>${count} ${count === 1 ? 'toque' : 'toques'}</small></span></div>`).join('')}</div>` : '<p class="empty-state">O histórico aparecerá depois que os cartões forem usados.</p>'}
          ${state.events[0] ? `<p class="history-meta">Última interação registrada: ${escapeHtml(formatDateTime(state.events[0].createdAt))}</p>` : ''}
        </section>
        <section class="panel panel--wide evidence-panel"><span class="eyebrow">Princípios do produto</span><h2>Comunicação primeiro</h2><div class="principles-grid"><div><strong>Sem exigir fala</strong><span>O símbolo continua válido como comunicação mesmo sem repetição verbal.</span></div><div><strong>Modelar, não testar</strong><span>O adulto pode tocar no símbolo enquanto fala para mostrar como usar.</span></div><div><strong>Interesses importam</strong><span>Letras, números, brinquedos e rotinas favoritas podem abrir novas oportunidades de interação.</span></div><div><strong>Individualizar</strong><span>O que funciona varia entre crianças. Profissionais que já acompanham a criança podem orientar vocabulário e estratégia.</span></div></div><a class="text-link" href="./docs/EVIDENCE.md" target="_blank" rel="noopener">Ver base de evidências do projeto</a></section>
      </div>
    </section>`);
}

function currentView() {
  switch (state.route) {
    case 'letras': return lettersView();
    case 'numeros': return numbersView();
    case 'rotina': return routineView();
    case 'adulto': return adultView();
    default: return communicateView();
  }
}

function render() { app.innerHTML = currentView(); }

async function logEvent(event) {
  const row = { ...event, createdAt: new Date().toISOString() };
  state.events.unshift(row);
  state.events = state.events.slice(0, 200);
  try { await repo.addEvent(row); } catch (error) { console.warn('Não foi possível registrar evento local.', error); }
}

function openAdultGate() {
  const modal = document.createElement('dialog');
  modal.className = 'adult-gate';
  modal.innerHTML = `<form method="dialog" class="adult-gate__card"><button class="dialog-close" value="cancel" aria-label="Fechar">×</button><span class="gate-icon" aria-hidden="true">🔒</span><h2>Área do adulto</h2><p>Para evitar alterações acidentais, mantenha o botão pressionado por 2 segundos.</p><button type="button" class="hold-button" data-hold>Segure para entrar<span class="hold-progress"></span></button></form>`;
  document.body.append(modal);
  modal.showModal();

  const hold = modal.querySelector('[data-hold]');
  let timer;
  let start;
  const progress = hold.querySelector('.hold-progress');
  const tick = () => {
    const elapsed = Date.now() - start;
    progress.style.width = `${Math.min(100, elapsed / 20)}%`;
    if (elapsed < 2000) requestAnimationFrame(tick);
  };
  const begin = (event) => {
    event.preventDefault();
    start = Date.now();
    progress.style.width = '0%';
    requestAnimationFrame(tick);
    timer = setTimeout(() => {
      state.adultUnlockedUntil = Date.now() + 10 * 60 * 1000;
      modal.close();
      modal.remove();
      navigate('adulto');
    }, 2000);
  };
  const cancel = () => { clearTimeout(timer); progress.style.width = '0%'; };
  hold.addEventListener('pointerdown', begin);
  hold.addEventListener('pointerup', cancel);
  hold.addEventListener('pointerleave', cancel);
  hold.addEventListener('pointercancel', cancel);
  modal.addEventListener('close', () => modal.remove(), { once: true });
}

function readImage(file) {
  if (!file) return Promise.resolve('');
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) return Promise.reject(new Error('Use PNG, JPEG ou WebP.'));
  if (file.size > 1_500_000) return Promise.reject(new Error('A imagem deve ter no máximo 1,5 MB.'));
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

app.addEventListener('click', async (event) => {
  const target = event.target.closest('button, [data-route]');
  if (!target) return;
  if (target.dataset.route) return navigate(target.dataset.route);
  const action = target.dataset.action;

  if (action === 'adult-gate') return openAdultGate();
  if (action === 'lock-adult') { state.adultUnlockedUntil = 0; return navigate('comunicar'); }
  if (action === 'card') {
    const card = findCard(allCards(), target.dataset.cardId);
    if (!card) return;
    state.phrase = addToPhrase(state.phrase, card);
    if (state.settings.speakOnTap) speech.speak(card.spoken || card.label);
    await logEvent({ type: 'card', cardId: card.id });
    render();
    announce(`${card.label} adicionado à frase.`);
    return;
  }
  if (action === 'phrase-back') { state.phrase = removeLast(state.phrase); render(); return; }
  if (action === 'phrase-clear') { state.phrase = []; render(); return; }
  if (action === 'speak-phrase') { const text = phraseText(state.phrase); speech.speak(text); if (text) await logEvent({ type: 'phrase', text }); return; }
  if (action === 'letter' || action === 'speak-letter') {
    const item = findLetter(target.dataset.letter);
    if (!item) return;
    state.selectedLetter = item.letter;
    speech.speak(`${item.letter}. ${item.letter} de ${item.word}.`);
    if (action === 'letter') { await logEvent({ type: 'letter', value: item.letter }); render(); }
    return;
  }
  if (action === 'number' || action === 'speak-number') {
    const value = Number(target.dataset.number);
    const item = NUMBERS.find((entry) => entry.value === value);
    if (!item) return;
    state.selectedNumber = value;
    speech.speak(item.spoken);
    if (action === 'number') { await logEvent({ type: 'number', value }); render(); }
    return;
  }
  if (action === 'speak-routine') { const card = findCard(allCards(), target.dataset.cardId); if (card) speech.speak(card.spoken || card.label); return; }
  if (action === 'delete-custom') { state.customCards = state.customCards.filter((card) => card.id !== target.dataset.cardId); await repo.set('customCards', state.customCards); render(); return; }
  if (action === 'clear-events') { if (!window.confirm('Limpar o histórico local de uso deste dispositivo?')) return; await repo.clearEvents(); state.events = []; render(); }
});

app.addEventListener('click', (event) => {
  const category = event.target.closest('[data-category]')?.dataset.category;
  if (!category || !CATEGORIES[category]) return;
  state.category = category;
  render();
});

app.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target;
  if (form.id === 'settings-form') {
    const data = new FormData(form);
    state.settings = { ...state.settings, childName: String(data.get('childName') || '').trim().slice(0, 32), speechRate: Number(data.get('speechRate')) || DEFAULT_SETTINGS.speechRate, speakOnTap: data.has('speakOnTap'), showLabels: data.has('showLabels'), reducedStimulus: data.has('reducedStimulus'), compactGrid: data.has('compactGrid') };
    speech.update({ rate: state.settings.speechRate });
    await repo.set('settings', state.settings);
    render();
    announce('Preferências salvas.');
    return;
  }
  if (form.id === 'routine-form') {
    const data = new FormData(form);
    state.routine = { nowId: String(data.get('nowId')), nextId: String(data.get('nextId')) };
    await repo.set('routine', state.routine);
    render();
    announce('Quadro de rotina atualizado.');
    return;
  }
  if (form.id === 'custom-card-form') {
    const data = new FormData(form);
    const label = String(data.get('label') || '').trim().slice(0, 28);
    const category = String(data.get('category') || 'essenciais');
    if (!label || !CATEGORIES[category]) return;
    try {
      const image = await readImage(data.get('image'));
      const id = `custom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      state.customCards.push({ id, label, spoken: label, category, color: 'custom', kind: 'thing', symbol: '⭐', image });
      await repo.set('customCards', state.customCards);
      form.reset();
      render();
      announce(`${label} adicionado.`);
    } catch (error) { window.alert(error.message); }
  }
});

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  try { await navigator.serviceWorker.register('./service-worker.js'); }
  catch (error) { console.warn('Service worker indisponível.', error); }
}

async function init() {
  try {
    await repo.open();
    state.settings = { ...DEFAULT_SETTINGS, ...(await repo.get('settings', {})) };
    state.customCards = await repo.get('customCards', []);
    state.routine = { ...state.routine, ...(await repo.get('routine', {})) };
    state.events = await repo.recentEvents(200);
  } catch (error) { console.warn('Persistência local indisponível; o app continuará em memória.', error); }
  speech.update({ rate: state.settings.speechRate });
  const hash = location.hash.replace('#', '');
  state.route = ['comunicar', 'letras', 'numeros', 'rotina'].includes(hash) ? hash : 'comunicar';
  render();
  registerServiceWorker();
}

init();
