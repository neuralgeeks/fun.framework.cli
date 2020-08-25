const generateService = require('./generate.service');
const generateResource = require('./generate.resource');

function generate(basePath, command, resource, name) {
  if (command === 'service') {
    generateService(basePath, resource);
  } else if (command === 'resource') {
    generateResource(basePath, resource, name);
  }
}

module.exports = generate;
