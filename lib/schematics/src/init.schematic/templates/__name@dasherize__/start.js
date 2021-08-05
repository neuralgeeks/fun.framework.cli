const { fork } = require('child_process');
const config = require('./init.config.json');

//------------------ loop through the services
config.services.forEach((item) => {
  //---------------- fork the node service
  let child = fork(
    `${__dirname}/${item.service}/app`,
    [item.name, item.port, true],
    {
      silent: true,
      stdio: 'inherit'
    }
  );

  //---------------- catch error
  child.on('error', (error) => {
    console.log(`${item.name} process error: ${error.message}`);
  });

  child.on('close', (code) => {
    console.log(`${item.name} process exited with code ${code}`);
  });
});
