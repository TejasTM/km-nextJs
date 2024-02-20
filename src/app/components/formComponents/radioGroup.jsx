// components/RadioGroup.js
import React from 'react';

const RadioGroup = ({ label, name, options, selectedOption, onChange }) => {
  return (
    <div className="form-group mb-4">
      <label htmlFor={name} className="block text-gray-700 font-bold mb-1">{label}</label>
      <div className="flex">
        {options?.map(option => (
          <div key={option.value} className="flex items-center mr-4">
            <input
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={onChange}
              className="mr-2"
              required
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
