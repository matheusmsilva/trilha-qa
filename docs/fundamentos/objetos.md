---
title: Objetos
description: "Objetos em JavaScript para automação: propriedades aninhadas, tipos mistos, acesso, métodos comuns e exemplos de payloads de API."
---

# Objetos em JavaScript

Respostas de API, massas de teste, configurações de ambiente — na automação, boa parte dos dados chega como **objeto**: um conjunto de **propriedades** (chave + valor) agrupadas sob um mesmo nome. Entender objetos é essencial para **ler JSON**, **montar payloads** e **validar** o que o sistema devolveu.

Nesta página você vai ver, em ordem:

1. O que é um objeto e como criá-lo.
2. Formas de **acessar** propriedades (incluindo objetos aninhados).
3. Um exemplo **completo**, com vários tipos de dados e níveis de profundidade.
4. **Desestruturação** — extrair propriedades em variáveis, inclusive aninhadas.
5. Como **alterar**, **adicionar** e **remover** propriedades.
6. **Funções e métodos comuns** ao trabalhar com objetos (`Object.keys`, spread, `JSON.stringify`, etc.).
7. Exemplos aplicados ao contexto de **QA e APIs**.

---

## Palavras que vamos usar

| Termo | Significado em uma frase |
| --- | --- |
| **Objeto** | Estrutura `{ chave: valor }` que agrupa dados relacionados. |
| **Propriedade** | Par **chave → valor** dentro do objeto (`nome: "Ana"`). |
| **Chave** | Nome da propriedade (string, ou symbol em casos avançados). |
| **Valor** | O que está guardado — pode ser string, número, boolean, array, outro objeto, função, etc. |
| **Aninhado** | Objeto dentro de objeto (ou array dentro de objeto), formando **níveis**. |
| **Notação de ponto** | Acesso com `.` → `usuario.email`. |
| **Notação de colchetes** | Acesso com `[]` → `usuario["email"]` ou chave dinâmica. |

> **Objeto ≠ JSON:** JSON é o **texto** que representa dados (como numa resposta HTTP). Em JavaScript, `JSON.parse()` transforma esse texto em **objeto**; `JSON.stringify()` faz o caminho inverso.

---

## Criando um objeto

A forma mais comum é o **objeto literal**, com chaves entre chaves `{ }`:

```js
const usuario = {
  id: 1,
  nome: "Ana Silva",
  ativo: true,
};

console.log(usuario);
// { id: 1, nome: 'Ana Silva', ativo: true }
```

Cada linha `chave: valor` é uma **propriedade**. Vírgulas separam propriedades; a última vírgula (trailing comma) é opcional e permitida.

---

## Acessando propriedades

### Notação de ponto

Use quando souber o nome fixo da propriedade e ele for um identificador válido (sem espaços, não começa com número):

```js
console.log(usuario.nome);   // Ana Silva
console.log(usuario.ativo);  // true
console.log(usuario.id);     // 1
```

### Notação de colchetes

Obrigatória quando a chave está em uma **variável**, tem **espaço** ou **caracteres especiais**:

```js
console.log(usuario["nome"]); // Ana Silva

const campo = "ativo";
console.log(usuario[campo]);   // true — chave dinâmica

const config = { "tempo-espera-ms": 5000 };
console.log(config["tempo-espera-ms"]); // 5000
```

### Propriedade inexistente

Se a chave não existir, o resultado é `undefined` — não dispara erro:

```js
console.log(usuario.email); // undefined
```

> **Cuidado em testes:** validar `undefined` vs string vazia `""` vs `null` são cenários diferentes. Em automação de API, confira sempre o que o contrato promete.

---

## Objeto completo: tipos mistos e vários níveis

O exemplo abaixo simula um **cenário de teste** com usuário, pedido e metadados — misturando string, número, boolean, `null`, array, objeto aninhado e até uma **função** (método):

