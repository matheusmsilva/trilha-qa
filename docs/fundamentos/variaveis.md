---
title: Variáveis
description: Tipos de dados, atribuição e escopo básico.
---

# Variáveis em JavaScript

## O que são variáveis?

Variáveis são espaços utilizados para armazenar informações que poderão ser utilizadas ao longo do código.

É como se você tivesse uma caixa onde pode guardar um valor e dar um nome para essa caixa, para que possa acessar o valor posteriormente.

As variáveis podem armazenar diferentes tipos de dados, como:

- números
- textos
- booleanos (`true` ou `false`)
- listas
- objetos

---

## Como criar variáveis em JavaScript

Em JavaScript, para criar uma variável, utilizamos as palavras-chave:

- `let`
- `const`

---

### Diferença entre `let` e `const`

### `let`

Utilizado para declarar variáveis que podem ter seu valor alterado posteriormente.

### Exemplo

```javascript id="d5m7f0"
let idade = 30;

idade = 31; // Isso é permitido
```

---

### `const`

Utilizado para declarar variáveis que não podem ter seu valor alterado depois de serem atribuídas.

### Exemplo

```javascript id="uv63zf"
const pi = 3.14;
```

---

## Regras para definição do nome de uma variável

- O nome deve começar com:
  - uma letra
  - um cifrão (`$`)
  - ou um sublinhado (`_`)

- O nome pode conter:
  - letras
  - números
  - cifrões
  - sublinhados

- O nome não pode conter espaços

- O nome não pode ser uma palavra reservada do JavaScript, como:
  - `var`
  - `let`
  - `const`
  - `if`
  - `else`

- O JavaScript diferencia letras maiúsculas e minúsculas

### Exemplo

```javascript id="dl2g4o"
let nome = "João";
let Nome = "Maria";
```

As variáveis acima são diferentes.

---

## Tipos de dados em JavaScript

### String

Representa textos.

```javascript id="xt4f4x"
let nome = "João";
let mensagem = "Bem-vindo ao sistema";
```

---

### Number

Representa números inteiros ou decimais.

```javascript id="c6e0k3"
let idade = 30;
let altura = 1.75;
let saldo = 2500.5;
```

---

### Boolean

Representa verdadeiro ou falso.

```javascript id="m8egso"
let usuarioLogado = true;
let pagamentoPendente = false;
```

---

### Array

Representa listas de valores.

```javascript id="w3vjlwm"
let frutas = ["maçã", "banana", "uva"];
let numeros = [1, 2, 3, 4];
```

---

### Object

Representa objetos com propriedades.

```javascript id="91d4lg"
let usuario = {
  nome: "Ana",
  idade: 25,
  ativo: true,
};
```

---

### Undefined

Representa uma variável sem valor definido.

```javascript id="9j5kzk"
let endereco;

console.log(endereco);
```

---

### Null

Representa ausência intencional de valor.

```javascript id="5n7n1u"
let telefone = null;
```

---

## Como descobrir o tipo de dado

Podemos utilizar o operador `typeof`.

### Exemplo

```javascript id="d6zwf6"
let nome = "Carlos";

console.log(typeof nome);
```

### Resultado

```text id="9c11qk"
string
```

---

## Exemplos de variáveis

- nome de usuário
- idade
- saldo
- status de login
- lista de produtos

---

## Exemplo prático

```javascript id="hpnuxx"
const nome = "João";
let idade = 30;
let altura = 1.75;
let isStudent = true;

console.log("Nome: " + nome);
console.log("Idade: " + idade);
console.log("Altura: " + altura);
console.log("É estudante? " + isStudent);
```

---

## Resultado esperado

```text id="xzxj6p"
Nome: João
Idade: 30
Altura: 1.75
É estudante? true
```

---

## Tipos de dados utilizados no exemplo

| Variável  | Tipo    |
| --------- | ------- |
| nome      | String  |
| idade     | Number  |
| altura    | Number  |
| isStudent | Boolean |

---

## Boas práticas

✅ Utilize nomes claros e objetivos

```javascript id="0j8i8f"
let nomeUsuario;
let quantidadeProdutos;
```

❌ Evite nomes genéricos

```javascript id="4uwx9w"
let x;
let teste;
```

---

## Conclusão

Variáveis são fundamentais em qualquer linguagem de programação.

Elas permitem:

- armazenar informações
- reutilizar valores
- organizar o código
- criar lógica para automações e aplicações
