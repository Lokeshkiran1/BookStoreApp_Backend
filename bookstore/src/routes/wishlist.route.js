import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all books in the wishlist
router.get('', userAuth,wishlistController.getAllBooks);

//route to add book to the wishlist by book id
router.post('/:id', userAuth ,wishlistController.addToWishlist);

//route to remove book from wishlist 
router.delete('/:id',userAuth,wishlistController.removeFromWishlist);

export default router;