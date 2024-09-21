const mongoose=require('mongoose');


const transactionSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    itemId:{
        type:mongoose.Schema.ObjectId,
        ref:"Items",
        required:true
    },
    totalAmount:{
        type:Number,
    }
})


const Transaction=mongoose.model("Transaction",transactionSchema)