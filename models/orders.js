'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orders.init({
    user_id: DataTypes.INTEGER,
    time_order: DataTypes.DATE,
    status_order: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'orders',
  });

  orders.associate = function (models) {
    orders.belongsTo(models.users, { as: 'users' })
    orders.belongsToMany(models.detail_orders, { as: 'detail_orders' })
  }

  return orders;
};