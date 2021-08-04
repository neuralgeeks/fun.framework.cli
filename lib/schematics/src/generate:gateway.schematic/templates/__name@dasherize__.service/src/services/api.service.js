const BaseService = require('fun.framework/classes/src/BaseService');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/services.config.json')[env];

class APIService extends BaseService {
  constructor({ req, res } = {}) {
    super('api.service', config['api.service'], { req, res });
  }

  async getHeaders() {
    return {
      'x-gateway-secret': config.authSecret
    };
  }
}

module.exports = APIService;
