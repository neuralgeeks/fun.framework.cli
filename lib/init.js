const tools = require('./tools');
const generateService = require('./generate.service');

const initFolders = [
  'config',
  'logs',
  'migrations',
  'seeders',
  'services',
  'tests',
];

let init = (basePath) => {
  // Check if the path has an inited npm project
  if (!tools.checkIfFileExists(basePath + '/package.json')) {
    console.log('This is not a valid directory');
    return;
  }

  // Create the folders
  tools.createFolders(basePath, initFolders);

  // Generate default service
  generateService(basePath, 'API.service');

  console.log('Fun framework inited successfully');
};

module.exports = init;
