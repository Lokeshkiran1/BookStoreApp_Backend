import Sequelize, { DataTypes, Model } from 'sequelize';
import logger from '../config/logger';

import dotenv from 'dotenv';
dotenv.config();

export { DataTypes } from 'sequelize';

let DATABASE = process.env.DATABASE;
let USERNAME = process.env.USER_NAME;
let PASSWORD = process.env.PASSWORD;
let HOST = process.env.HOST;
let PORT = process.env.PORT;
let DIALECT = process.env.DIALECT;

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connected to the database.');
  })
  .catch((error) => {
    logger.error('Could not connect to the database.', error);
  });
const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.book=require('../models/book')(sequelize,DataTypes)
db.user=require('../models/user')(sequelize,DataTypes,Model)
sequelize.sync();

export default sequelize;
