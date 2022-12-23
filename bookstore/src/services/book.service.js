import sequelize, { DataTypes } from '../config/database';
const Book = require('../models/book')(sequelize, DataTypes);


//get all books
export const getAllBooks = async () => {
    const data = await Book.findAll();
    if(data.length!=0){
      return data;
    }else{
      throw new Error('no books available currently')
    }
    
  };
  

  //get book by id
  export const getBookById = async (id) => {
    const data = await Book.findOne({where:{id:id}})
    if(data!=null){
      return data;
    }else{
      throw new Error('no books are available with this id');
    }
    
  };