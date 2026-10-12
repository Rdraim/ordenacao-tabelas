import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ordenarRegistros } from '../src/index.js';
test('natural text order keeps complete rows and original input', () => {
  const registros = Object.freeze([{ id: 1, nome: 'Item 10' }, { id: 2, nome: 'Item 2' }, { id: 3, nome: 'item 2' }].map(Object.freeze));
  const resultado = ordenarRegistros(registros, { valor: r => r.nome });
  assert.deepEqual(resultado.map(r => r.id), [2, 3, 1]);
  assert.equal(resultado[0], registros[1]);
  assert.equal(registros[0].id, 1);
});
test('empty fields stay last in both directions and ties are stable', () => {
  const dados = [null, 10, '', 2, 10, undefined].map((n, id) => ({ n, id }));
  for (const direcao of ['asc', 'desc']) {
    const resultado = ordenarRegistros(dados, { valor: r => r.n, tipo: 'numero', direcao });
    assert.deepEqual(resultado.slice(-3).map(r => r.id), [0, 2, 5]);
    assert.deepEqual(resultado.filter(r => r.n === 10).map(r => r.id), [1, 4]);
    assert.equal(resultado[0].n, direcao === 'asc' ? 2 : 10);
  }
});
test('big integers retain precision and serials remain text', () => {
  const inteiros = [9007199254740993n, 9007199254740992n];
  assert.deepEqual(ordenarRegistros(inteiros, { valor: n => n, tipo: 'inteiro' }), [...inteiros].reverse());
  const series = ['PE09NLQH', 'B055KZ3'];
  assert.deepEqual(ordenarRegistros(series, { valor: n => n }), [...series].reverse());
});
test('invalid values fail instead of silently changing type', () => {
  for (const n of [NaN, Infinity, '12,50']) assert.throws(() => ordenarRegistros([n], { valor: r => r, tipo: 'numero' }), TypeError);
  assert.throws(() => ordenarRegistros([1], { valor: r => r }), TypeError);
  assert.throws(() => ordenarRegistros([], { valor: r => r, direcao: 'up' }), TypeError);
  assert.throws(() => ordenarRegistros([], { valor: r => r, tipo: 'date' }), TypeError);
});
test('selector runs exactly once per row', () => {
  let chamadas = 0;
  ordenarRegistros([3, 1, 2], { valor: r => { chamadas++; return r; }, tipo: 'numero' });
  assert.equal(chamadas, 3);
});
