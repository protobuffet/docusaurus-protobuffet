import { Enum, FileDescriptor, FileDescriptors, GeneratedDocFile, Message, Service } from './types';
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
  // TODO: run through prettier for consistent formatting.
  return (
  `---
title: ${shortenFileName(fileDescriptor.name).replace(/\//g, '.')}
hide_title: true
---

import { ProtoMessage, ProtoServiceMethod, ProtoEnum } from '@theme/ProtoFile';

## \`${getLeafFileName(fileDescriptor.name)}\`
_**path** ${fileDescriptor.name}_

_**package** ${fileDescriptor.package}_

${fileDescriptor.description}

---

${
  [
    generateMessageSectionMdx(fileDescriptor.messages),
    generateEnumSectionMdx(fileDescriptor.enums),
    generateServiceSectionMdx(fileDescriptor.services),
  ].filter(Boolean).map(section => section + "\n---\n").join("")
}

  `);
};

const generateMessageSectionMdx = (messages: Message[]): string|null => {
  if (messages.length == 0) {
    return null;
  }

  return (
    `## Messages

${messages.map((message, i) => (
`
### \`${message.longName}\`
<ProtoMessage key={${i}} message={${JSON.stringify(message)}} />
`
)).join("\n")}`
  );
};

const generateEnumSectionMdx = (enums: Enum[]): string|null => {
  if (enums.length == 0) {
    return null;
  }

  return (
    `## Enums

${enums.map((enumb, i) => (
`
### \`${enumb.longName}\`
<ProtoEnum key={${i}} enumb={${JSON.stringify(enumb)}} />
`
)).join("\n")}`
  );
}

const generateServiceSectionMdx = (services: Service[]): string|null => {
  if (services.length == 0) {
    return null;
  }

  return (
    `## Services

${services.map((service, i) => (
`
### \`${service.name}\`

${service.description}

${service.methods.map((method, i) => (
`
#### \`${method.name}\`
<ProtoServiceMethod key={'${method.name}-${i}'} method={${JSON.stringify(method)}} />
`
)).join("\n")}
`
)).join("\n")}`
  );
}

export const generateSidebarFileContents = (docFiles: GeneratedDocFile[]): string => {
  // TODO: run through prettier for consistent formatting.
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

