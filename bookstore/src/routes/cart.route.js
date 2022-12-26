import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all books in the cart
router.get('', userAuth,cartController.getAllBooks);

//route to add book to cart by bookid
router.post('/:id', userAuth ,cartController.addToCart);

//router to the decrease qty in cart or remove from cart
router.delete('/:id',userAuth, cartController.remove);

//router to get cart total
router.get('/cartTotal',userAuth,cartController.cartTotal)

//router to add to purchase 
router.post('/purchase/:id',userAuth,cartController.purchase)

export default router;