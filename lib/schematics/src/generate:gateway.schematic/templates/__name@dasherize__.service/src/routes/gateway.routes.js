const express = require('express');
const router = express.Router();
const Controller = require('../controllers/gateway.controller');
const JWTMiddleware = require('../middleware/JWT.middleware');
const fun = require('fun.framework/functions/src/routes/routes.fun')(
  router,
  new Controller()
);

//---------------- Available services
const APIService = require('../services/api.service');
const AuthService = require('../services/auth.service');

const apiService = new APIService();
const authService = new AuthService();

const services = [apiService, authService];
const gateway = fun.gateway();

//---------------- Public routes
fun.group([])([
  gateway(services)(['/docs/*', '/public/*'])(['get']),
  gateway([authService])(['/auth/login'])(['post'])
]);

//---------------- Private routes
gateway(services)(['/*'])(fun.methods)([JWTMiddleware]);

module.exports = router;
