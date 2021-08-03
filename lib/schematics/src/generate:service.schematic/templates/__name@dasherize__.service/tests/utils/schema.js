const joi = require('joi');

module.exports = (attributes, relationships) => {
  const baseSchema = joi
    .object()
    .keys({
      attributes: attributes,
      relationships: relationships
    })
    .unknown();

  //--------------- Define schema
  const schema = joi
    .object()
    .keys({
      data: baseSchema.required()
    })
    .unknown()
    .required();

  //-------------- Define array schema
  const arraySchema = joi
    .object()
    .keys({
      data: joi.array().items(baseSchema).required()
    })
    .unknown()
    .required();

  return {
    attributes: attributes,
    relationships: relationships,
    schema: schema,
    arraySchema: arraySchema
  };
};
