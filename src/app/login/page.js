'use client';
import React, { useState } from 'react';
import '../globals.css';
import postData from '@/utils/post';
import RootLayout from '../layout';

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const apiUrl = 'http://localhost:3001/users';
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the postData function with the apiUrl and dataToSend
    postData(apiUrl, data)
      .then(responseData => {
        // Handle the response data returned from the API
        console.log('Response from API:', responseData);
      })
      .catch(error => {
        // Handle any errors that occur during the POST request
        console.error('Error:', error);
      });
  };

  return (
    <RootLayout>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Email'
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={data.email}
              onChange={(e)=>handleChange(e)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name='password'
              placeholder='Password'
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </RootLayout>
  );
}
