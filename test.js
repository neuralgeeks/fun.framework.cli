const { run } = require('./lib/schematics/API/engine');
const { version } = require('./package.json');

run(
  `${__dirname}/temp/project`,
  'generate-service',
  { version: version },
  { dryRun: false, debug: false }
);
