const tools = require('../tools');

// Generates the model of the resource
let generate = (basePath, resource) => {
  let templatePath = __dirname + '/../../templates/models/model.fun-template';
  let outPath = basePath + '/src/database/models/' + resource + '.js';
  tools.renderTemplate(templatePath, outPath, resource);
};

module.exports.generate = generate;
