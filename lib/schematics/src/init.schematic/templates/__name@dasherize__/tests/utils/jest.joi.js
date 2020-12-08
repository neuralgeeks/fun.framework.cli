const joi = require('joi');

const toMatchSchema = (data, schema, options) => {
  const { error } = joi.validate(data, schema, options);
  const valid = error == null;

  if (valid) {
    return {
      message: () => 'Success',
      pass: true
    };
  } else {
    return {
      message: () => {
        const { details } = error;
        const message = details.map((i) => ({
          message: i.message,
          path: i.path,
          validationFailed: i.type.split('.').pop()
        }));
        return JSON.stringify(message, null, 2);
      },
      pass: false
    };
  }
};

module.exports = {
  toMatchSchema
};
