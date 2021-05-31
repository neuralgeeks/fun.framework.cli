const joi = require('joi');
const BaseValidator = require('fun.framework/classes/src/BaseValidator');
const fun = require('fun.framework/functions/general/errors.fun');

const Errors = require('../../errors');

class <%= classify(name) %>DestroyValidator extends BaseValidator {
  constructor() {
    super();
    this.name = '<%= classify(name) %> destroy validator';
  }

  async validate(req, res) {
    const validator = joi.object().keys({
      id: joi.number().integer().required()
    });

    const params = {
      id: req.params.id
    };

    await joi
      .validate(params, validator)
      .catch(fun.catch(req, res, new Errors.BadRequestError()));

    return params;
  }
}

module.exports = <%= classify(name) %>DestroyValidator;
