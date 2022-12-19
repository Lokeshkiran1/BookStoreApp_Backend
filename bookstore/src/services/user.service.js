import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);
import Jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();


//get all users
export const getAllUsers = async () => {
  const data = await User.findAll();
  return data;
};

//create new user
export const newUser = async (body) => {
  const existingEmail=await User.findOne({where:{email:body.email}})
  if(existingEmail===null){
    const saltRounds=10;
    const hashPassword=bcrypt.hashSync(body.password,saltRounds);
    body.password=hashPassword;
    const data = await User.create(body);
    return data;
  }else{
    throw new Error("Oops, User with same EmailId already exists, so use different!!!");
  }
};

//login User
export const loginUser=async(body)=>{
  const data=await User.findOne({where:{email:body.email}})
  if(data!==null){
    const passwordAuthentication=bcrypt.compareSync(body.password, data.password);
    if(passwordAuthentication){
      var token=Jwt.sign(
        {firstName:data.firstName,email:data.email,id:data.id},
        process.env.SECRET_KEY
      );
      return token;
    }else{
      throw new Error('invalid password')
    }
  }else{
    throw new Error('invalid email')
  }
  
}

//update single user
export const updateUser = async (id, body) => {
  await User.update(body, {
    where: { id: id }
  });
  return body;
};

//delete single user
export const deleteUser = async (id) => {
  await User.destroy({ where: { id: id } });
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findByPk(id);
  return data;
};
