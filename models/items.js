'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  items.init({
    nama_item: DataTypes.STRING,
    harga_item: DataTypes.FLOAT,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'items',
  });

  items.associate = function (models) {
    items.belongsTo(models.users, { as: 'users' })
    items.belongsTo(models.detail_orders, { as: 'detail orders' })
  }

  return items;
};