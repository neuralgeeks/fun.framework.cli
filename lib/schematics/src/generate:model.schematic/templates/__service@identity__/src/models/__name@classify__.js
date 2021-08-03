const Sequelize = require('sequelize');

class <%= classify(name) %> extends Sequelize.Model {}
<%= classify(name) %>.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    }
  },
  { sequelize, tableName: '<%= plural(camelize(name)) %>' }
);

module.exports = <%= classify(name) %>;