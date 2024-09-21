const Items=require('../model/itemsSchema')
const AddItems = async (req, res) => {
    try {
        const data = req.body;
        const { name, bal } = data;
        const existname = await Items.findOne({ name });
        if (existname) {
            return res.status(400).json({ message: 'Item with this name already exists' });
        }

       const item = new Items({ ...data });
        await item.save();

        res.status(200).json({ message: 'Item added successfully', item });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};












module.exports={AddItems}