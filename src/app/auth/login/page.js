'use client';
import React, { useState } from 'react';
import Link from 'next/link'
import postData from '@/utils/post';
import RootLayout from '../../layout';
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [passwordErrors, setPasswordErrors] = useState([]);

  const apiUrl = 'http://localhost:3001/users';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'password') {
      // Validate password
      const errors = [];
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      if (value.length < 8) {
        errors.push("Password must be at least 8 characters long.");
      }

      if (!/[a-z]/.test(value)) {
        errors.push("Password must contain at least one lowercase letter.");
      }

      if (!/[A-Z]/.test(value)) {
        errors.push("Password must contain at least one uppercase letter.");
      }

      setPasswordErrors(errors);
    }
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
    setData({
      email: "",
      password: ""
    })
    router.push('/dashboard')

  };


  return (
    <RootLayout>
      <div className="flex items-center justify-center">
        <div className="p-6 bg-white rounded-lg shadow-md 2xl:w-2/5 md:w-3/4 sm:w-80 ">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name or Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Email'
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={data.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-4">
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
                onChange={(e) => handleChange(e)}
              />
              {passwordErrors.length > 0 && (
                <div className="text-red-500 text-sm mt-1">
                  {passwordErrors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mb-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login
            </button>
            <p className="text-sm font-light text-gray-500">
              Don't have an Account <Link href="/auth/register" className="font-medium text-indigo-600 hover:underline ">Register</Link>
            </p>
          </form>
        </div>
      </div>

    </RootLayout>
  );
}
