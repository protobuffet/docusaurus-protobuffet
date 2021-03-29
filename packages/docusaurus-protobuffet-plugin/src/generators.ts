import { FileDescriptors } from './types';

const PROTO_FILE_MDX = `
import ProtoFile from '@theme/ProtoFile';

<ProtoFile fileDescriptor={} />
`;


export const generateDocFile = (fileDescriptors: FileDescriptors) => {
  const { files } = fileDescriptors;

  return `
import ProtoFile from '@theme/ProtoFile';

export const fileDescriptor = ${JSON.stringify(files[0])};

<ProtoFile fileDescriptor={fileDescriptor} />
  `
}
