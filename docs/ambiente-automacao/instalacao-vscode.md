---
title: Instalação do Visual Studio Code
description: Como verificar e instalar o Visual Studio Code no Windows para automação de testes.
---

# Instalação do Visual Studio Code (Windows)

O **Visual Studio Code** (VS Code) é o editor onde você vai escrever, organizar e executar os testes automatizados desta trilha. Ele é gratuito, leve e muito usado no mercado — inclusive por times de QA e desenvolvimento.

Nesta página você vai:

1. Entender para que serve o VS Code na automação.
2. Conferir se já está instalado.
3. Baixar e instalar no Windows, se necessário.
4. Fazer uma configuração inicial rápida para começar a usar.

> **Ambiente da trilha:** os passos abaixo são para **Windows**. O VS Code também existe para Mac e Linux, mas este guia foca no instalador `.exe` do Windows.

---

## Para que serve o VS Code na automação?

| Recurso | Como ajuda no dia a dia |
| --- | --- |
| **Editor de código** | Escrever testes em JavaScript e TypeScript com destaque de sintaxe e autocomplete. |
| **Terminal integrado** | Rodar `npm install`, `npm test` e outros comandos sem sair do editor. |
| **Explorador de arquivos** | Navegar pastas do projeto (`tests`, `src`, configs) de forma visual. |
| **Extensões** | Adicionar suporte extra a TypeScript, formatação, Git e ferramentas de teste. |
| **Depuração** | Pausar execução, inspecionar variáveis e investigar falhas nos testes. |

O VS Code **não substitui** o Node.js — ele é o ambiente de edição. O Node continua sendo quem executa os scripts e testes.

---

## Passo 1 — Verificar se o VS Code já está instalado

### Pelo menu Iniciar

1. Pressione a tecla **Windows**.
2. Digite `Visual Studio Code` ou `Code`.
3. Se o aplicativo aparecer na lista, provavelmente já está instalado.

### Pelo terminal (opcional)

Abra o **Prompt de Comando** ou **PowerShell** e execute:

```bash
code --version
```

Se estiver instalado e configurado no PATH, a saída será parecida com:

```text
1.98.2
x64
```

Se aparecer erro do tipo *"code não é reconhecido"*, o VS Code pode não estar instalado **ou** a opção de adicionar ao PATH não foi marcada na instalação. Nos dois casos, siga os passos de instalação abaixo.

---

## Passo 2 — Baixar o Visual Studio Code