```js
const cenarioLogin = {
  id: "CT-001",
  descricao: "Login com credenciais válidas",
  ativo: true,
  tentativasMaximas: 3,
  ultimoResultado: null,
  tags: ["smoke", "regressao", "api"],
  usuario: {
    id: 42,
    nome: "Carlos QA",
    email: "carlos.qa@exemplo.com",
    perfil: {
      role: "admin",
      permissoes: ["ler", "escrever", "executar"],
    },
  },
  request: {
    method: "POST",
    url: "/api/v1/auth/login",
    headers: {
      "Content-Type": "application/json",
      "X-Request-Id": "abc-123",
    },
    body: {
      username: "carlos.qa@exemplo.com",
      password: "senha-forte-123",
    },
  },
  respostaEsperada: {
    statusCode: 200,
    body: {
      token: "eyJhbGciOiJIUzI1NiIs...",
      expiresIn: 3600,
    },
  },
  executarValidacao() {
    return this.respostaEsperada.statusCode === 200;
  },
};
```

Tipos presentes neste único objeto:

| Propriedade | Tipo do valor |
| --- | --- |
| `id`, `descricao` | string |
| `ativo` | boolean |
| `tentativasMaximas`, `expiresIn` | number |
| `ultimoResultado` | `null` |
| `tags`, `permissoes` | array |
| `usuario`, `request`, `respostaEsperada` | objeto (aninhado) |
| `executarValidacao` | function (método do objeto) |

---

## Acessando propriedades aninhadas

Encadeie `.` ou combine colchetes para “entrar” nos níveis:

```js
// notação de ponto
console.log(cenarioLogin.usuario.nome);
// Carlos QA

console.log(cenarioLogin.usuario.perfil.role);
// admin

console.log(cenarioLogin.request.headers["Content-Type"]);
// application/json

console.log(cenarioLogin.respostaEsperada.body.token);
// eyJhbGciOiJIUzI1NiIs...

// primeiro item do array tags
console.log(cenarioLogin.tags[0]);
// smoke

// chave dinâmica em nível aninhado
const secao = "body";
console.log(cenarioLogin.request[secao].username);
// carlos.qa@exemplo.com
```

### Encadeamento opcional (`?.`)

Se um nível intermediário puder ser `null` ou `undefined`, use **optional chaining** para evitar erro:

```js
const parcial = { usuario: null };

console.log(parcial.usuario?.nome); // undefined (não quebra)
// parcial.usuario.nome → TypeError
```

Muito útil ao inspecionar respostas de API incompletas ou em fluxos de erro.

---

## Desestruturação de objetos

**Desestruturação** (_destructuring_) é uma sintaxe para **extrair** propriedades de um objeto e guardá-las em **variáveis** de uma só vez — em vez de repetir o nome do objeto a cada acesso.

### Sem desestruturação vs com desestruturação

Imagine que você precisa de três campos de `cenarioLogin`:

```js
// abordagem repetitiva — funciona, mas verbosa
const descricao = cenarioLogin.descricao;
const ativo = cenarioLogin.ativo;
const tentativas = cenarioLogin.tentativasMaximas;
```

Com desestruturação, o JavaScript “abre” o objeto e pega as chaves listadas entre `{ }`:

```js
const { descricao, ativo, tentativasMaximas } = cenarioLogin;

console.log(descricao);           // Login com credenciais válidas
console.log(ativo);               // true
console.log(tentativasMaximas);   // 3
```

As variáveis criadas **têm o mesmo nome** das propriedades. A linha acima é equivalente às três atribuições separadas.

### Como ler a sintaxe

```js
const { descricao, ativo } = cenarioLogin;
//    └─ chaves que você quer ─┘   └── objeto de origem ──┘
```

- À **esquerda** do `=`: lista de propriedades desejadas entre chaves.
- À **direita**: o objeto de onde os valores serão lidos.

### Renomear ao extrair (alias)

Quando o nome da propriedade não serve como variável — ou você quer um nome mais claro — use **`propriedade: novoNome`**:

```js
const { descricao: tituloDoCenario, id: codigoCenario } = cenarioLogin;

console.log(tituloDoCenario);  // Login com credenciais válidas
console.log(codigoCenario);    // CT-001

// descricao e id NÃO existem como variáveis aqui — só tituloDoCenario e codigoCenario
```

Útil quando a API devolve nomes genéricos (`id`, `name`) e você quer variáveis descritivas no teste (`codigoPedido`, `nomeCliente`).

