import { ordenarRegistros } from 'ordenacao-tabelas';
const registros = Object.freeze([{ nome: 'Item 2', numero: 2, unidades: 2n }]);
const texto = ordenarRegistros(registros, { valor: r => r.nome });
const numero = ordenarRegistros(registros, { valor: r => r.numero, tipo: 'numero' });
ordenarRegistros(registros, { valor: r => r.unidades, tipo: 'inteiro' });
texto[0].nome.toUpperCase();
numero[0].numero.toFixed(2);
// @ts-expect-error numeric selector requires explicit numeric type
ordenarRegistros(registros, { valor: r => r.numero });
// @ts-expect-error number is not bigint
ordenarRegistros(registros, { valor: r => r.numero, tipo: 'inteiro' });
// @ts-expect-error unsupported direction
ordenarRegistros(registros, { valor: r => r.nome, direcao: 'up' });
