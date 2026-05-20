---
title: Arrays
description: "Arrays em JavaScript para automação: listas, índices, métodos comuns, arrays de objetos e validação de dados de API."
---

# Arrays em JavaScript

Listas de cenários, coleções de usuários, itens de um pedido, tags de um teste — em automação, **arrays** aparecem o tempo todo. Um array é uma **lista ordenada** de valores; cada posição tem um **índice** (começando em **0**).

Nesta página você vai ver, em ordem:

1. O que é um array e como criá-lo.
2. Como **acessar** elementos, medir tamanho e percorrer a lista.
3. Um exemplo **completo**, com tipos mistos, arrays aninhados e **array de objetos**.
4. Como **alterar** a lista (adicionar, remover, atualizar).
5. **Métodos comuns** (`map`, `filter`, `find`, `includes`, spread, etc.).
6. **Desestruturação** de arrays.
7. Exemplos aplicados ao contexto de **QA e APIs**.

> **Arrays e objetos juntos:** respostas de API costumam trazer **objetos** com propriedades que são **arrays** (por exemplo `body.itens[]`). Se objetos ainda forem novidade, revise **[Objetos](./objetos.md)** em paralelo.

---

## Palavras que vamos usar

| Termo | Significado em uma frase |
| --- | --- |
| **Array** | Lista ordenada de valores entre colchetes `[ ]`. |
| **Elemento** | Cada item guardado no array. |
| **Índice** | Posição do elemento na lista; o **primeiro** é `0`, não `1`. |
| **`length`** | Propriedade que informa **quantos** elementos o array tem. |
| **Array de objetos** | Lista em que cada elemento é um `{ ... }` — padrão em APIs REST. |
| **Iterar / percorrer** | Visitar cada elemento da lista, um a um (com `for`, `for...of`, `forEach`, etc.). |

---

## Criando um array

### Array literal (forma mais comum)

```js
const tags = ["smoke", "regressao", "api"];
const numeros = [10, 20, 30];
const misto = [1, "texto", true, null];

console.log(tags);   // [ 'smoke', 'regressao', 'api' ]
console.log(misto);  // [ 1, 'texto', true, null ]
```

Um array pode misturar tipos, embora em testes você veja mais **listas uniformes** (só strings, só objetos, etc.).

### Array vazio e com um elemento

```js
const vazio = [];
const unico = ["CT-001"];
```

---

## Acessando elementos

Índices começam em **zero**:

```js
const cenarios = ["login", "logout", "cadastro", "consulta"];

console.log(cenarios[0]); // login  — primeiro
console.log(cenarios[1]); // logout — segundo
console.log(cenarios[3]); // consulta — quarto

console.log(cenarios.length); // 4

// último elemento (índice length - 1)
console.log(cenarios[cenarios.length - 1]); // consulta
```

Índice inexistente retorna `undefined` — sem erro:

```js
console.log(cenarios[99]); // undefined
```

### Acesso aninhado (array dentro de array ou de objeto)

```js
const matriz = [
  [1, 2],
  [3, 4],
];

console.log(matriz[0][1]); // 2

const resposta = {
  itens: [
    { sku: "A1", qtd: 2 },
    { sku: "B2", qtd: 1 },
  ],
};

console.log(resposta.itens[0].sku); // A1
console.log(resposta.itens.length);  // 2
```

---

## Exemplo completo: suite de testes

Array de **objetos**, como em massas de teste ou listagens de API:

```js
const suiteRegressao = [
  {
    id: "CT-101",
    titulo: "Login com credenciais válidas",
    ativo: true,
    tags: ["smoke", "auth"],
    prioridade: 1,
  },
  {
    id: "CT-102",
    titulo: "Login com senha inválida",
    ativo: true,
    tags: ["auth", "negativo"],
    prioridade: 2,
  },
  {
    id: "CT-103",
    titulo: "Consulta de pedido por ID",
    ativo: false,
    tags: ["pedidos", "api"],
    prioridade: 3,
    observacao: null,
  },
];

console.log(suiteRegressao.length);           // 3
console.log(suiteRegressao[0].titulo);        // Login com credenciais válidas
console.log(suiteRegressao[1].tags[0]);       // auth
console.log(suiteRegressao[2].ativo);         // false
```

Cada **elemento** do array é um objeto; você combina **índice do array** + **propriedade do objeto**.

---

## Percorrer um array

### `for...of` (recomendado para iniciantes)

```js
for (const cenario of suiteRegressao) {
  console.log(cenario.id, "-", cenario.titulo);
}
```

### `forEach`

```js
suiteRegressao.forEach((cenario) => {
  console.log(cenario.id);
});
```

### `for` clássico com índice

```js
for (let i = 0; i < suiteRegressao.length; i++) {
  console.log(i, suiteRegressao[i].id);
}
```

Mais detalhes sobre loops em **[Estruturas de repetição](./estruturas-de-repeticao.md)**.

---

## Alterando arrays

