'use client';

import React, { useState } from 'react';
import Link from 'next/link'
import postData from '@/utils/post';
import RootLayout from '../../layout';
import { useRouter } from 'next/navigation'
import EmailInput from '@/app/components/formComponents/emailInput';
import Password from '@/app/components/formComponents/password';
import CustomButton from '@/app/components/formComponents/customButton';
import ApiSetup from '../api/apiSetup';
import { USER_SIGNIN } from "../api/endPoints";
import { setCookie } from '@/utils/cookie';
import authMiddleware from '@/middleware/authMiddleware';

 function Login() {
  const router = useRouter()

  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState({ email: "", password: "" });


  const apiUrl = 'http://localhost:3001/users';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  
    // Clear errors for the corresponding field
    if (name === 'password') {
      setPasswordErrors([]);
    }
  
    if (name === 'email') {
      setEmailError("");
    }
  
    // Validate fields as they are being filled
    if (name === 'password') {
      const errors = [];
      if (value) {
        setError({password:""});
      }
      setPasswordErrors(errors);
    }
  
    if (name === 'email') {
      const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
  
      if (!isValidEmail) {
        setEmailError("Invalid email address.");
      } else {
        setEmailError("");
      }
      if (value) {
        setError({email:""});
      }
    }
  };
  
  const  handleSubmit = async(e) => {
    e.preventDefault();
    if (!data.email && !data.password) {
      setError({ ...error, email: "Email Field is Required" , password: "Password Field is required"});
      return;
    }
    
    if (!data.password) {
      setError({ ...error, password: "Password Field is required" });
      return;
    }
  
    console.log(data, "formData");
    try {
      const response = await ApiSetup.post(USER_SIGNIN, data);
      setCookie("usertype", response.data.user.userType); 
      console.log("usertype",response.data.user.userType);
     
      console.log('Signup successful:', response.data.message);
       // Redirect to '/users'
    router.push('/');
    } catch (error) {
      console.error('Error signing up:',error);
    }
  
    // Clear form data
    setData({
      email: "",
      password: ""
    });
  
   
  };


  return (
    <RootLayout  >
      <div className="flex items-center justify-center">
        <div className="p-6 bg-white rounded-lg shadow-md 2xl:w-2/5 md:w-3/4 sm:w-80 ">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
              <EmailInput
                label="Email"
                id="email"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={(e) => handleChange(e)}

              />
              <div className="text-red-500 text-sm mt-1">
                <p>{emailError || error.email}</p>
              </div>
              <Password
                label="Password"
                value={data.password}
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
              />
              {passwordErrors.length > 0 && (
                <div className="text-red-500 text-sm mt-1">
                  {passwordErrors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
              <div className="text-red-500 text-sm mt-1">
                <p>{error.password}</p>
              </div>
              <CustomButton
                type={"submit"}
                label={"Login"}
                />
            <p className="text-sm font-light text-gray-500">
              Don't have an account? <Link href="/auth/register" className="font-medium text-indigo-600 hover:underline ">Register</Link>
            </p>
          </form>
        </div>
      </div>

    </RootLayout>
  );
}
export default Login