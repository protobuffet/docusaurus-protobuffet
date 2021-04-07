/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Protobuffet',
  tagline: 'Documentation Toolset for Your Protobuf Workspace',
  url: 'https://protobuffet.com',
  baseUrl: '/',
  organizationName: 'protobuffet', // Usually your GitHub org/user name.
  projectName: 'protobuffet.github.io', // Usually your repo name.
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
          to: 'protodocs/protobuffet/example/ad/v1/ads.proto',
          activeBasePath: 'protodocs',
          label: 'Protodocs',
          position: 'left',
        },
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
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
              to: 'https://protobuffet.com/docs/what/overview',
            },
            {
              label: 'Features',
              to: 'https://protobuffet.com/docs/what/features',
            },
            {
              label: 'Motivation',
              to: 'https://protobuffet.com/docs/what/motivation',
            },
          ],
        },
        {
          title: 'Guides',
          items: [
            {
              label: 'Installation',
              to: 'https://protobuffet.com/docs/how/installation',
            },
            {
              label: 'Usage',
              to: 'https://protobuffet.com/docs/how/usage'
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
        },
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
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
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
        docsRouteBasePath: 'protodocs',
        docsDir: 'protodocs',
        indexBlog: false,
      },
    ],
  ]
};
