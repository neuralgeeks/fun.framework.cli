const jwt = require('jsonwebtoken');

const fun = require('fun.framework/functions/general/errors.fun');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const UserRepository = require('../database/repositories/user.repository');
const userRepository = new UserRepository();

const Errors = require('../errors');

module.exports = async (req, res, next) => {
  try {
    logger.info('running Bearer scheme authorization ...');

    // ---------------------- getting the Auth -------------------- //
    let auth = req.get('Authorization');
    if (!auth) {
      let reason = 'Missing authorization';
      fun.throw(req, res, new Errors.UnauthorizedError(reason));
    }
    auth = auth.trim();
    let authSplit = auth.split(' ');

    // ------------------- validating auth scheme ------------------- //
    let authScheme = authSplit[0];
    if (authScheme != 'Bearer') {
      let reason = 'Wrong auth scheme, expected Bearer. given: ' + authScheme;
      fun.throw(req, res, new Errors.UnauthorizedError(reason));
    }

    // ------------------ validating the token --------------------- //
    let token = authSplit[1];
    if (!token) {
      fun.throw(req, res, new Errors.JWT.MissingJWTError());
    }

    // ------------------ decoding the Auth JWT -------------------- //
    let decoded = jwt.decode(token);
    if (!decoded) {
      fun.throw(req, res, new Errors.JWT.BadJWTError(token));
    }

    // ----------------- validate decoded user id ------------------ //
    if (isNaN(decoded.user)) {
      fun.throw(req, res, new Errors.JWT.BadJWTError(token));
    }

    // --------------- getting the valid JWT secret ---------------- //
    let validJWT = await userRepository.validJWT(decoded.user);
    if (!validJWT) {
      fun.throw(req, res, new Errors.JWT.InvalidJWTError(token));
    }

    // -------------------- verifying the JWT ----------------------- //
    try {
      jwt.verify(token, validJWT.secret);
    } catch {
      fun.throw(req, res, new Errors.JWT.InvalidJWTError(token));
    }

    logger.info('Request authorized by Bearer scheme');
    next();
  } catch (err) {
    logger.error(err);
  }
};
