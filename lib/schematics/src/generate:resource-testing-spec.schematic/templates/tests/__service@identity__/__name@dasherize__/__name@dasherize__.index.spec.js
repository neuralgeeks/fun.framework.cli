const request = require('supertest');
const joi = require('joi');

const config = require('../../test.config.json');
const app = require('../../../services/<%= dasherize(name) %>.service/app');
const utils = require('../../utils/utils');

const matchers = require('../../utils/jest.joi');
expect.extend(matchers);

const route = '/<%= plural(camelize(name)) %>/';

let token;

beforeAll(async (done) => {
  token = await utils.login(config.email, config.password);
  done();
});

describe('Get /<%= plural(camelize(name)) %>/', () => {
  it('No token should return 401', async (done) => {
    // ------------------ API call -------------------- //
    const res = await request(app).get(route);
    // ------------- Checking response --------------- //
    expect(res.statusCode).toEqual(401);
    done();
  });

  it('Get all <%= plural(camelize(name)) %> should return their data', async (done) => {
    // ------------------ API call -------------------- //
    const res = await request(app)
      .get(route)
      .set('Authorization', 'Bearer ' + token);

    // ------------- Checking response --------------- //
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.length).toBeGreaterThan(0);

    // -------------- Check attributes --------------- //
    const schema = joi.object().keys({});

    expect(res.body).toMatchSchema(schema, {});

    done();
  });
});

afterAll((done) => {
  sequelize.close();
  done();
});
