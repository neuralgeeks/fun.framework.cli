const tools = require('../tools');

// Generates the transform of the resource
let generate = (basePath, resource) => {
  let templatePath =
    __dirname + '/../../templates/transforms/transform.fun-template';
  let outPath =
    basePath + '/src/transforms/' + resource.toLowerCase() + '.transform.js';
  tools.renderResourceTemplate(templatePath, outPath, resource);
};

module.exports.generate = generate;
