---
title: Estruturas condicionais
description: Condicionais
---

# Estruturas Condicionais

## Objetivo

As estruturas condicionais permitem que o programa tome decisões com base em determinadas condições.

## O que é o `if`

O `if` significa **se**

Ele executa um bloco de código apenas quando a condição informada for verdadeira.

## Estrutura básica do IF

```js
if (condicao) {
  // código executado se a condição for verdadeira
}
```

## Primeiro exemplo

```js
let statusCode = 200;

if (statusCode === 200) {
  console.log("Requisição realizada com sucesso");
}
```

## Entendendo o exemplo

### Passo 1

Criamos uma variável:

```js
let statusCode = 200;
```

### Passo 2

O `if` verifica a condição:

```js
statusCode === 200;
```

### Passo 3

Se a condição for verdadeira:

```js
console.log("Requisição realizada com sucesso");
```

será executado.

## Fluxo visual do IF

```text
Se statusCode for igual a 200
    mostrar mensagem de sucesso
```

## Comparação vs atribuição

Esse é um dos erros mais comuns para quem está começando.

### Atribuição (`=`)

Utilizado para guardar um valor em uma variável. Apenas UM sinal de igualdade.

```js
let idade = 18;
```

### Comparação (`===`)

Utilizado para comparar valores. Mais de um sinal de igualdade.

Quando dois sinais de igualdade são utilizados, apenas o valor em si é comparado.

Quando três sinais de igualdade são utilizados, o valor e o tipo de dado são comparados.

Então

```js
idade === 18; // compara se idade é um numero e possui o valor 18
idade == 18; // compara se idade possui o valor 18

// caso idade fosse definido como string, a primeira validação retornaria falso. Exemplo:

idade = "18";

idade === 18; // resultado -> falso
idade == 18; // resultado -> verdadeiro
```

### Exemplo de erro comum

❌ Errado:

```js
if (statusCode = 200)
```

✅ Correto:

```js
if (statusCode === 200)
```

## IF e ELSE

O `else` significa **senão**

Ele será executado quando a condição do `if` for falsa.

### Exemplo

```js
let loginRealizado = false;

if (loginRealizado === true) {
  console.log("Usuário autenticado");
} else {
  console.log("Usuário não autenticado");
}
```

### Fluxo visual

```text
Se login realizado for verdadeiro
    usuário autenticado
Senão
    usuário não autenticado
```

## ELSE IF

O `else if` permite criar múltiplas verificações.

Muito útil quando existem vários resultados possíveis.

### Exemplo com status code

```js
let statusCode = 404;

if (statusCode === 200) {
  console.log("Sucesso");
} else if (statusCode === 404) {
  console.log("Recurso não encontrado");
} else if (statusCode === 500) {
  console.log("Erro interno do servidor");
} else {
  console.log("Erro inesperado");
}
```

### Fluxo visual

```text
Se statusCode for 200
    sucesso

Senão se for 404
    recurso não encontrado

Senão se for 500
    erro interno

Senão
    erro inesperado
```

## Operadores relacionais

Os operadores relacionais são usados para comparar valores.

| Operador | Significado    |
| -------- | -------------- |
| `===`    | igual          |
| `!==`    | diferente      |
| `>`      | maior que      |
| `<`      | menor que      |
| `>=`     | maior ou igual |
| `<=`     | menor ou igual |

### Exemplos de operadores relacionais

#### Maior que

```js
let responseTime = 450;

if (responseTime > 300) {
  console.log("Sistema lento");
}
```

#### Diferente

```js
let ambiente = "staging";

if (ambiente !== "production") {
  console.log("Executando ambiente não produtivo");
}
```

## Operadores lógicos

Os operadores lógicos permitem combinar condições.

### Operador AND (`&&`)

Significa:

> “e”

As duas condições precisam ser verdadeiras.

#### Exemplo

