const BaseError = require('fun.framework/classes/src/BaseError');

class MissingJWTError extends BaseError {
  constructor() {
    let feed = {
      status: 403,
      title: 'missingJWT',
      detail: 'Bad request, there was no authorization JWT specified'
    };
    super(feed);
  }
}

module.exports = MissingJWTError;
