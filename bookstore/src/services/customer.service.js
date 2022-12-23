import sequelize, { DataTypes } from '../config/database';
const customerDetails =require('../models/customerDetails')(sequelize, DataTypes);

//create new customer details
export const addCustomerDetails = async (body) => {
    const data=await customerDetails.create(body)
        // userId:body.userId,
        // addressType:body.addressType,
        // fullAddress:body.fullAddress,
        // city:body.city,
        // state:body.state
    // })
      return data;
  };