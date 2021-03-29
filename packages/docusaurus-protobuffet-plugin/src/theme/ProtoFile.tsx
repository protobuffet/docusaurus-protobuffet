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
      <p>{message.description}</p>
    </>
  );
}

interface Props {
  fileDescriptor: FileDescriptor;
}

const ProtoFile = (props: Props) => {
  const { fileDescriptor } = props;

  return (
    // useDocusaurusContext to get components
    <>
      <h1>{fileDescriptor.name}</h1>
      <h2>{fileDescriptor.package}</h2>
      <h4>{fileDescriptor.description}</h4>
      {fileDescriptor.messages.map((message, i) => (
        <ProtoMessage message={message} key={i} />
      ))}
    </>
  );
}

export default ProtoFile;
