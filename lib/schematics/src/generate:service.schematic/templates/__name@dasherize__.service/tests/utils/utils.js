const request = require('supertest');
const { exec } = require('child_process');
const config = require('../test.config.json');
const microservice = config['microservice'];
const env = process.env.NODE_ENV || 'test';
const loginService = config.loginService;
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
    exec(
      `NODE_ENV=${env} npx sequelize db:seed:undo:all && NODE_ENV=${env} npx sequelize db:seed:all`,
      { env: process.env },
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

let expectEntityMatch = async (
  route,
  expectedId,
  expectedBody,
  schema,
  secret
) => {
  let res = await request(microservice)
    .get(`${route}`)
    .set('x-gateway-secret', `${secret}`);

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

let expectNotFound = async (route, secret) => {
  let res = await request(microservice)
    .get(`${route}`)
    .set('x-gateway-secret', `${secret}`);

  // ------------- Checking response --------------- //
  expect(res.statusCode).toEqual(404);
};

module.exports = {
  login: login,
  resetDatabase: resetDatabase,
  expectEntityMatch: expectEntityMatch,
  expectNotFound: expectNotFound
};
