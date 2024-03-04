'use client'

import React, { useEffect, useState, useMemo } from "react";
import DashboardLayout from "../layout";

const data = require('../../db.json')

function Store() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Memoize the filtered phones array whenever the searching operation is done based on the brand
  const filteredPhones = useMemo(() => {
    return data.mobilePhone.filter(phone =>
      phone.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Calculate total number of pages of phones based on the items per page
  const totalPages = Math.ceil(filteredPhones.length / itemsPerPage);

  // Paginate phones data a/c to num of items per page
  const paginatedPhones = filteredPhones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <DashboardLayout>
        <div className="container mx-auto">
          <div className="flex justify-between align-center">
            <h1 className="text-3xl font-bold mb-6">Mobile Phones</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-10 pr-4 mb-6 border rounded"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-1/4 transform -translate-y-1/4 h-5 w-5 text-gray-500 pointer-events-none"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M10 12h4"></path>
                <path d="M15 7l5 5-5 5"></path>
              </svg>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
            {paginatedPhones.map(phone => (
              <div key={phone.model} className="bg-white shadow-lg rounded p-6">
                <h2 className="text-xl font-semibold mb-2">{phone.brand} {phone.model}</h2>
                <p className="text-gray-600 mb-4">{phone.description}</p>
                <p className="text-gray-800 font-bold">${phone.price}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`mx-1 px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}
export default Store;
