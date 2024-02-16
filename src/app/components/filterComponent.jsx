import React, { useState } from 'react';
import axios from 'axios';

const FilterComponent = ({ apiUrl, filterOptions, onFilteredDataReceived }) => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
    console.log(name,"name");
    console.log(value,"value");
    console.log(filters,"filters");
  };

  const handleApplyFilters = async () => {
    try {
      const response = await axios.get(apiUrl, { params: filters });
      console.log(response.data, "response at result");
  
      // Call the onFilteredDataReceived callback function with the filtered data
      onFilteredDataReceived(response.data);
      console.log(response.data, "onFilteredDataReceived");
  
    } catch (error) {
      console.error('Error fetching filtered results:', error);
    }
  };

  return (
    <div className="bg-indigo-100 p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>
      <div className="space-y-4">
        {filterOptions.map((option) => (
          <div key={option.name} className="flex flex-col">
            <label htmlFor={option.name} className="text-indigo-700">{option.label}:</label>
            <input
              type="text"
              id={option.name}
              name={option.name}
              value={filters[option.name] || ''}
              onChange={handleFilterChange}
              className="border border-indigo-300 rounded-md px-3 py-1 focus:outline-none focus:border-indigo-500"
              placeholder={`Filter by ${option.label.toLowerCase()}...`}
            />
          </div>
        ))}
        <button
          onClick={handleApplyFilters}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
