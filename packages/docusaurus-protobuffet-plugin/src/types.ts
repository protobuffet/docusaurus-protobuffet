export interface EnumValue {
  name: string;
  number: string;
  description: string;
}

export interface Enum {
  name: string;
  longName: string;
  fullName: string;
  description: string;
  values: EnumValue[];
}

export interface MessageField {
  name: string;
  description: string;
  label: string;
  type: string;
  longType: string;
  fullType: string;
  ismap: boolean;
  isoneof: boolean;
  typeLink?: string;
}

export interface Message {
  name: string;
  longName: string;
  fullName: string;
  description: string;
  fields: MessageField[];
}

export interface ServiceMethod {
  name: string;
  description: string;
  requestType: string;
  requestLongType: string;
  requestFullType: string;
  requestStreaming: boolean;
  responseType: string;
  responseLongType: string;
  responseFullType: string;
  responseStreaming: boolean;
  requestTypeLink?: string;
  responseTypeLink?: string;
}

export interface Service {
  name: string;
  fullName: string;
  description: string;
  methods: ServiceMethod[];
}

export interface FileDescriptor {
  name: string;
  description: string;
  package: string;
  messages: Message[];
  services: Service[];
  enums: Enum[];
  // TODO: add extensions
}

export interface FileDescriptors {
  files: FileDescriptor[];
}

export interface GeneratedDocFile {
  fileContents: string;
  fileName: string;
  fileDescriptor: FileDescriptor;
}
