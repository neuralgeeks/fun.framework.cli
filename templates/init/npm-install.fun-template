const path = require('path');
const { spawn } = require('child_process');
const R = require('ramda');
const config = require('./config/start.config.json');

// ------- get the installable services without duplicates ------- //
let installable = R.uniq(
  config.services.map((item) => {
    return item.service;
  })
);

// -------------------- Build the shell command ------------------- //
let cmd = installable.reduce((acc, next) => {
  return `${acc} & (cd ${path.join(
    __dirname,
    'services',
    next
  )} && npm install && npm rebuild)`;
}, '(npm install)');

// -------------------- spawn the shell command ------------------- //
const child = spawn(cmd, {
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.log(`error: ${error.message}`);
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
