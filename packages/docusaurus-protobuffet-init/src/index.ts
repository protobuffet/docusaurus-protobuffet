#!/usr/bin/env node

import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import shell from 'shelljs';

const DEFAULT_TEMPLATE = 'classic';

export default async function init(
  siteName: string,
) {
  try {
    shell.exec(`npx @docusaurus/init@latest init --use-npm ${siteName} ${DEFAULT_TEMPLATE} `);
  } catch (err) {
    console.log(chalk.red('Generation of base template from @docusaurus/init failed'));
    throw err;
  }

  try {
    shell.exec(`cd ${siteName} && npm install --save docusaurus-protobuffet @easyops-cn/docusaurus-search-local`);
  } catch (err) {
    console.log(chalk.red('Installation of Protobuffet preset failed'));
    throw err;
  }

  fs.mkdirSync(`${siteName}/protodocs`);
  fs.mkdirSync(`${siteName}/fixtures`);

  fs.copyFileSync(path.resolve(__dirname, 'templates/docusaurus.config.js'), `${siteName}/docusaurus.config.js`);
  fs.copyFileSync(path.resolve(__dirname, 'templates/proto_workspace.json'), `${siteName}/fixtures/proto_workspace.json`);

  shell.exec(`cd ${siteName} && npx docusaurus generate-proto-docs`);
}
