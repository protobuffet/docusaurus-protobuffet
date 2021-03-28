import { Plugin, LoadContext } from "@docusaurus/types"

import fileDescriptors from "./example_file_descriptors.json";

export interface PluginOptions {
  // fileDescriptorsPath: string
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
        .command("dothing")
        .description("Does something")
        .action(() => { console.log(fileDescriptors)})
    },
  }
}
