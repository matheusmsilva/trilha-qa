---
title: Estrutura da requisição e resposta
description: Anatomia de um teste de API — request, response, parâmetros, headers, body e Content-Type.
---

# Estrutura da requisição e resposta

Antes de mergulhar nos métodos HTTP (GET, POST, PUT…), vale entender **como uma requisição e uma resposta são montadas**. Esse vocabulário aparece no Bruno, no Playwright e em qualquer ferramenta de teste de API.

Nesta página você vai ver:

1. As partes de uma **requisição** (request).
2. As partes de uma **resposta** (response).
3. Onde entram **parâmetros**, **headers** e **body**.
4. Os **Content-Types** mais comuns em testes — com foco em **JSON** e **form-data**.

> **Pré-requisito:** módulo [Fundamentos](../fundamentos/visao-geral.md) — especialmente [Objetos](../fundamentos/objetos.md) e [Arrays](../fundamentos/arrays.md), que aparecem o tempo todo em payloads JSON.

---

## Visão geral: request e response

Toda interação com uma API segue o mesmo fluxo:

```text
Cliente (Bruno / Playwright)  ──request──▶  Servidor (API)
Cliente (Bruno / Playwright)  ◀──response──  Servidor (API)
```

| Direção      | O que é                         | O que o QA valida                                                           |
| ------------ | ------------------------------- | --------------------------------------------------------------------------- |
| **Request**  | O que você **envia** para a API | URL correta, método certo, headers, body e parâmetros conforme o contrato.  |
| **Response** | O que a API **devolve**         | Status code, headers e corpo — dados, mensagens de erro, tempo de resposta. |

No Bruno, o painel de requisição fica à esquerda e a resposta à direita (ou abaixo). No Playwright, você monta o request em código e inspeciona o objeto de resposta retornado.

---

## Partes de uma requisição (request)

Uma requisição HTTP é composta por:

| Parte            | Obrigatório?              | Descrição                                                                       |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------- |
| **URL**          | Sim                       | Endereço do endpoint — protocolo, host, caminho e, opcionalmente, query string. |
| **Método HTTP**  | Sim                       | Ação desejada: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, etc.                    |
| **Headers**      | Não (mas quase sempre há) | Metadados — tipo de conteúdo, autenticação, idioma, etc.                        |
| **Body (corpo)** | Depende do método         | Dados enviados ao servidor — comum em POST, PUT e PATCH.                        |
| **Parâmetros**   | Depende do endpoint       | Dados na URL (path ou query) ou no body, conforme o desenho da API.             |

### URL e método

```text
GET https://api.exemplo.com/v1/usuarios/42?incluir=pedidos
│   │                        │           │        │
│   │                        │           │        └── query string (parâmetros na URL)
│   │                        │           └── path parameter (id do recurso)
│   │                        └── caminho do recurso
│   └── host da API
└── método HTTP
```

O **método** indica a intenção; a **URL** indica **onde** agir. Cada página deste módulo aprofunda um método — começando por [Requisições GET](./requisicoes-get.md).

### Parâmetros

Parâmetros são valores que a API usa para filtrar, identificar ou configurar a operação. Os tipos mais comuns:

| Tipo               | Onde fica            | Exemplo                                 | Uso típico                                   |
| ------------------ | -------------------- | --------------------------------------- | -------------------------------------------- |
| **Path parameter** | Segmento fixo da URL | `/usuarios/{id}` → `/usuarios/42`       | Identificar um recurso específico.           |
| **Query string**   | Após `?` na URL      | `?pagina=2&limite=20&status=ativo`      | Filtros, paginação, ordenação.               |
| **Body**           | Corpo da requisição  | `{ "nome": "Ana", "email": "ana@..." }` | Criar ou atualizar dados (POST, PUT, PATCH). |

> **Dica:** path e query aparecem na **barra de endereço**; body fica **separado** — no Bruno, na aba Body; no Playwright, no argumento `data` ou `json` da requisição.

### Headers

Headers são pares **nome: valor** que descrevem a requisição (ou a resposta). Alguns aparecem em quase todo teste:

| Header           | Exemplo                | Para que serve                                                                            |
| ---------------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| `Content-Type`   | `application/json`     | Informa o formato do **body** enviado.                                                    |
| `Accept`         | `application/json`     | Indica qual formato de resposta o cliente espera.                                         |
| `Authorization`  | `Bearer eyJhbGciOi...` | Credenciais — token, API key (ver [Headers e autenticação](./headers-e-autenticacao.md)). |
| `Content-Length` | `128`                  | Tamanho do body em bytes (muitas vezes definido automaticamente).                         |

Headers customizados também existem — por exemplo `X-Request-Id` para rastreio ou `X-Tenant-Id` em APIs multi-empresa.

### Body (corpo da requisição)

O body carrega o **payload** — os dados que você envia. Métodos como **GET** e **DELETE** em geral **não** têm body; **POST**, **PUT** e **PATCH** costumam ter.

O formato do body depende do header `Content-Type`. Os dois formatos mais relevantes para esta trilha:

### Content-Type: JSON e form-data

O header `Content-Type` diz ao servidor **como interpretar o body**. Confundir o tipo é uma das causas mais comuns de `400 Bad Request` em testes.

#### `application/json` (JSON)

Formato **padrão** em APIs REST modernas. O body é um texto em JSON — objetos e arrays que você já praticou nos fundamentos.

**Request:**

```http
POST /v1/usuarios HTTP/1.1
Host: api.exemplo.com
Content-Type: application/json

{
  "nome": "Ana Silva",
  "email": "ana@exemplo.com",
  "ativo": true
}
```

