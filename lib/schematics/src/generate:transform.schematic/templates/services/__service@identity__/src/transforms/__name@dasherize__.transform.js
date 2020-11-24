const BaseTransform = require('fun.framework/classes/src/BaseTransform');

class <%= classify(name) %>Transform extends BaseTransform {
  morph(<%= camelize(name) %>) {
    return {
      id: <%= camelize(name) %>.id,
      type: '<%= camelize(name) %>',
      attributes: {
        id: <%= camelize(name) %>.id,
      },
      relationships: {
      },
      links: {
        self: '/<%= camelize(name) %>/' + <%= camelize(name) %>.id
      }
    };
  }
}

module.exports = <%= classify(name) %>Transform;
