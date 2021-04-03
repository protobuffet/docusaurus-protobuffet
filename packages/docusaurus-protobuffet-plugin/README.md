# Docusaurus Protobuf Plugin

[Docusaurus](https://docusaurus.io/) plugin for Protobuf contract documentation. Provides a set of components and MDX doc file generators for Docusaurus sites.

**Visit the [landing page](https://anthonybobsin.github.io/docusaurus-protobuffet/) for an overview and documentation.**

See [`docusaurus-protobuffet`](https://github.com/protobuffet/docusaurus-protobuffet/tree/master/packages/docusaurus-protobuffet#usage) for details on usage.

---

## Configuration

This plugin accepts the following options. These options are passed through [`docusaurus-protobuffet`](https://github.com/protobuffet/docusaurus-protobuffet/tree/master/packages/docusaurus-protobuffet#configuration) preset's `protobuffet` option with some defaults applied.

| Option | Description | Required | Example |
| --- | --- | --- | --- |
| `fileDescriptorsPath` | Path to JSON file containing generated proto documentation through [protoc-gen-doc](https://github.com/pseudomuto/protoc-gen-doc). See [`docusaurus-protobuffet` usage](https://github.com/protobuffet/docusaurus-protobuffet/tree/master/packages/docusaurus-protobuffet#generating-the-filedescriptorspath-file) for details. | ✅ | `./fixtures/proto_workspace.json` |
| `protoDocsPath` | Directory where CLI will create doc files. | ✅ | `./protodocs` |
| `sidebarPath` | Path to file where CLI will write the generated Sidebar object. | ✅ | `./sidebarsProtodocs.js` |

## Contributing

Contributions, issues and feature requests are always welcome!
