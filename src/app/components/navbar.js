'use client';

import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import closeImg from "../../../public/close.png"
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
        <div className='2xl:ml-8 md:ml-4   '>
          <img className='h-12 w-12 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 xl:h-16 xl:w-16 2xl:h-a 2xl:w-40 '
            src='https://kuremara.com.au/wp-content/uploads/2023/01/KUREMARA-Logo.png' alt='Kuremara' />
          {/* <h1 className='text-white'>Kuremara</h1> */}
        </div>
        <div className="sm:hidden space-x-4 2xl:mr-8 md:mr-4"> {/* Hide on small screens */}
          <Link href="/" className="text-white hover:text-gray-300">Home</Link>
          <Link href="/login" className="text-white hover:text-gray-300">Login</Link>
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
                <div className="p-4">
                  <div className=''>
                    <button onClick={closeDrawer} >
                      <img src={closeImg} alt="close" srcset="" />
                    </button>
                  </div>
                  <div className='flex flex-col align-between'>
                    <Link href="/" className="text-gray-800 hover:text-gray-300">Home</Link>
                    <Link href="/login" className="text-gray-800 hover:text-gray-300">Login</Link>
                    <Link href="/users" className="text-gray-800 hover:text-gray-300">Users</Link>
                    <Link href="/products" className="text-gray-800 hover:text-gray-300">Products</Link>
                    <Link href="/dashboard" className="text-gray-800 hover:text-gray-300">Dashboard</Link>
                    <Link href="/store" className="text-gray-800 hover:text-gray-300">Store</Link>
                  </div>


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