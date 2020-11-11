const Sequelize = require('sequelize');
const JWT = require('./JWT');

let User = global.sequelize.define(
  'User',
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
  },
  { tableName: 'users' }
);

// --------------------- Relationships ---------------------- //

// ----------------------- JWT (1:m) ------------------------ //
User.hasMany(JWT, { as: 'JWT', foreignKey: 'userId' });
JWT.belongsTo(User, { as: 'owner', foreignKey: 'userIid' });

module.exports = User;
