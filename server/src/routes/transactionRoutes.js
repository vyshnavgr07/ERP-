const express=require('express');
const transactionRouter=express.Router();
const transactionController=require('../controller/transactionController')
transactionRouter.post('/transaction',transactionController.addtransaction)










module.exports=transactionRouter