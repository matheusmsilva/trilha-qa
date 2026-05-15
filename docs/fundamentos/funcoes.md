---
title: Funções
description: Do zero aos padrões usados em automação: declaração, expressão, arrow functions, escopo, closures e visão de código assíncrono em JavaScript.
---

# Funções em JavaScript

Imagine que você escreve a mesma conta ou a mesma checagem em vários lugares do código. **Funções** são um jeito de dar um **nome** a um bloco de instruções, **reutilizar** esse bloco e, quando fizer sentido, **testar** esse pedaço separado do resto. Em automação, isso aparece o tempo todo: helpers, montagem de URLs, validações, passos reutilizáveis entre cenários.

Nesta página você vai ver, em ordem:

1. O que toda função tem (nome, parâmetros, corpo, retorno).
2. **Função declarada** e o que é *hoisting*.
3. **Função expressa** (guardada em variável) e diferença prática em relação à declarada.
4. **Arrow function** (`=>`) e o cuidado com `this`.
5. **Valores padrão** de parâmetros.
6. **Funções de ordem superior** (quem recebe ou retorna outra função) e exemplo com `map`.
7. **Callbacks** e uma ponte para **`async`/`await`** (detalhe na trilha de APIs).
8. **Recursão** (função que chama a si mesma).
9. **Escopo** e **closure** (ideia e exemplo).
10. **Boas práticas** e lembrete de **TDD**.
11. **Resumo** rápido no final.

Se algum termo for novo, não se preocupe: cada seção explica o vocabulário na primeira vez que ele aparece.

---

## Palavras que vamos usar o tempo todo

| Termo | Significado em uma frase |
| ----- | ------------------------- |
| **Declarar** a função | Escrever a função (o “molde”). |
| **Chamar** / **invocar** a função | Usar `nomeDaFuncao()` para rodar o corpo. |
| **Parâmetro** | Nome “de encaixe” na declaração: `function somar(a, b)` → `a` e `b` são parâmetros. |
| **Argumento** | Valor que você passa na chamada: `somar(2, 3)` → `2` e `3` são argumentos. |
| **Retorno** (`return`) | Valor que a função **entrega** para quem chamou. Sem `return`, o resultado é `undefined`. |
| **Corpo** | Tudo que fica entre `{` e `}` (o que roda quando você chama a função). |

:::tip Parâmetro ≠ argumento

- Parâmetro = nome na **definição**.
- Argumento = valor na **chamada**.

Você pode decorar assim: **par**âmetro está na **par**te de cima (assinatura); **arg**umento é o que **arg**umenta (entra) na hora de usar.

:::

---

## O que toda função costuma ter?

Em geral (nem sempre tudo aparece de uma vez, mas o modelo mental é este):

- um **nome** ou outra forma de referência (em funções anônimas, quem “segura” o nome costuma ser uma variável);
- **parâmetros** (opcional): entradas nomeadas na assinatura;
- **corpo**: instruções executadas quando a função é chamada;
- **`return`** (opcional): valor devolvido para quem chamou.

```js
// declarar: nome da função, parênteses com parâmetros, chaves com o corpo
function somar(a, b) {
  return a + b; // retorno
}

// chamar: nome + argumentos
console.log(somar(5, 3)); // 8
```

Aqui, `a` e `b` são **parâmetros**; `5` e `3` são **argumentos**.

---

## Função declarada (`function nome()`)

A forma “clássica” é começar com a palavra-chave `function`, depois o nome, parênteses e chaves:

```js
function saudacao(nome) {
  return `Olá, ${nome}!`;
}

console.log(saudacao("João")); // Olá, João!
```

### *Hoisting* (elevação) — o que é, sem mistério

Em JavaScript, **declarações** `function nome() { ... }` sofrem um efeito chamado ***hoisting*** (“elevação”): o **nome** da função passa a existir para o motor do JavaScript em **todo** o escopo do bloco onde ela foi declarada, **mesmo** que a linha `function ...` apareça mais abaixo no arquivo.

:::note Estilo recomendado

Isso **não** é convite para bagunçar o arquivo: mesmo com *hoisting*, o mais legível é **declarar antes de usar**. Entender o *hoisting* ajuda a ler código legado e mensagens de erro, não a escrever código confuso de propósito.

:::

### Exemplo: validação simples (comum em testes)

