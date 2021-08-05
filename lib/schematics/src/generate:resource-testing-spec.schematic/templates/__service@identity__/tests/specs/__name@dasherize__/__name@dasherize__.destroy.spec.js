const request = require('supertest');
const config = require('../../test.config.json');
const utils = require('../../utils/utils');
const microserviceUrl = config.microservice;

const route =
  '/<%= plural(camelize(name)) %>/facade01-0000-4000-a000-000000000000';

let token;

beforeAll(async () => {
  await utils.resetDatabase();
  token = await utils.login(config.email, config.password);
});

describe(`Delete ${route}`, () => {
  it('No token should return 401', async () => {
    //------------------ API call
    const res = await request(microserviceUrl).delete(route);

    //------------------ Checking response
    expect(res.statusCode).toEqual(401);
  });

  it('Deleting the <%= camelize(name) %> should return 200', async () => {
    //------------------ API call
    const res = await request(microserviceUrl)
      .delete(route)
      .set('Authorization', `Bearer ${token}`);

    //------------------ Checking response
    expect(res.statusCode).toEqual(200);
    expect(res.body.meta).toHaveProperty('affectedRows');
    expect(res.body.meta.affectedRows).toEqual(1);

    //------------------ Checking if deleted
    await utils.expectNotFound(route, token);
  });
});

afterAll(async () => {});
