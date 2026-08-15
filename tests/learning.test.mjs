import test from 'node:test';
import assert from 'node:assert/strict';
import { LETTERS, NUMBERS, clampNumber, findLetter } from '../src/data/learning.js';
import { DEFAULT_VOCABULARY, cardsForCategory } from '../src/data/vocabulary.js';
test('alfabeto contém 26 letras únicas', () => { assert.equal(LETTERS.length, 26); assert.equal(new Set(LETTERS.map((item) => item.letter)).size, 26); assert.equal(findLetter('a').word, 'Avião'); });
test('números cobrem zero a dez com quantidades coerentes', () => { assert.deepEqual(NUMBERS.map((item) => item.value), [0,1,2,3,4,5,6,7,8,9,10]); for (const item of NUMBERS) assert.equal(item.dots.length, item.value); assert.equal(clampNumber(-2), 0); assert.equal(clampNumber(99), 10); });
test('vocabulário essencial mantém palavras funcionais de alta utilidade', () => { const labels = cardsForCategory(DEFAULT_VOCABULARY, 'essenciais').map((item) => item.label); for (const expected of ['Eu', 'Quero', 'Mais', 'Não', 'Ajuda', 'Acabou']) assert.ok(labels.includes(expected)); });
