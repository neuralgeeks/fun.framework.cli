const serviceGenerator = require('../generators/service.generator');
const resourceGenerator = require('../generators/resource.generator');
const tools = require('../tools');

let generate = async (basePath, command, resource, name) => {
  if (!tools.pathIsFunProject(basePath)) {
    console.error('Directory is not a fun.framework project');
    return;
  }

  if (command === 'service') {
    await serviceGenerator.generate(basePath, resource);
  } else if (command === 'resource') {
    await resourceGenerator.generate(basePath, resource, name);
  }
};

module.exports = generate;
