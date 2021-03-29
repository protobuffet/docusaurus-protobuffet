import { FileDescriptor, FileDescriptors, GeneratedDocFile } from './types';
import { shortenFileName } from './utils';

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
  return (
  `---
title: ${shortenFileName(fileDescriptor.name)}
hide_title: true
---

import ProtoFile from '@theme/ProtoFile';
import MDXComponents from '@theme/MDXComponents';

export const fileDescriptor = ${JSON.stringify(fileDescriptor)};

<ProtoFile fileDescriptor={fileDescriptor} components={MDXComponents}/>
  `);
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

