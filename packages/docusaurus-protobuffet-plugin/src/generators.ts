import { Enum, FileDescriptor, FileDescriptors, GeneratedDocFile, Message, Service } from './types';
import { getLeafFileName } from './utils';

export const generateDocFiles = (fileDescriptors: FileDescriptors): GeneratedDocFile[] => {
  const { files }  = fileDescriptors;
  return files.map(generateDocFile);
};

const generateDocFile = (fileDescriptor: FileDescriptor): GeneratedDocFile => ({
  fileContents: generateDocFileContents(fileDescriptor),
  fileName: fileDescriptor.name,
  fileDescriptor,
});

const generateDocFileContents = (fileDescriptor: FileDescriptor): string => {
  // TODO: run through prettier for consistent formatting.
  return (
  `---
title: ${getLeafFileName(fileDescriptor.name)}
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
  const fileDirectory = buildFileDirectory(docFiles);
  compactFileDirectory(fileDirectory);

  const sidebarObject = convertDirectoryToSidebar(fileDirectory);
  const sidebarItems = sidebarObject.label == '/' ? sidebarObject.items : [sidebarObject];

  return {
    type: 'category',
    label: 'Files',
    items: sidebarItems,
  };
};

interface FileDirectory {
  name: string;
  fullName: string;
  files?: GeneratedDocFile[];
  nested?: { [key: string] : FileDirectory };
}

interface SidebarItem {
  type: string;
  id?: string;
  label?: string;
  items?: SidebarItem[]
}

const buildFileDirectory = (files: GeneratedDocFile[]): FileDirectory => {
  const root: FileDirectory = { name: '', fullName: '' };

  files.forEach(file => {
    // split by folder names
    const splitFilePath = file.fileName.split("/");
    // remove last item, which is the .proto file.
    const relevantSplitFilePath = splitFilePath.slice(0, splitFilePath.length - 1);

    // initialize nested directories
    let current: FileDirectory = root;
    relevantSplitFilePath.forEach(folder => {
      current.nested ||= {}
      current.nested[folder] ||= { name: folder, fullName: `${current.fullName}/${folder}`};
      current = current.nested[folder];
    });

    // push file into current which is now the leaf folder node
    current.files ||= []
    current.files.push(file);
  });

  return root;
}

const compactFileDirectory = (fileDir: FileDirectory) => {
  if (!(fileDir && fileDir.nested)) return;

  // loop nested packages while they can be compacted (length 1)
  while (fileDir.nested && Object.keys(fileDir.nested).length === 1) {
    // compact directory with nested. eg. { protobuf: { example: {} } -> { 'protobuf.example': {} }
    const nestedDir: FileDirectory = fileDir.nested[Object.keys(fileDir.nested)[0]];
    // concat name
    fileDir.name = fileDir.name === '' ? nestedDir.name : `${fileDir.name}/${nestedDir.name}`;
    // override fullName with nested
    fileDir.fullName = nestedDir.fullName;

    // bubble up files
    if (nestedDir.files) {
      fileDir.files ||= []
      fileDir.files.push(...nestedDir.files);
    }

    // bubble up nested
    fileDir.nested = nestedDir.nested;
  }

  if (fileDir.nested) {
    // continue compacting for all remaining nested
    Object.keys(fileDir.nested).forEach(dir => {
      compactFileDirectory(fileDir.nested![dir]);
    });
  }
}

const convertDirectoryToSidebar = (fileDir: FileDirectory) => {
  // construct category
  const sidebarItem: SidebarItem = {
    type: 'category',
    label: '/' + fileDir.name,
  }

  // assign nested category items
  if (fileDir.nested) {
    Object.keys(fileDir.nested).forEach(nestedKey => {
      const nested = fileDir.nested![nestedKey];
      const nestedSidebarItem = convertDirectoryToSidebar(nested);
      sidebarItem.items ||= []
      sidebarItem.items.push(nestedSidebarItem);
    });
  }

  // assign file doc items
  if (fileDir.files) {
    sidebarItem.items ||= []
    sidebarItem.items.push(...fileDir.files.map(file => ({
      type: 'doc',
      id: file.fileName,
      label: file.fileName.split("/").pop()
    })));
  }

  return sidebarItem;
}
