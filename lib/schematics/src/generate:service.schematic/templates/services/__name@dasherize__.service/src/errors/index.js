const JWT = require('./JWT');
const Auth = require('./Auth');
const BadRequestError = require('./BadRequestError');
const ResourceNotFoundError = require('./ResourceNotFoundError');
const UnauthorizedError = require('./UnauthorizedError');

module.exports = {
  JWT: JWT,
  Auth: Auth,
  BadRequestError: BadRequestError,
  ResourceNotFoundError: ResourceNotFoundError,
  UnauthorizedError: UnauthorizedError
};
