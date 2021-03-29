export interface MessageField {
  name: string;
  description: string;
  label: string;
  type: string;
  fullType: string;
  ismap: boolean;
  isoneof: boolean;
}

export interface Message {
  name: string;
  fullName: string;
  description: string;
  fields: MessageField[];
}

export interface ServiceMethod {
  name: string;
  description: string;
  requestType: string;
  requestLongType: string;
  requestStreaming: boolean;
  responseType: string;
  responseLongType: string;
  responseStreaming: boolean;
}

export interface Service {
  name: string;
  fullName: string;
  description: string;
  methods: ServiceMethod[];
}

export interface FileDescriptor {
  // TODO: does name include folders prefix?
  name: string;
  description: string;
  package: string;
  messages: Message[];
  services: Service[];
  // TODO: add enums, extensions
}

export interface FileDescriptors {
  files: FileDescriptor[];
}

export interface GeneratedDocFile {
  fileContents: string;
  fileName: string;
}
