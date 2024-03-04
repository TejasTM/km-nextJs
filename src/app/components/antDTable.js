import React, { useState, useEffect } from 'react';
import { Table, Input, Pagination } from 'antd';
import ApiSetup from '../auth/api/apiSetup';

const EnhancedTable = ({ title, columns, apiUrl }) => {
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tableSorter, setTableSorter] = useState({});

    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage, searchTerm]); // Fetch data whenever dependencies change

    const fetchData = async () => {
        try {
            const response = await ApiSetup.get(`${apiUrl}?page=${page}&limit=${rowsPerPage}&searchTerm=${searchTerm}`);
            setData(response.data.data);
            setTotalItems(response.data.total);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = (event) => {
        event.persist(); // Persist the event
        const term = event.target.value;
        setSearchTerm(term);
    };

    const onPageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const handlePageSizeChange = (current, size) => {
        setRowsPerPage(size);
        // Fetch data for the new page size
        fetchData();
    };

    const handleTableChange = (sorter) => {
        if (sorter) {
            // Update table sorter state
            setTableSorter({
                column: sorter.columnKey,
                order: sorter.order,
            });
        }
    };

    return (
        <div className="overflow-x-auto mb-8">
            <div elevation={3} className="border border-gray-500 rounded-lg">
                <div className="h-16 flex justify-between items-center  px-4 border-b border-gray-500 ">
                    <h1>{title}</h1>
                    <Input.Search placeholder="Search" onChange={handleSearch} style={{ width: 200 }} />
                </div>
                <Table
                    columns={columns.map(column => ({
                        ...column,
                        sorter: true,
                        sortOrder: tableSorter.column === column.dataIndex ? tableSorter.order : false,
                    }))}
                    dataSource={data}
                    pagination={false}
                    onChange={handleTableChange}
                    className="overflow-x-auto w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full  sm:p-2 md:p-4 lg:p-4 xl:p-6 2xl:p-8"
                />
                <Pagination
                    current={page}
                    total={totalItems}
                    pageSize={rowsPerPage}
                    onChange={onPageChange}
                    showSizeChanger
                    onShowSizeChange={handlePageSizeChange}
                    pageSizeOptions={['5', '10', '15']}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    style={{ margin: "16px", textAlign: 'right' }}
                    

                />
            </div>
        </div>

    );
};

export default EnhancedTable;
