import { use } from 'chai';
import express from 'express';
import * as customerController from '../controllers/customer.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add customer details
router.post('', userAuth, customerController.addCustomerDetails);

export default router;