const BaseError = require('fun.framework/classes/src/BaseError');

class UnauthorizedError extends BaseError {
  constructor(detail) {
    let feed = {
      status: 401,
      title: 'unauthorized',
      detail: detail
    };
    super(feed);
  }
}

module.exports = UnauthorizedError;
