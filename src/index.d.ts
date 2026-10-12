export type Vazio = null | undefined | '';
export interface OpcoesBase {
  direcao?: 'asc' | 'desc';
  idioma?: string | string[];
}
/** Dense array; selector called once per record; returns a new array. */
export function ordenarRegistros<T>(registros: readonly T[], opcoes: OpcoesBase & {
  valor: (registro: T) => string | Vazio;
  tipo?: 'texto';
}): T[];
export function ordenarRegistros<T>(registros: readonly T[], opcoes: OpcoesBase & {
  valor: (registro: T) => number | Vazio;
  tipo: 'numero';
}): T[];
export function ordenarRegistros<T>(registros: readonly T[], opcoes: OpcoesBase & {
  valor: (registro: T) => bigint | Vazio;
  tipo: 'inteiro';
}): T[];
