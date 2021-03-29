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

interface PresetOptions {
  protobuffet: PluginOptions;
}

export default function preset(
  context: LoadContext,
  options: PresetOptions,
) {
  const pluginOptions: PluginOptions = {
    ...pluginOptionDefaults,
    ...options.protobuffet
  };

  const config = {
    plugins: [
      [
        'docusaurus-protobuffet-plugin',
        pluginOptions,
      ],
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'protodocs',
          path: 'protodocs',
          routeBasePath: 'protodocs',
          sidebarPath: pluginOptions.sidebarPath,
        },
      ],
    ],
  };

  return config;
}
