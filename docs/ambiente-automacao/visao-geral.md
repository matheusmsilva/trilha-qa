---
title: Visão geral do ambiente
description: Ferramentas, contas e organização do ambiente para automação de testes.
---

# Ambiente de automação

Antes de escrever e executar testes automatizados, é preciso preparar a máquina com as ferramentas certas. Este módulo guia você passo a passo — começando do zero no **Windows** — até ter um ambiente pronto para os exercícios e projetos da trilha.

Use esta página como **mapa** e siga a ordem da sidebar.

---

## O que você vai instalar

Para acompanhar a trilha, estas ferramentas são **obrigatórias**:

| Ferramenta | Para que serve |
| --- | --- |
| **Node.js** (+ **npm**) | Executar JavaScript/TypeScript, instalar bibliotecas e rodar testes e scripts de automação. |
| **Visual Studio Code** | Editor de código onde você vai escrever, organizar e depurar os testes. |
| **Git** | Controle de versão — clonar repositórios, salvar alterações e trabalhar em equipe. |

Sem Node e npm, não dá para instalar Playwright nem rodar os projetos práticos. Sem VS Code e Git, o fluxo de trabalho do dia a dia fica bem mais difícil — por isso entram no checklist desde o início.

---

## Sumário do módulo

| Conteúdo | O que você vai fazer |
| --- | --- |
| [Instalação do Node.js](./instalacao-node.md) | Conferir se Node e npm estão instalados; baixar e instalar no Windows, se necessário. |
| [Instalação do Visual Studio Code](./instalacao-vscode.md) | Instalar o editor, abrir projetos, terminal integrado e extensões úteis. |
| [Instalação do Git](./instalacao-git.md) | Instalar o Git, configurar nome e e-mail e validar no terminal. |
| [Executar arquivos JavaScript](./executar-javascript.md) | Rodar arquivos `.js` no terminal com `node` e praticar com um exemplo. |
| [Repositório e estrutura de pastas](./repositorio-e-estrutura.md) | Criar a pasta `fundamentos/` e organizar exercícios por tópico em arquivos `.js`. |

---

## Como estudar este bloco

1. Leia esta visão geral para entender o que precisa estar na máquina.
2. Siga a ordem da sidebar: **Node.js** → **VS Code** → **Git** → **Executar arquivos JavaScript**.
3. Pratique em **[Executar arquivos JavaScript](./executar-javascript.md)** antes de avançar.
4. Só passe para **Automação de APIs** quando estes comandos funcionarem no terminal:

```bash
node --version
npm --version
git --version
```

O comando `code --version` também deve funcionar se você marcou **Add to PATH** na instalação do VS Code; caso contrário, basta conseguir abrir o editor pelo menu Iniciar.

> **Terminal no Windows:** você pode usar o **Prompt de Comando** (`cmd`) ou o **PowerShell**. Os comandos desta trilha funcionam nos dois. Se uma janela de terminal já estava aberta antes de instalar algo, **feche e abra de novo** para o sistema reconhecer a ferramenta recém-instalada.

Quando o ambiente estiver configurado, o próximo passo natural é aplicar essa base nos módulos práticos de **Automação de APIs** e, depois, automação Web com Playwright.
