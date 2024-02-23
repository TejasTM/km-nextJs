'use client';

import React, { useState, useEffect, useMemo } from "react";
import RootLayout from '../layout'
import MyTable from '../components/customTable'
import SearchComponent from "../components/searchComponent"
import FilterComponent from "../components/filterComponent";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { columns, data } from '../components/tableComponent';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import CarouselComponent from "../components/carousel";
import CustomTable from "../components/customTable2";

const columnData = [
  { id: 'brand', label: 'Brand' },
  { id: 'model', label: 'Model' },
  { id: 'category', label: 'Category' },
  { id: 'description', label: 'Description' },
  { id: 'price', label: 'Price' },
  { id: 'discount', label: 'Discount' }

];
const TableData = require('../db.json')


const title = "Mobile Phones"
function Dashboard() {
  const [searchData, setSearchData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const apiUrl = 'http://localhost:3001/mobilePhone'


  const handleDataReceived = (data) => {
    setSearchData(prevData => data); // Using functional update
    console.log(searchData, "searchData");
  };
  console.log(searchData, "search Data outside  changed")

  useEffect(() => {
    // Perform additional processing or actions when filterData changes
    console.log("searchData data has changed:", searchData);
  }, [searchData]);
  // console.log("searchData data has changed:", searchData);

  const filterOptions = [
    { name: 'brand', label: 'Brand' },
  ];

  const filterApiUrl = 'http://localhost:3001/products'

  const handleFilteredDataReceived = (filteredData) => {
    // Receive data from the FilterComponent and set it in the state
    setFilterData(filteredData);
    console.log(filteredData, "filterData");
  };

  useEffect(() => {
    // Perform additional processing or actions when filterData changes
    console.log("Filtered data has changed:", filterData);
  }, [filterData]);
  const table = useMaterialReactTable({
    columns,
    data,
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      showRowsPerPage: false,
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
  });
  const globalTheme = useTheme();

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: globalTheme.palette.mode, //let's use the same dark/light mode as the global theme
          primary: globalTheme.palette.secondary, //swap in the secondary color as the primary for the table
          info: {
            main: 'rgb(255,122,0)', //add in a custom color for the toolbar alert background stuff
          },
          background: {
            default:
              globalTheme.palette.mode === 'light'
                ? 'rgb(254,255,244)' //random light yellow color for the background in light mode
                : '#000', //pure black table in dark mode for fun
          },
        },
        typography: {
          button: {
            textTransform: 'none', //customize typography styles for all buttons in table by default
            fontSize: '1.2rem',
          },
        },
        components: {
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: '1.1rem', //override to make tooltip font size larger
              },
            },
          },
          MuiSwitch: {
            styleOverrides: {
              thumb: {
                color: 'pink', //change the color of the switch thumb in the columns show/hide menu to pink
              },
            },
          },
        },
      }),
    [globalTheme],
  );
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
        <MyTable title={title} columns={columnData} data={TableData.mobilePhone}
        />
        <ThemeProvider theme={tableTheme}>
          <MaterialReactTable
            table={table} />
        </ThemeProvider>
      </div>
      <CarouselComponent/>
      {/* <CustomTable/> */}
    </RootLayout>

  )
}

export default Dashboard