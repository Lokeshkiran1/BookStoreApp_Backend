import HttpStatus from 'http-status-codes';
import * as cartService from '../services/cart.service';


export const getAllBooks = async (req, res, next) => {
    try {
      const data = await cartService.getAllBooks(req.body.userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All books from cart fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };


  export const addToCart = async (req, res, next) => {
    try {
      const data = await cartService.addToCart(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Added to cart successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  export const remove = async (req, res, next) => {
    try {
      const data = await cartService.remove(req.params.id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'book deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  