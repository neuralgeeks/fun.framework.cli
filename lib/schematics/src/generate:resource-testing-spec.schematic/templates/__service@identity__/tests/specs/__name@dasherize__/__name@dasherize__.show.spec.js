const request = require('supertest');
const config = require('../../test.config.json');
const utils = require('../../utils/utils');
const schema = require('../../schemas/<%= dasherize(name) %>/<%= dasherize(name) %>.schema');
const microserviceUrl = config.microservice;

const matchers = require('../../utils/jest.joi');
expect.extend(matchers);

const route =
  '/<%= plural(camelize(name)) %>/facade01-0000-4000-a000-000000000000';

let token;

beforeAll(async () => {
  token = await utils.login(config.email, config.password);
});

describe(`Get ${route}`, () => {
  it('No token should return 401', async () => {
    //------------------ API call
    const res = await request(microserviceUrl).get(route);

    //------------------ Checking response
    expect(res.statusCode).toEqual(401);
  });

  it('Get the <%= camelize(name) %> should return its data', async () => {
    //------------------ API call
    const res = await request(microserviceUrl)
      .get(route)
      .set('Authorization', `Bearer ${token}`);

    //------------------ Checking response
    expect(res.statusCode).toEqual(200);

    //------------------ Check attributes
    expect(res.body).toMatchSchema(schema.schema, {});
    expect(res.body.data.id).toBe('facade01-0000-4000-a000-000000000000');
  });
});

afterAll(async () => {});
