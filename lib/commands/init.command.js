const { fork } = require('child_process');
const tools = require('../tools');
const serviceGenerator = require('../generators/service.generator');
const initGenerator = require('../generators/init.generator');

const initFolders = [
  'config',
  'logs',
  'migrations',
  'seeders',
  'services',
  'tests'
];

let init = (basePath, name) => {
  // Check if the path has an inited npm project
  if (tools.checkIfPathExists(basePath + '/' + name)) {
    console.log(`The directory '${name}' already exists`);
    return;
  }

  // Create base folder
  tools.createFolders(basePath, [name]);
  basePath += '/' + name;

  // Create the folders
  tools.createFolders(basePath, initFolders);

  // Generate the files
  initGenerator.generate(basePath, name);

  // Generate default service
  serviceGenerator.generate(basePath, 'API.service');

  console.log('Fun framework inited successfully');

  console.log('Running npm-install');

  // // fork the npm-install script
  // let child = fork(`${basePath}/npm-install.js`, [], {
  //   silent: true,
  //   stdio: 'inherit'
  // });

  // // catch error
  // child.on('error', (error) => {
  //   console.log(`npm-install process error: ${error.message}`);
  // });

  // child.on('close', (code) => {
  //   console.log(`npm-install process exited with code ${code}`);
  // });
};

module.exports = init;
