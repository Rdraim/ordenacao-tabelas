/** Stable sorting with an explicit value type. Does not mutate rows. */
export function ordenarRegistros(registros, { valor, tipo = 'texto', direcao = 'asc', idioma = 'pt-BR' } = {}) {
  if (!Array.isArray(registros)) throw new TypeError('Expected an array');
  if (typeof valor !== 'function') throw new TypeError('Expected a value selector');
  if (!['texto', 'numero', 'inteiro'].includes(tipo)) throw new TypeError('Unsupported value type');
  if (!['asc', 'desc'].includes(direcao)) throw new TypeError('Unsupported sort direction');
  for (let indice = 0; indice < registros.length; indice++) {
    if (!Object.hasOwn(registros, indice)) throw new TypeError(`Missing row at index ${indice}`);
  }
  const colator = tipo === 'texto' ? new Intl.Collator(idioma, { numeric: true, sensitivity: 'base' }) : null;
  const linhas = registros.map((registro, indice) => {
    const campo = valor(registro);
    const vazio = campo == null || campo === '';
    if (!vazio && ((tipo === 'numero' && (typeof campo !== 'number' || !Number.isFinite(campo))) ||
      (tipo === 'inteiro' && typeof campo !== 'bigint') || (tipo === 'texto' && typeof campo !== 'string'))) {
      throw new TypeError(`Invalid ${tipo} value at row ${indice}`);
    }
    return { registro, indice, campo, vazio };
  });
  const sinal = direcao === 'desc' ? -1 : 1;
  linhas.sort((a, b) => {
    if (a.vazio || b.vazio) return a.vazio === b.vazio ? a.indice - b.indice : a.vazio ? 1 : -1;
    const comparacao = colator ? colator.compare(a.campo, b.campo) : a.campo === b.campo ? 0 : a.campo < b.campo ? -1 : 1;
    return comparacao === 0 ? a.indice - b.indice : sinal * comparacao;
  });
  return linhas.map(linha => linha.registro);
}
