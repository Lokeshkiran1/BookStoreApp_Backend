import express from 'express';
import * as bookController from '../controllers/book.controller';

const router = express.Router();

//route to get all books
router.get('', bookController.getAllBooks);

//route to get a single book by id
router.get('/:id', /*userAuth*/ bookController.getBookById);

export default router;