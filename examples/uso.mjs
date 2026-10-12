import { ordenarRegistros } from '../src/index.js';
const linhas = [{ nome: 'Item 10', valor: 900 }, { nome: 'Item 2', valor: 1200 }, { nome: 'Sem preço', valor: null }];
console.log(ordenarRegistros(linhas, { valor: linha => linha.nome }));
console.log(ordenarRegistros(linhas, { valor: linha => linha.valor, tipo: 'numero', direcao: 'desc' }));
