const express=require('express');
const customerRouter=express.Router();
const customerController=require('../controller/customerController')

customerRouter.post('/customers',customerController.addCustomer)
.get('/customers',customerController.getCustomers)









module.exports=customerRouter