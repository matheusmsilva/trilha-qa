# Aprendizados sobre formatação — Trilha QA Automação

Referência interna com convenções adotadas na documentação e nos exemplos deste repositório. Use ao escrever ou revisar conteúdo novo.

---

## Documentação (Markdown / Docusaurus)

### Admonitions (`:::tip`, `:::info`, etc.)

**Não usar** blocos do tipo:

```markdown
:::tip Título
Texto...
:::
```

Neste projeto eles **não renderizam** como esperado. Preferir **citação em markdown**:

```markdown
> **Título:** texto da observação ou dica.
```

Outros títulos úteis: **Atenção**, **Pré-requisito**, **Dica**, **Terminal no Windows**.

### Frontmatter de cada página

Toda página em `docs/` deve começar com:

```yaml
---
title: Título exibido na sidebar
description: Resumo curto para SEO e preview.
---
```

### Estrutura recomendada de uma página

1. Título H1 alinhado ao assunto.
2. Parágrafo introdutório — **por que** o tema importa em automação/QA.
3. Lista numerada do que o leitor vai ver (quando a página for longa).
4. Seções com `---` entre blocos grandes.
5. Exemplos de código com linguagem explícita (`js`, `bash`, `text`).
6. Tabela **Resumo** no final, quando fizer sentido.
7. Link para a **próxima página** ou para **Prática** / repositório de exercícios.

### Tom e idioma

- **Português (pt-BR)**.
- Público: QAs iniciantes em programação; linguagem clara, frases completas.
- Evitar jargão sem explicar na primeira ocorrência.
- Módulo **Ambiente de automação**: assumir **Windows** (CMD, PowerShell, instaladores `.msi`/`.exe`).
- Comandos de terminal: funcionam em CMD e PowerShell salvo exceção documentada.

### Links internos

- Preferir caminhos relativos entre páginas: `./instalacao-node.md`, `../ambiente-automacao/repositorio-e-estrutura.md`.
- Após criar página nova: atualizar `sidebars.js`, `fundamentos/visao-geral.md` (ou visão geral do módulo) e tabela em `repositorio-e-estrutura.md`, se houver arquivo de prática correspondente.

### Tabelas

- Cabeçalho + separador `| --- | --- |`.
- Usar para glossário, checklists, resumos de métodos e mapas tópico → arquivo.

### Blocos de código na documentação

- JavaScript: ` ```js ` (não misturar com `javascript` salvo consistência local).
- Terminal: ` ```bash `.
- Saída esperada: ` ```text `.
- Comentários nos exemplos em **português** quando forem pedagógicos.
- Exemplos preferencialmente no contexto de **QA, API, cenários de teste**.

### O que evitar na documentação

- Admonitions `:::tipo`.
- Páginas “em construção” sem plano — preferir conteúdo mínimo útil ou não publicar na sidebar.
- Links quebrados para anchors — conferir com `npm run build` (Docusaurus reporta anchors inválidos).

---

## Código JavaScript (exemplos e exercícios)

### Pasta `exemplos/`

- Exemplos de referência versionados no repo (ex.: `exemplos/ola-trilha.js`, `exemplos/fundamentos/`).
- Nomes de arquivo em **kebab-case**: `estruturas-condicionais.js`, `arrays.js`.

### Pasta de prática do aluno (fora ou espelhando o repo)

Orientação documentada em `docs/ambiente-automacao/repositorio-e-estrutura.md`:

```text
trilha-qa-exercicios/
└── fundamentos/
    ├── algoritmos.js
    ├── variaveis.js
    └── ...
```

### Organização dentro do arquivo de exercícios

```js
// =============================================
// Tópico — exercícios de prática
// Trilha QA Automação
// =============================================

console.log("=== Início dos exercícios: tópico ===\n");

// ---------------------------------------------
// Exercício 1 — Título curto
// Objetivo: o que está sendo praticado
// ---------------------------------------------

// código...

console.log("\n=== Fim dos exercícios: tópico ===");
```

- Separar exercícios com comentários de bloco.
- Variáveis de exercícios diferentes: sufixos (`Ex1`, `Ex2`) para não colidir.
- **Não apagar** exercícios antigos — histórico de aprendizado.

### Estilo de código nos exemplos

- Preferir `const`; usar `let` quando o valor mudar.
- Aspas duplas ou simples — manter **consistente no mesmo arquivo**.
- Ponto e vírgula no final das instruções (padrão dos arquivos existentes).
- Nomes descritivos em português ou inglês técnico (`statusCode`, `cenarios`, `suiteRegressao`).
- Listas e payloads alinhados ao que aparece em APIs reais.

---

## Sidebar e ordem do conteúdo

- Ids em `sidebars.js` = caminho em `docs/` **sem** extensão (ex.: `fundamentos/arrays`).
- Ordem pedagógica importa: instalação → uso (`executar-javascript`) → organização (`repositorio-e-estrutura`) no ambiente; fundamentos na ordem da sidebar.

---

## Verificação antes de publicar

```bash
npm run build
```

- Corrigir links quebrados e anchors inválidos reportados pelo Docusaurus.
- Testar exemplos executáveis quando possível:

```bash
node exemplos/ola-trilha.js
node exemplos/fundamentos/estruturas-condicionais.js
```

---

## Extensões sugeridas ao aluno (VS Code)

Documentadas em `instalacao-vscode.md` — não são config do repo, mas fazem parte da “formatação” no dia a dia:

| Extensão | Papel |
| --- | --- |
| **Prettier** | Formatação automática ao salvar |
| **ESLint** | Alertas de estilo e erros comuns |
| **Material Icon Theme** | Ícones no explorador de arquivos |
| **GitBlame** | Autoria por linha |

---

## Resumo rápido

| Onde | Regra principal |
| --- | --- |
| Dicas na doc | `> **Título:** texto` — nunca `:::tip` |
| Páginas `docs/` | Frontmatter + H1 + exemplos QA + resumo |
| Exercícios | Um `.js` por tópico, blocos `// --- Exercício N ---` |
| Nomes de arquivo | kebab-case |
| Build | `npm run build` antes de merge/deploy |

Este arquivo pode ser ampliado conforme novas convenções forem definidas na trilha.
