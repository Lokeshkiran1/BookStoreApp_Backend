import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all books in the cart
router.get('', userAuth,cartController.getAllBooks);

//route to add book by id
router.post('/addCart', userAuth ,cartController.addToCart);

//router to increase the quantity and total price
router.delete('/:id',userAuth, cartController.remove);

export default router;