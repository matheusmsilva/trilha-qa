// @ts-check

/**
 * Sidebar da trilha: intro na raiz de `docs/`; fases em subpastas.
 * Ids = caminho em `docs/` sem extensão (ex.: `fundamentos/algoritmos`, `introducao`).
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  trilhaSidebar: [
    "introducao",
    {
      type: "category",
      label: "Fundamentos e lógica de programação",
      items: [
        "fundamentos/visao-geral",
        "fundamentos/algoritmos",
        "fundamentos/variaveis",
        "fundamentos/estruturas-condicionais",
        "fundamentos/estruturas-de-repeticao",
        "fundamentos/funcoes",
        "fundamentos/objetos",
        "fundamentos/arrays",
      ],
    },
    {
      type: "category",
      label: "Ambiente de automação",
      link: {
        type: "doc",
        id: "ambiente-automacao/visao-geral",
      },
      items: [
        "ambiente-automacao/instalacao-node",
        "ambiente-automacao/instalacao-vscode",
        "ambiente-automacao/instalacao-git",
        "ambiente-automacao/instalacao-bruno",
        "ambiente-automacao/executar-javascript",
        "ambiente-automacao/repositorio-e-estrutura",
      ],
    },
    {
      type: "category",
      label: "Testes de API",
      link: {
        type: "doc",
        id: "automacao-apis/visao-geral",
      },
      items: [
        "automacao-apis/estrutura-da-requisicao",
        "automacao-apis/requisicoes-get",
        "automacao-apis/requisicoes-post",
        "automacao-apis/requisicoes-put",
        "automacao-apis/requisicoes-patch",
        "automacao-apis/requisicoes-delete",
        "automacao-apis/headers-e-autenticacao",
      ],
    },
  ],
};

export default sidebars;
