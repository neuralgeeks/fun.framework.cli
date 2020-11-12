const serviceGenerator = require('../generators/service.generator');
const resourceGenerator = require('../generators/resource.generator');

let generate = (basePath, command, resource, name) => {
  if (command === 'service') {
    serviceGenerator.generate(basePath, resource);
  } else if (command === 'resource') {
    resourceGenerator.generate(basePath, resource, name);
  }
};

module.exports = generate;
