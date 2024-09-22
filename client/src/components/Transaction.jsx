import React, { useState } from 'react';
import { Search, PlusCircle, Printer, ArrowUpDown, MoreVertical } from 'lucide-react';

const Transaction = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const transactions = [
    { id: 5, date: '21/09/2024', invoiceNo: 5, partyName: 'xianinfotech', transaction: 'Sale', paymentType: 'Cash', amount: 14, balanceDue: 0 },
    { id: 4, date: '21/09/2024', invoiceNo: 4, partyName: 'xianinfotech', transaction: 'Sale', paymentType: 'Cash', amount: 102, balanceDue: 0 },
    { id: 3, date: '21/09/2024', invoiceNo: 3, partyName: 'xianinfotech', transaction: 'Sale', paymentType: 'Cash', amount: 315, balanceDue: 0 },
    { id: 2, date: '17/09/2024', invoiceNo: 2, partyName: 'xianinfotech', transaction: 'Sale', paymentType: 'Cash', amount: 382, balanceDue: 382 },
    { id: 1, date: '17/09/2024', invoiceNo: 1, partyName: 'xianinfotech', transaction: 'Sale', paymentType: 'Cash', amount: 1000, balanceDue: 1000 },
  ];

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.partyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
          <PlusCircle size={20} className="mr-2" />
          Add Sale
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              {['Date', 'Invoice No.', 'Party Name', 'Transaction', 'Payment Type', 'Amount', 'Balance Due', ''].map((header) => (
                <th key={header} className="px-6 py-3">
                  {header}
                  {header && <ArrowUpDown size={14} className="inline ml-1" />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{transaction.date}</td>
                <td className="px-6 py-4">{transaction.invoiceNo}</td>
                <td className="px-6 py-4">{transaction.partyName}</td>
                <td className="px-6 py-4">{transaction.transaction}</td>
                <td className="px-6 py-4">{transaction.paymentType}</td>
                <td className="px-6 py-4">{transaction.amount}</td>
                <td className="px-6 py-4">{transaction.balanceDue}</td>
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