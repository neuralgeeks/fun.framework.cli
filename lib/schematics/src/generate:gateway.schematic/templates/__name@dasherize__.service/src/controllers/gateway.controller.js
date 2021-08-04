const BaseController = require('fun.framework/classes/src/BaseController');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const Errors = require('../errors');

class GatewayController extends BaseController {}

module.exports = GatewayController;
