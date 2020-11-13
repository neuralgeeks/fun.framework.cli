const fs = require('fs');
const { renderTemplateFile } = require('template-file');

// Check if a given path exists
let checkIfPathExists = (path) => {
  return fs.existsSync(path);
};

// Creates a folder if it does not exist
let createFolder = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

// Creates a list of folders
let createFolders = (basePath, folders) => {
  folders.forEach((folder) => {
    createFolder(basePath + '/' + folder);
  });
};

// Creates a file given a path and a text
let createFile = (path, text) => {
  fs.writeFileSync(path, text);
  console.log(
    'File ' + path.split('/').slice(-1)[0] + ' created successfully.'
  );
};

// Renders a .fun-template template into a .js file for a specific resource
let renderResourceTemplate = async (templatePath, outPath, resource) => {
  const data = resourceToData(resource);
  let renderedString = await renderTemplateFile(templatePath, data);
  createFile(outPath, renderedString);
};

// Renders a .fun-template template into a .js file
let renderTemplate = async (templatePath, outPath, data) => {
  let renderedString = await renderTemplateFile(templatePath, data);
  createFile(outPath, renderedString);
};

// If resource is 'User', this will return {'User', 'users', 'user'}
// TODO: work for different resource formats: user, User, Users, users.
// TODO: careful, this resource is used earlier, so if it's going to be modified
// better do it earlier in the process than in this function.
let resourceToData = (resource) => {
  return {
    resourceCaps: resource.charAt(0).toUpperCase() + resource.slice(1),
    resourcePlural: resource.toLowerCase() + 's',
    resourceSingular: resource.toLowerCase()
  };
};

module.exports = {
  checkIfPathExists: checkIfPathExists,
  createFolder: createFolder,
  createFolders: createFolders,
  createFile: createFile,
  renderResourceTemplate: renderResourceTemplate,
  resourceToData: resourceToData,
  renderTemplate: renderTemplate
};
