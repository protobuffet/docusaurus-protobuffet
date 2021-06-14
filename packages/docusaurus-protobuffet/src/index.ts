import { LoadContext } from '@docusaurus/types';

interface PluginOptions {
  // Path to Protobuf file descriptors JSON file. See: https://protobuffet.com/docs/how/usage#generating-the-filedescriptorspath-file
  fileDescriptorsPath: string
  // Path to generate data on filesystem relative to site dir.
  protoDocsPath?: string;
  // Path to sidebar configuration for showing a list of markdown pages.
  sidebarPath?: string;
  // URL base route for the Protobuffet docs section of your site. Not configurable by user here, is assigned using doc option's routeBasePath.
  routeBasePath?: string;
}

const pluginOptionDefaults = {
  protoDocsPath: './protodocs',
  sidebarPath: './sidebarsProtodocs.js',
}

// NOTE: these are options exposed by docusaurus plugin-content-docs: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs
interface ContentDocOptions {
  // URL base route for the Protobuffet docs section of your site.
  routeBasePath?: string;
  // Path to sidebar configuration for showing a list of markdown pages.
  sidebarPath?: string;
}

const contentDocOptionsDefaults = {
  routeBasePath: 'protodocs',
  sidebarPath: './sidebarsProtodocs.js',
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

  const docOptions = {
    id: 'protodocs',
    path: pluginOptions.protoDocsPath,
    ...contentDocOptionsDefaults,
    ...options.docs,
  };

  pluginOptions.routeBasePath = docOptions.routeBasePath;

  const config = {
    plugins: [
      [
        require.resolve('docusaurus-protobuffet-plugin'),
        pluginOptions,
      ],
      [
        '@docusaurus/plugin-content-docs',
        docOptions,
      ],
    ],
  };

  return config;
}
