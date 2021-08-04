const BaseService = require('fun.framework/classes/src/BaseService');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/services.config.json')[env];

class AuthService extends BaseService {
  constructor({ req, res } = {}) {
    super('auth.service', config['auth.service'], { req, res });
  }

  async checkJWT(token) {
    return (await this.get(`/auth/token/${token}`)).data.data;
  }

  async getHeaders() {
    return {
      'x-gateway-secret': config.authSecret
    };
  }
}

module.exports = AuthService;
