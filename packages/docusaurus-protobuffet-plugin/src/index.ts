import { Plugin, LoadContext } from "@docusaurus/types"
import { existsSync, lstatSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

import { generateDocFiles, generateSidebarFileContents } from './generators';
import { parseFileDescriptors } from './parsers';

export interface PluginOptions {
  fileDescriptorsPath: string
  protoDocsPath: string;
  sidebarPath: string;
}

export function validateOptions({ options, validate }: { options: PluginOptions, validate: () => void }): PluginOptions {
  const { fileDescriptorsPath, protoDocsPath, sidebarPath } = options;

  // fileDescriptorsPath is an existing json file
  if (!fileDescriptorsPath || !existsSync(fileDescriptorsPath)) {
    throw new Error('Expected fileDescriptorsPath option to reference a present file.');
  }

  // protoDocsPath is a directory. we only check if it's a directory if it already exists.
  if (!protoDocsPath || (existsSync(protoDocsPath) && !lstatSync(protoDocsPath).isDirectory())) {
    throw new Error('Expected protoDocsPath option to reference a directory.');
  }

  // sidebarPath is a present file
  if (!sidebarPath) {
    throw new Error('Expected sidebarPath option to reference a file.');
  }

  return options;
};

export default function plugin(
  context: LoadContext,
  options: PluginOptions,
): Plugin<never> {
  return {
    name: "docusaurus-protobuffet-plugin",

    extendCli(cli) {
      cli
        .command("generate-proto-docs")
        .description("Generate documentation for a protobuf workspace.")
        .action(() => {
          // read file descriptors JSON file
          const fileDescriptorsInput = JSON.parse(readFileSync(options.fileDescriptorsPath).toString());
          const fileDescriptors = parseFileDescriptors(fileDescriptorsInput);

          // generate markdown files for each in fileDescriptors
          const docFiles = generateDocFiles(fileDescriptors);

          // write files to appropriate directories
          docFiles.forEach(docFile => {
            const fileName = `${options.protoDocsPath}/${docFile.fileName}.mdx`;
            const fileDir = path.dirname(fileName);

            // ensure directory exists
            mkdirSync(fileDir, { recursive: true });

            // write file
            writeFileSync(fileName, docFile.fileContents);
          });

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
