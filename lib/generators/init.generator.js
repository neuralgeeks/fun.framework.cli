const tools = require('../tools');

// Generates all the files needed for the init command
let generate = (basePath, name) => {
  // config/db.config
  let templatePath = __dirname + '/../../templates/init/dbConfig.fun-template';
  let outPath = basePath + '/config/db.config.json';
  tools.renderTemplate(templatePath, outPath, {});

  // config/start.config
  templatePath = __dirname + '/../../templates/init/startConfig.fun-template';
  outPath = basePath + '/config/start.config.json';
  tools.renderTemplate(templatePath, outPath, {});

  // .gitignore
  templatePath = __dirname + '/../../templates/init/gitignore.fun-template';
  outPath = basePath + '/.gitignore';
  tools.renderTemplate(templatePath, outPath, {});

  // .sequelizerc
  templatePath = __dirname + '/../../templates/init/sequelizerc.fun-template';
  outPath = basePath + '/.sequelizerc';
  tools.renderTemplate(templatePath, outPath, {});

  // npm-install.js
  templatePath = __dirname + '/../../templates/init/npm-install.fun-template';
  outPath = basePath + '/npm-install.js';
  tools.renderTemplate(templatePath, outPath, {});

  // start.js
  templatePath = __dirname + '/../../templates/init/start.fun-template';
  outPath = basePath + '/start.js';
  tools.renderTemplate(templatePath, outPath, {});

  // README.md
  templatePath = __dirname + '/../../templates/init/readme.fun-template';
  outPath = basePath + '/README.md';
  tools.renderTemplate(templatePath, outPath, {});

  // package.json
  templatePath = __dirname + '/../../templates/init/package.json.fun-template';
  outPath = basePath + '/package.json';
  tools.renderTemplate(templatePath, outPath, { name: name });
};

module.exports.generate = generate;
