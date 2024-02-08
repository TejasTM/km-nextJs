'use client';
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import fetchData from "@/utils/fetch";
import ReactPaginate from 'react-paginate';
import Layout from "./layout";

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
  }, [todos]);

  const pageCount = Math.ceil(todos.length / todosPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedTodos = todos.slice(
    pageNumber * todosPerPage,
    (pageNumber + 1) * todosPerPage
  );

  return (
    <Layout>
      <div className={styles.main}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {displayedTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? 'Completed' : 'Not Completed'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={styles.pagination}
        activeClassName={styles.activePage}
      />
      </div>
    </Layout>
  );
}

export default Home;
