const Sequelize = require('sequelize');

let <%= classify(name) %> = global.sequelize.define(
  '<%= classify(name) %>',
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  { tableName: '<%= plural(camelize(name)) %>' }
);

module.exports = <%= classify(name) %>;