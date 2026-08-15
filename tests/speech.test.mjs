import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSpeechText } from '../src/core/speech.js';

test('remove repetição da letra antes do exemplo', () => {
  assert.equal(normalizeSpeechText('A. A de Avião.'), 'A de Avião.');
  assert.equal(normalizeSpeechText('B. B de Bola.'), 'B de Bola.');
});

test('preserva outras falas', () => {
  assert.equal(normalizeSpeechText('Eu quero água.'), 'Eu quero água.');
  assert.equal(normalizeSpeechText('3'), '3');
});
