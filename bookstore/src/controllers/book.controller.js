import HttpStatus from 'http-status-codes';
import * as bookService from '../services/book.service';


export const getAllBooks = async (req, res, next) => {
    try {
      const data = await bookService.getAllBooks();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All users fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  

  /* get a particualar book by id*/
export const getBookById=async(req,res,next)=>{
    try{
        const data=await bookService.getBookById(req.params.id);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:data,
            message:'book fetched successfully'
        });
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:`${error}`
        });
    }
};
