import sequelize, { DataTypes } from '../config/database';
const Wishlist=require('../models/wishlist')(sequelize,DataTypes);
const Book=require('../models/book')(sequelize,DataTypes);



//get all books in the wishlist
export const getAllBooks = async (userId) => {
    console.log("wishlist service=======>>>>",userId)
    const data = await Wishlist.findAll({where:{userId:userId}});
    return data;
  };


   //Add to wishlist
export const addToWishlist = async (body) => {
    console.log(body)
    const presentInStock=await Book.findOne({where:{bookName:body.bookName}});
    if(presentInStock!==null){
        const presentInWishlist=await Wishlist.findOne({where:{bookName:body.bookName,userId:body.userId}});
        //console.log("===========>>>>>>>",presentInCart)
        if(presentInWishlist===null){
            const data = await Wishlist.create(body);
            return data;
        }
        else{
                throw new Error("already in wishlist")
            }
    }else{
      throw new Error("out of stock");
    }
  };