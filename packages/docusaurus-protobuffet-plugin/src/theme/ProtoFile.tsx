import React from 'react';
import { FileDescriptor, Message, MessageField, Service, ServiceMethod } from '../types';

interface ComponentProps {
  id?: string;
}

interface ComponentsProps {
  h1: React.FC<ComponentProps>;
  h2: React.FC<ComponentProps>;
  h3: React.FC<ComponentProps>;
  h4: React.FC<ComponentProps>;
}

const leftHeaderStyles: React.CSSProperties = {
  textAlign: "left",
};

interface ServiceMethodProps {
  method: ServiceMethod;
}

export const ProtoServiceMethod = ({ method }: ServiceMethodProps) => (
  <table>
    <tbody>
      <tr>
        <th style={leftHeaderStyles}>Method</th>
        <td><code>{method.name}</code></td>
      </tr>
      <tr>
        <th style={leftHeaderStyles}>Request</th>
        <td>
          <code>{method.requestType}</code>
          {method.requestStreaming === true ? ' stream' : ''}
        </td>
      </tr>
      <tr>
        <th style={leftHeaderStyles}>Response</th>
        <td>
          <code>{method.responseType}</code>
          {method.responseStreaming === true ? ' stream' : ''}
        </td>
      </tr>
      <tr>
        <th style={leftHeaderStyles}>Description</th>
        <td>{method.description}</td>
      </tr>
    </tbody>
  </table>
)

interface ServiceMethodsProps {
  methods: ServiceMethod[];
}

const ProtoServiceMethods = (props: ServiceMethodsProps) => {
  const { methods } = props;

  return (
    <>
      {methods.map((method, i) => (
        <ProtoServiceMethod method={method} key={`${method.name}-${i}`} />
      ))}
    </>
  );
}

interface ServiceProps {
  service: Service;
}

export const ProtoService = (props: ServiceProps) => {
  const { service } = props;

  return (
    <>
      <p style={{ whiteSpace: 'pre-wrap' }}>{service.description}</p>
      <ProtoServiceMethods methods={service.methods} />
    </>
  )
}

interface MessageFieldsProps {
  fields: MessageField[];
}

const ProtoMessageFields = (props: MessageFieldsProps) => {
  const { fields } = props;

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
        <tr key={field.name}>
          <td><code>{field.name}</code></td>
          <td><code>{field.type}</code></td>
          <td style={{ whiteSpace: 'pre-wrap' }}>{field.description}</td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <table>
      <Headers />
      <FieldRows />
    </table>
  )
}

interface MessageProps {
  message: Message;
}

export const ProtoMessage = (props: MessageProps) => {
  const { message } = props;

  return (
    <>
      <p style={{ whiteSpace: 'pre-wrap' }}>{message.description}</p>
      <ProtoMessageFields fields={message.fields} />
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
        <ProtoMessage message={message} key={i} />
      ))}
    </>
  );
}

export default ProtoFile;
