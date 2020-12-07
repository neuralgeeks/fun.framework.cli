const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

module.exports = (req, res, next) => {
  logger.info(
    'incoming ' + req.method + ' request at route ' + req.originalUrl
  );
  next();
};
