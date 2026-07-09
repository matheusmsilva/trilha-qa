---
title: Requisições POST
description: Criar recursos via HTTP POST — body JSON, Content-Type, status codes e exemplos no Bruno e Playwright.
---

# Requisições POST

O método **POST** serve para **enviar dados** ao servidor e, na maioria das APIs REST, **criar um novo recurso** — cadastrar usuário, abrir pedido, publicar post. Diferente do GET, o POST quase sempre carrega um **body** no request.

Nesta página você vai ver:

1. O que caracteriza um POST e quando usá-lo em testes.
2. Como montar o **body JSON** e o header `Content-Type`.
3. Status codes comuns em respostas POST.
4. O que validar na resposta (incluindo eco dos dados enviados).
5. Exemplos manuais no **Bruno** e automatizados com **Playwright**.

> **Antes desta página:** leia **[Estrutura da requisição e resposta](./estrutura-da-requisicao.md)** — especialmente a seção sobre **body** e **Content-Type** (JSON e form-data).

> **Página anterior:** em **[Requisições GET](./requisicoes-get.md)** você consultou recursos sem enviar body. Agora invertemos o fluxo: você **envia** payload e valida o que a API devolve.

> **API de prática:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para criação de posts e [ReqRes](https://reqres.in/) para cenários de registro e validação de erro.

---

## O que é um POST?

| Característica | Significado para o QA |
| --- | --- |
| **Envia dados** | O body carrega o payload — em geral JSON com os campos do recurso. |
| **Cria ou dispara ação** | Criar recurso (`POST /posts`), login (`POST /login`), upload (`POST /documentos`). |
| **Não é idempotente** | Repetir o mesmo POST pode criar **duplicatas** — importante em testes de regressão. |
| **Exige Content-Type** | O servidor precisa saber como ler o body — `application/json` na maioria dos casos. |

Em resumo: POST responde à pergunta **“crie isto”** ou **“processe estes dados”**.

---

## Quando usar POST em testes

| Cenário | Exemplo de endpoint |
| --- | --- |
| Criar recurso | `POST /posts` — novo post com `title` e `body` |
| Cadastro / onboarding | `POST /usuarios` — nome, e-mail, senha |
| Login | `POST /auth/login` — credenciais → token |
| Ação de negócio | `POST /pedidos/42/cancelar` — disparar cancelamento |
| Upload de arquivo | `POST /anexos` — body `multipart/form-data` |
| Setup de massa | Criar dados via POST antes de testar GET/PUT/DELETE |

POST é central em fluxos end-to-end: muitos testes começam criando um recurso e depois consultam ou alteram com outros métodos.

---

## Body e Content-Type

Em APIs REST modernas, o POST envia **JSON** no body. O header obrigatório:

```text
Content-Type: application/json
```

Exemplo de payload para criar um post:

```json
{
  "userId": 1,
  "title": "Cenário de teste — login válido",
  "body": "Descrição do caso de teste para documentação da API."
}
```

| Campo no Bruno | Equivalente no Playwright |
| --- | --- |
| Aba **Body** → **JSON** | `data: { ... }` ou `json: { ... }` na opção do `post()` |
| Header `Content-Type: application/json` | Definido automaticamente ao usar `json:`; com `data:`, o Playwright serializa e define o header |

> **Form-data:** uploads e formulários com arquivo usam `multipart/form-data`. O foco desta página é JSON — detalhes em **[Estrutura da requisição e resposta](./estrutura-da-requisicao.md#content-type-json-e-form-data)**.

---

## Status codes comuns em POST

| Code | Significado | Quando esperar |
| --- | --- | --- |
| **201 Created** | Recurso criado com sucesso | Padrão em `POST` de criação — body traz o recurso ou o `id` gerado |
| **200 OK** | Sucesso, mas sem convenção de “criado” | Algumas APIs retornam `200` em vez de `201` (login, ações) |
| **400 Bad Request** | Payload inválido ou malformado | JSON quebrado, campo com tipo errado |
| **401 Unauthorized** | Sem autenticação | Token ausente ou expirado |
| **403 Forbidden** | Sem permissão para criar | Role insuficiente |
| **409 Conflict** | Conflito — recurso já existe | E-mail duplicado, SKU repetido |
| **422 Unprocessable Entity** | JSON válido, mas regra de negócio falhou | Campo obrigatório ausente, valor fora do permitido |
| **500 Internal Server Error** | Falha no servidor | Bug — investigar logs |

Em criação bem-sucedida, confira se a API retorna **`201`** (ou `200`, conforme contrato) e se o body traz o **`id`** gerado ou os dados persistidos.

---

## O que validar em um teste POST

Checklist mental:

| O que validar | Exemplos |
| --- | --- |
| **Status code** | `201` após criação; `400`/`422` em cenário negativo |
| **Header `Location`** | Algumas APIs devolvem URL do recurso criado em `Location` |
| **Eco dos dados enviados** | `title` e `body` na resposta batem com o request |
| **Campos gerados pelo servidor** | `id`, `criadoEm`, `updatedAt` presentes e com tipo correto |
| **Mensagem de erro estruturada** | Em falha: `mensagem`, `campos`, `codigo` — útil para o front |
| **Efeito colateral** | Após POST, um GET no novo `id` retorna o recurso? (em API real) |

A JSONPlaceholder **simula** criação (não persiste de verdade), mas a resposta segue o formato esperado — ótima para treinar validações.

---

## POST no Bruno (teste manual)

Na sua coleção Bruno, crie uma pasta `POST` para organizar os cenários.

### Cenário 1 — Criar post com JSON

1. **New Request** → nome: `criar-post`.
2. Método: **POST**.
3. URL:

```text
https://jsonplaceholder.typicode.com/posts
```

4. Aba **Headers** — confira (ou adicione):

| Name | Value |
| --- | --- |
| `Content-Type` | `application/json` |

5. Aba **Body** → selecione **JSON** e preencha:

```json
{
  "userId": 1,
  "title": "Cenário de teste — login válido",
  "body": "Validar autenticação com credenciais corretas e token JWT na resposta."
}
```

6. Clique em **Send**.

**O que observar na resposta:**

- Status: **201 Created**
- Body: objeto com os campos enviados + `id` gerado (JSONPlaceholder retorna `id: 101`)
- Campos `title` e `body` devem **igualar** o que você enviou

Exemplo de resposta:

```json
{
  "userId": 1,
  "id": 101,
  "title": "Cenário de teste — login válido",
  "body": "Validar autenticação com credenciais corretas e token JWT na resposta."
}
```

### Cenário 2 — Registro com sucesso (ReqRes)

1. Nova requisição: `criar-usuario-reqres`.
2. Método: **POST**.
3. URL:

```text
https://reqres.in/api/users
```

4. Body **JSON**:

```json
{
  "name": "Ana QA",
  "job": "Analista de testes"
}
```

5. **Send**.

**O que observar:**

- Status: **201**
- Body com `name`, `job` ecoados e campos gerados como `id` e `createdAt`

```json
{
  "name": "Ana QA",
  "job": "Analista de testes",
  "id": "497",
  "createdAt": "2026-03-15T12:00:00.000Z"
}
```

O valor de `id` e `createdAt` muda a cada chamada — valide **presença e tipo**, não o valor exato.

### Cenário 3 — Campo obrigatório ausente (erro 400)

1. Nova requisição: `registro-sem-senha`.
2. Método: **POST**.
3. URL:

```text
https://reqres.in/api/register
```

4. Body **JSON** — envie só o e-mail, **sem** senha:

```json
{
  "email": "ana.qa@exemplo.com"
}
```

5. **Send**.

**O que observar:**

- Status: **400 Bad Request**
- Body com mensagem de erro — em APIs reais, isso orienta o usuário no formulário

Esse tipo de cenário negativo é tão importante quanto o happy path: valida se a API **rejeita** dados incompletos antes de persistir.

### Cenário 4 — JSON malformado

1. Na requisição `criar-post`, na aba Body, troque temporariamente o JSON para texto inválido:

```json
{
  "userId": 1,
  "title": "teste"
  "body": "faltou vírgula acima"
}
```

2. **Send**.

**O que observar:**

APIs reais retornam **400** com mensagem de parse error. A JSONPlaceholder pode ser permissiva — use este exercício para entender que **sintaxe JSON incorreta** quebra o request antes da validação de negócio.

---

## POST com Playwright (automação)

### Cenário 1 — Criar post e validar 201

```js
import { test, expect } from "@playwright/test";

test("POST /posts — deve criar post e retornar 201", async ({ request }) => {
  const payload = {
    userId: 1,
    title: "Cenário automatizado — criar post",
    body: "Payload enviado pelo Playwright para validar criação.",
  };

  const response = await request.post("https://jsonplaceholder.typicode.com/posts", {
    data: payload,
  });

  expect(response.status()).toBe(201);

  const corpo = await response.json();

  expect(corpo).toMatchObject(payload);
  expect(corpo.id).toBeDefined();
  expect(typeof corpo.id).toBe("number");
});
```

### Cenário 2 — Usar `json` (atalho recomendado)

O parâmetro `json` serializa o objeto e define `Content-Type: application/json` automaticamente:

```js
import { test, expect } from "@playwright/test";

test("POST /users — deve criar usuário na ReqRes", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/users", {
    json: {
      name: "Carlos QA",
      job: "SDET",
    },
  });

  expect(response.status()).toBe(201);

  const usuario = await response.json();

  expect(usuario.name).toBe("Carlos QA");
  expect(usuario.job).toBe("SDET");
  expect(usuario.id).toBeDefined();
  expect(usuario.createdAt).toBeDefined();
});
```

### Cenário 3 — Cenário negativo (campo obrigatório ausente)

```js
import { test, expect } from "@playwright/test";

test("POST /register — deve retornar 400 sem senha", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/register", {
    json: {
      email: "ana.qa@exemplo.com",
    },
  });

  expect(response.status()).toBe(400);

  const erro = await response.json();
  expect(erro).toHaveProperty("error");
});
```

### Cenário 4 — Guardar id criado para usar em outro teste

Padrão comum: POST cria massa → GET ou PUT usa o `id` retornado.

```js
import { test, expect } from "@playwright/test";

test("POST + GET — criar post e consultar pelo id retornado", async ({ request }) => {
  const criar = await request.post("https://jsonplaceholder.typicode.com/posts", {
    json: {
      userId: 1,
      title: "Post para encadear testes",
      body: "Massa criada no POST será usada no GET.",
    },
  });

  expect(criar.status()).toBe(201);

  const { id, title } = await criar.json();

  const consultar = await request.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

  // JSONPlaceholder não persiste de verdade — GET /posts/101 retorna dados fixos.
  // Em APIs reais, este GET validaria que o recurso foi gravado.
  expect(consultar.status()).toBe(200);

  const post = await consultar.json();
  expect(post.id).toBe(id);
});
```

> **Nota:** a JSONPlaceholder é fake — o GET após POST é **exercício de padrão**. Em projetos reais, esse encadeamento confirma persistência no banco.

### Organização sugerida dos testes

```text
tests/
└── api/
    ├── posts-get.spec.js
    └── posts-post.spec.js   # cenários POST de posts
```

Separe GET e POST em arquivos distintos; dentro do POST, agrupe happy path e cenários negativos.

---

## POST vs GET — comparativo rápido

| Aspecto | GET | POST |
| --- | --- | --- |
| **Intenção** | Consultar | Criar / enviar ação |
| **Body** | Em geral não tem | Quase sempre tem |
| **Parâmetros** | URL (path e query) | Body JSON (ou form-data) |
| **Status de sucesso** | `200` | `201` (criação) ou `200` |
| **Idempotência** | Sim | Não — cuidado com duplicatas |
| **Risco em produção** | Baixo (só leitura) | Alto — pode criar dados reais |

---

## Problemas comuns

### `400` mesmo com JSON “certo”

- Header `Content-Type` ausente ou incorreto (`text/plain`).
- Campo com tipo errado — string onde a API espera número.
- Campo com nome errado (`user_id` vs `userId`) — API ignora ou rejeita.

### `201` mas dados não aparecem no GET

- API retorna sucesso antes de commit assíncrono — teste flaky; adicione retry ou espere processamento.
- Ambiente errado — POST em homolog, GET em dev.
- JSONPlaceholder e APIs mock não persistem — não conclua que a API está quebrada sem testar ambiente real.

### Testes criam lixo no banco

Em ambientes compartilhados, POST de teste pode poluir dados. Estratégias:

- Usar prefixo no título (`[TESTE] ...`) e rotina de limpeza.
- Ambiente dedicado para automação.
- DELETE após o teste (quando a API permitir).

### Duplicata ao reexecutar o teste

POST não é idempotente. Rodar o mesmo teste duas vezes pode gerar dois registros — em APIs reais, valide `409 Conflict` ou use idempotency key se o contrato previr.

### Confundir `data` e `json` no Playwright

- `json:` — objeto JavaScript → serializa e define `Content-Type: application/json`.
- `data:` — aceita objeto (vira JSON) ou string já serializada.
- Para POST com JSON, prefira **`json:`** — menos chance de esquecer o header.

---

## Resumo

| Tópico | Lembrete |
| --- | --- |
| **Propósito do POST** | Enviar dados — criar recurso ou disparar ação |
| **Body** | JSON na maioria dos casos |
| **Header** | `Content-Type: application/json` |
| **Status de criação** | `201 Created` (ou `200` conforme contrato) |
| **Validar** | Status + eco do payload + `id` gerado |
| **Cenário negativo** | `400` / `422` com mensagem clara |
| **Bruno** | Body → JSON + Send |
| **Playwright** | `request.post(url, { json: payload })` |

---

## Prática

No Bruno, crie na pasta `POST`:

1. `criar-post` — POST com `userId`, `title` e `body` na JSONPlaceholder.
2. `criar-usuario-reqres` — POST com `name` e `job`.
3. `registro-sem-senha` — POST em `/register` sem senha → esperar `400`.

No Playwright, em `posts-post.spec.js`:

1. Automatize a criação de post e valide `201` + campos ecoados.
2. Automatize o registro sem senha e valide `400` + propriedade `error`.

Quando estiver confortável com POST, avance para **[Requisições PUT](./requisicoes-put.md)** — atualizar um recurso por completo.
