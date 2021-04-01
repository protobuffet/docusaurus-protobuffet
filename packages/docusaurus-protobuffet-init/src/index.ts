#!/usr/bin/env node

import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import { execSync } from 'child_process';

const DEFAULT_TEMPLATE = 'classic';

export default async function init(
  siteName: string,
) {
  console.log(chalk.cyan('Triggering @docusaurus/core project creation.'));

  try {
    execSync(`npx @docusaurus/init@latest init --use-npm ${siteName} ${DEFAULT_TEMPLATE} `, { stdio: 'inherit' });
  } catch (err) {
    console.log(chalk.red('Generation of base template from @docusaurus/init failed.'));
    throw err;
  }

  console.log(chalk.cyan('Installing docusaurus-protobuffet with recommended plugins.'));

  try {
    execSync(`cd ${siteName} && npm install --save docusaurus-protobuffet @easyops-cn/docusaurus-search-local`, { stdio: 'inherit' });
  } catch (err) {
    console.log(chalk.red('Installation of Protobuffet preset failed.'));
    throw err;
  }

  console.log(chalk.cyan('Initializing docusaurus-protobuffet with default options and sample fixtures.'))

  fs.mkdirSync(`${siteName}/protodocs`);
  fs.mkdirSync(`${siteName}/fixtures`);
  fs.writeFileSync(`${siteName}/sidebarsProtodocs.js`, '');

  fs.copyFileSync(path.resolve(__dirname, 'templates/docusaurus.config.js'), `${siteName}/docusaurus.config.js`);
  fs.copyFileSync(path.resolve(__dirname, 'templates/proto_workspace.json'), `${siteName}/fixtures/proto_workspace.json`);

  console.log(chalk.cyan('Generating Proto doc files for sample fixtures.'));

  try {
    execSync(`cd ${siteName} && npx docusaurus generate-proto-docs`, { stdio: 'inherit' });
  } catch (err) {
    console.log(chalk.red('Generation of Proto docs failed.'));
    throw err;
  }

  console.log(chalk.green('Successful setup of Docusaurus site with Protobuffet preset! Try it out with `npm run start` in the site directory.'));
}
