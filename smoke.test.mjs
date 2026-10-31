import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = file => readFile(join(ROOT, file), 'utf8');

test('index.html mantém os pontos de entrada da aplicação', async () => {
  const html = await read('index.html');

  assert.match(html, /css\/tokens\.css/);
  assert.match(html, /css\/app\.css/);
  assert.match(html, /js\/legacy\.js/);
  assert.match(html, /type="module" src="\.\/js\/main\.js"/);
});

test('index.html mantém os ecrãs principais', async () => {
  const html = await read('index.html');
  const ids = ['s-home', 's-lesson', 's-ficha', 's-result', 's-sim', 's-lab', 's-ver', 's-gloss'];

  for (const id of ids) {
    assert.match(html, new RegExp(`id="${id}"`), `Ecrã ausente: ${id}`);
  }
});

test('index.html mantém os IDs usados pela lógica existente', async () => {
  const html = await read('index.html');
  const ids = [
    'nav', 'tracks', 'prof-btn', 'lang-btn', 'h-streak', 'h-xp',
    'l-body', 'l-btn', 'sim-scale', 'sim-bs', 'sim-j', 'g-q', 'g-list'
  ];

  for (const id of ids) {
    assert.match(html, new RegExp(`id="${id}"`), `ID removido: ${id}`);
  }
});

test('a navegação mantém os destinos principais', async () => {
  const html = await read('index.html');
  const destinations = ['home', 'sim', 'lab', 'ver', 'gloss'];

  for (const destination of destinations) {
    assert.match(html, new RegExp(`data-s="${destination}"`));
  }
});

test('main.js permanece sintaticamente válido e modular', async () => {
  const main = await read('js/main.js');

  assert.match(main, /MutationObserver/);
  assert.match(main, /export|function init/);
  assert.doesNotMatch(main, /<script|<\/script>/);
});

test('ficheiros externos não contêm etiquetas HTML indevidas', async () => {
  const css = await read('css/app.css');
  const legacy = await read('js/legacy.js');

  assert.doesNotMatch(css, /<style|<\/style>/);
  assert.doesNotMatch(legacy, /^\s*<script/);
  assert.doesNotMatch(legacy, /<\/script>\s*$/);
});
