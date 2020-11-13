const tools = require('../tools');
const modelGenerator = require('./model.generator');
const repositoryGenerator = require('./repository.generator');
const controllerGenerator = require('./controller.generator');
const routesGenerator = require('./routes.generator');
const transformGenerator = require('./transform.generator');
const restValidatorGenerator = require('./restValidators.generator');

// Generates a resource
let generate = async (basePath, resource, serviceName) => {
  basePath += '/services/' + serviceName;
  console.log('Generating resource ' + resource);

  await modelGenerator.generate(basePath, resource);
  await repositoryGenerator.generate(basePath, resource);

  await controllerGenerator.generate(basePath, resource);

  await routesGenerator.generate(basePath, resource);
  await transformGenerator.generate(basePath, resource);
  await restValidatorGenerator.generate(basePath, resource);
};

module.exports.generate = generate;
