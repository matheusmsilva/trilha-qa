---
title: Instalação do Git
description: Como verificar, instalar e configurar o Git no Windows para automação de testes.
---

# Instalação do Git (Windows)

O **Git** é a ferramenta de **controle de versão** usada para guardar o histórico do código, clonar repositórios, criar branches e trabalhar em equipe. Na trilha, você vai usá-lo para baixar projetos de automação, registrar alterações nos testes e acompanhar o que mudou ao longo do tempo.

Nesta página você vai:

1. Entender o papel do Git na automação.
2. Conferir se já está instalado.
3. Instalar o Git no Windows, se necessário.
4. Fazer a configuração inicial obrigatória (`user.name` e `user.email`).

> **Ambiente da trilha:** os passos abaixo são para **Windows**. O instalador oficial também inclui o **Git Bash**, um terminal alternativo — opcional; você pode continuar usando Prompt de Comando ou PowerShell.

---

## Para que serve o Git na automação?

| Situação | Como o Git ajuda |
| --- | --- |
| **Clonar um repositório** | Baixar o projeto de automação pronto para rodar na sua máquina (`git clone`). |
| **Salvar alterações** | Registrar o que você modificou nos testes e quando (`git commit`). |
| **Trabalhar em branch** | Isolar uma feature ou correção sem misturar com o código principal. |
| **Sincronizar com o time** | Enviar e receber atualizações do repositório remoto (`git push`, `git pull`). |
| **Investigar falhas** | Ver o que mudou entre uma versão que passava e uma que quebrou (`git diff`, `git log`). |

O VS Code já exibe status do Git na interface, mas os comandos rodam por baixo dos panos — por isso o Git precisa estar instalado na máquina.

---

## Passo 1 — Abrir o terminal

1. Pressione a tecla **Windows**.
2. Digite `cmd` ou `powershell`.
3. Abra **Prompt de Comando** ou **Windows PowerShell**.

---

## Passo 2 — Verificar se o Git já está instalado

No terminal, execute:

```bash
git --version
```

Se o Git estiver instalado, aparecerá algo como:

```text
git version 2.47.1.windows.1
```

O número exato pode variar; o importante é **não** aparecer mensagem de erro do tipo *"git não é reconhecido"*.

