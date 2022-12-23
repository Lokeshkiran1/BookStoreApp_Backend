import HttpStatus from 'http-status-codes';
import * as wishlistService from '../services/wishlist.service';


export const getAllBooks = async (req, res, next) => {
    try {
      const data = await wishlistService.getAllBooks(req.body.userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All books from wishlist fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };


  export const addToWishlist = async (req, res, next) => {
    try {
      const data = await wishlistService.addToWishlist(req.params.id,req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Added to wishlist successfully'
      });
    } catch (error) {
      next(error);
    }
  };


  export const removeFromWishlist = async (req, res, next) => {
    try {
      const data = await wishlistService.removeFromWishlist(req.params.id,req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'removed item from wishlist successfully'
      });
    } catch (error) {
      next(error);
    }
  };