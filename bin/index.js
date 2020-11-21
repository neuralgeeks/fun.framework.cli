#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const { Command } = require('commander');
const init = require('../lib/commands/init.command');
const generate = require('../lib/commands/generate.command');

const program = new Command();

let path = process.cwd();

// -------------------------- init ---------------------------- //
program
  .command('init')
  .description('inits a fun.framework project')
  .action(() => {
    init(path);
  });

// --------------------- Generate service --------------------- //
program
  .command('generate:service')
  .description('generates a service inside a fun.framework project')
  .action(() => {
    generate(path, 'service');
  });

// --------------------- Generate resource --------------------- //
program
  .command('generate:resource')
  .description('generates a Restful resource inside a fun.framework service.')
  .action(() => {
    generate(path, 'resource');
  });

console.log(
  chalk.yellow(figlet.textSync('fun-cli', { horizontalLayout: 'full' }))
);

program.parse(process.argv);
