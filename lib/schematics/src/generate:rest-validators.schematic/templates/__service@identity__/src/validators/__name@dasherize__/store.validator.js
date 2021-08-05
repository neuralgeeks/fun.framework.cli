const joi = require('joi');
const BaseValidator = require('fun.framework/classes/src/BaseValidator');
const fun = require('fun.framework/functions/general/errors.fun');

const Errors = require('../../errors');

class <%= classify(name) %>StoreValidator extends BaseValidator {
  constructor() {
    super();
    this.name = '<%= classify(name) %> store validator';
  }

  async validate(req, res) {
    const validator = joi.object().keys({});

    const params = {};

    await validator
      .validateAsync(params)
      .catch(fun.catch(req, res, new Errors.BadRequestError()));

    return params;
  }
}

module.exports = <%= classify(name) %>StoreValidator;
