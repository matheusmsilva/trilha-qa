// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// --- GitHub Pages (projeto em https://<usuário>.github.io/<repositório>/) ---
// Na GitHub Actions, GITHUB_REPOSITORY_OWNER e GITHUB_REPOSITORY vêm preenchidos.
// Em desenvolvimento local, `baseUrl` fica "/" e `url` em localhost.
// Se quiser links "Editar no GitHub" corretos no `npm start`, defina no terminal, por exemplo:
//   setx GITHUB_REPOSITORY_OWNER "seuUsuario"   (Windows, novo terminal depois)
// ou substitua o fallback `SEU_USUARIO_GITHUB` abaixo pelo seu usuário ou organização.
const repoFull = process.env.GITHUB_REPOSITORY;
const [repoOwnerFromEnv, repoNameFromEnv] = repoFull?.split('/') ?? [];

const githubOrg =
  process.env.GITHUB_REPOSITORY_OWNER ??
  repoOwnerFromEnv ??
  'SEU_USUARIO_GITHUB';
const githubRepo = repoNameFromEnv ?? 'trilha-qa-automacao';

const githubPagesBuild = process.env.GITHUB_PAGES === 'true';

const siteUrl = githubPagesBuild
  ? `https://${githubOrg}.github.io`
  : 'http://localhost:3000';

const siteBaseUrl = githubPagesBuild ? `/${githubRepo}/` : '/';

const githubRepoUrl = `https://github.com/${githubOrg}/${githubRepo}`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Trilha QA Automação',
  tagline: 'Documentação da trilha',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: siteUrl,
  baseUrl: siteBaseUrl,

  organizationName: githubOrg,
  projectName: githubRepo,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          path: 'docs',
          sidebarPath: './sidebars.js',
          editUrl: `${githubRepoUrl}/tree/main/`,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Trilha QA Automação',
        logo: {
          alt: 'Trilha QA Automação',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'trilhaSidebar',
            position: 'left',
            label: 'Documentação',
          },
          {
            href: githubRepoUrl,
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentação',
            items: [
              {
                label: 'Introdução',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'X',
                href: 'https://x.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: githubRepoUrl,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Trilha QA Automação. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