### Valor padrão quando a propriedade não existe

Se a chave puder faltar, defina um **fallback** com `=`:

```js
const { observacao = "Sem observação" } = cenarioLogin;

console.log(observacao); // Sem observação — a propriedade não existia no objeto
```

Em testes, isso evita `undefined` quando o campo é opcional no contrato da API.

### Desestruturação aninhada

Para objetos dentro de objetos, **replique a forma** do dado na sintaxe:

```js
// equivalente manual:
// const email = cenarioLogin.usuario.email;
// const role = cenarioLogin.usuario.perfil.role;

const {
  usuario: {
    email,
    perfil: { role },
  },
} = cenarioLogin;

console.log(email); // carlos.qa@exemplo.com
console.log(role);  // admin
```

Leitura passo a passo:

1. Entre em `usuario` dentro de `cenarioLogin`.
2. De `usuario`, extraia `email` diretamente.
3. De `usuario`, entre em `perfil` e extraia `role`.

> **Atenção:** em `{ usuario: { email } }`, **`usuario` não vira variável** — só as propriedades “folha” listadas no final de cada ramo (`email`, `role`). Se precisar do subobjeto inteiro, extraia-o explicitamente: `{ usuario, usuario: { email } }` ou guarde em etapas.

### Extrair e renomear no mesmo nível aninhado

```js
const {
  request: {
    method: httpMethod,
    body: { username: login },
  },
  respostaEsperada: {
    statusCode: statusEsperado,
  },
} = cenarioLogin;

console.log(httpMethod, login, statusEsperado);
// POST carlos.qa@exemplo.com 200
```

Esse padrão aparece muito ao montar asserções: você pega só o que importa para o `expect`, com nomes legíveis.

### Desestruturação em parâmetros de função

Em automação, funções helper costumam receber objetos (resposta, massa, config). Desestruturar no parâmetro deixa o corpo limpo:

```js
function validarRespostaLogin({ statusCode, body: { token, expiresIn } }) {
  console.log("Status:", statusCode);
  console.log("Token recebido:", token ? "sim" : "não");
  console.log("Expira em (s):", expiresIn);
  return statusCode === 200 && token !== undefined;
}

validarRespostaLogin(cenarioLogin.respostaEsperada);
// Status: 200
// Token recebido: sim
// Expira em (s): 3600
```

Equivalente a acessar `argumento.statusCode`, `argumento.body.token`, etc., mas declarado **uma vez** na assinatura.

### Resto das propriedades (`...rest`)

Use **`...nome`** para agrupar o que **não** foi listado explicitamente:

```js
const { id, descricao, ...restante } = cenarioLogin;

console.log(id);          // CT-001
console.log(descricao);   // Login com credenciais válidas
console.log(Object.keys(restante));
// ['ativo', 'tentativasMaximas', 'ultimoResultado', 'tags', 'usuario', ...]
```

`restante` é um **novo objeto** com todas as propriedades que sobraram — útil para clonar parte de um payload ou separar campos fixos de campos variáveis.

### Exemplo aplicado: resposta de API

```js
const respostaApi = {
  statusCode: 200,
  body: {
    id: 9001,
    status: "aprovado",
    cliente: { nome: "Empresa XYZ", documento: "12.345.678/0001-99" },
    itens: [{ sku: "A1" }, { sku: "B2" }],
  },
};

const {
  statusCode,
  body: {
    status,
    cliente: { nome: nomeCliente },
    itens,
  },
} = respostaApi;

const statusOk = statusCode === 200;
const qtdItens = itens.length;

console.log(statusOk, status, nomeCliente, qtdItens);
// true aprovado Empresa XYZ 2
```

Compare com a cadeia `respostaApi.body.cliente.nome` repetida várias vezes — a desestruturação concentra a “navegação” no topo e deixa as validações mais legíveis.

### Quando usar desestruturação

| Situação | Vale a pena? |
| --- | --- |
| Pegar **1 ou 2** campos pontuais | Notação de ponto (`obj.campo`) costuma bastar. |
| Extrair **vários** campos do mesmo objeto | Desestruturação deixa o código mais curto. |
| Objetos **aninhados** (resposta de API) | Desestruturação aninhada evita repetição do prefixo. |
| Parâmetros de função que são objetos | Desestruturar na assinatura melhora leitura. |
| Propriedade pode **não existir** | Combine com valor padrão (`campo = "fallback"`). |