```js
function estaNoIntervalo(valor, min, max) {
  return valor >= min && valor <= max;
}

console.log(estaNoIntervalo(7, 1, 10)); // true
console.log(estaNoIntervalo(15, 1, 10)); // false
```

A ideia é: você encapsula a regra (“está entre min e max?”) **uma vez** e chama onde precisar, inclusive dentro de asserts.

---

## Função expressa (atribuída a uma variável)

Aqui a função é tratada como um **valor**: você guarda essa função em `const` ou `let`.

```js
const saudacao = function (nome) {
  return `Olá, ${nome}!`;
};

console.log(saudacao("Maria")); // Olá, Maria!
```

### Diferença importante em relação à declarada

Não há o mesmo *hoisting* “amigável” da forma anterior: **só faz sentido chamar depois** da linha em que `const saudacao = ...` apareceu. Se você tentar usar antes, pode tomar erro de “não pode acessar antes da inicialização” (em `const`/`let`).

### Função expressa **nomeada** (útil em *stacks* de erro)

Você pode dar um nome **interno** à função anônima. Isso melhora mensagens de erro e *stack traces*:

```js
const multiplicar = function fator(a, b) {
  return a * b;
};

console.log(multiplicar(4, 5)); // 20
```

O nome `fator` aparece por dentro; quem você chama do lado de fora continua sendo `multiplicar`.

---

## Arrow functions (`=>`)

É uma sintaxe **mais curta** para escrever funções, muito usada em código moderno — principalmente quando a função é pequena ou quando você passa a função como argumento (`map`, `filter`, `setTimeout`, etc.).

```js
// um parâmetro: parênteses opcionais
const dobro = (n) => n * 2;
console.log(dobro(6)); // 12

// vários parâmetros e corpo com várias linhas: chaves + return explícito
const somar = (a, b) => {
  return a + b;
};
```

### Quando ter cuidado (conceito de `this`)

Arrow functions **não** têm seu próprio `this`: elas **herdam** o `this` do contexto em que foram **criadas** (léxico). Em **classes** ou em alguns *handlers* do DOM, isso pode surpreender se você esperava o `this` “do jeito antigo”.

:::tip Regra prática para iniciante

Se você ainda está se familiarizando com `this`, e o código mistura **objetos**, **classes** e **eventos de página**, prefira a forma `function () {}` onde o `this` importa. Use arrow quando for função “solta”, utilitários, ou callbacks em que você **não** depende de `this`.

:::

---

## Parâmetros e valores padrão

Às vezes um argumento é opcional: você pode definir um **valor padrão** na assinatura. Se quem chama omitir esse argumento, o padrão entra.

```js
function montarUrl(base, path = "") {
  // Se path não vier, vira string vazia
  const limpo = path.startsWith("/") ? path : `/${path}`;
  return `${base.replace(/\/$/, "")}${limpo}`;
}

console.log(montarUrl("https://api.exemplo.com", "users")); // https://api.exemplo.com/users
console.log(montarUrl("https://api.exemplo.com/")); // https://api.exemplo.com
```

---

## Funções de ordem superior

**Definição completa (não omita):** é uma função que **ou** recebe outra função como argumento, **ou** **retorna** uma função (ou as duas coisas). Por isso o nome “ordem superior”: a função opera em cima de outras funções.

Na prática do dia a dia:

- arrays: `map`, `filter`, `reduce` recebem uma função;
- assincronia: muitas APIs recebem *callbacks* ou retornam *Promises* que você encadeia com `.then`.

### Exemplo mínimo: receber uma função

```js
function aplicar(num, operacao) {
  return operacao(num);
}

const resultado = aplicar(10, (n) => n * 2);
console.log(resultado); // 20
```

Aqui, `operacao` é um **parâmetro** cujo valor é **uma função**; ao fazer `operacao(num)`, você está **chamando** a função que veio de fora.

### Exemplo com `map` (listas em testes de API)

```js
const ids = [1, 2, 3];
const urls = ids.map((id) => `https://api.exemplo.com/items/${id}`);
console.log(urls);
// [
//   'https://api.exemplo.com/items/1',
//   'https://api.exemplo.com/items/2',
//   'https://api.exemplo.com/items/3',
// ]
```

O `map` **não inventa** sintaxe nova: ele só espera uma função `elemento => novoValor` e aplica em cada item.

---

## Callbacks e código assíncrono (visão geral)

**Callback** = função que você **passa** para outra função para que ela seja chamada **depois**, quando algo acontecer (tempo, fim de rede, clique, etc.).

```js
function executarDepois(ms, callback) {
  setTimeout(callback, ms);
}

