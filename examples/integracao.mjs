import { ordenarRegistros } from '../src/index.js';
const registros = Object.freeze([
  { id: 'a', nome: 'Item 10', unidades: 9007199254740993n },
  { id: 'b', nome: 'Item 2', unidades: 9007199254740992n },
  { id: 'c', nome: 'Item 2', unidades: null }
]);
const textos = ordenarRegistros(registros, { valor: r => r.nome });
const valores = ordenarRegistros(registros, { valor: r => r.unidades, tipo: 'inteiro', direcao: 'desc' });
console.log({ original: registros.map(r => r.id), texto: textos.map(r => r.id), valores: valores.map(r => r.id) });
console.log({ mesmasReferencias: textos.every(r => registros.includes(r)) });
