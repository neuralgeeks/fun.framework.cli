const Scheduler = require('fun.framework/classes/src/scheduler/Scheduler');
const fun = require('fun.framework/functions/src/scheduler/scheduler.fun');

const DemoSchedule = require('./schedules/demo.schedule');

class ApplicationScheduler extends Scheduler {
  schedules() {
    return [
      fun.schedule(DemoSchedule, 'demo', {
        timeout: 500
      })
    ];
  }
}

module.exports = ApplicationScheduler;
