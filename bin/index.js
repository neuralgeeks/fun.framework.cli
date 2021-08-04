#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const { Command } = require('commander');
const init = require('../lib/commands/init.command');
const generate = require('../lib/commands/generate.command');

const program = new Command();

/**
 * @license
 * Copyright 2020 neuralgeeks LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let path = process.cwd();

//---------------------- init
program
  .command('init')
  .description('inits a fun.framework project.')
  .action(() => {
    init(path);
  });

//---------------------- Generate service
program
  .command('generate:service')
  .description('generates a service inside a fun.framework project.')
  .action(() => {
    generate(path, 'service');
  });

//---------------------- Generate gateway service
program
  .command('generate:gateway')
  .description(
    'generates a new gateway service inside a fun.framework project.'
  )
  .action(() => {
    generate(path, 'gateway');
  });

//---------------------- Generate resource
program
  .command('generate:resource')
  .description('generates a Restful resource inside a fun.framework service.')
  .action(() => {
    generate(path, 'resource');
  });

//---------------------- Generate service interface
program
  .command('generate:service-interface')
  .description(
    'generates a new service interface inside a fun.framework service.'
  )
  .action(() => {
    generate(path, 'service-interface');
  });

console.log(
  chalk.yellow(figlet.textSync('fun.cli', { horizontalLayout: 'full' }))
);

program.parse(process.argv);
