const Transaction =require('../model/transactionSchema')

const addtransaction = async (req, res) => {
    try {
        const { userId, items, totalAmount,invoiceNumber } = req.body;
        console.log(userId,items,totalAmount,invoiceNumber,"invoiceee")
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

  
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "Items are required and should not be empty" });
        }

 
        for (const item of items) {
            if (!item.itemId) {
                return res.status(400).json({ error: "Item ID is required for each item" });
            }
            if (!item.qty || item.qty < 0) {
                return res.status(400).json({ error: "Quantity must be a positive number for each item" });
            }
            if (!item.Amount) {
                return res.status(400).json({ error: "Amount is required for each item" });
            }
            if (typeof item.Discount === 'undefined') {
                return res.status(400).json({ error: "Discount is required for each item" });
            }
        }


        if (!totalAmount) {
            return res.status(400).json({ error: "Total amount is required" });
        }


        const transaction = new Transaction({ userId, items, totalAmount,invoiceNumber });
        await transaction.save();


        res.status(200).json({
            message: 'Transaction saved successfully',
            transaction
        });

    } catch (error) {
        console.log(error,"err");
        res.status(500).json({ error: "An error occurred while saving the transaction" });
    }
};

const getTransaction=async(req,res)=>{
try {
    const transa=await Transaction.find().populate('userId')
    res.status(200).json({
        message: 'Transaction fetched successfully',
        transa
    });
} catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while saving the transaction" });
}
}

module.exports={addtransaction,getTransaction}