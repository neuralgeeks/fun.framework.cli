const Broadcaster = require('fun.framework/classes/src/socket/Broadcaster');
const fun = require('fun.framework/functions/src/socket/broadcaster.fun');

const DemoRule = require('./rules/demo.rule');

class ApplicationBroadcaster extends Broadcaster {
  channels() {
    return [fun.channel('demo', [new DemoRule()])];
  }
}

module.exports = ApplicationBroadcaster;