#### `multipart/form-data` (form-data)

Formato usado para **formulários** e, principalmente, **upload de arquivos**. O body é dividido em **partes** (campos + arquivos), cada uma com seu próprio cabeçalho interno.

**Request (conceitual):**

```http
POST /v1/documentos HTTP/1.1
Host: api.exemplo.com
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxk

------WebKitFormBoundary7MA4YWxk
Content-Disposition: form-data; name="titulo"

Contrato de serviço
------WebKitFormBoundary7MA4YWxk
Content-Disposition: form-data; name="arquivo"; filename="contrato.pdf"
Content-Type: application/pdf

(conteúdo binário do arquivo)
------WebKitFormBoundary7MA4YWxk--
```

**Quando usar em testes de API:**

- Upload de imagens, PDFs, planilhas.
- Endpoints que espelham formulário HTML (`<form enctype="multipart/form-data">`).
- APIs que misturam campos de texto e arquivo no mesmo POST.

No Bruno, use a opção **Multipart Form**. No Playwright, envie com `multipart` no `post()` — cada campo pode ser string ou buffer de arquivo.

### Outros Content-Types (referência rápida)

| Content-Type                        | Uso                              | Frequência em testes REST   |
| ----------------------------------- | -------------------------------- | --------------------------- |
| `application/json`                  | Objetos e listas estruturadas    | Muito alta                  |
| `multipart/form-data`               | Arquivos e campos de formulário  | Alta (uploads)              |
| `application/x-www-form-urlencoded` | Formulário simples (chave=valor) | Média (login legado, OAuth) |
| `text/plain`                        | Texto puro                       | Baixa                       |
| `application/xml`                   | Payload em XML                   | Baixa (APIs legadas)        |

Nesta trilha, **JSON** é o foco principal; **form-data** entra quando o cenário exige arquivo ou formulário multipart.

---

## Partes de uma resposta (response)

Depois que o servidor processa o request, você recebe uma **response** com três blocos principais:

| Parte           | O que observar em QA                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| **Status code** | Resultado da operação — sucesso (`2xx`), erro do cliente (`4xx`), erro do servidor (`5xx`).           |
| **Headers**     | Metadados da resposta — `Content-Type` do body, cookies, cache, rate limit (`X-RateLimit-Remaining`). |
| **Body**        | Dados retornados — JSON com o recurso, lista paginada, ou mensagem de erro estruturada.               |

### Status code (visão rápida)

| Faixa | Significado                                             | Exemplos                                         |
| ----- | ------------------------------------------------------- | ------------------------------------------------ |
| `2xx` | Sucesso                                                 | `200 OK`, `201 Created`, `204 No Content`        |
| `3xx` | Redirecionamento                                        | `301`, `302` — menos comum em testes de API REST |
| `4xx` | Erro do **cliente** (request inválido ou sem permissão) | `400`, `401`, `403`, `404`, `422`                |
| `5xx` | Erro do **servidor**                                    | `500`, `502`, `503`                              |

Cada método HTTP tem status codes **esperados** — por exemplo, POST de criação costuma retornar `201`; DELETE bem-sucedido pode retornar `204` sem body.

### Body da resposta

Assim como no request, o `Content-Type` da resposta indica o formato. Na maioria das APIs REST:

```json
{
  "id": 42,
  "nome": "Ana Silva",
  "email": "ana@exemplo.com",
  "criadoEm": "2026-03-15T10:30:00Z"
}
```

Em cenários de **erro**, o body pode trazer detalhes para o QA validar:

```json
{
  "erro": "validacao_falhou",
  "mensagem": "E-mail já cadastrado",
  "campos": ["email"]
}
```

Validar **só** o status code costuma ser insuficiente — em testes sólidos, confira também campos do JSON, tipos e mensagens de erro.

---

## Como isso aparece no Bruno e no Playwright

| Conceito       | Bruno                          | Playwright                                                   |
| -------------- | ------------------------------ | ------------------------------------------------------------ |
| URL + método   | Barra superior da requisição   | `request.get(url)`, `.post(url)`, etc.                       |
| Query / path   | Editados na URL ou aba Params  | URL montada com template ou string                           |
| Headers        | Aba **Headers**                | `headers: { ... }` na opção da requisição                    |
| Body JSON      | Aba **Body** → JSON            | `data: { ... }` ou `json: { ... }`                           |
| Body form-data | Aba **Body** → Multipart Form  | `multipart: { ... }`                                         |
| Response       | Painel à direita após **Send** | `response.status()`, `response.json()`, `response.headers()` |

Os exemplos práticos em cada método HTTP reutilizam esta estrutura — a diferença está na **combinação** de método, parâmetros, headers e body.

---

## Resumo

| Parte do request | Função                                                     |
| ---------------- | ---------------------------------------------------------- |
| URL + método     | Onde e **o quê** fazer                                     |
| Path / query     | Identificar recurso ou filtrar                             |
| Headers          | Metadados — especialmente `Content-Type` e `Authorization` |
| Body             | Payload — JSON (padrão) ou form-data (uploads)             |

| Parte do response | Função                              |
| ----------------- | ----------------------------------- |
| Status code       | Sucesso ou tipo de falha            |
| Headers           | Formato e metadados da resposta     |
| Body              | Dados ou mensagem de erro a validar |

Com essa base, avance para os métodos HTTP na ordem da sidebar — começando por **[Requisições GET](./requisicoes-get.md)**.
