# Docusaurus Protobuf Toolset

[Docusaurus](https://docusaurus.io/) toolset for Protobuf contract documentation. Provides a set of components and MDX doc file generators for Docusaurus sites.

See [`example`](https://github.com/AnthonyBobsin/docusaurus-protobuffet/tree/master/example) for a sample site.

---

## Installation

This section assumes an existing Docusaurus project. I'll be providing a template site generator soon for those not already on Docusaurus. You can view their [installation docs](https://docusaurus.io/docs/installation) to set one up in the mean time.

Install this preset.

```sh
npm install --save docusaurus-protobuffet
```

Generate a JSON representation of your Protobuf files. This relies on [protoc-gen-doc](https://github.com/pseudomuto/protoc-gen-doc).

```sh
# install protoc. change for your OS as necessary.
brew install protobuf

# install protoc-gen-doc. this depends on golang.
go get -u github.com/pseudomuto/protoc-gen-doc/cmd/protoc-gen-doc

# use protoc to generate the JSON representation of your Protobuf workspace.
protoc --doc_out=./doc --doc_opt=json,proto_workspace.json protos/**/*.proto

# copy the generated file to your Docusaurus project.
cp doc/proto_workspace.json ./fixtures/proto_workspace.json
```

Add the preset to your project's `docusaurus.config.js` file. View the [Configuration](#configuration) section for all available options.

```js
// file: docusaurus.config.js
module.exports = {
  // ...
  presets: [
    [
      'docusaurus-protobuffet',
      {
        protobuffet: {
          fileDescriptorsPath: './fixtures/proto_workspace.json'
        }
      }
    ]
  ],
  // ...
}
```

Invoke the CLI command [`generate-proto-docs`](#generate-proto-docs) to generate your MDX doc files.

```sh
npx docusaurus generate-proto-docs
```

Update your `docusaurus.config.js` to link to your new documentation from the navbar. You will need to configure one of the generated doc files as the route. A homepage will be introduced to replace this in the future.

```js
// file: docusaurus.config.js
module.exports = {
  themeConfig: {
    navbar: {
      items: [
        // ...
        {
          to: 'protodocs/Booking.proto',
          label: 'Protodocs',
          position: 'left',
        }
        // ...
      ]
    }
  }
}
```

Boot up your Docusaurus server to view the new Protobuf documentation space.

```sh
npm run start
```

---

##  Configuration

### `protobuffet`
Pass in all plugin options. See [`docusaurus-protobuffet-plugin`](https://github.com/AnthonyBobsin/docusaurus-protobuffet/tree/master/packages/docusaurus-protobuffet-plugin) for details.

| Option | Description | Required | Default |
| --- | --- | --- | --- |
| `fileDescriptorsPath` | Path to JSON file containing generated proto documentation through [protoc-gen-doc](https://github.com/pseudomuto/protoc-gen-doc). See [Installation](#installation) section for details. | ✅ | `./fixtures/proto_workspace.json` |
| `protoDocsPath` | Directory where CLI will create doc files. |  | `./protodocs` |
| `sidebarPath` | Path to file where CLI will write the generated Sidebar object. |  | `./sidebarsProtodocs.js` |
---

## Usage

This toolset provides a suite of CLI commands to generate and manage documentation files for your Protobuf workspace. These generated files follow the Docusaurus convention of using MDX files and React components.

### CLI Commands

#### generate-proto-docs

```sh
npx docusaurus generate-proto-docs
```

Generate documentation for all Protobuf files within the configured `fileDescriptorsPath` JSON file. The generated files are written to `protoDocsPath`. A sidebar object is written to the configured `sidebarPath`.

You can view some [generated doc files in the example project](https://github.com/AnthonyBobsin/docusaurus-protobuffet/tree/master/example/protodocs).

---

## Contributing

Contributions, issues and feature requests are always welcome!
