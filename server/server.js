const app=require('./app')
const env=require('dotenv');
env.config({path:'./.env'});
const port=process.env.PORT;
const dbConnection=require('./src/db/dbConnection')
dbConnection()






app.listen(port,()=>{
    console.log(`server is listening on ${port}`)
})