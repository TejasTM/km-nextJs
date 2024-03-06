'use client';

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layout";
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import MyTable from '../../../components/customTable'
import SearchComponent from "../../../components/searchComponent"
import FilterComponent from "../../../components/filterComponent";
import CarouselComponent from "../../../components/carouselComponent";
import CustomModal from '../../../components/customModal';
import { PrimaryButton } from "../../../components/buttons/Button";
import EmailInput from '@/app/components/formComponents/emailInput';
import Password from '@/app/components/formComponents/password';
import CustomButton from '@/app/components/formComponents/customButton';
import authMiddleware from '../../../../middleware/authMiddleware';
// import Middleware from "@/middleware";

const columnData = [
  { id: 'brand', label: 'Brand' },
  { id: 'model', label: 'Model' },
  { id: 'category', label: 'Category' },
  { id: 'description', label: 'Description' },
  { id: 'price', label: 'Price' },
  { id: 'discount', label: 'Discount' }

];
const TableData = require('../../../db.json')

const title = "Mobile Phones"

function Dashboard() {

  const [searchData, setSearchData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter()

  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState({ email: "", password: "" });
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOk = () => {
    // Handle OK button click logic here
    setModalOpen(false);
  };
  const apiUrl = 'http://localhost:3001/mobilePhone'


  const handleDataReceived = (data) => {
    setSearchData(prevData => data); // Using functional update
    console.log(searchData, "searchData");
  };
  console.log(searchData, "search Data outside  changed")

  useEffect(() => {
    // Perform additional processing or actions when filterData changes
    console.log("searchData data has changed:", searchData);
  }, [searchData]);
  // console.log("searchData data has changed:", searchData);

  const filterOptions = [
    { name: 'brand', label: 'Brand' },
  ];

  const filterApiUrl = 'http://localhost:3001/products'

  const handleFilteredDataReceived = (filteredData) => {
    // Receive data from the FilterComponent and set it in the state
    setFilterData(filteredData);
    console.log(filteredData, "filterData");
  };

  useEffect(() => {
    // Perform additional processing or actions when filterData changes
    console.log("Filtered data has changed:", filterData);
  }, [filterData]);

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
      console.log("response.data",response.data);
      localStorage.setItem("token",response.data.token)
      console.log('Signup successful:', response.data.message);
      // Redirect to '/users'
    router.push('/');
    } catch (error) {
      console.error('Error signing up:');
    }
  
    // Clear form data
    setData({
      email: "",
      password: ""
    });
  
    // Redirect to '/users'
    router.push('/');
  };


  return (
    <DashboardLayout>
      <div>
        <div className="flex justify-between p-4">
          <SearchComponent
            apiUrl={apiUrl}
            onDataReceived={handleDataReceived}
          />
          <FilterComponent
            apiUrl={filterApiUrl}
            onFilteredDataReceived={handleFilteredDataReceived}
            filterOptions={filterOptions}
          />
        </div>
        <MyTable
          title={title}
          columns={columnData}
          data={TableData.mobilePhone}
        />

        {/* Carousel Component  */}
        <CarouselComponent />

        {/* Modal Login Component  */}
        <PrimaryButton onClick={handleOpenModal} label={"Open Modal"} color="blue"/>
        <CustomModal
          title="Login Modal"
          open={modalOpen}
          onCancel={handleCloseModal}
          onOk={handleOk}
          okText="OK"
          cancelText="Cancel"
        >
          <div className="flex items-center justify-center">
            <div className="p-6 bg-white rounded-lg w-4/5">
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
        </CustomModal>

      </div>
    </DashboardLayout>

  )
}

export default authMiddleware()(Dashboard)