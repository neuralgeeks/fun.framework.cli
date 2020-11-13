#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const { Command } = require('commander');
const init = require('../lib/commands/init.command');
const generate = require('../lib/commands/generate.command');

const program = new Command();

let basePath = process.cwd();

// -------------------------- init ---------------------------- //
program
  .command('init <name>')
  .description('inits the a fun.framework project with the given name')
  .action((name) => {
    init(basePath, name);
  });

// TODO: this description is really bad. Learn to do it right.
// --------------------- Generate service --------------------- //
program
  .command('generate:service <name>')
  .description(
    'generates a service or resource with the given name. name: the service name.'
  )
  .action((name) => {
    generate(basePath, 'service', { name: name });
  });

// --------------------- Generate resource --------------------- //
program
  .command('generate:resource <name> [service]')
  .description(
    "generates a resource inside the given service. name: the resource name. service: name of the service, default is 'API.service'"
  )
  .action((name, service) => {
    generate(basePath, 'resource', {
      name: name,
      service: service
    });
  });

console.log(
  chalk.yellow(figlet.textSync('fun-cli', { horizontalLayout: 'full' }))
);

program.parse(process.argv);
