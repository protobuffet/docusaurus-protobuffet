import { FileDescriptors, GeneratedDocFile } from "../types";
import { getLeafFileName } from "../utils";
import { compile } from "handlebars";
import defaultTemplate from "./template";

export const generateDocFiles = (
  fileDescriptors: FileDescriptors,
  template?: string
): GeneratedDocFile[] => {
  const helpers: { [name: string]: Function } = {
    stringify: JSON.stringify,
    getLeafFileName,
  };

  const compiledTemplate = compile(template ?? defaultTemplate);

  const { files } = fileDescriptors;
  return files.map((fileDescriptor) => ({
    fileContents: compiledTemplate(fileDescriptor, { helpers }),
    fileName: fileDescriptor.name,
    fileDescriptor,
  }));
};
