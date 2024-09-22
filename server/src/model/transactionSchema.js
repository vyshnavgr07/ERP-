const mongoose=require('mongoose');


const transactionSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",                                    
        required:true
    },
    items: [
        {
          itemId: {
            type: mongoose.Schema.ObjectId,
            ref: "Items",
            required: true,
          },
          qty: {
            type: Number, 
            required: true,
            min: 0, 
          },
        },
      ],
    totalAmount:{
        type:Number,
    },


})


const Transaction=mongoose.model("Transaction",transactionSchema)


module.exports=Transaction;