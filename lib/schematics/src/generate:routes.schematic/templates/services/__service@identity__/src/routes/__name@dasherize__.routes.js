const express = require('express');
const router = express.Router();
const JWTMiddleware = require('../middleware/JWT.middleware');
const Controller = require('../controllers/<%= dasherize(name) %>.controller');
const Validators = require('../validators/<%= dasherize(name) %>');

const fun = require('fun.framework/functions/src/routes/routes.fun')(
  router,
  new Controller()
);

fun.group([])([fun.rest(Validators.RestValidators)]);

module.exports = router;
