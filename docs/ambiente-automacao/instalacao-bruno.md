---
title: Instalação do Bruno
description: Como instalar o Bruno API Client no Windows para testes manuais de API.
---

# Instalação do Bruno (Windows)

O **Bruno** é o cliente de API que usaremos nesta trilha para **testes manuais de API** — enviar requisições HTTP, inspecionar respostas e validar comportamentos antes (ou junto) da automação com código.

Ele é gratuito, open source e leve. Diferente de clientes que guardam tudo em nuvem, o Bruno salva coleções como **arquivos em pastas** no seu computador — o que facilita versionar cenários de teste com Git.

Nesta página você vai:

1. Entender para que serve o Bruno em testes de API.
2. Conferir se já está instalado.
3. Baixar e instalar no Windows, se necessário.
4. Abrir o aplicativo e criar sua primeira coleção.

> **Ambiente da trilha:** os passos abaixo são para **Windows**. O Bruno também existe para Mac e Linux, mas este guia foca no instalador `.exe` para **x64** (a arquitetura mais comum em PCs Windows).

---

## Para que serve o Bruno em testes de API?

| Recurso | Como ajuda no dia a dia de QA |
| --- | --- |
| **Requisições HTTP** | Enviar GET, POST, PUT, DELETE e outros métodos para explorar endpoints. |
| **Resposta visível** | Ver status code, headers, corpo JSON e tempo de resposta em um só lugar. |
| **Coleções organizadas** | Agrupar requisições por API, módulo ou fluxo de teste (login, pedidos, usuários). |
| **Variáveis de ambiente** | Trocar URL base, tokens e credenciais entre dev, homologação e produção. |
| **Arquivos no disco** | Cada coleção vira uma pasta no projeto — fácil de compartilhar e versionar com Git. |

O Bruno **não substitui** a automação com Node.js e bibliotecas de teste. Ele é a ferramenta para **explorar e validar manualmente** a API; depois você reproduz os cenários importantes em código no módulo **Testes de API**.

---

## Passo 1 — Verificar se o Bruno já está instalado

### Pelo menu Iniciar

1. Pressione a tecla **Windows**.
2. Digite `Bruno`.
3. Se o aplicativo **Bruno** aparecer na lista, provavelmente já está instalado.

### Pelo terminal (opcional)

Se você instalou via **winget**, pode conferir com:

```bash
winget list Bruno.Bruno
```

Se o pacote aparecer na lista, o Bruno está instalado. Caso contrário, siga os passos de instalação abaixo.

---

## Passo 2 — Baixar o Bruno

1. Acesse a página oficial de downloads: [https://www.usebruno.com/downloads](https://www.usebruno.com/downloads)
2. Na seção **Windows**, escolha **Windows x64** (recomendado na maioria dos PCs).
3. Clique em **EXE · x64 Download** para baixar o instalador.

> **Versão recomendada:** use sempre a **última versão estável** disponível no site oficial. Não é necessário escolher uma versão específica para esta trilha.

> **PC com processador Arm64?** Se o seu Windows for em Arm64, use o instalador **Arm64** na mesma página de downloads.

---

## Passo 3 — Instalar o Bruno no Windows

1. Localize o arquivo `.exe` baixado (geralmente na pasta **Downloads**).
2. Dê **duplo clique** para iniciar o instalador.
3. Siga as telas do assistente (aceitar licença, manter pasta padrão, confirmar instalação).
4. Ao finalizar, marque a opção para **abrir o Bruno**, se aparecer, e clique em **Finish**.

O Bruno é instalado como um aplicativo de desktop — não precisa configurar PATH nem variáveis de ambiente para começar a usar.

---

## Alternativa — Instalar via winget

Se você já usa o **winget** (Gerenciador de Pacotes do Windows), pode instalar pelo terminal:

```bash
winget install Bruno.Bruno
```

Aguarde a conclusão e abra o Bruno pelo menu Iniciar.

---

## Passo 4 — Confirmar a instalação

1. Abra o **Bruno** pelo menu Iniciar.
2. Na primeira execução, o aplicativo pode pedir para criar ou abrir uma **coleção** — isso confirma que a instalação funcionou.
3. Se a janela principal do Bruno abrir sem erro, você está pronto para os exercícios de API.

---

## Passo 5 — Primeira configuração

### Criar uma coleção

Uma **coleção** no Bruno é uma pasta que agrupa requisições de uma mesma API ou projeto.

1. No Bruno, clique em **Create Collection** (ou **Criar coleção**).
2. Escolha um nome descritivo — por exemplo `trilha-qa-apis` ou o nome da API que você vai testar.
3. Selecione uma pasta no disco onde a coleção será salva (pode ser dentro do seu projeto de exercícios).
4. Confirme a criação.

O Bruno criará arquivos `.bru` dentro dessa pasta. Cada arquivo representa uma requisição HTTP.

### Criar a primeira requisição

1. Dentro da coleção, clique com o botão direito e escolha **New Request** (nova requisição).
2. Dê um nome — por exemplo `health-check` ou `listar-usuarios`.
3. Selecione o método **GET** e informe uma URL de teste. Para validar que tudo funciona, você pode usar uma API pública de exemplo:

```text
https://jsonplaceholder.typicode.com/posts/1
```

4. Clique em **Send** (ou **Enviar**).
5. Confira na área de resposta: status **200**, corpo JSON e tempo da requisição.

Se receber a resposta esperada, o Bruno está configurado e pronto para o módulo **Testes de API**.

---

## Problemas comuns

### O instalador não abre ou é bloqueado

Algumas empresas restringem a instalação de aplicativos. Nesse caso, peça ao time de TI permissão para instalar o Bruno ou use a versão **portable** (ZIP) disponível na [página de downloads](https://www.usebruno.com/downloads), se a política da empresa permitir.

### Erro de rede ou proxy ao enviar requisições

Em redes corporativas, pode ser necessário configurar proxy no Bruno (**Preferences → Proxy**) ou liberar o domínio da API com o time de infraestrutura.

### Não encontro onde ficam os arquivos da coleção

Cada coleção aponta para uma pasta que você escolheu na criação. Abra essa pasta no VS Code ou no Explorer — você verá arquivos `.bru` e uma pasta `environments` para variáveis de ambiente.

---

## Resumo

| Etapa | Ação |
| --- | --- |
| Verificar | Menu Iniciar → pesquisar **Bruno** |
| Baixar | [usebruno.com/downloads](https://www.usebruno.com/downloads) → **EXE x64** |
| Instalar | Executar o `.exe` e concluir o assistente |
| Validar | Abrir o Bruno e enviar um GET de teste |
| Configurar | Criar uma coleção e salvar na pasta do projeto |

Com o Bruno instalado, volte à prática de JavaScript em **[Executar arquivos JavaScript](./executar-javascript.md)**. Quando chegar ao módulo **Testes de API**, você usará o Bruno para explorar endpoints manualmente antes de automatizar os cenários.
