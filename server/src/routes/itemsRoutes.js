const express=require('express');
const itemsRouter=express.Router();
const itemsController=require('../controller/itemsController')
itemsRouter.post('/items',itemsController.AddItems)










module.exports=itemsRouter