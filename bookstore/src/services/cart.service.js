import { empty } from '@hapi/joi/lib/base';
import sequelize, { DataTypes } from '../config/database';
import { userAuth } from '../middlewares/auth.middleware';
const Cart = require('../models/cart')(sequelize, DataTypes);
const Book=require('../models/book')(sequelize,DataTypes);


//get all books in the cart
export const getAllBooks = async (userId) => {
    console.log("cart service=======>>>>",userId)
    const data = await Cart.findAll({where:{userId:userId}});
    console.log("[[[[[[]]]]]]",data)
    if(data.length!==0){
        return data;
    }else{
        throw new Error('cart is empty')
    }
    
  };

  //Add to cart
export const addToCart = async (id,body) => {
    const presentInStock=await Book.findOne({where:{id:id}});
    console.log("stock======",presentInStock);
    if(presentInStock!==null){
        const presentInCart=await Cart.findOne({where:{productId:presentInStock.productId,userId:body.userId}});
        if(presentInCart===null){
            const data = await Cart.create({
                userId:body.userId,
                bookName:presentInStock.bookName,
                description:presentInStock.description,
                price:presentInStock.price,
                productId:presentInStock.productId,
                quantity:1
            });
            return data;
        }
        else{
            await Cart.update({quantity:presentInCart.quantity+1,price:presentInStock.price*(presentInCart.quantity+1)},{
                where:{productId:presentInStock.productId}
            })
            const data=await Cart.findOne({where:{productId:presentInStock.productId,userId:body.userId}})
            return data;
        }
    }else{
      throw new Error("out of stock");
    }
  };

 //remove book by id from cart
 export const remove = async (id,body) => {
    const data = await Cart.findOne({where:{id:id,userId:body.userId}});
    const presentInStock=await Book.findOne({where:{productId:data.productId}});
    if(data.quantity>1){
        await Cart.update({quantity:data.quantity-1,price:presentInStock.price*(data.quantity-1)},{
            where:{id:id}
        });
    }else if(data.quantity===1){
        await Cart.destroy({where:{id:id}})
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

  //update purchase in the cart
  export const purchase = async (id,body) => {
            const data=await Cart.update({purchase:true},{
                where:{id:id,userId:body.userId}
            })
            return data;
        }