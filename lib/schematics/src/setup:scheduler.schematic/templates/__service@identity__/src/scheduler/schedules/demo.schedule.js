const BaseSchedule = require('fun.framework/classes/src/scheduler/BaseSchedule');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

class DemoSchedule extends BaseSchedule {
  async timeoutCallback() {
    logger.info('This is a demo!');
  }
}

module.exports = DemoSchedule;
