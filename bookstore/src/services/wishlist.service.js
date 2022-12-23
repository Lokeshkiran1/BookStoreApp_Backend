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
export const addToWishlist = async (id,body) => {
    console.log(body)
    const presentInStock=await Book.findOne({where:{id:id}});
        const presentInWishlist=await Wishlist.findOne({where:{productId:presentInStock.productId,userId:body.userId}});
        if(presentInWishlist===null){
            const data = await Wishlist.create({
              userId:body.userId,
              bookName:presentInStock.bookName,
              description:presentInStock.description,
              productId:presentInStock.productId
            });
            return data;
        }
        else{
                throw new Error("already in wishlist")
            }
  };

  export const removeFromWishlist=async(id,body)=>{
    const data=await Wishlist.destroy({where:{id:id,userId:body.userId}});
    if(data!==null){
      return data;
    }else{
      throw new Error('product is not in wishlist to delete')
    }
  }