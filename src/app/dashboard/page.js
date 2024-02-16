'use client';

import React, { useState, useEffect } from "react";
import RootLayout from '../layout'
import MyTable from '../components/customTable'
import SearchComponent from "../components/searchComponent" 
import FilterComponent from "../components/filterComponent";

const columns = [
  { id: 'brand', label: 'Brand' },
  { id: 'model', label: 'Model' },
  { id: 'category', label: 'Category' },
  { id: 'description', label: 'Description' },
  { id: 'price', label: 'Price' },
  { id: 'discount', label: 'Discount' }

];
const data = require('../db.json')


const title ="Mobile Phones"
function Dashboard() {
  const [searchData, setSearchData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const apiUrl='http://localhost:3001/users'
  const handleDataReceived = (data) => {
    setSearchData(data); // Receive data from the search component and set it in the state
    console.log(searchData,"searchData");
  };
  const filterOptions = [
    { name: 'brand', label: 'Brand' },
  ];

  const filterApiUrl='http://localhost:3001/products'

  const handleFilteredDataReceived = (filteredData) => {
    // Receive data from the FilterComponent and set it in the state
    setFilterData(filteredData);
    console.log(filteredData, "filterData");
  };

  useEffect(() => {
    // Perform additional processing or actions when filterData changes
    console.log("Filtered data has changed:", filterData);
  }, [filterData]);
  return (
    <RootLayout>
      <div>
        <div className="flex justify-between p-4">
        <SearchComponent 
        apiUrl={apiUrl} 
        onDataReceived={handleDataReceived} 
        />
        <FilterComponent 
        apiUrl={filterApiUrl} 
        onFilteredDataReceived={handleFilteredDataReceived} 
        filterOptions={filterOptions}
        />
        </div>
        <MyTable title={title} columns={columns} data={data.mobilePhone}
         />
      </div>

    </RootLayout>

  )
}

export default Dashboard