const request = require('supertest');
const config = require('../../test.config.json');
const microserviceUrl = config['microservice'];
const utils = require('../../utils/utils');
const schema = require('../../schemas/<%= dasherize(name) %>/<%= dasherize(name) %>.schema');

const matchers = require('../../utils/jest.joi');
expect.extend(matchers);

const route = '/<%= plural(camelize(name)) %>/1';

let token;

beforeAll(async (done) => {
  await utils.resetDatabase();
  token = await utils.login(config.email, config.password);
  done();
});

describe(`Get ${route}`, () => {
  it('No token should return 401', async (done) => {
    // ------------------ API call -------------------- //
    const res = await request(microserviceUrl).get(route);

    // ------------- Checking response --------------- //
    expect(res.statusCode).toEqual(401);
    done();
  });

  it('Get the <%= camelize(name) %> should return its data', async (done) => {
    // ------------------ API call -------------------- //
    const res = await request(microserviceUrl)
      .get(route)
      .set('Authorization', `Bearer ${token}`);

    // ------------- Checking response --------------- //
    expect(res.statusCode).toEqual(200);

    // -------------- Check attributes --------------- //
    expect(res.body).toMatchSchema(schema.schema, {});
    expect(res.body.data.attributes.id).toBe(1);

    done();
  });
});

afterAll((done) => {
  sequelize.close();
  done();
});
