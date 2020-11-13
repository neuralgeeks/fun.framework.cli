const tools = require('../tools');

// Generates the validators of the resource
let generate = async (basePath, resource) => {
  // Create the resource folder
  tools.createFolder(basePath + '/src/validators/' + resource.toLowerCase());

  const validators = ['destroy', 'index', 'show', 'store', 'update'];

  let validatorRenders = validators.map((validator) => {
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
    return tools.renderResourceTemplate(templatePath, outPath, resource);
  });

  await Promise.all(validatorRenders);

  let templatePath =
    __dirname + '/../../templates/validators/index.fun-template';
  let outPath =
    basePath + '/src/validators/' + resource.toLowerCase() + '/index.js';
  await tools.renderResourceTemplate(templatePath, outPath, resource);
};

module.exports.generate = generate;
