import { Plugin, LoadContext } from "@docusaurus/types"
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

import { generateDocFiles, generateSidebarFileContents } from './generators';

export interface PluginOptions {
  fileDescriptorsPath: string
  protoDocsPath: string;
  sidebarPath: string;
}

export type LoadedContent = never

export function validateOptions({ options, validate }: { options: PluginOptions, validate: () => void }) {
  // TODO: add validations. use joi
  // fileDescriptorsPath is an existing json file
  // protoDocsPath is a directory
  // sidebarPath is a js file

  return options;
};

export default function myPlugin(
  context: LoadContext,
  options: PluginOptions,
): Plugin<LoadedContent> {
  return {
    name: "docusaurus-protobuffet-plugin",

    extendCli(cli) {
      cli
        .command("generate-proto-docs")
        .description("Generate documentation for a protobuf workspace.")
        .action(() => {
          // read file descriptors JSON file
          const fileDescriptors = JSON.parse(readFileSync(options.fileDescriptorsPath).toString());

          // generate markdown files for each in fileDescriptors
          const docFiles = generateDocFiles(fileDescriptors);

          // write files to appropriate directories
          docFiles.forEach(docFile =>
            writeFileSync(`${options.protoDocsPath}/${docFile.fileName}.mdx`, docFile.fileContents)
          );

          // generate sidebar object for all files
          const sidebarFileContents = generateSidebarFileContents(docFiles);

          // write sidebar object
          writeFileSync(options.sidebarPath, sidebarFileContents);
        })
    },

    getThemePath() {
      return path.resolve(__dirname, "./theme");
    }
  }
}
