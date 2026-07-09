---
title: Visão geral
description: Sumário do módulo de testes de API — testes manuais com Bruno e automação com Playwright.
---

# Testes de API

APIs são a espinha dorsal de muitos sistemas modernos: login, cadastros, pedidos, pagamentos — quase tudo passa por requisições HTTP por trás das telas. Neste módulo você aprende a **testar APIs de forma eficaz**, em duas frentes que se complementam:

1. **Testes manuais** — explorar endpoints, validar respostas e montar cenários no **Bruno**.
2. **Automação de API** — reproduzir e expandir esses cenários em código com **Playwright**.

A ordem faz sentido na prática: primeiro você entende o comportamento da API manualmente; depois transforma os fluxos importantes em testes automatizados que podem rodar a cada alteração no sistema.

Use esta página como **mapa** e siga a ordem da sidebar.

---

## O que você vai aprender

| Frente | Ferramenta | Objetivo |
| --- | --- | --- |
| **Testes manuais de API** | [Bruno](../ambiente-automacao/instalacao-bruno.md) | Enviar requisições, inspecionar status code, headers e corpo da resposta; organizar cenários em coleções versionáveis. |
| **Automação de API** | **Playwright** (`APIRequestContext`) | Escrever testes em JavaScript/TypeScript que chamam a API, validam respostas e integram com a suíte de automação do projeto. |

Em ambos os casos o foco é o mesmo: **garantir que a API se comporta como esperado** — com dados corretos, status codes adequados, regras de negócio respeitadas e tratamento de erros consistente.

---

## Por que testar API manualmente e automatizar?

| Abordagem | Quando usar | Vantagem |
| --- | --- | --- |
| **Manual (Bruno)** | Explorar uma API nova, depurar um bug, validar um endpoint pontual, montar massa de dados | Rápido, visual, ideal para entender o contrato da API antes de codar. |
| **Automatizado (Playwright)** | Regressão, smoke, cenários que rodam no CI, suites grandes | Repetível, rápido em escala, detecta quebras cedo após deploys. |

Na trilha, o Bruno entra **antes** da automação: você monta e valida a requisição na interface; quando o cenário estiver claro, reproduz em código com Playwright.

---

## Conceitos que aparecem ao longo do módulo

Independente da ferramenta, estes tópicos voltam em quase todo teste de API:

| Conceito | O que significa em QA |
| --- | --- |
| **Métodos HTTP** | GET (consultar), POST (criar), PUT/PATCH (atualizar), DELETE (remover). |
| **Status code** | Código numérico da resposta — `200` sucesso, `201` criado, `400` erro do cliente, `401` não autenticado, `404` não encontrado, `500` erro no servidor. |
| **Headers** | Metadados da requisição e da resposta — `Content-Type`, `Authorization`, tokens. |
| **Body (corpo)** | Payload enviado ou recebido, em geral **JSON** — objetos e arrays que você já viu nos fundamentos. |
| **Query string** | Parâmetros na URL (`?pagina=1&limite=10`) para filtros e paginação. |
| **Autenticação** | Como provar identidade — API key, Bearer token, login com sessão, etc. |

---

## Sumário do módulo

| Conteúdo | O que você vai trabalhar |
| --- | --- |
| [Estrutura da requisição e resposta](./estrutura-da-requisicao.md) | Anatomia do request e response — URL, parâmetros, headers, body, Content-Type (JSON e form-data). |
| [Requisições GET](./requisicoes-get.md) | Consultar recursos, query string, status codes e exemplos manuais (Bruno) e automatizados (Playwright). |
| [Requisições POST](./requisicoes-post.md) | Criar recursos, enviar body JSON e validar respostas de criação. |
| [Requisições PUT](./requisicoes-put.md) | Atualizar ou substituir um recurso por completo. |
| [Requisições PATCH](./requisicoes-patch.md) | Atualizar apenas parte dos campos de um recurso. |
| [Requisições DELETE](./requisicoes-delete.md) | Remover recursos e validar respostas de exclusão. |
| [Headers e autenticação](./headers-e-autenticacao.md) | Configurar headers, tokens e fluxos de login para acessar endpoints protegidos. |

Novos tópicos serão adicionados conforme a trilha avança — por exemplo validação de schema, testes de contrato e integração com CI.

---

## Pré-requisitos

Antes de começar este módulo, confira se você já concluiu:

| Pré-requisito | Onde conferir |
| --- | --- |
| **Fundamentos de JavaScript** | Módulo [Fundamentos e lógica de programação](../fundamentos/visao-geral.md) — especialmente objetos, arrays e funções. |
| **Ambiente configurado** | Módulo [Ambiente de automação](../ambiente-automacao/visao-geral.md) — Node.js, VS Code, Git e **Bruno** instalados. |
| **Comandos básicos no terminal** | `node --version`, `npm --version` e `git --version` funcionando sem erro. |

> **Bruno:** se ainda não instalou, siga **[Instalação do Bruno](../ambiente-automacao/instalacao-bruno.md)** antes das primeiras práticas manuais.

---

## Como estudar este bloco

1. Leia esta visão geral para entender as duas frentes — manual e automatizada.
2. Tenha o **Bruno** aberto ao lado do material: explore cada endpoint manualmente antes de ver o código automatizado.
3. Siga a ordem da sidebar: **Estrutura da requisição** → métodos HTTP (**GET** → **POST** → **PUT** → **PATCH** → **DELETE**) → **Headers e autenticação**.
4. Repita os cenários no Bruno e depois no Playwright — comparar as duas abordagens fixa o aprendizado.

Quando terminar os tópicos iniciais deste módulo, o próximo passo natural na trilha é **Fundamentos Web** e, em seguida, **Automação Web com Playwright** — reutilizando a mesma ferramenta em outro contexto (navegador).
