import { LoadContext } from '@docusaurus/types';

interface PluginOptions {
  fileDescriptorsPath: string
  protoDocsPath?: string;
  sidebarPath?: string;
}

const pluginOptionDefaults = {
  protoDocsPath: './protodocs',
  sidebarPath: './sidebarsProtodocs.js',
}

interface ContentDocOptions {
  sidebarPath?: string;
}

interface PresetOptions {
  protobuffet: PluginOptions;
  docs?: ContentDocOptions;
}

export default function preset(
  context: LoadContext,
  options: PresetOptions,
) {
  const pluginOptions: PluginOptions = {
    ...pluginOptionDefaults,
    ...options.protobuffet
  };
  const docSidebarPath = options.docs?.sidebarPath || pluginOptions.sidebarPath;

  const config = {
    plugins: [
      [
        require.resolve('docusaurus-protobuffet-plugin'),
        pluginOptions,
      ],
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'protodocs',
          path: 'protodocs',
          routeBasePath: 'protodocs',
          sidebarPath: docSidebarPath,
        },
      ],
    ],
  };

  return config;
}
