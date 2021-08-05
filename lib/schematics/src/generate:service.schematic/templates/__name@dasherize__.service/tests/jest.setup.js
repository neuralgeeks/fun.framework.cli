const { fork } = require('child_process');
const dbUtils = require('./utils/database.utils');

module.exports = async () => {
  //------------------ Resetting DB
  await dbUtils.resetDatabase();

  //------------------ Turn on services
  global.__SERVICESFORK__ = fork(`${__dirname}/../../start.js`, {
    silent: true,
    stdio: 'inherit'
  });

  //------------------ Waiting for services to start
  await new Promise((r) => setTimeout(r, 3000));
};
