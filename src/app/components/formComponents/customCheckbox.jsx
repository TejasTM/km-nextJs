// components/Checkbox.js
import React from 'react';

const CustomCheckbox = ({ label, name, checked, onChange }) => {
  return (
    <div className="form-group mt-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          className="mr-2 rounded"
          required
        />
        <label htmlFor={name} className="text-gray-700">{label}</label>
      </div>
    </div>
  );
};

export default CustomCheckbox;
