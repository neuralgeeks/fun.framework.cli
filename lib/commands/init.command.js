const { run } = require('../schematics/API/engine');
const { version } = require('../../package.json');

let init = async (path) => {
  run(
    path,
    'init',
    { version: version },
    { dryRun: false, debug: false, force: false }
  );
};

module.exports = init;
