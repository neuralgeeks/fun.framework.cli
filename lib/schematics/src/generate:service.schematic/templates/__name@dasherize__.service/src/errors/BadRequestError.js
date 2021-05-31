const BaseError = require('fun.framework/classes/src/BaseError');

class BadRequestError extends BaseError {
  constructor(reason) {
    let feed = {
      status: 400,
      title: 'badRequest',
      detail: 'The request body was invalid',
      meta: {
        reason: reason
      }
    };
    super(feed);
  }
}

module.exports = BadRequestError;
