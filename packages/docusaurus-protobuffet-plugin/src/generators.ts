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
  return `
import ProtoFile from '@theme/ProtoFile';

export const fileDescriptor = ${JSON.stringify(fileDescriptor)};

<ProtoFile fileDescriptor={fileDescriptor} />
  `
};

export const generateSidebarObject = (docFiles: GeneratedDocFile[]) => {

}
