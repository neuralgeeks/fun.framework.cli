const request = require('supertest');
const config = require('../../test.config.json');
const microserviceUrl = config['microservice'];
const utils = require('../../utils/utils');
const schema = require('../../schemas/<%= dasherize(name) %>/<%= dasherize(name) %>.schema');

const matchers = require('../../utils/jest.joi');
expect.extend(matchers);

const route =
  '/<%= plural(camelize(name)) %>/facade01-0000-4000-a000-000000000000';

let token;

beforeAll(async () => {
  token = await utils.login(config.email, config.password);
});

describe(`Put ${route}`, () => {
  let body = {};

  it('No token should return 401', async () => {
    //------------------ API call
    const res = await request(microserviceUrl).put(route);

    //------------------ Checking response
    expect(res.statusCode).toEqual(401);
  });

  it('Updating a direct attribute of the <%= camelize(name) %> actually updates the attribute', async () => {
    //------------------ Setting variables
    let directAttributes = []; // Example: ['foo', 'bar']

    await Promise.all(
      directAttributes.map(async (parameter) => {
        //------------------ Setting variables
        let localBody = {};
        localBody[parameter] = body[parameter];

        //------------------ API call
        const update = await request(microserviceUrl)
          .put(route)
          .set('Authorization', `Bearer ${token}`)
          .send(localBody);

        //------------------ Checking response
        expect(update.statusCode).toEqual(200);

        //------------------ GET call
        const res = await request(microserviceUrl)
          .get(route)
          .set('Authorization', `Bearer ${token}`);

        //------------------ Checking changes
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes[parameter]).toEqual(
          localBody[parameter]
        );
      })
    );
  });

  it('Updating all parameters of the <%= camelize(name) %> returns 200', async () => {
    //------------------ Setting variables
    let { ...localBody } = body;

    //------------------ API call
    const res = await request(microserviceUrl)
      .put(route)
      .set('Authorization', `Bearer ${token}`)
      .send(localBody);

    //------------------ Checking response
    expect(res.statusCode).toEqual(200);

    //------------------ Checking if it was updated
    let modelId = res.body.data.id;

    await utils.expectEntityMatch(
      `${route}`,
      modelId,
      localBody,
      schema.schema,
      token
    );
  });

  it('Update some parameters of the <%= camelize(name) %> returns 200', async () => {
    //------------------ Setting variables
    let parameters = Object.keys(body);

    await Promise.all(
      parameters.map(async (parameter) => {
        //------------------ Setting variables
        let { ...localBody } = body;
        delete localBody[parameter];

        //------------------ API call
        const res = await request(microserviceUrl)
          .put(route)
          .set('Authorization', `Bearer ${token}`)
          .send(localBody);

        //------------------ Checking response
        expect(res.statusCode).toEqual(200);

        //------------------ Checking if it was updated
        let modelId = res.body.data.id;

        await utils.expectEntityMatch(
          `${route}`,
          modelId,
          localBody,
          schema.schema,
          token
        );
      })
    );
  });
});

afterAll(async () => {});
