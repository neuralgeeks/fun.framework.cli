const express = require('express');
const router = express.Router();
const Controller = require('../controllers/user.controller');
const Validators = require('../validators/user');

const fun = require('fun.framework/functions/src/routes/routes.fun')(
  router,
  new Controller()
);

fun.group([])([fun.rest(Validators.RestValidators)]);

module.exports = router;
