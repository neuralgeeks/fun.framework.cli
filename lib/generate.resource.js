const tools = require('./tools');

// Generates a resource
let generateResource = (basePath, resource, serviceName) => {
  basePath += '/services/' + serviceName;
  console.log('Generating resource ' + resource);

  generateModel(basePath, resource);
  generateController(basePath, resource);
  generateRepository(basePath, resource);
  generateRoute(basePath, resource);
  generateTransform(basePath, resource);
  generateValidators(basePath, resource);
};

// Generates the model of the resource
let generateModel = (basePath, resource) => {
  let templatePath = __dirname + '/../templates/models/model.txt';
  let outPath = basePath + '/src/database/models/' + resource + '.js';
  tools.renderTemplate(templatePath, outPath, resource);
};

// Generates the controller of the resource
let generateController = (basePath, resource) => {
  let templatePath = __dirname + '/../templates/controllers/controller.txt';
  let outPath =
    basePath + '/src/controllers/' + resource.toLowerCase() + '.controller.js';
  tools.renderTemplate(templatePath, outPath, resource);
};

// Generates the repository of the resource
let generateRepository = (basePath, resource) => {
  let templatePath = __dirname + '/../templates/repositories/repository.txt';
  let outPath =
    basePath +
    '/src/database/repositories/' +
    resource.toLowerCase() +
    '.repository.js';
  tools.renderTemplate(templatePath, outPath, resource);
};

// Generates the route of the resource
let generateRoute = (basePath, resource) => {
  let templatePath = __dirname + '/../templates/routes/route.txt';
  let outPath =
    basePath + '/src/routes/' + resource.toLowerCase() + '.routes.js';
  tools.renderTemplate(templatePath, outPath, resource);
};

// Generates the transform of the resource
let generateTransform = (basePath, resource) => {
  let templatePath = __dirname + '/../templates/transforms/transform.txt';
  let outPath =
    basePath + '/src/transforms/' + resource.toLowerCase() + '.transform.js';
  tools.renderTemplate(templatePath, outPath, resource);
};

// Generates the validators of the resource
let generateValidators = (basePath, resource) => {
  // Create the resource folder
  tools.createFolder(basePath + '/src/validators/' + resource.toLowerCase());

  const validators = ['destroy', 'index', 'show', 'store', 'update'];

  validators.forEach((validator) => {
    let templatePath =
      __dirname + '/../templates/validators/' + validator + '.validator.txt';
    let outPath =
      basePath +
      '/src/validators/' +
      resource.toLowerCase() +
      '/' +
      validator +
      '.validator.js';
    tools.renderTemplate(templatePath, outPath, resource);
  });

  let templatePath = __dirname + '/../templates/validators/index.txt';
  let outPath =
    basePath + '/src/validators/' + resource.toLowerCase() + '/index.js';
  tools.renderTemplate(templatePath, outPath, resource);
};
module.exports = generateResource;