---

## Alterando, adicionando e removendo propriedades

Objetos declarados com `const` **podem ter propriedades alteradas** — o que `const` impede é trocar a referência do objeto inteiro.

```js
const pedido = { id: 10, status: "pendente" };

// atualizar
pedido.status = "aprovado";

// adicionar
pedido.observacao = "Prioridade alta";

// remover
delete pedido.observacao;

console.log(pedido);
// { id: 10, status: 'aprovado' }
```

Para objetos aninhados, acesse o nível correto antes de alterar:

```js
cenarioLogin.usuario.perfil.role = "qa";
cenarioLogin.request.body.password = "nova-senha-teste";
```

---

## Funções e métodos comuns com objetos

Estas são as operações que você mais vai usar em scripts e testes.

### `Object.keys(obj)` — lista as chaves

```js
console.log(Object.keys(cenarioLogin));
// ['id', 'descricao', 'ativo', 'tentativasMaximas', ...]

console.log(Object.keys(cenarioLogin.usuario));
// ['id', 'nome', 'email', 'perfil']
```

Útil para conferir se a resposta da API trouxe os campos esperados.

### `Object.values(obj)` — lista os valores

```js
console.log(Object.values(cenarioLogin.request.body));
// ['carlos.qa@exemplo.com', 'senha-forte-123']
```

### `Object.entries(obj)` — pares [chave, valor]

```js
for (const [chave, valor] of Object.entries(cenarioLogin.request.headers)) {
  console.log(`${chave}: ${valor}`);
}
```

Ideal para percorrer headers, query params ou qualquer mapa chave-valor.

### `Object.hasOwn(obj, "chave")` — a propriedade é do próprio objeto?

```js
console.log(Object.hasOwn(cenarioLogin, "descricao")); // true
console.log(Object.hasOwn(cenarioLogin, "token"));     // false
```

Diferente de `"token" in cenarioLogin`, que seria `false` no topo, mas `"body" in cenarioLogin.respostaEsperada` pode ser `true` em estruturas herdadas. Para testes do dia a dia, `Object.hasOwn` cobre a maioria dos casos.

### Spread `{ ...obj }` — copiar ou mesclar

```js
const defaults = { timeout: 5000, retries: 2 };
const ambienteHml = { ...defaults, baseUrl: "https://hml.api.exemplo.com" };

console.log(ambienteHml);
// { timeout: 5000, retries: 2, baseUrl: 'https://hml.api.exemplo.com' }

const overrides = { retries: 5 };
const configFinal = { ...defaults, ...overrides };
console.log(configFinal.retries); // 5 — o segundo objeto sobrescreve
```

Padrão comum para montar config de teste por ambiente sem mutar o objeto original.

### `Object.assign(destino, ...origens)` — mesclar em um alvo

```js
const base = { a: 1, b: 2 };
Object.assign(base, { b: 99, c: 3 });
console.log(base); // { a: 1, b: 99, c: 3 }
```

Preferível **spread** quando você quer um **novo** objeto imutável; `assign` altera o primeiro argumento.

### `JSON.stringify(obj)` e `JSON.parse(texto)`

Pontes entre objeto JavaScript e texto JSON (corpo de requisição/resposta):

```js
const payload = {
  username: "carlos.qa@exemplo.com",
  password: "senha-forte-123",
};

const jsonTexto = JSON.stringify(payload);
console.log(jsonTexto);
// {"username":"carlos.qa@exemplo.com","password":"senha-forte-123"}

const deVolta = JSON.parse(jsonTexto);
console.log(deVolta.username); // carlos.qa@exemplo.com
```

Com identação (útil para logs e debug):

```js
console.log(JSON.stringify(cenarioLogin, null, 2));
```

### Métodos do próprio objeto

Quando a propriedade é uma **função**, chame com o objeto como contexto:

```js
console.log(cenarioLogin.executarValidacao()); // true
```

Dentro do método, `this` referencia o objeto (`cenarioLogin`).

---

