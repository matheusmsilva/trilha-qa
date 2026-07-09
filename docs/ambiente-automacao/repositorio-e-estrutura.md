---
title: Repositório e estrutura de pastas
description: Como organizar pastas e arquivos de prática durante a trilha.
---

# Repositório e estrutura de pastas

Ao longo da trilha você vai escrever muitos trechos de código — exercícios guiados, tentativas, desafios. Sem uma organização mínima, arquivos se perdem, nomes ficam confusos e fica difícil revisar o que já praticou.

Nesta página você vai aprender a **criar uma pasta de exercícios** e manter **um arquivo por tópico**, com os exercícios separados por **comentários** dentro do mesmo arquivo.

> **Pré-requisito:** saber rodar arquivos `.js` com `node`. Se ainda não praticou, veja **[Executar arquivos JavaScript](./executar-javascript.md)**.

---

## Onde guardar seus exercícios

Crie uma pasta dedicada só aos seus estudos — pode ser em qualquer lugar da máquina, por exemplo:

```text
C:\Users\SeuUsuario\Documentos\trilha-qa-exercicios
```

Dentro dela, organize **subpastas por módulo** da trilha. Comece pela pasta **`fundamentos`**, referente ao bloco **Fundamentos e lógica de programação**.

Estrutura sugerida:

```text
trilha-qa-exercicios/
├── fundamentos/
│   ├── algoritmos.js
│   ├── variaveis.js
│   ├── estruturas-condicionais.js
│   ├── estruturas-de-repeticao.js
│   ├── funcoes.js
│   ├── objetos.js
│   └── arrays.js
```

Conforme avançar para outros módulos (Testes de API, Web, etc.), crie pastas no mesmo padrão — por exemplo `automacao-apis/` — com arquivos alinhados aos tópicos estudados.

---

## Regras simples de organização

| Regra | Por quê |
| --- | --- |
| **Uma pasta por módulo** | Separa fundamentos, APIs, Web e evita misturar conceitos diferentes. |
| **Um arquivo por tópico** | Facilita encontrar o que praticou em condicionais, loops, funções, etc. |
| **Nome do arquivo = nome do tópico** | Use kebab-case: `estruturas-condicionais.js`, `estruturas-de-repeticao.js`. |
| **Exercícios separados por comentários** | Vários exercícios no mesmo arquivo, cada um identificado por um bloco de comentário. |
| **Salvar e rodar com `node`** | Valida o código na hora; o fluxo é editar → salvar → `node caminho/arquivo.js`. |

Não é obrigatório criar todos os arquivos de uma vez. Crie cada `.js` **quando começar o tópico** correspondente na documentação.

---

## Passo a passo — criar a pasta de fundamentos

### 1. Criar a pasta raiz

No VS Code:

1. **File → Open Folder** e escolha onde quer guardar os exercícios (ou crie uma pasta nova pelo Explorer do Windows).
2. Com a pasta aberta, clique com o botão direito no explorador de arquivos → **New Folder**.
3. Nomeie como **`fundamentos`**.

Pelo terminal (opcional):

```bash
mkdir C:\Users\SeuUsuario\Documentos\trilha-qa-exercicios\fundamentos
```

### 2. Criar o arquivo do tópico

Dentro de **`fundamentos`**, crie um arquivo para o tópico que estiver estudando — por exemplo **`estruturas-condicionais.js`**.

### 3. Organizar exercícios com comentários

Use blocos de comentário para separar cada exercício. Padrão recomendado:

```js
// ---------------------------------------------
// Exercício 1 — Título curto do exercício
// Objetivo: o que você está praticando
// ---------------------------------------------

// seu código aqui
```

Assim fica fácil localizar, comentar trechos durante a aula e adicionar novos exercícios no **final** do arquivo sem apagar os anteriores.

---

## Exemplo completo: `estruturas-condicionais.js`

Este repositório inclui um modelo de referência em **`exemplos/fundamentos/estruturas-condicionais.js`**. Você pode copiar a estrutura para a sua pasta `fundamentos/` ou usar como inspiração.

