import React from 'react';
import { FileDescriptor, Message } from '../types';

interface MessageProps {
  message: Message;
}

const ProtoMessage = (props: MessageProps) => {
  const { message } = props;

  return (
    <>
      <h3>{message.name}</h3>
      <p style={{ whiteSpace: 'pre-wrap' }}>{message.description}</p>
    </>
  );
}

interface Props {
  fileDescriptor: FileDescriptor;
}

const ProtoFile = (props: Props) => {
  const { fileDescriptor } = props;

  return (
    <>
      <h1>{fileDescriptor.name}</h1>
      <h2>{fileDescriptor.package}</h2>
      <p style={{ whiteSpace: 'pre-wrap' }}>{fileDescriptor.description}</p>
      {fileDescriptor.messages.map((message, i) => (
        <ProtoMessage message={message} key={i} />
      ))}
    </>
  );
}

export default ProtoFile;
