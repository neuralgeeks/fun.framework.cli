const { version } = require('../../package.json');
const tools = require('../tools');

// Generates all the files needed for the init command
let generate = async (basePath, name) => {
  // fun-cli.json
  let templatePath =
    __dirname + '/../../templates/init/fun-cli.json.fun-template';
  let outPath = basePath + '/fun-cli.json';
  await tools.renderTemplate(templatePath, outPath, { version: version });

  // config/db.config
  templatePath = __dirname + '/../../templates/init/dbConfig.fun-template';
  outPath = basePath + '/config/db.config.json';
  await tools.renderTemplate(templatePath, outPath, {});

  // config/start.config
  templatePath = __dirname + '/../../templates/init/startConfig.fun-template';
  outPath = basePath + '/config/start.config.json';
  await tools.renderTemplate(templatePath, outPath, {});

  // .gitignore
  templatePath = __dirname + '/../../templates/init/gitignore.fun-template';
  outPath = basePath + '/.gitignore';
  await tools.renderTemplate(templatePath, outPath, {});

  // .sequelizerc
  templatePath = __dirname + '/../../templates/init/sequelizerc.fun-template';
  outPath = basePath + '/.sequelizerc';
  await tools.renderTemplate(templatePath, outPath, {});

  // npm-install.js
  templatePath = __dirname + '/../../templates/init/npm-install.fun-template';
  outPath = basePath + '/npm-install.js';
  await tools.renderTemplate(templatePath, outPath, {});

  // start.js
  templatePath = __dirname + '/../../templates/init/start.fun-template';
  outPath = basePath + '/start.js';
  await tools.renderTemplate(templatePath, outPath, {});

  // README.md
  templatePath = __dirname + '/../../templates/init/readme.fun-template';
  outPath = basePath + '/README.md';
  await tools.renderTemplate(templatePath, outPath, {});

  // package.json
  templatePath = __dirname + '/../../templates/init/package.json.fun-template';
  outPath = basePath + '/package.json';
  await tools.renderTemplate(templatePath, outPath, { name: name });
};

module.exports.generate = generate;
