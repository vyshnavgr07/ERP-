import React from 'react'
import { ChevronDown, BarChart2, FileSpreadsheet, Printer } from 'lucide-react';
const FinanceComp = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <select className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pr-8 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>This Month</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Between</span>
          <input type="date" value="2024-09-01" className="border border-gray-300 rounded-md py-1 px-2 text-sm" />
          <span className="text-gray-600">To</span>
          <input type="date" value="2024-09-30" className="border border-gray-300 rounded-md py-1 px-2 text-sm" />
        </div>
        <div className="relative">
          <select className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pr-8 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>ALL FIRMS</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        </div>
      </div>
      <div className="flex space-x-4">
        <BarChart2 className="text-gray-600 cursor-pointer" size={24} />
        <FileSpreadsheet className="text-gray-600 cursor-pointer" size={24} />
        <Printer className="text-gray-600 cursor-pointer" size={24} />
      </div>
    </div>
    <div className="flex space-x-4">
      <div className="bg-green-100 rounded-lg p-3 flex-1">
        <p className="text-green-800 font-medium">Paid</p>
        <p className="text-green-800 text-xl font-bold">₹ 431.00</p>
      </div>
      <div className="bg-blue-100 rounded-lg p-3 flex-1">
        <p className="text-blue-800 font-medium">Unpaid</p>
        <p className="text-blue-800 text-xl font-bold">₹ 1,382.00</p>
      </div>
      <div className="bg-yellow-100 rounded-lg p-3 flex-1">
        <p className="text-yellow-800 font-medium">Total</p>
        <p className="text-yellow-800 text-xl font-bold">₹ 1,813.00</p>
      </div>
    </div>
  </div>
  )
}

export default FinanceComp
