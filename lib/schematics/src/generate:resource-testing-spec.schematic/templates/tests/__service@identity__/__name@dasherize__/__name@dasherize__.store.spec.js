const request = require('supertest');
const config = require('../../test.config.json');
const app = require('../../../services/<%= dasherize(name) %>.service/app');
const utils = require('../../utils/utils');

const route = '/<%= plural(camelize(name)) %>/';

let token;

beforeAll(async (done) => {
  token = await utils.login(config.email, config.password);
  done();
});

describe('Post /<%= plural(camelize(name)) %>/', () => {
  let body = {};

  it('No token should return 401', async (done) => {
    // ------------------ API call -------------------- //
    const res = await request(app).post(route);

    // ------------- Checking response --------------- //
    expect(res.statusCode).toEqual(401);
    done();
  });

  it('Missing a parameter returns 400', async (done) => {
    // --------------- Setting variables -------------- //
    let parameters = Object.keys(body);

    await Promise.all(
      parameters.map((parameter) => {
        return async () => {
          // --------------- Setting variables -------------- //
          let { ...localBody } = body;
          delete localBody[parameter];

          // ------------------ API call -------------------- //
          const res = await request(app)
            .post(route)
            .set('Authorization', 'Bearer ' + token)
            .send(localBody);

          // ------------- Checking response --------------- //
          expect(res.statusCode).toEqual(400);
        };
      })
    );

    done();
  });

  it('Create the <%= camelize(name) %> should return 201 and store the resource', async (done) => {
    // --------------- Setting variables -------------- //
    let { ...localBody } = body;

    // ------------------ API call -------------------- //
    const post = await request(app)
      .post(route)
      .set('Authorization', 'Bearer ' + token)
      .send(localBody);

    // ------------- Checking response --------------- //
    expect(post.statusCode).toEqual(201);
    expect(typeof post.body.data.id).toBe('number');

    // ------------------ GET call -------------------- //
    const res = await request(app)
      .get(`${route}/${post.body.data.id}`)
      .set('Authorization', 'Bearer ' + token);

    // --------------- Checking store --------------- //
    expect(res.statusCode).toEqual(200);

    // --------- Checking stored attributes ---------- //
    const schema = joi.object().keys({});

    expect(res.body).toMatchSchema(schema, {});

    done();
  });
});

afterAll((done) => {
  sequelize.close();
  done();
});
