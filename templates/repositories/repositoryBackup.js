const BaseRepository = require('fun.framework/classes/src/BaseRepository');

const User = require('../models/User');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
}

module.exports = UserRepository;
