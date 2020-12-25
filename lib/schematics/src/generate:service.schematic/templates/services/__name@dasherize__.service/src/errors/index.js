const Auth = require('./Auth');
const BadRequestError = require('./BadRequestError');
const ResourceNotFoundError = require('./ResourceNotFoundError');
const UnauthorizedError = require('./UnauthorizedError');

module.exports = {
  Auth: Auth,
  BadRequestError: BadRequestError,
  ResourceNotFoundError: ResourceNotFoundError,
  UnauthorizedError: UnauthorizedError
};
