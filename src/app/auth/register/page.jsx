'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import RootLayout from '../../layout'
import EmailInput from '@/app/components/formComponents/emailInput';
import Password from '@/app/components/formComponents/password';
import TextInput from '@/app/components/formComponents/textInput';
import CustomButton from '@/app/components/formComponents/customButton';
import RadioGroup from '@/app/components/formComponents/radioGroup';
import CustomCheckbox from '@/app/components/formComponents/customCheckbox';
import ApiSetup from '../api/apiSetup';
import { USER_SIGNUP } from "../api/endPoints";
import { setCookie } from '../../../utils/cookie';
import authMiddleware from '@/middleware/authMiddleware';

 function Register() {
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get('token')) {
      router.push('/');
    }
  }, [router])

  const [formData, setFormData] = useState({ name: '', email: "", password: "", gender: "", termsAndConditions: false });
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [error, setError] = useState({ email: "", password: "", name: '' });



  const genderOptions = [
    {
      label: "Male",
      value: "male"
    },
    {
      label: "Female",
      value: "female"
    },
    {
      label: "Others",
      value: "Others"
    }
  ]
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Update form data
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors for the corresponding field
    if (name === 'password') {
      setPasswordErrors([]);
    } else if (name === 'email') {
      setEmailError("");
    }
    else if (name === 'name') {
      setNameError("");
    }

    // Validate fields as they are being filled
    if (name === 'password') {
      const errors = [];

      if (value.length < 8) {
        errors.push("Password must be at least 8 characters long.");
      }

      if (!/[a-z]/.test(value)) {
        errors.push("Password must contain at least one lowercase letter.");
      }

      if (!/[A-Z]/.test(value)) {
        errors.push("Password must contain at least one uppercase letter.");
      }

      // Set error state if value is provided
      setError(prevState => ({
        ...prevState,
        password: value ? "" : prevState.password
      }));

      setPasswordErrors(errors);
    } else if (name === 'email') {
      const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);

      setEmailError(isValidEmail ? "" : "Invalid email address.");

      // Set error state if value is provided
      setError(prevState => ({
        ...prevState,
        email: value ? "" : prevState.email
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.name) {
      setError({ ...error, email: "Email Field is Required", password: "Password Field is required", name: "Name Field is required" });
      return;
    }
    if (!formData.password) {
      setError({ ...error, password: "Password Field is required" })
      return;
    }
    if (!formData.name) {
      setError({ ...error, name: "Name Field is required" })
      return;
    }

    // Assign role based on email domain
    let role = 'user';
    if (formData.email.endsWith('@kuremara.com.au')) {
      role = 'admin';
    }

    // Create user data object including role
    const userData = { ...formData, role };

    try {
      const response = await ApiSetup.post(USER_SIGNUP, userData);
      // Set token cookie instead of using localStorage
      setCookie("usertype", response.data.user.userTpe); // Set cookie to expire in 7 days
      console.log('Signup successful:', response.data);
      // Redirect to '/users'
      router.push('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }

    // Clear form data
    setFormData({
      name: '',
      email: "",
      password: "",
      gender: "",
      termsAndConditions: false,
      role: "user" // Reset role to default after signup
    });
  }

  return (
    <>
      <RootLayout showNavbar={false}>
        <div className='flex justify-center items-center h-full'>
          <div className="p-6 bg-white rounded-lg shadow-md 2xl:w-2/5 md:w-3/4 sm:w-80 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-4">
              Register your account
            </h1>
            <form onSubmit={handleSubmit}>
              <RadioGroup
                label={"Gender"}
                name={"gender"} // Use lowercase "gender"
                selectedOption={formData.gender}
                options={genderOptions}
                onChange={(e) => handleChange(e)}
              />
              <TextInput
                label="Name"
                name="name"
                placeholder={"Name"}
                value={formData.name}
                onChange={(e) => handleChange(e)}
              />
              <div className="text-red-500 text-sm mt-1">
                <p>{nameError || error.name}</p>
              </div>
              <EmailInput
                label="Email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}

              />
              <div className="text-red-500 text-sm mt-1">
                <p>{emailError || error.email}</p>
              </div>

              <Password
                label="Password"
                value={formData.password}
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
              <CustomCheckbox
                onChange={(e) => handleChange(e)}
                name={"termsAndConditions"}
                label={"Accept terms and conditions"}
                checked={formData.termsAndConditions}
              />
              <CustomButton
                type={"submit"}
                label={"Register"}
              />
              <p className="text-sm font-light text-gray-500">
                Already have an account? <Link href="/auth/login" className="font-medium text-indigo-600 hover:underline ">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </RootLayout>
    </>
  )
}
export default Register