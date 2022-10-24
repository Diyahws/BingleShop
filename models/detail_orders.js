'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  detail_orders.init({
    order_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detail_orders',
  });

  detail_orders.associate = function (models) {
    detail_orders.hasOne(models.items, { as: 'items' })
    detail_orders.belongsToMany(models.orders, { as: 'orders' })
  }
  return detail_orders;
};