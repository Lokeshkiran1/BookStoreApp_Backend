import sequelize, { DataTypes } from '../config/database';
import { userAuth } from '../middlewares/auth.middleware';
const Cart = require('../models/cart')(sequelize, DataTypes);
const Book=require('../models/book')(sequelize,DataTypes);


//get all books in the cart
export const getAllBooks = async (userId) => {
    console.log("cart service=======>>>>",userId)
    const data = await Cart.findAll({where:{userId:userId}});
    return data;
  };

  //Add to cart
export const addToCart = async (body) => {
    console.log(body)
    const presentInStock=await Book.findOne({where:{bookName:body.bookName}});
    if(presentInStock!==null){
        const presentInCart=await Cart.findOne({where:{bookName:body.bookName,userId:body.userId}});
        //console.log("===========>>>>>>>",presentInCart)
        if(presentInCart===null){
            const data = await Cart.create(body);
            return data;
        }
        else{
            await Cart.update({quantity:presentInCart.quantity+1,price:presentInStock.price*(presentInCart.quantity+1)},{
                where:{bookName:body.bookName}
            })
        }
    }else{
      throw new Error("out of stock");
    }
  };

 //remove book by id from cart
 export const remove = async (id) => {
    const data = await Cart.findOne({where:{productId:id}})
    const presentInStock=await Book.findOne({where:{productId:id}});
    console.log("qty=============........",data.quantity)
    if(data.quantity>1){
        await Cart.update({quantity:data.quantity-1,price:presentInStock.price*(data.quantity-1)},{
            where:{productId:id}
        })  
    }else if(data.quantity===1){
        await Cart.destroy({where:{productId:id}})
    }
    return "";
  };

  //get cart total price
export const cartTotal = async (userId) => {
    //console.log("cart service=======>>>>",userId)
    const data = await Cart.findAll({where:{userId:userId}});
    var total=0;
    for(var obj of data){
        total=total+obj.price
    }
    return total;
  };

  