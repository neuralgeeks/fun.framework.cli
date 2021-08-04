const joi = require('joi');
const BaseRule = require('fun.framework/classes/src/BaseRule');

class DemoRule extends BaseRule {
  constructor() {
    super();
    this.name = 'Demo rule';
  }

  async body(data) {
    const validator = joi.object().keys({});
    const body = { ...data };
    await joi.validate(body, validator);

    return body;
  }

  async predicate(body) {
    return !!body;
  }

  async debug() {
    return false;
  }
}

module.exports = DemoRule;
