const BaseError = require('fun.framework/classes/src/BaseError');

class WrongCredentialsError extends BaseError {
  constructor() {
    let feed = {
      status: 400,
      title: 'wrongCredentials',
      detail: 'Wrong login credentials'
    };
    super(feed);
  }
}

module.exports = WrongCredentialsError;
