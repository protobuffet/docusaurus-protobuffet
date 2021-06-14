---
title: Usage
slug: /how/usage
---

## [`docusaurus-protobuffet`](https://github.com/protobuffet/docusaurus-protobuffet/tree/master/packages/docusaurus-protobuffet)

This toolset provides a **suite of CLI commands** to generate and manage documentation files for your Protobuf workspace. These generated files follow the **Docusaurus convention of using MDX files and React components**.

### CLI Commands

#### generate-proto-docs

```sh
npx docusaurus generate-proto-docs
```

**Generate documentation for all Protobuf files** within the configured `fileDescriptorsPath` JSON file. The generated files are written to `protoDocsPath`. A sidebar object is written to the configured `sidebarPath`. View the [configuration section](#configuration) for details of these options.

This command must be run for every content change of `fileDescriptorsPath`. This will overwrite all previously generated files, so they should not be modified manually. Extension support for these generated files will be coming in the future, so please reach out with your use cases.

You can view some [generated doc files in the landing page](https://github.com/protobuffet/docusaurus-protobuffet/tree/master/website/protodocs).

### Generating the `fileDescriptorsPath` File
This project depends on a snapshot of all the files within your Protobuf workspace. **The formatting and generation of this snapshot currently depends on the [`protoc-gen-doc`](https://github.com/pseudomuto/protoc-gen-doc) Protobuf compiler plugin**. `protoc-gen-doc` can generate a JSON representation of your Protobuf files, which we parse to build an enhanced view of your documentation.

To use `protoc-gen-doc` we must install golang and protoc. These are already common dependencies when working with Protobuf files, but I'm happy to investigate alternatives if we decide this is a barrier for users.

```sh
# install protoc. change for your OS as necessary.
brew install protobuf

# install protoc-gen-doc. this depends on golang.
go get -u github.com/pseudomuto/protoc-gen-doc/cmd/protoc-gen-doc

# use protoc to generate the JSON representation of your Protobuf workspace.
protoc --doc_out=./fixtures --doc_opt=json,proto_workspace.json --proto_path=protos protos/**/*.proto
```

### Configuration

```js
// file: docusaurus.config.js
module.exports = {
  // ...
  presets: [
    [
      'docusaurus-protobuffet',
      {
        protobuffet: {
          fileDescriptorsPath: './fixtures/proto_workspace.json',
          protoDocsPath: './protodocs',
          sidebarPath: './generatedSidebarsProtodocs.js'
        },
        docs: {
          routeBasePath: 'protodocs',
          sidebarPath: './sidebarsProtodocs.js',
        }
      }
    ]
  ],
  // ...
}
```

#### `protobuffet`
Pass in all plugin options. See [`docusaurus-protobuffet-plugin`](https://github.com/protobuffet/docusaurus-protobuffet/tree/master/packages/docusaurus-protobuffet-plugin) for the plugin library. This preset assigns some recommended defaults for missing options.

| Option | Description | Required | Default |
| --- | --- | --- | --- |
| `fileDescriptorsPath` | Path to JSON file containing generated proto documentation through [protoc-gen-doc](https://github.com/pseudomuto/protoc-gen-doc). See [usage section](#generating-the-filedescriptorspath-file) for details. | ✅ | N/A |
| `protoDocsPath` | Directory where CLI will create doc files. |  | `./protodocs` |
| `sidebarPath` | Path to file where CLI will write the generated Sidebar object. |  | `./sidebarsProtodocs.js` |

#### `docs`
Pass in options for the [`@docusaurus/plugin-content-docs`](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs) plugin. This preset assigns some recommended defaults for missing options.

| Option | Description | Required | Default |
| --- | --- | --- | --- |
| `routeBasePath` | URL base route for the Protobuffet docs section of your site. |  | `protodocs` |
| `sidebarPath` | Path to file where docs plugin will read the Sidebar object. |  | `./sidebarsProtodocs.js` |

## [`docusaurus-protobuffet-init`](https://github.com/protobuffet/docusaurus-protobuffet/tree/master/packages/docusaurus-protobuffet-init)

For those without an existing Docusaurus project, this package can **scaffold a new site with Protobuffet packages installed** in a recommended setup.

Run the generator in the folder you would like the project to be created. This will create a directory for your site with the generated files. You must specify the `project_name` variable.

```sh
npx docusaurus-protobuffet-init init <project_name>
```

Start the development server to view the sample fixtures. See the [configuration section](#configuration) for steps on introducing your own Protobuf workspace file.

```sh
cd <project_name>
npm run start
```

Proto doc files were generated for the sample fixture during project initialization. These will need to be generated whenever the `fileDescriptorsPath` file (defaulted to `./fixtures/proto_workspace.json`) is updated. Read [`docusaurus-protobuffet CLI documentation`](#cli-commands) for details.

```sh
npx docusaurus generate-proto-docs
```

Since this is a normal Docusaurus project, you can follow their documentation for [deployments](https://docusaurus.io/docs/next/deployment) and other details.
