'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customerDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customerDetails.init(
    {
      userId:DataTypes.STRING,
      addressType: DataTypes.STRING,
      fullAddress: DataTypes.STRING,
      city: DataTypes.STRING,
      state:DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'customerDetails'
    }
  );
  return customerDetails;
};
