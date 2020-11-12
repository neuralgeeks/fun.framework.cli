const tools = require('../tools');

const serviceFolders = [
  'logs',
  'src',
  'src/controllers',
  'src/database',
  'src/database/models',
  'src/database/repositories',
  'src/errors',
  'src/middlewares',
  'src/routes',
  'src/sockets',
  'src/transforms',
  'src/validators'
];

let generateService = (basePath, serviceName) => {
  basePath += '/services/' + serviceName;

  // Create the service folder
  tools.createFolder(basePath);

  // Create the folders
  tools.createFolders(basePath, serviceFolders);

  console.log('Service ' + serviceName + ' generated.');
};

module.exports.generate = generateService;