Arrays em `const` **podem ser modificados** — o que `const` impede é trocar a referência da variável para outro array.

```js
const ids = ["CT-001", "CT-002"];

// atualizar por índice
ids[1] = "CT-002-revisado";

// adicionar no final
ids.push("CT-003");

// remover do final
const removido = ids.pop();

// adicionar no início
ids.unshift("CT-000");

// remover do início
ids.shift();

console.log(ids);
```

| Método | O que faz |
| --- | --- |
| `push(item)` | Adiciona no **final** |
| `pop()` | Remove do **final** e devolve o item |
| `unshift(item)` | Adiciona no **início** |
| `shift()` | Remove do **início** e devolve o item |

### `splice` — remover ou inserir no meio

```js
const tags = ["smoke", "api", "web", "lento"];

tags.splice(2, 1); // a partir do índice 2, remove 1 elemento
console.log(tags); // [ 'smoke', 'api', 'lento' ]

tags.splice(1, 0, "regressao"); // índice 1, remove 0, insere "regressao"
console.log(tags); // [ 'smoke', 'regressao', 'api', 'lento' ]
```

---

## Métodos comuns (o dia a dia em automação)

### `includes` — a lista contém o valor?

```js
const tags = ["smoke", "api"];

console.log(tags.includes("smoke")); // true
console.log(tags.includes("web"));   // false
```

### `indexOf` — em qual índice está?

```js
console.log(tags.indexOf("api"));  // 1
console.log(tags.indexOf("web"));  // -1 (não encontrado)
```

### `find` — primeiro elemento que atende uma condição

```js
const cenario = suiteRegressao.find((item) => item.id === "CT-102");

console.log(cenario.titulo); // Login com senha inválida
```

Se nada corresponder, retorna `undefined`.

### `findIndex` — índice do primeiro que atende

```js
const indice = suiteRegressao.findIndex((item) => item.id === "CT-103");
console.log(indice); // 2
```

### `filter` — nova lista só com os que passam no filtro

```js
const ativos = suiteRegressao.filter((item) => item.ativo === true);

console.log(ativos.length); // 2
console.log(ativos.map((c) => c.id)); // [ 'CT-101', 'CT-102' ]
```

`filter` **não altera** o array original — devolve um **novo** array.

### `map` — transformar cada elemento

```js
const titulos = suiteRegressao.map((item) => item.titulo);

console.log(titulos);
// [
//   'Login com credenciais válidas',
//   'Login com senha inválida',
//   'Consulta de pedido por ID'
// ]
```

Útil para extrair uma coluna (IDs, SKUs, e-mails) de uma lista de objetos.

### `some` e `every` — validações em lote

```js
const existeInativo = suiteRegressao.some((item) => item.ativo === false);
console.log(existeInativo); // true

const todosTemId = suiteRegressao.every((item) => item.id.startsWith("CT-"));
console.log(todosTemId); // true
```

- **`some`:** pelo menos **um** passa? (equivalente a um OR entre elementos)
- **`every`:** **todos** passam? (equivalente a um AND entre elementos)

### `reduce` — acumular um resultado

```js
const prioridades = [1, 2, 3];
const soma = prioridades.reduce((acumulador, valor) => acumulador + valor, 0);

console.log(soma); // 6
```

Menos frequente no início, mas aparece ao somar totais ou agrupar dados.

### `slice` — copiar um pedaço (sem alterar o original)

```js
const letras = ["a", "b", "c", "d", "e"];
const pedaco = letras.slice(1, 4); // índice 1 inclusive até 4 exclusive

console.log(pedaco);  // [ 'b', 'c', 'd' ]
console.log(letras);  // original intacto
```

> **Não confunda:** `slice` **copia**; `splice` **altera** o array original.

### `concat` e spread — juntar listas

```js
const parteA = ["smoke", "api"];
const parteB = ["web"];

const juntado = parteA.concat(parteB);
const comSpread = [...parteA, ...parteB, "regressao"];

console.log(juntado);    // [ 'smoke', 'api', 'web' ]
console.log(comSpread);  // [ 'smoke', 'api', 'web', 'regressao' ]
```

### `join` — array → string

```js
const tags = ["smoke", "api", "web"];
console.log(tags.join(", ")); // smoke, api, web
```

Bom para montar mensagens de log ou query strings simples.

### `sort` — ordenar (cuidado com números)

```js
const nomes = ["Carlos", "Ana", "Bruno"];
nomes.sort();
console.log(nomes); // [ 'Ana', 'Bruno', 'Carlos' ]

const numeros = [10, 2, 30];
numeros.sort(); // ordenação lexicográfica por padrão!
console.log(numeros); // [ 10, 2, 30 ] — pode surpreender

numeros.sort((a, b) => a - b);
console.log(numeros); // [ 2, 10, 30 ]
```

Para números, passe função de comparação.

---

## Desestruturação de arrays

Assim como em objetos, você pode **extrair posições** de uma vez:

