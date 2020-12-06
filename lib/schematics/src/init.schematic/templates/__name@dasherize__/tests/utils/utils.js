const request = require('supertest');
const { exec } = require('child_process');
const config = require('../test.config.json');
const env = process.env.NODE_ENV || 'development';
const loginService = require(config.loginService);
const loginRoute = config.loginRoute;

let login = async (email, password) => {
  let localBody = {
    email: email,
    password: password
  };

  const res = await request(loginService).post(loginRoute).send(localBody);
  return res.body.data.attributes.token;
};

let resetDatabase = async () => {
  return new Promise((resolve, reject) => {
    const migrateReset = exec(
      'NODE_ENV=' +
        env +
        ' sequelize db:seed:undo:all && NODE_ENV=' +
        env +
        ' sequelize db:seed:all',
      { env: process.env },
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
    // migrateReset.stdout.pipe(process.stdout);
    // migrateReset.stderr.pipe(process.stderr);
  });
};

module.exports.login = login;
module.exports.resetDatabase = resetDatabase;
