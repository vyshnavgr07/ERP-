const mongoose=require('mongoose');

const customerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
     billingAddress:{
        type:String,
        required:true
     },
     Balance:{
        type:Number,
        required:true,
        default:500
     }
  
})


const Customer=mongoose.model('Customer',customerSchema)

module.exports=Customer