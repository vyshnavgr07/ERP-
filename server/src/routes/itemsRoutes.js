const express=require('express');
const itemsRouter=express.Router();
const itemsController=require('../controller/itemsController')
itemsRouter.post('/items',itemsController.AddItems)
.get('/items',itemsController.getData)









module.exports=itemsRouter