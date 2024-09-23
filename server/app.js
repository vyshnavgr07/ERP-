const express=require('express')
const app=express()
const morgan=require('morgan');
const cors=require('cors')
app.use(express.json())
const itemsRouter=require('./src/routes/itemsRoutes')
const customerRouter=require('./src/routes/customerRoute')
const transactionRouter=require('./src/routes/transactionRoutes')
app.use(morgan('dev'))
app.use(cors())
app.use(itemsRouter)
app.use(customerRouter)
app.use(transactionRouter)





   


module.exports=app;