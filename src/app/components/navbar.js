'use client';

import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import Image from "next/image"
// import closeImg from "../../../public/close.png"
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const openDrawer = () => {
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };


  return (
    <nav className="navbar  bg-gray-800  fixed top-0 w-full z-10 ">
      <div className="flex items-center justify-between h-16">
        <div className='2xl:ml-8 xl:ml-6 lg:ml-4 md:ml-4 sm:ml-4'>
          <img
            className=' sm:h-12 sm:w-20 lg:h-12 lg:w-24 xl:h-12 xl:w-30 2xl:h-12 2xl:w-30 object-cover'
            src='https://kuremara.com.au/wp-content/uploads/2023/01/KUREMARA-Logo.png'
            alt='Kuremara'
          />
        </div>
        <div className="sm:hidden space-x-4 2xl:mr-8 xl:mr-6 lg:mr-4 md:mr-4"> {/* Hide on small screens */}
          <Link href="/" className="text-white hover:text-gray-300">Home</Link>
          <Link href="/auth/login" className="text-white hover:text-gray-300">Login</Link>
          <Link href="/auth/register" className="text-white hover:text-gray-300">Register</Link>
          <Link href="/users" className="text-white hover:text-gray-300">Users</Link>
          <Link href="/products" className="text-white hover:text-gray-300">Products</Link>
          <Link href="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
          <Link href="/store" className="text-white hover:text-gray-300">Store</Link>


        </div>
        <div className="hidden sm:flex items-center mr-4"> {/* Show on small screens */}
          <button onClick={openDrawer} className="text-white hover:text-gray-300 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          {isOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white h-full w-64 shadow-md fixed top-0 right-0">
                  <div className="flex items-center justify-between p-2 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Navbar
                    </h3>
                    <button onClick={closeDrawer} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className='flex flex-col align-between px-2 py-2 mx-4 my-2  bg-indigo-50 rounded-md	'>
                    <Link href="/" className="text-gray-600 hover:text-black hover:bg-indigo-100 rounded-md py-2 px-2"> Home</Link>
                    <Link href="/auth/login" className="text-gray-600 hover:text-black hover:bg-indigo-100 rounded-md py-2 px-2">Login</Link>
                    <Link href="/auth/register" className="text-gray-600 hover:text-black hover:bg-indigo-100 rounded-md py-2 px-2">Register</Link>
                    <Link href="/users" className="text-gray-600 hover:text-black hover:bg-indigo-100 rounded-md py-2 px-2">Users</Link>
                    <Link href="/products" className="text-gray-600 hover:text-black hover:bg-indigo-100 rounded-md py-2 px-2">Products</Link>
                    <Link href="/dashboard" className="text-gray-600 hover:text-black hover:bg-indigo-100 rounded-md py-2 px-2">Dashboard</Link>
                    <Link href="/store" className="text-gray-600 hover:text-black hover:bg-indigo-100 rounded-md py-2 px-2">Store</Link>
                  </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </nav>
    

  )
}

export default Navbar