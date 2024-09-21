const mongoose=require('mongoose')
async function dbConnection() {
mongoose.connect(process.env.DB_URL,{dbName:'ERPsystem'})
.then(()=>console.log('db connected succesfully'))
.catch((err)=>console.log(err))
}


module.exports=dbConnection