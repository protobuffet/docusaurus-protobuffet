import React from 'react';
import { FileDescriptor, Message, MessageField } from '../types';

interface ComponentProps {
  id?: string;
}

interface ComponentsProps {
  h1: React.FC<ComponentProps>;
  h2: React.FC<ComponentProps>;
  h3: React.FC<ComponentProps>;
  h4: React.FC<ComponentProps>;
}

interface MessageFieldsProps {
  fields: MessageField[];
  components: ComponentsProps;
}

const ProtoMessageFields = (props: MessageFieldsProps) => {
  const { fields, components } = props;

  const Headers = () => (
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
  )

  const FieldRows = () => (
    <tbody>
      {fields.map(field => (
        <tr>
          <td>{field.name}</td>
          <td>{field.type}</td>
          <td>{field.description}</td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <table style={{ display: 'inline-table' }}>
      <Headers />
      <FieldRows />
    </table>
  )
}

interface MessageProps {
  message: Message;
  components: ComponentsProps;
}

const ProtoMessage = (props: MessageProps) => {
  const { message, components } = props;

  return (
    <>
      <components.h2 id={message.name}>{message.name}</components.h2>
      <p style={{ whiteSpace: 'pre-wrap' }}>{message.description}</p>
      <ProtoMessageFields fields={message.fields} components={components} />
    </>
  );
}

interface Props {
  fileDescriptor: FileDescriptor;
  components: ComponentsProps;
}

const ProtoFile = (props: Props) => {
  const { fileDescriptor, components } = props;

  return (
    <>
      <components.h1>{fileDescriptor.name}</components.h1>
      <p style={{ whiteSpace: 'pre-wrap' }}>{fileDescriptor.description}</p>
      {fileDescriptor.messages.map((message, i) => (
        <ProtoMessage message={message} components={components} key={i} />
      ))}
    </>
  );
}

export default ProtoFile;
