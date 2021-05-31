const BaseError = require('fun.framework/classes/src/BaseError');

class ResourceNotFoundError extends BaseError {
  constructor(meta) {
    let feed = {
      status: 404,
      title: 'resourceNotFound',
      detail: 'Requested resource not found',
      meta: meta
    };
    super(feed);
  }
}

module.exports = ResourceNotFoundError;
