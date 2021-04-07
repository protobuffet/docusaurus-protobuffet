---
title: Overview
slug: /what/overview
---

**Protobuffet is a documentation environment for your Protobuf file workspace.**

Documentation should be **driven by the code that it documents while being easily extensible** through a structured framework. [Protobuf](#protobuf) contracts help document objects and exposed APIs for your services. These contracts alone provide many benefits, but gaps still remain in the documentation requirements of these services. Protobuffet provides the **toolset to build complete documentation of your Protobuf file workspace**.

Our documentation starts with an **enhanced view of Protobuf contracts**. The [Protobuffet CLI](/docs/how/usage#cli-commands) parses your Protobuf file workspace to generate modern documentation pages for your organization. This **automated, granular documentation is deep linked and extensible** with our toolset.

## Quick Links
- 🍿 View the [example workspace](/protodocs/protobuffet/example/ad/v1/ads.proto) for a demo.
- 🚀 Jump to [installation](/docs/how/installation) to get started.
- 🚢 Jump to [usage](/docs/how/usage) for usage and configuration.
- 📚 Learn about [Docusaurus dependency](#docusaurus).
- 📚 Learn about [Protobuf contracts](#protobuf).

## Docusaurus

**Protobuffet is built as a set of packages that extend the Docusaurus site generator with Protobuf views.**

[Docusaurus](https://docusaurus.io/docs/) provides a powerful **foundation for generating documentation** and other content-focused sites. It renders content based on markdown ([`.mdx`](https://mdxjs.com/)) files with support for React components. **Protobuffet is built on top of this foundation** to follow the same standards and practices. Flexibility is important when choosing a documentation framework for your organization and Docusaurus was the best choice for Protobuffet in this area.

I highly encourage you to get familiar with their [great documentation](https://docusaurus.io/docs/docs-introduction), but here is a summary of what it provides for this project:

- Modern Jamstack documentation site.
- Solid React and MDX foundation.
- Support of plugins and themes that allow for easy extension.
- Emphasis on developer-driven documentation.

:::info
This documentation site is also built with Docusaurus!
:::

## Protobuf

**Protobuffet builds enhanced views and documentation for your Protobuf file workspace.**

[Protocol buffers](https://developers.google.com/protocol-buffers/docs/overview) provide a language-agnostic way to serialize and access structured data. This is enabled by Protobuf contracts defined in `.proto` files. These **Protobuf files define messages, services, enums, and other data types**. Applications read these contracts in order to **interface with other processes and servers** operating on the same set of contracts.

**Protobuffet depends on a snapshot of these contracts to generate an enhanced view** of your workspace. With your contracts used as granular documentation, Protobuffet provides the building blocks to improve towards a complete documentation set.