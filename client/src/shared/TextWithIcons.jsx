import React from 'react';

const TextWithIcons = ({ label, icon: Icon, color }) => {
  return (
    <div className={`flex items-center space-x-2 cursor-pointer hover:opacity-80 text-${color}`}>
      <Icon size={20} />
      <p className="font-medium">{label}</p>
    </div>
  );
};

export default TextWithIcons;