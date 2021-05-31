const fun = require('fun.framework/functions/general/errors.fun');
const JWTFun = require('fun.framework/functions/general/JWT.fun');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/services.config.json')[env];
const Errors = require('../errors');

module.exports = async (req, res, next) => {
  try {
    logger.debug('running Gateway Secret authorization ...');

    let secret = req.get('x-gateway-secret');
    if (!secret) {
      fun.throw(
        req,
        res,
        new Errors.UnauthorizedError('No x-gateway-secret defined')
      );
    }

    if (secret !== config.authSecret) {
      let reason = 'Wrong Gateway Secret.';
      fun.throw(req, res, new Errors.UnauthorizedError(reason));
    }

    delete req.headers['x-gateway-secret'];

    logger.debug('Request authorized by secret authorization');
    next();
  } catch (err) {
    fun.internal(req, res, err);
  }
};
