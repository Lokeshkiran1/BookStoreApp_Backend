'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  book.init(
    {
      bookName: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.STRING,
      productId:DataTypes.STRING,
      quantity:DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'book'
    }
  );
  return book;
};