---
title: Estruturas de repetição
description: Estruturas de repetição
---

## Objetivo

As estruturas de repetição permitem executar um bloco de código várias vezes automaticamente.

Elas são extremamente utilizadas em automação de testes, principalmente quando precisamos:

- percorrer listas
- validar múltiplos dados
- executar ações repetitivas
- trabalhar com massa de testes
- automatizar cenários em lote

## O que são loops

Loops são estruturas utilizadas quando precisamos repetir alguma ação.

Ao invés de escrever o mesmo código várias vezes:

❌ Exemplo ruim:

```js id="cgf2xg"
console.log("Executando teste");
console.log("Executando teste");
console.log("Executando teste");
console.log("Executando teste");
```

Podemos utilizar uma estrutura de repetição.

✅ Exemplo melhor:

```js id="l9qvpi"
for (let i = 0; i < 4; i++) {
  console.log("Executando teste");
}
```

## Estrutura FOR

O `for` é uma das estruturas de repetição mais utilizadas.

Ele é muito útil quando sabemos quantas vezes queremos repetir algo.

## Estrutura básica do FOR

```js id="vagw4t"
for (inicializacao; condicao; incremento) {
  // código executado
}
```

## Entendendo a estrutura

### Inicialização

Define o valor inicial da repetição.

```js id="tpgj7o"
let i = 0;
```

### Condição

Enquanto a condição for verdadeira, o loop continua executando.

```js id="md4w0e"
i < 5;
```

### Incremento

Executado ao final de cada repetição.

```js id="u0vgg6"
i++;
```

O `++` significa:

> adicionar 1

## Primeiro exemplo com FOR

```js id="qrfjqv"
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

## Resultado esperado

```text id="m8d9lw"
0
1
2
3
4
```

## Fluxo visual do FOR

```text id="k7dkt1"
Começa em 0

Enquanto for menor que 5:
    exibe valor
    adiciona +1
```

## Explicando passo a passo

### Primeira execução

```js id="g6r4x2"
let i = 0;
```

A condição:

```js id="85xg5d"
i < 5;
```

é verdadeira.

Então o código executa:

```js id="1c8x2v"
console.log(i);
```

Resultado:

```text id="5eb8gb"
0
```

Depois:

```js id="74mjlwm"
i++;
```

Agora:

```js id="65hs31"
i = 1;
```

O processo continua até que a condição seja falsa.

## Exemplo aplicado ao contexto de QA

### Executando múltiplos testes

Supondo que você tenha um teste de permissão, para todos os usuários as ações são as mesmas, o que muda será o usuario e senha.

Então poderíamos ter uma lista de objetos com as propriedades para cada usuário.

```js id="70m77d"
const usuarios = [
  { nome: "admin", senha: "senha123" },
  { nome: "gestor", senha: "senha123" },
  { nome: "liderado", senha: "senha123" },
];

for (let teste = 0; teste < usuarios.length; teste++) {
  console.log(`preenchendo login para o usuário ${usuarios[teste].nome}`);
}
```

## Resultado esperado

```text id="9ks2fi"
preenchendo login para o usuário admin
preenchendo login para o usuário gestor
preenchendo login para o usuário liderado
```

## Trabalhando com Arrays

Estruturas de repetição são muito utilizadas para percorrer listas.

## Exemplo de array

```js id="65oq6p"
let usuarios = ["Ana", "Carlos", "Maria"];
```

## Percorrendo array com FOR

```js id="rzfndj"
let usuarios = ["Ana", "Carlos", "Maria"];

for (let i = 0; i < usuarios.length; i++) {
  console.log(usuarios[i]);
}
```

## Explicando o `.length`

O `.length` retorna a quantidade de itens do array.

```js id="1qt39k"
usuarios.length;
```

Resultado:

```text id="1a4kq7"
3
```

## Acessando posições do array

```js id="jlwmcf"
usuarios[0]; // Ana
usuarios[1]; // Carlos
usuarios[2]; // Maria
```

## Fluxo visual

```text id="i87ck4"
Posição 0 -> Ana
Posição 1 -> Carlos
Posição 2 -> Maria
```

## FOR OF

O `for...of` é uma forma moderna e muito utilizada para percorrer arrays.

Ele é mais simples e legível do que o `for` tradicional quando precisamos apenas acessar os valores da lista.

### Estrutura básica do FOR OF

```js id="p7ptd3"
for (const item of array) {
  // código executado para cada item
}
```

### Primeiro exemplo

```js id="r7h8f1"
const usuarios = ["Ana", "Carlos", "Maria"];

