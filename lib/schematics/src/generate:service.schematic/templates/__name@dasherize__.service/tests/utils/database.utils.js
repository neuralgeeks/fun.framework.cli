const { exec } = require('child_process');
const env = process.env.NODE_ENV || 'development';

const resetDatabase = ({ verb = false } = {}) =>
  new Promise((resolve, reject) => {
    const commands = [
      `NODE_ENV=${env} npx sequelize db:migrate:undo:all`,
      `NODE_ENV=${env} npx sequelize db:migrate`,
      `NODE_ENV=${env} npx sequelize db:seed:all`
    ];

    exec(commands.join(' && '), { env: process.env }, (err, stdout) => {
      if (verb) console.log(stdout);
      if (err) reject(err);
      else resolve();
    });
  });

module.exports = { resetDatabase };