## Exemplo prático: validar campos de uma resposta

Simule uma resposta de API e extraia o que importa para o teste:

```js
const respostaApi = {
  statusCode: 200,
  headers: { "content-type": "application/json" },
  body: {
    id: 9001,
    status: "aprovado",
    cliente: {
      nome: "Empresa XYZ",
      documento: "12.345.678/0001-99",
    },
    itens: [
      { sku: "A1", quantidade: 2 },
      { sku: "B2", quantidade: 1 },
    ],
  },
};

const statusOk = respostaApi.statusCode === 200;
const nomeCliente = respostaApi.body.cliente.nome;
const qtdItens = respostaApi.body.itens.length;
const skus = respostaApi.body.itens.map((item) => item.sku);

console.log(statusOk, nomeCliente, qtdItens, skus);
// true Empresa XYZ 2 [ 'A1', 'B2' ]
```

Checklist mental ao validar objetos de API:

- o **status** está no nível certo (`statusCode` vs `body.status`)?
- campos aninhados existem antes de acessar (`body.cliente.nome`)?
- listas são **arrays** — use `.length`, `[0]`, `.map()`?
- tipos batem (número vs string `"200"`)?

---

## Comparando e inspecionando objetos

```js
const a = { x: 1, y: 2 };
const b = { x: 1, y: 2 };

console.log(a === b); // false — objetos diferentes na memória

console.log(JSON.stringify(a) === JSON.stringify(b)); // true — mesmo conteúdo serializado
```

Para testes mais robustos, bibliotecas como Playwright expõem matchers (`toEqual`, etc.). O princípio é o mesmo: comparar **conteúdo**, não referência.

---

## Boas práticas em automação

| Prática | Motivo |
| --- | --- |
| Nomes de propriedades **consistentes** com a API (`camelCase` vs `snake_case`) | Evita `undefined` por diferença de convenção. |
| Guardar payloads em **const** e clonar com spread ao modificar | Não contamina massa reutilizada entre testes. |
| Preferir **desestruturação** quando extrair muitos campos | Código mais legível que cadeias longas de `.`. |
| Logar com `JSON.stringify(obj, null, 2)` em falhas | Facilita debug no pipeline. |
| Validar **existência** antes de acessar níveis profundos (`?.` ou `if`) | Respostas de erro costumam ter formato diferente. |

---

## Resumo

| Operação | Sintaxe / método |
| --- | --- |
| Criar | `const obj = { chave: valor }` |
| Acessar | `obj.chave` ou `obj["chave"]` |
| Aninhado | `obj.nivel1.nivel2` ou `obj?.nivel1?.nivel2` |
| Listar chaves | `Object.keys(obj)` |
| Listar valores | `Object.values(obj)` |
| Pares chave-valor | `Object.entries(obj)` |
| Propriedade própria | `Object.hasOwn(obj, "chave")` |
| Copiar / mesclar | `{ ...obj }`, `{ ...a, ...b }` |
| Objeto → JSON texto | `JSON.stringify(obj)` |
| JSON texto → objeto | `JSON.parse(texto)` |
| Extrair campos | `const { a, b } = obj` |
| Renomear ao extrair | `const { id: codigo } = obj` |
| Valor padrão | `const { campo = "x" } = obj` |
| Aninhado | `const { body: { token } } = resposta` |
| Resto das chaves | `const { id, ...resto } = obj` |

---

## Prática

Crie o arquivo **`fundamentos/objetos.js`** na sua pasta de exercícios (veja **[Repositório e estrutura de pastas](../ambiente-automacao/repositorio-e-estrutura.md)**) e pratique:

1. Montar um objeto de massa de teste com pelo menos **três níveis** de aninhamento.
2. Acessar propriedades com `.` e `[]`.
3. Extrair campos com **desestruturação** (simples, aninhada e com renomeação).
4. Listar chaves de um subobjeto com `Object.keys`.
5. Serializar e parsear com `JSON.stringify` / `JSON.parse`.

Objetos são a base para trabalhar com **JSON** na módulo de **Testes de API**. Em seguida, veja **[Arrays](./arrays.md)** — listas ordenadas que aparecem dentro de quase todo payload (itens, usuários, cenários).
