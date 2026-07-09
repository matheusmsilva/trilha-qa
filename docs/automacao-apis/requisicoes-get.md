---
title: Requisições GET
description: Consultar recursos via HTTP GET — query string, path parameters, validações e exemplos no Bruno e Playwright.
---

# Requisições GET

O método **GET** é o mais usado em testes de API: serve para **consultar** dados sem alterar nada no servidor. Listar usuários, buscar um pedido por ID, filtrar resultados por status — quase todo fluxo de QA começa com um GET para entender o que a API devolve.

Nesta página você vai ver:

1. O que caracteriza um GET e quando usá-lo em testes.
2. **Path parameters** e **query string** na prática.
3. Status codes comuns em respostas GET.
4. O que validar na resposta (status, headers, body).
5. Exemplos manuais no **Bruno** e automatizados com **Playwright**.

> **Antes desta página:** leia **[Estrutura da requisição e resposta](./estrutura-da-requisicao.md)** para entender como request e response se organizam.

> **API de prática:** usaremos a [JSONPlaceholder](https://jsonplaceholder.typicode.com/) — API pública e estável, ideal para exercícios. Você também pode replicar os cenários em APIs da sua empresa quando tiver acesso.

---

## O que é um GET?

| Característica | Significado para o QA |
| --- | --- |
| **Somente leitura** | Não cria, altera nem remove dados no servidor. |
| **Sem body** | O request em geral não envia corpo — os dados vão na **URL** (path ou query). |
| **Idempotente** | Chamar o mesmo GET várias vezes produz o mesmo efeito (não muda estado). |
| **Cacheável** | Respostas podem ser armazenadas em cache — relevante em testes de performance, menos em testes funcionais. |

Em resumo: GET responde à pergunta **“o que existe?”** ou **“me traga este recurso”**.

---

## Quando usar GET em testes

| Cenário | Exemplo de endpoint |
| --- | --- |
| Listar recursos | `GET /posts` — todos os posts |
| Buscar um recurso por ID | `GET /posts/1` — post com id 1 |
| Filtrar resultados | `GET /posts?userId=1` — posts do usuário 1 |
| Paginar | `GET /posts?_page=2&_limit=10` |
| Health check | `GET /health` — API está no ar? |
| Smoke após deploy | `GET /v1/usuarios/me` com token válido |

GET é o primeiro método a testar em uma API nova: se a consulta básica falha, POST e PUT provavelmente também terão problemas de infraestrutura ou autenticação.

---

## Path parameter vs query string

### Path parameter — identificar **um** recurso

O ID (ou slug) faz parte do caminho da URL:

```text
GET https://jsonplaceholder.typicode.com/posts/1
                                        └── path parameter (id = 1)
```

A API devolve **um objeto** — o recurso correspondente àquele identificador.

### Query string — filtrar, paginar, ordenar

Parâmetros opcionais após `?`, separados por `&`:

```text
GET https://jsonplaceholder.typicode.com/posts?userId=1
                                               └── query string
```

A API devolve uma **lista** (ou subconjunto) conforme os filtros.

| Tipo | Posição | Pergunta que responde |
| --- | --- | --- |
| **Path** | `/recurso/{id}` | “Me dê **este** item.” |
| **Query** | `?campo=valor` | “Me dê itens **que atendem** a estes critérios.” |

---

## Status codes comuns em GET

| Code | Significado | Quando esperar |
| --- | --- | --- |
| **200 OK** | Sucesso — recurso encontrado ou lista retornada | GET de item existente ou listagem |
| **204 No Content** | Sucesso — sem body na resposta | Menos comum em GET; alguns endpoints de verificação |
| **400 Bad Request** | Parâmetro inválido na URL ou query malformada | `?pagina=abc` quando espera número |
| **401 Unauthorized** | Falta autenticação | Endpoint protegido sem token |
| **403 Forbidden** | Autenticado, mas sem permissão | Usuário sem role para o recurso |
| **404 Not Found** | Recurso não existe | `GET /posts/999999` em API real |
| **500 Internal Server Error** | Falha no servidor | Bug ou instabilidade — escalar para dev |

Em testes sólidos, valide o status **e** o conteúdo do body. Um `200` com JSON vazio ou campos errados ainda é falha de negócio.

---

## O que validar em um teste GET

Checklist mental para cada cenário:

| O que validar | Exemplos |
| --- | --- |
| **Status code** | `200` para sucesso, `404` para id inexistente |
| **Content-Type** | `application/json; charset=utf-8` |
| **Estrutura do JSON** | Objeto vs array; campos obrigatórios presentes |
| **Tipos dos campos** | `id` é número, `title` é string, `ativo` é boolean |
| **Valores de negócio** | `userId` do filtro bate com o pedido; lista não vazia |
| **Quantidade** | `length` da lista; paginação retorna no máximo `_limit` itens |
| **Tempo de resposta** | Opcional em smoke — alerta se passar de um limite aceitável |

---

## GET no Bruno (teste manual)

Abra o Bruno e use a coleção que você criou em **[Instalação do Bruno](../ambiente-automacao/instalacao-bruno.md)**. Crie uma pasta `GET` dentro da coleção para organizar os cenários.

### Cenário 1 — Listar todos os posts

1. **New Request** → nome: `listar-posts`.
2. Método: **GET**.
3. URL:

```text
https://jsonplaceholder.typicode.com/posts
```

4. Clique em **Send**.

**O que observar na resposta:**

- Status: **200**
- Body: **array** JSON com vários objetos
- Cada objeto deve ter campos como `userId`, `id`, `title`, `body`

Exemplo de um item da lista:

```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
```

### Cenário 2 — Buscar um post por ID (path parameter)

1. Nova requisição: `buscar-post-por-id`.
2. Método: **GET**.
3. URL:

```text
https://jsonplaceholder.typicode.com/posts/1
```

4. **Send**.

**O que observar:**

- Status: **200**
- Body: **um objeto** (não array)
- Campo `id` deve ser **1**

### Cenário 3 — Filtrar posts por userId (query string)

1. Nova requisição: `filtrar-posts-por-usuario`.
2. Método: **GET**.
3. URL:

```text
https://jsonplaceholder.typicode.com/posts?userId=1
```

No Bruno, você também pode preencher na aba **Params**:

| Name | Value |
| --- | --- |
| `userId` | `1` |

4. **Send**.

**O que observar:**

- Status: **200**
- Body: array em que **todos** os itens têm `userId: 1`
- Role os olhos em 3–5 itens — se algum tiver `userId` diferente, o filtro da API está errado

### Cenário 4 — Recurso inexistente (404)

A JSONPlaceholder é permissiva e nem sempre simula erros realistas. Para praticar **404**, use a API [ReqRes](https://reqres.in/):

1. Nova requisição: `usuario-inexistente`.
2. Método: **GET**.
3. URL:

```text
https://reqres.in/api/users/23
```

4. **Send**.

**O que observar:**

- Status: **404**
- Body com mensagem de erro — em APIs reais, isso ajuda o suporte e o front a exibir feedback correto

> **Dica:** salve variáveis de ambiente no Bruno (`baseUrl`) para não repetir o host em cada requisição — veremos isso com mais detalhe em **[Headers e autenticação](./headers-e-autenticacao.md)**.

---

## GET com Playwright (automação)

No Playwright, o fixture `request` expõe um **APIRequestContext** — o mesmo conceito de cliente HTTP, agora em código executável na suíte de testes.

Os exemplos abaixo assumem um projeto Playwright com `@playwright/test` instalado. A estrutura mínima de um arquivo de teste:

```js
import { test, expect } from "@playwright/test";

test("descrição do cenário", async ({ request }) => {
  const response = await request.get("https://jsonplaceholder.typicode.com/posts/1");
  expect(response.status()).toBe(200);
});
```

### Cenário 1 — Listar posts e validar array

```js
import { test, expect } from "@playwright/test";

test("GET /posts — deve retornar lista de posts", async ({ request }) => {
  const response = await request.get("https://jsonplaceholder.typicode.com/posts");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/json");

  const posts = await response.json();

  expect(Array.isArray(posts)).toBe(true);
  expect(posts.length).toBeGreaterThan(0);

  const primeiro = posts[0];
  expect(primeiro).toHaveProperty("id");
  expect(primeiro).toHaveProperty("title");
  expect(primeiro).toHaveProperty("body");
  expect(primeiro).toHaveProperty("userId");
});
```

### Cenário 2 — Buscar post por ID

```js
import { test, expect } from "@playwright/test";

test("GET /posts/1 — deve retornar post com id 1", async ({ request }) => {
  const response = await request.get("https://jsonplaceholder.typicode.com/posts/1");

  expect(response.status()).toBe(200);

  const post = await response.json();

  expect(post.id).toBe(1);
  expect(typeof post.title).toBe("string");
  expect(post.title.length).toBeGreaterThan(0);
});
```

### Cenário 3 — Query string com `params`

Em vez de montar a URL manualmente, use o objeto `params` — o Playwright monta a query string para você:

```js
import { test, expect } from "@playwright/test";

test("GET /posts?userId=1 — deve filtrar por usuário", async ({ request }) => {
  const response = await request.get("https://jsonplaceholder.typicode.com/posts", {
    params: { userId: "1" },
  });

  expect(response.status()).toBe(200);

  const posts = await response.json();

  expect(posts.length).toBeGreaterThan(0);
  expect(posts.every((post) => post.userId === 1)).toBe(true);
});
```

### Cenário 4 — Validar 404

```js
import { test, expect } from "@playwright/test";

test("GET /users/23 — deve retornar 404 para usuário inexistente", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/23");

  expect(response.status()).toBe(404);
});
```

### Cenário 5 — Extrair header e tempo (smoke)

```js
import { test, expect } from "@playwright/test";

test("GET /posts/1 — smoke com tempo de resposta aceitável", async ({ request }) => {
  const inicio = Date.now();

  const response = await request.get("https://jsonplaceholder.typicode.com/posts/1");

  const duracaoMs = Date.now() - inicio;

  expect(response.status()).toBe(200);
  expect(duracaoMs).toBeLessThan(3000); // ajuste o limite conforme SLA da sua API
});
```

### Organização sugerida dos testes

```text
tests/
└── api/
    └── posts-get.spec.js   # cenários GET de posts
```

Mantenha **um arquivo por recurso ou fluxo** e nomeie os testes de forma legível — o relatório do Playwright vira documentação viva dos cenários.

---

## GET manual vs GET automatizado

| Aspecto | Bruno (manual) | Playwright (automático) |
| --- | --- | --- |
| **Velocidade para explorar** | Excelente — monta e envia em segundos | Exige escrever código primeiro |
| **Repetibilidade** | Depende de quem clica Send | Roda igual em toda execução e no CI |
| **Validação** | Visual — você inspeciona o JSON | `expect` — falha o build se quebrar |
| **Fluxo recomendado** | Explorar e entender a API | Fixar cenários de regressão e smoke |

Na trilha: explore no Bruno → quando o cenário estiver claro, porte para Playwright.

---

## Problemas comuns

### GET retorna HTML em vez de JSON

Geralmente a URL está errada (caiu em página de erro do gateway) ou falta header `Accept: application/json`. Confira a URL e os headers no Bruno.

### Query string não filtra

- Nome do parâmetro pode estar errado (`user_id` vs `userId`).
- API pode exigir encoding — espaços viram `%20`.
- Algumas APIs ignoram parâmetros desconhecidos em vez de retornar 400 — compare o resultado com e sem filtro.

### `200` com body vazio ou incompleto

Status de sucesso não garante contrato correto. Valide campos obrigatórios e tipos — especialmente após mudanças de versão da API.

### Teste flaky por dados dinâmicos

APIs com dados que mudam o tempo todo (estoque, saldo) exigem setup antes do GET (criar massa via POST) ou mocks. GET sozinho em ambiente compartilhado pode gerar falsos negativos.

### CORS no navegador vs Bruno/Playwright

Erros de CORS aparecem no **front no browser**, não no Bruno nem no Playwright — essas ferramentas chamam a API direto, como um backend faria.

---

## Resumo

| Tópico | Lembrete |
| --- | --- |
| **Propósito do GET** | Consultar — sem alterar dados |
| **Path parameter** | `/posts/1` — um recurso |
| **Query string** | `?userId=1` — filtro, paginação |
| **Status de sucesso** | `200` (com body) ou `204` (sem body) |
| **Validar** | Status + estrutura JSON + regras de negócio |
| **Bruno** | Explorar e montar coleção |
| **Playwright** | `request.get(url)` + `expect(response.status())` |

---

## Prática

No Bruno, crie na sua coleção:

1. `listar-posts` — GET sem parâmetros.
2. `buscar-post-por-id` — GET com path `posts/1`.
3. `filtrar-posts-por-usuario` — GET com query `userId=1`.
4. `usuario-inexistente` — GET em ReqRes que retorna 404.

Depois, replique os cenários 1 a 3 em um arquivo Playwright `posts-get.spec.js`.

Quando estiver confortável com GET, avance para **[Requisições POST](./requisicoes-post.md)** — criar recursos e enviar body JSON.