```js
const statusCodes = [200, 404, 500];

const [primeiro, segundo] = statusCodes;
console.log(primeiro, segundo); // 200 404

// pular posições
const [, , terceiro] = statusCodes;
console.log(terceiro); // 500
```

Com valor padrão:

```js
const [a, b, c = 0] = [1];
console.log(a, b, c); // 1 undefined 0
```

Resto com spread:

```js
const [head, ...tail] = [10, 20, 30, 40];
console.log(head); // 10
console.log(tail); // [ 20, 30, 40 ]
```

Desestruturação aninhada (menos comum, mas aparece em tuplas de retorno):

```js
const pares = [
  ["CT-101", "ok"],
  ["CT-102", "falhou"],
];

const [[id1, res1], [id2, res2]] = pares;
console.log(id1, res1, id2, res2); // CT-101 ok CT-102 falhou
```

---

## Exemplo prático: validar lista de itens de API

```js
const respostaPedido = {
  statusCode: 200,
  body: {
    pedidoId: 9001,
    itens: [
      { sku: "PROD-A", quantidade: 2, preco: 49.9 },
      { sku: "PROD-B", quantidade: 1, preco: 120.0 },
      { sku: "PROD-C", quantidade: 5, preco: 9.5 },
    ],
  },
};

const { itens } = respostaPedido.body;

const qtdItens = itens.length;
const skus = itens.map((item) => item.sku);
const temProdB = itens.some((item) => item.sku === "PROD-B");
const todosComQuantidade = itens.every((item) => item.quantidade > 0);
const itemMaisCaro = itens.reduce((maior, atual) =>
  atual.preco > maior.preco ? atual : maior
);

console.log(qtdItens);              // 3
console.log(skus);                  // [ 'PROD-A', 'PROD-B', 'PROD-C' ]
console.log(temProdB);              // true
console.log(todosComQuantidade);    // true
console.log(itemMaisCaro.sku);      // PROD-B
```

Checklist mental:

- use **`length`** para quantidade;
- use **`map`** para extrair um campo de todos;
- use **`find` / `some` / `every`** para regras de negócio;
- lembre que **`itens[0]`** é o primeiro, não o segundo.

---

## Array-like vs array de verdade

Às vezes APIs ou bibliotecas devolvem objetos parecidos com lista. Para garantir métodos como `map` e `filter`, converta:

```js
const pseudo = { 0: "a", 1: "b", length: 2 };
const arr = Array.from(pseudo);
console.log(arr.map((x) => x.toUpperCase())); // [ 'A', 'B' ]
```

Na trilha de APIs, a maioria dos JSON já vem como array nativo após `JSON.parse`.

---

## Boas práticas em automação

| Prática | Motivo |
| --- | --- |
| Preferir **`for...of`** ou **`forEach`** quando não precisa do índice | Código mais legível que `for (let i = 0; ...)`. |
| Usar **`filter` / `map`** em vez de mutar o array original | Evita efeito colateral entre testes. |
| Validar **`length`** antes de acessar `[0]` | Lista vazia é cenário comum em APIs. |
| Nomear no plural (`cenarios`, `itens`, `usuarios`) | Deixa claro que a variável é uma lista. |
| Combinar array + objeto com calma (`lista[i].campo`) | Erros de índice e de propriedade se confundem — logue `JSON.stringify` em falhas. |

---

## Resumo

| Operação | Sintaxe / método |
| --- | --- |
| Criar | `const arr = [1, 2, 3]` |
| Acessar | `arr[0]`, `arr[arr.length - 1]` |
| Tamanho | `arr.length` |
| Adicionar / remover | `push`, `pop`, `unshift`, `shift`, `splice` |
| Contém valor? | `arr.includes(valor)` |
| Buscar elemento | `arr.find(fn)`, `arr.findIndex(fn)` |
| Filtrar | `arr.filter(fn)` |
| Transformar | `arr.map(fn)` |
| Todos / algum | `arr.every(fn)`, `arr.some(fn)` |
| Copiar pedaço | `arr.slice(inicio, fim)` |
| Juntar | `[...a, ...b]`, `a.concat(b)` |
| Array → string | `arr.join(separador)` |
| Desestruturar | `const [a, b] = arr` |

---

## Prática

Crie o arquivo **`fundamentos/arrays.js`** na sua pasta de exercícios (veja **[Repositório e estrutura de pastas](../ambiente-automacao/repositorio-e-estrutura.md)**) e pratique:

1. Montar um **array de objetos** simulando cenários de teste.
2. Acessar o terceiro elemento e uma propriedade aninhada.
3. Filtrar só cenários `ativo: true` com `filter`.
4. Extrair todos os IDs com `map`.
5. Verificar se existe cenário com tag `"smoke"` usando `some`.

Arrays e objetos são os formatos mais comuns em **JSON** — juntos, eles cobrem a maior parte das massas e respostas que você vai validar na trilha de **Automação de APIs**.
