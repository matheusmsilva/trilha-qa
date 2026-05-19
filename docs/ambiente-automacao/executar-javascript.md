---
title: Executar arquivos JavaScript
description: Como rodar arquivos .js no terminal com Node.js no Windows.
---

# Executar arquivos `.js` no terminal

Com o Node.js instalado, você pode executar arquivos JavaScript (`.js`) direto no terminal — sem navegador. É assim que scripts de automação, utilitários e testes rodam na sua máquina.

Nesta página você vai:

1. Entender o comando `node`.
2. Criar ou abrir um arquivo `.js` de exemplo.
3. Navegar até a pasta certa no terminal.
4. Executar o arquivo e interpretar a saída.

> **Pré-requisito:** Node.js instalado e validado com `node --version`. Se ainda não fez isso, volte em **[Instalação do Node.js](./instalacao-node.md)**.

---

## O comando `node`

Para rodar um arquivo JavaScript, use:

```bash
node caminho/do/arquivo.js
```

O Node **lê o arquivo de cima a baixo** e executa cada linha. Mensagens aparecem no terminal quando o código chama `console.log(...)`.

---

## Arquivo de exemplo da trilha

Este repositório inclui um exemplo em **`exemplos/ola-trilha.js`**. O conteúdo é este:

```js
const nome = "QA";
const cenariosAutomatizados = 3;

console.log(`Olá, ${nome}! Bem-vindo à trilha de automação.`);
console.log(`Cenários automatizados hoje: ${cenariosAutomatizados}`);

const ambientePronto = true;

if (ambientePronto) {
  console.log("Node.js está executando este arquivo .js corretamente.");
} else {
  console.log("Revise a instalação do Node.js.");
}
```

Você pode copiar esse arquivo do repositório clonado ou criar o mesmo conteúdo manualmente no VS Code.

---

## Passo 1 — Abrir o projeto no VS Code

1. Abra o **Visual Studio Code**.
2. Vá em **File → Open Folder** (ou **Arquivo → Abrir Pasta**).
3. Selecione a pasta do repositório **trilha-qa-automacao** (ou a pasta onde você salvou o exemplo).

No explorador de arquivos à esquerda, confirme que existe a pasta **`exemplos`** com o arquivo **`ola-trilha.js`**.

---

## Passo 2 — Abrir o terminal na pasta do projeto

No VS Code:

1. **Terminal → New Terminal** (ou **Ctrl + `**).
2. O terminal abre **dentro da pasta do projeto** que você abriu no passo anterior.

Se estiver usando o Prompt de Comando ou PowerShell fora do VS Code, navegue até a pasta do projeto com `cd`:

```bash
cd C:\Users\SeuUsuario\caminho\para\trilha-qa-automacao
```

Substitua pelo caminho real da pasta na sua máquina.

Para conferir se está no lugar certo, liste os arquivos:

```bash
dir
```

Você deve ver pastas como `docs`, `exemplos` e arquivos como `package.json`.

---

## Passo 3 — Executar o exemplo com Node

Ainda no terminal, rode:

```bash
node exemplos/ola-trilha.js
```

No Windows, barras `/` e `\` costumam funcionar. Estas duas formas são equivalentes:

```bash
node exemplos\ola-trilha.js
```

Saída esperada:

```text
Olá, QA! Bem-vindo à trilha de automação.
Cenários automatizados hoje: 3
Node.js está executando este arquivo .js corretamente.
```

Se aparecer exatamente isso (ou mensagens equivalentes), o Node executou o arquivo com sucesso.

---

## Passo 4 — Editar e rodar de novo

1. No VS Code, abra **`exemplos/ola-trilha.js`**.
2. Altere o valor de `cenariosAutomatizados`, por exemplo para `5`.
3. Salve o arquivo (**Ctrl + S**).
4. No terminal, execute o mesmo comando outra vez:

```bash
node exemplos/ola-trilha.js
```

A linha `Cenários automatizados hoje:` deve refletir o novo número. Esse ciclo — **editar → salvar → rodar no terminal** — é o fluxo diário na automação.

---

## Rodar a partir de outra pasta

Se o terminal **não** estiver na raiz do projeto, use o caminho completo ou relativo correto.

Exemplo: terminal dentro de `exemplos`:

```bash
node ola-trilha.js
```

Exemplo: terminal em outro lugar, apontando para o arquivo:

```bash
node C:\Users\SeuUsuario\projetos\trilha-qa-automacao\exemplos\ola-trilha.js
```

---

## Problemas comuns

### `'node' não é reconhecido`

O Node não está instalado ou o terminal foi aberto antes da instalação. Feche o terminal, abra um novo e teste `node --version`. Veja **[Instalação do Node.js](./instalacao-node.md)**.

### `Cannot find module` ou `ENOENT`

O caminho do arquivo está errado. Confira:

- se o nome do arquivo está correto (`ola-trilha.js`);
- se você está na pasta certa (`dir` ou `ls` no terminal);
- se digitou `exemplos/ola-trilha.js` quando o terminal está na **raiz** do projeto.

### Nada muda após editar o arquivo

Salve o arquivo no VS Code (**Ctrl + S**) antes de rodar `node` de novo. O Node sempre executa o que está **salvo em disco**, não o que só está aberto sem salvar.

### Janela fecha rápido demais

Se você deu duplo clique no `.js` e a janela sumiu, isso é normal — o script terminou. Para ver a saída, rode sempre pelo **terminal** com `node arquivo.js`.

---

## Resumo

| Etapa | Comando ou ação |
| --- | --- |
| Ir para a pasta do projeto | `cd caminho\do\projeto` |
| Executar um `.js` | `node exemplos/ola-trilha.js` |
| Conferir saída | Ler as linhas impressas no terminal |
| Iterar | Editar o `.js`, salvar, rodar `node` de novo |

Sabendo rodar arquivos `.js`, você já consegue testar trechos de código antes de montar projetos maiores. Siga para **[Repositório e estrutura de pastas](./repositorio-e-estrutura.md)** quando quiser entender como organizar um projeto de automação completo.
