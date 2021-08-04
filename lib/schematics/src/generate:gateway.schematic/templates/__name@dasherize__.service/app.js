const express = require('express');
const app = express();
const server = require('http').Server(app);
const loggingMiddleware = require('./src/middleware/logging.middleware');

const Logger = require('fun.framework/classes/Logger');
const fun = require('fun.framework/functions/app.fun');

//---------------------- parse args ------------------------//
let args = fun.parseArgs(process);

//------------------------- cors ---------------------------//
const cors = require('cors');
app.use(cors());

//------------------------ logger --------------------------//
const logger = new Logger(args.name);

//----------------------- logging --------------------------//
app.use(loggingMiddleware);

//------------------------ routes --------------------------//
const gatewayRouter = require('./src/routes/gateway.routes');
app.use('/g/', gatewayRouter);

//------------------ starting the server -------------------//
fun.start(server, args.name, args.port, logger, args.listen);

//-------------------- testing export ----------------------//
module.exports = app;
