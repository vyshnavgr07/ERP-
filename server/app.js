const express=require('express')
const app=express()
const morgan=require('morgan');

app.use(express.json())
const itemsRouter=require('./src/routes/itemsRoutes')
const customerRouter=require('./src/routes/customerRoute')
app.use(morgan('dev'))

app.use(itemsRouter)
app.use(customerRouter)








module.exports=app;