import { FileDescriptor, FileDescriptors, GeneratedDocFile } from './types';

export const generateDocFiles = (fileDescriptors: FileDescriptors): GeneratedDocFile[] => {
  const { files }  = fileDescriptors;
  return files.map(generateDocFile);
};

const generateDocFile = (fileDescriptor: FileDescriptor): GeneratedDocFile => ({
  fileContents: generateDocFileContents(fileDescriptor),
  // TODO: add folder prefix
  fileName: fileDescriptor.name,
});

const generateDocFileContents = (fileDescriptor: FileDescriptor): string => {
  // TODO: improve formatting
  return `
import ProtoFile from '@theme/ProtoFile';

export const fileDescriptor = ${JSON.stringify(fileDescriptor)};

<ProtoFile fileDescriptor={fileDescriptor} />
  `
};

export const generateSidebarFileContents = (docFiles: GeneratedDocFile[]): string => {
  // TODO: improve formatting
  return `
module.exports = ${JSON.stringify(generateSidebarObject(docFiles))};
  `
};

const generateSidebarObject = (docFiles: GeneratedDocFile[]) => {
  return {
    protodocs: [
      generateSidebarFileCategory(docFiles)
    ]
  };
}

const generateSidebarFileCategory = (docFiles: GeneratedDocFile[])  => {
  return {
    type: 'category',
    label: 'Files',
    items: docFiles.map(file => file.fileName),
  };
};
