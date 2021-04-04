/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Protobuffet',
  tagline: 'Documentation Toolset for Your Protobuf Workspace',
  url: 'https://protobuffet.com',
  baseUrl: '/',
  organizationName: 'protobuffet',
  projectName: 'protobuffet.github.io',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  themeConfig: {
    navbar: {
      title: 'Protobuffet',
      logo: {
        alt: 'Protobuffet Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: 'docs/what/overview',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'protodocs/protobuffet/example/ad/v1/ads.proto',
          activeBasePath: 'protodocs',
          label: 'Example Workspace',
          position: 'left',
        },
        {
          href: 'https://github.com/protobuffet/docusaurus-protobuffet',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Protobuffet',
          items: [
            {
              label: 'Overview',
              to: '/docs/what/overview',
            },
            {
              label: 'Features',
              to: '/docs/what/features',
            },
            {
              label: 'Motivation',
              to: '/docs/what/motivation',
            },
          ],
        },
        {
          title: 'Guides',
          items: [
            {
              label: 'Installation',
              to: '/docs/how/installation',
            },
            {
              label: 'Usage',
              to: '/docs/how/usage'
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/protobuffet/docusaurus-protobuffet',
            },
          ],
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Protobuffet. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/protobuffet/docusaurus-protobuffet/edit/master/website/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
    [
      'docusaurus-protobuffet',
      {
        protobuffet: {
          fileDescriptorsPath: './fixtures/proto_workspace.json',
          protoDocsPath: './protodocs',
          sidebarPath: './sidebarsProtodocs.js',
        }
      }
    ]
  ],
  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        docsRouteBasePath: ['docs', 'protodocs'],
        docsDir: ['docs', 'protodocs'],
        indexBlog: false,
      },
    ],
  ]
};