Se o comando funcionou, pule para o **[Passo 6 — Configuração inicial](#passo-6--configuração-inicial)** para definir seu nome e e-mail (necessário mesmo em instalações que já existiam).

---

## Passo 3 — Baixar o Git

1. Acesse o site oficial: [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. O download do instalador para Windows deve iniciar automaticamente (arquivo `.exe`, por exemplo `Git-2.47.1-64-bit.exe`).

> **Versão recomendada:** use a **última versão estável** do instalador oficial. Não é necessário escolher uma versão específica para esta trilha.

---

## Passo 4 — Instalar o Git no Windows

1. Localize o `.exe` baixado (geralmente na pasta **Downloads**).
2. Dê **duplo clique** para abrir o instalador.
3. Clique em **Next** nas telas iniciais (informações e licença).
4. Mantenha o caminho de instalação padrão, salvo orientação da sua empresa.
5. Na tela **Select Components**, as opções padrão costumam bastar. Pode manter **Git Bash** marcado — útil, mas não obrigatório.
6. Na tela **Choosing the default editor**, se não souber qual escolher, selecione **Use Visual Studio Code as Git's default editor** (desde que o VS Code já esteja instalado).
7. Nas telas seguintes, **aceite os padrões recomendados** em:

   - **Adjusting the name of the initial branch** → *Let Git decide* ou *Override* com `main` (ambos funcionam na trilha).
   - **Adjusting your PATH environment** → **Git from the command line and also from 3rd-party software** (importante para usar `git` no CMD e PowerShell).
   - **Choosing HTTPS transport backend** → *Use the OpenSSL library*.
   - **Configuring the line ending conversions** → **Checkout Windows-style, commit Unix-style line endings** (padrão no Windows).

8. Continue clicando em **Next** nas demais telas (opções de terminal, credential helper, extras) — os padrões são adequados para iniciantes.
9. Clique em **Install** e aguarde a conclusão.
10. Desmarque **View Release Notes** se não quiser abrir a página no navegador e clique em **Finish**.

---

## Passo 5 — Confirmar a instalação

**Feche o terminal** que estava aberto e abra um **novo** Prompt de Comando ou PowerShell.

Execute novamente:

```bash
git --version
```

A saída deve mostrar a versão do Git, sem erro.

---

## Passo 6 — Configuração inicial

Antes do primeiro commit, o Git precisa saber **quem** está registrando as alterações. Essa configuração é feita uma vez por máquina (ou por usuário do Windows).

Substitua os valores pelos seus dados reais:

```bash
git config --global user.name "Seu Nome"
```

```bash
git config --global user.email "seu.email@exemplo.com"
```

Use o **mesmo e-mail** da sua conta no GitHub, Azure DevOps ou outra plataforma que a empresa utilizar — isso evita problemas ao enviar commits.

Para conferir se salvou corretamente:

```bash
git config --global user.name
```

```bash
git config --global user.email
```

Cada comando deve exibir o valor que você configurou.

> **Dica:** o e-mail aparece no histórico de commits. Se a plataforma oferecer e-mail privado (como no GitHub), use o endereço que eles indicarem nas configurações de privacidade.

---

## Passo 7 — Teste rápido (opcional)

Para confirmar que o Git responde a comandos básicos, você pode clonar um repositório público pequeno:

```bash
git clone https://github.com/githubtraining/hellogitworld.git
```

Se a pasta `hellogitworld` for criada sem erro, o Git está operacional. Você pode apagar essa pasta depois — era só um teste.

---

## Git no Visual Studio Code

Com o Git instalado, o VS Code passa a mostrar:

- arquivos **modificados** no explorador (cor ou ícone ao lado do nome);
- a aba **Source Control** (ícone de ramificação na barra lateral, atalho **Ctrl + Shift + G**);
- diff visual ao clicar em um arquivo alterado.

Para comandos avançados (branch, merge, push), a trilha terá módulos dedicados mais adiante. Por ora, o essencial é: **Git instalado + nome e e-mail configurados**.

---

## Problemas comuns

### "git não é reconhecido" após instalar

- Feche e reabra o terminal (ou reinicie o computador).
- Reinstale o Git escolhendo **Git from the command line and also from 3rd-party software** na etapa de PATH.

### Commits rejeitados por e-mail ou nome

Verifique a configuração com `git config --global user.name` e `git config --global user.email`. Corrija com os comandos do Passo 6 se estiverem errados ou vazios.

### Erro de certificado ou proxy em empresa

Algumas redes corporativas exigem proxy ou certificado customizado. Nesse caso, peça ao time de infraestrutura ou DevOps as variáveis `HTTP_PROXY` / `HTTPS_PROXY` ou a configuração de certificado — isso varia por empresa.

### Line endings (avisos sobre LF/CRLF)

No Windows é comum ver avisos sobre fim de linha. Manter a opção padrão do instalador (*Checkout Windows-style, commit Unix-style*) costuma ser suficiente para esta trilha.

---

## Resumo

| Etapa | Comando ou ação |
| --- | --- |
| Verificar | `git --version` |
| Baixar | [git-scm.com/download/win](https://git-scm.com/download/win) |
| Instalar | Executar o `.exe`; PATH = linha de comando + softwares de terceiros |
| Validar | Fechar e reabrir o terminal; `git --version` |
| Configurar | `git config --global user.name` e `user.email` |

Com **Node.js**, **VS Code** e **Git** prontos, instale o **[Bruno](./instalacao-bruno.md)** — cliente de API para testes manuais — e depois pratique rodando um `.js` em **[Executar arquivos JavaScript](./executar-javascript.md)**.
