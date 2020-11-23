const BaseRepository = require('fun.framework/classes/src/BaseRepository');

const <%= classify(name) %> = require('../models/<%= classify(name) %>');

class <%= classify(name) %>Repository extends BaseRepository {
  constructor() {
    super(<%= classify(name) %>);
  }
}

module.exports = <%= classify(name) %>Repository;
