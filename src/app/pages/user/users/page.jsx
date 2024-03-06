'use client'

import React,{useState,useEffect} from 'react'
import ServerComp from "../../../serverComp/serverComp";
// import RootLayout from '../../layout';
import DashboardLayout from "../../layout";
import fetchData from '@/utils/fetch';
import authMiddleware from '@/middleware/authMiddleware';

function Users() {
    const [userData, setUserData] = useState([]);
    const apiUrl = 'http://localhost:3001/users';

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const data = await fetchData(apiUrl);
          setUserData(data);
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      };

      fetchUserData();
    }, [userData]);
    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
      {userData.map(user => (
        <div key={user.id} className=" bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
          <div className="p-4">
            <div className="text-xl font-semibold mb-2">User {user.id}</div>
            <div className="text-gray-600">Email: {user.email}</div>
            <div className="text-gray-600">Password: {user.password}</div>
          </div>
        </div>
      ))}
    </div>
        </DashboardLayout>
    )
}

export default authMiddleware()(Users)