const BaseTransform = require('fun.framework/classes/src/BaseTransform');

class UserTransform extends BaseTransform {
  morph(user) {
    return {
      id: user.id,
      type: 'user',
      attributes: {
        id: user.id,
      },
      relationships: {
      },
      links: {
        self: '/user/' + user.id
      }
    };
  }
}

module.exports = UserTransform;
