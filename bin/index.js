#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const { Command } = require('commander');
const init = require('../lib/commands/init.command');
const generate = require('../lib/commands/generate.command');

const program = new Command();

let basePath = process.cwd();

program
  .command('init <name>')
  .description('inits the a fun.framework project with the given name')
  .action((name) => {
    init(basePath, name);
  });

// TODO: this description is really bad. Learn to do it right.
program
  .command('generate <command> <resource> [name]')
  .description(
    'generates a service or resource. command: resource/service. resource: resource name or service name. name: service name'
  )
  .action((command, resource, name) => {
    generate(basePath, command, resource, name);
  });

console.log(
  chalk.yellow(figlet.textSync('fun-cli', { horizontalLayout: 'full' }))
);

program.parse(process.argv);
