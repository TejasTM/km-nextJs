'use client';

import React, { useState, useEffect } from "react";
import fetchData from "@/utils/fetch";
import ReactPaginate from 'react-paginate';
import RootLayout from "./layout";
import CustomTable from "./components/customTable2";

function Home() {
  const [todos, setTodos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const todosPerPage = 10;

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
    <RootLayout>
      

      <div className="max-w-600 flex justify-center ">
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
              <CustomTable/>
    </RootLayout>

  );
}

export default Home;
