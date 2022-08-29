const { fork } = require('child_process');
const config = require('./config/start.config.json');

//---------------- fork the node service
let child = fork(`${__dirname}/app`, [config.name, config.port, true], {
  silent: true,
  stdio: 'inherit'
});

//---------------- catch error
child.on('error', (error) =>
  console.log(`${config.name} process error: ${error.message}`)
);

child.on('close', (code) =>
  console.log(`${config.name} process exited with code ${code}`)
);
