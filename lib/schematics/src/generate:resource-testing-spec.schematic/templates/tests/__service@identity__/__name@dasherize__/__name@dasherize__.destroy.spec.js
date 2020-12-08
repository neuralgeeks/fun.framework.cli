const request = require('supertest');
const config = require('../../test.config.json');
const app = require('../../../services/<%= dasherize(name) %>.service/app');
const utils = require('../../utils/utils');

const route = '/<%= plural(camelize(name)) %>/1';

let token;

beforeAll(async (done) => {
  await utils.resetDatabase();
  token = await utils.login(config.email, config.password);
  done();
});

describe('Delete /<%= plural(camelize(name)) %>/1', () => {
  it('No token should return 401', async (done) => {
    // ------------------ API call -------------------- //
    const res = await request(app).delete(route);

    // ------------- Checking response --------------- //
    expect(res.statusCode).toEqual(401);
    done();
  });

  it('Deleting the <%= camelize(name) %> should return 200', async (done) => {
    // ------------------ API call -------------------- //
    const res = await request(app)
      .delete(route)
      .set('Authorization', 'Bearer ' + token);

    // ------------- Checking response --------------- //
    expect(res.statusCode).toEqual(200);
    expect(res.body.meta).toHaveProperty('affectedRows');
    expect(res.body.meta.affectedRows).toEqual(1);
    done();
  });
});

afterAll((done) => {
  sequelize.close();
  done();
});
