import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, TableSortLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ApiSetup from '../api/apiSetup';
import { GET_DEVICE } from "../api/endPoints"

function CustomTable() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0); // Start from 0 instead of 1
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [totalDevices, setTotalDevices] = useState(0);

    const columns = [
        { id: 'brand', label: 'Brand' },
        { id: 'model', label: 'Model' },
        { id: 'category', label: 'Category' },
        { id: 'description', label: 'Description' },
        { id: 'price', label: 'Price' },
        { id: 'discount', label: 'Discount' }
    ];

    const title = "Table";

    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage]); // Fetch data whenever page or rowsPerPage changes

    const fetchData = async () => {
        try {
            const response = await ApiSetup.get(`${GET_DEVICE}?page=${page + 1}&limit=${rowsPerPage}`);
            setData(response.data.data);
            setTotalDevices(response.data.total);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Update filtered data when the search term changes
        if (Array.isArray(data)) {
            const filtered = data.filter((row) =>
                columns.some((column) => {
                    const value = row[column.id];
                    return value !== undefined && String(value).toLowerCase().includes(searchTerm.toLowerCase());
                })
            );
            setFilteredData(filtered);
        }
    }, [data, searchTerm]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset page to 0 when changing rowsPerPage
    };

    const totalPages = Math.ceil(totalDevices / rowsPerPage);
    const currentPage = page;

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPage(0); // Reset page when searching
    };

    const handleSort = (columnId) => {
        if (sortBy === columnId) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnId);
            setSortOrder('asc');
        }
    };

    const sortedData = Array.isArray(filteredData) ? filteredData.slice().sort((a, b) => {
        const aValue = typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy];
        const bValue = typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy];
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
            return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
    }) : [];

    return (
        <>
            <div className="overflow-x-auto mb-8">
                <div elevation={3} className="bg-indigo-50 border border-gray-500 rounded-lg">
                    <div className=" flex justify-between align-center py-4 px-4 border-b border-gray-500">
                        {title && (
                            <h1 className='text-3xl font-bold'>
                                {title}
                            </h1>
                        )}
                        <div className="w-1/4">
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="search "
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Search..."
                                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                    </div>

                    <TableContainer className="bg-indigo-50 min-w-full p-4 rounded-lg">
                        <Table className="min-w-full">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} className="px-6 py-3">
                                            <TableSortLabel
                                                active={sortBy === column.id}
                                                direction={sortBy === column.id ? sortOrder : 'asc'}
                                                onClick={() => handleSort(column.id)}
                                            >
                                                <h2 className='text-xl text-gray-800 font-semibold'>
                                                    {column.label}
                                                </h2>
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedData?.map((row, index) => (
                                    <TableRow key={index} className="hover:bg-indigo-100">
                                        {columns.map((column) => (
                                            <TableCell key={column.id} className="px-6 py-4">
                                                <p className="overflow-hidden truncate" style={{ maxWidth: '10.25rem' }}>
                                                    {row[column.id]} {/* Render the data corresponding to the column */}
                                                </p>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={totalDevices}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            className="p-2 flex justify-end items-center"
                            labelRowsPerPage="Rows per page:"
                            labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                className: 'text-gray-700  border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                            }}
                            ActionsComponent={(props) => (
                                <div className="flex items-center">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            className={`mx-1 px-4 py-2 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                                                }`}
                                            onClick={() => handleChangePage(null, i)}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        />
                    </TableContainer>
                </div>
            </div>
        </>
    )
}

export default CustomTable;
