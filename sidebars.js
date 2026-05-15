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
      link: {
        type: "doc",
        id: "fundamentos/algoritmos",
      },
      items: [
        "fundamentos/algoritmos",
        "fundamentos/variaveis",
        "fundamentos/estruturas-condicionais",
        "fundamentos/estruturas-de-repeticao",
        "fundamentos/funcoes",
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
        "ambiente-automacao/visao-geral",
        "ambiente-automacao/ferramentas-e-versoes",
        "ambiente-automacao/repositorio-e-estrutura",
      ],
    },
    {
      type: "category",
      label: "Automação de APIs",
      link: {
        type: "doc",
        id: "automacao-apis/requisicoes-get",
      },
      items: [
        "automacao-apis/requisicoes-get",
        "automacao-apis/requisicoes-post",
        "automacao-apis/headers-e-autenticacao",
      ],
    },
  ],
};

export default sidebars;
