export const MAX_PHRASE_ITEMS = 7;

export function addToPhrase(phrase, card, max = MAX_PHRASE_ITEMS) {
  if (!card || !card.id) return [...phrase];
  if (phrase.length >= max) return [...phrase];
  return [...phrase, card];
}

export function removeLast(phrase) {
  return phrase.slice(0, -1);
}

export function phraseText(phrase) {
  return phrase
    .map((item) => item.spoken || item.label)
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function phraseLabel(phrase) {
  const text = phraseText(phrase);
  if (!text) return '';
  return text.charAt(0).toLocaleUpperCase('pt-BR') + text.slice(1);
}