for (const usuario of usuarios) {
  console.log(usuario);
}
```

### Resultado esperado

```text id="azpjw7"
Ana
Carlos
Maria
```

### Exemplo aplicado ao contexto de QA

```js id="yc7uvn"
const ambientes = ["dev", "staging", "production"];

for (const ambiente of ambientes) {
  console.log(`Executando testes no ambiente ${ambiente}`);
}
```

## FOR EACH

O `forEach` é uma forma mais moderna e simples de percorrer arrays.

Ele é muito utilizado em automação porque deixa o código mais legível.

## Estrutura básica do forEach

```js id="s2h2eu"
array.forEach((item) => {
  // código executado para cada item
});
```

## Primeiro exemplo com forEach

```js id="5s4b72"
let usuarios = ["Ana", "Carlos", "Maria"];

usuarios.forEach((usuario) => {
  console.log(usuario);
});
```

## Resultado esperado

```text id="v8lbh0"
Ana
Carlos
Maria
```

## Explicando o forEach

Para cada item do array:

```js id="2rqw2p"
usuarios.forEach((usuario) => {
```

o valor atual será armazenado na variável:

```js id="r9eqje"
usuario;
```

## Comparando FOR vs forEach

### FOR tradicional

```js id="1kcbza"
for (let i = 0; i < usuarios.length; i++) {
  console.log(usuarios[i]);
}
```

### forEach

```js id="e7d1ua"
usuarios.forEach((usuario) => {
  console.log(usuario);
});
```

## Qual usar?

### FOR

Mais flexível.

Muito útil quando:

- precisamos controlar índice
- queremos interromper execução
- precisamos de lógica mais complexa

### forEach

Mais limpo e legível.

Muito útil quando:

- apenas queremos percorrer uma lista
- precisamos executar ações simples
- queremos código mais organizado

### Exemplo com objetos

```js id="rvzkbq"
let usuarios = [
  { nome: "Ana", ativo: true },
  { nome: "Carlos", ativo: false },
  { nome: "Maria", ativo: true },
];

usuarios.forEach((usuario) => {
  if (usuario.ativo) {
    console.log(`${usuario.nome} está ativo`);
  }
});
```

## WHILE

O `while` executa um bloco de código enquanto uma condição for verdadeira.

## Estrutura básica do WHILE

```js id="9fyvv0"
while (condicao) {
  // código executado
}
```

## Primeiro exemplo

```js id="hvt0hc"
let contador = 0;

while (contador < 3) {
  console.log(contador);

  contador++;
}
```

## Resultado esperado

```text id="6mggjn"
0
1
2
```

## Fluxo visual

```text id="trv93x"
Enquanto contador for menor que 3:
    exibe contador
    adiciona +1
```

## Atenção com loops infinitos

Um erro muito comum é esquecer de alterar a variável de controle.

❌ Exemplo perigoso:

```js id="p4tw9n"
let contador = 0;

while (contador < 3) {
  console.log(contador);
}
```

Nesse caso o loop nunca termina.

## Boas práticas

### Evite loops desnecessários

Nem todo problema precisa de repetição.

### Mantenha o código legível

Loops muito grandes dificultam manutenção.

## Exercícios sugeridos

### Exercício 1

Crie um `for` que exiba números de 1 até 10.

### Exercício 2

Crie um array com nomes de usuários e percorra utilizando `forEach`.

### Exercício 3

Crie um loop que exiba apenas números pares de 0 até 20.

### Exercício 4

Crie um array com status code e exiba cada um utilizando `forEach`.

## Conclusão

As estruturas de repetição são fundamentais para automação de testes.

Com elas conseguimos:

- automatizar tarefas repetitivas
- trabalhar com listas
- validar múltiplos dados
- executar cenários em lote
- criar automações mais inteligentes

Esses conceitos serão utilizados constantemente em automação Web, APIs e frameworks de testes.
