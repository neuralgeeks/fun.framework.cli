const { run } = require('./lib/schematics/API/engine');
const { version } = require('./package.json');

run(__dirname, 'init', { version: version });
