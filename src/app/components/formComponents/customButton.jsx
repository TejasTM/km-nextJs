// components/Button.js
import React from 'react';

const CustomButton = ({ label, onClick,type }) => {
  return (
    <button
  type={type}
  onClick={onClick}
  className="w-full 2xl:h-12 lg:h-11 sm:h-9 bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-4 mb-2"
  >
  {label}
</button>
  );
};

export default CustomButton;
