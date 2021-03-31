import { FileDescriptors } from './types'

interface LinkMap {
  [key: string]: string;
}

export const parseFileDescriptors = (source: object): FileDescriptors => {
  // TODO: add joi validations
  const parsed = source as FileDescriptors;

  const messageLinkMap: LinkMap = {}
  const serviceLinkMap: LinkMap = {}

  const generateLink = (fileName: string, objName: string): string => {
    // TODO: reference option for base path
    return `/protodocs/${fileName}#${objName.toLowerCase().replace(/\./g, '')}`
  }

  // derive link maps
  parsed.files.forEach(file => {
    file.messages.forEach(msg => {
      messageLinkMap[msg.fullName] = generateLink(file.name, msg.longName);
    });

    file.services.forEach(srv => {
      serviceLinkMap[srv.fullName] = generateLink(file.name, srv.name);
    })
  });

  // assign links based on derived maps
  parsed.files.forEach(file => {
    file.messages.forEach(msg => {
      msg.fields.forEach(field => {
        field.typeLink = messageLinkMap[field.fullType];
      });
    });

    file.services.forEach(srv => {
      srv.methods.forEach(meth => {
        meth.requestTypeLink = messageLinkMap[meth.requestFullType];
        meth.responseTypeLink = messageLinkMap[meth.responseFullType];
      });
    });
  })

  return parsed;
}