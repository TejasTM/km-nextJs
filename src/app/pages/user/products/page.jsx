'use client'

import React, { useState, useEffect } from 'react'
import RootLayout from '../../../layout';
import useFetch from '@/utils/useFetch/useFetch'; 
import DashboardLayout from "../../layout";
import authMiddleware from '@/middleware/authMiddleware';

function Products() {
  //usage of custom hooks for fetching the data i.e useFetch
    const { data, loading, error } = useFetch('http://localhost:3001/products');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    
    const filteredProducts = data.filter(product =>
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Loading State when the useFetch component is yet to fetch data
    if (loading) {
        return <div>Loading...</div>;
    }

    // Error thrown if any error occurs in useFetch custom hook
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
      <DashboardLayout>
        <div className="p-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-2 py-1 mb-4 w-full md:w-auto"
        />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Brand</th>
                <th className="border border-gray-300 px-4 py-2">Model</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map(product => (
                <tr key={product.id}>
                  <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.brand}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.model}</td>
                  <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
          paginate={paginate}
        />
      </div>
      </DashboardLayout>
    )
}

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4">
        <ul className="flex flex-wrap">
          {pageNumbers.map(number => (
            <li key={number}>
              <a onClick={() => paginate(number)} href="#" className="px-4 py-2 border border-gray-300 hover:bg-gray-200">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
};
export default  authMiddleware()(Products);