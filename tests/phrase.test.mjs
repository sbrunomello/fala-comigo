import test from 'node:test';
import assert from 'node:assert/strict';
import { addToPhrase, phraseLabel, phraseText, removeLast, MAX_PHRASE_ITEMS } from '../src/core/phrase.js';
const card = (id, label, spoken = label.toLowerCase()) => ({ id, label, spoken });
test('monta frase preservando ordem escolhida pela criança', () => { let phrase = []; phrase = addToPhrase(phrase, card('eu', 'Eu')); phrase = addToPhrase(phrase, card('quero', 'Quero')); phrase = addToPhrase(phrase, card('agua', 'Água', 'água')); assert.equal(phraseText(phrase), 'eu quero água'); assert.equal(phraseLabel(phrase), 'Eu quero água'); });
test('não altera a frase original e respeita limite de itens', () => { const original = [card('a', 'A')]; const next = addToPhrase(original, card('b', 'B')); assert.equal(original.length, 1); assert.equal(next.length, 2); let full = []; for (let i = 0; i < MAX_PHRASE_ITEMS + 3; i += 1) full = addToPhrase(full, card(String(i), String(i))); assert.equal(full.length, MAX_PHRASE_ITEMS); });
test('remove apenas a última palavra', () => { const phrase = [card('eu', 'Eu'), card('quero', 'Quero'), card('bola', 'Bola')]; assert.deepEqual(removeLast(phrase).map((item) => item.id), ['eu', 'quero']); });
