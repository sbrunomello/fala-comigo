export const LETTERS = [
  ['A', 'Avião', '✈️'], ['B', 'Bola', '⚽'], ['C', 'Casa', '🏠'], ['D', 'Dado', '🎲'],
  ['E', 'Elefante', '🐘'], ['F', 'Flor', '🌻'], ['G', 'Gato', '🐱'], ['H', 'Hipopótamo', '🦛'],
  ['I', 'Ilha', '🏝️'], ['J', 'Jacaré', '🐊'], ['K', 'Kiwi', '🥝'], ['L', 'Lua', '🌙'],
  ['M', 'Maçã', '🍎'], ['N', 'Navio', '🚢'], ['O', 'Ovelha', '🐑'], ['P', 'Pato', '🦆'],
  ['Q', 'Queijo', '🧀'], ['R', 'Robô', '🤖'], ['S', 'Sol', '☀️'], ['T', 'Trem', '🚂'],
  ['U', 'Uva', '🍇'], ['V', 'Vaca', '🐄'], ['W', 'Web', '🌐'], ['X', 'Xícara', '☕'],
  ['Y', 'Yoga', '🧘'], ['Z', 'Zebra', '🦓']
].map(([letter, word, symbol]) => ({ letter, word, symbol }));

export const NUMBERS = Array.from({ length: 11 }, (_, value) => ({
  value,
  label: String(value),
  spoken: value === 0 ? 'zero' : String(value),
  dots: Array.from({ length: value }, (_, index) => index)
}));

export function findLetter(letter) {
  return LETTERS.find((entry) => entry.letter === letter.toUpperCase());
}

export function clampNumber(value, min = 0, max = 10) {
  return Math.min(max, Math.max(min, Number(value) || 0));
}
