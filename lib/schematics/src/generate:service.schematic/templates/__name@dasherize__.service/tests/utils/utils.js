const request = require('supertest');
const config = require('../test.config.json');
const { resetDatabase } = require('./database.utils');
const microservice = config.microservice;
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

let expectEntityMatch = async (
  route,
  expectedId,
  expectedBody,
  schema,
  token
) => {
  let res = await request(microservice)
    .get(route)
    .set('Authorization', `Bearer ${token}`);

  //------------- Checking response
  expect(res.statusCode).toEqual(200);

  //-------------- Check attributes
  expect(res.body).toMatchSchema(schema, {});

  //-------------- Check values
  let data = res.body.data;

  expect(data.id).toBe(expectedId);

  for (let key of Object.keys(expectedBody))
    expect(data.attributes[key]).toBe(expectedBody[key]);
};

let expectNotFound = async (route, token) => {
  let res = await request(microservice)
    .get(route)
    .set('Authorization', `Bearer ${token}`);

  //------------- Checking response
  expect(res.statusCode).toEqual(404);
};

module.exports = {
  login,
  resetDatabase,
  expectEntityMatch,
  expectNotFound
};
