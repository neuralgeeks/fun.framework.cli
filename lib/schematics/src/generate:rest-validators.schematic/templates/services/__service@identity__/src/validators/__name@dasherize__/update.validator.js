const joi = require('joi');
const R = require('ramda');
const BaseValidator = require('fun.framework/classes/src/BaseValidator');
const fun = require('fun.framework/functions/general/errors.fun');

const Errors = require('../../errors');

class <%= classify(name) %>UpdateValidator extends BaseValidator {
  constructor() {
    super();
    this.name = '<%= classify(name) %> update validator';
  }

  async validate(req, res) {
    const validator = joi.object().keys({});

    const params = {};

    await joi
      .validate(params, validator)
      .catch(fun.catch(req, res, new Errors.BadRequestError()));

    return params;
  }
}

module.exports = <%= classify(name) %>UpdateValidator;
