const bcrypt = require('bcrypt');
const R = require('ramda');
const BCRYPT_SALT_ROUNDS = 11;

const BaseController = require('fun.framework/classes/src/BaseController');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const UserRepository = require('../database/repositories/user.repository');
const UserTransform = require('../transforms/user.transform');

const Errors = require('../errors');
const userRepository = new UserRepository();

class UserController extends BaseController {
  constructor() {
    super();

    this.transforms = {
      user: new UserTransform(),
    };
  }

  /**
   * @api {get} users/ getAllUsers
   * @apiName getAllUsers
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiDescription Get all users
   *
   * @apiHeader {Header} Authorization JWT Bearer security token.
   *
   * @apiSuccess {Array} data Returns an array of users
   *
   */
  async index(req, res, validated) {
    //--------------------- getting users data ---------------------//
    let users = await userRepository.all();

    //---------------------- sending response ----------------------//
    this.response(res).JSONAPI.data(users, this.transforms.user.collection);
  }

  /**
   * @api {get} users/:id getUser
   * @apiName getUser
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiDescription Get a user
   *
   * @apiHeader {Header} Authorization JWT Bearer security token.
   *
   * @apiSuccess {Object} data Returns the data of a user
   *
   */
  async show(req, res, validated) {
    //---------------------- getting user data ---------------------//
    let user = await userRepository.show(validated.id);
    if (!user) {
      this.throw(req, res, new Errors.ResourceNotFoundError());
    }

    //---------------------- sending response ----------------------//
    this.response(res).JSONAPI.data(user, this.transforms.user.item);
  }

  /**
   * @api {post} users/:id createUser
   * @apiName createUser
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiDescription Create a user
   *
   * @apiHeader {Header} Authorization JWT Bearer security token.
   *
   * @apiParam {String} example Example param
   *
   * @apiSuccess {Object} data Returns the id of the new user
   *
   */
  async store(req, res, validated) {
    //----------------------- creating user ------------------------//
    validated.password = await bcrypt.hash(
      validated.password,
      BCRYPT_SALT_ROUNDS
    );
    let user = await userRepository.create(validated);

    //---------------------- sending response ----------------------//
    this.response(res, 201).JSONAPI.reference(user.id, 'user');
  }

  /**
   * @api {put} users/:id updateUser
   * @apiName updateUser
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiDescription Update a user
   *
   * @apiHeader {String} Authorization JWT Bearer security token.
   *
   * @apiSuccess {Object} data Returns the id of the updated user.
   *
   */
  async update(req, res, validated) {
    //----------------------- updating user ------------------------//
    let affectedRows = await userRepository.update(validated.id, validated);

    //---------------------- sending response ----------------------//
    this.response(res).JSONAPI.reference(validated.id, 'user', {
      meta: {
        affectedRows: affectedRows[0],
      },
    });
  }

  /**
   * @api {delete} users/:id deleteUser
   * @apiName deleteUser
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiDescription Delete a user
   *
   * @apiParam {Header} Authorization JWT Bearer security token.
   *
   * @apiSuccess {Object} meta Returns the affected rows.
   *
   */
  async destroy(req, res, validated) {
    //----------------------- deleting user ------------------------//
    let affectedRows = await userRepository.delete(validated.id);

    //---------------------- sending response ----------------------//
    this.response(res).JSONAPI.meta({
      affectedRows: affectedRows,
    });
  }
}

module.exports = UserController;