executarDepois(1000, () => {
  console.log("Um segundo depois");
});
```

Em projetos reais de teste e API, o fluxo moderno costuma usar **`async`/`await`** com *Promises* (você verá com calma no módulo de APIs). O ponto desta seção é só **reconhecer o desenho**: “eu passo uma função que será rodada quando X terminar”.

```js
async function buscarStatus(url) {
  const resposta = await fetch(url);
  return resposta.status;
}

// Exemplo conceitual — depende de endpoint real ou mock
// const status = await buscarStatus('https://httpbin.org/status/200');
```

`fetch` retorna uma *Promise*; `await` “pausa” a `async function` até o resultado chegar, sem travar a interface no navegador.

---

## Recursão (ideia básica, mas completa)

**Recursão** é quando a função **chama a si mesma** de propósito, sempre com um caminho que **para** em algum momento (condição de **parada**). Serve bem para estruturas em árvore, divisão de problemas, etc.

```js
function contagemRegressiva(n) {
  if (n <= 0) {
    console.log("Fim!");
    return; // parada
  }
  console.log(n);
  contagemRegressiva(n - 1); // chama de novo com valor menor
}

contagemRegressiva(3);
// 3
// 2
// 1
// Fim!
```

:::note Cuidado com pilha

Cada chamada recursiva ocupa espaço na **pilha** de execução. Recursão sem parada vira estouro de pilha (*stack overflow*). Em automação do cotidiano, muitas vezes um `for` ou um `reduce` resolve com menos “magia” — mas **saber ler** recursão continua importante.

:::

---

## Escopo e *closure* (resumo honesto)

- **Escopo** responde: “em que parte do código essa variável **existe** e pode ser lida?”
- **Closure** (*fechamento*): uma função interna “**lembra**” variáveis da função externa **mesmo depois** que a externa terminou de rodar.

```js
function criarContador() {
  let n = 0; // variável "presa" ao closure
  return () => {
    n += 1;
    return n;
  };
}

const proximo = criarContador();
console.log(proximo()); // 1
console.log(proximo()); // 2
```

Isso ajuda a **encapsular estado** (o `n` não vira global) — padrão útil em libs e em código mais avançado; em testes iniciantes você vê menos, mas aparece em *fixtures* e *factories*.

---

## Boas práticas (especialmente em código de teste)

| Prática | Motivo |
| ------- | ------ |
| Nomes de função como **verbos** (`calcularTotal`, `parsearResposta`) | Quem lê entende **o que acontece** sem abrir o corpo |
| Uma responsabilidade por função | Quando quebra, você sabe **onde** olhar |
| Evitar funções enormes | Quebre em passos com nomes (`montarPayload`, `validarSchema`, …) |
| Preferir `const` para referências a funções | Evita reassinar sem querer |
| Testar a função isoladamente | Ajuda TDD e evita regressão |

---

## Funções e TDD (lembrete)

**TDD** (*Test-Driven Development*) é escrever **antes** um teste que descreve o comportamento desejado da função e só então implementar o **mínimo** para o teste passar. Funções **pequenas** e, quando possível, **puras** (mesma entrada → mesma saída, sem efeitos colaterais desnecessários) são mais fáceis de cobrir com testes unitários e de manter quando o projeto cresce.

---

## Resumo (guarde esta lista)

| Tipo / ideia | O que lembrar |
| ------------ | ------------- |
| **Declarada** `function f() {}` | Nome sofre *hoisting* no escopo; boa para “função nomeada clássica” |
| **Expressa** `const f = function () {}` | Função como valor; ordem de leitura importa |
| **Arrow** `(x) => x` | Curta; cuidado com `this` |
| **Padrão de parâmetro** `path = ""` | Evita `undefined` em argumentos opcionais |
| **Ordem superior** | Recebe ou retorna função; base de `map` e de muito código assíncrono |
| **Callback** | “Me liga quando terminar” |
| **`async`/`await`** | Açúcar sintático em cima de *Promise*; aprofunde na trilha de APIs |
| **Recursão** | Chama a si mesma com **parada** clara |
| **Closure** | Função interna lembra variáveis da externa |

Com isso, você ganha base para organizar helpers de teste, evitar repetição e ler código de frameworks que recebem funções como argumento — e sabe **onde** aprofundar em seguida (APIs assíncronas, DOM, classes).
