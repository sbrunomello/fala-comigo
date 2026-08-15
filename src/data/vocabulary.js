export const CATEGORY_ORDER = ['essenciais', 'pessoas', 'comer', 'brincar', 'lugares', 'sentir'];

export const CATEGORIES = {
  essenciais: { label: 'Essenciais', icon: '💬' },
  pessoas: { label: 'Pessoas', icon: '👨‍👩‍👧' },
  comer: { label: 'Comer e beber', icon: '🥤' },
  brincar: { label: 'Brincar', icon: '🧸' },
  lugares: { label: 'Lugares', icon: '🏠' },
  sentir: { label: 'Como estou', icon: '🙂' }
};

export const DEFAULT_VOCABULARY = [
  { id: 'eu', label: 'Eu', spoken: 'eu', symbol: '🙋', category: 'essenciais', color: 'core', kind: 'person' },
  { id: 'quero', label: 'Quero', spoken: 'quero', symbol: '👉', category: 'essenciais', color: 'action', kind: 'action' },
  { id: 'mais', label: 'Mais', spoken: 'mais', symbol: '➕', category: 'essenciais', color: 'action', kind: 'action' },
  { id: 'nao', label: 'Não', spoken: 'não', symbol: '✋', category: 'essenciais', color: 'social', kind: 'social' },
  { id: 'ajuda', label: 'Ajuda', spoken: 'ajuda', symbol: '🤝', category: 'essenciais', color: 'social', kind: 'social' },
  { id: 'acabou', label: 'Acabou', spoken: 'acabou', symbol: '✅', category: 'essenciais', color: 'social', kind: 'social' },
  { id: 'sim', label: 'Sim', spoken: 'sim', symbol: '👍', category: 'essenciais', color: 'social', kind: 'social' },
  { id: 'de_novo', label: 'De novo', spoken: 'de novo', symbol: '🔁', category: 'essenciais', color: 'action', kind: 'action' },

  { id: 'mamae', label: 'Mamãe', spoken: 'mamãe', symbol: '👩', category: 'pessoas', color: 'person', kind: 'person' },
  { id: 'papai', label: 'Papai', spoken: 'papai', symbol: '👨', category: 'pessoas', color: 'person', kind: 'person' },
  { id: 'familia', label: 'Família', spoken: 'família', symbol: '👨‍👩‍👧', category: 'pessoas', color: 'person', kind: 'person' },
  { id: 'eu_pessoa', label: 'Eu', spoken: 'eu', symbol: '🧒', category: 'pessoas', color: 'person', kind: 'person' },

  { id: 'agua', label: 'Água', spoken: 'água', symbol: '💧', category: 'comer', color: 'noun', kind: 'thing' },
  { id: 'comer', label: 'Comer', spoken: 'comer', symbol: '🍽️', category: 'comer', color: 'action', kind: 'action' },
  { id: 'banana', label: 'Banana', spoken: 'banana', symbol: '🍌', category: 'comer', color: 'noun', kind: 'thing' },
  { id: 'maca', label: 'Maçã', spoken: 'maçã', symbol: '🍎', category: 'comer', color: 'noun', kind: 'thing' },
  { id: 'leite', label: 'Leite', spoken: 'leite', symbol: '🥛', category: 'comer', color: 'noun', kind: 'thing' },
  { id: 'lanche', label: 'Lanche', spoken: 'lanche', symbol: '🥪', category: 'comer', color: 'noun', kind: 'thing' },

  { id: 'brincar', label: 'Brincar', spoken: 'brincar', symbol: '🧸', category: 'brincar', color: 'action', kind: 'action' },
  { id: 'bola', label: 'Bola', spoken: 'bola', symbol: '⚽', category: 'brincar', color: 'noun', kind: 'thing' },
  { id: 'carrinho', label: 'Carrinho', spoken: 'carrinho', symbol: '🚗', category: 'brincar', color: 'noun', kind: 'thing' },
  { id: 'livro', label: 'Livro', spoken: 'livro', symbol: '📚', category: 'brincar', color: 'noun', kind: 'thing' },
  { id: 'musica', label: 'Música', spoken: 'música', symbol: '🎵', category: 'brincar', color: 'noun', kind: 'thing' },
  { id: 'desenhar', label: 'Desenhar', spoken: 'desenhar', symbol: '🖍️', category: 'brincar', color: 'action', kind: 'action' },

  { id: 'casa', label: 'Casa', spoken: 'casa', symbol: '🏠', category: 'lugares', color: 'place', kind: 'place' },
  { id: 'banheiro', label: 'Banheiro', spoken: 'banheiro', symbol: '🚽', category: 'lugares', color: 'place', kind: 'place' },
  { id: 'quarto', label: 'Quarto', spoken: 'quarto', symbol: '🛏️', category: 'lugares', color: 'place', kind: 'place' },
  { id: 'passear', label: 'Passear', spoken: 'passear', symbol: '🌳', category: 'lugares', color: 'action', kind: 'action' },

  { id: 'feliz', label: 'Feliz', spoken: 'feliz', symbol: '😊', category: 'sentir', color: 'feeling', kind: 'feeling' },
  { id: 'triste', label: 'Triste', spoken: 'triste', symbol: '😔', category: 'sentir', color: 'feeling', kind: 'feeling' },
  { id: 'cansado', label: 'Cansado', spoken: 'cansado', symbol: '😴', category: 'sentir', color: 'feeling', kind: 'feeling' },
  { id: 'dor', label: 'Dói', spoken: 'dói', symbol: '🤕', category: 'sentir', color: 'feeling', kind: 'feeling' },
  { id: 'barulho', label: 'Muito barulho', spoken: 'muito barulho', symbol: '🔊', category: 'sentir', color: 'feeling', kind: 'feeling' },
  { id: 'pausa', label: 'Quero uma pausa', spoken: 'quero uma pausa', symbol: '🌿', category: 'sentir', color: 'feeling', kind: 'feeling' }
];

export function cardsForCategory(cards, category) {
  return cards.filter((card) => card.category === category);
}

export function findCard(cards, id) {
  return cards.find((card) => card.id === id);
}
