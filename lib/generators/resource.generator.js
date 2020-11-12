const tools = require('../tools');
const modelGenerator = require('./model.generator');
const repositoryGenerator = require('./repository.generator');
const controllerGenerator = require('./controller.generator');
const routesGenerator = require('./routes.generator');
const transformGenerator = require('./transform.generator');
const restValidatorGenerator = require('./restValidators.generator');

// Generates a resource
let generate = (basePath, resource, serviceName) => {
  basePath += '/services/' + serviceName;
  console.log('Generating resource ' + resource);

  modelGenerator.generate(basePath, resource);
  repositoryGenerator.generate(basePath, resource);

  controllerGenerator.generate(basePath, resource);

  routesGenerator.generate(basePath, resource);
  transformGenerator.generate(basePath, resource);
  restValidatorGenerator.generate(basePath, resource);
};

module.exports.generate = generate;
