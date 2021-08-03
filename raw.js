const { run } = require('./lib/schematics/API/engine');
const { version } = require('./package.json');

run(
  `${__dirname}/temp/`,
  'init',
  { version: version },
  { dryRun: false, debug: true }
);

// run(
//   `${__dirname}/temp/project`,
//   'generate-service',
//   { version: version },
//   { dryRun: false, debug: false }
// );

// run(
//   `${__dirname}/temp/project`,
//   'generate-resource',
//   { version: version },
//   { dryRun: false, debug: true, force: false }
// );

/**
 * - Init with API
 * - Generate second service
 * - Generate full resource x2 (API)
 * - Generate full resource x2 (second)
 */