```js
let usuarioAtivo = true;
let senhaCorreta = true;

if (usuarioAtivo && senhaCorreta) {
  console.log("Login realizado");
}
```

#### Fluxo visual

```text
Se usuário estiver ativo
E senha estiver correta
    login realizado
```

### Operador OR (`||`)

Significa:

> “ou”

Pelo menos uma condição precisa ser verdadeira.

#### Exemplo

```js
let usuarioAdmin = false;
let usuarioQA = true;

if (usuarioAdmin || usuarioQA) {
  console.log("Acesso permitido");
}
```

### Operador NOT (`!`)

Significa:

> “negação”

Ele inverte o valor booleano.

#### Exemplo

```js
let sistemaIndisponivel = false;

if (!sistemaIndisponivel) {
  console.log("Sistema disponível");
}
```

---

## IF Aninhado

Também é possível ter um `if` dentro de outro `if`.

Isso é chamado de:

> IF aninhado

### Exemplo

```js
let usuarioLogado = true;
let usuarioAdmin = true;

if (usuarioLogado) {
  if (usuarioAdmin) {
    console.log("Acesso administrativo liberado");
  }
}
```

### Explicação

Nesse caso:

1. o sistema verifica se o usuário está logado
2. depois verifica se ele é administrador
3. somente então libera o acesso

### Quando evitar muitos IFs aninhados

Embora seja possível criar vários níveis de `if`, excesso de aninhamento pode dificultar a leitura do código.

❌ Exemplo ruim:

```js
if (condicao1) {
  if (condicao2) {
    if (condicao3) {
      if (condicao4) {
      }
    }
  }
}
```

Com o tempo aprenderemos maneiras melhores de organizar esse tipo de lógica.

## Operador Ternário

O operador ternário é uma forma reduzida de escrever um `if/else`.

### Sintaxe

```js
condicao ? valorSeVerdadeiro : valorSeFalso;
```

### Exemplo tradicional

```js
let usuarioAtivo = true;

if (usuarioAtivo) {
  console.log("Usuário ativo");
} else {
  console.log("Usuário inativo");
}
```

### Mesmo exemplo usando ternário

```js
let usuarioAtivo = true;

usuarioAtivo ? console.log("Usuário ativo") : console.log("Usuário inativo");
```

### Quando usar ternário

O ternário é útil para condições simples e curtas.

✅ Bom uso:

```js
let status = idade >= 18 ? "Maior de idade" : "Menor de idade";
```

### Quando evitar ternário

Evite ternários muito grandes ou difíceis de ler.

❌ Exemplo ruim:

```js
condicao1 ? valor1 : condicao2 ? valor2 : condicao3 ? valor3 : valor4;
```

Legibilidade é muito importante em automação.

## Exemplo aplicados ao contexto de QA

### Validando ambiente

```js
let ambiente = "production";

if (ambiente === "production") {
  console.log("Executando smoke tests");
} else {
  console.log("Executando testes completos");
}
```

## Boas práticas

### Evite condições desnecessárias

❌ Desnecessário:

```js
if (usuarioAtivo === true)
```

✅ Melhor:

```js
if (usuarioAtivo)
```

### Use indentação correta

Código organizado facilita leitura e manutenção.

✅ Exemplo:

```js
if (statusCode === 200) {
  console.log("Sucesso");
}
```

## Exercícios sugeridos

### Exercício 1

Crie uma condição para verificar se um usuário é maior de idade.

### Exercício 2

Crie uma condição para verificar os seguintes status code:

- status 200
- status 404
- status 500

### Exercício 3

Crie uma condição que permita login apenas se:

- usuário estiver ativo
- senha estiver correta

---

## Conclusão

As estruturas condicionais são fundamentais para programação e automação de testes.

Com elas conseguimos:

- validar comportamentos
- tomar decisões
- criar regras
- automatizar fluxos
- testar cenários diferentes

Esses conceitos serão utilizados constantemente durante toda a trilha de automação.
