const fun = require('fun.framework/functions/general/errors.fun');
const JWTFun = require('fun.framework/functions/general/JWT.fun');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const { validate: uuidValidate } = require('uuid');

const UserRepository = require('../repositories/user.repository');
const userRepository = new UserRepository();

module.exports = async (req, res, next) => {
  try {
    logger.debug('running Bearer scheme authorization ...');

    //--------------------- validate schema
    let schema = JWTFun.http.decodeBearerScheme(req, res);
    await JWTFun.http.verifyUserToken(
      req,
      res,
      schema,
      userRepository.validJWT,
      {
        indexingProperty: 'userId',
        rejectionFunction: (id) => !uuidValidate(id)
      }
    );

    logger.debug('Request authorized by Bearer scheme');
    next();
  } catch (err) {
    fun.internal(req, res, err);
  }
};
