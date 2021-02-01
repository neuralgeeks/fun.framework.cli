const R = require('ramda');

const BaseController = require('fun.framework/classes/src/BaseController');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const <%= classify(name) %>Repository = require('../database/repositories/<%= dasherize(name) %>.repository');
const <%= classify(name) %>Transform = require('../transforms/<%= dasherize(name) %>.transform');

const Errors = require('../errors');
const <%= camelize(name) %>Repository = new <%= classify(name) %>Repository();

class <%= classify(name) %>Controller extends BaseController {
  constructor() {
    super();

    this.transforms = {
      <%= camelize(name) %>: new <%= classify(name) %>Transform(),
    };
  }

  /**
   * @api {get} <%= plural(camelize(name)) %>/ getAll<%= plural(classify(name)) %>
   * @apiName getAll<%= plural(classify(name)) %>
   * @apiGroup <%= classify(name) %>
   * @apiVersion 1.0.0
   * @apiDescription Get all <%= plural(camelize(name)) %>
   *
   * @apiHeader {Header} Authorization JWT Bearer security token.
   *
   * @apiSuccess {Array} data Returns an array of <%= plural(camelize(name)) %>
   *
   */
  async index(req, res, validated) {
    //--------------------- getting <%= plural(camelize(name)) %> data ---------------------//
    let <%= plural(camelize(name)) %> = await <%= camelize(name) %>Repository.all();

    //--------------------- sending response ----------------------//
    this.response(res).JSONAPI.data(<%= plural(camelize(name)) %>, this.transforms.<%= camelize(name) %>.collection);
  }

  /**
   * @api {get} <%= plural(camelize(name)) %>/:id get<%= classify(name) %>
   * @apiName get<%= classify(name) %>
   * @apiGroup <%= classify(name) %>
   * @apiVersion 1.0.0
   * @apiDescription Get a <%= camelize(name) %>
   *
   * @apiHeader {Header} Authorization JWT Bearer security token.
   *
   * @apiSuccess {Object} data Returns the data of a <%= camelize(name) %>
   *
   */
  async show(req, res, validated) {
    //---------------------- getting <%= camelize(name) %> data ---------------------//
    let <%= camelize(name) %> = await <%= camelize(name) %>Repository.show(validated.id);
    if (!<%= camelize(name) %>) {
      this.throw(req, res, new Errors.ResourceNotFoundError());
    }

    //---------------------- sending response ----------------------//
    this.response(res).JSONAPI.data(<%= camelize(name) %>, this.transforms.<%= camelize(name) %>.item);
  }

  /**
   * @api {post} <%= plural(camelize(name)) %> create<%= classify(name) %>
   * @apiName create<%= classify(name) %>
   * @apiGroup <%= classify(name) %>
   * @apiVersion 1.0.0
   * @apiDescription Creates a <%= camelize(name) %>
   *
   * @apiHeader {Header} Authorization JWT Bearer security token.
   *
   * @apiParam {String} example Example param
   *
   * @apiSuccess {Object} data Returns the id of the new <%= camelize(name) %>
   *
   */
  async store(req, res, validated) {
    //----------------------- creating <%= camelize(name) %> ------------------------//
    let <%= camelize(name) %> = await <%= camelize(name) %>Repository.create(validated);

    //---------------------- sending response ----------------------//
    this.response(res, 201).JSONAPI.reference(<%= camelize(name) %>.id, '<%= plural(camelize(name)) %>');
  }

  /**
   * @api {put} <%= plural(camelize(name)) %>/:id update<%= classify(name) %>
   * @apiName update<%= classify(name) %>
   * @apiGroup <%= classify(name) %>
   * @apiVersion 1.0.0
   * @apiDescription Updates a <%= camelize(name) %>
   *
   * @apiHeader {String} Authorization JWT Bearer security token.
   *
   * @apiSuccess {Object} data Returns the id of the updated <%= camelize(name) %>.
   *
   */
  async update(req, res, validated) {
    //----------------------- updating <%= camelize(name) %> ------------------------//
    let affectedRows = await <%= camelize(name) %>Repository.update(validated.id, validated);

    //---------------------- sending response ----------------------//
    this.response(res).JSONAPI.reference(validated.id, '<%= plural(camelize(name)) %>', {
      meta: {
        affectedRows: affectedRows[0],
      },
    });
  }

  /**
   * @api {delete} <%= plural(camelize(name)) %>/:id delete<%= classify(name) %>
   * @apiName delete<%= classify(name) %>
   * @apiGroup <%= classify(name) %>
   * @apiVersion 1.0.0
   * @apiDescription Deletes a <%= camelize(name) %>.
   *
   * @apiParam {Header} Authorization JWT Bearer security token.
   *
   * @apiSuccess {Object} meta Returns the affected rows.
   *
   */
  async destroy(req, res, validated) {
    //----------------------- deleting  <%= camelize(name) %>. ------------------------//
    let affectedRows = await  <%= camelize(name) %>Repository.delete(validated.id);

    //---------------------- sending response ----------------------//
    this.response(res).JSONAPI.meta({
      affectedRows: affectedRows,
    });
  }
}

module.exports = <%= classify(name) %>Controller;
