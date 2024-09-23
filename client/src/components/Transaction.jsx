import React, { useEffect, useState } from 'react';
import { Search, PlusCircle, Printer, ArrowUpDown, MoreVertical } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Transaction = () => {
  const navigate=useNavigate()
  const base_url = import.meta.env.VITE_BASE_URL;
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/transaction`);
      setTransactions(response.data.transa);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(transactions, 'transs');

  const filteredTransactions = transactions.filter((transaction) =>
  
    transaction.userId.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const filteredTransactions = transactions.filter((transaction) =>
  //   console.log(transaction.userId.name,"tr")  

  // );
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">TRANSACTIONS</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={()=>navigate('/add')} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
          <PlusCircle size={20} className="mr-2" />
          Add Sale
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              {['Date', 'Invoice No.', 'Party Name', 'Transaction', 'Payment Type', 'Amount', 'Balance Due', ''].map(
                (header) => (
                  <th key={header} className="px-6 py-3">
                    {header}
                    {header && <ArrowUpDown size={14} className="inline ml-1" />}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction._id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{transaction.Date.slice(0,10)}</td>
                <td className="px-6 py-4">{transaction.invoiceNumber}</td>
                <td className="px-6 py-4">{transaction.userId.name}</td>
                <td className="px-6 py-4">Sale</td>
                <td className="px-6 py-4">Cash</td>
                <td className="px-6 py-4">{transaction.totalAmount}</td>
                <td className="px-6 py-4">{transaction.Balance}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Printer size={18} className="text-gray-500 cursor-pointer" />
                    <ArrowUpDown size={18} className="text-gray-500 cursor-pointer" />
                    <MoreVertical size={18} className="text-gray-500 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
