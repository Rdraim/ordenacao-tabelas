<p align="right">
  <a href="API.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="API.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="API.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# Referência da API

| API | Entrada | Resultado e erros |
|---|---|---|
| `ordenarRegistros(registros, opcoes)` | Array denso e seletor valor(registro). Tipo texto por padrão; numero requer Number finito; inteiro requer bigint. | Novo array com mesmas referências de registros; TypeError em tipo, direção ou linha ausente. |
| `opcoes.direcao / opcoes.idioma` | asc ou desc; idioma pt-BR por padrão, usado apenas em texto. | Empates mantêm ordem inicial. null, undefined e string vazia ficam no fim nos dois sentidos. |

## Receita de integração

Exemplo sintético. Adapte e teste o contrato do consumidor antes de integrar:

```js
import { ordenarRegistros } from './src/index.js';
const linhas = [{ id: 'a', valor: 10n }, { id: 'b', valor: 2n }, { id: 'c', valor: null }];
const ordenadas = ordenarRegistros(linhas, { valor: linha => linha.valor, tipo: 'inteiro', direcao: 'desc' });
// a, b, c; linhas permanece na ordem original
```

## Detalhes do contrato

Use texto para séries e identificadores; nunca remova letras para tentar inferir número. Datas ISO validadas podem ser ordenadas como texto. Normalize moeda antes e declare numero ou inteiro. O seletor pode lançar e o erro é preservado; use funções puras. A cópia do array não clona os objetos.

## Contratos TypeScript

Declarações .d.ts acompanham o pacote; o núcleo continua JavaScript ESM. Exemplos de tipos em test-types/consumer.mts foram verificados com o compilador já disponível, sem acrescentar dependências. O CI executa testes de runtime e conteúdo; não instala um compilador TypeScript.

[Voltar ao projeto](README.md) · [Compatibilidade](COMPATIBILITY.md)
