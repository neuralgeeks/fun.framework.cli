const { run } = require('../schematics/API/engine');
const { version } = require('../../package.json');

let generate = async (path, command) => {
  if (command === 'service') {
    run(
      path,
      'generate-service',
      { version: version },
      { dryRun: false, debug: false, force: false }
    );
  } else if (command === 'resource') {
    run(
      path,
      'generate-resource',
      { version: version },
      { dryRun: false, debug: false, force: false }
    );
  }
};

module.exports = generate;
