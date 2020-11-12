const tools = require('../tools');

// Generates the validators of the resource
let generate = (basePath, resource) => {
  // Create the resource folder
  tools.createFolder(basePath + '/src/validators/' + resource.toLowerCase());

  const validators = ['destroy', 'index', 'show', 'store', 'update'];

  validators.forEach((validator) => {
    let templatePath =
      __dirname +
      '/../../templates/validators/' +
      validator +
      '.validator.fun-template';
    let outPath =
      basePath +
      '/src/validators/' +
      resource.toLowerCase() +
      '/' +
      validator +
      '.validator.js';
    tools.renderTemplate(templatePath, outPath, resource);
  });

  let templatePath =
    __dirname + '/../../templates/validators/index.fun-template';
  let outPath =
    basePath + '/src/validators/' + resource.toLowerCase() + '/index.js';
  tools.renderTemplate(templatePath, outPath, resource);
};

module.exports.generate = generate;
