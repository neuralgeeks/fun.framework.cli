const request = require('supertest');
const { exec } = require('child_process');
const config = require('../test.config.json');
const app = require('../../services/api.service/app');
const env = process.env.NODE_ENV || 'test';
const loginService = require(config.loginService);
const loginRoute = config.loginRoute;

const matchers = require('./jest.joi');
expect.extend(matchers);

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
        ' npx sequelize db:seed:undo:all && NODE_ENV=' +
        env +
        ' npx sequelize db:seed:all',
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

let expectEntityMatch = async (
  route,
  expectedId,
  expectedBody,
  schema,
  token
) => {
  let res = await request(app)
    .get(`${route}`)
    .set('Authorization', `Bearer ${token}`);

  // ------------- Checking response --------------- //
  expect(res.statusCode).toEqual(200);

  // -------------- Check attributes --------------- //
  expect(res.body).toMatchSchema(schema, {});

  // ---------------- Check values ----------------- //
  let data = res.body.data;

  expect(data.attributes.id).toBe(expectedId);

  for (let key of Object.keys(expectedBody)) {
    expect(data.attributes[key]).toBe(expectedBody[key]);
  }
};

let expectNotFound = async (route, token) => {
  let res = await request(app)
    .get(`${route}`)
    .set('Authorization', `Bearer ${token}`);

  // ------------- Checking response --------------- //
  expect(res.statusCode).toEqual(404);
};

module.exports = {
  login: login,
  resetDatabase: resetDatabase,
  expectEntityMatch: expectEntityMatch,
  expectNotFound: expectNotFound
};
