<p align="right">
  <a href="API.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="API.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="API.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# Referencia de API

| API | Entrada | Resultado y errores |
|---|---|---|
| `ordenarRegistros(registros, opcoes)` | Array denso y selector valor(registro). Texto por defecto; numero requiere Number finito; inteiro requiere bigint. | Nuevo array con las mismas referencias; TypeError para tipo, dirección o fila ausente. |
| `opcoes.direcao / opcoes.idioma` | asc o desc; idioma pt-BR por defecto, solo para texto. | Los empates conservan el orden inicial. null, undefined y cadenas vacías quedan al final en ambas direcciones. |

## Receta de integración

Ejemplo sintético. Adaptá y probá el contrato consumidor antes de integrar:

```js
import { ordenarRegistros } from './src/index.js';
const filas = [{ id: 'a', valor: 10n }, { id: 'b', valor: 2n }, { id: 'c', valor: null }];
const ordenadas = ordenarRegistros(filas, { valor: fila => fila.valor, tipo: 'inteiro', direcao: 'desc' });
// a, b, c; filas conserva su orden original
```

## Detalles del contrato

Usá texto para series e identificadores; nunca quites letras para inferir números. Las fechas ISO validadas se pueden ordenar como texto. Normalizá moneda y declará numero o inteiro. Los errores del selector se propagan; usá funciones puras. Copiar el array no clona sus objetos.

## Contratos TypeScript

El paquete incluye declaraciones .d.ts; el núcleo sigue siendo JavaScript ESM. Los ejemplos de tipos en test-types/consumer.mts se verificaron con un compilador existente, sin agregar dependencias. El CI ejecuta pruebas de ejecución y contenido; no instala un compilador TypeScript.

[Volver al proyecto](README.es-AR.md) · [Compatibilidad](COMPATIBILITY.es-AR.md)
