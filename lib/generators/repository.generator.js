const tools = require('../tools');

// Generates the repository of the resource
let generate = (basePath, resource) => {
  let templatePath =
    __dirname + '/../../templates/repositories/repository.fun-template';
  let outPath =
    basePath +
    '/src/database/repositories/' +
    resource.toLowerCase() +
    '.repository.js';
  tools.renderTemplate(templatePath, outPath, resource);
};

module.exports.generate = generate;
