import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Home, Users, Package, DollarSign, ShoppingCart, CreditCard, BarChart2, Share2, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ icon: Icon, label, items, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-2">
      <div 
        className="flex items-center justify-between p-2 hover:bg-gray-700 rounded cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
          if (onClick) onClick(label); // Call the click handler if provided
        }}
      >
        <div className="flex items-center">
          <Icon className="mr-2 text-gray-400" size={18} />
          <span>{label}</span>
        </div>
        {items && (isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
      </div>
      {isOpen && items && (
        <div className="ml-6 mt-1">
          {items.map((item, index) => (
            <div key={index} className="p-2 hover:bg-gray-700 rounded cursor-pointer">
              <p onClick={() => onClick(item)}> {item} </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();

  const handleMenuItemClick = (label) => {
    console.log(label, "label");
    switch (label) {
      case 'Home':
        navigate('/home');
        break;
        case 'Sale Invoices':
        navigate('/sale');
      
      default:
        break;
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold">My Company</h2>
      </div>
      
      <div className="mb-6">
        <div className="bg-green-600 p-2 rounded">
          <p className="text-sm">WhatsApp Branding</p>
          <p className="text-xs">Now send messages from your own WhatsApp for free</p>
        </div>
      </div>

      <div className="space-y-2">
        <MenuItem icon={Home} label="Home" onClick={handleMenuItemClick} />
        <MenuItem icon={Users} label="Parties" items={['Item 1', 'Item 2']} onClick={handleMenuItemClick} />
        <MenuItem icon={Package} label="Items" items={['Item 1', 'Item 2']} onClick={handleMenuItemClick} />
        <MenuItem 
          icon={DollarSign} 
          label="Sale" 
          items={[
            'Sale Invoices', 
            'Estimate/Quotation', 
            'Payment In',
            'Sale Order', 
            'Delivery Challan', 
            'Sale Return/Cr. Note', 
            'Vyapar POS'
          ]} 
          onClick={handleMenuItemClick} 
        />
        <MenuItem icon={ShoppingCart} label="Purchase & Expense" onClick={handleMenuItemClick} />
        <MenuItem icon={BarChart2} label="Grow Your Business" onClick={handleMenuItemClick} />
        <MenuItem icon={CreditCard} label="Cash & Bank" onClick={handleMenuItemClick} />
        <MenuItem icon={BarChart2} label="Reports" onClick={handleMenuItemClick} />
        <MenuItem icon={Share2} label="Sync, Share & Backups" onClick={handleMenuItemClick} />
        <MenuItem icon={Settings} label="Utilities" onClick={handleMenuItemClick} />
        <MenuItem icon={Settings} label="Settings" onClick={handleMenuItemClick} />
      </div>

      <div className="mt-6 bg-blue-600 p-2 rounded">
        <p className="font-bold">Your Trial Expires In 2 Days.</p>
        <button className="mt-2 bg-white text-blue-600 px-4 py-1 rounded text-sm font-bold">
          See Plan →
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
