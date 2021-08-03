const BaseTransform = require('fun.framework/classes/src/BaseTransform');

class <%= classify(name) %>Transform extends BaseTransform {
  morph(<%= camelize(name) %>) {
    return {
      id: <%= camelize(name) %>.id,
      type: '<%= camelize(name) %>',
      attributes: {},
      relationships: {}
    };
  }
}

module.exports = <%= classify(name) %>Transform;
