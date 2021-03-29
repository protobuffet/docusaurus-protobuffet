import { Plugin, LoadContext } from "@docusaurus/types"
import { writeFileSync } from 'fs';
import path from 'path';

import fileDescriptors from "./example_file_descriptors.json";
import { generateDocFiles, generateSidebarFileContents } from './generators';

export interface PluginOptions {
  // fileDescriptorsPath: string
  protoDocsPath: string;
  sidebarPath: string;
}

export type LoadedContent = never

export function validateOptions({ options, validate }: { options: PluginOptions, validate: () => void }) {
  // if (options.fileDescriptorsPath === undefined) {
  //   throw new Error("Options missing fileDescriptorsPath.");
  // }

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