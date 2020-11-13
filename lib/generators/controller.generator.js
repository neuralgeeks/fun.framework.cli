const tools = require('../tools');

// Generates the controller of the resource
let generate = async (basePath, resource) => {
  let templatePath =
    __dirname + '/../../templates/controllers/controller.fun-template';
  let outPath =
    basePath + '/src/controllers/' + resource.toLowerCase() + '.controller.js';
  await tools.renderResourceTemplate(templatePath, outPath, resource);
};

module.exports.generate = generate;
