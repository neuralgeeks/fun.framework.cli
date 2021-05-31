const joi = require('joi');
const BaseValidator = require('fun.framework/classes/src/BaseValidator');
const fun = require('fun.framework/functions/general/errors.fun');

const Errors = require('../../errors');

class <%= classify(name) %>IndexValidator extends BaseValidator {
  constructor() {
    super();
    this.name = '<%= classify(name) %> index validator';
  }

  async validate(req, res) {
    return {};
  }
}

module.exports = <%= classify(name) %>IndexValidator;
