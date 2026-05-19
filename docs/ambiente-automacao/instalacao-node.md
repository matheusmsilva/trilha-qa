---
title: Instalação do Node.js
description: Como verificar e instalar Node.js e npm no Windows para automação de testes.
---

# Instalação do Node.js (Windows)

Antes de rodar scripts, instalar dependências ou usar Playwright nesta trilha, você precisa do **Node.js** na máquina. O **npm** (gerenciador de pacotes) vem junto com a instalação do Node — não é necessário baixá-lo separadamente.

Nesta página você vai:

1. Entender o que são Node.js e npm.
2. Conferir se já estão instalados.
3. Instalar o Node.js no Windows, se ainda não tiver.
4. Validar que tudo funcionou.

> **Ambiente da trilha:** esta trilha foi pensada para **Windows**. Os passos abaixo usam o **Prompt de Comando** ou o **PowerShell** — ambos já vêm instalados no sistema.

---

## O que são Node.js e npm?

| Ferramenta | Para que serve na automação |
| --- | --- |
| **Node.js** | Runtime que executa JavaScript e TypeScript fora do navegador — é a base para rodar testes, scripts e ferramentas como o Playwright. |
| **npm** | Gerenciador de pacotes que vem com o Node. Com ele você instala bibliotecas (por exemplo Playwright, Jest) e executa comandos definidos no projeto (`npm test`, `npm install`). |

Na prática: você instala o **Node.js** e ganha o **npm** automaticamente.

---

## Passo 1 — Abrir o terminal

1. Pressione a tecla **Windows** no teclado.
2. Digite `cmd` ou `powershell`.
3. Abra **Prompt de Comando** ou **Windows PowerShell**.

Você verá uma janela com texto e um cursor piscando — é nela que os comandos serão digitados.

---

## Passo 2 — Verificar se o Node.js já está instalado

No terminal, digite o comando abaixo e pressione **Enter**:

```bash
node --version
```

Se o Node estiver instalado, aparecerá algo como:

```text
v22.14.0
```

O número exato pode variar; o importante é **não** aparecer mensagem de erro do tipo *"node não é reconhecido"* ou *"command not found"*.

---

## Passo 3 — Verificar se o npm está instalado

Ainda no terminal, execute:

```bash
npm --version
```

Se estiver tudo certo, a saída será parecida com:

```text
10.9.2
```

Novamente: o número pode ser diferente, mas o comando precisa responder sem erro.

---

## O que fazer se os comandos funcionaram?

Se **`node --version`** e **`npm --version`** retornaram números de versão, o ambiente básico já está pronto para esta etapa da trilha.

> **Versão recomendada:** use a **versão LTS** do Node.js, **20 ou superior**. Projetos desta trilha seguem esse requisito mínimo. Para conferir se sua versão é adequada, compare o número exibido por `node --version` — por exemplo, `v20.11.0` ou `v22.14.0` atendem ao requisito.

Quando terminar esta página, avance para **[Instalação do Visual Studio Code](./instalacao-vscode.md)**.

---

## O que fazer se aparecer erro?

Se o terminal mostrar algo como:

```text
'node' não é reconhecido como um comando interno ou externo...
```

ou

```text
node : O termo 'node' não é reconhecido...
```

significa que o Node.js **não está instalado** ou **não foi configurado no PATH** do Windows. Siga os passos abaixo para instalar.

---

## Passo 4 — Baixar o Node.js

1. Abra o site oficial: [https://nodejs.org](https://nodejs.org)
2. Clique no botão da versão **LTS** (Long Term Support) — é a recomendada para a maioria dos usuários e para esta trilha.
3. O site vai baixar um arquivo `.msi` para Windows (por exemplo `node-v22.x.x-x64.msi`).

> **Atenção:** não use versões abaixo do **Node 20** nesta trilha. Prefira sempre o instalador **LTS** mais recente disponível no site oficial.

---

## Passo 5 — Instalar o Node.js no Windows

1. Localize o arquivo `.msi` baixado (geralmente na pasta **Downloads**).
2. Dê **duplo clique** para abrir o instalador.
3. Clique em **Next** nas telas iniciais.
4. Aceite os termos de licença (**I accept...**) e continue.
5. Mantenha o caminho de instalação padrão, a menos que sua empresa exija outro.
6. Na tela **Custom Setup**, deixe marcada a opção que adiciona o Node ao **PATH** (costuma vir selecionada por padrão — **não desmarque**).
7. Opcional: marque **Automatically install the necessary tools** se quiser que o instalador configure ferramentas extras para compilação nativa. Para a trilha, não é obrigatório.
8. Clique em **Install** e aguarde a conclusão.
9. Finalize com **Finish**.

---

## Passo 6 — Confirmar a instalação

**Importante:** feche o terminal que estava aberto e abra um **novo** Prompt de Comando ou PowerShell. Instalações recentes só passam a valer em janelas novas.

Execute novamente:

```bash
node --version
```

```bash
npm --version
```

Os dois comandos devem retornar números de versão, sem erro.

---

## Problemas comuns após instalar

### Ainda aparece "não é reconhecido"

- Confirme que **fechou e reabriu** o terminal.
- Se persistir, **reinicie o computador** e teste de novo.
- Verifique se a instalação foi feita pelo instalador oficial em [nodejs.org](https://nodejs.org), não por pacotes não oficiais.

### Versão muito antiga

Se `node --version` mostrar algo como `v16` ou `v18`, desinstale a versão antiga em **Configurações → Aplicativos → Aplicativos instalados**, procure por **Node.js**, remova e instale novamente a **LTS** atual do site oficial.

### npm não responde, mas node funciona

Isso é raro em instalações padrão. Tente reinstalar o Node.js pelo `.msi` oficial — o npm é instalado junto.

---

## Resumo

| Etapa | Comando ou ação |
| --- | --- |
| Verificar Node | `node --version` |
| Verificar npm | `npm --version` |
| Baixar | [nodejs.org](https://nodejs.org) → botão **LTS** |
| Instalar | Executar o `.msi` e manter Node no PATH |
| Validar | Fechar e reabrir o terminal; repetir os dois comandos |

Com Node e npm funcionando, siga para **[Instalação do Visual Studio Code](./instalacao-vscode.md)** e depois **[Instalação do Git](./instalacao-git.md)**.
