import sequelize, { DataTypes } from '../config/database';
const Book = require('../models/book')(sequelize, DataTypes);


//get all books
export const getAllBooks = async () => {
    const data = await Book.findAll();
    return data;
  };
  

  //get book by id
  export const getBookById = async (id) => {
    const data = await Book.findOne({where:{id:id}})
    return data;
  };