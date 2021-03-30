import { FileDescriptor, FileDescriptors, GeneratedDocFile } from './types';
import { getLeafFileName, shortenFileName } from './utils';

export const generateDocFiles = (fileDescriptors: FileDescriptors): GeneratedDocFile[] => {
  const { files }  = fileDescriptors;
  return files.map(generateDocFile);
};

const generateDocFile = (fileDescriptor: FileDescriptor): GeneratedDocFile => ({
  fileContents: generateDocFileContents(fileDescriptor),
  fileName: fileDescriptor.name,
});

const generateDocFileContents = (fileDescriptor: FileDescriptor): string => {
  // TODO: improve formatting
  return (
  `---
title: ${shortenFileName(fileDescriptor.name).replace(/\//g, '.')}
hide_title: true
---

import { ProtoMessage } from '@theme/ProtoFile';

## ${getLeafFileName(fileDescriptor.name)}
_**path** ${fileDescriptor.name}_

_**package** ${fileDescriptor.package}_

${fileDescriptor.description}

---

## Messages

${fileDescriptor.messages.map((message, i) => (
`
### ${message.name}
<ProtoMessage key={${i}} message={${JSON.stringify(message)}} />
`
)).join("\n")}
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

