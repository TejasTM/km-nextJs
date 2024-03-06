'use client';

import React, { useState, useEffect } from "react";
import fetchData from "@/utils/fetch";
import ReactPaginate from 'react-paginate';
import EnahancedTable from "./components/enhancedTable";
import { GET_DEVICE } from "./auth/api/endPoints"
import AntDTable from "./components/antDTable";
import DashboardLayout from "./pages/layout"; 
import authMiddleware from "@/middleware/authMiddleware";

function Home() {
  const [todos, setTodos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const todosPerPage = 10;

  const columns = [
    { id: 'brand', label: 'Brand' },
    { id: 'model', label: 'Model' },
    { id: 'category', label: 'Category' },
    { id: 'description', label: 'Description' },
    { id: 'price', label: 'Price' },
    { id: 'discount', label: 'Discount' }
];
const column = [
  { 
      title: 'Brand', 
      dataIndex: 'brand', 
      sorter: (a, b) => a.brand.localeCompare(b.brand), 
      // Sorter function for sorting strings alphabetically
  },
  { 
      title: 'Model', 
      dataIndex: 'model', 
      sorter: (a, b) => a.model.localeCompare(b.model), 
      // Sorter function for sorting strings alphabetically
  },
  { 
      title: 'Category', 
      dataIndex: 'category', 
      sorter: (a, b) => a.category.localeCompare(b.category), 
      // Sorter function for sorting strings alphabetically
  },
  { 
      title: 'Description', 
      dataIndex: 'description', 
      // No sorter specified for this column, so it won't be sortable
  },
  { 
      title: 'Price', 
      dataIndex: 'price', 
      sorter: (a, b) => a.price - b.price, 
      // Sorter function for sorting numbers
  },
  { 
      title: 'Discount', 
      dataIndex: 'discount', 
      sorter: (a, b) => a.discount - b.discount, 
      // Sorter function for sorting numbers
  }
];;
  const apiUrl =GET_DEVICE
  const title="Mobile Phones"

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/todos');
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const pageCount = Math.ceil(todos.length / todosPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedTodos = todos.slice(
    pageNumber * todosPerPage,
    (pageNumber + 1) * todosPerPage
  );

  return (
    // <AuthenticatedRoute>

      <DashboardLayout>


        <div className="max-w-600 flex justify-center mt-8">
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border py-2 px-4">ID</th>
                  <th className="border py-2 px-4">Title</th>
                  <th className="border py-2 px-4">Completed</th>
                </tr>
              </thead>
              <tbody>
                {displayedTodos.map((todo) => (
                  <tr key={todo.id}>
                    <td className="border py-2 px-4">{todo.id}</td>
                    <td className="border py-2 px-4">{todo.title}</td>
                    <td className="border py-2 px-4">{todo.completed ? 'Completed' : 'Not Completed'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName="flex justify-center my-4 list-none"
              activeClassName="bg-blue-500 text-white"
              previousLinkClassName="px-4 py-2 border border-gray-300 text-gray-700 no-underline"
              nextLinkClassName="px-4 py-2 border border-gray-300 text-gray-700 no-underline"
              breakLinkClassName="px-4 py-2 border border-gray-300 text-gray-700 no-underline"
              pageLinkClassName="px-4 py-2 border border-gray-300 text-gray-700 no-underline"
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel="..."
            />
          </div>

        </div>
        <EnahancedTable columns={columns} title={title} apiUrl={apiUrl}/>
        <AntDTable columns={column} title={title} apiUrl={apiUrl}/>
      </DashboardLayout >
      // </AuthenticatedRoute>
  );
}

export default authMiddleware()(Home);
