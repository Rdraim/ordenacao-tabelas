<p align="right">
  <a href="API.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="API.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="API.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# API reference

| API | Input | Result and errors |
|---|---|---|
| `ordenarRegistros(registros, opcoes)` | Dense array and valor(record) selector. Text by default; numero requires finite Number; inteiro requires bigint. | New array retaining record references; TypeError for an invalid type, direction or missing row. |
| `opcoes.direcao / opcoes.idioma` | asc or desc; default locale pt-BR, used only for text. | Ties preserve input order. null, undefined and empty strings are last in either direction. |

## Integration recipe

Synthetic example. Adapt and test the consuming application contract before integrating:

```js
import { ordenarRegistros } from './src/index.js';
const rows = [{ id: 'a', value: 10n }, { id: 'b', value: 2n }, { id: 'c', value: null }];
const sorted = ordenarRegistros(rows, { valor: row => row.value, tipo: 'inteiro', direcao: 'desc' });
// a, b, c; rows retains its original order
```

## Contract details

Use text for serials and identifiers; never strip letters to infer a number. Validated ISO dates can be sorted as text. Normalize currency first and declare numero or inteiro. Selector errors propagate; use pure selectors. Copying the array does not clone its objects.

## TypeScript contracts

The package includes .d.ts declarations; the core remains JavaScript ESM. Type examples in test-types/consumer.mts were checked with an existing compiler, without adding dependencies. CI runs runtime and content tests; it does not install a TypeScript compiler.

[Back to project](README.en-US.md) · [Compatibility](COMPATIBILITY.en-US.md)