Conteúdo resumido:

```js
// =============================================
// Estruturas condicionais — exercícios de prática
// Trilha QA Automação
// =============================================

console.log("=== Início dos exercícios: estruturas condicionais ===\n");

// ---------------------------------------------
// Exercício 1 — Validar status code de sucesso
// Objetivo: usar if para checar se a resposta foi 200
// ---------------------------------------------

const statusCodeEx1 = 200;

if (statusCodeEx1 === 200) {
  console.log("Exercício 1: Requisição realizada com sucesso");
}

// ---------------------------------------------
// Exercício 2 — Diferenciar sucesso de erro
// Objetivo: usar if / else com base no status code
// ---------------------------------------------

const statusCodeEx2 = 404;

if (statusCodeEx2 === 200) {
  console.log("Exercício 2: Resposta OK");
} else {
  console.log("Exercício 2: Resposta com erro — status:", statusCodeEx2);
}

// ... demais exercícios no mesmo arquivo ...
```

Observe que:

- o **cabeçalho** no topo identifica o arquivo e o módulo;
- cada **exercício** tem número, título e objetivo;
- variáveis de exercícios diferentes usam sufixos (`Ex1`, `Ex2`) para não sobrescrever valores;
- `console.log` no início e no fim ajuda a ver no terminal onde começa e termina a execução.

---

## Como rodar o arquivo de exercícios

Com o terminal aberto na pasta **`trilha-qa-exercicios`** (raiz dos seus estudos):

```bash
node fundamentos/estruturas-condicionais.js
```

Se clonou este repositório e quer testar o exemplo de referência na raiz do projeto:

```bash
node exemplos/fundamentos/estruturas-condicionais.js
```

Saída esperada (trecho):

```text
=== Início dos exercícios: estruturas condicionais ===

Exercício 1: Requisição realizada com sucesso
Exercício 2: Resposta com erro — status: 404
Exercício 3: Erro do servidor (5xx)
Exercício 4: Cenário aprovado — usuário pode acessar o sistema

=== Fim dos exercícios: estruturas condicionais ===
```

---

## Mapa: tópico da trilha → arquivo

Use esta tabela ao estudar **Fundamentos e lógica de programação**:

| Tópico na documentação | Arquivo sugerido em `fundamentos/` |
| --- | --- |
| Algoritmos | `algoritmos.js` |
| Variáveis | `variaveis.js` |
| Estruturas condicionais | `estruturas-condicionais.js` |
| Estruturas de repetição | `estruturas-de-repeticao.js` |
| Funções | `funcoes.js` |
| Objetos | `objetos.js` |
| Arrays | `arrays.js` |

Cada vez que concluir exercícios de um tópico, abra (ou crie) o arquivo correspondente e adicione um novo bloco comentado no final.

---

## Boas práticas ao praticar

- **Não apague exercícios antigos** — eles servem de histórico do seu aprendizado.
- **Comente o enunciado** acima do código, especialmente se o exercício veio de um desafio da aula.
- **Rode o arquivo inteiro** após cada exercício novo; erros de sintaxe em um bloco impedem a execução do restante.
- **Use o Git** (quando estiver confortável) para versionar a pasta `trilha-qa-exercicios` e não perder o progresso.

---

## Resumo

| O quê | Como |
| --- | --- |
| Pasta do módulo | `fundamentos/` dentro da sua pasta de exercícios |
| Arquivo por tópico | Ex.: `estruturas-condicionais.js` |
| Organização interna | Blocos `// --- Exercício N ---` com objetivo descrito |
| Executar | `node fundamentos/estruturas-condicionais.js` |
| Referência no repo | `exemplos/fundamentos/estruturas-condicionais.js` |

Com essa estrutura, você mantém a prática alinhada à ordem da trilha e revisita exercícios antigos com facilidade. O próximo passo natural é aplicar os fundamentos nos módulos práticos, começando por **Testes de API**.
