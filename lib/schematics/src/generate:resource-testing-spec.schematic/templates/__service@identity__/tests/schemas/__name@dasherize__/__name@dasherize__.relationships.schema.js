const joi = require('joi');

const data = (schema) =>
  joi.object().keys({
    data: schema
  });

module.exports = joi.object().keys({});
