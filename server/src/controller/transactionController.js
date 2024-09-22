const Transaction =require('../model/transactionSchema')


const addtransaction=async(req,res)=>{
    try {
        const data=req.body;
        const transaction=await Transaction({...data})
        await transaction.save()
        res.status(200).json({
        message:'succesfully fetched data',
            transaction
        })
    } catch (error) {
        console.log(error)
    }
}




module.exports={addtransaction}