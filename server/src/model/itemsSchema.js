const mongoose=require('mongoose');


const itemsSchema=mongoose.Schema({       
itemname:{ 
        type:String,
        required:true,
},
quantity:{
    type:Number,
    required:true,
},
unitPrice:{
    type:Number,
    required:true,
},
discountPercentage:{
    type:Number,
    required:true,
},
taxPercentage:{
    type:Number,
    required:true,
},
})

const Items=mongoose.model('Items',itemsSchema);


module.exports=Items;