1. Acesse o site oficial: [https://code.visualstudio.com](https://code.visualstudio.com)
2. Clique em **Download for Windows**.
3. Será baixado um instalador `.exe` (por exemplo `VSCodeUserSetup-x64-1.xx.x.exe`).

> **Versão recomendada:** use sempre a **última versão estável** disponível no site oficial. Não é necessário escolher uma versão específica para esta trilha.

---

## Passo 3 — Instalar o VS Code no Windows

1. Localize o arquivo `.exe` baixado (geralmente na pasta **Downloads**).
2. Dê **duplo clique** para iniciar o instalador.
3. Aceite o contrato de licença e clique em **Next**.
4. Mantenha o caminho de instalação padrão, salvo orientação da sua empresa.
5. Na tela **Select Additional Tasks**, marque estas opções (recomendado):

   - **Add to PATH (requires shell restart)** — permite usar o comando `code` no terminal.
   - **Register Code as an editor for supported file types** — associa arquivos de código ao VS Code.
   - **Add a "Open with Code" action to the Windows Explorer file context menu** — abre pastas e arquivos pelo clique direito no Explorer.

6. Clique em **Next**, depois **Install** e aguarde a conclusão.
7. Marque **Launch Visual Studio Code** se quiser abrir ao finalizar e clique em **Finish**.

---

## Passo 4 — Confirmar a instalação

Se marcou a opção **Add to PATH**, **feche e reabra** o terminal antes de testar o comando:

```bash
code --version
```

Outra forma de validar: abra o VS Code pelo menu Iniciar. Se a janela principal aparecer sem erro, a instalação funcionou.

---

## Passo 5 — Primeira configuração

### Abrir uma pasta de projeto

1. No VS Code, clique em **File → Open Folder** (ou **Arquivo → Abrir Pasta**, se estiver em português).
2. Selecione a pasta do projeto de automação que você vai usar na trilha.
3. Confirme em **Select Folder**.

O explorador de arquivos à esquerda passará a mostrar a estrutura do projeto.

### Abrir o terminal integrado

1. No menu, vá em **Terminal → New Terminal** (ou **Terminal → Novo Terminal**).
2. Um painel de terminal abrirá na parte inferior do VS Code.

Esse terminal funciona como o Prompt de Comando ou PowerShell — você pode rodar `node --version`, `npm install` e os comandos dos testes direto dali.

Atalho útil: **Ctrl + `** (tecla acento grave, ao lado do **1** no teclado) abre e fecha o terminal integrado.

### Interface em português (opcional)

1. Clique no ícone de **Extensions** na barra lateral (ou pressione **Ctrl + Shift + X**).
2. Pesquise por **Portuguese (Brazil) Language Pack**.
3. Instale a extensão da Microsoft e reinicie o VS Code quando solicitado.

Isso traduz menus e mensagens; o código e os comandos continuam em inglês, como no mercado.

---

## Extensões úteis para a trilha

Não é obrigatório instalar tudo agora, mas estas extensões ajudam bastante em automação:

| Extensão | Para que serve |
| --- | --- |
| **Material Icon Theme** | Ícones coloridos por tipo de arquivo no explorador — facilita identificar pastas, testes e configs de relance. |
| **GitBlame** | Exibe autoria e data da última alteração de cada linha (git blame), útil para entender quem mudou o quê no código. |
| **JavaScript (ES6) code snippets** | Atalhos para escrever código JavaScript mais rápido. |
| **ESLint** | Aponta problemas de estilo e erros comuns enquanto você digita. |
| **Prettier** | Formata o código de forma consistente ao salvar. |
| **Playwright Test for VSCode** | Integração com testes Playwright (útil mais adiante na trilha). |

Para instalar: **Extensions** → pesquisar o nome → **Install**.

Depois de instalar o **Material Icon Theme**, ative os ícones em **File → Preferences → File Icon Theme → Material Icon Theme** (ou **Arquivo → Preferências → Tema de ícones de arquivo**, se o VS Code estiver em português).

---

## Problemas comuns

### O comando `code` não funciona no terminal

- Reinstale o VS Code marcando **Add to PATH** na instalação.
- Feche **todas** as janelas de terminal e abra uma nova.
- Se ainda falhar, abra o VS Code pelo menu Iniciar — o editor funciona mesmo sem o comando `code` no PATH.

### O VS Code não abre pastas de rede ou protegidas

Algumas empresas restringem pastas ou exigem permissões especiais. Nesse caso, copie o projeto para uma pasta local (por exemplo `C:\Users\SeuUsuario\projetos\`) e abra a partir dali.

### Terminal integrado abre em pasta errada

O terminal inicia na pasta raiz do projeto aberto no VS Code. Confirme que você abriu a pasta certa com **File → Open Folder**.

---

## Resumo

| Etapa | Ação |
| --- | --- |
| Verificar | Menu Iniciar ou `code --version` |
| Baixar | [code.visualstudio.com](https://code.visualstudio.com) |
| Instalar | Executar o `.exe` e marcar **Add to PATH** |
| Validar | Abrir o VS Code e, se possível, rodar `code --version` |
| Configurar | Abrir pasta do projeto e terminal integrado (**Ctrl + `**) |

Com o VS Code instalado, o próximo passo é **[Instalação do Git](./instalacao-git.md)** — controle de versão para clonar repositórios e salvar o progresso dos seus testes.
