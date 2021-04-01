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

Generate a JSON representation of your Protobuf files. This depends on the [`protoc-gen-doc`](https://github.com/pseudomuto/protoc-gen-doc) compiler plugin. Find details and installation steps in the [usage section](#generating-the-filedescriptorspath-file).

```sh
# use protoc to generate the JSON representation of your Protobuf workspace.
protoc --doc_out=./fixtures --doc_opt=json,proto_workspace.json protos/**/*.proto
```

Add the preset to your project's `docusaurus.config.js` file. View the [configuration section](#configuration) for all available options.

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
Pass in all plugin options. See [`docusaurus-protobuffet-plugin`](https://github.com/AnthonyBobsin/docusaurus-protobuffet/tree/master/packages/docusaurus-protobuffet-plugin) for the plugin library. This preset assigns some recommended defaults for missing options.

| Option | Description | Required | Default |
| --- | --- | --- | --- |
| `fileDescriptorsPath` | Path to JSON file containing generated proto documentation through [protoc-gen-doc](https://github.com/pseudomuto/protoc-gen-doc). See [usage section](#generating-the-filedescriptorspath-file) for details. | ✅ | `./fixtures/proto_workspace.json` |
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

### Generating the `fileDescriptorsPath` File
This project depends on a snapshot of all the files within your Protobuf workspace. The formatting and generation of this snapshot currently depends on the [`protoc-gen-doc`](https://github.com/pseudomuto/protoc-gen-doc) Protobuf compiler plugin. `protoc-gen-doc` can generate a JSON representation of your Protobuf files, which we parse to build an enhanced view of your documentation.

To use `protoc-gen-doc` we must install golang and protoc. These are already common dependencies when working with Protobuf files, but I'm happy to investigate alternatives if we decide this is a barrier for users.

```sh
# install protoc. change for your OS as necessary.
brew install protobuf

# install protoc-gen-doc. this depends on golang.
go get -u github.com/pseudomuto/protoc-gen-doc/cmd/protoc-gen-doc

# use protoc to generate the JSON representation of your Protobuf workspace.
protoc --doc_out=./fixtures --doc_opt=json,proto_workspace.json protos/**/*.proto
```

### Recommended Extensions

#### [`docusaurus-search-local`](https://github.com/easyops-cn/docusaurus-search-local)

This plugin enables search bar functionality based on a generated local index of your Protobuf documentation. It depends on `@docusaurus/preset-classic` or any preset that leverages the `@theme/SearchBar` component. You can read more about how Docusaurus handles search [here](https://docusaurus.io/docs/search).

This must be installed within your project, so add the plugin to your `docusaurus.config.js` file. Make sure `docsRouteBasePath` and `docsDir` are configured to match your `protoDocsPath` option.

```js
// file: docusaurus.config.js
module.exports = {
  // ...
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        docsRouteBasePath: 'protodocs',
        docsDir: 'protodocs',
        indexBlog: false,
      },
    ]
  ],
}
```

---

## Contributing

Contributions, issues and feature requests are always welcome!
