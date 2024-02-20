// components/EmailInput.js
import React from 'react';

const EmailInput = ({ label, name, placeholder, value, onChange }) => {
  return (
    <div className="form-group mt-4">
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">{label}</label>
      <input
        type="email"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
      />
    </div>
  );
};

export default EmailInput;
