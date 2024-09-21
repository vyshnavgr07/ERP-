const Customer = require('../model/customerSchema'); 


const addCustomer = async (req, res) => {
    try {
        const { name, phoneNumber, billingAddress, Balance } = req.body;

        const newCustomer = new Customer({
            name,
            phoneNumber,
            billingAddress,
            Balance 
        });

  
        const savedCustomer = await newCustomer.save();

        
        res.status(201).json({
            message: 'Customer added successfully',
            customer: savedCustomer
        });
    } catch (error) {
        console.error('Error adding customer:', error);
        res.status(500).json({ message: 'Server error, could not add customer' });
    }
};


const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find(); 
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Server error, could not fetch customers' });
    }
};


const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id); 
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ message: 'Server error, could not fetch customer' });
    }
};




module.exports = {
    addCustomer,
    getCustomers,
    getCustomerById,
};
