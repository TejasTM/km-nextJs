// components/Button.js
import React from 'react';

const CustomButton = ({ label, onClick,type }) => {
  return (
    <button
    type={type}
      onClick={onClick}
      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-4 mb-2"
    >
      {label}
    </button>
  );
};

export default CustomButton;
