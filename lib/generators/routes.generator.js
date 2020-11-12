const tools = require('../tools');

// Generates the routes of the resource
let generate = (basePath, resource) => {
  let templatePath = __dirname + '/../../templates/routes/routes.fun-template';
  let outPath =
    basePath + '/src/routes/' + resource.toLowerCase() + '.routes.js';
  tools.renderResourceTemplate(templatePath, outPath, resource);
};

module.exports.generate = generate;
