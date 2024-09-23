const mongoose=require('mongoose');


const transactionSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"Customer",                                    
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
          unit:{
            type:String,
            default:"Bag"
      
          },
          Discount:{
            type:Number,
            required: true,
         },
         Amount:{
          type:Number,
          required: true,
         }

        },
      ], 
      invoiceNumber:{            
        type:String,
        required: true,
       },
       Date:{
        type:Date,
        default:Date.now
       },
    totalAmount:{
        type:Number,
        required: true,
    },


})


const Transaction=mongoose.model("Transaction",transactionSchema)


module.exports=Transaction;