import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Paper, Typography, TextField, InputAdornment, TableSortLabel } from '@mui/material';
import { useState } from 'react';

function MyTable({ title, columns, data }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filtered = data.filter((row) =>
            columns.some((column) => {
                const value = row[column.id];
                return value !== undefined && String(value).toLowerCase().includes(event.target.value.toLowerCase());
            })
        );
        setFilteredData(filtered);
        setPage(0);
    };

    const handleSort = (columnId) => {
        if (sortBy === columnId) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnId);
            setSortOrder('asc');
        }
    };

    const sortedData = filteredData.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (aValue === bValue) return 0;
        return sortOrder === 'asc' ? (aValue < bValue ? -1 : 1) : (aValue > bValue ? -1 : 1);
    });

    return (
        <div className="overflow-x-auto ">
            <Paper elevation={3} className="bg-indigo-50 border border-gray-500 rounded-lg">
                <div className=" flex justify-between align-center py-4 px-4 border-b border-gray-500">
                    {title && (
                        <h1 className='text-3xl font-bold'>
                            {title}
                        </h1>
                    )}
                    <TextField
                        className="bg-gray-50"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    🔍
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                <TableContainer component={Paper} className="min-w-full p-4 bg-indigo-50">
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
                            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow key={index} className="hover:bg-indigo-100	">
                                    {columns.map((column) => (
                                        <TableCell key={column.id} className="px-6 py-4">
                                            <p className="overflow-hidden truncate" style={{ maxWidth: '10.25rem' }}>
                                                {row[column.id].length > 50 ? `${row[column.id].substring(0, 50)}...` : row[column.id]}
                                            </p>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        className="p-2"
                    />
                </TableContainer>
            </Paper>
        </div>
    )
}

export default MyTable
